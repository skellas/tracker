import { ESData } from './services/data';
import path from 'path';
import fs from 'fs';

const dataLoader = new ESData();

function loadTrackers() {
    let trackerData = fs.readFileSync(path.join(__dirname, '../data/trackers.json')).toString();
    dataLoader.bulkIndex('trackers', 'tracker', JSON.parse(trackerData))
              .then(response => {
                console.log(response);
                response.forEach(item => {
                    let entryData = fs.readFileSync(path.join(__dirname, `../data/entries-${item.index._id}.json`)).toString();
                    dataLoader.bulkIndex('entries', 'entry', JSON.parse(entryData))
                              .then(response => console.log(response));
                });
              });
}

loadTrackers();