const express = require("express");

const userController = require('../controllers/user')
const checkAuth = require("../middleware/check-auth");
const exstractFile = require("../middleware/file");

const router = express.Router();

router.post("/signup", userController.createUser);

router.post("/login" , userController.userLogin);

router.get("", userController.getUsers);

router.get("/:id", userController.getUser);

router.post("/:id" ,checkAuth, exstractFile, userController.editProfile );

router.delete("/:id", checkAuth, userController.deleteUser);
module.exports = router;
