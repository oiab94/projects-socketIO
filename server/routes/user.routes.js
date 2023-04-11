const { Router } = require("express");
const { registerUser, authUser, allUsers } = require("../controllers/user.controllers");
const { protect } = require("../middleware/auth.middleware");

// * Variables
const router = Router();

// * Direccionamiento
router.post("/signup", registerUser);
router.post("/login", authUser);
router.get("/getUsers", protect, allUsers);

module.exports = router;