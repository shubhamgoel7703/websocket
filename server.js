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
		//socket.broadcast.emit('FrontEndData',data[i]);
     };
    
    var jsonObj = JSON.parse('{\"index\": '+ 17 +',\"newValue\":'+ data.P2C_RealArray[15] +'}');
	arry.push(jsonObj);

	var countParam= data.P2C_IntArray[0];//100;
	var decimal = data.P2C_IntArray[1];//24;
	var binaryDecimalArray = ("0000000" + parseInt(Number(decimal).toString(2))).slice(-8).split('');;

	var jsonObj = JSON.parse('{\"index\": '+ 16 +',\"newValue\":'+ countParam +'}');
	arry.push(jsonObj);

	for (var i = 0; i < binaryDecimalArray.length; i++) 
	{
		if(binaryDecimalArray[i]=='1')
		{
			var jsonObj = JSON.parse('{\"index\": '+ (18+i) +',\"newValue\":'+ "true" +'}');
		}
		else
		{
			var jsonObj = JSON.parse('{\"index\": '+ (18+i) +',\"newValue\":'+ "false" +'}');
		}

		arry.push(jsonObj);
	};

	//socket.broadcast.emit('FrontEndData',data);

	socket.broadcast.emit('UpdateUi',arry);
	console.log(arry);
	console.log("ok");
}

}

