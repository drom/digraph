# Digraph.js

[![Build Status](https://travis-ci.org/drom/digraph.png?branch=master)](https://travis-ci.org/drom/digraph)

Digraph module provides several functions for working with directed graphs (digraphs) in JavaScript. It can be used inside browser or as [node.js](http://nodejs.org) module.

## Example

```js
var g = digraph.add ({ edge: ['a b','b c'] });
// will create a directed graph  a -> b -> c
```
