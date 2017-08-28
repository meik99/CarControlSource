module.exports = function(app){
    var fs = require("fs");
    var config = require("./config.json");

    app.get("/video/titles", function (req, res) {
        fs.readdir(config.videoPath, function (err, files) {
            res.send(files);
        });
    });
};