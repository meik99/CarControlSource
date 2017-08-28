/**
 * Created by michael on 20.08.17.
 */
module.exports = function (app) {
    var mplayer = require("mplayer");
    var fs = require("fs");
    var config = require("./config.json");
    var player = new mplayer();

    player.volume(50);

    var next = false;


    player.on("stop", function () {
        next = true;
    });
    player.on("start", function () {
        next = false;
    });

    app.post("/music/play", function (req, res) {
        next = false;
        if (req.body.song) {
            player.openFile(config.musicPath + req.body.song);
        }

            res.send(player.status);
    });

    app.post("/music/volume", function (req, res) {
        if (req.body.volume) {
            player.volume(req.body.volume);

            res.send(player.status);
        }
    });

    app.get("/music/play", function (req, res) {
        res.send(player.status);
    });

    app.get("/music/pause", function (req, res) {
        player.pause();
        res.send(player.status);
    });

    app.get("/music/resume", function (req, res) {
        player.play();
        res.send(player.status);
    });

    app.get("/music/titles", function (req, res) {
        fs.readdir(config.musicPath, function (err, files) {
            res.send(files);
        });
    });

    app.get("/music/status", function (req, res) {
        player.status.next = next;
        res.send(player.status);
    });
};