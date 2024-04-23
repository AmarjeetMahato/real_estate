import { Router } from "express";
import { SignUp, getSingleUser, logout, signIn } from "../controllers/authController";


const router  = Router();


router.post(`/getSingleUser`,getSingleUser)
router.post(`/signup`,SignUp)
router.post(`/signin`,signIn)
router.post(`/logout`,logout)


export default router