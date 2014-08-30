/**
 * Module dependencies
 */

var debug = require('debug')('dad:application');
var Emitter = require('events').EventEmitter;
var objectJoin = require('object-join');
var assert = require('assert');

var transaction = require('./transaction');
var persistance = require('./persistance');
var validation = require('./validation');

/**
 * Expose 'Store'.
 */

exports = module.exports = Store;

/**
 * 'Store' prototype
 */

var store = Store.prototype;

/**
 * Create a new 'Store'.
 *
 * @param {String} name
 * @param {Object} opts
 * @return {Store}
 * @api public
 */

function Store(name, opts) {
  if (!(this instanceof Store)) return new Store(name, opts);
  this._name = name || '';
  this._opts = opts || {};
  this._transactions = [];
  this._adapters = [];
  this._cidCount = 0;
  this._store = {};
  this._model = {};
  return this;
};

/**
 * Inherit from `Emitter.prototype`.
 */

Store.prototype.__proto__ = Emitter.prototype;

/**
 *
 */

store.settings = function(opts) {
  assert('object' == typeof opts, 'Opts should be an object');
  this._opts = objectJoin(this._opts, opts);
}

/**
 * Define an attribute on the model.
 *
 * @params {String} attribute
 * @params {Object[]} meta
 * @return {Store}
 * @api public
 */

store.schema = function(schema) {
  assert('object' == typeof schema, 'Schema should be an object');

  this._model = objectJoin(this._model, schema);
  return this;
};

/**
 * Delegates
 */

store.update = transaction.update;
store.remove = transaction.remove;
store.add = transaction.add;
store.get = transaction.get;

store.baseUrl = persistance.baseUrl;
store.adapter = persistance.adapter;
store.fetch = persistance.fetch;
store.push = persistance.push;

store.allAccountedFor = validation.allAccountedFor;
store.validate = validation.validate;
