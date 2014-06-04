/*eslint no-unused-expressions: 0*/

/**
 * Module dependencies
 */

var should = require('should');
var store = require ('../..');

/**
 * Test
 */

describe('.remove()', function () {
  it('should catch errors', function (done) {
    var books = store('books');
    books.store = {1: {tuna: true}};

    books.remove.bind(books, 'hello').should.throw('Provide a cid as an argument');
    books.remove.bind(books, 2).should.throw('The cid \'2\' could not be found');
    
    done();
  });
  it('should remove a record', function (done) {
    var books = store('books');
    books.store = {
      1: {tuna: true},
      2: {name: 'Tobi'}
    };

    books.remove(2);
    books.store.should.eql({1: {tuna: true}});

    done();
  });
  it('should emit a \'remove\' event', function (done) {
    var books = store('books');
    books.store = {
      1: {tuna: true},
      2: {name: 'Tobi'}
    };

    books.remove(2);
    done();
  });
});