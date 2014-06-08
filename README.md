# digraph.js

Digraph module provides several functions for working with [directed graph](http://en.wikipedia.org/wiki/Directed_graph)s (digraphs) in JavaScript. It can be used inside browser or as [node.js](http://nodejs.org) module.

## browser

```html
<src>
```

## node.js
```js
var digraph = require ('./digraph');
g = digraph ();
```

## API

### ``g.add (obj1 [,obj2 [,obj3]]);``
Addition of graph elements (__vertex__, __edge__) and attributes.

#### examples:

Adding __digraph__ attributes:
```js
g.add ({key:val});
```
Adding __vertex__ ``'a'``:
```js
g.add ('a');
```
Adding __edge__ ``'a' -> 'b'``. Vertices ``'a'`` or ``'b'`` will be creteated if needed:
```js
g.add ('a', 'b');
```
Adding attributes to the __vertex__ ``'a'`` with __vertex__ creation if needed:
```js
g.add ('a', {key:val});
```
Adding attributes to the __edge__ ``'a' -> 'b'``:
```js
g.add ('a', 'b', {key:val});
```
Adding mix of __edges__, __vertices__, or attributes to the graph:
```js
g.add ([
    {key1:val1},
    'a',
    ['b', 'c'],
    ['d', {key2:val2}],
    ['e', 'f', {key3:val3}]
]);
```
### ``var v = g.vertices ();``
Returns array of __vertex__ names: ``['a', 'b', 'c']``

### ``var e = g.edges ();``
Returns array of __edge__s: ``[['a', 'b'], ['b', 'c']]``

[![Build Status](https://travis-ci.org/drom/digraph.svg?branch=master)](https://travis-ci.org/drom/digraph)
[![NPM version](https://img.shields.io/npm/v/digraph.svg)](https://www.npmjs.org/package/digraph)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
