const express = require("express");
const searchController = require("../controllers/searchController");
const authController = require("../controllers/authController");

const router = express.Router();

// protect all routes after this
router.use(authController.protect); // verifies JWT and sets user

router.get("/", searchController);

module.exports = router;
