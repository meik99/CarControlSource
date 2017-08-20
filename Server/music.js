/**
 * Created by michael on 20.08.17.
 */
module.exports = function (app) {
    var mplayer = require("mplayer");
    var fs = require("fs");
    var config = require("./musicConfig.json");
    var player = new mplayer();

    player.volume(50);

    app.post("/play", function (req, res) {
        if (req.body.song) {
            player.openFile(config.musicPath + req.body.song);
        }

            res.send(player.status);
    });

    app.post("/volume", function (req, res) {
        if (req.body.volume) {
            player.volume(req.body.volume);

            res.send(player.status);
        }
    });

    app.get("/play", function (req, res) {
        res.send(player.status);
    });

    app.get("/pause", function (req, res) {
        player.pause();
        res.send(player.status);
    });

    app.get("/resume", function (req, res) {
        player.play();
        res.send(player.status);
    });

    app.get("/titles", function (req, res) {
        fs.readdir(config.musicPath, function (err, files) {
            res.send(files);
        });
    });

    app.get("/music/status", function (req, res) {
        res.send(player.status);
    });


};