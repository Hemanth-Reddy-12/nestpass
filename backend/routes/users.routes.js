const express = require("express");
const router = express.Router();

router.get("/me");
router.put("/me");
router.get("/my-tickets");
router.get("/registerations");
router.get("/payments");

module.exports = router;
