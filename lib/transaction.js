/**
 * Module dependencies
 */

var debug = require('debug')('dad:transaction');
var assert = require('assert');

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

  if ('[object Array]' != objType) addRecord.call(this, record, overrideError);
  else record.forEach(function(entry) {
    addRecord.call(this, entry, overrideError);
  }.bind(this));

  // Emit events and sync with the adapters.

  debug('Added records to \'' + this._name + '\'', record);
  this.emit('change', record);
  this._push('add', record);
};

/**
 * Get a record from the store at 'cid'.
 *
 * @param {Number} cid
 * @return {Object}
 * @api public
 */

exports.get = function(cid) {
  assert('number' == typeof cid, 'Provide a number as an argument');
  assert(this._store[cid], 'Could not find object with cid: ' + cid);
  debug('Got a record from \'' + this._name + '\'', this._store[cid]);
	return this._store[cid];
};

/**
 * Update a record.
 *
 * @param {Object} record
 * @api public
 */

exports.update = function(record) {
  assert(null != record.cid, 'Provide an object with a cid as an argument');
  assert(null != this._store[record.cid], 'The cid \'' + record.cid + '\' could not be found');
  debug('Updated a record in \'' + this._name + '\'', record);

  var transaction = {
    action: 'update',
    data: record
  };
  this._transactions.push(transaction);
  this._store[record.cid] = record;
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

/**
 * Add a record to the store.
 *
 * @param {Any | Any[]} record
 * @api private
 */

function addRecord(record, errMsg) {
  assert(this._store[record.cid] == undefined, errMsg);
  record = assignCid.call(this, record);
  this._store[record.cid] = record;
}

/**
  * Assign a `cid` to a record
  *
  * @param {Object} record
  * @return {Object}
  * @api private
  */

function assignCid(record) {
  record.cid = this._cidCount;
  this._cidCount++;
  return record;
}
