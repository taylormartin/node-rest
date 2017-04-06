"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supertest = require("supertest");
const mongoose = require("mongoose");
const app_1 = require("../app");
let Book = mongoose.model('Book');
let agent = supertest.agent(app_1.default);
describe('Book Crud Test', function () {
    it('should allow a book to be posted and return a read and _id', (done) => {
        let bookPost = { title: 'New Book', author: 'Taylor Martin', genre: 'Fiction' };
        agent.post('/api/books')
            .send(bookPost)
            .expect(200)
            .end((err, results) => {
            results.body.read.should.equal(false);
            results.body.should.have.property('_id');
            done();
        });
    });
    afterEach((done) => {
        Book.remove().exec();
        done();
    });
});
