const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const cors = require("cors");
const Nightmare = require("nightmare");
const cheerio = require("cheerio");

const MongoClient = require("mongodb").MongoClient;
const Uri = process.env.DB_URI;
const client = new MongoClient(Uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const PORT = process.env.PORT || 8100;

// Make sure you place body-parser before your CRUD handlers!
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

MongoClient.connect(Uri, {
  useUnifiedTopology: true,
})
  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("nba_db");
    const playerContracts = db.collection("nba_db");

    app.get("/", (req, res) => {
      db.collection("playerContracts")
        .find()
        .toArray()
        .then((results) => {
          console.log("Home ====>", results);
          res.sendFile(__dirname + "/index.html");
          // res
          res.json({
            players: results,
          });
        })
        .catch((error) => console.error(error));
    });

    app.get("/draft", (req, res) => {
      db.collection("draft2020")
        .find()
        .sort({ _id: 1 })
        .toArray()
        .then((results) => {
          console.log("GET ====>", results[0]);
          res.json({
            players2020: results,
          });
          // console.log("SENT Draf t");
        })
        .catch((error) => console.error(error));
    });

    app.get("/schedule", (req, res) => {
      let today = new Date();
      let dd = String(today.getDate());
      let mm = String(today.getMonth()); //January is 0!
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

      console.log(month[mm]);
      console.log(`${month[mm]} ${dd} ${yyyy}`);
      let regexDate = /\.*`${month[11]} 25 ${yyyy}`.*/g;
      db.collection("schedule2020-2021")
        .find({ Date: { $regex: `.*${month[mm]} ${dd} ${yyyy}.*` } })
        .sort({ _id: 1 })
        .toArray()
        .then((results) => {
          console.log("GET ====>", results);
          res.json({
            schedule: results,
          });
          console.log("SENT schedule");
          today = mm + "/" + dd + "/" + yyyy;

          // console.log(mm);
          // console.log(month[mm], dd, yyyy);
        })
        .catch((error) => console.error(error));
    });

    app.post("/quotes", (req, res) => {
      quotesCollection
        .insertOne(req.body)
        .then((result) => {
          console.log("POST====>", result);
          res.redirect("/");
        })
        .catch((error) => console.error(error));
    });

    app.get("/scrape", (req, res) => {
      console.log("backend request started");
      const url = "https://www.espn.com/nba/scoreboard";
      console.log("Got URL");
      const nightmare = Nightmare({ show: false });

      nightmare
        .goto(url)
        .wait("body")
        .evaluate(() => document.querySelector("body").innerHTML)
        .end()
        .then((response) => {
          console.log("Good Bye");
          console.log(getData(response));
          res.json({
            scrape: getData(response),
          });
          console.log("backend request ended");
        })
        .catch((err) => {
          res.json({ error: "aerror" });
          console.log(err);
        });

      let getData = (html) => {
        data = [];
        const $ = cheerio.load(html);
        $("div#events").each((elemGames) => {
          console.log("elemGames", elemGames);
          $("article.scoreboard div div section div table").each(
            (i, elem) => {
              let timeQuarter = $(elem).find("thead tr th span")
              .text();
              console.log("timeQuarter", timeQuarter);
              let awayTeamName = $(elem)
                .find("tbody tr.away td div.sb-meta h2 a span.sb-team-short")
                .text();
              let awayTotal = $(elem).find("tbody tr.away td.total").text();

              let homeTotal = $(elem).find("tbody tr.home td.total").text();
              let homeTeamName = $(elem)
                .find("tbody tr.home td div.sb-meta h2 a span.sb-team-short")
                .text();
              //  console.log("ELEem", elem);
              let game = {
                id: Math.random() * (10000000 - 0) + 0,
                timeQuarter:timeQuarter,
                awayTeamName: awayTeamName,
                awayTotal: awayTotal,
                homeTeamName: homeTeamName,
                homeTotal: homeTotal,
              };

              //  console.log("Sending to front ===>");
              //  console.log("Score >>", awayTeamName, "---", homeTeamName);
              //  console.log("Score >>", awayTotal, "---", homeTotal);
              data.push({
                game,
              });
            }
          );
        });
        var time = new Date();

        console.log(
          time.toLocaleString(
            "en-US"
            //   {
            //   hour: "numeric",
            //   minute: "numeric",
            //   // seconds: "numeric",
            //   hour12: true,
            // }
          )
        );
        return data;
      };
    });
    app.listen(PORT, function () {
      console.log("listening on 8100");
    });
  })
  .catch((error) => console.error(error));

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
