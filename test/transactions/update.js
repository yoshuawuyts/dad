/*eslint no-unused-expressions: 0*/

/**
 * Module dependencies
 */

var should = require('should');
var store = require ('../..');

/**
 * Test
 */

describe('.update()', function () {
  it('should catch errors', function () {
    var books = store('books');
    books.store = {1: {tuna: true}};

    books.update.bind(books, {hello: 'you'})
      .should.throw('Provide an object with a cid as an argument');
    books.update.bind(books, {cid: 0})
      .should.throw('The cid \'0\' could not be found');
  });
  
  it('should update records', function () {
    var books = store('books');
    books.store = {
      1: {cid: 1, tuna: true},
      8: {cid: 8, ham: 'bacon'}
    };

    books.update({cid: 1, tuna: false});
    books.store.should.eql({
      1: {cid: 1, tuna: false},
      8: {cid: 8, ham: 'bacon'}
    })
  });

  it('should emit an \'update\' event', function (done) {
    var books = store('books');
    books.on('update', function() {done()});
    books.store = {1: {tuna: true}};

    books.update({cid: 1, tuna: false});
  });
});