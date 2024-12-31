import { User } from '../models/UserModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const userRegister = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Missing data.' });
    }
    try {
        const isUserAlreadyExisting = await User.findOne({ email });
        if (isUserAlreadyExisting) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '1d' });

        return res.status(200).json({
            success: true,
            message: 'User created successfully.',
            user: {
                userId: user._id,
                username: user.username,
                email: user.email,
                stores: user.stores,
            },
            accessToken,
        });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).send('Error registering user.');
    }
};

export const userLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Missing data.' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '1d' });

        return res.status(200).json({
            success: true,
            message: 'User Logged In successfully.',
            user: {
                userId: user._id,
                username: user.username,
                email: user.email,
                stores: user.stores,
            },
            accessToken,
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ message: 'Error logging in user.' });
    }
};

export const verifyUserToken = async (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Refresh token or login again.' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        const user = await User.findById(decodedToken.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        return res.status(200).json({
            success: true,
            message: 'Successfully verified token.',
            user: {
                userId: user._id,
                username: user.username,
                email: user.email,
                stores: user.stores,
            },
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Invalid or Expired token.' });
    }
};
