const http = require('http');
// earlier app was started with only server.js by using the command node server.js,
// but now we have app.js which is the main file for our express application, 
// so we need to import that file here in server.js
// we are importing the app.js file which is exporting the express application,
// so we can use that app variable to create our server and listen on the specified port

// We will start the server using the command node server.js, 
// and it will run the express application defined in app.js
const app = require('./backend/app');

const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
  console.log('Server running at http://localhost:3000/');
});