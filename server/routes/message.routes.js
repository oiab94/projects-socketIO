const { Router } = require("express");
const { protect } = require("../middleware/auth.middleware");
const { sendMessage, allMessage } = require("../controllers/message.controllers");

// * Variables
const router = Router();

// * Direccionamiento
router.post("/sendMessage", protect, sendMessage);
router.get("/getMessages/:chatId", protect, allMessage);

module.exports = router;