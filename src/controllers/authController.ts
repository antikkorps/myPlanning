import { Request, Response } from "express"
import { registerUser, authenticateUser } from "../services/authService"
import { authSchemas } from "../schemas"

export const register = async (req: Request, res: Response) => {
  try {
    const validatedData = authSchemas.registerSchema.parse(req.body)
    const user = await registerUser(
      validatedData.email,
      validatedData.password,
      validatedData.name ?? ""
    )
    res.status(201).json(user)
  } catch (error) {
    if (error instanceof Error && "errors" in error) {
      res.status(400).send(error.errors)
    } else {
      res.status(500).send("An unexpected error occurred")
    }
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const validatedData = authSchemas.loginSchema.parse(req.body)
    const user = await authenticateUser(validatedData.email, validatedData.password)
    if (user) {
      req.login(user, (err) => {
        if (err) {
          return res.status(500).send(err)
        }
        return res.status(200).json(user)
      })
    } else {
      res.status(401).send("Invalid credentials")
    }
  } catch (error) {
    if (error instanceof Error && "errors" in error) {
      res.status(400).send(error.errors)
    } else {
      res.status(500).send("An unexpected error occurred")
    }
  }
}
