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

    getBlockByHeight(key) {
        return new Promise((resolve, reject) => {
            console.log(key)
            this.db.get(key, (error, value) => {
                console.log(error)
                if (value === undefined) {
                    return reject('Not found')
                } else if (error) {
                    return reject(error)
                }

                value = JSON.parse(value)
                console.log('here');
                if (parseInt(key) > 0) {
                    value.body.star.storyDecoded = new Buffer(value.body.star.story, 'hex').toString()
                }
                console.log(value)
                return resolve(value)
            })
        });
    }

    getBlockByHash(hash) {
        let block;
        return new Promise((resolve, reject) => {
            this.db.createReadStream().on('data', (data) => {
                block = JSON.parse(data.value)

                console.log(this);
                if (block.hash === hash) {
                    if (!this.isGenesis(data.key)) {
                        block.body.star.storyDecoded = new Buffer(block.body.star.story, 'hex').toString()
                        return resolve(block)
                    } else {
                        return resolve(block)
                    }
                }
            }).on('error', (error) => {
                return reject(error)
            }).on('close', () => {
                return reject('Not found')
            })
        })
    }

    getBlocksByAddress(address) {
        const blocks = []
        let block

        return new Promise((resolve, reject) => {
            this.db.createReadStream().on('data', (data) => {
                // Don't check the genesis block
                if (!this.isGenesis(data.key)) {
                    block = JSON.parse(data.value)

                    if (block.body.address === address) {
                        block.body.star.storyDecoded = new Buffer(block.body.star.story, 'hex').toString()
                        blocks.push(block)
                    }
                }
            }).on('error', (error) => {
                return reject(error)
            }).on('close', () => {
                return resolve(blocks)
            })
        })
    }

    isGenesis(key) {
        return parseInt(key) === 0
    }
}



module.exports.LevelSandbox = LevelSandbox;

