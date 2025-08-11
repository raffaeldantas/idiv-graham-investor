import express from 'express';
import { GoogleAuth } from './auth/googleAuth';

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Initialize Google Authentication
const googleAuth = new GoogleAuth();

// Route for Google Sign-In
app.post('/auth/google/signin', async (req, res) => {
    try {
        const user = await googleAuth.signIn(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route for Google Sign-Out
app.post('/auth/google/signout', async (req, res) => {
    try {
        await googleAuth.signOut(req.body);
        res.status(200).json({ message: 'Signed out successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});