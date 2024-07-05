import { Router } from "express";
import { SignUp, getAllUser, getSingleUser, logout, signIn } from "../controllers/authController";
import { verifyToken } from "../middleware/verifyToken";


const router  = Router();


router.post(`/getSingleUser`,getSingleUser),
router.get('/getallusers',getAllUser)
router.post(`/signup`,SignUp)
router.post(`/signin`,signIn)
router.post(`/logout`,verifyToken,logout)


export default router