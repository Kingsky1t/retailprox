import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';
import { Store } from '../models/StoreModel.js';
import { User } from '../models/UserModel.js';
import bcrypt from 'bcryptjs';

export const fetchShopifyStoreDetails = async (req, res) => {
    const { storeId } = req.params;
    const userId = req.userId;
    try {
        const store = await Store.findById(storeId).populate('users');
        if (!store) return res.status(404).json({ message: 'Store not found.' });

        const user = store.users.find(user => user._id.equals(userId));
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
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
    const userId = req.userId;
    try {
        const store = await Store.findById(storeId);
        if (!store) return res.status(404).send('Store not found.');
        if (!store.users.includes(userId)) {
            return res.status(404).json({ message: 'You do not have access to the store.' });
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

        res.json(products.body.products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Error fetching products. Check the terminal for details.' });
    }
};

export const fetchShopifyCustomers = async (req, res) => {
    const { storeId } = req.params;
    const userId = req.userId;
    try {
        const store = await Store.findById(storeId);
        if (!store) return res.status(404).send('Store not found.');
        if (!store.users.includes(userId)) {
            return res.status(404).json({ message: 'You do not have access to the store.' });
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

        res.json(customers.body.customers);
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ error: 'Error fetching customers. Check the terminal for details.' });
    }
};

export const fetchShopifyOrders = async (req, res) => {
    const { storeId } = req.params;
    const userId = req.userId;

    try {
        const store = await Store.findById(storeId);
        if (!store) return res.status(404).send('Store not found.');
        if (!store.users.includes(userId)) {
            return res.status(404).json({ message: 'You do not have access to the store.' });
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

        res.json(ordersResponse.body.orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Error fetching orders. Check the terminal for details.' });
    }
};

export const addShopifyStore = async (req, res) => {
    const { apiKey, apiSecretKey, accessToken, storeName } = req.body;
    const userId = req.userId;

    try {
        const user = await User.findById(userId);

        const store = new Store({ apiKey, apiSecretKey, accessToken, storeName, users: [userId] });
        await store.save();

        user.stores.push({ storeId: store._id, type: 'shopify', storeName: store.storeName });
        await user.save();

        res.status(201).json({ message: 'Store added successfully.', storeId: store._id });
    } catch (error) {
        console.error('Error adding store:', error);
        res.status(500).send('Error adding store.');
    }
};

export const addUserToStore = async (req, res) => {
    const { username, email, password, storeId } = req.body;
    if (!username || !email || !password || !storeId) {
        return res.status(400).json({ message: 'Missing data.' });
    }
    try {
        const isUserAlreadyExisting = await User.findOne({ email });
        if (isUserAlreadyExisting) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        const store = await Store.findById(storeId);
        if (!store) {
            return res.status(404).json({ message: 'Store not found.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            stores: { storeId: [store._id], type: 'shopify', storeName: store.storeName },
        });

        await Store.findByIdAndUpdate(storeId, { $push: { users: user._id } });

        return res.status(200).json({
            success: true,
            message: 'User created and store added successfully.',
            user: user,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error adding user to store.' });
    }
};
