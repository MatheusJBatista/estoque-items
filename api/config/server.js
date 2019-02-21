const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const expressSession = require('express-session');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(expressValidator());

app.use(expressSession({
  saveUninitialized:true,
  secret: "aaa bbb ccc ddd eee fff ggg",
  resave: false
}))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, cache-control");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

module.exports = app;
