import jwt from "jsonwebtoken"
import getJwtToken from "./getJwtToken";
import { Response } from "express";
import { User } from "@prisma/client";

export enum Action {
    CreateUser = "createUser",
    UserLoggedIn = "userLoggedIn",
}


const cookieToken = (user:User,res:Response,action:Action)=>{
    const token = getJwtToken(user.id)
    const options = {
        expires : new Date(
            Date.now() + 3*24*60*60*1000
        ),
        httpOnly:true
    }
   
    let statusCode: number;
    let message: string;

    switch (action) {
        case Action.CreateUser:
            statusCode = 201;
            message = "User Created Successfully";
            break;
        case Action.UserLoggedIn:
            statusCode = 200;
            message = "User Logged In";
            break;
        default:
            statusCode = 200;
            message = "Operation Completed";
    }

    const responseData = {
        id: user.id,
        username: user.username,
        email:user.email,
        avatar:user.avatar
    }

   return res.status(statusCode).cookie('token',token,options).json({
        success: true,
        msg: message,
        user: responseData,
    })
}

export default cookieToken;