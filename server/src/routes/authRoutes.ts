import { Router } from "express";
import { SignUp, getSingleUser, logout, signIn } from "../controllers/authController";
import { verifyToken } from "../middleware/verifyToken";


const router  = Router();


router.post(`/getSingleUser`,getSingleUser),
router.post(`/signup`,SignUp)
router.post(`/signin`,signIn)
router.post(`/logout`,verifyToken,logout)


export default router