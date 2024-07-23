import { Router } from "express"
import { createFamily, updateFamily } from "../controllers/familyController"

const router = Router()

router.post("/create", createFamily)
router.put("/update/:familyId", updateFamily)

export default router
