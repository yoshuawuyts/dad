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

describe('.schema()', function () {
  it('should catch errors', function () {
    books.schema.bind(123)
      .should.throw('Schema should be an object');
  });

  it('should define an attribute on the model', function () {
    books.schema({bar: {}});
    books._model.should.have.keys('bar');
    books.schema({foo: {}});
    books._model.should.have.keys('bar', 'foo');
  });

  it('should save \'meta\' arguments', function () {
    books.schema({bar: {type: 'book'}});
    books._model.should.eql({'bar': {type: 'book'}});
  });
});