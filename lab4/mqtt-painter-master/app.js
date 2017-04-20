
// A Painter application that uses MQTT to distribute draw events
// to all other devices running this app.

//Object that holds application data and functions.
var app = {};

var host = 'vernemq.evothings.com';
var port = 8084;
var user = 'anon';
var password = 'ymous';

app.connected = false;
app.ready = false;

// Simple function to generate a color from the device UUID
app.generateColor = function(uuid) {
	var code = parseInt(uuid.split('-')[0], 16)
	var blue = (code >> 16) & 31;
	var green = (code >> 21) & 31;
	var red = (code >> 27) & 31;
	return "rgb(" + (red << 3) + "," + (green << 3) + "," + (blue << 3) + ")"
}

app.initialize = function() {
	document.addEventListener(
		'deviceready',
		app.onReady,
		false);
}

app.onReady = function() {
	if (!app.ready) {
		app.color = app.generateColor(device.uuid); // Generate our own color from UUID
		app.pubTopic = '/paint/' + device.uuid + '/evt'; // We publish to our own device topic
		app.subTopic = '/paint/+/evt'; // We subscribe to all devices using "+" wildcard
		app.setupCanvas();
		app.sendMessage();
		app.setupConnection();
		app.ready = true;
	}

}

app.sendMessage = function(){
	app.sendBtn = document.getElementById("sendBtn");
	app.inputMsg = document.getElementById("inputMsg");
	app.msgScreen = document.getElementById("msgScreen");
	// app.sendBtn.addEventListener("click", function(){
	// 	app.ctx.font = "20px Arial";
	// 	app.ctx.fillText(app.inputMsg.value, 20,50);
	// });

	app.sendBtn.addEventListener("click", function(){
		if (app.connected) {
			var chat = JSON.stringify({text: app.inputMsg.value})
			app.publish(chat);
		}
	});

}

app.setupCanvas = function() {
	app.canvas = document.getElementById("canvas");
	app.ctx = app.canvas.getContext('2d');
	var left, top;
	{
		var totalOffsetX = 0;
		var totalOffsetY = 0;
		var curElement = canvas;
		do {
			totalOffsetX += curElement.offsetLeft;
			totalOffsetY += curElement.offsetTop;
		} while (curElement = curElement.offsetParent)
		app.left = totalOffsetX;
		app.top = totalOffsetY;
	}
	
	// We want to remember the beginning of the touch as app.pos
	canvas.addEventListener("touchstart", function(event) {
		// Found the following hack to make sure some
		// Androids produce continuous touchmove events.
		if (navigator.userAgent.match(/Android/i)) {
			event.preventDefault();
		}
		var t = event.touches[0];
		var x = Math.floor(t.clientX) - app.left;
		var y = Math.floor(t.clientY) - app.top;
		app.pos = {x:x, y:y};
	});
	
	// Then we publish a line from-to with our color and remember our app.pos
	canvas.addEventListener("touchmove", function(event) {
		var t = event.touches[0];
		var x = Math.floor(t.clientX) - app.left;
		var y = Math.floor(t.clientY) - app.top;
		if (app.connected) {
			var msg = JSON.stringify({from: app.pos, to: {x:x, y:y}, color: app.color})
			app.publish(msg);
		}
		app.pos = {x:x, y:y};
	});
}

app.setupConnection = function() {
  app.status("Connecting to " + host + ":" + port + " as " + device.uuid);
	app.client = new Paho.MQTT.Client(host, port, device.uuid);
	app.client.onConnectionLost = app.onConnectionLost;
	app.client.onMessageArrived = app.onMessageArrived;
	var options = {
    useSSL: true,
    onSuccess: app.onConnect,
    onFailure: app.onConnectFailure
    }
	app.client.connect(options);
}

app.publish = function(json) {
	message = new Paho.MQTT.Message(json);
	message.destinationName = app.pubTopic;
	app.client.send(message);
};

app.subscribe = function() {
	app.client.subscribe(app.subTopic);
	console.log("Subscribed: " + app.subTopic);
}

app.unsubscribe = function() {
	app.client.unsubscribe(app.subTopic);
	console.log("Unsubscribed: " + app.subTopic);
}

app.onMessageArrived = function(message) {
	var o = JSON.parse(message.payloadString);
	// app.ctx.beginPath();
	// app.ctx.moveTo(o.from.x, o.from.y);
	// app.ctx.lineTo(o.to.x, o.to.y);
	// app.ctx.strokeStyle = o.color;
	// app.ctx.stroke();
	// app.ctx.font = "30px Arial";
	// app.ctx.fillText(o.text,50,150);
	if(o.text !== ''){
		var para = document.createElement("P");
	    var t = document.createTextNode(o.text);
	    para.appendChild(t);
	    app.msgScreen.appendChild(para);
	}
}

app.onConnect = function(context) {
	app.subscribe();
	app.status("Connected!");
	app.connected = true;
}

app.onConnectFailure = function(e){
  console.log("Failed to connect: " + JSON.stringify(e));
}

app.onConnectionLost = function(responseObject) {
	app.status("Connection lost!");
	console.log("Connection lost: "+responseObject.errorMessage);
	app.connected = false;
}

app.status = function(s) {
	console.log(s);
	var info = document.getElementById("info");
	info.innerHTML = s;
}

app.initialize();
