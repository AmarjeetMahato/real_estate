import express from "express";
import {verifyToken} from "../middleware/verifyToken";
import { addPost, deletePost, getPost, getPosts, postDetails, updatePost } from "../controllers/postControllers";

const router = express.Router();

router.get("/postDetails/:id",postDetails)
router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", verifyToken, addPost);
router.put("/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);

export default router;