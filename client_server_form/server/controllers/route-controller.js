const router = require("express").Router();
const db = require("../db.json");

router.get("/", (req, res) => {
  try {
    res.status(200).json({
      results: db,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

router.get("/param/:id", (req, res) => {
  try {
    let { id } = req.params;
    let results = db.filter((obj) => obj.id == id);
    results.length > 0
      ? res.status(200).json({
          results: results,
        })
      : res.status(404).send("Nothing found");
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

router.get("/query", (req, res) => {
  try {
    let { id } = req.query;
    let results = db.filter((i) => i.id == id);
    results.length > 0
      ? res.status(200).json({
          results: results,
        })
      : res.status(404).send("Nothing found");
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

module.exports = router;
