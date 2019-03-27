/* ===== SHA256 with Crypto-js ===============================
|  Learn more: Crypto-js: https://github.com/brix/crypto-js  |
|  =========================================================*/

const SHA256 = require('crypto-js/sha256');
const LevelSandbox = require('./LevelSandbox.js');
const Block = require('./block');





/* ===== Blockchain Class ==========================
|  Class with a constructor for new blockchain 		|
|  ================================================*/

class Blockchain {
  constructor() {
    this.chain = [];
    this.bd = new LevelSandbox.LevelSandbox();
    this.getBlockHeight().then((height) => {
      if (height === -1) {
        this.addBlock(new Block("First block in the chain - Genesis block")).then(() => console.log("Genesis block added!"))
      }
    })
    // this.addBlock(new Block("First block in the chain - Genesis block"));
  }

  // Add new block
  async addBlock(newBlock) {

    const height = parseInt(await this.getBlockHeight())

    newBlock.height = height + 1
    newBlock.time = new Date().getTime().toString().slice(0, -3)

    if (newBlock.height > 0) {
      const prevBlock = await this.getBlock(height)
      newBlock.previousBlockHash = prevBlock.hash
    }

    newBlock.hash = SHA256(JSON.stringify(newBlock)).toString()
    console.log(newBlock);

    await this.bd.addLevelDBData(newBlock.height, JSON.stringify(newBlock))
  }

  // Get block height
  async getBlockHeight() {
    // return this.chain.length-1;
    return await this.bd.getBlocksCount();
  }

  // get block
  async getBlock(blockHeight) {
    // return object as a single string
    // return JSON.parse(JSON.stringify(this.chain[blockHeight]));
    return JSON.parse(await this.bd.getLevelDBData(blockHeight));
  }

  // validate block
  async validateBlock(blockHeight) {
    // get block object
    const block = await this.getBlock(blockHeight);
    // get block hash
    let blockHash = block.hash;
    // remove block hash to test block integrity
    block.hash = '';
    // generate block hash
    let validBlockHash = SHA256(JSON.stringify(block)).toString();
    // Compare
    if (blockHash === validBlockHash) {
      return true;
    } else {
      console.log('Block #' + blockHeight + ' invalid hash:\n' + blockHash + '<>' + validBlockHash);
      return false;
    }
  }

  // Validate blockchain
  async validateChain() {

    let errorLog = [];
    let height = await this.getBlockHeight();
    let length = height;
    for (var i = 0; i < length - 1; i++) {
      if (!this.validateBlock(i)) errorLog.push(i);
      // this.getBlock(height).then((block) => {
      let block = await this.getBlock(i);
      let blockHash = block.hash;
      let previousBlock = await this.getBlock(i + 1);
      // this.getBlock(height - 1).then((previousBlock) => {
      let previousHash = previousBlock.previousBlockHash;
      if (blockHash !== previousHash) {
        errorLog.push(i);
      }
    }
    if (errorLog.length > 0) {
      console.log('Block errors = ' + errorLog.length);
      console.log('Blocks: ' + errorLog);
    } else {
      console.log('No errors detected');
    }

  }
}

module.exports = Blockchain;

// let myBlock = new Blockchain();
// (function theLoop (i) {
//   setTimeout(() => {
//      myBlock.addBlock(new Block("Second"));

//      if (--i) { 
//      theLoop(i)

//      }
//   }, 100);
// })(2);