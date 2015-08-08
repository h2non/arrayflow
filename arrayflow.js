(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ArrayFlow = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ArrayFlow = exports
var ArrayProto = Array.prototype

var iterators = {
  forEach: forEach,
  filter: filter,
  map: map,
  reduce: reduce
}

var nativeMethod = {
  forEach: ArrayProto.forEach,
  filter: ArrayProto.filter,
  map: ArrayProto.map,
  reduce: ArrayProto.reduce
}

/**
 * Expose the API
 */

ArrayFlow.forEach = forEach
ArrayFlow.filter = filter
ArrayFlow.map = map
ArrayFlow.reduce = reduce

ArrayFlow.infect = function () {
  Object.keys(iterators).forEach(function (name) {
    ArrayProto[name] = iterators[name]
  })
}

ArrayFlow.prune = function () {
  Object.keys(nativeMethod).forEach(function (name) {
    ArrayProto[name] = nativeMethod[name]
  })
}

ArrayFlow.wrap = function (arr) {
  var proto = Object.getPrototypeOf(arr)
  var safeProto = Object.create(null)

  for (var key in proto) {
    safeProto[key] = proto[key]
  }

  Object.keys(iterators).forEach(function (name) {
    safeProto[name] = iterators[name]
  })

  return arr
}

ArrayFlow.proxy = function (arr, method) {
  return iterators[method].bind(arr)
}

/**
 * Iterators implementation
 */

function forEach(iterator) {
  iteratorProxy(this, 'forEach', iterator, iterator)
  return this
}

function map(iterator) {
  var buf = []

  function task(val, i, arr, stop) {
    buf.push(iterator(val, i, arr, stop))
  }

  var result = iteratorProxy(this, 'map', task, iterator)
  return result !== undefined ? result : buf
}

function filter(iterator) {
  var buf = []

  function task(val, i, arr, stop) {
    if (iterator(val, i, arr, stop)) {
      buf.push(val)
    }
  }

  var result = iteratorProxy(this, 'filter', task, iterator)
  return result !== undefined ? result : buf
}

function reduce(iterator, previous) {
  if (iterator.length < 5) {
    return nativeMethod.reduce.call(this, iterator, previous)
  }

  var stopped = false
  function stop() {
    stopped = true
  }

  var arr = this
  for (var i = 0, l = arr.length; i < l; i += 1) {
    if (stopped === true) break
    previous = iterator(previous, arr[i], i, arr, stop)
  }

  return previous
}

function iteratorProxy(arr, method, task, iterator) {
  if (iterator.length < 4) {
    return nativeMethod[method].call(arr, iterator)
  }

  var stopped = false
  function stop() {
    stopped = true
  }

  for (var i = 0, l = arr.length; i < l; i += 1) {
    if (stopped === true) break
    task(arr[i], i, arr, stop)
  }
}

},{}]},{},[1])(1)
});
