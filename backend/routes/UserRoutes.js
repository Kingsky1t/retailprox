import express from 'express';
import { createUserByRequestingUser, fetchUsersCreatedByRequestingUser, userLogin, userRegister, verifyUserToken } from '../handlers/UserHandlers.js';
import { verifyAccessTokenMiddleware } from '../lib/middleware.js';

const router = express.Router();

router.post('/register', userRegister);
router.post('/login', userLogin);
router.post('/verify-user', verifyUserToken);
router.post('/create-user', verifyAccessTokenMiddleware, createUserByRequestingUser);
router.get('/fetch-users', verifyAccessTokenMiddleware, fetchUsersCreatedByRequestingUser);

export default router;
