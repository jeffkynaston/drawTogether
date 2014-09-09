var express = require("express")
  , app = express()
  , http = require("http").createServer(app)
  , bodyParser = require("body-parser")
  , io = require("socket.io").listen(http)
  , _ = require("underscore");

var participants = [];
var mainCanvas = {
	"width": "600px",
	"height": "450px"
}
var pointsDrawn = []
var	undoPointStore = []
var paint;
var colorGreen = "#06FF0C";
var colorGray = "#717574";
var colorPink = "#FF0D61";
var colorOrange = "#FF5000";
var colorBlue = "#12BAFF";
var curColor = colorBlue;
var curSize = 5
var curTool = "pen";

app.set('port', process.env.PORT || 8080);
app.use(bodyParser.json());
app.set("views", __dirname + "/views");
app.set("view engine", "jade");
app.use(express.static("public", __dirname + "/public"));

/* Server routing */

app.get("/", function(request, response) {
  response.render("index");
});

app.post("/message", function(request, response) {
  var message = request.body.message;

  if(_.isUndefined(message) || _.isEmpty(message.trim())) {
    return response.json(400, {error: "Message is invalid"});
  }

  var name = request.body.name;
  io.sockets.emit("incomingMessage", {message: message, name: name});
  response.json(200, {message: "Message received"});

});

/* Socket.IO events */
io.on("connection", function(socket){
  
  socket.on("newUser", function(data) {
    participants.push({id: data.id, name: data.name});
    io.sockets.emit("newConnection", {participants: participants, pointsDrawn: pointsDrawn});
  });

  socket.on("drawPoint", function(data) {
  	pointsDrawn = data.pointsDrawn
  	undoPointStore = data.undoPointStore
  	io.sockets.emit("redrawFrame", {pointsDrawn: pointsDrawn, undoPointStore: undoPointStore})
  });

  socket.on("nameChange", function(data) {
    _.findWhere(participants, {id: socket.id}).name = data.name;
    io.sockets.emit("nameChanged", {id: data.id, name: data.name});
  });

  socket.on("disconnect", function() {
    participants = _.without(participants,_.findWhere(participants, {id: socket.id}));
    io.sockets.emit("userDisconnected", {id: socket.id, sender:"system"});
  });

});


http.listen(process.env.PORT || 8080, function() {
  console.log("Server up and running.");
});