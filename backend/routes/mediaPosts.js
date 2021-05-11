const express = require('express');
const multer = require('multer');

const  Post  = require('../models/image');

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("invalid mime type");
    if(isValid) {
      error = null;
    }
    cb(error, 'backend/media');
  },
  filename: (req, file, cb) => {
    const name = file.originalname
    .toLowerCase()
    .split(' ')
    .join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '-' + ext);
  }
});

router.post(
  "",
  multer({storage: storage}).single("image"),
  (req, res, next) => {
    const post = new Post({
      title: req.body.title,
      description: req.body.description
    });
    post.save().then(createdPost => {
    res.status(201).json({
      message: 'post added successfully',
      post:{
        ...createdPost,
        id: createdPost._id
      }
    });
  });

});


