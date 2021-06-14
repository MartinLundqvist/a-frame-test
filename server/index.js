const express = require('express');
const cors = require('cors');
const path = require('path');
const https = require('https');

const fs = require('fs');
const key = fs.readFileSync('./server/key.pem');
const cert = fs.readFileSync('./server/cert.pem');

const app = express();

const server = https.createServer({key: key, cert: cert }, app);

const publicPath = path.join(__dirname, '../build');
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.static(publicPath));

app.get('*', (req, res) => {
   res.sendFile(path.join(publicPath, 'index.html'));
});

server.listen(port, () => { console.log('listening on ' + port) });

// app.listen(port, () => {
//    console.log('Server is up!');
// });