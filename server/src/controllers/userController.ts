import { Request, Response } from "express";
import prisma from "../helpers/database"
import { AuthenticatedRequest } from "../middleware/verifyToken";
import bcrypt from "bcrypt"





export const getUsers = () => {}
export const getUser = () => {}


// Update User
export const updateUser = async(req:AuthenticatedRequest, res:Response) => {
    try {
        const userId = req.params.id;
         const tokenUserId = req.userId;
         let {password,avatar,...inputs} = req.body
         // console.log("userId:",userId)
         // console.log("TokenId:",tokenUserId);
         
        if(userId !== tokenUserId) return res.status(401).json({message:"Unauthorized!"})
            
         let updatedPassword = null;

         if(password){
            updatedPassword = await bcrypt.hash(password,10)
         }
          
         const updateUser = await prisma.user.update({
            where:{
               id:userId
            },
            data:{
               ...inputs,
               ...(updatedPassword && {password:updatedPassword}),
               ...(avatar && {avatar})
            },
            select:{
                 id:true,
                 username:true,
                 email:true,
                 avatar:true
            }
         })

        

        return res.status(200).json({message:"User updated Successfully", updateUser:updateUser})

} catch (error) {
     console.log(error);
     return res.status(500).json({message:"Internal Error!"})
     
}
}



export const deleteUser = async(req:AuthenticatedRequest, res:Response) => {
   try {
      const userId = req.params.id;
      const tokenUserId = req.userId;


      if(userId !== tokenUserId) return res.status(401).json({message:"Unauthorized!"})
            
         await prisma.user.delete({
            where:{
               id:userId
            }
         })

         return res.status(200).json({message:"User deleted!"})
   
   } catch (error) {
      console.log(error);
      return res.status(500).json({message:"Internal Error!"})
   }
}
export const savePost = () => {}
export const profilePosts = () => {}
export const getNotificationNumber = () => {}