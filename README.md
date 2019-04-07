# Blockchain Data

Blockchain has the potential to change the way that the world approaches data. Develop Blockchain skills by understanding the data model behind Blockchain by developing your own simplified private blockchain.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Installing Node and NPM is pretty straightforward using the installer package available from the (Node.js® web site)[https://nodejs.org/en/].

### Configuring your project

- Use NPM to initialize your project and create package.json to store project dependencies.
```
npm init
```
- Install crypto-js with --save flag to save dependency to our package.json file
```
npm install crypto-js --save
```
- Install level with --save flag
```
npm install level --save
```

## Testing

To test code:
1: Open a command prompt or shell terminal after install node.js.
2: Enter a node session, also known as REPL (Read-Evaluate-Print-Loop).
```
node
```
3: Copy and paste your code into your node session
.load simpleChain.js
5: Generate 10 blocks using a for loop
```
(function theLoop (i) {
  setTimeout(() => {
    myBlockChain.addBlock(new Block(`Test data ${i}`)).then(() => {
      if (--i) {
        theLoop(i)
      }
    })
  }, 100);
})(10);

```
6: Validate blockchain
```
myBlockChain.validateChain();
```

```

RESTful Web API with Node.js Framework

RESTful Web API implemented using Express framework

Here are the endpoints
GET-End point

 http://localhost:8000/block/0

POST End point

 http://localhost:8000/block
     "body": "Testing block with test string data"


The application runs on port 8000

Run node app.js to run the application

#  STAR NOTARY PROJECT

Run node app.js
1.)http://localhost:8000/requestValidation (Request for validation)
 In Body
{ "address":"1NUAtxuiqeKqmp8VVFTRpQD55VjRfy2JEo"
	
}

2.)http://localhost:8000/message-signature/validate (Request for signature validation)

{ "address":"1NUAtxuiqeKqmp8VVFTRpQD55VjRfy2JEo",
	"signature":"ICWeaR4ZLbt50HmkEFmIO2c5wxSXAJ2Uu1YP7AGUQVinfyMn0Fw4K5ltYC5SwWdsOBvUmoO4gltPVlbuvZLLSYw="
	
}

3.)http://localhost:8000/block (Add new Block)

{
    "address": "1NUAtxuiqeKqmp8VVFTRpQD55VjRfy2JEo",
    "star": {
        "dec": "68° 52' 56.9",
        "ra": "16h 29m 1.0s",
        "story": "Found star using https://www.google.com/sky/"
    }
}

4.)http://localhost:8000/block/3 (get block by height)

5.)http://localhost:8000/stars/address:1NUAtxuiqeKqmp8VVFTRpQD55VjRfy2JEo (get block by Address)

6.)http://localhost:8000/stars/hash:8bbd2ec869ec56c549041755d609c52819d89dbce060a8fb4bbf8bfcaa61b12a (get block by hash)