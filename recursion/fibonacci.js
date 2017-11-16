/*

Write a function that outputs the nth Fibonnaci number.

--> Add the two numbers preceding n to find the value of n.

Fibonnaci's sequence:
input    0 1 2 3 4 5 6  7  8  9 ...
output   0 1 1 2 3 5 8 13 21 34 ...

What is the time complexity?
Can you optimize your solution? (Hint: look up dynamic programming)
*/
function fibonacci(num) {
   if (num === 0 || num === 1) return num;
   return fibonacci(num - 1) + fibonacci(num - 2);
}

console.log(fibonacci(5));

