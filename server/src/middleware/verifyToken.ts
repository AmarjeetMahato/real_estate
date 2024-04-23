import jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from "express"
import { User } from "@prisma/client";

interface AuthenticatedRequest extends Request {
    userId?: string; // userId is optional in case it's not present in the payload
    user?: User; // Optional: If you want to include the entire user object
  }

export const verifyToken = async (req: AuthenticatedRequest, res: Response, next:NextFunction) => {  
     try {
          const token = req.cookies.token;
          if (!token) return res.status(401).json({ message: "Not Authenticated!" });

          jwt.verify(token, process.env.JWT_TOKEN! ,async (err:any|unknown, payload:any) => {
            if (err) return res.status(403).json({ message: "Token is not Valid!" });
            req.userId  = payload.id;
        
            next();
          })
     } catch (error) {
        console.log(error);
     }
}