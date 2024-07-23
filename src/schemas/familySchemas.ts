import { z } from "zod"

export const familySchema = z.object({
  name: z.string(),
  members: z.array(z.string()).optional(),
  events: z.array(z.string()).optional(),
  reminders: z.array(z.string()).optional(),
})

export const createFamilySchema = z.object({
  name: z.string(),
})
