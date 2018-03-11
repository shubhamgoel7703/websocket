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
	socket.on('DataChange',dataChange);

	socket.on("UpdateBE",UpdateBEFunction);

function MessageArrived(data)
{
	// to all except its own
	socket.broadcast.emit('FrontEndData',data);

	// to all including itself
	// io.sockets.emit('EmitUpdates',data);
	console.log(data);
}

function dataChange(data){
	console.log(data);
	console.log("modify");

	}

	function UpdateBEFunction(data)
{
     var arry = [];

     for (var i = 0; i <= 14; i++) 
     {
     	var jsonObj = JSON.parse('{\"index\": '+(i+1) +',\"newValue\":'+ data.P2C_RealArray[i] +'}');
		arry.push(jsonObj);
		socket.broadcast.emit('FrontEndData',data[i]);
     };
    
    var jsonObj = JSON.parse('{\"index\": '+ 17 +',\"newValue\":'+ data.P2C_RealArray[15] +'}');
	arry.push(jsonObj);
	socket.broadcast.emit('FrontEndData',data[15]);

	socket.broadcast.emit('UpdateUi',arry);
	console.log(arry);
	console.log("ok");
}

}

