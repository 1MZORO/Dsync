import { Response, Request } from "express";
import prisma from "../config/db.config.js";

class chats {
  static async index(req: Request, res: Response) {
    try {
      const { groupId } = req.params;
      const chats = await prisma.chats.findMany({
        where: {
          group_id: groupId,
        },
      });

      return res.status(200).json({ message: "chats deliverd", data: chats });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong.Please try again!" });
    }
  }
}

export default chats