const express = require("express");
const app = express();

const server = app.listen(3000, () => {
    console.log("Listening: http://localhost:" + server.address().port);
});

const indexTemplate = require("./public/index.js");
const detailTemplate = require("./public/detail.js");

app.get("/", (req, res) => {
    // get data from some where
    const data = {home: {welcome: "Welcome to Express!"}};
    const response = indexTemplate(data); // should treat exception
    res.send(response);
});

app.get("/detail", (req, res) => {
    // get data from some where
    const data = {detail: "Express 4.16"};
    const response = detailTemplate(data); // should treat exception
    res.send(response);
});