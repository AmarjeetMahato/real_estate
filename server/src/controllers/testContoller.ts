import { Request, Response } from "express"
import jwt from "jsonwebtoken"

interface JWTTokenPayload {
    userId: string;
    username: string;
    // Add other properties as needed
  }


export const  shouldbeLoggedin = async (req:Request, res:Response) => {
          const token = req.cookies.token

          if(!token)  return res.status(401).json({message:"Not Authentication!"})
        
         jwt.verify(token, process.env.JWT_TOKEN!, async (err:any, payload:any)=> {
             if(err) return res.status(403).json({message:"Token is not valid"})
         })

         return res.status(200).json({message:"You are Authenticated!"})
         
}


export const  shouldbeAdmin = async (req:Request, res:Response) => {
    const token = req.cookies.token

    if(!token)  return res.status(401).json({message:"Not Authentication!"})
  
   jwt.verify(token, process.env.JWT_TOKEN!, async (err:any, payload:any)=> {
       if(err) return res.status(403).json({message:"Token is not valid"})
        if(!payload.isAdmin){
              return res.status(401).json({message:"Not Authorized!"})
        }
   })

   return res.status(200).json({message:"You are Authenticated!"})
}