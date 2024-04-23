import jwt from "jsonwebtoken"


const getJwtToken = (userId: string) => {
    return jwt.sign({userId:userId,isAdmin:false},process.env.JWT_TOKEN!,{expiresIn:'3 day'})
}

export default getJwtToken;