import fs from 'fs';
import path from 'path';

export class TrackersService {
    constructor() {
        this.trackers = [];
    }

    findAll() {
        if (this.trackers.length === 0) {
            this.loadTrackers();
        }
        return this.trackers;
    }

    find(id) {
        return this.trackers.filter(tracker => tracker.id == id)[0];
    }

    loadTrackers() {
        let data = fs.readFileSync(path.join(__dirname, '../../data/trackers.json')).toString();
        this.trackers = JSON.parse(data);
    }
}
