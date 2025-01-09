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
        console.log(user)
        req.body.requestingUserId = user._id;
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: 'Invalid or Expired token.' });
    }
};
