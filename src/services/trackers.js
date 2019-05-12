import fs from 'fs';
import path from 'path';

class TrackersService {
    constructor() {
        this.trackers = [];
    }

    findAll() {
        this.loadTrackers();
        return this.trackers;
    }

    loadTrackers() {
        
        fs.readFile(path.join(__dirname, '../../data/trackers.json'), function(err, data) {
            if (err) throw err;
            this.trackers = JSON.parse(data);
        });
    }
}

export default new TrackersService();