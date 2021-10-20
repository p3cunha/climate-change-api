const axios = require("axios");
const cheerio = require("cheerio");

module.exports = {
    axiosAbstraction: function (newsPaper, storage, res) {
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
}
