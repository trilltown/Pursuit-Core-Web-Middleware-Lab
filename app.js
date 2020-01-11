const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const port = 3000;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const animals = ["tiger", "lion", "bear", "seal", "giraffe", "elephant", "wolf", "zebra", "horse", "cow", "shark"];

const isAnimal = (req, res, next) => {
    if (animals.includes(req.params.species)) {
        res.json({status: "success", message: true});
        next();
    } else {
        res.json({status: "fail", message: false});
    }
}

app.get("/animal/:species", isAnimal, (req, res) => {
    // console.log(req.params);
    if (animals.includes(req.params.species)) {
        res.json({status: "success", message: true});
    } else {
        res.json({status: "fail", message: false});
    }
})

app.listen(port, () => {
    console.log("Listening to port", port);
})