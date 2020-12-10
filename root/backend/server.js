const express = require('express')
const bodyParser = require('body-parser')
const app = express()
require('dotenv').config();
const cors = require('cors')

const MongoClient = require('mongodb').MongoClient;
const Uri = process.env.DB_URI
const client = new MongoClient(Uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const PORT = process.env.PORT || 8100;

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cors())


MongoClient.connect(Uri, {
        useUnifiedTopology: true
    })
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('nba_db')
        const playerContracts = db.collection('nba_db')

        app.get('/', (req, res) => {
            db.collection('playerContracts').find().toArray()
                .then(results => {
                    console.log('GET ====>', results)
                    res.sendFile(__dirname + '/index.html')
                    // res
                    res.json({
                        players: results
                    })
                })
                .catch(error => console.error(error))
        })

        app.get('/draft', (req, res) => {
            db.collection("draft2020")
              .find()
              .sort({ _id: 1 })
              .toArray()
              .then((results) => {
                console.log("GET ====>", results);
                res.json({
                  players2020: results,
                });
                console.log("SENT");
              })
              .catch((error) => console.error(error));
        })

        app.get('/schedule', (req, res) => {
            db.collection("schedule2020-2021")
              .find()
              .sort({ _id: 1 })
              .toArray()
              .then((results) => {
                console.log("GET ====>", results);
                res.json({
                  schedule: results,
                });
                console.log("SENT");
              })
              .catch((error) => console.error(error));
        })


        app.post('/quotes', (req, res) => {
            quotesCollection.insertOne(req.body)
                .then(result => {
                    console.log("POST====>", result)
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })

        app.listen(PORT, function () {
            console.log('listening on 8100')
        })
    }).catch(error => console.error(error))



// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html')

//     // Note: __dirname is the current directory you're in. Try logging it and see what you get!
//     // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
// })

// app.post('/quotes', (req, res) => {
//     console.log('Hellooooooooooooooooo!')
//     console.log(req.body)
// })



// const PORT = process.env.PORT || 3000;

// app.listen(PORT, function() {
//     console.log('listening on 3000')
// })