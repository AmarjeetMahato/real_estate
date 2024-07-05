import { Request, Response } from "express"
import { AuthenticatedRequest } from "../middleware/verifyToken";




export const getChats = async(req:AuthenticatedRequest,res:Response) => {
        const tokenUserId = req.userId
    try {
           const chats = await prisma?.chat.findMany({
              where:{
                userIDs:{
                    hasSome:[tokenUserId!]
                }
              }
           })

           return res.status(200).json({chats:chats})
    } catch (error) {
          console.log(error);
          return res.status(500).json({message:"Internal Server Error!"})
    }
}


export const getChat = async (req:AuthenticatedRequest,res:Response) => {

            const tokenUserId = req.userId
      try {
             const chat  = await prisma?.chat.findUnique({
                 where:{
                    id:req.params?.id,
                    userIDs:{
                          hasSome:[tokenUserId!]
                    }
                 },
                 include:{
                    messages:{
                         orderBy:{
                            createdAt:"asc"
                         }
                    }
                 }
             })

             await prisma?.chat.update({
                  where:{
                      id: req.params.id
                  },
                  data:{
                     seenBy:{
                        push:[tokenUserId!]
                     }
                  }
             })



             return res.status(200).json({chat:chat})
      } catch (error) {
          console.log(error);
          return res.status(500).json({message:"Internal Server Error!"})
          
      }
}


export const addChat = async (req:AuthenticatedRequest,res:Response) => {
         
            const tokenUserId = req.userId
    try {
            const newChat = await prisma?.chat.create({
                  data:{
                     userIDs:[tokenUserId!, req.body.receiverId]
                  }
            })

            return res.status(200).json({newChat:newChat})
    } catch (error) {
         console.log(error);
         return res.status(500).json({message:"Internal Server Error!"})
         
    }
}
export const readChat =async  (req:AuthenticatedRequest, res:Response) => {
   
            const tokenUserId  = req.userId
    try {
               const chat = await prisma?.chat.update({
                 where:{
                     id:req.params.id,
                     userIDs:{
                        hasSome:[tokenUserId as string]
                     }
                 },
                 data:{
                     seenBy:{
                         push:[tokenUserId!]
                     }
                 }
               }) 

          return res.status(200).json({chat:chat})
    } catch (error) {
          console.log(error);
          return res.status(500).json({message:"Internal server Error!"})
          
    }
}