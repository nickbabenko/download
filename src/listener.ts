import * as express from 'express';
import * as http from 'http';
import * as io from 'socket.io';
import * as winston from 'winston';
import {ConnectionManager} from './connection_manager';
import {Config} from './config.interface';

const sassMiddleware = require('node-sass-middleware');

export class Listener {

    private _app:express.Express;
    private _http:http.Server;
    private _io:SocketIO.Server;
    private _log:winston.Winston;
    private _config:Config;
    private _connectionManager:ConnectionManager = new ConnectionManager();

    constructor() {
        this._app = express();
        this._http = http.createServer(this._app);
        this._io = io(this._http);
        this._log = winston;
        this._config = this.loadConfig();
        this._connectionManager = new ConnectionManager();

        this.serveIndex();
        this.listenForSocketConnections();
        this.listenForHttpConnections();
    }

    loadConfig():Config {
        return <Config> require(__dirname + '/../../config/config.json');
    }

    serveIndex() {
        this._app.set('view engine', 'jade');
        this._app.set('views', __dirname + '/../../static/view');
        this._app.use('/img', express.static(__dirname + '/../../static/public/img'));
        this._app.use(sassMiddleware({
            src: __dirname + '/../../static/scss',
            dest: __dirname + '/../../static/css',
            debug: true,
            outputStyle: 'compressed',
            prefix: '/css'
        }));
        this._app.get('/', (req:express.Request, res:express.Response) => {
            res.render('index.jade');
        });
    }

    listenForSocketConnections() {
        this._io.on('connection', socket => this.handleNewSocketConnection(socket));
    }

    listenForHttpConnections() {
        this._http.listen(this._config.port, () => {
            this._log.info('Server listening on port ' + this._config.port);
        });
    }

    handleNewSocketConnection(socket:SocketIO.Socket) {
        this._connectionManager.addConnectionWithSocket(socket);
    }

}