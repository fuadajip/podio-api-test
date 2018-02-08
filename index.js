const app = require('./app');
const debug = require('debug')('podio-ai-test');
const http = require('http');

const port = normalizePort(process.env.PORT || '3000');
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Listening on http: ${port}`);
});

app.on('error', onError);
app.on('listening', onListening);

function normalizePort(val) {
  const portParse = parseInt(val, 10);

  if (isNaN(portParse)) {
    // named pipe
    return val;
  }

  if (portParse >= 0) {
    // port number
    return portParse;
  }

  return false;
}

/**
* Event listener for HTTP server "error" event.
*/

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}
/**
* Event listener for HTTP server "listening" event.
*/
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  debug(`Listening on debug ${bind}`);
}
