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

describe('._sync()', function () {
  it('should catch errors', function() {
    books._sync.bind(books, 123)
      .should.throw('Method should be a string');

    books._sync.bind(books, 'hello')
      .should.throw('Data should not be undefined');
  });

  it('should call a single adapter', function(done) {
    books.on('sync', function() {done()});

    books._adapters = [{
      create: function(data, supply, cb) {
        supply.next(data, supply, cb);
      }
    }];

    books._sync('create', {cat: 'fish'});
  });

  it('should chain call multiple adapters', function(done) {
    books.on('sync', function() {done()});

    books._adapters = [{
      create: function(data, supply, cb) {
        supply.next(data, supply, cb);
      }
    }, {
      create: function(data, supply, cb) {
        supply.next(data, supply, cb);
      }
    }];

    books._sync('create', {cat: 'fish'});
  });
});
