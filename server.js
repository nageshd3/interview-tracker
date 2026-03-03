// Server entry point that starts the Express application
// The express app is imported from app.js and used to create an HTTP server
// nodemon is used to automatically restart the server on code changes, making development easier
// Start the server using: nodemon server.js
const app = require('./backend/app');
const http = require('http');
const debug = require('debug')('node-angular:server');

/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = val => {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

const onError = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'Pipe ' + addr : 'Port ' + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + port;
    debug('Listening on ' + bind);
}

const port = normalizePort(process.env.PORT || "3000");
app.set('port', port);

const server = http.createServer(app);
server.on('error', onError);
server.on('listening', onListening);

server.listen(port);