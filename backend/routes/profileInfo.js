const path = require('path');
const express = require('express');
const profileInfoController = require("../controllers/profileInfos")
const checkAuth = require("../middleware/check-auth");
const exstractFile = require("../middleware/file");

const router = express.Router();

router.post("",checkAuth, exstractFile, profileInfoController.createProfileInfo);

router.put("/:id",checkAuth, exstractFile, profileInfoController.updateProfileInfo);

router.get("", profileInfoController.getProfileInfo);

router.get("/:id", profileInfoController.getProfileInfo);

router.delete("/:id", checkAuth, profileInfoController.deleteProfileInfo);

module.exports = router;

/*const bodyParser = require("body-parser");
const ProfileInfo = require('./models/user')
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const mediaPostsRoutes = require('./routes/mediaPosts');
const userRoutes = require('./routes/user');

const app = express();

//jLO72lMHH2XWKWr0
//PYBEEZWl05dEc89E
mongoose
  .connect(
    'mongodb+srv://Caspar:jLO72lMHH2XWKWr0@mmtcluster.1wl49.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology: true}
    )
    .then(()=>{
      console.log('Connected to database');
    })
    .catch(()=>{
      console.log('Connection failed');
    });

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/media", express.static(path.join("backend/media")));

app.use(bodyParser.json());

app.use((req ,res, next) =>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/profileInfos", (req, res, next) => {
  const profileInfo = new ProfileInfo({
    profileInfo: req.body.profileInfo,
    profilePicture: req.body.profilePicture,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dateOfBirth: req.body.dateOfBirth,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    interests: req.body.interests,
    myEvents: req.body.myEvents,
    myMedia: req.body.myMedia
  });
  profileInfo.save();
  res.status(201).json({
    message: 'profileInfo added succesfully'
  });
});

app.get("/api/profileInfos", (req, res, next) => {
  ProfileInfo.find()
  .then(documents => {
    res.status(200).json({
      message: 'ProfileInfos fetched succesfully!',
      profileInfos: documents
  });

});


app.delete("/api/profileInfos/:id", (req, res, next) => {
  console.log(req.params.id);
  res.status(200).json({message: 'Profile info deleted'});
});

app.use('/api/mediaPosts', mediaPostsRoutes);
app.use('/api/user', userRoutes);
app.use('/api/profile', profileInfosRoutes);

module.exports = app;
})*/
