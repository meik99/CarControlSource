var express = require("express");
var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");
var music = require("./music");
var video = require("./video");


app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get("/", function (req, res) {

});

music(app);
video(app);

app.listen(8080, function () {
    console.log("Listening on 8080");
});