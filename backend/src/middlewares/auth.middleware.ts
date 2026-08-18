import type { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../modules/auth/session/session.service.js";

export type AuthUser = {
  userId: string;
  role: string;
};

export type AuthenticatedRequest = Request & {
  user: AuthUser;
};

function readBearerToken(req: Request) {
  const authorization = req.headers.authorization;
  if (!authorization?.startsWith("Bearer ")) return null;
  return authorization.slice("Bearer ".length).trim();
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = readBearerToken(req);
  if (!token) {
    res.status(401).json({ success: false, message: "Authentication required." });
    return;
  }

  try {
    (req as AuthenticatedRequest).user = verifyAccessToken(token);
    next();
  } catch {
    res.status(401).json({ success: false, message: "Invalid or expired access token." });
  }
}

export function authorize(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = (req as AuthenticatedRequest).user?.role;
    if (!role || !allowedRoles.includes(role)) {
      res.status(403).json({ success: false, message: "Forbidden." });
      return;
    }

    next();
  };
}
