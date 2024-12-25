import { User } from '../models/UserModel.js';
import { Store } from '../models/StoreModel.js';
import bcrypt from 'bcryptjs';

export const userRegister = async (req, res) => {
    const { username, email, password } = req.body;
    console.log(username, email, password)
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).send('User registered successfully.');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Error registering user.');
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
