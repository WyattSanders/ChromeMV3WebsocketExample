//import { Socket } from "/node_modules/socket.io";

const extension = {
  count: 0,
  disconnected: false,
  port: 3000,
  ws: null,
};

let test = document.getElementById('test');

test.addEventListener('click', async () => {
 
  extension.ws = WebSocketClient();
  extension.ws.connect();

 
});


function WebSocketClient() {
  let instance = null;
  const connect = () => {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket('ws://localhost:3000');
      //ws.sendText("test");
      
      const onOpen = () => {
        instance = ws;
        console.log('###websocket:connected', instance);
        ws.send('it works!');
        return resolve(ws);
      };

      const onError = (event) => {
        console.log('###INIT-FAILED', event);
        ws.close(1000, 'closing due to unknown error');
        return reject('failed to connect to websocket');
      };

      const onClose = () => {
        console.log('###websocket:disconnected');
        instance = null;
        // reconnect is happening in the alarm callback
      };

      ws.onopen = onOpen;
      //ws.onerror = onError;
      ws.onclose = onClose;
    });
  };

  const getInstance = () => {
    return instance;
  };

  return {
    connect,
    getInstance,
  };
}

