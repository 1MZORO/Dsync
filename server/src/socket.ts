import { Server } from "socket.io";

export function setupSocket(io: Server) {
  io.on("connection", (socket) => {
    console.log("The socket connected...", socket.id);
    

    // 👇 Handle incoming 'message' event from client
    socket.on("message", (data) => {
      console.log("Received message:", data);
      io.emit("messageResponse", `Server received: ${data}`);

      socket.broadcast.emit("messageResponse", "Acknowledged " + data);
    });

    socket.on("disconnect", () => {
      console.log("The user disconnected.", socket.id);
    });
  });
}
