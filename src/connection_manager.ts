import {Connection} from './connection';

export class ConnectionManager {

    private _connections:{ [socketId:string]: Connection } = {};

    addConnectionWithSocket(socket:SocketIO.Socket) {
        this._connections[socket.id] = new Connection(socket);
        this._connections[socket.id].on(
            Connection.EVENT_DISCONNECTED,
            (connection:Connection) => this.handleSocketDisconnected(connection)
        );
    }

    handleSocketDisconnected(connection:Connection) {
        if (typeof this._connections[connection.id] !== 'undefined') {
            delete this._connections[connection.id];
        }
    }

}