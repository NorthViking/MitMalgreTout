const express = require("express");
const multer = require("multer");

const Media = require("../models/media");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/media");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
    .toLowerCase()
    .split(" ")
    .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "-" + ext);
  },
});

router.post(
  "",
  multer({ storage: storage }).single("media"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const media = new Media({
      title: req.body.title,
      mediaPath: url + "/media/" + req.file.filename,
      description: req.body.description
    });
    media.save().then(createdPost => {
      res.status(201).json({
        message: "post added successfully",
        post: {
          ...createdPost,
          id: createdPost._id
        }
      });
    });
  }
);

router.put(
  "/:id",
  multer({ storage: storage }).single("media"),
  (req, res, next) => {
    let mediaPath = req.body.mediaPath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      mediaPath = url + "/media/" + req.file.filename;
    }
    const media = new Media({
      _id: req.body.id,
      title: req.body.title,
      mediaPath: mediaPath,
      description: req.body.description
    });
    console.log(media);
    Media.updateOne({ _id: req.params.id }, media).then(result => {
      res.status(200).json({ message: "update successful" });
    });
  }
);

router.get("", (req, res, next) => {
  Media.find().then(documents => {
    res.status(200).json({
      message: "Posts Fetched successfully",
      media: documents
    });
  });
});

router.get("/:id", (req, res, next) => {
  Media.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post Not found" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Media.deleteOne({_id: req.params.id}).then(result =>{
    console.log(result);
    res.status(200).json({message:"Media deleted"});
  });
});

module.exports = router;
