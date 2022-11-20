const express = require("express");
const findInfo = require("./artist");
const router = express.Router();

router.get("/:artistName", findInfo.artistInfo);

module.exports = router;
