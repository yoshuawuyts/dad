# Methods

### Overview
````
.attr()         // set model attribute
.syncOrder()    // set sync methods
.children()     // set nested model
.toJSON()       // get contents as JSON
.delete()       // delete content at id
.add()          // add data to collection
.sync()         // synchronize with server
.validate()     // validate contents
````

### Initialize
````js
var dad = require('dad');
var resource = dad();
````

### .attr(name, {meta: value})
````js
var books = resource('books')
  .attr('title', {type: 'string', required: true})
  .attr('author', {type: 'string', required: true})
  .attr('pages', {type: 'number'})
  .sync(['localStorage', 'webSockets'])
  .children(chapters)
  .url('/books')
````

### .sync([methods])
````js
var books = resource('books')
  .sync(['localStorage', 'webSockets']);
````

### .children(function())
````js
var chapters = resource('chapters');

books
  .children(chapters);
````

### .baseUrl('postfix', 'prefix')
````js
books
  .baseUrl('/books', 'api')
// -> 'api.mysite.com/books'
````

### .url()
````js
// get baseUrl
books
  .url()
// -> 'api.mysite.com/books'

// get url of a certain id
books
  .url({id: 5})
// -> 'api.mysite.com/books/5'

// get url of a certain id + method
books
  .url({id: 5})
  .url('edit')
// -> 'api.mysite.com/books/5/edit'
````

### .add({attr: value})
````js
books
  .add({title: 'Fatherly jokes', author: 'Yoshua Wuyts', pages: 12})
  .sync();
````

### .prune()
````js
books.prune();
// -> {id: []}
````