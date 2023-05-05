import { Router } from "express";

import createUserController from "../../controllers/createUser.controllers";
import userListController from "../../controllers/userList.controller";
import userSoftDeleteController from "../../controllers/userSoftDelete.controller";
import userUpdateController from "../../controllers/userUpdate.controller";
import ensureAuthMiddleware from "../../middlewares/ensureAuth.middleware";
import ensureAuthUpdate from "../../middlewares/ensureAuthUpdate.middleware";
import ensureIsAdmMiddleware from "../../middlewares/ensureIsAdm.middleware";

const userRoutes = Router();

userRoutes.post("", createUserController);
userRoutes.get(
  "",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  userListController
);
userRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureAuthUpdate,
  userUpdateController
);
userRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  userSoftDeleteController
);

export default userRoutes;
