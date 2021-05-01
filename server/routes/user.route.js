const express = require("express");

const router = express.Router();

module.exports = router;

router.route("/user/:userId").get((req, res) => {});
