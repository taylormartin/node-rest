import {Router, Request, Response, NextFunction } from 'express';
import bookController from '../Controllers/bookController';

let routes = (Book: any) => {
  let bookRouter = Router();
  let bookControllerWithBook = bookController(Book);

  bookRouter.route('/')
    .post(bookControllerWithBook.post)
    .get(bookControllerWithBook.get);

  bookRouter.use('/:bookId', (req: any, res: Response, next: NextFunction) => {
    Book.findById(req.params.bookId, (err: any, book: any) => {
      if (err) {
        res.status(500).send(err);
      } else if(book) {
        req.book = book;
        next();
      } else {
        res.status(404).send('no book found');
      }
    });
  });

  bookRouter.route('/:bookId')
    .get((req: any, res: Response) => {
      let returnBook = req.book.toJSON();
      let genreLink = 'http://' + req.headers.host + '/api/books?genre=' + encodeURIComponent(returnBook.genre);
      returnBook.link = {
        FilterByThisGenre: genreLink
      };
      res.json(returnBook);
    })
    .put((req: any, res: Response) => {
      req.book.title = req.body.title;
      req.book.author = req.body.author;
      req.book.genre = req.body.genre;
      req.book.read = req.body.read;
      req.book.save((err: any) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(req.book);
        }
      });
    })
    .patch((req: any, res: Response) => {
      if (req.body._id) {
        delete req.body._id;
      }
      for(let p in req.body) {
        req.book[p] = req.body[p];
      }
      req.book.save((err: Error) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(req.book);
        }
      });
    }).delete((req: any, res: Response) => {
      req.book.remove((err: Error) => {
        if(err) {
          res.status(500).send(err);
        } else {
          res.status(204).send('Removed');
        }
      });
    });

  return bookRouter;
};

export default routes;
