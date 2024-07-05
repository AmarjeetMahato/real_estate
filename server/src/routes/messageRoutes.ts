import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import { addMessage } from "../controllers/messageController";


const router  = Router();

router.post("/:chatId",verifyToken, addMessage)

export default router