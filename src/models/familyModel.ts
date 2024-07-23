import prisma from "../prisma/client"

export const findFamilyById = (familyId: string) => {
  return prisma.family.findUnique({ where: { id: familyId } })
}

export const findFamilyByMemberId = (familyId: string) => {
  return prisma.family.findFirst({ where: { members: { some: { id: familyId } } } })
}
