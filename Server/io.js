module.exports = function (app) {
    var fs = require("fs");
    var path = require("path");

    var config = require("./config.json");

    app.post("/entertainment/io/music", (req, res) => {
        var filePath = "";

        if(req.body.path){
            filePath = req.body.path + "/";
        }

        fs.readdir(config.musicPath + filePath, (err, files) => {
            if(err) {
                console.log(err);
                res.send(err);
            }
            for(let i = 0; i < files.length; i++){
                let stat = fs.statSync(config.musicPath + filePath + files[i]);
                let name = path.win32.basename(files[i]);
                let type = stat.isDirectory() === true ?
                    "Folder" : stat.isFile() === true ?
                        "File" : "None"; //Checks if file is a folder or file or none and sets type accordingly

                files[i] = {
                        name: name,
                        path: config.musicPath + filePath,
                        extname: path.extname(name).replace(".", ""),
                        type: type,
                        stats: stat
                }
            }

            res.send(files);
        });
    });
};