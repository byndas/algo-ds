/*
HEAPS

Abstract data type

A max heap is a special binary tree satisfying two properties:

1. Shape property – All nodes of the same tree depth from the root node
    share the same level. Each max-heap level must fill with nodes for
    any nodes to appear on the next level & are added left to right.
    
2. Heap property – All max-heap nodes >= each of its children nodes.

Heaps usually occur in an array... 
Child nodes of parent position 'n' have positions 2n+1 and 2n+2.

View visualization here: 
https://presentpath.github.io/heap-visualizer/

*** Operations:

heap.insert(value)
=> adds value to heap with shape & heap properties & returns undefined


heap.removeMax()
=> removes max value from & reorders the heap, then returns max value
*/


var Heap = function() {
  this.storage = [];
};

Heap.prototype.insert = function(value) {
  // Pushes value to storage array
  this.storage.push(value);

  var that = this;

  // Recursive function handles any swaps with a given index
  var reheapify = function(index) {

    // Gets parent index
    var parentInd = Math.ceil(index/2-1);
    // Base Case : value < parent || parent is null
    if (parentInd < 0 || that.storage[index] <= that.storage[parentInd]) {
      return 'value added to index '+index;
    }
    // Recursive Case: swaps value with parent & makes recursive call
    var temp = that.storage[index];
    that.storage[index] = that.storage[parentInd];
    that.storage[parentInd] = temp;

    return reheapify(parentInd);
  };
  return reheapify(that.storage.length-1);
};

// Heap removes max method on prototype
// Removes max value from & reorders the heap, then returns max value
Heap.prototype.removeMax = function() {
  // Checks if heap currently empty
  if (this.storage.length === 0) {
    // Returns null if empty
    return null;
  } else if (this.storage.length === 1) {
    // If only one element in heap, 
    // removes lone element from storage array & returns it
    var removed = this.storage.pop();

    return removed;
  }

  // Handles all other cases where heap has > 1 node
  // Preserves max value to return it later
  var maxValue = this.storage[0];
  // Replaces heap's root node with its last node & removes last node
  this.storage[0] = this.storage.pop();

  // Preserves the context for inner recursive helper function
  var that = this;

  // Recursive function restores the heap property
  var reheapify = function(index) {
    // Sets index of max value to current node's index
    var maxIndex = index;

    // Checks first-child node's value against current node
    if ((2*index + 1 < that.storage.length) && (that.storage[2*index + 1] > that.storage[index])) {
      // If child > current, 
      // sets max value's index = first-child node's index
      maxIndex = 2*index + 1;
    }
    // Checks second-child node's value against current max node
    if ((2*index + 2 < that.storage.length) && (that.storage[2*index + 2] > that.storage[maxIndex])) {
      // If child > current max node,
      // sets max value's index = second-child node's index
      maxIndex = 2*index + 2;
    }
    // If max value's index !== current node's index,
    // swaps those nodes & reheapifies at the new current node's index
    if (maxIndex !== index) {
      // Swaps node values (an "in place" way via XOR bitwise operator)
      that.storage[index] = that.storage[index] ^ that.storage[maxIndex];
      that.storage[maxIndex] = that.storage[index] ^ that.storage[maxIndex];
      that.storage[index] = that.storage[index] ^ that.storage[maxIndex];

      // Reheapifies at the new current node's index
      reheapify(maxIndex);
    }
  };

  // Recursively moves swapped node down the heap until > both its children
  reheapify(0);

  // Returns the removed max value from the heap
  return maxValue;
};
