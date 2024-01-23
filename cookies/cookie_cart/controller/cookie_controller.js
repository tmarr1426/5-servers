const router = require("express").Router();
const db = require("../db.json");

router.get("/cookie-jar", (req, res) => {
  res.cookie("cart", [
    { item: "milk", price: 1.79 },
    { item: "cheese", price: 2.99 },
    { item: "bread", price: 5.98 },
  ]);
  //console.log(req.cookies); check if cookie is present
  const check = req.cookies;

  // Array that will house lower priced items
  let offer = [];
  // Array that will hold previous data
  let cartUnupdated = [];

  check?.cart?.forEach((obj) => {
    // Pushing new values to the cartunupdated array
    cartUnupdated.push({ ...obj });
    // Pushing items from db that match the names of items in our cart and if they have a lower price found in db
    offer.push(
      db.filter((i) => {
        if (i.item == obj.item && i.price < obj.price) {
            obj.price = i.price
          return true;
        } else {
            return false;
        }
      })
    );
  });
  const total = check?.cart?.reduce((acc, i) => (acc += i.price), 0).toFixed(2);
  const oldPrice = cartUnupdated
    .reduce((acc, i) => (acc += i.price), 0)
    .toFixed(2);

//   console.log({ total });

//   console.log(offer);

  if (offer.length > 0) {
    res.send({
        offer: `Found ${offer.length} item/s from updated db with lower prices!!`,
        total: "$" + total,
        oldTotal: "$" + oldPrice,
        savings: `$${(oldPrice - total).toFixed(2)}`,
        itemsLowerPriced: offer,
        oldCartPrices: cartUnupdated,
    })
  } else {
    res.send({
        default: "No lower priced items found",
        total: total,
        cookies: check,
    })
  }
  res.send("hi");
});

module.exports = router;
