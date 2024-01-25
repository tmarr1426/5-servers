const router = require("express").Router();
const db = require("../mockdb/db.json");

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

router.post("/create", (req, res) => {
  try {
    let myObj = {
      id: db.length + 1,
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      emoji: req.body.emoji,
    };
    db.push(myObj);
    res.status(200).json({
      Added: myObj,
      Results: db,
    });
  } catch (err) {
    res.status(500).json({
      Error: err,
    });
  }
});

// [PUT] Updating an item from db
router.put("/update/:id", (req, res) => {
  try {
    // Grabbing the index of an item/obj that matches our param id
    let indexOfItem = db.findIndex((i) => i.id == req.params.id);
    // console.log(indexOfItem)
    db[indexOfItem] = {
      id: req.params.id,
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      emoji: req.body.emoji,
    };
    res.status(200).json({
      Updated: db[indexOfItem],
    });
  } catch (err) {
    // console.log(err)
    res.status(500).json({
      Error: err,
    });
  }
});

// [DELETE] - Remove an item from the db
router.delete("/delete/:id", (req, res) => {
  try {
    let indexOfItem = db.findIndex((i) => i.id == req.params.id);
    db.splice(indexOfItem, 1);
    db.forEach((i, idx) => {
      i.id = idx + 1;
    });
    res.status(200).json({
      Deleted: db[indexOfItem],
    });
  } catch (err) {
    // console.log(err)
    res.status(500).json({
      Error: err,
    });
  }
});

module.exports = router;
