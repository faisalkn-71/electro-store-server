const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();



// middleware
app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://electroStore:UBO6x1OZbQSOFaFD@cluster0.7eqna.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {
        await client.connect();
        const productsCollection = client.db('electroStore').collection('products');


        //GET Products
        app.get('/products', async(req, res) => {
            const query = {};
            const cursor = productsCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        })


    }
    finally {

    }


}

run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Running Electro Store Server.....');
});


// this is the listening part
app.listen(port, () => {
    console.log('Listening to port', port);
})