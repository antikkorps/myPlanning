import "dotenv/config"
import express from "express"
import session from "express-session"
import passport from "passport"
import cors from "cors"
import { userModel } from "../src/models"
import { authRoutes, familyRoutes } from "./routes"

const app = express()

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
}

app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    name: process.env.SESSION_COOKIE_NAME,
    cookie: {
      httpOnly: true,
      secure: false, // pass to true in production
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
  })
)
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
  done(null, (user as any).id)
})

passport.deserializeUser(async (id, done) => {
  if (typeof id === "string") {
    const user = await userModel.findUserById(id) // defined in src/models/user.ts
    done(null, user)
  } else {
    done(new Error("User ID must be a string"), null)
  }
})

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/family", familyRoutes)

app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API de myPlanning")
})

export default app
