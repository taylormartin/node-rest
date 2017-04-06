"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon = require("sinon");
describe('Book Controller Tests:', () => {
    describe('Post', function () {
        it('should not allow an empty title on post', () => {
            let Book = (book) => { book.save = () => { }; };
            var req = {
                body: {
                    author: 'Jon'
                }
            };
            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            };
            var bookController = require('../Controllers/bookController')(Book);
            bookController.post(req, res);
            res.status.calledWith(400).should.equal(true, 'Bad Status: ' + res.status.args);
            res.send.calledWith('Title is required').should.equal(true);
        });
    });
});
