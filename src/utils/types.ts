export interface UserSession {
  userId: string
  username: string
  valid: boolean
  expiresAt?: Date
}
