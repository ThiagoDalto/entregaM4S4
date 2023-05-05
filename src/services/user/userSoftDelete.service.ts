import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";


const userSoftDeleteService = async (id: string
): Promise<void> => {
 

  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({
    id,
  });

   if (!findUser) {
    throw new Error("User not found");
  } 

  if(findUser.isActive === false){
    throw new Error("Missing authorization");
  }
 
 

  await userRepository.update(id, {
    isActive: false,
   
  });

  /* const user = await userRepository.findOneBy({
    id,
  });

  return user!; */
};

export default userSoftDeleteService;
