const http = require('http');

const server = http.createServer((req, res) => {
  res.end('This is my first response!');
});

server.listen(process.env.PORT || 3000, () => {
  console.log('Server running at http://localhost:3000/');
});