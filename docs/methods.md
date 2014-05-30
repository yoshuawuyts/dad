## Setup
#### dad()
Create a named store.
````js
var store = require('dad');
var books = store('books');
var chapters = store('chapters');
````

#### .attr()
Define an attribute on the model.
````js
books
  .attr('title', {type: 'string', required: true})
  .attr('author', {type: 'string', required: true})
  .attr(pages, {type: 'number'});
````

#### .hasMany()
Define a store as an attribute on the model.
````js
books.hasMany('chapters', chapters);
````

#### .baseUrl
Define the base url for store server methods.
````js
books.baseUrl('api.mysite.com/books');
````

#### .url
Define the url per method. Defaults to the following values:
- create -> POST   `store.baseUrl/`
- read   -> GET    `store.baseUrl/:id`
- update -> PATCH  `store.baseUrl/:id`
- delete -> DELETE `store.baseUrl/:id`

````js
books.url('create', 'buildResource');
// -> api.mysite.com/books/buildResource
````

## Transactions
#### .add()
Save a record or an array of records to the store. Records get a `cid` assigned automatically. Emits an `add` event when completed.
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
books.get(0);
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

#### .remove()
Remove a record from the store at `cid`. Emits a `remove` event when completed.
````js
chapters.remove(2);
````

## Persistance
#### .save()
Persist the record changes to the server through HTTP. Can be provided with optional HTTP headers. Emits a `save` event when completed, else it emits an `error` event
````js
books.save();

books.save({
  API_KEY: 'mysecretkey',
  ANOTHER_HEADER: 'some value'
});
````

#### .fetch()
Fetch records from the server through HTTP. Can be provided with optional HTTP headers. Emits a `fetch` event when completed, else it emits an `error` event.
````js
books.fetch();

books.fetch({
  API_KEY: 'mysecretkey',
  ANOTHER_HEADER: 'some value'
});
````