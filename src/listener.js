const express = require('express');
const http = require('http');
const io = require('socket.io');
const winston = require('winston');
const sassMiddleware = require('node-sass-middleware');
const ConnectionManager = require('./connection_manager');

class Listener {

    constructor() {
        this._app = express();
        this._http = http.Server(this._app);
        this._io = io(this._http);
        this._log = winston;
        this._config = this.loadConfig();
        this._connectionManager = new ConnectionManager();

        this.serveIndex();
        this.listenForSocketConnections();
        this.listenForHttpConnections();
    }

    loadConfig() {
        return require('../config/config.json');
    }

    serveIndex() {
        this._app.set('view engine', 'jade');
        this._app.set('views', __dirname + '/../static/view');
        this._app.use('/img', express.static(__dirname + '/../static/public/img'))
        this._app.use(sassMiddleware({
            src: __dirname + '/../static/scss',
            dest: __dirname + '/../static/css',
            debug: true,
            outputStyle: 'compressed',
            prefix: '/css'
        }));
        this._app.get('/', (req, res) => {
            res.render('index.jade');
        });
    }

    listenForSocketConnections() {
        this.io.on('connection', socket => this.handleNewSocketConnection(socket));
    }

    listenForHttpConnections() {
        this.http.listen(this.config.port, () => {
            this.log.info('Server listening on port ' + this.config.port);
        });
    }

    handleNewSocketConnection(socket) {
        this.connectionManager.addConnectionWithSocket(socket);
    }

    get connectionManager() {
        return this._connectionManager;
    }

    get config() {
        return this._config;
    }

    get log() {
        return this._log;
    }

    get app() {
        return this._app;
    }

    get http() {
        return this._http;
    }

    get io() {
        return this._io;
    }

}

module.exports = Listener;