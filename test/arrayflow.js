var expect = require('chai').expect
var arrayflow = require('..')

suite('api', function () {
  var nativeMap = Array.prototype.map

  test('infect()', function () {
    arrayflow.infect()
    expect(Array.prototype.map).to.not.be.equal(nativeMap)
  })

  test('prune()', function () {
    arrayflow.prune()
    expect(Array.prototype.map).to.be.equal(nativeMap)
  })

  test('wrap()', function () {
    var arr = [1,2,3,4]
    var farr = arrayflow.wrap(arr)
    expect(farr).to.have.length(4)
    expect(Array.isArray(farr)).to.be.true
    expect(farr).to.be.instanceof(Array)
  })
})

suite('forEach', function () {
  test('stop', function () {
    var times = 0
    var arr = [1,2,3,4]
    var forEach = arrayflow.proxy(arr, 'forEach')

    forEach(function (value, index, arr, stop) {
      times += 1
      expect(index).to.be.equal(times - 1)
      expect(value).to.be.equal(times)
      if (times === 2) stop()
    })

    expect(times).to.be.equal(2)
  })

  test('native', function () {
    var times = 0
    var arr = [1,2,3,4]
    var forEach = arrayflow.proxy(arr, 'forEach')

    forEach(function (value, index) {
      times += 1
      expect(index).to.be.equal(times - 1)
      expect(value).to.be.equal(times)
    })

    expect(times).to.be.equal(arr.length)
  })
})

suite('map', function () {
  test('stop', function () {
    var times = 0
    var arr = [1,2,3,4]
    var map = arrayflow.proxy(arr, 'map')

    var output = map(function (value, index, arr, stop) {
      times += 1
      expect(index).to.be.equal(times - 1)
      expect(value).to.be.equal(times)
      if (times === 2) stop()
      return value * 2
    })

    expect(times).to.be.equal(2)
    expect(output).to.be.deep.equal([2,4])
  })

  test('native', function () {
    var times = 0
    var arr = [1,2,3,4]
    var map = arrayflow.proxy(arr, 'map')

    var output = map(function (value, index) {
      times += 1
      expect(index).to.be.equal(times - 1)
      expect(value).to.be.equal(times)
      return value * 2
    })

    expect(times).to.be.equal(arr.length)
    expect(output).to.be.deep.equal([2,4,6,8])
  })
})

suite('filter', function () {
  test('stop', function () {
    var times = 0
    var arr = [1,2,3,4]
    var filter = arrayflow.proxy(arr, 'filter')

    var output = filter(function (value, index, arr, stop) {
      times += 1
      expect(index).to.be.equal(times - 1)
      expect(value).to.be.equal(times)
      if (times === 2) stop()
      return value < 4
    })

    expect(times).to.be.equal(2)
    expect(output).to.be.deep.equal([1,2])
  })

  test('native', function () {
    var times = 0
    var arr = [1,2,3,4]
    var filter = arrayflow.proxy(arr, 'filter')

    var output = filter(function (value, index) {
      times += 1
      expect(index).to.be.equal(times - 1)
      expect(value).to.be.equal(times)
      return value < 4
    })

    expect(times).to.be.equal(arr.length)
    expect(output).to.be.deep.equal([1,2,3])
  })
})

suite('reduce', function () {
  test('stop', function () {
    var times = 0
    var arr = [1,2,3,4]
    var reduce = arrayflow.proxy(arr, 'reduce')

    var output = reduce(function (previous, value, index, arr, stop) {
      times += 1
      expect(index).to.be.equal(times - 1)
      expect(value).to.be.equal(times)
      expect(arr).to.be.an('array')
      if (times === 2) stop()
      return previous + value
    }, 0)

    expect(times).to.be.equal(2)
    expect(output).to.be.equal(3)
  })

  test('native', function () {
    var times = 0
    var arr = [1,2,3,4]
    var reduce = arrayflow.proxy(arr, 'reduce')

    var output = reduce(function (previous, value, index, arr) {
      times += 1
      expect(index).to.be.equal(times - 1)
      expect(value).to.be.equal(times)
      expect(arr).to.be.an('array')
      return previous + value
    }, 0)

    expect(times).to.be.equal(4)
    expect(output).to.be.equal(10)
  })
})

