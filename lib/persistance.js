/**
 * Module dependencies
 */

var assert = require('assert');

/**
 * Set the base url
 *
 * @param {String} url
 * @return {Object}
 * @api public
 */

exports.baseUrl = function(url) {
  assert('string' == typeof url, 'url should be a string');
  this.url = url;
  return this;
};

/**
 * Persist the record changes to the adapters.
 *
 * @api public
 */

exports.save = function() {
  
};

/**
 * Fetch records from the adapters.
 *
 * @return {Object[]}
 * @api public
 */

exports.fetch = function() {
  
};