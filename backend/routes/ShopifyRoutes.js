import express from 'express';
import { addShopifyStore, addUserToStore, fetchShopifyCustomers, fetchShopifyOrders, fetchShopifyProducts, fetchShopifyStoreDetails } from '../handlers/ShopifyHandlers.js';
import { verifyAccessTokenMiddleware } from '../lib/middleware.js';
const router = express.Router();

router.get('/fetch-store-details/:storeId', verifyAccessTokenMiddleware, fetchShopifyStoreDetails);
router.get('/fetch-products/:storeId', verifyAccessTokenMiddleware, fetchShopifyProducts);
router.get('/fetch-customers/:storeId', verifyAccessTokenMiddleware, fetchShopifyCustomers);
router.get('/fetch-orders/:storeId', verifyAccessTokenMiddleware, fetchShopifyOrders);
router.post('/add-store', verifyAccessTokenMiddleware, addShopifyStore);
router.post('/add-user-to-store', verifyAccessTokenMiddleware, addUserToStore);

export default router;
