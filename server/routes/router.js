import express from "express"

import authRoutes from "./auth.routes.js"
import usersRoutes from "./users.routes.js"
import bikesRoutes from "./bikes.routes.js"

/**
 * ### Router
 * 
 * Holds all Available routes
 */
const router = express.Router()

router.use("/auth",      authRoutes)
router.use("/users",     usersRoutes)
router.use("/bikes",     bikesRoutes)

export default router;