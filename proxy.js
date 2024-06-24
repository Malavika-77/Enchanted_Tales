const http = require('http');
const httpProxy = require('http-proxy');

// Create a new HTTP proxy server
const proxy = httpProxy.createProxyServer({});

// Define the target URLs for your Express server and WebSocket server
const expressServerUrl = 'https://enchanted-tales.onrender.com'; // Change this to your Express server URL
const webSocketServerUrl = 'wss://enchanted-tales.onrender.com:10000/ws'; // Change this to your WebSocket server URL

// Create a new HTTP server
const server = http.createServer((req, res) => {
  // For WebSocket upgrade requests, proxy them to the WebSocket server
  if (req.headers.upgrade && req.headers.upgrade.toLowerCase() === 'websocket') {
    proxy.ws(req, res, { target: webSocketServerUrl });
  } else {
    // For all other HTTP requests, proxy them to the Express server
    proxy.web(req, res, { target: expressServerUrl });
  }
});

// Handle proxy errors
proxy.on('error', (err, req, res) => {
  console.error('Proxy error:', err);
  res.writeHead(500, { 'Content-Type': 'text/plain' });
  res.end('Proxy error');
});

// Listen on port 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
