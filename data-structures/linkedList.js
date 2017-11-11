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

Now let's think about creating insertBefore and removeBefore methods for the nodes in our list. Can you think of an efficient way to do so?

Think about time complexity. What would it be for your current implementation of a linked list?

How can we modify our data structures (Node and Linked List classes) so that we can make these O(1) operations?

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

Reimplement stack and queue data structures using linked lists.


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
  // get reference to former next
  var oldNext = node.next;
  // create new node
  var newNext = new Node(value);
  // store it as the new next
  node.next = newNext;
  // set next for the new node to be the old next
  newNext.next = oldNext;
  // if reference node is tail, set tail to newNext
  if (this.tail === node) this.tail = newNext;
  return newNext;
};

LinkedList.prototype.removeAfter = function(node) {
  // store reference to removed node
  var removedNode = node.next;
  // if node is tail, then there's nothing to remove
  if (!removedNode) return 'Nothing to remove';
  // get reference to node after removed node
  var newNext = removedNode.next;
  // set newNext as the next node
  node.next = newNext;
  // remove reference from removed node to linked list
  removedNode.next = null;
  // if removedNode is tail, set tail to node
  if (removedNode === this.tail) this.tail = node;
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

4. Reverse a linked list. Do not use any additional storage structures.

5. Find the kth to last element of a singly linked list.

6. Detect if a linked list has a loop.

7. Check if a linked list is a palindrome.

8. Given two linked lists that represent numbers, return a linked list that represents the sum of those numbers:
  4 2 5        (4 -> 2 -> 5)
+ 7 3 1        (7 -> 3 -> 1)
--------
1 1 5 6   (1 -> 1 -> 5 -> 6)

 */
