import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";

import countriesRoutes from "./countries.routes.js";
import authRoutes from "./auth.routes.js";
import usersRoutes from "./users.routes.js";
import techniciansRoutes from "./technicians.routes.js";
import bikesRoutes from "./bikes.routes.js";
import interventionsRoutes from "./interventions.routes.js";
import servicesRoutes from './services.routes.js';
import productsRoutes from './products.routes.js';
import invoicesRoutes from './invoice.routes.js';


/**
 * ### Router
 * 
 * Holds all Available routes
 */
const router = express.Router();

router.use("/countries",      countriesRoutes);

router.use("/auth",           authRoutes);

router.use("/users",          authMiddleware,   usersRoutes);

router.use("/technicians",    authMiddleware,   techniciansRoutes);

router.use("/bikes",          authMiddleware,   bikesRoutes);

router.use("/interventions",  authMiddleware,   interventionsRoutes);

router.use("/services",       authMiddleware,   servicesRoutes);

router.use("/products",       authMiddleware,   productsRoutes);

router.use("/invoices",       authMiddleware,   invoicesRoutes);

export default router;