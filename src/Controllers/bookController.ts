import {Router, Request, Response, NextFunction } from 'express';

let bookController = (Book: any) => {

  let post = (req: Request, res: Response) => {
    let book = new Book(req.body);
    if (!req.body.title) {
      res.status(400);
      res.send('Title is required');
    }
    book.save();
    res.status(201);
    res.send(book);
  };

  let get = (req: Request, res: Response) => {
    let query: any = {};
    if(req.query.genre) {
      query.genre = req.query.genre;
    }
    Book.find(query, (err: Error, books: Array<any>) => {
      if (err) {
        res.status(500).send(err);
      } else {
        let returnBooks: Array<any> = [];
        books.forEach(function(element, index, array) {
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

export default bookController;
