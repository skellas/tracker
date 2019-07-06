import { ESData, ESQuery } from './data';

const queries = new ESQuery();
export class TrackersService {
    constructor() {
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
        return this.loader.search('trackers', queries.matchById(id, 'tracker'))
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
                       return this.find(response._id);
                   }).catch(err => {
                       console.log(err);
                   });
    }

    remove(id) {
        return this.loader.remove('trackers', 'tracker', id)
                   .then(response => {
                       return {id : id};
                   })
                   .catch(err => {
                       return {error: err};
                    } );
    }

    composeTracker(hit) {
        let tracker = hit._source;
        tracker.id = hit._id;
        return tracker;
    }
}
