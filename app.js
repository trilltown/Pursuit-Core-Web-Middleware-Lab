const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const port = 3000;

const app = express();

const animals = ["tiger", "lion", "bear", "seal", "giraffe", "elephant", "wolf", "zebra", "horse", "cow", "shark"];

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/animal/:species", (req, res) => {
    console.log(req.params);
    if (animals.includes(req.params.species)) {
        res.json({status: "success", message: true});
    } else {
        res.json({status: "fail", message: false});
    }
})

app.listen(port, () => {
    console.log("Listening to port", port);
})