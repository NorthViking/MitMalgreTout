const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const mediaPostsRoutes = require('./routes/mediaPosts');
const userRoutes = require('./routes/user');



const app = express();
//SG1AEMcgfuAiBlv9
//jLO72lMHH2XWKWr0
//PYBEEZWl05dEc89E
mongoose
  .connect(
    'mongodb+srv://Anja:SG1AEMcgfuAiBlv9@mmtcluster.1wl49.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
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
app.use("/user", express.static(path.join("backend/ProfileImage")));


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


app.use('/api/mediaPosts', mediaPostsRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
