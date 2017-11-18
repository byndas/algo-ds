/*
Bubble SORT

*** Description

Iterate over array, comparing adjacent items and swap if incorrect
order. Largest elements bubble to the end of the array.

*** Exercises:

- Implement bubble sort
- Identify time complexity

Optimizations:

- Make algorithm adaptive (if at any point array is already
  sorted, exit function early). After doing this, what is time
  complexity for nearly sorted arrays?

- For each pass through the array, are you doing any 
  unnecessary checking of elements?

- Minimize checking and consider the effect on time complexity.

Variants:

- Implement cocktail sort (for each pass find both min and max values 
  and sort in both directions). How does this impact performance?
(https://en.wikipedia.org/wiki/Cocktail_sort)

Properties: O(1), extra space, not stable

Time complexity:
  - worst: O(n2) --> comparisons and swaps
  - best: O(n) when nearly sorted --> adaptive

Use cases:
  Similar to insertion sort with nearly sorted data
  (since adaptive data, insertion sort & bubble sort
  share many same properties) or with a small problem size
  (low memory overhead).
*/

var bubbleSort = function(array) {
  var wall = array.length; // covers first sorted element
  while (wall >= 0) {
    for (var i = 0; i < wall; i++) { // iterates up array to wall
      if (array[i] > array[i + 1]) { // if current value > next value
        array = swap(array, i, i + 1); // swaps values
      }
    }
    wall--;
  }
  return array;
};

function swap(arr, i1, i2) {
  // Bitwise swap --- only works with integer elements
  arr[i1] = arr[i1]^arr[i2];
  arr[i2] = arr[i1]^arr[i2];
  arr[i1] = arr[i1]^arr[i2];
  return arr;
}

console.log(bubbleSort([1,4,6,3,1,6,7,8,9,4,3,12,5,34,3,2]));