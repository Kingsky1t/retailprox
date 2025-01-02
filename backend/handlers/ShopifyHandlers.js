import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';
import { Store } from '../models/StoreModel.js';

export const fetchShopifyStoreDetails = async (req, res) => {
    const { storeId } = req.params;
    try {
        const store = await Store.findById(storeId);
        if (!store) return res.status(404).send('Store not found.');

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

        res.json(storeDetails.body.shop);
    } catch (error) {
        console.error('Error fetching store details:', error);
        res.status(500).json({ error: 'Error fetching store details. Check the terminal for details.' });
    }
};

export const fetchShopifyProducts = async (req, res) => {
    const { storeId } = req.params;
    try {
        const store = await Store.findById(storeId);
        if (!store) return res.status(404).send('Store not found.');

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
    try {
        const store = await Store.findById(storeId);
        if (!store) return res.status(404).send('Store not found.');

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
    try {
        const store = await Store.findById(storeId);
        if (!store) return res.status(404).send('Store not found.');

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
