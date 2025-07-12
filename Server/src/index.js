// src/index.js
import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server as SocketServer } from 'socket.io';
import fileSocketHandler from './sockets/fileSocket.js';
import {connectDB} from './utils/db.js';

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// Connect DB
await connectDB();

// Socket setup
fileSocketHandler(io);

server.listen(9000, () => {
  console.log("🚀 Server running on port 9000");
});