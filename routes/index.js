var express = require("express");
var router = express.Router();

const Url = require("../models/UrlModel");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Chppd" });
});

/* GET actual page from shortened url */
router.get("/:shortened", function (req, res, next) {
  // Search the DB by the shortened url
  Url.findOne({ shortened_url: req.params.shortened }, (err, actual) => {
    // Handle errors
    if (err) {
      return next(err);
    }
    
    // Redirect the page
    if (actual !== null) {
      console.log(actual["actual_url"]);
      return res.redirect(actual["actual_url"]);
    } else {
      return res.render("index", { title: "Chppd" });
    }
  });
});

/* POST URL from form */
router.post("/submit", function (req, res, next) {
  // Check if a custom back-half is present
  let shortURL;
  if (req.body.backhalf) {
    shortURL = req.body.backhalf;
  } else {
    // Generate a random string for the backhalf
    shortURL = generateRandomString(4);
  }
  // Upload the user's URL and the random string to the DB
  let payload = { actual_url: req.body.url, shortened_url: shortURL };
  Url.create(payload, (err, link) => {
    // Handle errors
    if (err) return res.json(err);

    // Render the page with the new link
    res.render("index", { title: "Chppd", newURL: shortURL });
  });
});

module.exports = router;

// Functions
function generateRandomString(length) {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
