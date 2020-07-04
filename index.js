var express = require("express");
var app = express();
var path = require("path");
const dotenv = require("dotenv").config();
const https = require("https");

const API_KEY = process.env.API_KEY;

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/education", function(req, res) {
  console.log("got education response!");

  https
    .get(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=women%2C+in%2C+stem%2C+fields&sort=newest&api-key=${API_KEY}`,
      resp => {
        let data = "";

        // A chunk of data has been recieved.
        resp.on("data", chunk => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on("end", () => {
          res.send(data);
        });
      }
    )
    .on("error", err => {
      console.log("Error: " + err.message);
    });
});

app.get("/violence", function(req, res) {
  https
    .get(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=women%2C+domestic%2C+violence&sort=newest&api-key=${API_KEY}`,
      resp => {
        let data = "";

        // A chunk of data has been recieved.
        resp.on("data", chunk => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on("end", () => {
          res.send(data);
        });
      }
    )
    .on("error", err => {
      console.log("Error: " + err.message);
    });
});

app.get("/workplace", function(req, res) {
  console.log("got workplace response!");

  https
    .get(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=women%2C+workplace&sort=newest&api-key=${API_KEY}`,
      resp => {
        let data = "";

        // A chunk of data has been recieved.
        resp.on("data", chunk => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on("end", () => {
          res.send(data);
        });
      }
    )
    .on("error", err => {
      console.log("Error: " + err.message);
    });
});

app.get("/reproduction", function(req, res) {
  console.log("got reproduction response!");

  https
    .get(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=women%2C+abortion&sort=newest&api-key=${API_KEY}`,
      resp => {
        let data = "";

        // A chunk of data has been recieved.
        resp.on("data", chunk => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on("end", () => {
          res.send(data);
        });
      }
    )
    .on("error", err => {
      console.log("Error: " + err.message);
    });
});

app.get("/media", function(req, res) {
  console.log("got media response!");

  https.get(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=women%2C+in%2C+media%2Csexism&sort=newest&api-key=${API_KEY}`,
      resp => {
        let data = "";

        // A chunk of data has been recieved.
        resp.on("data", chunk => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on("end", () => {
          res.send(data);
        });
      }
    )
    .on("error", err => {
      console.log("Error: " + err.message);
    });
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(8080);
