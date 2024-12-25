import express from 'express';
import { userAddStore, userRegister } from '../handlers/UserHandlers.js';

const router = express.Router();

router.post('/register', userRegister);
router.post('/add-store', userAddStore);
router.get('/test', async (req, res) => {
    console.log('testing');
    res.send('test completed');
});

export default router;
    