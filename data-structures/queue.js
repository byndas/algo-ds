/*

QUEUE

Abstract data type ---> set of elements using enqueue and dequeue
Elements exit in the reverse order of their entry (first in, first out)

Use an object -- not an array with push/shift

*** Operations:

myQueue.enqueue(value)
=> returns queue's count & adds given value to collection

myQueue.dequeue()
=> removes & returns oldest element in collection

myQueue.peek()
=> returns oldest element in collection (without removing it)

myQueue.count()
=> returns # of elements in queue


*** Additional Exercises:

Modify your queue to take a max capacity and return a string if adding 
an element when no more room:
  myQueue.enqueue(value) => "Max capacity already reached. Remove element before adding a new one."


Write a 'contains' method checking if a value is in the queue:
  myQueue.contains('findme') => true/false
  Time complexity?


Write an 'until' method getting # of dequeues until a given value:
  queue values ---> (first)2-5-7-3-6-9(last)
  myQueue.until(7) => 3
  Time complexity?
*/

function Queue(capacity) {
  this._capacity = capacity || Infinity;
  this._storage = {};
  this._head = 0;
  this._tail = 0;
}

// returns queue's count & adds given value to collection
Queue.prototype.enqueue = function(value) { // enqueue under-the-hood
  if (this.count() < this._capacity) {
    this._storage[this._tail++] = value;
    return this.count();
  }
  return `Max capacity already reached. 
          Remove element before adding a new one.`;
}; // O(1)


// removes & returns oldest element in collection
Queue.prototype.dequeue = function() { // dequeue under-the-hood
  var element = this._storage[this._head];
  delete this._storage[this._head];
  if (this._head < this._tail) this._head++;
  return element;
}; // O(1)


// returns oldest element in collection (without removing it)
Queue.prototype.peek = function() {
  this._storage[this._head];
};


// returns # of elements in queue
Queue.prototype.count = function() {
  return this.tail - this.head;
}; // O(1)


Queue.prototype.contains = function(value) {
  for (var i = this._head; i < this._tail; i++) {
    if (this._storage[i] === value) return true;
  }
  return false;
};
// Time complexity: O(n)


Queue.prototype.until = function(value) {
  for (var i = this._head; i < this._tail; i++) {
    if (this._storage[i] === value) return i-this._head+1;
  }
  return null;
};
// Time complexity: O(n)

/*
*** Exercises:

1. Write a queue using two stacks.

2. Write a double-ended queue, with these methods: 
    enqueueLeft, dequeueLeft, enqueueRight, dequeueRight.

3. Given a tree, print the value of each node in breadth-first 
    order using a queue data structure.

 */
// Write a queue using two stacks
function Stack(capacity) {
  this._capacity = capacity || Infinity;
  this._storage = {};
  this._count = 0;
}

Stack.prototype.push = function(value) {
  if (this._count < this._capacity) {
    this._storage[this._count++] = value;
    return this._count;
  }
  return 'Max capacity already reached. Remove element before adding a new one.';
};

Stack.prototype.pop = function() {
  var value = this._storage[--this._count];
  delete this._storage[this._count];
  if (this._count < 0) {
    this._count = 0;
  }
  return value;
};

Stack.prototype.peek = function() {
  return this._storage[this._count-1];
}

Stack.prototype.count = function() {
  return this._count;
};

function Queue_TwoStacks() {
  this._stackIn = new Stack();
  this._stackOut = new Stack();
}

Queue_TwoStacks.prototype.enqueue = function(val) {
  this._stackIn.push(val);
};

Queue_TwoStacks.prototype._transferStacks = function() {
  while (this._stackIn.count() > 0) {
    this._stackOut.push(this._stackIn.pop());
  }
};

Queue_TwoStacks.prototype.dequeue = function() {
  if (this._stackOut.count() === 0) this._transferStacks();
  return this._stackOut.pop();
};

Queue_TwoStacks.prototype.count = function() {
  return this._stackIn.count() + this._stackOut.count();
};

Queue_TwoStacks.prototype.peek = function() {
  if (this._stackOut.count() === 0) this._transferStacks();
  return this._stackOut.peek();
};

// var myQueue_TwoStacks = new Queue(3);
// console.log(myQueue_TwoStacks.enqueue('a'), 'should be 1');
// console.log(myQueue_TwoStacks.enqueue('b'), 'should be 2');
// console.log(myQueue_TwoStacks.enqueue('c'), 'should be 3');
// console.log(myQueue_TwoStacks.enqueue('d'), 'should be Max capacity reached');
// console.log(myQueue_TwoStacks.dequeue(), 'should be a');
// console.log(myQueue_TwoStacks.count(), 'should be 2');
// console.log(myQueue_TwoStacks.peek(), 'should be b');
// console.log(myQueue_TwoStacks.count(), 'should be 2');