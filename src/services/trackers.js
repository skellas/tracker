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
                              return searchResponse.hits.hits.map((hit)=> this.composeTracker(hit));
                          }).catch(err => {
                            console.error(err);
                        });
    }

    find(id) {
        console.log('looking for id: ' + id);
        return this.loader.search('trackers', queries.matchById(id))
                          .then(response => {
                            return this.composeTracker(response.hits.hits[0]);
                          }).catch(err => {
                            console.error(err);
                        });
    }

    update(id, updatedTracker) {
        return this.loader.update('trackers', id, "tracker", updatedTracker)
                          .then(response => {
                            return this.composeTracker(response.hits.hits[0]);
                          }).catch(err => {
                              console.error(err);
                          });
    }

    add(tracker) {
        return this.loader.add('trackers', 'tracker', tracker)
                   .then(response => {
                       return this.composeTracker(response.hits.hits[0]);
                   }).catch(err => console.log(err));
    }

    remove(id) {
        console.log('removing by id: ' + id);
        this.trackers.splice([this.trackers.findIndex(tracker => tracker.id == id)], 1);
        return id;
    }

    composeTracker(hit) {
        let tracker = hit._source;
        tracker.id = hit._id;
        return tracker;
    }
}
