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

describe('.validate()', function () {
  it('should catch errors', function () {
    books._model = {foo: 'bar'};

    books.validate.bind(books, 123)
      .should.throw('Record should be an object');

    books.validate.bind(books, {})
      .should.not.throw('Record should be an object');
  });

  it('should validate targets', function (done) {
    var myObj = {
      foo: 1337,
      bar: {}
    };
    books._model = {
      foo: {type: 'number'},
      bar: {type: 'string'}
    };

    books.on('validated', function(msg) {
      msg.should.eql({
        foo: true,
        bar: false
      });
      done();
    });

    books.validate(myObj);
  });
});
