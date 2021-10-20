const PORT = process.env.PORT || 8000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const { newsPapers } = require('./service.js');

const axiosAbstraction = (newsPaper, storage, res) => {
    axios
        .get(newsPaper.address)
        .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);
            $('a:contains("climate")', html).each(function () {
                const title = $(this).text();
                const url = $(this).attr("href");
                storage.push({
                    title,
                    url: newsPaper.base + url,
                    source: newsPaper.name,
                });
            });
            res?.json(storage);
        })
        .catch((err) => console.log(err));
}

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
