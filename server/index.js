const app = require("express")();
const http = require("http").createServer(app);
const cors = require('cors');
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:4200',
    credentials: true,
    allowedHeaders: ['Access-Control-Allow-Origin', 'Content-Type', 'Authorization'],
    allowEIO3: true
  }
});

// app.use( (req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:4200");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(cors());

// Will be in db in real world
const users = [];
const messages = [];
let currentId = 0;

io.on("connection", function(socket) {
    console.log("LOG:: a user connected");
    socket.emit("get users list", JSON.stringify(users));
    socket.emit("get messages history", JSON.stringify(messages));

    socket.on("message", function(msg) {
        console.log(
            "LOG:: message from UserId: " + msg.userId + " --> " + msg.text
        );
        const message = {
            ...msg,
            timestamp: new Date()
        };
        messages.push(message);
        io.emit("message", JSON.stringify(message));
    });

    socket.on("user name added", function(name) {
        console.log("LOG:: user '" + name + "' entered the room");
        const newUser = {
            name,
            id: ++currentId,
            isCurrent: false
        };

        users.push(newUser);
        socket.emit("my user added", JSON.stringify(newUser));
        io.emit("user name added", JSON.stringify(newUser));
    });

    socket.on("disconnect", function() {
        console.log("LOG:: user disconnected");
    });
});

http.listen(3000, function() {
  console.log("LOG:: listening on *:3000");
});
