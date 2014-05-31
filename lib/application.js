/**
 * Module dependencies
 */

var debug = require('debug')('dad:application');
var Emitter = require('events').EventEmitter;
var assert = require('assert');

var transaction = require('./transaction');
var context = require('./context');
console.log(context.prototype);

/**
 * Store prototype
 */

var store = Store.prototype;

/**
 * Expose Store
 */

exports = module.exports = Store;

/**
 * Create a named store.
 *
 * @param {String} name
 * @param {Object} opts
 * @return {Store}
 * @api public
 */

function Store(name, opts) {
  if (!(this instanceof Store)) return new Store(name, opts);
  this.name = name || '';
  this.opts = opts || {};
  this.store = {};
  this.model = {};
  this.cidCount = 0;
  this.context = Object.create(context);
  this.transaction = Object.create(transaction);
  return this;
};

/**
 * Define an attribute on the model.
 *
 * @params {String} attribute
 * @params {Object[]} meta
 * @return {Store}
 * @api public
 */

store.attr = function(attribute, meta) {
  assert('string' == typeof attribute, 'store.attr: Attribute should be a string');
  assert('object' == typeof meta || 'undefined' == typeof meta, 'store.attr: Meta should be an object');

  // add / update attribute in 'model'
  this.model[attribute] = meta || {};
  return this;
};

/**
 * Save a record or an array of records to the store.
 *
 * TODO: implement reference counting as shown in: 
 * https://developers.soundcloud.com/blog/building-the-next-soundcloud/
 *
 * @params {Object | Object[]} record
 * @api public
 */

store.add = function(record) {

  assert('object' == typeof record || '[object Array]' == Object.prototype.toString.call(record), 
    'Store.add: argument should be an object, or an array of Objects'
  );
    
  // update store with a single record
  if ('[object Array]' != Object.prototype.toString.call(record)) {
    assert(this.store[record.cid] == undefined, 'store.add cannot overwrite records');

    // assign a cid if applicable
    record = record.cid ? record : assignCid.call(this, record);

    // save data to store
    this.store[record.cid] = record;

    return this;
  }

  // update store with an array of records
  record.forEach(function(recordZero) {
    assert(this.store[record.cid] == undefined, 'store.add cannot overwrite records');

    // assign a cid if applicable
    recordZero = recordZero.cid ? recordZero : assignCid.call(this, recordZero);

    // save data to store
    this.store[recordZero.cid] = recordZero;
  }.bind(this));

  return this;
};

/**
 * Get a record from the store at `cid`.
 *
 * @param {Number} cid
 * @return {Object}
 * @api public
 */

store.get = function() {

}

/**
 * Assign a `cid` to a record
 *
 * @param {Object} record
 * @return {Object}
 * @api private
 */

function assignCid(record) {
  record.cid = this.cidCount;
  this.cidCount++;
  return record;
};