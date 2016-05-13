import express from 'express';
import socketio from 'socket.io';
import bodyParser from 'body-parser';
import path from 'path';
import models from './models';

// Initialisation
const app = express()
    .use(bodyParser.json())
    .use(express.static(path.join(__dirname, './public')));

app.locals.models = models;

const server = app.listen(5000, () => {
    console.log('Web server ready to use');
});
const io = socketio.listen(server);

// Evenements socket.io
io.on('connection', socket => {
    console.log('Client connected');
});