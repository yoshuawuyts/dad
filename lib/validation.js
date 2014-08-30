/**
 * Module dependencies.
 */

var validate = require('customs');
var assert = require('assert');

/**
 * Validate an object against
 * the model. If a property has not
 * been set (e.g. undefined), it
 * will be seen as undefined.
 *
 * @param {Object} record
 * @api public
 */

module.exports.validate = function(record) {

  // Check if the input is correct.

  assert('object' == typeof record, 'Record should be an object');

  // Create a new object to hold our return value.

  var result = {};

  // Go over all the properties on our model
  // and check they match the properties
  // of our record.

  Object.keys(this._schema).forEach(function(key) {

    // Create variables we can re-use
    // throughout our function.

    var modelProp = this._schema[key];
    var recordProp = record[key];

    // Assert our values are what we think
    // they are.

    assert(recordProp, 'Property should exist on the record');
    assert(modelProp, 'Property should exist on the model');

    // If a property on our model doesn't
    // demand a type, check if the value
    // exists to determine if it's valid
    // or not.

    if (!modelProp.type) {
      return result[key] = recordProp == undefined ? undefined : true;
    }

    // Now that we've established our property
    // does exist on the model, check if the
    // value is undefined.

    if (undefined === typeof recordProp) return result[key] = undefined;

    // Since the value of our property isn't
    // undefined, check if it's the same as
    // defined on the model.

    if (modelProp.type != typeof recordProp) return result[key] = false;
    result[key] = true;

  }.bind(this));

  // Broadcast our results
  // to the people.

  this.emit('validated', result);
}

/**
 * Check if all required properties from
 * the model are present in the record.
 *
 * @param {Object} record
 * @api public
 */

module.exports.allAccountedFor = function(record) {

  // Check if the input is correct.

  assert('object' == typeof record, 'Record should be an object');

  // Go over every property on the model
  // and check if the value is present
  // in the record we just submitted.

  var value = Object.keys(this._schema).every(function(key) {

    // Create variables we can re-use
    // throughout our function.

    var modelProp = this._schema[key];
    var recordProp = record[key];

    // Check if our model demands the
    // value to be present.

    if (!modelProp) return true;
    if (!modelProp.required) return true;

    // Apparently our model demands
    // the record to be present. So let's
    // check if the value is actually
    // present.

    if (recordProp) return true;
    return false;

  }.bind(this));

  // Broadcast our results
  // to the people.

  this.emit('allAccountedFor', value);
};
