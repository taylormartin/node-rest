var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db;

if (process.env.ENV === 'Test') {
  db = mongoose.connect('mongodb://localhost/booksApi_test');
} else {
  db = mongoose.connect('mongodb://localhost/booksApi');
}

var Book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 3000;

bookRouter = require('./Routes/bookRoutes')(Book);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/books', bookRouter);

app.get('/', function(req, res) {
  res.send('welcome to my API!');
});

app.listen(port, function() {
  console.log('Running on PORT: ' + port);
});

module.exports = app;

