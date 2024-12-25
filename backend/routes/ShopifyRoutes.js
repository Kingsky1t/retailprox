import express from 'express';
import { fetchShopifyCustomers, fetchShopifyOrders, fetchShopifyProducts, fetchShopifyStoreDetails } from '../handlers/ShopifyHandlers.js';
const router = express.Router();

router.get('/fetch-store-details/:storeId', fetchShopifyStoreDetails);
router.get('/fetch-products/:storeId', fetchShopifyProducts);
router.get('/fetch-customers/:storeId', fetchShopifyCustomers);
router.get('/fetch-orders/:storeId', fetchShopifyOrders);

export default router;
