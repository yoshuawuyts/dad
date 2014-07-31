# Dad
[![NPM version][npm-image]][npm-url] [![build status][travis-image]][travis-url] [![Test coverage][coveralls-image]][coveralls-url]

Composable data stores for node.js and the browser. Dad's small ~300 SLOC codebase implements only methods that are common in most datastores. This includes models, validation and persistance.

No assumptions about your backend are made. Through adapters you can synchronize your data with any backend. Official adapters are a WIP.

## Installation
````bash
$ npm i --save dad
````

## Overview
````js
var store = require('dad');
var books = store('books');

// attributes
books
  .baseUrl('api.mysite.com/books')
  .schema({
    title: {type: 'string', required: true},
    author: {type: 'string', required: true},
    pages: {type: 'number'}
  });

// transactions
books.add({title: 'Ferrets', author: 'Tobi', pages: 12});
books.update({cid: 0, title: 'Lizards', author: 'Tobi', pages: 12});
````
## API
#### dad()
````js
// Create a named store. Takes a {String} name as an argument.

var store = require('dad');
var books = store('books');
var chapters = store('chapters');
````

#### .schema()
````js
// Define the schema for the store. Takes an {Object} schema as an argument.

books
  .schema({
    title: {type: 'string', required: true},
    author: {type: 'string', required: true},
    pages: {type: 'number'}
  });
````

#### .baseUrl()
````js
// Define the base url for store server persistance. Takes a {String} url as
// an argument.

books.baseUrl('api.mysite.com/books');
````

#### .validate()
```js
// Validate a value against a key in the schema. Takes a {String} key and a
// {String} value as arguments.

books.validate('name', 'Tobi');
```

#### .allAccountedFor()
```js
// Check if an object accounts for all properties demanded by the schema. Takes
// an {Object} record as an argument.

books.allAccountedFor({foo: 'bar', baz: 'bin'});
```

### Transactions
#### .add()
````js
// Save a record or an array of records to the store. Records get a {Number} cid
// assigned automatically. Emits an add event when completed. Takes an
// {Object} record or an array of records as an argument.

chapters.add([
  {name: 'chapter 1', pages: 2},
  {name: 'chapter 2', pages: 6},
  {name: 'chapter 3', pages: 4}
]);

books.add({
  title: 'Fatherly jokes',
  author: 'Tobi',
  pages: 12,
  chapters: [0]
});
````

#### .get()
````js
// Get a record from the store at cid. Takes a {Number} cid as an argument.

var fatherlyJokes = books.get(0);
// -> {
//      cid: 0,
//      title: 'Fatherly jokes',
//      author: 'Tobi',
//      pages: 12,
//      chapters: [{
//        cid: 0,
//        name: 'chapter 1',
//        pages: 2
//      }]
//    };
````

#### .update()
````js
// Update a record with a cid. Emits an update event when completed. Takes an
// {Object} record as an argument. If the record has no cid provided, an error
// will be thrown.

chapters.update({
  cid: 4,
  title: 'Fatherly jokes',
  author: 'Tobi',
  pages: 12,
  chapters: [0]
});
````

#### .remove()
````js
// Remove a record from the store at cid. Emits a remove event when completed.
// Takes a {Number} cid as an argument.

chapters.remove(2);
````

### Persistance
#### .push()
````js
// Persist the record changes to the backend. Can be provided with optional HTTP 
// headers. Emits a push event when completed, else it emits an error event.
// Takes an optional {Object} configuration as an argument.

books.push();

books.push({
  API_KEY: 'mysecretkey',
  ANOTHER_HEADER: 'some value'
});
````

#### .fetch() [wip]
````js
// Fetch records from the server over HTTP. Can be provided with optional HTTP
// headers. Emits a fetch event when completed, else it emits an error event.
// Takes an optional {Object} configuration as an argument.

books.fetch();

books.fetch({
  API_KEY: 'mysecretkey',
  ANOTHER_HEADER: 'some value'
});
````

## References
- [Issues](https://github.com/yoshuawuyts/dad/issues)
- [Pull Requests](https://github.com/yoshuawuyts/dad/pulls)

## License
[MIT](https://tldrlegal.com/license/mit-license) © [Yoshua Wuyts](yoshuawuyts.com)

[npm-image]: https://img.shields.io/npm/v/dad.svg?style=flat
[npm-url]: https://npmjs.org/package/dad
[travis-image]: https://img.shields.io/travis/yoshuawuyts/dad.svg?style=flat
[travis-url]: https://travis-ci.org/yoshuawuyts/dad
[coveralls-image]: https://img.shields.io/coveralls/yoshuawuyts/dad.svg?style=flat
[coveralls-url]: https://coveralls.io/r/yoshuawuyts/dad?branch=master
