import express from 'express';
import * as http from 'http';
import {WebSocket, WebSocketServer} from 'ws';
import {Crawler} from './crawler.js';

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8999;

//initialize the WebSocket server instance
const wss = new WebSocketServer({ server });

const dispatchEvent = (message, ws) => {
    const json = JSON.parse(message);

    //{ event: "check-url", payload: { appId, checkUrl }
    switch (json.event) {
        case "check-url": 
            wss.clients.forEach(client => {
                new Crawler(json.payload.checkUrl)
                .find()
                .then(
                    links => {
                        client.send(JSON.stringify(links));
                    }
                );
            });
        break;
        default: ws.send((new Error("Wrong query")).message);
    }
}



wss.on('connection', (ws) => {

    //connection is up, let's add a simple simple event
    ws.on('message', (message) => {

        //log the received message and send it back to the client
        // console.log('received: %s', message);
        // ws.send(`Hello, you sent -> ${message}`);

        dispatchEvent(message, ws);

        ws.on("error", (e) => ws.send(e));
    });

    //send immediatly a feedback to the incoming connection
    // ws.send('Hi there, I am a WebSocket server');
});

//start our server
server.listen(port, () => {
    console.log(`Server started on port ${port} :)`);
});