import { User } from '../models/UserModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const formatUserData = user => {
    const { _id, username, email, createdBy, stores, createdAt, updatedAt } = user;
    return { _id, username, email, createdBy, stores, createdAt, updatedAt };
};

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
        const user = await User.create({ username, email, password: hashedPassword, createdBy: null });

        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '1d' });

        return res.status(200).json({
            success: true,
            message: 'User created successfully.',
            user: formatUserData(user),
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
            user: formatUserData(user),
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
            user: formatUserData(user),
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Invalid or Expired token.' });
    }
};

export const createUserByRequestingUser = async (req, res) => {
    const { requestingUserId, username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Missing data.' });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // check if user already exist or not
        const isUserAlreadyExisting = await User.findOne({ email });
        if (isUserAlreadyExisting) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // create a hashed password
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = await User.create({ username, email, password: hashedPassword, createdBy: requestingUserId });

        await session.commitTransaction();
        session.endSession();

        // can return the password to show the admin
        return res.status(201).json({
            success: true,
            message: 'User created successfully.',
            user: formatUserData(createdUser),
        });
    } catch (err) {
        console.error(err);

        await session.abortTransaction();
        session.endSession();

        return res.status(500).json({ message: 'Error Creating New User.' });
    }
};

export const fetchUsersCreatedByRequestingUser = async (req, res) => {
    const { requestingUserId } = req.body;

    try {
        const users = await User.find({ createdBy: requestingUserId });
        return res.status(200).json({
            success: true,
            message: 'Retrieved users created by requesting user.',
            users: users.map(user => ({
                userId: user._id,
                username: user.username,
                email: user.email,
            })),
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error fetching users created by requested user.' });
    }
};
