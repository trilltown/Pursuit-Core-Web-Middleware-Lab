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
    for (let i = req.params.floor; i <= req.params.ceiling; i++) {
        output.push(i);
    }
    let randomPick = Math.floor(Math.random() * (parseInt(req.params.ceiling) - parseInt(req.params.floor) + 1)) + parseInt(req.params.floor);
    res.json(`randPick: ${randomPick}`);
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

app.get("/random/:floor/:ceiling", generateSpread, (req, res) => {
    let randomPick = Math.floor(Math.random() * (parseInt(req.params.ceiling) - parseInt(req.params.floor) + 1)) + parseInt(req.params.floor);
    res.json({status: "success", range: [parseInt(req.params.floor), parseInt(req.params.ceiling)], randPick: randomPick});
})

app.listen(port, () => {
    console.log("Listening to port", port);
})