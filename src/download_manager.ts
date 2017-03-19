import {Client} from 'node-torrent';
import * as sqlite3 from 'sqlite3';

export class DownloadManager {

    private _client = new Client({ logLevel: 'DEBUG' });
    private _db = new sqlite3.Database(__dirname + '/../config/download.sqlite3', () => this.createTable());
    private _torrents:any[] = [];

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

    addDownload(magnetUrl:string) {
        this.addDownloadWithUrl(magnetUrl);
    }

    addDownloadWithUrl(url:string) {
        this._torrents.push(this._client.addTorrent(url));
    }

}