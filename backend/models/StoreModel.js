import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
  apiKey: String,
  apiSecretKey: String,
  accessToken: String,
  storeName: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export const Store = mongoose.model("Store", storeSchema);