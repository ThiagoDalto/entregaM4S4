import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { IUserRequest } from "../interfaces/users";
import createUserService from "../services/user/createUser.service";

const createUserController = async (req: Request, res: Response) => {
  try {
    const user: IUserRequest = req.body;

    const createdUser = await createUserService(user);

    return res.status(201).json(instanceToPlain(createdUser));
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
};

export default createUserController;
