import * as should from 'should';
import * as sinon from 'sinon';
import bookController from '../Controllers/bookController';
import {Request, Response} from 'express';

describe('Book Controller Tests:', () => {
  describe('Post', () => {
    it('should not allow an empty title on post', () => {
      let Book = (book: any) => {book.save = () => {}};
      var req = {
        body: {
          author: 'Jon'
        }
      };
      var res = {
        status: sinon.spy(),
        send: sinon.spy()
      };
      bookController(Book).post(req, res);
      res.status.calledWith(400).should.equal(true, 'Bad Status: ' + res.status.args);
      res.send.calledWith('Title is required').should.equal(true);
    })
  });
});
