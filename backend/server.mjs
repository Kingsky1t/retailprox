import express, { json } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import '@shopify/shopify-api/adapters/node';
import shopifyRouter from './routes/ShopifyRoutes.js';
import userRouter from './routes/UserRoutes.js';
import { connectToMongoDb } from './lib/mongo.js';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import session from 'express-session';
import jwt from 'jsonwebtoken';
import { handleGoogleCallback } from './lib/middleware.js';

// Load environment variables
config();

// Initialize Express
const app = express();
app.use(session({secret:'cats'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(json());
app.use(cors());


// Configure Google OAuth Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:5000/auth/google/callback', // Match the redirect URI
            passReqToCallback:true,
        },
        (req, accessToken, refreshToken, profile, done) => {
            console.log('Google OAuth login successful:', profile);
            req.user = { profile, accessToken }; // Log the user profile
            done(null, profile);
        }
    )
);
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    done(null, { id }); 
});

// Google OAuth routes
app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
    '/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect:'/auth/failure',
        session: false, // Disable session since we use tokens
    }),
    handleGoogleCallback  //Google middleWare to create Accesstoken
   
);

app.get('/auth/failure',(req,res)=>{
    res.send("something went wrong");
});


// Routes
app.use('/user', userRouter);
app.use('/shopify', shopifyRouter);
// app.use('/dashboard', dashboardRouter);

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    connectToMongoDb();
    console.log(`Server is running on http://localhost:${PORT}`);
});
