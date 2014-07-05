/*eslint no-unused-expressions: 0*/

/**
 * Module dependencies
 */

var should = require('should');
var store = require ('../..');

/**
 * Test
 */

describe('.validate()', function () {
  it('should catch errors', function () {
    var books = store('books');
    books.model = {foo: 'bar'};
    
    books.validate.bind(books, 123)
      .should.throw('Property should be a string');
    books.validate.bind(books, 'baz')
      .should.throw('Target should exist');
    books.validate.bind(books, 'baz', 'foo')
      .should.throw('Property is not defined');
  });

  it('should validate targets', function () {
    var books = store('books');
    var myInteger = 1337;
    books.model = {
      foo: {type: 'number'},
      bar: {type: 'string'}
    };

    books.validate('foo', myInteger);
  });
});