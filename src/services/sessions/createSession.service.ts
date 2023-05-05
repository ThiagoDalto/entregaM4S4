import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserLogin } from "../../interfaces/users";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const createSessionService = async ({ email, password }: IUserLogin) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const account = users.find((user) => user.email === email);
  if (!account) {
    throw new Error("Invalid user or password");
  }
  const passwordMatch = await compare(password, account.password);

  if (!passwordMatch) {
    throw new Error("Invalid user or password");
  }

  const token = jwt.sign(
    {
      isAdm: account.isAdm,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "24h",
      subject: account.id,
    }
  );
  return token;
};

export default createSessionService;
