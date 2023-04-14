const { Router } = require("express");
const { protect } = require("../middleware/auth.middleware");
const { chat_access, chat_get, group_create, group_rename, group_addTo, group_removeTo } = require("../controllers/chat.controllers");

// * Variables
const router = Router();

// * Direccionamiento
router.post("/", protect, chat_access);
router.post("/groupCreate", protect, group_create);
router.get("/", protect, chat_get);
router.put("/groupRename", protect, group_rename);
router.put("/groupAddTo", protect, group_addTo);
router.put("/groupRemoveTo", protect, group_removeTo);

module.exports = router;