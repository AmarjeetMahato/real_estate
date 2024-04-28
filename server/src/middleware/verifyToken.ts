import jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from "express"
import { User } from "@prisma/client";
import util from "util";


export interface AuthenticatedRequest extends Request {
    userId?: string; 
    user?: User; 
  }

export const verifyToken = async (req: AuthenticatedRequest, res: Response, next:NextFunction) => {  
     try {
          const token = req.cookies.token;
          //  console.log("toekn",token)
          if (!token) return res.status(401).json({ message: "Not Authenticated!" });

          const verifyTokenAsync = util.promisify(jwt.verify);

          // Verifying the token
          const payload = jwt.verify(token, process.env.JWT_TOKEN!);
  
          // Setting userId in the request object
          req.userId = (payload as any).userId;
          //  console.log("userId", req.userId);
 
           // Proceed to the next middleware or route handler
           next();
          
     } catch (error) {
        console.log(error);
     }
}