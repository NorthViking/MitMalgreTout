const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const ProfileInfo = require("../models/profileInfo");

exports.createProfileInfo = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new ProfileInfo({
      dateOfBirth: req.body.dateOfBirth,
      phoneNumber: req.body.phoneNumber,
      interests: req.body.interests,
      myEvents: req.body.myEvents,
      myMedia: req.body.myMedia

    });
    profileInfo.save()
      .then(result => {
        res.status(201).json({
          message: 'profileInfo Created',
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

exports.profileInfo =  (req, res, next) => {
  let fetchedProfileInfo;
  ProfileInfo.findOne({profileInfo: req.body.profileInfo})
  .then(profileInfo => {
    if (!profileInfo) {
       return res.status(401).json({
        message: "Auth fejlede!"
      });
    }
    fetchedProfileInfo = profileInfo;
    return bcrypt.compare(req.body.profileInfo);
  })
  .then(result => {
    if (!result) {
      return res.status(401).json({
        message: "Auth fejlede!"
      });
    }
    const token = jwt.sign(
      {profileInfo: fetchedProfileInfo.profileInfo, profileInfoId: fetchedProfileInfo._id},
      process.env.JWT_KEY,
      {expiresIn: '1h'}
    );
    res.status(200).json({
      token: token,
      expiresIn: 3600,
      profileInfoId: fetchedProfileInfo._id
    });
  })
  .catch(err => {
    return res.status(401).json({
      message: "Ugyldige oplysninger!"
    });
  });
}
