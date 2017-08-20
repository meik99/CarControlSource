var express = require("express");
var app = express();
var fs = require("fs");
var mplayer = require("mplayer");
var player = new mplayer();
var cors = require("cors");
var bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

player.on("start", console.log.bind(this, "Playerback started"));
player.on("status", console.log);

app.get("/", function (req, res) {
    fs.readdir("/home/michael/Music/", function (err, files) {
        res.send(files);
    });
});

app.post("/play", function (req, res) {
    if(req.body.song){
        player.openFile("/home/michael/Music/" + req.body.song, {
            cache: 128,
            cacheMin: 1
        });
        res.send("Playing");
    }
    else
        res.send("Song not found");

});

app.listen(8080, function () {
    console.log("Listening on 8080");
});