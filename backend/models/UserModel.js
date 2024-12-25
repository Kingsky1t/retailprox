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
        required: [true, 'password is require'],
    },
    stores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Store' }],
});

export const User = mongoose.model('User', userSchema);
