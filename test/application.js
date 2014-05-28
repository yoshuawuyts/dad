/*eslint no-unused-expressions: 0*/
'use strict';

var should = require('should');
var store = require ('..');

describe('Application', function () {
  describe('when initialized', function () {
    it('should have empty objects', function (done) {
      var books = store('books');
      books.store.should.be.empty;
      books.model.should.be.empty;
      done();
    });

    it('should set a name property', function (done) {
      var books = store('books');
      books.name.should.eql('books');
      done();
    });
  });
});

describe('#.attr()', function () {
  describe('when incorrect arguments are provided', function () {
    it('should throw', function (done) {
      var books = store('books');

      books.attr.bind(null, 1337)
        .should.throw('store.attr: Attribute should be a string');
      books.attr.bind(null, 'hi')
        .should.not.throw('store.attr: Attribute should be a string');

      books.attr.bind(null, 'hi', 123)
        .should.throw('store.attr: Meta should be an object');
      books.attr.bind(null, 'hi', {type: 'book'})
        .should.not.throw('store.attr: Meta should be an object');

      done();
    });
  });

  it('should define an attribute on the model', function (done) {
    var books = store('books');
    books.attr('bar');
    books.model.should.have.keys('bar')
    done();
  });

  it('should save \'meta\' arguments', function (done) {
    var books = store('books');
    books.attr('bar', {type: 'book'});
    books.model.should.eql({'bar': {type: 'book'}});
    done();
  });
});

describe('#.add()', function () {
  describe('when incorrect arguments are provided', function () {
    it('should throw', function (done) {
      var books = store('books');

      books.add.bind(books, {'foo': 'bar'})
        .should.not.throw('Store.add: argument should be an object, or an array of Objects');

      books.add.bind(books, [{'foo': 'bar'}, {'baz': 12}])
        .should.not.throw('Store.add: argument should be an object, or an array of Objects');

      books.add.bind(books, 1234)
        .should.throw('Store.add: argument should be an object, or an array of Objects');

      done();
    });
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