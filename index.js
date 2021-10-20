const PORT = process.env.PORT || 8000;
const express = require("express");
const { axiosAbstraction } = require('./controller.js');
const { newsPapers } = require('./service.js');
const app = express();

const articles = new Array();
const specificArticle = new Array();

app.get("/", (req, res) => res.json("Welcome to my climate change API!"));

newsPapers.forEach((newsPaper) => {
    axiosAbstraction(newsPaper, articles)
});

app.get("/news", (req, res) => {
    res.json(articles)
});

app.get("/news/:newspaperId", async (req, res) => {
    const selectedNewspaper = newsPapers.filter(newsPaper => newsPaper.name == req.params.newspaperId)[0]
    specificArticle.length = 0;
    axiosAbstraction(selectedNewspaper, specificArticle, res)
});

app.listen(PORT, () => console.log(`server is running on port ${PORT}!`));