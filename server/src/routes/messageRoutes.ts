import { Router } from "express";
import { SignUp, logout, signIn } from "../controllers/authController";


const router  = Router();



router.post(`/signup`,SignUp)
router.post(`/signin`,signIn)
router.post(`/logout`,logout)


export default router