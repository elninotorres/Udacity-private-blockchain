const level = require('level');
const chainDB = './chaindata3';

class LevelSandbox {

    constructor() {
        this.db = level(chainDB);
    }

    // Get data from levelDB with key (Promise)
    getLevelDBData(key) {
        let self = this;
        return new Promise(function (resolve, reject) {
            // Add your code here, remember in Promises you need to resolve() or reject()
            self.db.get(key, (err, value) => {
                if (err) {
                    if (err.type == 'NotFoundError') {
                        resolve(undefined);
                    } else {
                        console.log('Block ' + key + ' get failed', err);
                        reject(err);
                    }
                } else {
                    resolve(value);
                }
            });
        });
    }

    // Add data to levelDB with key and value (Promise)
    addLevelDBData(key, value) {
        return new Promise((resolve, reject) => {
            this.db.put(key, value, (error) => {
                if (error) {
                    reject(error)
                }

                console.log(`Added block #${key}`)
                resolve(`Added block #${key}`)
            })
        })
    }

    // Method that return the height
    getBlocksCount() {
        return new Promise((resolve, reject) => {
            let height = -1

            this.db.createReadStream().on('data', (data) => {
                height++
            }).on('error', (error) => {
                reject(error)
            }).on('close', () => {
                resolve(height)
            })
        })
    }
}



module.exports.LevelSandbox = LevelSandbox;

