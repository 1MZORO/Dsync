import { Response, Request } from "express";
import prisma from "../config/db.config.js";
// import prisma from '../config/db.config';

class ChatGroupController {
  // fetch data
  static async index(req: Request, res: Response) {
    try {
      const user = req.user;

      const group = await prisma.chatGroup.findMany({
        where: {
          user_id: Number(user.id),
        },
        orderBy: {
          created_at: "desc",
        },
      });
      return res
        .status(200)
        .json({ message: "Chat groups fetched successfully!.", data: group });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong.Please try again!" });
    }
  }

  //show only one
  static async show(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const group = await prisma.chatGroup.findUnique({
        where: {
          id: id,
        },
      });
      return res
        .status(200)
        .json({ message: "Chat group fetched successfully!.", data: group });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong.Please try again!" });
    }
  }

  static async store(req: Request, res: Response) {
    try {
      const body = req.body;
      const user = req.user;

      await prisma.chatGroup.create({
        data: {
          title: body.title,
          passcode: body.passcode,
          user_id: Number(user.id),
        },
      });
      return res
        .status(200)
        .json({ message: "Chat group created successfully!." });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong.Please try again!" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const body = req.body;
      const { id } = req.params;

      await prisma.chatGroup.update({
        data: {
          title: body.title,
          passcode: body.passcode,
        },
        where: {
          id: id,
        },
      });
      return res
        .status(200)
        .json({ message: "Chat group updated successfully!." });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong.Please try again!" });
    }
  }

  static async destroy(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const group = await prisma.chatGroup.delete({
        where: {
          id: id,
        },
      });
      return res
        .status(200)
        .json({ message: "Chat group deleted successfully!.", data: group });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong.Please try again!" });
    }
  }
}

export default ChatGroupController;
