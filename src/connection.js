const EventEmitter = require('events');

class Connection extends EventEmitter {

    static get EVENT_DISCONNECTED() { return 'connection.disconnected'; }

    constructor(socket) {
        this._socket = socket;

        this.listenForSocketClosed();
        this.sendDownloadList();
    }

    listenForSocketClosed() {
        this._socket.on('disconnect', () => {
            this.emit(Connection.EVENT_DISCONNECTED, this);
        });
    }

    sendDownloadList() {

    }

}

module.exports = Connection;