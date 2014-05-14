/**
 * Module dependencies
 */

var debug = require('debug')('dad:application');
var Emitter = require('events').EventEmitter;
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
  this.sync = ['http'];
  this.url = '';
};

/**
 * Add attribute to resource
 *
 *  resource('books')
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
  this.model[attribute] = meta || {};
  return this;
};