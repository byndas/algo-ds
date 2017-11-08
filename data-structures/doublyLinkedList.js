/*
LINKED LIST
... composes nodes representing a sequence.
Each node contains data and a reference/link to the next node.

*** Operations:

*** Part 1

myList.forEach(callbackFn)
=> invokes callback function with the value of each node --> (item)

myList.print()
=> returns a string of all list values (ex: '0, 1, 2, 3')

myList.insertAfter(refNode, value)
=> returns a new node with a given value

myList.removeAfter(refNode)
=> removes the node after refNode (& returns it?)

myList.insertHead(value)
=> unshifts a new head node with a given value & returns it

passed in myList.removeHead()
=> removes it from the linked list & returns it

myList.findNode(value)
=> returns the first node that has a given value


*** Optimization:
How to add an item to the end of a 100-item linked-list in constant time?

myList.appendToTail(value)
=> pushes a new tail node with a given value & returns it

myList.removeTail()
=> returns the removed tail node, removes it from the list


*** Part 2

How to more efficiently create insertBefore & removeBefore methods?
What's your current time complexity?

How to modify our Node and Linked-List classes to be O(1)?
Once you've come up with a plan, implement the following methods.
myList.insertBefore(refNode, value)
=> new node inserted
insert new node with associated value before refNode
myList.removeBefore(refNode)
=> removed node
remove node before the refNode passed in
*** Additional Exercises:
Implement a circularly linked list:
https://en.wikipedia.org/wiki/Linked_list#Circularly_linked_list

*/


function Node(value) {
  this.value = value;
  this.next = null;
  this.prev = null;
}

function LinkedList(headValue) {
  if (headValue === undefined) console.log('Must provide value for first node');
  this.head = new Node(headValue);
  this.tail = this.head;
}

LinkedList.prototype.forEach = function(callback) {
  var node = this.head;
  while (node) {
    callback(node.value);
    node = node.next;
  }
};

LinkedList.prototype.print = function() {
  var result = [];
  this.forEach(function(value) {
    result.push(value);
  });
  return result.join(', ');
};

LinkedList.prototype.insertAfter = function(node, value) {
  // get reference to former next
  var oldNext = node.next;
  // create new node
  var newNext = new Node(value);
  // store it as the new next
  node.next = newNext;
  newNext.prev = node;
  // set next for the new node to be the old next
  newNext.next = oldNext;
  oldNext && (oldNext.prev = newNext); // do this only if oldNext is not null
  // if reference node is tail, set tail to newNext
  if (this.tail === node) this.tail = newNext;
  // set prev properties

  return newNext;
};

LinkedList.prototype.removeAfter = function(node) {
  // store reference to removed node
  var removedNode = node.next;
  // if node is tail, then there's nothing to remove
  if (!removedNode) return 'Nothing to remove';

  // get reference to node after removed node
  var newNext = removedNode.next;

  // set references between node and new next
  node.next = newNext;
  newNext.prev = node;

  // remove reference from removed node to linked list
  removedNode.next = null;
  removedNode.prev = null;

  // if removedNode is tail, set tail to node
  if (removedNode === this.tail) this.tail = node;
  return removedNode;
};

LinkedList.prototype.insertHead = function(value) {
  var newHead = new Node(value);
  var oldHead = this.head;
  this.head = newHead;
  newHead.next = oldHead;
  oldHead.prev = newHead;
  return this.head;
};

LinkedList.prototype.removeHead = function() {
  var oldHead = this.head;
  var newHead = oldHead.next;
  this.head = newHead;
  newHead.prev = null;
  oldHead.next = null;
  return oldHead;
}

LinkedList.prototype.findNode = function(value) {
  var node = this.head;
  while (node) {
    if (node.value === value) return node;
    node = node.next;
  }
  return 'No node with value: ' + value + ' found.';
};

LinkedList.prototype.appendToTail = function(value) {
  var newTail = new Node(value);

  // // without myList.tail property: O(n)
  // var node = this.head;
  // while(node.next) {
  //   node = node.next;
  // }
  // node.next = newTail;
  // newTail.prev = node;

  // with myList.tail property: O(1)
  var oldTail = this.tail;
  oldTail.next = newTail;
  newTail.prev = oldTail;
  this.tail = newTail;

  return newTail;
};

LinkedList.prototype.insertBefore = function(node, value) {
  var oldPrev = node.prev;
  var newPrev = new Node(value);
  // Set up references between reference node and inserted node
  node.prev = newPrev;
  newPrev.next = node;
  // Set up references between inserted node and old previous node
  newPrev.prev = oldPrev;
  oldPrev.next = newPrev;

  // if node is head, set newPrev as head
  if (node === this.head) this.head = newPrev;

  return newPrev;
};

LinkedList.prototype.removeBefore = function(node) {
  var removedNode = node.prev;

  // if node is head, don't do anything
  if (!removedNode) return 'Nothing to remove';

  var newPrev = removedNode.prev;
  // if newPrev is null, then removed node is head, set node to be new head
  if (!newPrev) this.head = node;
  // Set up references between node and new previous node
  // if newPrev is not null, set its next property to node
  newPrev && (newPrev.next = node);
  node.prev = newPrev;
  // Break references from removed node to linked list
  removedNode.next = null;
  removedNode.prev = null;

  return removedNode;
};

var myList = new LinkedList(0);

console.log(myList.print(), 'should be 0');
console.log(myList.insertAfter(myList.head, 1), 'should be 1');
console.log(myList.print(), 'should be 0, 1');
console.log(myList.insertAfter(myList.head.next, 3), 'should be 3');
console.log(myList.print(), 'should be 0, 1, 3');
console.log(myList.insertAfter(myList.head.next, 2), 'should be 2');
console.log(myList.print(), 'should be 0, 1, 2, 3');
console.log(myList.removeAfter(myList.head), 'should be 1');
console.log(myList.print(), 'should be 0, 2, 3');
console.log(myList.insertHead(-1), 'should be -1');
console.log(myList.print(), 'should be -1, 0, 2, 3');
console.log(myList.removeHead(), 'should be -1');
console.log(myList.print(), 'should be 0, 2, 3');
console.log(myList.appendToTail(4), 'should be 4');
console.log(myList.print(), 'should be 0, 2, 3, 4');
console.log(myList.findNode(0) === myList.head, 'should be true');
console.log(myList.findNode(3) === myList.head.next.next, 'should be true');
myList.insertAfter(myList.findNode(2), 2.5);
console.log(myList.print(), 'should be 0, 2, 2.5, 3, 4');
myList.removeAfter(myList.findNode(2));
console.log(myList.print(), 'should be 0, 2, 3, 4');

console.log(myList.insertBefore(myList.head.next, 1), 'should be 1');
console.log(myList.print(), 'should be 0, 1, 2, 3, 4');
console.log(myList.removeBefore(myList.head.next.next), 'should be 1');
console.log(myList.print(), 'should be 0, 2, 3, 4');
