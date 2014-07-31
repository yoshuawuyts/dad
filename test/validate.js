/*eslint no-unused-expressions: 0*/

/**
 * Module dependencies
 */

var should = require('should');
var store = require ('../');
var books = store('books');

/**
 * Before each.
 */

beforeEach(function() {
  books = store('books');
});


/**
 * Test
 */

describe('.validate()', function () {
  it('should catch errors', function () {
    books.model = {foo: 'bar'};
    
    books.validate.bind(books, 123)
      .should.throw('Property should be a string');
    books.validate.bind(books, 'baz')
      .should.throw('Target should exist');
    books.validate.bind(books, 'baz', 'foo')
      .should.throw('Property is not defined');
  });

  it('should validate targets', function () {
    var myInteger = 1337;
    books.model = {
      foo: {type: 'number'},
      bar: {type: 'string'}
    };

    books.validate('foo', myInteger);
  });
});