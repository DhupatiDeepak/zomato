import express from 'express';
import { authUser, registerUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', authUser);
router.post('/register', registerUser); // Changed from / to /register to match user's potential expectation, or /api/users for register? Plan said /api/users context.
// Actually standard is often POST /api/users for register. I'll stick to that in server.js mounting.
// But to be clear:
// POST /api/auth/login
// POST /api/auth/register

// User plan said: register api, login api.
// I'll make it:
// POST /login
// POST /register
// And mount this router at /api/auth (or /api/users)

export default router;
