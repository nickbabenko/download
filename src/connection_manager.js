const Connection = require('./connection');

class ConnectionManager {

    constructor() {
        this.connections = {};
    }

    addConnectionWithSocket(socket) {
        this.connections[socket.id] = new Connection(socket);
        this.connections[socket.id].on(
            Connection.EVENT_DISCONNECTED,
            connection => this.handleSocketDisconnected(connection)
        );
    }

    handleSocketDisconnected(connection) {
        if (typeof this.connections[connection.id] !== 'undefined') {
            delete this.connections[connection.id];
        }
    }

}

module.exports = ConnectionManager;