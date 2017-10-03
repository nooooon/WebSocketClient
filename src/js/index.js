'use strict';

(function(){
  
  let host = 'ws//localhost:5000';
  let ws = new WebSocket(host);
  let connected = false;

  let msg = JSON.stringify({data: 'hello'});

  ws.onopen = () => {
    connected = true;
    ws.send(msg);
    $(".log").append('<div">websocket connected</div>');
  }

  ws.onclose = () => {
    if(ws){
      $(".log").append('<div">websocket closing</div>');
      ws.close();
    }
    connected = false;
  }

  ws.onerror = (e) => {
    $(".log").append('<div class="log-error">' + e + '</div>');
  }

  ws.onmessage = (e) => {
    let getMsg = JSON.stringify(e.data);
    $(".log").append('<div class="log-message">' + getMsg + '</div>');
  }

  // event
  $(".send").on('click', (e) => {
    let sendMsg = $("#message").val();
    if(0 < sendMsg.length()){
      ws.send(sendMsg);
    }
  });
})();


