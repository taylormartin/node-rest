import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import Book from './Models/Book';
import bookRouter from './Routes/bookRoutes';

let db;

if (process.env.ENV === 'Test') {
  db = mongoose.connect('mongodb://localhost/booksApi_test');
} else {
  db = mongoose.connect('mongodb://localhost/booksApi');
}

let app = express();

let port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/books', bookRouter(Book));

app.get('/', function(req, res) {
  res.send('welcome to my API!');
});

app.listen(port, function() {
  console.log('Running on PORT: ' + port);
});

export default app;
