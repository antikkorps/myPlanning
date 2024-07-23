import { UserSession } from "../utils/types"

export async function verifySessionToken(token: string): Promise<UserSession | null> {
  // Ici, insérez la logique pour vérifier le token (par exemple, vérifier dans une base de données)
  if (token === "tokenValide") {
    return {
      userId: "userId",
      username: "username",
      valid: true,
      expiresAt: new Date(),
    }
  } else {
    return null
  }
}
