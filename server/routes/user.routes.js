const { Router } = require("express");
const { registerUser } = require("../controllers/user.controllers");

// * Variables
const router = Router();

// * Direccionamiento
router.post("/signup", registerUser);
// router.post("/login", authUser);

module.exports = router;