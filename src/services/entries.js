import fs from 'fs';
import path from 'path';

export class EntriesService {
    constructor() {
        this.entries = new Map();
    }

    findEntries(trackerId) {
        if (!this.entries.has(trackerId)){
            this.loadEntries(trackerId);
        }
        console.log(this.entries);
        return this.entries.get(trackerId);
    }

    loadEntries(trackerId) {
        let data = fs.readFileSync(path.join(__dirname, `../../data/entries-${trackerId}.json`)).toString();
        this.entries.set(trackerId, JSON.parse(data));
    }
}
