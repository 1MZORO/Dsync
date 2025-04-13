import { Request, Response } from "express";
import prisma from "../config/db.config.js";
import jwt from "jsonwebtoken";
interface LoginPayloadType {
  name: string;
  email: string;
  provider: string;
  oauth_id: string;
  image?: string;
}

class AuthController {
  static async login(req: Request, res: Response) {
    try {
      //get request from front end
      const body: LoginPayloadType = req.body;
      // Validate required fields
      if (!body.email || !body.name || !body.provider || !body.oauth_id) {
        return res
          .status(400)
          .json({ message: "Missing required fields in request body" });
      }

      //check is user exist or not
      let findUser = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });

      // if user does not exit then create it
      if (!findUser) {
        findUser = await prisma.user.create({
          data: body,
        });
      }

      //This is creating a JavaScript object that will be used as the payload of a JWT token
      let JWTPayload = {
        name: body.name,
        email: body.email,
        id: findUser.id,
      };
      const token = jwt.sign(JWTPayload, process.env.JWT_SECRET, {
        expiresIn: "40d",
      });
      return res.status(200).json({
        message: "Logged in SuccessFully!",
        user: {
          ...findUser,
          token: `Bearer ${token}`,
        },
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong.please try again!" });
    }
  }
}

export default AuthController;
