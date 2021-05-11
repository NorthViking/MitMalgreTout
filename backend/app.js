const express = require('express');
const mongoose = require('mongoose');

const mediaPostsRoutes = require('./routes/mediaPosts');

const app = express();

mongoose
  .connect(
    'mongodb+srv://Caspar:PYBEEZWl05dEc89E@mmtcluster.1wl49.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    )
    .then(()=>{
      console.log('Connected to database');
    })
    .catch(()=>{
      console.log('Connection failed');
    });

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use((req ,res, next) =>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader(
    'Access-Control-allow-Headers',
    'Origin, X-Requested-With, Content-type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

//PYBEEZWl05dEc89E

app.use('/api/mediaPosts', mediaPostsRoutes);

module.exports = app;
