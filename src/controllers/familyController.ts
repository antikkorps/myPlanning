import { Request, Response } from "express"
import { familyService } from "../services"
import { familySchemas } from "../schemas"

export const createFamily = async (req: Request, res: Response) => {
  try {
    const validatedData = familySchemas.createFamilySchema.parse(req.body)
    const family = await familyService.createFamily(validatedData.name)
    res.status(201).json(family)
  } catch (error) {
    if (error instanceof Error && "errors" in error) {
      res.status(400).send(error.errors)
    } else {
      res.status(500).send("An unexpected error occurred")
    }
  }
}

export const updateFamily = async (req: Request, res: Response) => {
  try {
    const validatedData = familySchemas.updateFamilySchema.parse(req.body)
    const familyId = req.params.familyId
    const updatedFamily = await familyService.updateFamily(familyId, validatedData)
    res.status(200).json(updatedFamily)
  } catch (error) {
    if (error instanceof Error && "errors" in error) {
      res.status(400).send(error.errors)
    } else {
      res.status(500).send("An unexpected error occurred")
    }
  }
}
