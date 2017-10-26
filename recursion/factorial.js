/*
Implement factorial.

factorial(5) => 5*4*3*2*1 => 120
*/

function factorial (n) {
  if (n === 1) return 1; // base case = 1
  return n * factorial(n - 1);
}

console.log(factorial(5));
// 5 * f(4) --> 4 * f(3) --> 3 * f(2) --> 2 * f(1) --> 1 