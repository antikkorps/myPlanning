import prisma from "../prisma/client"

export const findReminderByID = (reminderId: string) => {
  return prisma.reminder.findUnique({ where: { id: reminderId } })
}

export const findReminderByTitles = (title: string) => {
  return prisma.reminder.findMany({ where: { title } })
}

export const findReminderByFamily = (familyId: string) => {
  return prisma.reminder.findMany({ where: { familyId: familyId } })
}

export const findReminderByUser = (user: string) => {
  return prisma.reminder.findMany({
    where: {
      user: { id: user },
    },
  })
}

export const findReminderByReminderDate = (reminderDate: string) => {
  return prisma.reminder.findMany({ where: { remindAt: reminderDate } })
}
