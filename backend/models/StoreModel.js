import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
    apiKey: { type: String, required: true },
    apiSecretKey: { type: String, required: true },
    accessToken: { type: String, required: true },
    storeName: { type: String, required: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

export const Store = mongoose.model('Store', storeSchema);
