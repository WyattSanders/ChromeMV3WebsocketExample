/* //import  WebSocketServer  from 'ws';
var WebSocketServer = require('ws');
const wss = new WebSocketServer({url: 127.0.0.1, port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('something');
}); */

/*
WebSocket server example
The 'public' directory contains a p5.js sketch and HTML page that will connect to this server and put the sensor data in the HTML page.
created 11 Nov 2017
by Tom Igoe
*/
var WebSocketServer = require('ws').Server;   // webSocket library

// configure the webSocket server:
const wssPort = process.env.PORT || 3000;             // port number for the webSocket server
const wss = new WebSocketServer({port: wssPort}); // the webSocket server
var clients = new Array;         // list of client connections


// ------------------------ webSocket Server functions
function handleConnection(client, request) {
	console.log("New Connection");        // you have a new client
	clients.push(client);    // add this client to the clients array

	function endClient() {
		// when a client closes its connection
		// get the client's position in the array
		// and delete it from the array:
		var position = clients.indexOf(client);
		clients.splice(position, 1);
		console.log("connection closed");
	}

	// if a client sends a message, print it out:
	function clientResponse(data) {
		console.log(request.connection.remoteAddress + ': ' + data);
		broadcast(request.connection.remoteAddress + ': ' + data);
	}

	// set up client event listeners:
	client.on('message', clientResponse);
	client.on('close', endClient);
}

// This function broadcasts messages to all webSocket clients
function broadcast(data) {
	// iterate over the array of clients & send data to each
	for (c in clients) {
		clients[c].send(JSON.stringify(data));
	}
}

// listen for clients and handle them:
wss.on('connection', handleConnection);