import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'password is require'],
        },
        stores: [
            {
                storeId: { type: mongoose.Schema.Types.ObjectId, required: true },
                type: { type: String, required: true },
                storeName: { type: String, required: true },
                _id: false,
            },
        ],
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    },
    { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
