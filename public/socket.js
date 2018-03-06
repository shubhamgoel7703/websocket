console.log("FE socket");

var socket;

socket = io.connect('http://localhost:3000');

socket.emit("FrontEndData",'DemoData');

socket.on("FrontEndData",newMessageArrived);

function newMessageArrived (data) {
	console.log(data);
}