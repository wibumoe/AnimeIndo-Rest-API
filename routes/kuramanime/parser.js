const axios = require("axios");

const request = require("request");
const cheerio = require("cheerio");
const baseURL = "https://kuramanime.pro";

const getAnimeEpisode = (req, res) => {
  const options = {
    url: `https://kuramanime.net/anime/${req.params.animeName}/${req.params.animeId}/episode/${req.params.episodeId}?activate_stream=1`,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36 Edg/108.0.1462.54",
      "Accept-Language": "en-US,en;q=0.9",
    },
  };

  axios
    .get(options.url, { headers: options.headers })
    .then((response) => {
      const $ = cheerio.load(response.data);

      let datas = [];
      let videoSource = []; // Undefined or empty

      $("#player")
        .find("source")
        .each((i, el) => {
          videoSource.push({
            episode: $(el).attr("src"),
            type: $(el).attr("type"),
            size: $(el).attr("size"),
          });
        });

      $("#animeEpisodes > a").each((i, el) => {
        datas.push({
          episodeText: $(el).text().replace(/\s+/g, " ").trim(),
          episodeId: $(el).attr("href")
            ? $(el)
                .attr("href")
                .replace(/^https?:\/\/kuramanime\.pro/i, "")
            : "",
        });
      });

      res.status(200).json({
        statusbar: "success",
        data: datas,
        isActive: $("#animeEpisodes > a.active-ep.ep-button").attr("class"),
        episodeActive: $("#animeEpisodes > a.active-ep.ep-button")
           .text()
          .match(/\d+/)[0],
        episodeUrl: videoSource,
      });
    })
    .catch((error) => {
      res.status(500).json({
        statusbar: "error",
        message: error.message,
      });
    });
};
module.exports = {
  getDetailsAnime,
  getAnimeEpisode,
};
