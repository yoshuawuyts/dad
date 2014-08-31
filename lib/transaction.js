/**
 * Module dependencies
 */

var debug = require('debug')('dad:transaction');
var assert = require('assert');

/**
 * Get a record from the store at 'cid'.
 *
 * @param {Number} cid
 * @return {Object}
 * @api public
 */

exports.get = function() {
	return this._store;
};

/**
 * Save a record or an array of records
 * to the store and sync them through
 * _push() after that.
 *
 * Emits a 'change' event.
 *
 * @params {Object | Object[]} record
 * @api public
 */

exports.add = function(record, cb) {

  // Define a bunch of variables we'll use later on.

  var recordError = 'Record should be an object or an array of objects';
  var overrideError = 'Store.add cannot overwrite records';
  var cbError = 'Cb should be a function';
  var objType = Object.prototype.toString.call(record);

  // Check that we're getting the correct input type.

  assert('object' == typeof record || '[object Array]' == objType, recordError);
  assert('function' == typeof cb || cb == undefined, cbError);

  // Add records to the store.

  if ('[object Array]' != objType) this._store.push(record);
  else record.forEach(function(entry) {
    this._store.push(entry);
  }.bind(this));

  // Emit events and sync with the adapters.

  debug('Added records to \'' + this._name + '\'', record);
  this.emit('change', record);
  this._push('add', record);
};

/**
 * Update a record.
 *
 * @param {Object} record
 * @api public
 */

exports.update = function(record) {
  var cidError = 'The cid \'' + record.cid + '\' could not be found';
  assert(null != record.cid, 'Provide an object with a cid as an argument');
  assert(null != this._store[record.cid], cidError);
  debug('Updated a record in \'' + this._name + '\'', record);

  this._store[record.cid] = record;
  this._push('update', record);
  this.emit('change', record);
}

/**
 * Remove a record at 'cid'.
 *
 * @param {Number} cid
 * @api public
 */

exports.remove = function(cid) {
  assert('number' == typeof cid, 'Provide a cid as an argument');
  assert(undefined != this._store[cid], 'The cid \'' + cid + '\' could not be found');
  debug('Removed a record from \'' + this._name + '\'', this._store[cid]);

  var transaction = {
    action: 'remove',
    data: this._store[cid]
  };
  this._transactions.push(transaction);
  delete this._store[cid];
  this.emit('change', cid);
}
