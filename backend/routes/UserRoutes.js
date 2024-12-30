import express from 'express';
import { userAddStore, userLogin, userRegister } from '../handlers/UserHandlers.js';

const router = express.Router();

router.post('/register', userRegister);
router.post('/add-store', userAddStore);
router.post("/login", userLogin);

export default router;
    