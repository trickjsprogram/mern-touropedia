import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";
import tourRouter from "./routes/tour.js";
import profileRouter from "./routes/profile.js";
import { Server } from "socket.io";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// app.use(function (req, res, next) {
//   res.setHeader(
//     "Access-Control-Allow-Origin",
//     "https://touropedia.netlify.app"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, PATCH"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });

const devEnv = process.env.NODE_ENV !== "production";

const io = new Server({
  cors: {
    origin: `${
      devEnv ? "http://localhost:3000" : "https://touropedia.netlify.app"
    }`,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let onlineUsers = [];

const addNewUser = (username, socketId) => {
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({ username, socketId });
};

const removeUser = (socketId) => {
  return onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};

io.on("connection", (socket) => {
  socket.on("newUser", (username) => {
    addNewUser(username, socket.id);
  });

  socket.on("sendNotification", ({ senderName, receiverName }) => {
    const receiver = getUser(receiverName);
    io.to(receiver.socketId).emit("getNotification", {
      senderName,
    });
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

app.use("/users", userRouter); // http://localhost:5000/users/signup
app.use("/tour", tourRouter);
app.use("/profile", profileRouter);
app.get("/", (req, res) => {
  res.send("Welcome to tour API");
});

const port = process.env.PORT || 5000;

const server = app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);

io.listen(server);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => server)
  .catch((error) => console.log(`${error} did not connect`));
