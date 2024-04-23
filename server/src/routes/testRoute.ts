import express from "express"
import { shouldbeAdmin, shouldbeLoggedin } from "../controllers/testContoller";


const router = express.Router()



router.get(`/should-be-logged-in`,shouldbeLoggedin)
router.get(`/should-be-admin`,shouldbeAdmin)




export default router;