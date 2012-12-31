var ws;

// Support both the WebSocket and MozWebSocket objects
if ((typeof(WebSocket) == 'undefined') &&
    (typeof(MozWebSocket) != 'undefined')) {
  WebSocket = MozWebSocket;
}

// Create the socket with event handlers
function initLeapMotion() {
  //Create and open the socket
  ws = new WebSocket("ws://localhost:6437/");
  
  var doc = document;
  
  // On successful connection
  ws.onopen = function(event) {
    doc.getElementById("main").style.visibility = "visible";
    doc.getElementById("connection").innerHTML = "WebSocket connection open!";
  };
  
  // On message received
  ws.onmessage = function(event) {
    var leap = JSON.parse(event.data);
    setVelocity(leap);
    var str = JSON.stringify(leap, undefined, 2);
    doc.getElementById("output").innerHTML = '<pre>' + str + '</pre>';
  };
  
  // On socket close
  ws.onclose = function(event) {
    ws = null;
    doc.getElementById("main").style.visibility = "hidden";
    doc.getElementById("connection").innerHTML = "WebSocket connection closed";
  }
  
  //On socket error
  ws.onerror = function(event) {
    alert("Received error");
  };
}