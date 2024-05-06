import { NextFunction, Request, Response } from "express"
import prisma from "../helpers/database"
import { AuthenticatedRequest } from "../middleware/verifyToken"





export const  getPosts  = async (req:Request, res:Response) => {

    try {
            const posts = await prisma.post.findMany()

            return res.status(200).json(posts)
    } catch (error) {
         console.log(error);
         return res.status(500).json({message:"Internal server error!"})
            
    }
}
export const  getPost  = async (req:Request, res:Response) => {
     const id = req.params.id

     try {
             const post  = await prisma.post.findUnique({
                where:{
                    id 
                }
             })
             return res.status(200).json({post:post})
     } catch (error) {
         console.log(error);
         
     }
}


export const  addPost  = async (req:AuthenticatedRequest, res:Response) => {

     try {
             const body = req.body;
              const tokenUserId = req.userId;

      const newPost  = await prisma.post.create({
        data:{
            ...body,
            userId:tokenUserId
        }
      })

      return res.status(201).json({message:"Post created", newPost:newPost}) 
     } catch (error) {
         console.log(error);
         res.status(500).json({message:"Failed to get posts"})
         
     }
}


export const  updatePost  = async (req:AuthenticatedRequest, res:Response) => {
    const id = req.params.id
    const tokenUserId = req.userId
    const body = req.body;
    try {
        const post = await prisma.post.findUnique({
            where:{
                id
            }
        })

        if(post?.userId !== tokenUserId){
            return res.status(401).json({message:"Unauthorized"})
        }

        const updatePost = await prisma.post.update({
            where:{
                id
            },
            data:body
        })
      
          return res.status(200).json({message:"post updated",updatePost:updatePost})

    } catch (error) {
         console.log(error);
         return res.status(500).json({message:"Internal server error!"})
         
    }
}
export const  deletePost  = async (req:AuthenticatedRequest, res:Response) => {
         const id = req.params.id
         const tokenUserId = req.userId
     try {
            const post = await prisma.post.findUnique({
                where:{
                    id
                }
            })

            if(post?.userId !== tokenUserId){
                return res.status(401).json({message:"Unauthorized"})
            }

            await prisma.post.delete({
                where:{id}
            })

            return res.status(200).json({message:"post deleted."})
     } catch (error) {
        console.log(error);
         res.status(500).json({message:"Internal Server error!"})
         
     }
}
