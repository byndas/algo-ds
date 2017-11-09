/*
GRAPHS

Abstract data type

Basic Graphs store nodes (primitive value) & each node's neighbors.

A basic graph is an adjacency list 
(https://en.wikipedia.org/wiki/Adjacency_list).

Example:

1---2---3
 \ /
  4
  
graph = {
  1: [2, 4],
  2: [1, 3, 4],
  3: [2],
  4: [1, 2]
}

Constraints: undirected & can have unconnected nodes
             unique primitive values represent nodes

*** Operations:

graph.addNode(value) // value must be a primitive
=> adds node to graph & returns undefined

graph.removeNode(value)
=> remove node from graph & returns undefined

graph.contains(value)
=> returns true/false... if value is found in graph

graph.addEdge(value1, value2)
=> links two nodes if both present in the graph & returns undefined

graph.removeEdge(value1, value2)
=> removes connection between two nodes & returns undefined

graph.hasEdge(value1, value2)
=> returns true/false... if edge exists

graph.forEach(callback)
=> traverses graph & runs the callback once for each node,
  the callback receives for each node: 
    node value, node Neighbors, all nodes.


*** Nightmare mode:

Implement traversal methods for depth-first and breadth-first traversal.

These methods take a starting node and a callback that runs for each node.

The callback takes two arguments: node value & distance
  (# of edges between current node & starting node).  [example below]
  
graph.traverseDepthFirst(value1, callback)
=> starts at the node with value1, traverses the graph, runs the
  callback for each node in a DEPTH-first fashion & returns undefined
  
graph.traverseBreadthFirst(value, callback)
=> starts at the node with value1, traverses the graph, runs the
  callback for each node in a BREADTH-first fashion & returns undefined

Example:

1---2---3---5
 \ /
  4

{
  '1': [ 2, 4 ],
  '2': [ 1, 3, 4 ],
  '3': [ 2, 5 ],
  '4': [ 1, 2 ],
  '5': [ 3 ]
}

var traverseDF = [];

graph.traverseDepthFirst(1, function(val, distance) { 
  traverseDF.push([val, distance])
});

traverseDF is now [ [ 1, 0 ], [ 2, 1 ], [ 3, 2 ], [ 5, 3 ], [ 4, 2 ] ]

var traverseBF = [];

graph.traverseBreadthFirst(1, function(val, distance) {
  traverseBF.push([val, distance])
});

traverseBF is now [ [ 1, 0 ], [ 2, 1 ], [ 4, 1 ], [ 3, 2 ], [ 5, 3 ] ]


*** Exercises:

Given a directed graph with two nodes in the graph, 
  write a function that returns whether there is a route
    between the two nodes.
    
Bonus: instead of returning a boolean, return the shortest distance
  between those two nodes (# of edges that separate them).
*/

function Graph () {
  this._nodes = {};
}

Graph.prototype.addNode = function(value) {
  if (value === undefined) return;
  this._nodes[value] = this._nodes[value] || [];
};

Graph.prototype.removeNode = function(value) {
  this._nodes[value].forEach(function(neighbor) {
    var neighborsNeighbors = this._nodes[neighbor];
    var index = neighborsNeighbors.indexOf(value);
    neighborsNeighbors.splice(index, 1);
  })
  delete this._nodes[value];
};

Graph.prototype.contains = function(value) {
  return this._nodes[value] !== undefined;
};

Graph.prototype.addEdge = function(value1, value2) {
  if (!this._nodes[value1] || !this._nodes[value2]) return 'Invalid node value';
  this._nodes[value1].push(value2);
  this._nodes[value2].push(value1);
};

Graph.prototype.removeEdge = function(value1, value2) {
  if (!this._nodes[value1] || !this._nodes[value2]) return 'Invalid node value';
  var value1Neighbors = this._nodes[value1];
  value1Neighbors.splice(value1Neighbors.indexOf(value2), 1);
  var value2Neighbors = this._nodes[value2];
  value2Neighbors.splice(value2Neighbors.indexOf(value1), 1);
};

Graph.prototype.hasEdge = function(value1, value2) {
  return this._nodes[value1].indexOf(value2) > -1;
};

Graph.prototype.forEach = function(fn) {
  for (var node in this._nodes) {
    fn(node, this._nodes[node], this._nodes);
  }
};

Graph.prototype.traverseDepthFirst = function(value, fn, visited, distance) {
  if (!this._nodes[value] || typeof fn !== 'function') return 'Invalid value or function';
  visited = visited || {};
  distance = distance || 0;
  fn(value, distance);
  visited[value] = true;
  this._nodes[value].forEach(function(neighbor) {
    if (visited[neighbor]) return;
    this.traverseDepthFirst(neighbor, fn, visited, distance+1);
  }, this);
};

Graph.prototype.traverseBreadthFirst = function(value, fn) {
  if (!this._nodes[value] || typeof fn !== 'function') return 'Invalid value or function';
  var visited = {};
  var queue = [value];
  visited[value] = 0;
  while (queue.length) {
    var node = queue.shift();
    fn(node, visited[node]);
    var neighbors = this._nodes[node].filter(function(neighbor) {
      if (visited[neighbor] === undefined) {
        visited[neighbor] = visited[node]+1;
        return true;
      }
    });
    queue = queue.concat(neighbors);
  }
};


var graph = new Graph();

graph.addNode(1);
graph.addNode(2);
graph.addNode(3);
graph.addNode(4);
graph.addNode(5);
console.log(graph._nodes, 'should have 5');
graph.removeNode(5);
console.log(graph._nodes, 'should NOT have 5');
console.log(graph.contains(4), 'should be true');
console.log(graph.contains(7), 'should be false');
graph.addEdge(1,2);
graph.addEdge(1,4);
graph.addEdge(3,2);
graph.addEdge(2,4);
graph.addEdge(3,4);
console.log(graph._nodes);
graph.removeEdge(4,3);
console.log(graph._nodes);
console.log(graph.hasEdge(1,2), 'should be true');
console.log(graph.hasEdge(1,3), 'should be false');
graph.forEach(function(node, neighbors) {
  console.log(node, 'has neighbors:', neighbors);
});
graph.addNode(5);
graph.addEdge(3,5);
console.log(graph._nodes);
var traverseDF = [];
graph.traverseDepthFirst(1, function(val, dist) { traverseDF.push([val, dist]) });
console.log(traverseDF, 'should be [ [ 1, 0 ], [ 2, 1 ], [ 3, 2 ], [ 5, 3 ], [ 4, 2 ] ]');
var traverseBF = [];
graph.traverseBreadthFirst(1, function(val, dist) { traverseBF.push([val, dist]) });
console.log(traverseBF, 'should be [ [ 1, 0 ], [ 2, 1 ], [ 4, 1 ], [ 3, 2 ], [ 5, 3 ] ]');