const express = require('express')
const bodyParser = require('body-parser')
const app = express()
require('dotenv').config();
const cors = require('cors')
const Nightmare = require("nightmare");
const cheerio = require("cheerio");

const nightmare = Nightmare({ show: true });


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
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth()).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();

            today = mm + "/" + dd + "/" + yyyy;
            // var d = new Date();
            // 
            const month = new Array();
            month[0] = "Jan";
            month[1] = "Feb";
            month[2] = "Mar";
            month[3] = "Apr";
            month[4] = "May";
            month[5] = "Jun";
            month[6] = "Jul";
            month[7] = "Aug";
            month[8] = "Sep";
            month[9] = "Oct";
            month[10] = "Nov";
            month[11] = "Dec";

            console.log(`${month[11]} 25 ${yyyy}`)
           let regexDate =  /\.*`${month[11]} 25 ${yyyy}`.*/g
            db.collection("schedule2020-2021")
              .find({ Date: { $regex: `.*${month[11]} 26 ${yyyy}.*` } })
              .sort({ _id: 1 })
              .toArray()
              .then((results) => {
                console.log("GET ====>", results);
                res.json({
                  schedule: results,
                });
                console.log("SENT");
                today = mm + "/" + dd + "/" + yyyy;

                console.log(mm);
                console.log(month[11], dd, yyyy);
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

        app.get("/scrape", (req, res) => {
            const url = "https://www.espn.com/nba/scoreboard/_/date/20201211";
             nightmare
               .goto(url)
               .wait("body")
               .evaluate(() => document.querySelector("body").innerHTML)
               .end()
               .then((response) => {
                 console.log(getData(response));
                   res.json({
                     scrape: getData(response),
                   });
               })
               .catch((err) => {
                 console.log(err);
               });

             let getData = (html) => {
               data = [];
               const $ = cheerio.load(html);
                 $("div#events").each((elemGames) => {
                  //  console.log("ELEem", elemGames);
                   $("article.scoreboard div div section div table tbody").each((i, elem) => {
                    let away = $(elem).find("tr.away").text();
                    let awayTeamName = $(elem)
                      .find("tr.away td div.sb-meta h2 a span.sb-team-short")
                      .text();
                      let awayTotal = $(elem).find("tr.away td.total").text();
                      let home = $(elem).find("tr.home").text();
                      let homeTotal = $(elem).find("tr.home td.total").text();
                      let homeTeamName = $(elem)
                        .find("tr.home td div.sb-meta h2 a span.sb-team-short")
                        .text();
                    //  console.log("ELEem", elem);
                     console.log("Score >>", awayTeamName, "---", homeTeamName);
                     data.push({
                       away,
                     });
                   });
                 });
               return data;
             };
        //    db.collection("playerContracts")
        //      .find()
        //      .toArray()
        //      .then((results) => {
        //        console.log("GET ====>", results);
        //        res.sendFile(__dirname + "/index.html");
        //        // res
        //        res.json({
        //          players: results,
        //        });
        //      })
        //      .catch((error) => console.error(error));
         });


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