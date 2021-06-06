const express = require('express');
const cors = require('cors');

const data = require('./data.json');

// create server
const server = express();
const port = 4000;

// GET question endpoint
server.get("/api/questions", cors(), (req, res) => {
    setTimeout(() => {
        res.json(data);
    }, 1000);
});

// starting server
server.listen(port, () => {
    console.log(`Server listening at ${port}`);
});