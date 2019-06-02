import {Client} from 'elasticsearch';

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
}