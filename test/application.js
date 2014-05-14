/*eslint no-unused-expressions: 0*/
'use strict';

var should = require('should');
var resource = require ('..');

describe('Application', function () {
  it('should init blank objects', function (done) {
    var books = resource('books');
    books.store.should.be.ok;
    books.template.should.be.ok;
    books.url.should.equal('');
    done();
  });
  
  it('should be able to add data', function (done) {
    done();
  });
});