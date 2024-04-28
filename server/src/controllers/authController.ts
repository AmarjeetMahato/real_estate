import bcrypt from "bcrypt"
import { Request, Response } from "express";
import cookieToken, { Action } from "../helpers/jwtToken";
import prisma from "../helpers/database"


export const getSingleUser = async (req:Request,res:Response) => {
      try {
             const {email} = req.body;

             const findUser = await prisma.user.findUnique({
                where:{
                  email
                }
             })
             if (findUser) {
               // Destructure the user object excluding the password field
               const { password,chatIDs,updatedAt,createdAt, ...userData } = findUser;
   
               // Send the user details (excluding password) in the response
               return res.status(200).json(userData);
           } else {
               return res.status(404).json({ message: "User not found" });
           }
      } catch (error) {
         console.error("Error fetching user:", error);
         return res.status(500).json({ message: "Internal server error" });
      }
}



export const getAllUser = async(req:Request,res:Response) => {
     
         try {
              const alluser = await prisma.user.findMany();
              console.log(alluser);
              return res.status(200).json(alluser)
         } catch (error) {
              console.log(error);
         }
   }


// export const sentOtp = async (req:Request,res:Response) => {
//      const {email} = req.body;

//      if(!email){
//         return res.status(401).json({message:"Email is required"})
//      }

//      try {
//              const code = Math.floor(100000 + Math.random() * 900000)

//              return res.status(200).json({
//                code:code,
//                message:"OTP sent Sucessfully"})
//      } catch (error) {
//        console.log(error);
       
//      }
// }


export const SignUp = async (req:Request, res:Response) => {
      try {
                   const {username,email,password} =  await req.body;

                   if(!username|| !email || !password) {
                      return res.status(401).json({message:"All fields are required!"})
                   }

                   const userExisting = await prisma.user.findUnique({
                      where:{
                           email
                      }
                   })

                   if(userExisting){
                      return res.status(400).json({message:"User already exist!"})
                   }

                   const hashedPasword = await bcrypt.hash(password, 10)

                   const user = await prisma.user.create({
                      data :{
                        username,
                        email,
                        password: hashedPasword,
                      }
                   })

                   cookieToken(user,res,Action.CreateUser)


      } catch (error) {
            console.log(error);
            
      }
}


export const signIn = async (req:Request, res:Response)=> {
        try {
            const {email, password} = await req.body;
          
            if(!email || !password) {
               return res.status(400).json({msg:`Need all fields`})
            }
   
            
            const user = await prisma.user.findUnique({
                where:{
                     email
                }
             })
   
              if(!user){
                 return res.status(404).json({msg:`No user found`})
              }
   
              const comparePassword = await bcrypt.compare(password,user.password)
              if(!comparePassword) return res.status(404).json({msg:`Wrong password`})
   
              cookieToken(user,res, Action.UserLoggedIn)
        } catch (error) {
              console.log(error);
              
        }
}


export const logout = async (req:Request, res:Response) => {
      try {
            res.clearCookie('token').json({
              success:true,
              msg:'User logged out'})
           
       } catch (error) {
          console.log(error);
       }
}


