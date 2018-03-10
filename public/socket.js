console.log("FE socket");

var socket;

socket = io.connect('13.127.224.111:3000');

socket.emit("FrontEndData",'DemoData');

socket.on("FrontEndData",newMessageArrived);

function newMessageArrived (data) {
	console.log(data);
}

function InputModified(index,newValue)
{

	var jsonObj = JSON.parse('{\"index\": '+index +',\"newValue\":'+ newValue +'}');
	socket.emit("FrontEndData",jsonObj);
	console.log(jsonObj);
}