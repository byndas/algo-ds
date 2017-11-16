/*
TREES

Abstract data type

General Tree:
A tree has a root node.
The root node has 0 or more children.
Each child node has 0 or more children.
(each node in the tree can be seen as a subtree)

Constraints:
A child has only one parent and the root node has no parent.
Note: A tree is a special type of graph --> without cycles.

*** Operations:

tree.addChild(value)
=> adds & returns child node (new tree) to tree/subtree

tree.contains(value)
=> returns true/false... if value is in tree

tree.traverseDepthFirst(callback)
=> returns undefined & runs callback for each node in a depth-first order

tree.traverseBreadthFirst(callback)
=> returns undefined& runs callback for each node in a breadth-first order

*** Additional Exercises:
Given treeA and treeB, check if treeB is a subtree of treeA:
a node n in treeA makes the subtree of n identical to treeB

Given a dictionary, create a prefix tree (commonly known as a trie)
https://en.wikipedia.org/wiki/Trie

*/

// N-ary Tree (tree of n-children)
function Tree (value) {
  this.value = value;
  this.children = [];
}


// Adds child to tree or to subtree, binding child to 'this'
Tree.prototype.addChild = function(value) {
  var child = new Tree(value);
  this.children.push(child);
  return child;
}; // O(1)


var tree = new Tree(1);
var branch1 = tree.addChild(2);
var branch2 = tree.addChild(3);
var branch3 = tree.addChild(4);
branch1.addChild(5);
branch1.addChild(6);
branch3.addChild(7).addChild(8);


Tree.prototype.contains = function(value) {
  if (this.value === value) return true;
  for (var i=0; i<this.children.length; i++) {
    if (this.children[i].contains(value)) return true;
  }
  return false;
}; // O(n)



Tree.prototype.traverseDepthFirst = function(fn) {
  this.children.forEach(function(child) {
    child.traverseDepthFirst(fn);
  });
  fn(this);
} // O(n)


var depthFirstResult = [];

tree.traverseDepthFirst(function(node) {
  depthFirstResult.push(node.value);
});

console.log(depthFirstResult, 'should be [5,6,2,3,8,7,4,1]');


Tree.prototype.traverseBreadthFirst = function(fn) {
  var queue = [this];
  while (queue.length) {
    var node = queue.shift();
    fn(node.value);
    node.children.forEach(function(child) {
      queue.push(child);
    });
  }
}; // O(n)

var breadthFirstResult = [];

tree.traverseBreadthFirst(function(node) {
  breadthFirstResult.push(node);
});

console.log(breadthFirstResult, 'should be [1,2,3,4,5,6,7,8]');