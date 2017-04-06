"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Book_1 = require("./Models/Book");
const bookRoutes_1 = require("./Routes/bookRoutes");
let db;
if (process.env.ENV === 'Test') {
    db = mongoose.connect('mongodb://localhost/booksApi_test');
}
else {
    db = mongoose.connect('mongodb://localhost/booksApi');
}
let app = express();
let port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/books', bookRoutes_1.default(Book_1.default));
app.get('/', function (req, res) {
    res.send('welcome to my API!');
});
app.listen(port, function () {
    console.log('Running on PORT: ' + port);
});
exports.default = app;
