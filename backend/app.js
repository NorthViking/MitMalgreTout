const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


const app = express();

mongoose.connect('mongodb+srv://Caspar:PYBEEZWl05dEc89E@mmtcluster.1wl49.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use((req ,res, next) =>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-allow-Headers',
  'Origin, X-Requested-With, Content-type, Accept'
  );
  res.setHeader('Access-Control-Allow-Methods',
  'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

//PYBEEZWl05dEc89E
app.post('/',(req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message:'post added'
  });

});

app.use('/',(req, res, next) =>{
  res.send('hello middleware');

});

module.exports = app;
