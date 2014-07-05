/*eslint no-unused-expressions: 0*/

/**
 * Module dependencies
 */

var should = require('should');
var store = require ('../..');

/**
 * Test
 */

describe('.hasMany()', function() {
  it('should catch errors', function() {
    var books = store('books');
    var chapters = store('chapters');

    books.hasMany.bind(books, 'notAStore')
      .should.throw()
    books.hasMany.bind(books, chapters)
      .should.not.throw();
    books.hasMany.bind(books, chapters, {required: true})
      .should.not.throw();
  });

  it('should link to other stores', function() {
    var books = store('books');
    var chapters = store('chapters');

    books
      .attr('author')
      .attr('price')
      .hasMany(chapters)

    chapters
      .attr('name')
      .attr('pages')

    // make sure the model is correctly set
    books.model.should.eql({
      //author: 
    })

    books
      .add({
        author: 'Tobi',
        price: 12.50,
        chapters: {
          name: 'How-to ferret',
          pages: 27
        }
      })
  });

  it('should save data in other stores', function() {
    var books = store('books');
    var chapters = store('chapters');

    // make sure the data is properly stored in both stores
    // make sure data is retrievable by calling one store
  });
});