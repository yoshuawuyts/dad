/**
 * Module dependencies
 */

var debug = require('debug')('dad:persistance');
var parallel = require('foyer');
var assert = require('assert');

/**
 * Register a sync adapter.
 *
 *   store.adapter(Function);
 *
 * @param {Function} adapter
 * @return {Object}
 * @api public
 */

exports.adapter = function(adapter) {
  assert('function' == typeof adapter, 'Adapter should be a function');
  var self = this;
  this._adapters.push(adapter.bind(self));
  return this;
}

/**
 * Persist transactions to the adapters.
 * Emits a 'succes' or 'failure' event with an object attached.
 *
 *   store.push()
 *
 * @return {Object}
 * @api public
 */

exports.push = function() {
  debug('Pushing transactions: ' + this._transactions);
  parallel.call(this, this._adapters, callback.bind(this));
  function callback(err) {
    if (err.length) {
      this.emit('failure', err);
      return;
    }
    this.emit('success', this._transactions);
    this._transactions = [];
  }

  return this;
};

/**
 * Fetch records from the adapters.
 * Methods: Read
 *
 * @return {Object[]}
 * @api public
 */

exports.fetch = function() {

};
