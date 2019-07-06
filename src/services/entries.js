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

    composeEntry(hit) {
        let entry = hit._source;
        entry.id = hit._id;
        return entry;
    }
}
