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

describe('.add()', function () {
  it('should catch errors', function() {
    books.add.bind(books, {'foo': 'bar'})
      .should.not.throw('Record should be an object or an array of objects');

    books.add.bind(books, [{'foo': 'bar'}, {'baz': 12}])
      .should.not.throw('Record should be an object or an array of objects');

    books.add.bind(books, 1234)
      .should.throw('Record should be an object or an array of objects');
  });

  it('should save data to the store', function() {
    books.add({'foo': 'bar'});
    books._store.should.containDeep([{'foo': 'bar'}]);

    books.add([{'bar': 'foo'}, {'baz': 'daz'}]);
    books._store.should.containDeep([
      {'foo': 'bar'},
      {'bar': 'foo'},
      {'baz': 'daz'}
    ]);
  });

  it('should track the cid\'s of data', function() {
    books.add({'foo': 'bar'});
    books._store.should.containDeep([{'cid': 0}]);

    books.add([
      {'baz': 'boz'},
      {'bir': 'bar'}
    ]);
    books._store.should.containDeep([
      {'cid': 0},
      {'cid': 1},
      {'cid': 2}
    ]);
  });

  it('should call the adapters');

  it('should emit a \'change\' event', function(done) {
    books.on('change', function() {done()});

    books.add({'foo': 'bar'});
  });
});
