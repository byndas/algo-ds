/*
HEAP SORT

*** Description

Heap sort has two parts:
  
  1) Build a heap out from input array data
  2) Build a sorted array by iteratively removing largest element from
     heap & adding it to your sorted array

*** Exercise

Write heap sort using the given Heap constructor

*** Extra Credit

Write heap sort without using the Heap constructor.
  Do everything in place.
    (hints --> https://en.wikipedia.org/wiki/Heapsort#Algorithm)

Example:
Note that the array is split in two portions -
     
     heap | sorted
[ 7 2 5 1 | 8 9 10]

swap first value (max) with last heap element
[ 1 2 5 7 | 8 9 10]

heap size decreases while sorted size grows
[ 1 2 5 | 7 8 9 10]

heap re-heapifies so that first value = new max
[ 5 1 2 | 7 8 9 10]

   heap | sorted --> repeat process...

*/

var Heap = function() {
  this.storage = [];
};

Heap.prototype.insert = function(value) {
  // Push to storage array
  this.storage.push(value);

  var that = this;

  // Recursive function to handle swaps, input index
  var reheapify = function(index) {

    // Get parent index
    var parentInd = Math.ceil(index/2-1);
    // Base Case : value < parent or parent is null
    if (parentInd < 0 || that.storage[index] <= that.storage[parentInd]) {
      return 'value added to index '+index;
    }
    // Recursive Case: swaps with parent & makes recursive call
    var temp = that.storage[index];
    that.storage[index] = that.storage[parentInd];
    that.storage[parentInd] = temp;

    return reheapify(parentInd);
  };
  return reheapify(that.storage.length-1);
};

// Heap removes max method from prototype
// Removes max value from heap, reorders heap, returns max value
Heap.prototype.removeMax = function() {
  if (this.storage.length === 0) { // if heap is empty, returns null
    return null;
  } else if (this.storage.length === 1) {
    // If one element in heap, removes & returns that element
    var removed = this.storage.pop();
    return removed;
  }
////////////////////////////////////////////////////////////////////
  // Handle all other cases where heap has more than one node
  // Preserve the max value in order to return it
  var maxValue = this.storage[0];
  // Replace the root node with the last node of the heap 
  // and remove the last node
  this.storage[0] = this.storage.pop();

  // Preserve context for inner recursive helper function
  var that = this;

  // Recursive function to restore the heap property of the heap
  var reheapify = function(index) {
    // Set index of max value to current node's index
    var maxIndex = index;

    // Check first child node's value against current node
    if ( (2*index + 1 < that.storage.length) && 
         (that.storage[2*index + 1] > that.storage[index]) ) {
      // If greater, set max value's index to first child node's index
      maxIndex = 2*index + 1;
    }
    // Check second child node's value against current max node
    if ( (2*index + 2 < that.storage.length) && 
         (that.storage[2*index + 2] > that.storage[maxIndex]) ) {
      // If greater then set index of max value to second child node's index
      maxIndex = 2*index + 2;
    }
    // If max value index is not equal to the index of the current node
    // Then swap the nodes and reheapify at the new index of the current node
    if (maxIndex !== index) {
      // Swap node values 
      // (a nifty way to do so "in place" using the XOR bitwise operator)
      that.storage[index] = that.storage[index] ^ that.storage[maxIndex];
      that.storage[maxIndex] = that.storage[index] ^ that.storage[maxIndex];
      that.storage[index] = that.storage[index] ^ that.storage[maxIndex];

      // Reheapify at new index of current node
      reheapify(maxIndex);
    }
  };

  // Recursively move the swapped node down the heap until it's greater than
  // both of its children
  reheapify(0);

  // Return the removed max value from the heap
  return maxValue;
};
