const Client = require('node-torrent');
const sqlite3 = require('sqlite3').verbose();

class DownloadManager {

    constructor() {
        this._client = new Client({ logLevel: 'DEBUG' });
        this._db = new sqlite3.Database(__dirname + '/../config/download.sqlite3', () => this.createTable());
        this._torrents = [];
    }

    createTable() {
        this._db.run(require('../static/sql/structure.sql'), () => this.loadCurrentDownloads());
        this.loadCurrentDownloads();
    }

    loadCurrentDownloads() {
        this._db.all('SELECT * FROM downloads', (error, rows) => {
            if (!error) {
                rows.forEach(row => {
                    this.addDownloadWithUrl(row.url);
                });
            }
        });
    }

    addDownload(magnetUrl) {
        this.addDownloadWithUrl(url);
    }

    addDownloadWithUrl(url) {
        this._torrents.push(this._client.addTorrent(url));
    }

}

module.exports = DownloadManager;