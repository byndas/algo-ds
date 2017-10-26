/*
Implement a function that flattens a nested array.

flatten([ 1, [ 2 ], [ 3, [ [ 4 ] ] ] ]); => [1,2,3,4]
*/
var result = [];

function flatten(arr) {
	arr.forEach(function(item) {
		if (!Array.isArray) result.push(item);
		result = result.concat(flatten(item));
	});
	return result;
}

console.log(flatten([1,[2],[3, [[4]]]]));