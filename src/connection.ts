import {EventEmitter} from 'events';

export class Connection extends EventEmitter {

    static get EVENT_DISCONNECTED() { return 'connection.disconnected'; }

    private _socket:SocketIO.Socket;

    constructor(socket:SocketIO.Socket) {
        super();
        this._socket = socket;

        this.listenForSocketClosed();
        this.sendDownloadList();
    }

    get id():string {
        return this._socket.id;
    }

    listenForSocketClosed() {
        this._socket.on('disconnect', () => {
            this.emit(Connection.EVENT_DISCONNECTED, this);
        });
    }

    sendDownloadList() {

    }

}