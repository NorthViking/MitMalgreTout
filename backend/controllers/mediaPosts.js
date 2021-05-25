const Media = require("../models/media");


exports.createMedia = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const media = new Media({
    title: req.body.title,
    mediaPath: url + "/media/" + req.file.filename,
    description: req.body.description,
    creator: req.userData.userId,
  });
  media.save().then(createdPost => {
    res.status(201).json({
      message: "post added successfully",
      post: {
        ...createdPost,
        id: createdPost._id,
      },
    });
  })
  .catch(error => {
    res.status(500).json({
      message:"Vi fejled i at gemme dit medie"
  });
  });
}

exports.updateMedia = (req, res, next) => {
  let mediaPath = req.body.mediaPath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    mediaPath = url + "/media/" + req.file.filename;
  }
  const media = new Media({
    _id: req.body.id,
    title: req.body.title,
    mediaPath: mediaPath,
    description: req.body.description,
    creator: req.userData.userId
  });

  Media.updateOne(
    { _id: req.params.id, creator: req.userData.userId },
    media
  ).then(result => {
    if (result.n > 0) {
      res.status(200).json({ message: "update successful" });
    } else {
      res.status(401).json({ message: "not authorized" });
    }
  })
  .catch(error => {
    res.status(500).json({
      message: "kunne ikke opdater medie"
    })
  });
};

exports.getMedias = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const mediaQuery = Media.find();
  let fechedMedia;
  if (pageSize && currentPage) {
    mediaQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  mediaQuery
    .then(documents => {
      fechedMedia = documents;
      return Media.estimatedDocumentCount();
    })
    .then(count => {
      res.status(200).json({
        message: "Posts Fetched successfully",
        media: fechedMedia,
        maxMedia: count,
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "hente media fejlede"
      })
    });
};

exports.getMedias = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const mediaQuery = Media.filter();
  let fechedMedia;
  if (pageSize && currentPage) {
    mediaQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  mediaQuery
    .then(documents => {
      fechedMedia = documents;
      return Media.estimatedDocumentCount();
    })
    .then(count => {
      res.status(200).json({
        message: "Posts Fetched successfully",
        media: fechedMedia,
        maxMedia: count,
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "hente media fejlede"
      })
    });
};

exports.getUserMedia = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const mediaQuery = Media.find();
  let fechedMedia;
  if (pageSize && currentPage) {
    mediaQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  mediaQuery
    .then(documents => {
      fechedMedia = documents;
      return Media.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Posts Fetched successfully",
        media: fechedMedia,
        maxMedia: count,
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "hente media fejlede"
      })
    });
};

exports.getMedia = (req, res, next) => {
  Media.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post Not found" });
    }
  })
  .catch(error => {
    res.status(500).json({
      message: "hente media fejlede"
    })
  });
}



exports.deleteMedia = (req, res, next) => {
  Media.deleteOne({ _id: req.params.id, creator: req.userData.userId })
  .then(
    result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Media deleted" });
      } else {
        res.status(401).json({ message: "Not authorized" });
      }
  })
  .catch(error => {
    res.status(500).json({
      message: "slete media fejlede"
    })
  });
}
