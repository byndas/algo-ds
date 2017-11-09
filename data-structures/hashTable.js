/*

HASH TABLE

Collection of key-value pairs.

Map keys to values for efficient lookup.

Use an array as the underlying data structure.

Hash tables should have a size -- which the hashing function uses
  to know which index to map the key to.

A hashing function maps the key to an integer, 
  which is the index that the value is to be stored at.
  
We make buckets (arrays or linked lists) at each storage array index
to correct collisions (hashing function maps keys to the same integer)

*** Note:

ES6 includes a unique Map data structure, differing from the JS object
  since keys may be of any value (not only strings for objects), 
    there is a size property & a guaranteed (insertion) order.

Hash tables are also called hash maps or dictionaries.


*** Operations:

myMap.set(key, value)
=> myMap object
Store the key-value pair in the storage array.
If the key already exists, replace stored value with new value.
Use the hashing function to map the key to an integer and store the value at the corresponding index.
Account for the possibility of collisions.

myMap.get(key)
=> value associated with key, or undefined if none

myMap.has(key)
=> true/false depending on if a value has been associated with the key

myMap.delete(key)
=> true if a value was associated with the key
=> false if a value was never associated with the key
Remove any value associated to the key

myMap.count()
=> integer number of key/value pairs in hash table

myMap.forEach(callbackFn)
=> no returned value
Invokes callback function once for each key-value pair in the hash table


*** Exercise ---> Resize the hash table:

- if the count grows beyond 75% of the table size, 
  double that table size and redistribute the key/value pairs

- if the count drops below 25% of the table size,
  cut the table size in half and redistribute the key/value pairs

Implement a hash table with a bsTree.

*/

// Simple hashing function to use in your implementation
function simpleHash(str, tableSize) {
  var hash = 0;
  for (var i=0; i<str.length; i++) {
    hash += str.charCodeAt(i) * (i+1);
  }
  return hash % tableSize;
}
// source: http://pmav.eu/stuff/javascript-hashing-functions/source.html

function HashTable(tableSize) {
  this._size = tableSize;
  this._storage = [];
  this._count = 0;
}

// This is a helper method that will help keep our code DRY
// O(1)
HashTable.prototype.find = function(key) {
  var hash = simpleHash(key, this._size);
  this._storage[hash] = this._storage[hash] || [];
  var bucket = this._storage[hash];
  // iterate through bucket and check if key is present
  var match;
  var matchIndex;
  bucket.forEach(function(item, index) {
    if (item.hasOwnProperty(key)) {
      match = item;
      matchIndex = index;
    }
  });
  return {
    match: match,
    bucket: bucket,
    matchIndex: matchIndex
  };
};

// O(n)
HashTable.prototype.resize = function(newSize) {
  var oldStorage = this._storage;
  this._size = newSize;
  this._count = 0;
  this._storage = [];
  var that = this;
  oldStorage.forEach(function(bucket) {
    bucket.forEach(function(item) {
      var key = Object.keys(item)[0];
      that.set(key, item[key]);
    });
  });
};

// O(1)
HashTable.prototype.set = function(key, value) {

  var match = this.find(key).match;
  var bucket = this.find(key).bucket;
  // if match exists, update value
  if (match) {
    match[key] = value;
  }
  // if not, add new object with key/value pair
  else {
    var newItem = {};
    newItem[key] = value;
    this._count++;
    bucket.push(newItem);
    if (this._count > 0.75*this._size) {
      this.resize(2*this._size);
    }
  }
  return this;
};

var myMap = new HashTable(10);
console.log(myMap.set('key', 'value'), 'should be HT object');


// O(1)
HashTable.prototype.get = function(key) {
  var match = this.find(key).match;
  // if key is found, match is an object {key: value}
  // if not, match is undefined
  return match && match[key];
};

console.log(myMap.get('key'), 'should be value');
// => value associated with key, or undefined if none

// O(1)
HashTable.prototype.has = function(key) {
  return !!this.find(key).match;
  // !! does type conversion to boolean
  // !!{} => true
  // !!undefined => false
};
console.log(myMap.has('key'), 'should be true');
console.log(myMap.has('foo'), 'should be false');
// => true/false depending on if a value has been associated with the key

// O(1)
HashTable.prototype.delete = function(key) {
  var match = this.find(key).match;
  if (match) {
    var bucket = this.find(key).bucket;
    var matchIndex = this.find(key).matchIndex;
    bucket.splice(matchIndex, 1);
    this._count--;
    if (this._count < 0.25*this._size) {
      this.resize(0.5*this._size);
    }
  }
  return !!match;
};

console.log(myMap.delete('key'), 'should be true');
console.log(myMap.delete('foo'), 'should be false');
console.log(myMap, 'should have no elements');
// => true if a value was associated with the key
// => false if a value was never associated with the key
// Remove any value associated to the key

// O(1)
HashTable.prototype.count = function() {
  return this._count;
}
console.log(myMap.count(), 'should be 0');
// => integer number of key/value pairs in hash table

// O(n)
HashTable.prototype.forEach = function(callback) {
  this._storage.forEach(function(bucket) {
    bucket = bucket || [];
    bucket.forEach(function(item) {
      callback(item);
    });
  });
};

console.log('count', myMap._count, 'should be 0');
console.log('size', myMap._size, 'should be 5');
myMap.set('foo', 'bar');
myMap.set('fooAgain', 'barAgain');
myMap.set('a', 1);
myMap.set('b', 2);
myMap.forEach(console.log);
console.log('count', myMap._count, 'should be 4');
console.log('size', myMap._size, 'should be 10 (doubled)');
myMap.delete('a');
console.log('count', myMap._count);
console.log('size', myMap._size);
myMap.delete('b');
console.log('count', myMap._count);
console.log('size', myMap._size, 'should be 5 (halved)');


/*
*** Exercises:

1. Implement a hash table with a binary search tree.

2. Given two arrays with values, return the values that are present in both. Do this in linear time.

3. Implement a hash table using linked lists for collision-handling. Why might this be preferable to using arrays.

*/
