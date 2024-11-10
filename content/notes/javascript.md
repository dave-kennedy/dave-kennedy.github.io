---
title: JavaScript
---

[[toc]]

* JavaScript was originally used to add behavior to web pages, like animating elements or loading additional data. Today, JavaScript is used as the main programming language in many other applications.
* A JavaScript file is a plain text file ending in `.js`.
* Like HTML and CSS files, JavaScript files can be edited in any plain text editor or in an IDE.
* JavaScript has nothing to do with the Java programming language, country, or beverage.
* JavaScript is an implementation of the ECMAScript standard. Sometimes these terms are used interchangeably, though they are technically distinct.
* JavaScript files are executed by a JavaScript engine, which runs in a web browser or a server runtime like Node.js.

## Adding scripts to a web page

* Like styles, scripts can be __inline__ or __external__ to the web page.
* Both inline and external scripts are added with the `script` element.
* The `script` element can be added to the `head` or `body` of a web page, though right before the closing `body` tag is generally recommended for accessibility and performance reasons.
* Here's an example of an inline script:
  ```html
  <body>
      <h1>My Notes</h1>
      <p>HTML is neat!</p>
      <script>
          ...
      </script>
  </body>
  ```
  The `...` between the `script` tags is just a placeholder. On a real web page, it would be replaced with JavaScript code.
* Here's an example of an external script:
  ```html
  <body>
      <h1>My Notes</h1>
      <p>HTML is neat!</p>
      <script src="script.js"></script>
  </body>
  ```
  In order for this example to work, the `script.js` file must be located in the same directory as the HTML file that references it.

## Comments

* Like in HTML and CSS, __comments__ in JavaScript are intended for developers and are ignored by the engine.
* Here's an example of a single-line comment: `// This is a comment`
* Here's an example of a multi-line comment:
  ```js
  /*
  The greatest danger facing us is ourselves, and irrational
  fear of the unknown. There is no such thing as the unknown. Only
  things temporarily hidden, temporarily not understood.
  */
  ```
* In the examples below, whenever you see a line of code followed by a single-line comment, the comment indicates the result of the code before it. For instance:
  ```js
  1 + 2; // 3
  ```
  In this case, `3` is the result of adding `1` and `2`. If you copy this code, you can omit the comment or leave it as a reminder.

## Statements

* A __statement__ is an instruction given to the engine.
* There are several types of statements. Here are a few:
    * A __block__ of code, e.g. `{...}`
    * A __conditional__, e.g. `if (x > 0) {...}`
    * A __loop__, e.g. `for (const item of items) {...}`
    * A __function declaration__, e.g. `function add(a, b) {...}`
    * A __function call__, e.g. `add(2, 3);`
    * A __variable declaration__, e.g. `let x;`
    * A __variable assignment__, e.g. `x = 2;`
* A single statement can span multiple lines.
* Multiple statements can be placed on a single line, but they must be separated by semi-colons.
* While not strictly required, it's recommended to end every function call, variable declaration, or variable assignment with a semi-colon in order to reduce bugs.

## Variables

* A __variable__ is a name that refers to some data.
* A variable must be declared and assigned a value before it can be referenced.
* Here are some examples:
  ```js
  // This statement declares a new variable named `x`
  let x;

  // Its value is `undefined` until it's assigned, like this
  x = 2;

  // This statement declares and initializes the variable `y`
  let y = 3;
  ```
* Instead of the `let` keyword, a variable can be declared with `const` or `var`.
* `const` declares a __constant__ variable. Constants must be initialized and can't be reassigned.
* `var` is an older syntax with complicated side-effects that can lead to bugs. It is best avoided.
* Variables defined by the engine, such as `Boolean`, `Number`, and `String`, are called __built-in objects__ or __global objects__ because they can be referenced from anywhere in your code.
* Variables have different properties depending on the __type__ of value they contain.

## Booleans

* A __boolean__ is either `true` or `false`.
* Booleans are mostly used for as __conditions__ in __control structures__ (addressed later).
* A condition is an expression that returns a boolean.
* Comparison operators compare two values and return a boolean, like this:
  ```js
  // Returns true if `x` is greater than `y`
  x > y;

  // Returns true if `x` is less than `y`
  x < y;

  // Returns true if `x` is greater than or equal to `y`
  x >= y;

  // Returns true if `x` is less than or equal to `y`
  x <= y;

  // Returns true if `x` is equal to `y`
  x == y;

  // Returns true if `x` is not equal to `y`
  x != y;

  // Returns true if `x` is strictly equal to `y`
  x === y;

  // Returns true if `x` is strictly not equal to `y`
  x !== y;
  ```

## Control structures

> In the examples below, `console.log` is used to print messages to the JavaScript console. If you're running JavaScript in a web browser, the console can be found in your browser's developer tools. (See [Firefox](https://firefox-source-docs.mozilla.org/devtools-user/index.html), [Chrome](https://developer.chrome.com/docs/devtools/console/api/), [Edge](https://learn.microsoft.com/en-us/archive/microsoft-edge/legacy/developer/), or [Safari](https://developer.apple.com/library/archive/documentation/AppleApplications/Conceptual/Safari_Developer_Guide/Console/Console.html)). If you're running Node.js, the console is usually your terminal.

* Use an `if...else` statement to run some code only if a condition is `true`:
  ```js
  if (x > 0) {
      console.log('x is positive');
  }
  ```
  Add an `else` clause to run some code if a condition is `false`:
  ```js
  if (x > 0) {
      console.log('x is positive');
  } else {
      console.log('x is not positive');
  }
  ```
  Additional conditions can be tested with `else if` clauses:
  ```js
  if (x > 0) {
      console.log('x is positive');
  } else if (x < 0) {
      console.log('x is negative');
  } else {
      console.log('x is zero');
  }
  ```
  Conditions can be inverted like this:
  ```js
  if (!(x > 0)) {
      console.log('x is less than or equal to zero');
  }
  ```
  The code between the backets below will only run if both conditions are true:
  ```js
  if (x > 0 && x < 5) {
      console.log('x is between zero and five');
  }
  ```
  The code between the backets below will run if either condition is true:
  ```js
  if (x < 0 || x > 5) {
      console.log('x is less than zero or greater than five');
  }
  ```
* Use a `for` statement to run some code a limited number of times:
  ```js
  for (let i = 0; i < 5; i++) {
      console.log(i);
  }
  ```
* Use a `for...of` statement to run some code for each item in an array:
  ```js
  for (const item of items) {
      console.log(item);
  }
  ```
* Use a `for...in` statement to run some code for each property in an object:
  ```js
  for (const key in obj) {
      console.log(obj[key]);
  }
  ```
* Use a `while` statement to run some code until a condition is `false`:
  ```js
  while (x > 0) {
      console.log('x is positive');
      x--;
  }
  ```
* A `do...while` statement is similar to a `while` statement, except the code will always run at least once:
  ```js
  do {
      console.log('x is positive');
      x--;
  } while (x > 0);
  ```

## Numbers

* A __number__ can be an integer or a floating-point number.
* Here are some examples:
  ```js
  let answer = 42;
  let pi = 3.14159;
  ```
* Numbers can be added, subtracted, multiplied, and divided as you would expect:
  ```js
  2 + 3; // 5
  2 - 3; // -1
  2 * 3; // 6
  2 / 3; // 0.6666666666666666
  ```
* A shorthand exists for assigning the result of an arithmetic operation to a variable:
  ```js
  answer += 2; // 44
  answer -= 2; // 42
  answer *= 2; // 84
  answer /= 2; // 42
  ```
* Another shorthand exists for incrementing or decrementing a variable by 1:
  ```js
  ++answer; // 43
  --answer; // 42
  ```
  If the increment or decrement operator appears after the variable name, the value is returned before it is incremented or decremented:
  ```js
  answer++; // 42
  answer;   // 43

  answer--; // 43
  answer;   // 42
  ```
* The remainder operator returns the remainder after division:
  ```js
  22 % 12; // 10
  ```
  (This is different from the modulo operator in other languages.)

## Strings

* A __string__ is a sequence of letters enclosed in single quotes (''), double quotes (""), or backticks (``).
* Here are some examples:
  ```js
  let firstName = 'James';
  let middleInitial = "T.";
  let lastName = `Kirk`;
  ```
* Strings can be added together like this:
  ```js
  let fullName = firstName + ' ' + middleInitial + ' ' + lastName;
  ```
  This is called __string concatenation__.
* String concatenation can be used to create long strings spanning multiple lines, like this:
  ```js
  let quote = 'The greatest danger facing us is ourselves, and irrational ' +
      'fear of the unknown. There is no such thing as the unknown. Only ' +
      'things temporarily hidden, temporarily not understood.';
  ```
* Backticks can be used to inject variables into a string without concatenation:
  ```js
  let greeting = `Hello, my name is ${fullName}.`;
  ```
  This is called __string interpolation__.
* Backticks can also be used to create long strings without concatentation:
  ```js
  let quote = `The greatest danger facing us is ourselves, and irrational
      fear of the unknown. There is no such thing as the unknown. Only
      things temporarily hidden, temporarily not understood.`;
  ```
* A string's characters can be accessed by __index__, starting at zero:
  ```js
  fullName[0];  // 'J'
  fullName[1];  // 'a'
  fullName[12]; // 'k'
  fullName[13]; // undefined
  ```
* Strings come with many useful properties and methods. Here are a few:
  ```js
  // This property returns the number of characters in the string
  fullName.length; // 13

  // This method returns true if the string starts with the argument
  fullName.startsWith('James'); // true

  // This method returns true if the string ends with the argument
  fullName.endsWith('Kirk'); // true

  // This method returns true if the string includes the argument
  fullName.includes('T.'); // true

  // This method returns the first index where the argument occurs in the string
  // or -1 if it doesn't
  fullName.indexOf('T'); // 6
  fullName.indexOf('Z'); // -1

  // These methods return the part of the string between the arguments
  fullName.slice(0, 5);      // 'James'
  fullName.substring(9, 13); // 'Kirk'

  // This method splits the string into an array (discussed below)
  fullName.split(' '); // ['James', 'T.', 'Kirk']
  ```

## Functions

* A __function__ is a reusable block of code.
* A function can accept one or more input values, called its __arguments__ or __parameters__.
* A function can only return one output value.
* Here are some examples:
  ```js
  // This function accepts no arguments and returns nothing
  function sayHello() {
      console.log('Hello, World!');
  }

  // This function accepts two arguments and returns their sum
  function add(a, b) {
      return a + b;
  }
  ```
* Functions are __called__ or __invoked__ by name, like this:
  ```js
  sayHello(); // undefined
  add(2, 3);  // 5
  ```
* When a function is called with arguments, we say the arguments are __passed__ to the function.
* A function without a name is called an __anonymous function__.
* Here are some examples of anonymous functions:
  ```js
  // This anonymous function is assigned to the variable `logTime`
  let logTime = function () {
      console.log(new Date().toISOString());
  };

  // It's called just like a named function
  logTime(); // '2023-12-31T00:57:00.448Z'

  // `setTimeout` is a global function provided by the engine.
  // It calls a function (first argument) after a delay (second argument).
  // In this example, `logTime` will be called after a delay of three seconds.
  setTimeout(logTime, 3000);

  // Alternatively, we can pass the function directly without a variable
  setTimeout(function () {
      console.log(new Date().toISOString());
  }, 3000);
  ```
* Arrow function expressions allow more compact anonymous functions, like this:
  ```js
  let multiply = (x, y) => {
      return x * y;
  };

  // The parens are optional if there's only one argument
  let double = x => {
      return x * 2;
  };

  // The curly brackets and `return` are optional if there's only one statement
  // in the function body
  let triple = x => x * 3;

  // Each of these is still called just like a named function
  multiply(2, 3); // 6
  double(4);      // 8
  triple(5);      // 15
  ```

## Arrays

* An __array__ is a list of values enclosed in square brackets ([]) and separated by commas.
* Here are some examples:
  ```js
  // This array contains six numbers
  let fibonacci = [1, 2, 3, 5, 8, 11];

  // This array contains three strings
  let fruits = [
      'Apple',
      'Banana',
      'Orange'
  ];

  // This array contains mixed types
  let items = ['Apple', 3, true];
  ```
* An array's values can be accessed by __index__, starting at zero:
  ```js
  fruits[0]; // 'Apple'
  fruits[1]; // 'Banana'
  fruits[2]; // 'Orange'
  fruits[3]; // undefined
  ```
* Arrays come with many useful properties and methods. Here are a few:
  ```js
  // This property returns the number of items in the array
  fruits.length; // 3

  // This method returns true if the array includes the argument
  fruits.includes('Banana'); // true

  // This method returns the first index where the argument occurs in the array
  // or -1 if it doesn't
  fruits.indexOf('Orange'); // 2
  fruits.indexOf('Grape');  // -1

  // This method joins the items into a string
  fruits.join('|'); // 'Apple|Banana|Orange'
  ```
* Some methods __mutate__ the array, changing its contents in place:
  ```js
  // This method removes the last item from the array and returns it
  fruits.pop(); // 'Orange'
  fruits;       // ['Apple', 'Banana']

  // This method adds an item to the end of the array and returns its length
  fruits.push('Orange'); // 3
  fruits;                // ['Apple', 'Banana', 'Orange']

  // This method removes the first item from the array and returns it
  fruits.shift(); // 'Apple'
  fruits;         // ['Banana', 'Orange']

  // This method adds an item to the beginning of the array and returns its
  // length
  fruits.unshift('Apple'); // 3
  fruits;                  // ['Apple', 'Banana', 'Orange']

  // This method reverses the array and returns it
  fruits.reverse(); // ['Orange', 'Banana', 'Apple'];
  fruits;           // ['Orange', 'Banana', 'Apple'];

  // This method sorts the array and returns it
  fruits.sort(); // ['Apple', 'Banana', 'Orange']
  fruits;        // ['Apple', 'Banana', 'Orange']
  ```
* Some methods return a new array, without changing the original:
  ```js
  // This method returns a new array containing the items from the original and
  // its arguments
  fruits.concat(['Lemon', 'Lime']); // ['Apple', 'Banana', 'Orange', 'Lemon', 'Lime']
  fruits;                           // ['Apple', 'Banana', 'Orange']

  // This method returns a new array containing a subset of the items from the original
  fruits.slice(0, 2); // ['Apple', 'Banana']
  fruits;             // ['Apple', 'Banana', 'Orange']

  // This method returns a new array containing the reversed items from the
  // original
  fruits.toReversed(); // ['Orange', 'Banana', 'Apple'];
  fruits;              // ['Apple', 'Banana', 'Orange'];

  // This method returns a new array containing the sorted items from the original
  fruits.toSorted(); // ['Apple', 'Banana', 'Orange']
  fruits;            // ['Apple', 'Banana', 'Orange']
  ```
* Some methods require a function argument, which is called once for each item with the item as its argument:
  ```js
  function isEven(number) {
      return number % 2 == 0;
  }

  // This method returns `true` if the function argument returns `true` for
  // every item
  fibonacci.every(isEven); // false

  // This method returns `true` if the function argument returns `true` for any
  // item
  fibonacci.some(isEven); // true

  // This method returns the first item where the function argument returns
  // `true`
  fibonacci.find(isEven); // 2

  // This method returns the index of the last item where the function argument
  // returns `true`
  fibonacci.findLastIndex(isEven); // 4

  // This method returns a new array containing the items where the function
  // argument returns `true`
  fibonacci.filter(isEven); // [2, 8]

  // This method returns a new array containing values returned by the function
  // argument
  fibonacci.map(item => item * 2); // [2, 4, 6, 10, 16, 22];

  // This method doesn't return anything, it just calls the function argument
  // for each item
  fibonacci.forEach(item => console.log(item));
  ```

## Objects

* An __object__ is like an array, except its values, or __properties__, are named and are enclosed in curly brackets ({}).
* Here's an example:
  ```js
  let foo = {
      x: 1,
      doSomething: function () {
          return this.x + 1;
      }
  };
  ```
* An object's properties are accessed using __dot notation__ or __bracket notation__:
  ```js
  // Dot notation
  foo.x;             // 1
  foo.doSomething(); // 2

  // Bracket notation
  foo['x'];             // 1
  foo['doSomething'](); // 2
  ```

## Classes

* A __class__ is like an object blueprint. A __class definition__ can be used to easily create multiple objects with the same properties and methods. An object created from a class definition is called an __instance__ of that class.
* Here's an example of a class definition and its usage:
  ```js
  class Foo {
      // This function is called when an instance is created.
      // It assigns its argument to a property named `x`, which is accessed within
      // the class as `this.x`.
      constructor(x) {
          this.x = x;
      }

      // When a function is defined in a class, it's called a __method__.
      // Method definitions aren't preceded by the `function` keyword.
      // Methods are a special kind of property that can be called like a function.
      doSomething() {
          return this.x + 1;
      }
  }

  // Instances are created with the `new` keyword
  let f = new Foo(1);
  let g = new Foo(2);

  // Properties are accessed with dot notation...
  f.x;             // 1
  f.doSomething(); // 2

  // Or bracket notation
  g['x'];             // 2
  g['doSomething'](); // 3
  ```
* Classes can share properties with other classes via __inheritance__ with the `extends` keyword.
* Here's an example class definition that extends `Foo`, which is called its parent:
  ```js
  class Bar extends Foo {
      constructor(x, y) {
          // Call the parent constructor
          super(x);
          this.y = y;
      }

      doSomethingElse() {
          // The child class can access its parent's properties like they're its own
          return this.x + this.y;
      }
  }

  // Instances of `Bar` inherit the properties of `Foo`...
  let b = new Bar(3, 5);
  b.x;                 // 3
  b.y;                 // 5
  b.doSomething();     // 4
  b.doSomethingElse(); // 8

  // But not the other way around
  f.y;                 // undefined
  f.doSomethingElse(); // Uncaught TypeError: f.doSomethingElse is not a function
  ```
* A child class can __override__ its parent's properties by redefining them.
* Here's an example class definition that extends `Bar` and changes its behavior:
  ```js
  class Qux extends Bar {
      constructor(x, y, z) {
          // Call the parent constructor
          super(x, y);
          this.z = z;
      }

      doSomethingElse() {
          return this.x + this.y + this.z;
      }
  }

  // Instances of `Qux` inherit the properties of `Foo` and `Bar`
  let q = new Qux(1, 2, 3);
  q.x; // 1
  q.y; // 2
  q.z; // 3
  q.doSomething(); // 2
  q.doSomethingElse(); // 6
  ```
* Excessive use of inheritance can make your code difficult to read and modify. For this reason, it's best to use another appoach.

