import { ESData } from './data';

export class TrackersService {
    constructor() {
        this.trackers = [];
        this.loader = new ESData();
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

    findAsync(id) {
        console.log('looking for id: ' + id);
        return this.loader.search('trackers', this.matchById(id))
                          .then(searchResponse => {
                              return searchResponse.hits.hits[0]._source;
                          });
    }

    matchById(id) {
        return {
            size: 1,
            from: 0,
            query: {
                match: {
                    id: {
                        query: `${id}`
                    }
                }
            }
        };
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
        console.log("adding ");
        console.log(tracker);
        this.trackers.push(tracker);
        return tracker;
    }

    remove(id) {
        console.log('removing by id: ' + id);
        this.trackers.splice([this.trackers.findIndex(tracker => tracker.id == id)], 1);
        return id;
    }
}
