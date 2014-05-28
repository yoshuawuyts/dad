/**
 * Module dependencies
 */

var debug = require('debug')('dad:application');
var Emitter = require('events').EventEmitter;
// var flatten = require('flatten-array');
var assert = require('assert');

/**
 * Store prototype
 */

var store = Store.prototype;

/**
 * Expose Store
 */

exports = module.exports = Store;

/**
 * Initialize a new Store
 *
 * @api public
 */

function Store (name) {
  if (!(this instanceof Store)) return new Store(name);
  this.name = name || '';
  this.store = [];
  this.model = {};
  this.cidCount = 0;
};

/**
 * Add attribute to model
 *
 *  var bookStore = store('books');
 *
 *  bookStore
 *    .attr('name')
 *    .attr('age')
 *
 * @params {String} attribute
 * @params {Object[]} meta
 * @api public
 */

store.attr = function(attribute, meta) {
  if ('string' != typeof attribute) throw new Error(
    'store.attr: Attribute should be a string',
    attribute
  );
  if ('object' != typeof meta && 'undefined' != typeof meta) throw new Error(
    'store.attr: Meta should be an object', 
    attribute
  );

  // add / update attribute in 'model'
  this.model[attribute] = meta || {};
  return this;
};

/**
 * Add record to store
 * https://developers.soundcloud.com/blog/building-the-next-soundcloud/
 *
 *  var bookStore = store('books')
 *
 *  bookStore
 *    .add({'name': 'Tobi', 'age': 22})
 *
 * @params {Object | Object[]} record
 * @api public
 */

store.add = function(record) {

  if ('object' != typeof record && '[object Array]' != Object.prototype.toString.call(record)) {
    throw new Error('Store.add: argument should be an object, or an array of Objects');
  }
    
  // update store if record is not an array
  if ('[object Array]' != Object.prototype.toString.call(record)) {
    if (this.store[record.cid] != undefined) throw new Error('store.add: record already exists, use store.update instead with ', record);    
    if (!record.cid) {
      record.cid = this.cidCount;
      this.cidCount++;
    }
    this.store.push(record);
    return this;
  }

  record.forEach(function(recordZero) {
    if (!recordZero.cid) {
      recordZero.cid = this.cidCount;
      this.cidCount++;
    }
    this.store.push(recordZero);
  }.bind(this));

  return this;
};