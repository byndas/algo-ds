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
=> returns myMap object
  
  Stores the key-value pair in the storage array.
  If the key already exists, replaces stored value with new value.

  Uses the hashing function to map the key to an integer and 
  store the value at the corresponding index.

  Handles possible collisions.

myMap.get(key)
=> returns the value associated with the key
   or else returns undefined

myMap.has(key)
=> returns true/false... if a value associates with the key

myMap.delete(key)
=> removes any value associated to the key & returns true if any were
   
myMap.count()
=> returns the number of key/value pairs in hash table

myMap.forEach(callbackFn)
=> runs callbackFn once for each key-value pair in the hash table


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
// http://pmav.eu/stuff/javascript-hashing-functions/source.html

function HashTable(tableSize) {
  this._size = tableSize;
  this._storage = [];
  this._count = 0;
}

// A helper method to keep our code DRY
// O(1)
HashTable.prototype.find = function(key) {
  var hash = simpleHash(key, this._size);
  var bucket = this._storage[hash];
  var match; var matchIndex;
  
  this._storage[hash] = this._storage[hash] || []; // bucket?
  
  bucket.forEach(function(item, index) { // iterates through bucket 
    if (item.hasOwnProperty(key)) { // checking for key
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
  var that = this; var key;
  
  this._size = newSize;
  this._count = 0;
  this._storage = [];
  
  oldStorage.forEach(function(bucket) {
    bucket.forEach(function(item) {
      key = Object.keys(item)[0];
      that.set(key, item[key]);
    });
  });
};


// O(1)
HashTable.prototype.set = function(key, value) {
  var match = this.find(key).match;
  var bucket = this.find(key).bucket;
  var newItem = {};
  
  if (match) { // if match
    match[key] = value; // updates value
  }
  
  else {// if no match
    newItem[key] = value; // adds new object with key/value pair
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
  // otherwise, match is undefined
  return match && match[key];
};

console.log(myMap.get('key'), 'should be value');
// => returns value associated with key... or undefined if none

// O(1)
HashTable.prototype.has = function(key) {
  return !!this.find(key).match;
  //    '!!' converts type to boolean
  //    '!!{}' => returns true
  //    '!!undefined' => returns false
};

console.log(myMap.has('key'), 'should be true');
console.log(myMap.has('foo'), 'should be false');
// => returns true/false... if a value associates with the key

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
// => returns true if a value had associated with the key
// => returns false if a value never associated with the key
// Removes any value associated to the key

// O(1)
HashTable.prototype.count = function() {
  return this._count;
}
console.log(myMap.count(), 'should be 0');
// => returns the number of key/value pairs in hash table

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

1. Implement a hash table with a bsTree.

2. Given two arrays, return only the values that are in both arrays.
   Do this in linear time ---> O(n)

3. Implement a hash table using linked lists for collision-handling.
   Why might this be preferable to using arrays?

*/