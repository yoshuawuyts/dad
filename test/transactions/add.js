/*eslint no-unused-expressions: 0*/

/**
 * Module dependencies
 */

var should = require('should');
var store = require ('../..');

/**
 * Test
 */

describe('.add()', function () {
  it('should catch errors', function (done) {
    var books = store('books');
    books.add.bind(books, {'foo': 'bar'})
      .should.not.throw('Store.add: argument should be an object, or an array of Objects');

    books.add.bind(books, [{'foo': 'bar'}, {'baz': 12}])
      .should.not.throw('Store.add: argument should be an object, or an array of Objects');

    books.add.bind(books, 1234)
      .should.throw('Store.add: argument should be an object, or an array of Objects');

    done();
  });

  it('should save data to the store', function (done) {
    var books = store('books');

    books.add({'foo': 'bar'});
    books.store.should.containDeep([{'foo': 'bar'}]);

    books.add([{'bar': 'foo'}, {'baz': 'daz'}]);
    books.store.should.containDeep([
      {'foo': 'bar'},
      {'bar': 'foo'}, 
      {'baz': 'daz'}
    ]);
    
    done();
  });

  it('should track cid\'s of the data', function (done) {
    var books = store('books');

    books.add({'foo': 'bar'});
    books.store.should.containDeep([{'cid': 0}]);

    books.add([
      {'baz': 'boz'}, 
      {'bir': 'bar'}
    ]);
    books.store.should.containDeep([
      {'cid': 0}, 
      {'cid': 1}, 
      {'cid': 2}
    ]);

    done();
  });
});