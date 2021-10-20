const express = require("express");
const { axiosAbstraction } = require('./controller.js');
const { newsPapers } = require('./service.js');
const PORT = process.env.PORT || 8000;

const app = express();
const articles = new Array();
const specificArticle = new Array();

newsPapers.forEach((newsPaper) => axiosAbstraction(newsPaper, articles));

app.get("/", (req, res) => res.json("Welcome to my climate change API!"));
    
app.get("/news", (req, res) => res.json(articles));

app.get("/news/:newspaperId", async (req, res) => {
    const selectedNewspaper = newsPapers.filter(newsPaper => newsPaper.name == req.params.newspaperId)[0]
    specificArticle.length = 0;
    axiosAbstraction(selectedNewspaper, specificArticle, res)
});

app.listen(PORT, () => console.log(`server is running on port ${PORT}!`));
