# API


## Rtype

Using [Rtype](https://github.com/ericelliott/rtype) interface notation.

## Stamp

[Stamp specification](https://github.com/stampit-org/stamp-specification)

Create new `digraph` stamp: (composable factory function).

```js
var digraph = require('digraph/stamp');
var g = digraph();
```

A composable is any factory function or Plain Old JavaScript Object (POJO) with a stamp descriptor.

```js
compose(composable1, composable2)
```

```js
.props({})
.methods({})
```

## Fantasy Land

[Fantasy Land specification](https://github.com/fantasyland/fantasy-land)

Like [Parsimmon](https://github.com/jneen/parsimmon)

```js
var digraph = require('digraph/fantasy-land');
var g = digraph();
var n1 = g.node('n1');
var n2 = g.node();
var e12 = n1.to(n2);
```

## Static Land

[Static Land specification](https://github.com/rpominov/static-land)

```js
var digraph = require('digraph/static-land');
var node = digraph.node;
var edge = digraph.edge;
var n1 = node('n1');
var n2 = node('n2');
var e12 = edge(n1)(n2);
```

## Ramda

http://ramdajs.com/
