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
  this.template = {};
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
 * @api public
 */

resource.attr = function(attribute) {
  if (typeof attribute != 'String') console.error('Attribute should be a string');
  this.template[attribute] = attribute;
  return this;
};