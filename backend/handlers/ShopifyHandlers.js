import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';
import { Store } from '../models/StoreModel.js';
import { User } from '../models/UserModel.js';
import mongoose from 'mongoose';

export const fetchShopifyStoreDetails = async (req, res) => {
    const { storeId } = req.params;
    const { requestingUserId } = req.body;
    try {
        const store = await Store.findById(storeId).populate('users');
        if (!store) return res.status(404).json({ message: 'Store not found.' });

        const user = store.users.find(user => user._id.equals(requestingUserId));
        console.log(requestingUserId);
        if (!user) {
            return res.status(401).json({ message: 'User do not have access to the store.' });
        }

        const shopify = shopifyApi({
            apiKey: store.apiKey,
            apiSecretKey: store.apiSecretKey,
            accessToken: store.accessToken,
            shop: store.storeName,
            apiVersion: LATEST_API_VERSION,
            hostName: process.env.HOST_NAME,
        });

        const session = { accessToken: store.accessToken, shop: store.storeName };
        const client = new shopify.clients.Rest({ session });
        const storeDetails = await client.get({ path: 'shop' });
        const { name, email } = storeDetails.body.shop;

        return res.status(200).json({
            success: true,
            message: 'Successfully fetched Store Details.',
            store: {
                name,
                email,
                users: store.users.map(item => ({ _id: item._id, username: item.username, email: item.email })),
            },
        });
    } catch (error) {
        console.error('Error fetching store details:', error);
        res.status(500).json({ error: 'Error fetching store details. Check the terminal for details.' });
    }
};

export const fetchShopifyProducts = async (req, res) => {
    const { storeId } = req.params;
    const { requestingUserId } = req.body;

    try {
        const store = await Store.findById(storeId);
        if (!store) return res.status(404).json({ success: false, message: 'Store not found.' });

        if (!store.users.includes(requestingUserId)) {
            return res.status(401).json({ success: false, message: 'User do not have access to the store.' });
        }

        const shopify = shopifyApi({
            apiKey: store.apiKey,
            apiSecretKey: store.apiSecretKey,
            accessToken: store.accessToken,
            shop: store.storeName,
            apiVersion: LATEST_API_VERSION,
            hostName: process.env.HOST_NAME,
        });

        const session = { accessToken: store.accessToken, shop: store.storeName };
        const client = new shopify.clients.Rest({ session });
        const products = await client.get({ path: 'products' });

        res.status(200).json({ success: true, message: 'products fetched successfully.', products: products.body.products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ success: false, message: 'Error fetching products: ' + error.message });
    }
};

export const fetchShopifyCustomers = async (req, res) => {
    const { storeId } = req.params;
    const { requestingUserId } = req.body;

    try {
        const store = await Store.findById(storeId);
        if (!store) return res.status(404).json({ success: false, message: 'Store not found.' });

        if (!store.users.includes(requestingUserId)) {
            return res.status(401).json({ success: false, message: 'User do not have access to the store.' });
        }

        const shopify = shopifyApi({
            apiKey: store.apiKey,
            apiSecretKey: store.apiSecretKey,
            accessToken: store.accessToken,
            shop: store.storeName,
            apiVersion: LATEST_API_VERSION,
            hostName: process.env.HOST_NAME,
        });

        const session = { accessToken: store.accessToken, shop: store.storeName };
        const client = new shopify.clients.Rest({ session });
        const customers = await client.get({ path: 'customers' });

        res.status(200).json({ success: true, message: 'customers fetched successfully.', customers: customers.body.customers });
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ success: false, message: 'Error fetching customers: ' + error.message });
    }
};

export const fetchShopifyOrders = async (req, res) => {
    const { storeId } = req.params;
    const { requestingUserId } = req.body;

    try {
        const store = await Store.findById(storeId);
        if (!store) return res.status(404).send({ success: false, message: 'Store not found.' });

        if (!store.users.includes(requestingUserId)) {
            return res.status(401).json({ success: false, message: 'You do not have access to the store.' });
        }

        const shopify = shopifyApi({
            apiKey: store.apiKey,
            apiSecretKey: store.apiSecretKey,
            accessToken: store.accessToken,
            shop: store.storeName,
            apiVersion: LATEST_API_VERSION,
            hostName: process.env.HOST_NAME,
        });

        const session = { accessToken: store.accessToken, shop: store.storeName };
        const client = new shopify.clients.Rest({ session });
        const ordersResponse = await client.get({ path: 'orders' });

        res.status(200).json({ success: true, message: 'Orders fetched successfully.', orders: ordersResponse.body.orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ success: false, message: 'Error fetching orders: ' + error.message });
    }
};

export const addShopifyStore = async (req, res) => {
    const { requestingUserId, apiKey, apiSecretKey, accessToken, storeName } = req.body;

    if (!apiKey || !apiSecretKey || !accessToken || !storeName) {
        return res.status(400).json({ success: false, message: 'Missing data.' });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // find the requesting user
        const requestingUser = await User.findById(requestingUserId);

        // add new store
        const store = await Store.create({ apiKey, apiSecretKey, accessToken, storeName, users: [requestingUserId] });

        // add store id to the user's store array
        await requestingUser.updateOne({
            $push: {
                stores: {
                    storeId: store._id,
                    type: 'shopify',
                    storeName: store.storeName,
                },
            },
        });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({ success: true, message: 'Store added successfully.', storeId: store._id });
    } catch (error) {
        console.error('Error adding store:', error);

        await session.abortTransaction();
        session.endSession();

        res.status(500).send('Error adding store.');
    }
};

export const addUserToStore = async (req, res) => {
    const { requestingUserId, userIdToAdd, storeId } = req.body;

    if (!userIdToAdd || !storeId) {
        return res.status(400).json({ message: 'Missing data.' });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // find the user
        const user = await User.findById(userIdToAdd);
        if (!user) {
            throw { status: 404, message: 'Cannot find user to add.' };
        }

        if (!user.createdBy.equals(requestingUserId)) {
            throw { status: 401, message: 'requesting user cannot add the user.' };
        }

        // finds the store
        const store = await Store.findById(storeId);
        if (!store.users.includes(requestingUserId)) {
            throw { status: 401, message: 'User does not have access to the store.' };
        }

        // checks if the user is already added to the store
        if (store.users.includes(userIdToAdd)) {
            throw { status: 400, message: 'User already added to store.' };
        }

        // add user id to the store's users array
        await store.updateOne({ $push: { users: user._id } });

        // adds the store id to the user's stores array
        await user.updateOne({ $push: { stores: store._id } });

        // commit the transaction
        await session.commitTransaction();
        session.endSession();
        console.log([...store.users, userIdToAdd]);
        return res.status(201).json({
            success: true,
            message: 'User added to the store successfully.',
            storeUsers: [...store.users, userIdToAdd],
        });
    } catch (err) {
        console.error(err);

        await session.abortTransaction();
        session.endSession();

        const status = err.status || 500;
        const message = err.message || 'Error adding ';
        return res.status(status).json({ success: false, message });
    }
};
