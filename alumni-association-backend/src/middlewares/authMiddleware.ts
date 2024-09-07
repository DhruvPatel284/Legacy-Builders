// middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  userId: string;
  username: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.token; // Use optional chaining to handle undefined cookies

  if (!token) {
    return res.status(401).json({ message: 'Access Denied' });
  }
  //@ts-ignore
  jwt.verify(token, process.env.JWT_SECRET || '', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid Token' });
    }

    req.user = user as UserPayload; // Attach user to request object
    next();
  });
}

export function authorizeAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Access Forbidden' });
  }

  next();
}

export function checkRole(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user && roles.includes(req.user.role)) {
      next();
    } else {
      res.sendStatus(403);
    }
  };
}
