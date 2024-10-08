import "dotenv/config"
import express from "express"
import session from "express-session"
import passport from "passport"
import cors from "cors"
import authRoutes from "./routes/authRoutes"

const app = express()

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
}

app.use(cors(corsOptions))

app.use(express.json())
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
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
  const user = await findUserById(id) // Assurez-vous que findUserById est défini dans src/models/user.ts
  done(null, user)
})

app.use("/auth", authRoutes)

app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API de myPlanning")
})

export default app
