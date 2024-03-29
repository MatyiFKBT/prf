import express, { type Express, type Request, type Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { seed } from "./db/seed";
import cookieParser from "cookie-parser";
import passport from "passport";
import expressSession from "express-session";
import { Strategy as localStrategy } from 'passport-local'
import { User } from "./db/User";
import userRouter from "./routes/user.router";
import songRouter from "./routes/song.router";
import { userInfo } from "os";
dotenv.config();
seed();

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/kndqji-beadando";
const port = process.env.PORT || 3000;

const app: Express = express();
mongoose.connect(MONGO_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('[db]: Connected to database'));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

passport.use('local', new localStrategy(async (username, password, done) => {
  console.log({ username, password })
  const user = await User.findOne({ username })
  if (!user) {
    return done(null, false, { message: 'Incorrect username.' })
  }
  const verified = await user.comparePassword(password);
  if (!verified) {
    return done(null, false, { message: 'Incorrect password.' })
  }
  return done(null, { username, role: user.role, _id: user._id })
}))

passport.serializeUser((user, done) => {
  if (!user) return done('No user', null)
  done(null, user)
})
passport.deserializeUser((user, done) => {
  if (!user) return done('No user', null)
  done(null, user)
})

app.use(expressSession({
  secret: 'keyboard cat',
  resave: true,
}))
app.use(passport.initialize())
app.use(passport.session())

app.use((req: Request, res: Response, next) => {
  console.log({
    method: req.method,
    url: req.url,
    user: req.user,
  })
  next()
})
app.use('/api/users', userRouter)
app.use('/api/songs', songRouter)
app.use('/',
  express.static('public')
)
app.use('', (req, res) =>
  res.redirect(301, '/')
)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});