/*eslint no-unused-expressions: 0*/
'use strict';

var should = require('should');
var resource = require ('..');

describe('Application', function () {
  it('should init blank objects', function (done) {
    var books = resource('books');
    books.store.should.be.empty;
    books.model.should.be.empty;
    books.url.should.be.empty;
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
    books.attr('herp');
    books.model.should.have.keys('herp')
    done();
  });

  it('should save \'meta\' arguments', function (done) {
    var books = resource('books');
    books.attr('herp', {type: 'book'});
    books.model.should.containDeep({'herp': {type: 'book'}});
    done();
  });
});