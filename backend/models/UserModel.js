import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: [6, 'Name too short'],
        maxLength: 20,
        required: true,
    },
    email: {
        type: String,
        minLength: [6, 'Email too short'],
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: [false, 'password is require'],
    },
    googleId: { type: String, unique: true },
    stores: [
        {
            storeId: { type: mongoose.Schema.Types.ObjectId, required: true },
            type: { type: String, required: true },
            storeName: { type: String, required: true },
            _id: false,
        },
    ],
});

export const User = mongoose.model('User', userSchema);
