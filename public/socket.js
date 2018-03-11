console.log("FE socket");

var socket;

socket = io.connect('http://13.127.224.111:3000');

socket.emit("FrontEndData",'DemoData');

socket.on("FrontEndData",newMessageArrived);

socket.on("UpdateUi",UpdateUiFunction);

function newMessageArrived (data) {
	console.log(data);
}

function InputModified(index,newValue)
{

	var jsonObj = JSON.parse('{\"index\": '+index +',\"newValue\":'+ newValue +'}');
	socket.emit("FrontEndData",jsonObj);
	console.log(jsonObj);
}

function UpdateUiFunction(data)
{
	console.log(data.length);

	for (var i = 0; i < data.length; i++) 
	{
		var inputField = document.getElementById(data[i].index);
		inputField.value=data[i].newValue.toString();
	};

	console.log("updated"); 
}
