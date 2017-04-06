import * as should from 'should';
import * as supertest from 'supertest';
import * as mongoose from 'mongoose';
import app from '../app';

let Book: any = mongoose.model('Book');
let agent = supertest.agent(app);

describe('Book Crud Test', function(){
  it('should allow a book to be posted and return a read and _id', (done) => {
    let bookPost = {title: 'New Book', author: 'Taylor Martin', genre: 'Fiction'};

    agent.post('/api/books')
      .send(bookPost)
      .expect(200)
      .end((err: Error, results: any) => {
        results.body.read.should.equal(false);
        results.body.should.have.property('_id');
        done();
      });
  }) 

  afterEach((done) => {
    Book.remove().exec();
    done();
  });
  
});
