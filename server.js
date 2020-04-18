const express = require('express');
const projectRouter = require('./projects/projectRouter.js');
const actionRouter = require('./actions/actionRouter.js');


const server = express();

server.use(express.json());
server.use(methodLogger);

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);


server.get('/', (req, res) => {
    res.send(`<h2>Sprint Challenge: node-api-challenge<h2>`);
});

function methodLogger(req, res, next) {
    console.log(`${req.method} Request`);
    next();
}

module.exports = server;