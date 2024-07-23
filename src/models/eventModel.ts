import prisma from "../prisma/client"

export const findEventById = (eventId: string) => {
  return prisma.event.findUnique({ where: { id: eventId } })
}

export const findEventByFamily = (family: string) => {
  return prisma.event.findMany({
    where: {
      family: {
        id: family,
      },
    },
  })
}

export const findEventByUser = (user: string) => {
  return prisma.event.findMany({
    where: {
      user: {
        id: user,
      },
    },
  })
}

export const findEventByDate = (date: string) => {
  return prisma.event.findMany({ where: { startDate: date } })
}
