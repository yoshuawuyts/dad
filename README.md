# Dad
[![NPM version][npm-image]][npm-url] [![build status][travis-image]][travis-url] [![Test coverage][coveralls-image]][coveralls-url]

Composable data stores for node.js and the browser. Dad's small ~300 SLOC codebase implements only methods that are common in most datastores. This includes models, validation and persistance.

No assumptions about your backend are made. Through adapters you can synchronize your data with any backend. Official adapters exist for HAL, REST and LocalStorage.

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
    pages: {type: 'number}
  });

// transactions

books.add({title: 'Ferrets', author: 'Tobi', pages: 12});
books.update({cid: 0, title: 'Lizards', author: 'Tobi', pages: 12});
````
## API
#### dad()
Create a named store.
````js
var store = require('dad');
var books = store('books');
var chapters = store('chapters');
````

#### .schema()
Define the schema for the store.
````js
books
  .schema({
    title: {type: 'string', required: true},
    author: {type: 'string', required: true},
    pages: {type: 'number}
  });
````

#### .baseUrl()
Define the base url for store server persistance.
````js
books.baseUrl('api.mysite.com/books');
````

#### .validate()
Validate a value against a property on the model.
```js
books.validate('name', 'Tobi');
```

#### .allAccountedFor()
Check if an object accounts for all properties demanded by the model.
```js
books.allAccountedFor({foo: 'bar', baz: 'bin'});
```

### Transactions
#### .add()
Save a record or an array of records to the store. Records get a `{Number} cid` 
assigned automatically. Emits an `add` event when completed.
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

#### .get()
Get a record from the store at `cid`.
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

#### .update()
Update a record at `cid`. Emits an `update` event when completed.
````js
chapters.update()
````

#### .remove()
Remove a record from the store at `cid`. Emits a `remove` event when completed.
````js
chapters.remove(2);
````

### Persistance
#### .push()
Persist the record changes to the backend. Can be provided with optional HTTP headers. Emits a `push` event when completed, else it emits an `error` event.
````js
books.push();

books.push({
  API_KEY: 'mysecretkey',
  ANOTHER_HEADER: 'some value'
});
````

#### .fetch() [wip]
Fetch records from the server over HTTP. Can be provided with optional HTTP
headers. Emits a `fetch` event when completed, else it emits an `error` event.
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

[npm-image]: https://img.shields.io/npm/v/dad.svg?style=flat
[npm-url]: https://npmjs.org/package/dad
[travis-image]: https://img.shields.io/travis/yoshuawuyts/dad.svg?style=flat
[travis-url]: https://travis-ci.org/yoshuawuyts/dad
[coveralls-image]: https://img.shields.io/coveralls/yoshuawuyts/dad.svg?style=flat
[coveralls-url]: https://coveralls.io/r/yoshuawuyts/dad?branch=master
