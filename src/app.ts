import "dotenv/config";
import express from "express";
import http from "http";
import { Server } from "socket.io"
import cors from "cors";
import { router } from "./routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        "origin": "*"
    }
});

io.on("connection", (socket) => {
    console.log(`Usuário conectado no socket: ${socket.id}`);

});

export { httpServer, io };
