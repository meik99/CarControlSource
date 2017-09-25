var express = require("express");
var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");
var io = require("./io");


app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get("/", function (req, res) {

});


io(app);
///entertainment/<component>/<method>

app.listen(8080, function () {
    console.log("Listening on 8080");
});