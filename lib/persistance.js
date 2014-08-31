/**
 * Module dependencies
 */

var debug = require('debug')('dad:persistance');
var parallel = require('foyer');
var assert = require('assert');

/**
 * Persist transactions to the adapters.
 * Emits a 'succes' or 'failure' event with an object attached.
 *
 *   store._push()
 *
 * @return {Object}
 * @api public
 */

exports._push = function() {
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
