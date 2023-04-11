const { Router } = require("express");
const { protect } = require("../middleware/auth.middleware");
const { chat_access } = require("../controllers/chat.controllers");

// * Variables
const router = Router();

// * Direccionamiento
router.post("/", protect, chat_access);
// router.post("/group", protect, group_create);
// router.get("/", protect, chat_get);
// router.put("/groupRename", protect, group_rename);
// router.put("/groupRemove", private, group_removeFrom);
// router.put("/groupAdd", private, group_addTo);

module.exports = router;