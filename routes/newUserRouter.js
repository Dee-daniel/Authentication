const router = require ('express').Router();

const {logout, register, login, signup, signin, dashboard} = require ("../controller/newUser");
const requiredAuthProcess = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);

router.get('/register', signup);
router.get('/login', signin);
router.get('/dashboard',requiredAuthProcess, dashboard,);
router.get('/logout', logout)

module.exports = router;