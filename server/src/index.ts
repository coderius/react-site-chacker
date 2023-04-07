import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8999;

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

const dispatchEvent = (message: string, ws: WebSocket) => {
    // wss.clients.forEach(client => client.send(message));
    

    //{ event: "check-url", payload: { appId, checkUrl }
    const json = JSON.parse(message);
    switch (json.event) {
        case "check-url": wss.clients.forEach(client => client.send(json.payload.appId));
        break;
        default: ws.send((new Error("Wrong query")).message);
    }
}


wss.on('connection', (ws: WebSocket) => {

    //connection is up, let's add a simple simple event
    ws.on('message', (message: string) => {

        //log the received message and send it back to the client
        // console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);

        dispatchEvent(message, ws);

        ws.on("error", (e: string) => ws.send(e));
    });

    //send immediatly a feedback to the incoming connection
    // ws.send('Hi there, I am a WebSocket server');
});

//start our server
server.listen(port, () => {
    console.log(`Server started on port ${port} :)`);
});