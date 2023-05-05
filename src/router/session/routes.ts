import { Router } from "express";
import createSessionController from "../../controllers/createSession.controllers";

const sessionRoutes = Router();

sessionRoutes.post("", createSessionController);

export default sessionRoutes;
