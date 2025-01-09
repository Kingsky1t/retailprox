import { User } from '../models/UserModel.js';
import jwt from 'jsonwebtoken';

export const verifyAccessTokenMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(400).json({ message: 'No Access Token.' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        const user = await User.findById(decodedToken.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        
        req.body.requestingUserId = user._id;
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: 'Invalid or Expired token.' });
    }
};

export const handleGoogleCallback = async (req, res) => {
    try {
        const { id, displayName: username, emails } = req.user;
        const email = emails[0].value;
        const googleId = id;

        // Check if user exists
        let user = await User.findOne({ googleId });

        // If user does not exist, create a new one
        if (!user) {
            user = await User.create({
                username,
                email,
                googleId,
                password: '', // No password required for Google login
                stores: []    // Adjust as necessary
            });
        }

        // Generate a JWT token for the user
        const token = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '1d' });
        console.log("Generated Token:", token);

        // Redirect to the frontend with the token
        res.redirect(`http://localhost:5173/auth/success?token=${token}`);
    } catch (error) {
        console.error('Error in Google OAuth callback:', error);
        res.status(500).send('Internal Server Error');
    }
};
