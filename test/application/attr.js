/*eslint no-unused-expressions: 0*/

/**
 * Module dependencies
 */

var should = require('should');
var store = require ('../..');

/**
 * Test
 */

describe('.attr()', function () {
  it('should catch errors', function () {
    var books = store('books');

    books.attr.bind(null, 1337)
      .should.throw('store.attr: attribute should be a string');
    books.attr.bind(null, 'hi')
      .should.not.throw('store.attr: attribute should be a string');
    books.attr.bind(null, 'hi', 123)
      .should.throw('store.attr: meta should be an object');
    books.attr.bind(null, 'hi', {type: 'book'})
      .should.not.throw('store.attr: meta should be an object');
  });

  it('should define an attribute on the model', function () {
    var books = store('books');
    books.attr('bar');
    books.model.should.have.keys('bar')
  });

  it('should save \'meta\' arguments', function () {
    var books = store('books');
    books.attr('bar', {type: 'book'});
    books.model.should.eql({'bar': {type: 'book'}});
  });
});