const express = require('express');
const bodyParser = require('body-parser');
const Block = require('./block');
const Blockchain = require('./simpleChain');


const chain = new Blockchain();

const app = express();
const port = 8000;
app.use(bodyParser.json());

/**
 * Implement a GET Endpoint to retrieve a block by index, url: "/api/block/:index"
 */
app.get('/block/:height', async (req, res) => {
    try {
        const response = await chain.getBlock(req.params.height);
        res.send(response)
    } catch (error) {
        res.status(404).json({
            "status": 404,
            "message": "No Block Found"
        })
    }
})

/**
 * Implement a POST Endpoint to add a new Block, url: "/api/block"
 */
app.post('/block', async (req, res) => {
    if (req.body.body === '' || req.body.body === undefined) {
        res.status(400).json({
            "status": 400,
            message: "Body cannot be Empty"
        })
    } else {
        await chain.addBlock(new Block(req.body.body))
        const height = await chain.getBlockHeight()
        const response = await chain.getBlock(height)
        res.status(201).send(response)
    }

})

app.listen(port, () => {
    console.log(`Port started at ${port}`);
})