import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = Router();

// Route to initiate Google authentication
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google callback route
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    // Generate JWT token
    const user = req.user as Express.User;
    const token = jwt.sign({ id: user.id, email: user.emails[0].value }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    // Send the token as a response or redirect
    res.json({ token });
  }
);

export default router;
