# arrayflow

[ECMAScript 5.1](https://es5.github.io/#x15.4.1) native `Array.prototype` iterators implemention with control-flow capatibility. Same functional fun, same imperative control flow.

Behavior are strictly maintained with the native implementation.

**Rational note**: I thought about this actually a long time ago, and was suprised that there nothing already outside (or maybe it's really hard to find), so I've decided to do this crazy idea by my own.

## Iterators

- **forEach**
- **map**
- **filter**
- **reduce**

## Example

```js
var ArrayFlow = require('arrayflow')

var nativeArr = [1,2,3,4,5,6,7,8]
var awesomeArr = ArrayFlow.wrap(nativeArr)

awesomeArr
  .filter(function (value, key, _, stop) {
    return value < 6
  })
  .forEach(function (value, key, _, stop) {
    console.log('Read number:', value)
    if (number > 3) {
      stop()
      console.log('Oh, stop iteration...')
    }
  })
```

Alternative, if you are evil, you `infect` the Array.prototype to enable control flow capabilities to any `Array` object:

```js
ArrayFlow.infect() // yeah, I'm evil!

var a = [1,2,3,4]

// Now using a ArrayFlow iterators
a.forEach(function (value, key, arr, stop) {
  // mad science here ...
  // ... but now stops when you want!
})
```

## Installation

Via npm:
```bash
npm install arrayflow
```

Via bower:
```bash
bower install arrayflow
```

Loading the script via CDN:
```bash
<script src="//cdn.rawgit.com/h2non/arrayflow/master/arrayflow.js"></script>
```

## API

Create a new ArrayFlow based array.
Inherits from Array, so you're actually using a vanilla Array just with some methods overwritten.

#### ArrayFlow.forEach(iterator)

Runs a callback for each element in the array.

#### ArrayFlow.map(iterator)

Map elements in an array.

#### ArrayFlow.filter(iterator)

Filter elements in array.

#### ArrayFlow.reduce(iterator)

Reduce an array.

#### ArrayFlow.wrap(array)

Wrap a native `Array` instance with ArrayFlow iterations.

#### ArrayFlow.infect(array)

Self-described, but anyway, this method does evil things mutating the native `Array.prototype` with the ArrayFlow iterators, therefore you can use control-flow features in any array initialized, for instance, with literator notation = `[]`

```js
ArrayFlow.infect()

var a = [1,2,3,4]

// Now using a ArrayFlow iterators
a.forEach(function (value, key, arr, stop) {
  // mad science ...
})
```

#### ArrayFlow#proxy(arr, methodName) `=>` function(iterator)

Get an ArrayFlow method and returns its iterator.

###

## License

MIT - Tomas Aparicio
