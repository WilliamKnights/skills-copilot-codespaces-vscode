// Create web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const port = 8080;
const hostname = 'localhost';

const server = http.createServer((req, res) => {
    // Parse URL
    const parsedUrl = url.parse(req.url, true);

    // Get the path
    let pathName = parsedUrl.pathname;
    if (pathName == '/') {
        pathName = 'index.html';
    }

    // Get the extension of the file
    const ext = path.extname(pathName);

    // Get the file
    fs.readFile(pathName, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('404 Not Found');
        } else {
            if (ext == '.html') {
                res.writeHead(200, { 'Content-Type': 'text/html' });
            } else if (ext == '.css') {
                res.writeHead(200, { 'Content-Type': 'text/css' });
            } else if (ext == '.js') {
                res.writeHead(200, { 'Content-Type': 'text/javascript' });
            } else if (ext == '.png') {
                res.writeHead(200, { 'Content-Type': 'image/png' });
            }
            res.end(data);
        }
    });
});

server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`);
});

// Path: comments.js
// Create web socket
const WebSocket = require('ws');

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});