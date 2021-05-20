const io = require("socket.io")(5000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

rooms = {};
members = {};

io.on("connection", (socket) => {
  socket.on("join-room", (id) => {
    members[socket.id] = {
      id: socket.id,
      room: id,
    };

    if (rooms[id]) {
    } else {
      rooms[id] = {
        grid: [
          ["", "", "", "", "", "", "", ""],
          ["", "", "", "", "", "", "", ""],
          ["", "", "", "", "", "", "", ""],
          ["", "", "", "", "", "", "", ""],
          ["", "", "", "", "", "", "", ""],
          ["", "", "", "", "", "", "", ""],
          ["", "", "", "", "", "", "", ""],
          ["", "", "", "", "", "", "", ""],
        ],
        messages: [],
      };
    }

    socket.emit("get-room-data", rooms[id]);
  });
});
