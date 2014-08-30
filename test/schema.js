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

  it('should define an attribute on the model', function () {
    books.schema = {bar: {}};
    books._schema.should.have.keys('bar');
    books.schema = {foo: {}};
    books._schema.should.have.keys('foo');
  });

  it('should save \'meta\' arguments', function () {
    books.schema = {bar: {type: 'book'}};
    books._schema.should.eql({'bar': {type: 'book'}});
  });

});
