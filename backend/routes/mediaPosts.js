const express = require("express");

const mediaPostController = require("../controllers/mediaPosts")
const checkAuth = require("../middleware/check-auth");
const exstractFile = require("../middleware/file");

const router = express.Router();



router.post("",checkAuth, exstractFile, mediaPostController.createMedia);

router.put("/:id",checkAuth, exstractFile, mediaPostController.updateMedia);

router.get("", mediaPostController.getMedias);

router.get("/:id", mediaPostController.getMedia);

router.delete("/:id", checkAuth, mediaPostController.deleteMedia);

module.exports = router;
