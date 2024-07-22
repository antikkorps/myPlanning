import { userModel } from "../models"
import { hashPassword, comparePasswords } from "../utils/bcrypt"

export const registerUser = async (email: string, password: string, name: string) => {
  const hashedPassword = await hashPassword(password)
  return await userModel.createUser(email, hashedPassword, name)
}

export const authenticateUser = async (email: string, password: string) => {
  const user = await userModel.findUserByEmail(email)
  if (user && (await comparePasswords(password, user.password))) {
    return user
  }
  return null
}
