import { Request, Response, NextFunction } from "express"

export const userIsHead = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user || !req.user.isHead) {
      return res.status(403).send("Access denied. User is not the head of the family.")
    }

    next()
  } catch (error) {
    res.status(500).send("An unexpected error occurred")
  }
}
