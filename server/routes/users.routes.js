import express from "express"
import { 
        getUsers
        , getUserByID
} from "../controllers/users.js"


const router = express.Router()

router.get('/', getUsers)
router.get("/:userID", getUserByID)



export default router