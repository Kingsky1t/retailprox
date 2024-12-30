import express, { json } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import '@shopify/shopify-api/adapters/node';
import shopifyRouter from './routes/ShopifyRoutes.js';
import userRouter from './routes/UserRoutes.js';
import dashboardRouter from './routes/DashboardRoutes.js';
import { connectToMongoDb } from './lib/mongo.js';
import cookieParser from 'cookie-parser';

// Load environment variables
config();

// Initialize Express
const app = express();
app.use(json());
app.use(cors());

// routes
app.use('/user', userRouter);
app.use('/shopify', shopifyRouter);
// app.use('/dashboard', dashboardRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    connectToMongoDb();
    console.log(`Server is running on http://localhost:${PORT}`);
});
