import { Router } from "express"
import { createFamily } from "../controllers/familyController"

const router = Router()

router.post("/create", createFamily)

export default router
