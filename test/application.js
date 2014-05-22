/*eslint no-unused-expressions: 0*/
'use strict';

var should = require('should');
var resource = require ('..');

describe('Application', function () {
  it('should init empty objects', function (done) {
    var books = resource('books');
    books.store.should.be.empty;
    books.model.should.be.empty;
    books.syncOrder.should.eql(['http']);
    done();
  });
});

describe('#.attr()', function () {
  it('should throw if incorrect arguments are provided', function (done) {
    var books = resource('books');
    books.attr.bind(null, 1337).should.throw('Attribute should be a string');
    books.attr.bind(null, 'hi').should.not.throw('Attribute should be a string');

    books.attr.bind(null, 'hi', 123).should.throw('Meta should be an object');
    books.attr.bind(null, 'hi', {type: 'book'}).should.not.throw('Meta should be an object');
    done();
  });

  it('should define an attribute on the model', function (done) {
    var books = resource('books');
    books.attr('bar');
    books.model.should.have.keys('bar')
    done();
  });

  it('should save \'meta\' arguments', function (done) {
    var books = resource('books');
    books.attr('bar', {type: 'book'});
    books.model.should.eql({'bar': {type: 'book'}});
    done();
  });
});

describe('#.add()', function () {
  it('should throw if incorrect arguments are provided', function (done) {
    var books = resource('books');
    books.add.bind(books, {'foo': 'bar'}).should.not.throw('Data should be an object, or an array of Objects');
    books.add.bind(books, [{'foo': 'bar'}, {'baz': 12}]).should.not.throw('Data should be an object, or an array of Objects');
    books.add.bind(books, 1234).should.throw('Data should be an object, or an array of Objects');
    done();
  });

  it('should save data to the store', function (done) {
    var books = resource('books');
    books.add({'foo': 'bar'});
    books.store.should.eql([{'foo': 'bar', 'id': 0}]);

    books.add([{'baz': 'boz'}, {'bir': 'bar'}]);
    books.store.should.eql([{'foo': 'bar', 'id': 0}, {'baz': 'boz', 'id': 1}, {'bir': 'bar', 'id': 2}]);
    done();
  });

  it('should throw if targeting existing keys', function (done) {
    var books = resource('books');
    books.add({'foo': 'bar'});
    books.add.bind(books, ({'foo': 'baz'})).should.throw('Data contains a duplicate key, try \'#.update()\' instead');
    done();
  });
});