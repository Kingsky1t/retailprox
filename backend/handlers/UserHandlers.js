import { User } from '../models/UserModel.js';
import { Store } from '../models/StoreModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const userRegister = async (req, res) => {
    const { username, email, password } = req.body;
    console.log(username, email, password)
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
                username,
                email,
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
            message: 'User logged in successfully.',
            user: { username: user.username, email: user.email },
            accessToken,
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ message: 'Error logging in user.' });
    }
};

export const userAddStore = async (req, res) => {
    const { userId, apiKey, apiSecretKey, accessToken, storeName } = req.body;
    try {
        // Check if user exists
        const user = await User.findById(userId);
        if (!user) return res.status(404).send('User not found.');

        // Create a new store and associate with the user
        const store = new Store({ apiKey, apiSecretKey, accessToken, storeName, user: user._id });
        await store.save();

        // Add store reference to the user's stores array
        user.stores.push(store._id);
        await user.save();

        res.status(201).json({ message: 'Store added successfully.', storeId: store._id });
    } catch (error) {
        console.error('Error adding store:', error);
        res.status(500).send('Error adding store.');
    }
};
