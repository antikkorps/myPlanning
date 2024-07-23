import { Request, Response, NextFunction } from "express"
import { verifySessionToken } from "../utils/sessionManagement"
import dotenv from "dotenv"

dotenv.config()

export const userIsConnected = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookieName = process.env.SESSION_COOKIE_NAME as string
    const sessionToken = req.cookies[cookieName]
    if (!sessionToken) {
      return res.status(401).send("Session token is missing")
    }

    const userSession = await verifySessionToken(sessionToken)
    if (!userSession) {
      return res.status(401).send("Invalid session token")
    }

    req.user = userSession.user

    next()
  } catch (error) {
    res.status(500).send("An unexpected error occurred")
  }
}
