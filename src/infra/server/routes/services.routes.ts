import { Router } from "express";

import { ServicesControllers } from "../controllers/services.controllers";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const servicesRoutes = Router();
const servicesControllers = new ServicesControllers();

servicesRoutes.use(ensureAuthentication);

servicesRoutes.post("/", servicesControllers.create);

servicesRoutes.delete("/", servicesControllers.delete);

export { servicesRoutes };
