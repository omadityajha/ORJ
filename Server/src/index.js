// src/index.js
import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server as SocketServer } from 'socket.io';
import fileSocketHandler from './sockets/fileSocket.js';
import {connectDB} from './utils/db.js';
import dotenv from "dotenv";
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, { cors: { origin:  process.env.CLIENT_URL} });

app.use(cors());
app.use(express.json());

app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

// Connect DB
await connectDB();

// Socket setup
fileSocketHandler(io);

server.listen(9000, () => {
  console.log("🚀 Server running on port 9000");
});