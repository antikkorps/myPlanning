import prisma from "../prisma/client"

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } })
}

export const findUserById = async (id: string) => {
  return await prisma.user.findUnique({ where: { id } })
}

export const createUser = async (email: string, password: string, name: string) => {
  return await prisma.user.create({
    data: { email, password, name },
  })
}