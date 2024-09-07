import { NextRequest, NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface UserPayload {
  userId: string;
  username: string;
  email: string;
  role: string;
}

export async function authenticateJWT(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return new NextResponse('Access Denied', { status: 401 });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET || '') as JwtPayload & UserPayload;

    if (isUserPayload(decodedToken)) {
      return { user: decodedToken };
    } else {
      return new NextResponse('Invalid Token', { status: 403 });
    }
  } catch (err) {
    return new NextResponse('Invalid Token', { status: 403 });
  }
}

function isUserPayload(payload: JwtPayload & UserPayload): payload is UserPayload {
  return (payload as UserPayload).userId !== undefined &&
         (payload as UserPayload).username !== undefined &&
         (payload as UserPayload).email !== undefined &&
         (payload as UserPayload).role !== undefined;
}

export function authorizeRoles(roles: string[]) {
  return async (req: NextRequest) => {
    const userOrResponse = await authenticateJWT(req);
    if (userOrResponse instanceof NextResponse) {
      return userOrResponse; // If authentication fails, return the response
    }

    const { user } = userOrResponse;
    if (roles.includes(user.role)) {
      return user;
    } else {
      return new NextResponse('Access Forbidden', { status: 403 });
    }
  };
}
