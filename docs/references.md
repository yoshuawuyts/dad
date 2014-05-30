# Keeping references
The [souncloud blog](https://developers.soundcloud.com/blog/building-the-next-soundcloud) 
makes a nice overview of how to efficiently create & track objects between views.

````js
var s1 = new Sound({id: 123}),
    s2 = new Sound({id: 123});

s1 === s2; // true, these are the exact same object.
````

````js
var store = {};

function Sound(attributes) {
  var id = attributes.id;

  // check if this model has already been created
  if (store[id]) {
    // if yes, return that
    return store[id];
  }
  // otherwise, store this instance
  store[id] = this;
}
````

Copy this to define one to many relationships:
````
https://github.com/emberjs/data
````