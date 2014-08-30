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

describe('.allAccountedFor()', function () {
  it('should catch errors', function() {
    books.allAccountedFor.bind(books, 123)
      .should.throw('Record should be an object');
  });
  it('should check if all required properties are present', function() {
    var counter = 0;

    books._schema = {
      foo: {required: true},
      baz: {required: true},
      bin: {}
    };

    books.on('allAccountedFor', function(msg) {
      if (!counter) {
        msg.should.eql(false);
        return counter++;
      }
      msg.should.eql(true);
    });

    books.allAccountedFor({
      foo: 'bar',
      bin: 'baz'
    });

    books.allAccountedFor({
      foo: 'bar',
      baz: 123,
      bin: 'baz'
    });
  });
});
