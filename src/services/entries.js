import { ESData, ESQuery } from './data';

const queries = new ESQuery();
export class EntriesService {
    constructor() {
        this.loader = new ESData();
    }

    findEntries(trackerId) {
        return this.loader.search('entries', queries.matchByTrackerId(trackerId))
                          .then(searchResponse => {
                            return searchResponse.hits.hits.map((hit)=> this.composeEntry(hit));
                          }).catch(err => {
                            console.error(err);
                        });
    }

    find(id) {
        return this.loader.search('entries', queries.matchById(id, 'entry'))
                          .then(response => {
                            return this.composeEntry(response.hits.hits[0]);
                          }).catch(err => {
                            console.error(err);
                        });
    }

    add(entry) {
        return this.loader.add('entries', 'entry', entry)
                   .then(response => {
                       return this.find(response._id);
                   }).catch(err => {
                       console.log(err);
                   });
    }

    composeEntry(hit) {
        let entry = hit._source;
        entry.id = hit._id;
        return entry;
    }
}
