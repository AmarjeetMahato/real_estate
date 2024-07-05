import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/verifyToken";


export const addMessage = async (req:AuthenticatedRequest,res:Response) => {
        
               const tokenUserId  = req.userId
               const chatId = req.params.chatId
               const text = req.body.text
    try {
              const chat = await prisma?.chat.findUnique({
                  where:{
                      id:chatId,
                      userIDs:{
                        hasSome:[tokenUserId!]
                      }
                  }
              })

              if(!chat) return res.status(404).json({message:"chat not found!"})

             const message = await prisma?.message.create({
                  data:{
                    text,
                    chatId,
                    userId: tokenUserId!
                  }
             })

             await prisma?.chat.update({
                  where:{
                      id:chatId
                  },
                  data:{
                    seenBy:[tokenUserId!],
                    lastMessage: text
                  }
             })
           return res.status(200).json({message:message})
    } catch (error) {
          console.log(error);
          return res.status(500).json({message:"Internal server error!"})
          
    }
}