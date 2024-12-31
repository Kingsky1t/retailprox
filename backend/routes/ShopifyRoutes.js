import express from 'express';
import { addShopifyStore, fetchShopifyCustomers, fetchShopifyOrders, fetchShopifyProducts, fetchShopifyStoreDetails } from '../handlers/ShopifyHandlers.js';
import { verifyAccessTokenMiddleware } from '../lib/middleware.js';
const router = express.Router();

router.get('/fetch-store-details/:storeId', fetchShopifyStoreDetails);
router.get('/fetch-products/:storeId', fetchShopifyProducts);
router.get('/fetch-customers/:storeId', fetchShopifyCustomers);
router.get('/fetch-orders/:storeId', verifyAccessTokenMiddleware, fetchShopifyOrders);
router.post('/add-shopify-store', addShopifyStore);

export default router;
