import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import expressSession from "express-session";
import passport from "passport";
import initRouter from "./routers/index.js";
import passportConfig from "./controllers/passport.js";
import connectMongo from "connect-mongo";
import { createServer } from "http";
import { Server } from "socket.io";
import initSocket from "./socket/socket.js";

const mongoooseURL = "mongodb://localhost:27017/appchat_xuananh";
const app = express();
const PORT = 5000;
app.use(cors({ origin: "http://localhost:3000", credentials: true, optionsSuccessStatus: 200 }));
mongoose.connect(
  mongoooseURL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => {
    console.log("Connected to MongoDB");
  }
);

const server = createServer(app);
const sessionMiddleware = expressSession({
  secret: "anh",
  resave: false,
  saveUninitialized: false,
  store: connectMongo.create({ mongoUrl: mongoooseURL, autoRemove: "native" }),
  cookie: { maxAge: 600 * 60 * 24 * 1000 },
});
// -------------------------------------Socket------------------------------------------
const io = new Server(server, { cors: true, origin: ["http://localhost:3000"] });
// convert a connect middleware to a Socket.IO middleware
const wrap = (middleware) => (socket, next) => middleware(socket.request, {}, next);
io.use(wrap(sessionMiddleware));
io.use(wrap(passport.initialize()));
io.use(wrap(passport.session()));

io.use((socket, next) => {
  if (socket.request.user) {
    next();
  } else {
    next(new Error("unauthorized"));
  }
});
initSocket(io);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//session
app.use(sessionMiddleware);
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

initRouter(app);

server.listen(PORT, () => console.log(`server run at port ${PORT}`));
