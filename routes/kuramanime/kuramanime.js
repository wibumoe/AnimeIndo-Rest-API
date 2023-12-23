const express = require("express");
const router = express.Router();
const {
  getRecentRelease,
  getAnimeEpisode,
} = require("./parser");

router.get("/", function (req, res) {
  res.json({
     message: "Welcome to the LuckyAnime API!",
  });
});
router.get("/details/anime/:animeId/:animeIdTitle", getDetailsAnime);
router.get(
  "/watch/anime/:animeName/:animeId/episode/:episodeId",
  getAnimeEpisode
);

module.exports = router;
