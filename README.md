[![NPM version](https://img.shields.io/npm/v/digraph.svg)](https://www.npmjs.org/package/digraph)
[![Build Status](https://travis-ci.org/drom/digraph.svg?branch=master)](https://travis-ci.org/drom/digraph)
[![Build status](https://ci.appveyor.com/api/projects/status/c3yx0nrd8nuanbyh?svg=true)](https://ci.appveyor.com/project/drom/digraph)

# digraph

Digraph module provides several functions for working with
[directed graph](http://en.wikipedia.org/wiki/Directed_graph)s (digraphs)
in JavaScript.

## node.js
```js
var digraph = require('digraph');
var g = digraph();
```

## browser

Use browserify.

## API

```js
<Node> = g.node(<N>)
```

Adds new node object if needed.

```js
<Edge> = g.edge(<N>)(<N>)
```

Adds new edge and nodes if needed.

----

`N: undefined`

Constructs new noname node object.

`N: {String}`

Search for existing node object with this name.
Constructs new node object with the name if cant find existing node.

`N: {Object}`

Uses provided `Object` as node object descriptor.

----

### .has

### .edges

```js
[<Edge>] = g.edges.from(<Node>)
```

Return array of all outgoing edges.

```js
[<Edge>] = g.edges.to(<Node>)
```

Return array of all incoming edges.

```js
[<Edge>] = g.edges.at(<Node>)
```

### .get


```js
[<Node>] = g.get.nodes
```

Return array of nodes in no particular order.

```js
[<Edge>] = g.get.edges
```

Return array of edges in no particular order.
