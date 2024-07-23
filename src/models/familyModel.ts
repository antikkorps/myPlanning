import prisma from "../prisma/client"

export const createFamily = (name: string) => {
  return prisma.family.create({ data: { name } })
}

export const updateFamily = (
  familyId: string,
  updatedData: {
    name?: string
    address?: string
    city?: string
    postalCode?: string
    country?: string
  }
) => {
  return prisma.family.update({
    where: { id: familyId },
    data: updatedData,
  })
}

export const findFamilyById = (familyId: string) => {
  return prisma.family.findUnique({ where: { id: familyId } })
}

export const findFamilyByMemberId = (familyId: string) => {
  return prisma.family.findFirst({ where: { members: { some: { id: familyId } } } })
}

export const addMemberToFamily = (familyId: string, memberId: String) => {
  return prisma.family.update({
    where: { id: familyId },
    data: {
      members: {
        connect: { id: familyId },
      },
    },
  })
}
