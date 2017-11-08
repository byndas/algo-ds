/*
BINARY SEARCH TREE

An abstract data type, a tree with the additional constraints:

- each node has only two child nodes (node.left and node.right)
- all left child node values <= parent node value
- all right child node values > parent node value

*** Operations:

bsTree.insert(value)
=> returns bsTree ---> (for chaining purposes)
Inserts value into correct position within tree

bsTree.contains(value)
=> returns true or false... if value is in tree

bsTree.traverseDepthFirst_inOrder(callback)
=> return undefined
Runs callback for each node in a depth-first in-order
(left branch, then current node, then right branch)

Note: In-Order traversal is most common type for binary trees.
      For bsTrees, visits nodes in ascending order (hence the name).

bsTree.traverseDepthFirst_preOrder(callback)
=> returns undefined
Runs callback for each node in a depth-first pre-order 
(visits current node before its child nodes)

bsTree.traverseDepthFirst_postOrder(callback)
=> returns undefined
Runs callback for each node in a depth-first post-order
(visit the current node after its child nodes)

bsTree.isValid()
=> returns true or false... if a valid BST
Useful for checking your other methods

bsTree.removeNode(value)
=> removes node from tree & returns it

bsTree.checkIfFull()
=> returns true or false
A full binary tree has no nodes with only one child (only two or zero)

bsTree.checkIfBalanced()
=> returns true or false
A tree is balanced if (min height - max height differ) < 2. 
The branch height === number of levels below the root.


*** Additional Exercise:

To make a bsTree: loop over an array & put each element into the tree.

Given a bsTree with no duplicates, how many different arrays result?

*/

// Binary Search Tree
function BinarySearchTree (value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

// O(log(n))
BinarySearchTree.prototype.insert = function(value) {
  if (value <= this.value) {
    if (this.left) this.left.insert(value);
    else this.left = new BinarySearchTree(value);
  }
  else {
    if (this.right) this.right.insert(value);
    else this.right = new BinarySearchTree(value);
  }
  return this;
};

// O(log(n));
BinarySearchTree.prototype.contains = function(value) {
  if (this.value === value) return true;
  if (value < this.value) {
    // if this.left doesn't exist return false
    // if it does exist, check if its subtree contains the value
    return !!this.left && this.left.contains(value);
  }
  if (value > this.value) {
    // if this.right doesn't exist return false
    // if it does exist, check if its subtree contains the value
    return !!this.right && this.right.contains(value);
  }
  return false;
};

var bsTree = new BinarySearchTree(10);
bsTree.insert(5).insert(15).insert(8).insert(3).insert(7).insert(20).insert(17).insert(9).insert(14);

// In-Order traversal is most common
// visit left branch, then current node, than right branch
// For binary search tree, this visits the nodes in ascending order (hence the name)
// O(n)
BinarySearchTree.prototype.traverseDepthFirst_inOrder = function(fn) {
  if (!this.left && !this.right) return fn(this);
  if (this.left) this.left.traverseDepthFirst_inOrder(fn);
  fn(this);
  if (this.right) this.right.traverseDepthFirst_inOrder(fn);
};

var result_traverseDepthFirst_inOrder = [];
bsTree.traverseDepthFirst_inOrder(function(node) {
  result_traverseDepthFirst_inOrder.push(node.value);
});
console.log(result_traverseDepthFirst_inOrder, 'should be [3,5,7,8,9,10,14,15,17,20]');

// Pre-Order traversal
// visits current node before its child nodes
// O(n)
BinarySearchTree.prototype.traverseDepthFirst_preOrder = function(fn) {
  fn(this);
  if (this.left) this.left.traverseDepthFirst_preOrder(fn);
  if (this.right) this.right.traverseDepthFirst_preOrder(fn);
};

var result_traverseDepthFirst_preOrder = [];
bsTree.traverseDepthFirst_preOrder(function(node) {
  result_traverseDepthFirst_preOrder.push(node.value);
});
console.log(result_traverseDepthFirst_preOrder, 'should be [10,5,3,8,7,9,15,14,20,17]');

// Post-Order traversal
// visits the current node after its child nodes
// O(n)
BinarySearchTree.prototype.traverseDepthFirst_postOrder = function(fn) {
  if (this.left) this.left.traverseDepthFirst_postOrder(fn);
  if (this.right) this.right.traverseDepthFirst_postOrder(fn);
  fn(this);
};

var result_traverseDepthFirst_postOrder = [];
bsTree.traverseDepthFirst_postOrder(function(node) {
  result_traverseDepthFirst_postOrder.push(node.value);
});
console.log(result_traverseDepthFirst_postOrder, 'should be [3,7,9,8,5,14,17,20,15,10]');

// O(n)
BinarySearchTree.prototype.traverseBreadthFirst = function(fn) {
  var queue = [this];
  while (queue.length) {
    var node = queue.shift();
    fn(node);
    node.left && queue.push(node.left);
    node.right && queue.push(node.right);
  }
};

var result_traverseBreadthFirst = [];
bsTree.traverseBreadthFirst(function(node) {
  result_traverseBreadthFirst.push(node.value);
});
console.log(result_traverseBreadthFirst, 'should be [10,5,15,3,8,14,20,7,9,17]');

// O(n)
// A full binary tree has no one-node children (each has either 0 or 2)
BinarySearchTree.prototype.checkIfFull = function() {
  var result = true;
  this.traverseBreadthFirst(function(node) {
    if (!node.left && node.right) result = false;
    else if (node.left && !node.right) result = false;
  });
  return result;
};

console.log(bsTree.checkIfFull(), 'should be false');

var fullBSTree = new BinarySearchTree(10);
fullBSTree.insert(5).insert(20).insert(15).insert(21).insert(16).insert(13);
console.log(fullBSTree.checkIfFull(), 'should be true');

// A tree is balanced if the min height & max height differ by < 2.
// A branch's height === number of levels below the root.
// O(n)
BinarySearchTree.prototype.checkIfBalanced = function() {
  var heights = [];
  var recurse = function(node, height) {
    if (!node.left && !node.right) return heights.push(height);
    node.left && recurse(node.left, height+1);
    node.right && recurse(node.right, height+1);
  };
  recurse(this, 1);
  var min = Math.min.apply(null, heights);
  var max = Math.max.apply(null, heights);
  return max-min <= 1;
};

console.log(bsTree.checkIfBalanced(), 'should be true');
console.log(fullBSTree.checkIfBalanced(), 'should be false');