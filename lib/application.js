/**
 * Module dependencies
 */

var debug = require('debug')('dad:application');
var Emitter = require('events').EventEmitter;
var delegate = require('delegates');
var assert = require('assert');

var transaction = require('./transaction');

/**
 * Store prototype
 */

var store = Store.prototype;

/**
 * Expose 'Store'.
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
  this.cidCount = 0;
  this.store = {};
  this.model = {};
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
 * Delegates
 */

store.add = transaction.add;
store.get = transaction.get;