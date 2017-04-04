var should = require('should'),
    supertest = require('supertest'),
    mongoose = require('mongoose'),
    app = require('../app.js'),
    Book = mongoose.model('Book'),
    agent = supertest.agent(app);

describe('Book Crud Test', function(){
  it('should allow a book to be posted and return a read and _id', function(done){
    var bookPost = {title: 'New Book', author: 'Taylor Martin', genre: 'Fiction'};
     
    agent.post('/api/books')
      .send(bookPost)
      .expect(200)
      .end(function(err, results){
        results.body.read.should.equal(false);
        results.body.should.have.property('_id');
        done();
      });
  }) 

  afterEach(function(done) {
    Book.remove().exec();
    done();
  });
});
