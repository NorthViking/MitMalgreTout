const express = require("express");

const userController = require('../controllers/user')
const checkAuth = require("../middleware/check-auth");
const exstractFile = require("../middleware/file");

const router = express.Router();

router.post("/signup", userController.createUser);

router.post("/login" , userController.userLogin);

router.get("", userController.getUsers);

router.get("/:id", userController.getUser);

router.put("/:id" , exstractFile, userController.editProfile );


module.exports = router;
