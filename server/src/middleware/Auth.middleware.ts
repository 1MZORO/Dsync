import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ status: 401, message: "Unauthorized: Invalid or missing token" });
  }

  const token = authHeader.split(" ")[1];

  
  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      return res.status(401).json({ status: 401, message: "Unauthorized: Invalid token" });
    }

    req.user = decoded as AuthUser;
    next();
  });
};

export default authMiddleware;
