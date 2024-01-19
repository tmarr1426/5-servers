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
  
router.post("/create", (req,res) => {
  try{
    let myObj = {
      id: db.length + 1,
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      emoji: req.body.emoji,
    }
    db.push(myObj);
    res.status(200).json({
      Added: myObj,
      Results: db,
    })
  }catch(err){
    res.status(500).json({
      error: err,
    });
  }
})

  module.exports = router;