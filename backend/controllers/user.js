const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const User = require("../models/user");

exports.createUser = (req, res, next) => {
  let profilePicture = req.body.profilePicture;
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
      profilePicture: profilePicture,
      profileInfo: req.body.profileInfo,
      dateOfBirth: req.body.dateOfBirth,
      interests: req.body.interests
    });
    user.save()
      .then(result => {
        res.status(201).json({
          message: 'User Created',
          result: result
        })
      })
      .catch(err => {
        res.status(500).json({
          error: {
            message: "Ubrugbar authentications oplysninger"
          }
        })
      })

  });
}

exports.userLogin =  (req, res, next) => {
  let fetchedUser;
  User.findOne({email: req.body.email})
  .then(user => {
    if (!user) {
       return res.status(401).json({
        message: "Auth fejlede!"
      });
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password);
  })
  .then(result => {
    if (!result) {
      return res.status(401).json({
        message: "Auth fejlede!"
      });
    }
    const token = jwt.sign(
      {email: fetchedUser.email, userId: fetchedUser._id},
      process.env.JWT_KEY,
      {expiresIn: '1h'}
    );
    res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId: fetchedUser._id
    });
  })
  .catch(err => {
    return res.status(401).json({
      message: "Ugyldige oplysninger!"
    });
  });
}

exports.getUsers = (req, res, next) => {
  User.find().then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      users: documents
    });
  });
};

exports.getUser = (req, res, next) => {
  User.findById(req.params.id).then(user => {
    if (user) {
      res.status(200).json(user);
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

exports.deleteUser = (req, res, next) => {
  User.deleteOne({ _id: req.params.id })
  .then(
    result => {
      if (result.n > 0) {
        res.status(200).json({ message: "User deleted" });
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



exports.editProfile = (req, res, next) => {
  let profilePicturePath = req.body.profilePicturePath;
  if(req.file){
    const url = req.protocol + "://" + req.get("host");
    profilePicturePath = url + "/ProfileImage/" + req.file.filename;
  }
  const user = new User({
    _id: req.body.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    profilePicturePath: profilePicturePath,
    phoneNumber: req.body.phoneNumber,
    dateOfBirth: req.body.dateOfBirth,
    interests: req.body.interests,
  });
  console.log(user)
  User.updateOne({_id: req.body.id}, user).then(result => {
      if (result.n> 0) {
        res.status(200).json({ message: "updated profile successful" });
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
