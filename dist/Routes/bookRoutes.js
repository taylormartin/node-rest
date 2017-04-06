"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookController_1 = require("../Controllers/bookController");
let routes = (Book) => {
    let bookRouter = express_1.Router();
    let bookControllerWithBook = bookController_1.default(Book);
    bookRouter.route('/')
        .post(bookControllerWithBook.post)
        .get(bookControllerWithBook.get);
    bookRouter.use('/:bookId', (req, res, next) => {
        Book.findById(req.params.bookId, (err, book) => {
            if (err) {
                res.status(500).send(err);
            }
            else if (book) {
                req.book = book;
                next();
            }
            else {
                res.status(404).send('no book found');
            }
        });
    });
    bookRouter.route('/:bookId')
        .get((req, res) => {
        let returnBook = req.book.toJSON();
        let genreLink = 'http://' + req.headers.host + '/api/books?genre=' + encodeURIComponent(returnBook.genre);
        returnBook.link = {
            FilterByThisGenre: genreLink
        };
        res.json(returnBook);
    })
        .put((req, res) => {
        req.book.title = req.body.title;
        req.book.author = req.body.author;
        req.book.genre = req.body.genre;
        req.book.read = req.body.read;
        req.book.save((err) => {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(req.book);
            }
        });
    })
        .patch((req, res) => {
        if (req.body._id) {
            delete req.body._id;
        }
        for (let p in req.body) {
            req.book[p] = req.body[p];
        }
        req.book.save((err) => {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(req.book);
            }
        });
    }).delete((req, res) => {
        req.book.remove((err) => {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.status(204).send('Removed');
            }
        });
    });
    return bookRouter;
};
exports.default = routes;
