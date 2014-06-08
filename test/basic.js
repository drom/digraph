var assert  = require("assert");
var digraph = require('../digraph.js');

describe ('digraph', function () {
  var g1;

  beforeEach (function () {
    g1 = digraph();
    g1.random();
  });

  describe ('counts', function () {
    it ('should have 4 edges', function () {
      assert.equal(4, g1.vertices().length);
    });
    it ('should have 4 vertices', function () {
      assert.equal(4, g1.vertices().length);
    });
  });

});
