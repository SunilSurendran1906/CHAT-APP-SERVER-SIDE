import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "https://main--chat-app-project-zenclass.netlify.app",
    method: ["GET", "POST", "DELETE", "PUT"]
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Welcome message route
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Welcome to Chat App</title>
      </head>
      <body>
        <h1>Welcome to the Chat App</h1>
        <p>This is a simple chat application server. Use the API routes to interact with the app.</p>
      </body>
    </html>
  `);
});

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on port ${PORT}`);
});
