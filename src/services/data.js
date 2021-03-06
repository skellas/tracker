import {Client} from 'elasticsearch';

const maxPageSize = 5;
export class ESQuery {
    matchById(id, type) {
        return {
            size: 1,
            from: 0,
            query: {
                ids: {
                    type: type,
                    values: [`${id}`]
                }
            }
        };
    }

    matchByTrackerId(trackerId, size=10, page=0) {
        return {
            size: size,
            from: (size * page),
            query: {
                match: {
                    tracker: trackerId
                }
            }
        };
    }
    
    findAll() {
        return {
            size: maxPageSize,
            from: 0,
            query: {
                match_all: {}
            }
        };
    }
}

export class ESData {
    constructor() {
        this.esClient = new Client(
            {
                host:  'http://localhost:9200' 
            }
        );
        this.test();
    }

    test() {
        // Ensure the instance is up
        this.esClient.ping({
            requestTimeout: 3000,
        }, function(error) {
            if (error) {
                console.error('Elasticsearch cluster is down');
            } else {
                console.log('Elasticsearch cluster is up');
            }
        });
    }

    
    bulkIndex(index, type, data) {
        let bulkBody = [];

        data.forEach( item => {
            bulkBody.push({
                index: {
                    _index: index,
                    _type: type,
                    _id: item.id
                }
            });
            bulkBody.push(item);
        });

        return this.esClient.bulk({body: bulkBody})
                     .then(response => {
                         let errorCount = 0;
                         let results = [];
                         response.items.forEach(item => {
                             if (item.index && item.index.error) {
                                 console.log(++errorCount, item.index.error);
                             } else {
                                 results.push(item);
                             }
                         });
                         return results;
                     })
                     .catch(console.err);
    }

    search(index, body) {
        return this.esClient.search({
            index: index,
            body: body
        });
    }

    update(index, id, type, body) {
        return this.esClient.update({
            index: index,
            id: id,
            type: type,
            body: {
                doc: body
            }
        });
    }

    add(index, type, body) {
        return this.esClient.index({
            index: index,
            type: type,
            body: body,
            refresh: true
        });
    }

    remove(index, type, id) {
        return this.esClient.delete({
            index: index,
            type: type,
            id: id
        });
    }
}