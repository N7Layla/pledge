'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js ES6-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:

function $Promise(executor){
  if(typeof executor !== 'function') throw new TypeError('$Promise takes an executor function argument.')
  // console.log(this._internalResolve)

  this.executor = executor(this._internalResolve.bind(this),this._internalReject.bind(this))
}

$Promise.prototype._state = 'pending'

$Promise.prototype._internalResolve = function(data){
  // console.log('here this is, ', this)
  if(this._state === 'pending'){
    this._state = 'fulfilled'
    this._value = data
  }
}
$Promise.prototype._internalReject = function(reason){
  if(this._state === 'pending'){
    this._state = 'rejected'
    this._value = reason
  }
}

$Promise.prototype._handlerGroups = []

$Promise.prototype.then = function(success, error){
  this._handlerGroups.push({successCb: success, errorCb: error})
  console.log(this._handlerGroups)
  // this._handlersGroups.push(this.executor)
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
