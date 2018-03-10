var express = require('express');

var app = express();
var server = app.listen(3000);

app.use(express.static('public'));


console.log("Socket is running");

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection',newConnection);

function newConnection(socket){
	console.log("new connection created" + socket.id);
	//console.log(socket);
	socket.on('FrontEndData',MessageArrived);


function MessageArrived(data)
{
	// to all except its own
	socket.broadcast.emit('FrontEndData',data);

	// to all including itself
	// io.sockets.emit('EmitUpdates',data);
	console.log(data);
}

}