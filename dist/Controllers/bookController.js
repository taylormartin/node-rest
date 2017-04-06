"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let bookController = (Book) => {
    let post = (req, res) => {
        let book = new Book(req.body);
        if (!req.body.title) {
            res.status(400);
            res.send('Title is required');
        }
        book.save();
        res.status(201);
        res.send(book);
    };
    let get = (req, res) => {
        let query = {};
        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        Book.find(query, (err, books) => {
            if (err) {
                res.status(500).send(err);
            }
            else {
                let returnBooks = [];
                books.forEach(function (element, index, array) {
                    let newBook = element.toJSON();
                    newBook.links = {
                        self: 'http://' + req.headers.host + '/api/books/' + newBook._id
                    };
                    returnBooks.push(newBook);
                });
                res.json(returnBooks);
            }
        });
    };
    return {
        post: post,
        get: get
    };
};
exports.default = bookController;
