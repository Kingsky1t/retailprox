import express from 'express';
import { userLogin, userRegister, verifyUserToken } from '../handlers/UserHandlers.js';

const router = express.Router();

router.post('/register', userRegister);
router.post('/login', userLogin);
router.post('/verify-token', verifyUserToken);

export default router;
