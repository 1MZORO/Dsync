import { Request, Response } from "express";
import prisma from "../config/db.config.js";

interface ChatGroupUserType {
  name: string;
  group_id: string;
}

class ChatGroupUser {
  static async index(req: Request, res: Response) {
    try {
      const { group_id } = req.query;
      const user = await prisma.groupUser.findMany({
        where: {
          group_id: group_id as string,
        },
      });

      return res
        .status(200)
        .json({ message: "Data fetch successFull", data: user });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong. Please try again!" });
    }
  }
  static async store(req: Request, res: Response) {
    try {
      const body: ChatGroupUserType = req.body;
      const user = await prisma.groupUser.create({
        data: body,
      });

      return res.status(200).json({message:"User add Successfully!" ,data:user})
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong. Please try again!" });
    }
  }
}

export default ChatGroupUser;
