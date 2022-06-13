const { signup, login, setAvatar } = require("../controllers/usersController");

const router = require("express").Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);

module.exports = router;
