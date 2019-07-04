import { ESData, ESQuery } from './data';

const queries = new ESQuery();
export class TrackersService {
    constructor() {
        this.trackers = [];
        this.loader = new ESData();
    }

    findAll() {
        console.log('find all trackers');
        return this.loader.search('trackers', queries.findAll())
                          .then(searchResponse => {
                              console.log(searchResponse.hits.hits);
                              return searchResponse.hits.hits.map((hit)=> hit._source);
                          }).catch(err => {
                            console.error(err);
                        });
    }

    find(id) {
        console.log('looking for id: ' + id);
        return this.loader.search('trackers', queries.matchById(id))
                          .then(searchResponse => {
                              return searchResponse.hits.hits[0]._source;
                          }).catch(err => {
                            console.error(err);
                        });
    }

    update(id, updatedTracker) {
        return this.loader.update('trackers', id, "tracker", updatedTracker)
                          .then(response => {
                              return response.hits.hits[0]._source;
                          }).catch(err => {
                              console.error(err);
                          });
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
