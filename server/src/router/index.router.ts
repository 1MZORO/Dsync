import { Router } from "express";
import AuthController from "../controller/auth.controller.js";
import authMiddleware from "../middleware/Auth.middleware.js";
import ChatGroupController from "../controller/chatgroup.controller.js";
import ChatGroupUser from "../controller/chatGroupUser.controller.js";
import chats from "../controller/chat.controller.js";

const router = Router();

//Auth router
router.post("/auth/login", AuthController.login);

//chat routes
router.get("/chat-group", authMiddleware, ChatGroupController.index);
router.get("/chat-group/:id", ChatGroupController.show);
router.post("/chat-group", authMiddleware, ChatGroupController.store);
router.put("/chat-group/:id", authMiddleware, ChatGroupController.update);
router.delete("/chat-group/:id", authMiddleware, ChatGroupController.destroy);

//chat group user
router.post("/chat-group-users", ChatGroupUser.store);
router.get("/chat-group-users", ChatGroupUser.index);

//chats message
router.get("/chat/:groupId", chats.index);

export default router;
