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
        console.log('looking for id: ' + id);
        return this.trackers.find(tracker => tracker.id == id);
    }

    update(id, updatedTracker) {
        this.remove(id);
        console.log(this.trackers);
        this.add(updatedTracker);
        return this.find(id);
    }

    add(tracker) {
        if (!tracker.id || tracker.id === '') {
            tracker.id = this.trackers.length + 1;
        }
        console.log("adding ")
        console.log(tracker);
        this.trackers.push(tracker);
        return tracker;
    }

    remove(id) {
        console.log('removing by id: ' + id);
        this.trackers.splice([this.trackers.findIndex(tracker => tracker.id == id)], 1);
        return id;
    }
    loadTrackers() {
        let data = fs.readFileSync(path.join(__dirname, '../../data/trackers.json')).toString();
        this.trackers = JSON.parse(data);
    }
}
