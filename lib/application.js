/**
 * Module dependencies
 */

var debug = require('debug')('dad:application');
var Emitter = require('events').EventEmitter;
var flatten = require('flatten-array');
var assert = require('assert');

/**
 * Resource prototype
 */

var resource = Resource.prototype;

/**
 * Expose Resource
 */

exports = module.exports = Resource;

/**
 * Initialize a new Resource
 *
 * @api public
 */

function Resource () {
  if (!(this instanceof Resource)) return new Resource;
  this.store = [];
  this.model = {};
  this.syncOrder = ['http'];
  this.idCount = 0;
};

/**
 * Add attribute to model
 *
 *  var books = resource('books');
 *
 *  books
 *    .attr('name')
 *    .attr('age')
 *
 * @params {String} attribute
 * @params {Object[]} meta
 * @api public
 */

resource.attr = function(attribute, meta) {
  if ('string' != typeof attribute) throw new Error('Attribute should be a string');
  if ('object' != typeof meta && 'undefined' != typeof meta) throw new Error('Meta should be an object');

  // add / update attribute in 'model'
  this.model[attribute] = meta || {};
  return this;
};

/**
 * Add data to store
 * https://developers.soundcloud.com/blog/building-the-next-soundcloud/
 *
 *  var books = resource('books')
 *
 *  books
 *    .add({'name': 'Tobi', 'age': 22})
 *
 * @params {Object | Object[]} data
 * @api public
 */

resource.add = function(data) {
  if('object' != typeof data && '[object Array]' != Object.prototype.toString.call(data)) {
    throw new Error('Data should be an object, or an array of Objects');
  }
  
  // throw if key already exists
  '[object Array]' == Object.prototype.toString.call(data)
    ? data.forEach(function(element) { 
      if(!element.id) element.id = this.idCounter()
    }.bind(this)) 
    : this.store.some(function(element) {
      return element == data
    });

  //throw new Error('Data contains a duplicate key, try \'#.update()\' instead');

  // add 'id' property to data
  '[object Array]' == Object.prototype.toString.call(data) 
    ? data.forEach(function(element) { 
      if(!element.id) element.id = this.idCounter()
    }) 
    : data.id = this.idCounter();

  this.store.push(data);

  // flatten array
  this.store = flatten(this.store);
  
  return this;
};

/**
 * Update the id counter
 *
 * @return {Number}
 * @api private
 */

resource.idCounter = function() {
  var tmp = this.idCount;
  this.idCount++;
  return tmp;
}