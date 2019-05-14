import fs from 'fs';
import path from 'path';

class TrackersService {
    constructor() {
        this.trackers = [];
    }

    findAll() {
        if (this.trackers.length === 0) {
            this.loadTrackers();
        }
        return this.trackers;
    }

    loadTrackers() {
        console.log("loading");
        let data = fs.readFileSync(path.join(__dirname, '../../data/trackers.json')).toString();
        this.trackers = JSON.parse(data);
    }
}

export let tracker = new TrackersService();