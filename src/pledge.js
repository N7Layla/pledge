'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js ES6-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:

function $Promise(executor){
  if (typeof executor !== 'function') throw new TypeError('$Promise takes an executor function argument.')
  // console.log(this._internalResolve)
  this._handlerGroups = []
  this._state = 'pending'
  executor(this._internalResolve.bind(this), this._internalReject.bind(this))
}


$Promise.prototype._internalResolve = function(data){
  // console.log('here this is, ', this)
  if (this._state === 'pending'){
    this._state = 'fulfilled'
    this._value = data
    this._callHandlers()
  }

}
$Promise.prototype._internalReject = function(reason){
  if (this._state === 'pending'){
    this._state = 'rejected'
    this._value = reason
    this._callHandlers()
  }
}

$Promise.prototype.then = function(successCb, errorCb){
  if (typeof successCb !== 'function') {
    successCb = undefined;
  }
  if (typeof errorCb !== 'function') {
    errorCb = undefined
  }
    this._handlerGroups.push({successCb, errorCb})
    this._callHandlers()
}

$Promise.prototype._callHandlers = function() {
  if (this._state === 'fulfilled') {
    this._handlerGroups.forEach(function(group) {
      group.successCb(this._value) }.bind(this));
      this._handlerGroups = [];
  }
  if (this._state === 'rejected') {
    this._handlerGroups.forEach(function(group) {
      group.errorCb(this._value) }.bind(this))
      this._handlerGroups = [];
  }
}



/*-------------------------------------------------------
The spec was designed to work with Test'Em, so we don't
actually use module.exports. But here it is for reference:

module.exports = $Promise;

So in a Node-based project we could write things like this:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
