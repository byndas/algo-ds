/*

LINKED LIST

Comprised of nodes representing a sequence.
Each node is composed of data and a reference/link to the next node.


*** Operations:

** Part 1

myList.forEach(callbackFn)
=> invokes callback function with the value of each node

myList.print()
=> returns a string with all values in list (ex: '0, 1, 2, 3')

myList.insertAfter(refNode, value)
=> inserts & returns a new node with a given value

myList.removeAfter(refNode)
=>removes& and returns the node after refNode

myList.insertHead(value)
=> inserts & returns new head node at list start with a given value

myList.removeHead()
=> removes & returns the linked list's head node

myList.findNode(value)
=> returns first node having a given value


* Optimization:
How to add an item to end of a 100-item linked list in constant time?

myList.appendToTail(value)
=> adds & returns a new tail node to end of list with a given value

myList.removeTail()
=> removes & returns the tail node from the list


** Part 2

Now let's think about creating insertBefore and removeBefore methods
for the nodes in our list. What's an efficient way?

What's the time complexity for your current linked list?

How to modify Node and Linked List classes to be O(1)?

Try using the following methods:

myList.insertBefore(refNode, value)
=> inserts & returns new node with a given value

myList.removeBefore(refNode)
=> removes & returns a node before the given refNode


*** Additional Exercises:

Implement a circularly linked list:
https://en.wikipedia.org/wiki/Linked_list#Circularly_linked_list

Re-implement stack and queue data structures using linked lists.
*/

// PART 1

function Node(value) {
  this.next = null;
  this.value = value;
}

function LinkedList(headValue) {
  if (headValue === undefined) {
    console.log('Must provide value for first node');
  }
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
  
  var oldNext = node.next; // gets reference to former next
 
  var newNext = new Node(value); // creates new node
  
  node.next = newNext; // stores it as the new next
  
  newNext.next = oldNext; // sets next for new node to be old next
  
  if (this.tail === node) { // if reference node is tail
    this.tail = newNext; // sets tail to newNext
  }
  return newNext;
};

LinkedList.prototype.removeAfter = function(node) {
  // stores reference to removed node
  var removedNode = node.next;
  
  if (!removedNode) { // if node is tail
    return 'Nothing to remove';
  }
  
  var newNext = removedNode.next; // gets node's link after removed node
  
  node.next = newNext; // sets newNext as the next node
  
  removedNode.next = null; // removes removed node's link to linked list
  
  if (removedNode === this.tail) { // if removedNode is tail
    this.tail = node; // sets tail to node
  }
  return removedNode;
};

LinkedList.prototype.insertHead = function(value) {
  var newHead = new Node(value);
  var oldHead = this.head;
  
  this.head = newHead;
  newHead.next = oldHead;
  
  return this.head;
};

LinkedList.prototype.removeHead = function() {
  var oldHead = this.head;
  var newHead = oldHead.next;
  
  this.head = newHead;
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

  // with myList.tail property: O(1)
  
  this.tail.next = newTail;
  this.tail = newTail;

  return newTail;
};


/*
*** Exercises:

1. Implement a stack using a linked list.

2. Implement a queue using a linked list.

3. Write a method that removes duplicates from an unsorted linked list,
   without increasing storage structure (constant space complexity). 
   What is the time complexity?

4. Reverse a linked list without using more storage structures.

5. Find the nth to the last element of a singly linked list.

6. Detect if a linked list has a loop.

7. Check if a linked list is a palindrome.

8. Given two linked lists representing numbers, 
   return one representing the sum of all those numbers:
  4 2 5        (4 -> 2 -> 5)
+ 7 3 1        (7 -> 3 -> 1)
--------
1 1 5 6   (1 -> 1 -> 5 -> 6)

 */
