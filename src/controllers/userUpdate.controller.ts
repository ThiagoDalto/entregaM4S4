import { Request, Response } from "express";
import { User } from "../entities/user.entity";
import { IUserUpdate } from "../interfaces/users";
import userUpdateService from "../services/user/userUpdate.service";

const userUpdateController = async (req: Request, res: Response) => {
  try {
    const user: IUserUpdate = req.body;
    const id: string = req.params.id;

    const bodyKeys = Object.keys(req.body);

    if (
      bodyKeys.includes("isActive") ||
      bodyKeys.includes("isAdm") ||
      bodyKeys.includes("id")
    ) {
      throw new Error("Can not update this field");
    }

    const updatedUser = await userUpdateService(user, id);
    const updatedUserNoPWD: any = { ...updatedUser };
    delete updatedUserNoPWD.password;

    return res.status(200).json(updatedUserNoPWD);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({
        message: error.message,
      });
    }
  }
};

export default userUpdateController;
