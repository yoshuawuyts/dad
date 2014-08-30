# Dad
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

Composable data stores for node.js and the browser. Dad's small ~300 SLOC
codebase implements only methods that are common in most datastores. This
includes models, validation and persistance.

No assumptions about your backend are made. Through adapters you can
synchronize your data with any backend. Official adapters are a WIP.

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
  .settings({baseUrl: 'api.mysite.com/books'})
  .schema({
    title: {type: 'string', required: true},
    author: {type: 'string', required: true},
    pages: {type: 'number'}
  });

// transactions
books.add({title: 'Ferrets', author: 'Tobi', pages: 12});
books.update({cid: 0, title: 'Lizards', author: 'Tobi', pages: 12});
````
#### Events
|__change__ |__sync__  |
|-----------|----------|
|`.add()`   |`.push()` |
|`.get()`   |`.fetch()`|
|`.update()`|          |

## API
#### dad(name)
Create a named store.
````js
var store = require('dad');
var books = store('books');
var chapters = store('chapters');
````

#### .schema(schema)
Define the schema for the store.
````js
books
  .schema({
    title: {type: 'string', required: true},
    author: {type: 'string', required: true},
    pages: {type: 'number'}
  });
````

#### .settings(opts)
Define settings to be used. Settings can be used to store synchronization
url's and auth tokens.
````js
books.settings({baseUrl: 'api.mysite.com/books'});
````

#### .validate(key, value)
Validate a value against a key in the schema.
```js
books.validate('name', 'Tobi');
```

#### .allAccountedFor(record)
Check if an object accounts for all properties demanded by the schema.
```js
books.allAccountedFor({foo: 'bar', baz: 'bin'});
```

### Transactions
#### .add(record)
Save a record or an array of records to the store.
````js
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

#### .get(cid)
Get a record from the store at cid.
````js
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

#### .update(record)
Update a record with a cid. Emits an update event when completed. If the record has no cid provided, an error
will be thrown.
````js
chapters.update({
  cid: 4,
  title: 'Fatherly jokes',
  author: 'Tobi',
  pages: 12,
  chapters: [0]
});
````

#### .remove(cid)
Remove a record from the store at cid.
````js
chapters.remove(2);
````

### Persistance
#### .push([config])
Persist the record changes to the backend. Can be provided with optional HTTP
headers. Emits a push event when completed, else it emits an error event.
````js
books.push();

books.push({
  API_KEY: 'mysecretkey',
  ANOTHER_HEADER: 'some value'
});
````

#### .fetch([configuration]) [wip]
Fetch records from the server over HTTP. Can be provided with optional HTTP
headers. Emits a fetch event when completed, else it emits an error event.
````js
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

[npm-image]: https://img.shields.io/npm/v/dad.svg?style=flat-square
[npm-url]: https://npmjs.org/package/dad
[travis-image]: https://img.shields.io/travis/yoshuawuyts/dad.svg?style=flat-square
[travis-url]: https://travis-ci.org/yoshuawuyts/dad
[coveralls-image]: https://img.shields.io/coveralls/yoshuawuyts/dad.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/yoshuawuyts/dad?branch=master
