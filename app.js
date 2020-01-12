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

const generateSpread = (req, res, next) => {
    let output = [];
    for (let i = parseInt(req.query.floor); i <= parseInt(req.query.ceiling); i++) {
        output.push(i);
    }
    let randomPick = Math.floor(Math.random() * (parseInt(req.query.ceiling) - parseInt(req.query.floor) + 1)) + parseInt(req.query.floor);
    res.json(`randPick: ${parseInt(randomPick)}`);
    next();
}

app.get("/animal/:species", isAnimal, (req, res) => {
    // console.log(req.params);
    if (animals.includes(req.params.species)) {
        res.json({status: "success", message: true});
    } else {
        res.json({status: "fail", message: false});
    }
})

app.get("/random", generateSpread, (req, res) => {
    let randomPick = Math.floor(Math.random() * (parseInt(req.query.ceiling) - parseInt(req.query.floor) + 1)) + parseInt(req.query.floor);
    console.log(randomPick)
    res.json({status: "success", range: [parseInt(req.query.floor), parseInt(req.query.ceiling)], randPick: parseInt(randomPick)});
})

app.listen(port, () => {
    console.log("Listening to port", port);
})