---
title: Web Development 101
---

* Websites consist of one or more web pages.
* Web pages consist of HTML, CSS, and JavaScript.

## HTML

* All web pages begin with an HTML file, i.e. a plain text file ending in `.html`.
* HTML files can be edited in any plain text editor, like Notepad on Windows or TextEdit on Mac, or in an IDE, like IntelliJ or VS Code.
* When you open an HTML file in your web browser, the browser parses (reads) its contents and renders (draws) it on the screen.
* The browser's __address bar__ displays the URL of the file, which is the location where the file is stored.
* If the file is stored on your hard drive, the URL will begin with `file:///`.
* If the file is stored on another computer, the URL will most likely begin with `http://` or `https://`.
* HTML consists of __directives__, __comments__, and __nodes__.

### Directives

* A __directive__ looks like this: `<!doctype html>`
* Directives aren't rendered. They're just instructions for the browser.
* The `doctype` directive tells the browser to use the latest version of HTML.
* The first line of every HTML file must contain the `doctype` directive and nothing else.

### Comments

* A __comment__ looks like this: `<!-- This is a comment -->`
* Comments aren't rendered either. Developers can leave comments for others or for themselves to serve as notes or reminders or whatever.

### Nodes and elements

* Almost everything else in an HTML file is a __node__.
* There are two primary types of nodes: __text__ and __elements__.
* There's not much to say about text nodes. This is one of them.
* An __element__ looks like this: `<div>...</div>`
* In the above example, `<div>` is the __opening tag__ and `</div>` is the __closing tag__.
    * Notice the forward slash (/) at the beginning of the closing tag.
* Most elements can have one or more __child nodes__. Anything inserted between the opening and closing tag is a __descendant node__.
* Every node has a __parent element__ and can have many __ancestor elements__.
* Here's an example of an element with children:
  ```
  <div>
      <p>
          This is some text.
      </p>
  </div>
  ```
  In this example:
    * The `div` element is the parent of the `p` element and an ancestor of the text node.
    * The `p` element is the parent of the text node and the only child of the `div` element.
    * The text node is the only child of the `p` element and a descendant of the the `div` element.
    * Notice each child node is indented one additional level from its parent. This isn't strictly required but makes it easier for developers to visualize the hierarchy of nodes. This hierarchy is sometimes called a `tree`, because it resembles a tree on its side.
* __Void elements__ can't have children, so they don't have a closing tag.
* Here's an example of a void element: `<br />`
    * Notice the forward slash (/) at the end of the opening tag. This isn't strictly required but serves as another visual indicator for developers.
* Elements can have __attributes__, which appear inside the opening tag, like this: `<a href="https://developer.mozilla.org/">MDN</a>`
* Void elements can have attributes too, like this: `<img src="logo.jpg" />`
* Every type of element has a distinct purpose:
    * The `div` element is used to group content.
    * The `p` element is used to insert a paragraph.
    * The `br` element is used to insert a line break.
    * The `a` element is used to insert a link. Its `href` attribute usually contains the URL for another web page.
    * The `img` element is used to insert an image. Its `src` attribute contains the URL for an image file.
* For a complete list of all available elements and documentation, including examples, see [HTML elements reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element).

### A complete example

* In addition to the `doctype` directive, every HTML file should contain:
    * A top-level `html` element. Aside from the `doctype` directive, all other nodes should be inside this element.
    * A `head` element. This should be the first child of the `html` element.
    * A `meta` element with a `charset` attribute containing a valid character encoding, usually `utf-8`. This should be the first child of the `head` element.
    * A `title` element inside the head element. This sets the text shown in the browser tab as well as in bookmarks and search results.
    * A `body` element. This should be the second child of the `html` element.
* The contents of the `body` element are completely up to you, but it typically includes:
    * An `h1` element, containing the page title.
    * One or more links. A web page without links is a __dead end__.
* Here's an example of a complete HTML file:
  ```
  <!doctype html>
  <html>
      <head>
          <meta charset="utf-8" />
          <title>My Notes</title>
      </head>
      <body>
          <h1>My Notes</h1>
          <ul>
              <li>HTML is neat</li>
              <li>
                  Answers to all your questions can be found
                  <a href="https://developer.mozilla.org/">here</a>
              </li>
          </ul>
      </body>
  </html>
  ```

## CSS

* CSS is used to modify the style (appearance) of elements on the page.
* A CSS file, i.e. a plain text file ending in `.css`, is often called a __stylesheet__.
* Like HTML files, stylesheets can be edited in any plain text editor or in an IDE.
* CSS consists primarily of __rules__ and __selectors__.

### Rules

* A __rule__ looks like this: `color: red;`
* In the above example, the `color` __property__ is assigned a __value__ of `red`.
* Other properties include:
    * `background-color`
    * `border-color`
    * `border-width`
    * `font-family`
    * `font-size`
    * `margin`
    * `padding`
* While not strictly required, it's recommended to end every rule with a semi-colon in order to reduce bugs.
* For a complete list of all available properties and documentation, including examples, see [CSS reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference#index).

### Selectors

* A __selector__ looks like this: `body > div:first-child`
* The above example would match the first `div` element that is a child of the `body` element.
* Selectors group one or more rules and apply them to all elements that match, like this:
  ```
  a {
      color: red;
      text-decoration: none;
  }
  ```
  In this example, the selector would match all `a` elements, modifying their `color` and `text-decoration` properties.
* Selectors can be extremely broad or specific. Here are a few examples:
    * All elements on the page: `*`
    * All `div` elements: `div`
    * All `div` elements with a `title` attribute: `div[title]`
    * All `div` elements with a `title` attribute of Products: `div[title=Products]`
    * All `div` elements that are descendants of the `body` element: `body div`
    * All `div` elements that are children of the `body` element: `body > div`
    * The first `div` element that is a child of the `body` element: `body > div:first-child`
    * All elements with a `class` attribute of `product`: `.product`
    * The element with an `id` attribute of `products`: `#products`
* See [CSS selectors and combinators](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors/Selectors_and_combinators) for documentation and examples.

### Adding styles to a web page

* The __style attribute__ can be used to modify the style of a single element, like so: `<div style="color: red;">Warning!</div>`
* Stylesheets must be added to the `head` element and can be __inline__ or __external__.
* An __inline stylesheet__ is added with the `style` element:
  ```
  <head>
      <meta charset="utf-8" />
      <title>My Notes</title>
      <style>
          a {
              color: red;
              text-decoration: none;
          }
      </style>
  </head>
  ```
* An __external stylesheet__ is added with the `link` element:
  ```
  <head>
      <meta charset="utf-8" />
      <title>My Notes</title>
      <link href="style.css" rel="stylesheet" />
  </head>
  ```
  In order for this example to work, the `style.css` file must be located in the same directory as the HTML file that links to it.

## JavaScript

* JavaScript was originally used to add behavior to web pages, like animating elements or loading additional data. Today, JavaScript is used as the main programming language in many other applications.
* A JavaScript file is a plain text file ending in `.js`.
* Like HTML and CSS files, JavaScript files can be edited in any plain text editor or in an IDE.
* JavaScript files are executed by a JavaScript engine, which runs in a web browser or a server runtime like Node.js.

### Comments

* A __comment__ looks like this: `// This is a comment`
* A comment can appear at the beginning or the end of a line.
* Everything after the two forward slashes is ignored by the engine.
* Long comments that span multiple lines look like this:
  ```
  /*
  The greatest danger facing us is ourselves, and irrational
  fear of the unknown. There is no such thing as the unknown. Only
  things temporarily hidden, temporarily not understood.
  */
  ```

### Statements

* A __statement__ is an instruction given to the engine.
* A single statement can span multiple lines.
* Multiple statements can be placed on a single line, but they must be separated by semi-colons.
* While not strictly required, it's recommended to end every statement with a semi-colon in order to reduce bugs.

### Variables

* A __variable__ is a name that refers to some data.
* A variable must be declared and assigned a value before it can be referenced.
* Here are some examples:
  ```
  // This statement declares a new variable named `x`:
  let x;

  // Its value is `undefined` until it's assigned, like this:
  x = 2;

  // This statement declares and initializes the variable `y`:
  let y = 3;
  ```
* Instead of the `let` keyword, a variable can be declared with `const` or `var`.
* `const` declares a __constant__ variable. Constants must be initialized and can't be reassigned.
* `var` is an older syntax with complicated side-effects that can lead to bugs. It is best avoided.

### Data types

* Every value has a type: `Boolean`, `Number`, `String`, etc.
* In JavaScript, a variable can be assigned a value of one type and subsequently reassigned a value of another type. This is called __dynamic typing__.
* Also in JavaScript, an operation involving two dissimilar types will often succeed through __type coercion__. This is called __weak typing__.
* If these big words are confusing, don't worry about it. I just feel like I need to mention it.

### Booleans

* A __boolean__ is either `true` or `false`.
* Booleans are mostly used for as __conditions__ in __control structures__ (addressed later).

### Numbers

* A __number__ can be an integer or a floating-point number.
* Here are some examples:
  ```
  let answer = 42;
  let pi = 3.14159;
  ```
* Numbers can be added, subtracted, multiplied, and divided as you would expect:
  ```
  2 + 3; // 5
  2 - 3; // -1
  2 * 3; // 6
  2 / 3; // 0.6666666666666666
  ```
* A shorthand exists for assigning the result of an arithmetic operation to a variable:
  ```
  answer += 2; // 44
  answer -= 2; // 42
  answer *= 2; // 84
  answer /= 2; // 42
  ```
* Another shorthand exists for incrementing or decrementing a variable by 1:
  ```
  ++answer; // 43
  --answer; // 42
  ```
  If the increment or decrement operator appears after the variable name, the value is returned before it is incremented or decremented:
  ```
  answer++; // 42
  answer;   // 43

  answer--; // 43
  answer;   // 42
  ```
* Modular arithetic also works as you would expect:
  ```
  22 % 12; // 10
  ```

### Strings

* A __string__ is a sequence of letters enclosed in single quotes (''), double quotes (""), or backticks (``).
* Here are some examples:
  ```
  let firstName = 'James';
  let middleInitial = "T.";
  let lastName = `Kirk`;
  ```
* Strings can be added together like this:
  ```
  let fullName = firstName + ' ' + middleInitial + ' ' + lastName;
  ```
  This is called __string concatenation__.
* String concatenation can be used to create long strings spanning multiple lines, like this:
  ```
  let quote = 'The greatest danger facing us is ourselves, and irrational ' +
      'fear of the unknown. There is no such thing as the unknown. Only ' +
      'things temporarily hidden, temporarily not understood.';
  ```
* Backticks can be used to inject variables into a string without concatenation:
  ```
  let greeting = `Hello, my name is ${fullName}.`;
  ```
  This is called __string interpolation__.
* Backticks can also be used to create long strings without concatentation:
  ```
  let quote = `The greatest danger facing us is ourselves, and irrational
      fear of the unknown. There is no such thing as the unknown. Only
      things temporarily hidden, temporarily not understood.`;
  ```
* A string's characters can be accessed by __index__, starting at zero:
  ```
  fullName[0];  // 'J'
  fullName[1];  // 'a'
  fullName[12]; // 'k'
  fullName[13]; // undefined
  ```
* Strings come with many useful properties and methods. Here are a few:
  ```
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

### Functions

* A __function__ is a reusable block of code.
* A function can accept one or more input values, called its __arguments__ or __parameters__.
* A function can only return one output value.
* Here are some examples:
  ```
  // This function accepts no arguments and returns nothing
  function sayHello() {
      console.log('Hello, World!);
  }

  // This function accepts two arguments and returns their sum
  function add(a, b) {
      return a + b;
  }
  ```
* Functions are __called__ or __invoked__ by name, like this:
  ```
  sayHello(); // undefined
  add(2, 3);  // 5
  ```
* When a function is called with arguments, we say the arguments are __passed__ to the function.
* A function without a name is called an __anonymous function__.
* Here are some examples of anonymous functions:
  ```
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
  ```
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

### Arrays

* An __array__ is a list of values enclosed in square brackets ([]) and separated by commas.
* Here are some examples:
  ```
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
  ```
  fruits[0]; // 'Apple'
  fruits[1]; // 'Banana'
  fruits[2]; // 'Orange'
  fruits[3]; // undefined
  ```
* Arrays come with many useful properties and methods. Here are a few:
  ```
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
  ```
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
  ```
  // This method returns a new array containing the items from the original and
  // its arguments
  fruits.concat(['Lemon', 'Lime']); // ['Apple', 'Banana', 'Orange', 'Lemon', 'Lime']
  fruits;                           // ['Apple', 'Banana', 'Orange']

  // This method returns a new array containing the reversed items from the
  // original
  fruits.toReversed(); // ['Orange', 'Banana', 'Apple'];
  fruits;              // ['Apple', 'Banana', 'Orange'];

  // This method returns a new array containing the sorted items from the original
  fruits.toSorted(); // ['Apple', 'Banana', 'Orange']
  fruits;            // ['Apple', 'Banana', 'Orange']
  ```
* Some methods require a function argument, which is called once for each item with the item as its argument:
  ```
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
  fibonacci.map(item => item * 2);
  // [2, 4, 6, 10, 16, 22];

  // This method doesn't return anything, it just calls the function argument
  // for each item
  fibonacci.forEach(item => console.log(item));
  ```

### Objects

* An __object__ is like an array, except its values are named and are called its __properties__.
* Here's an example:
  ```
  let dog = {
      greeting: 'Arf!',
      legs: 4,
      isMammal: true,
      sayHello: function () {
          console.log(this.greeting);
      }
  };
  ```
* An object's properties can be accessed using dot notation or bracket notation:
  ```
  // Dot notation
  dog.greeting; // 'Arf!'
  dog.sayHello(); // undefined

  // Bracket notation
  dog['greeting']; // 'Arf!'
  dog['sayHello'](); // undefined
  ```

### Control structures

* Use an `if...else` statement to run some code only if a condition is `true`:
  ```
  if (x > 0) {
      console.log('x is positive');
  }
  ```
  Add an `else` clause to run some code if a condition is `false`:
  ```
  if (x > 0) {
      console.log('x is positive');
  } else {
      console.log('x is not positive');
  }
  ```
  Additional conditions can be tested with `else if` clauses:
  ```
  if (x > 0) {
      console.log('x is positive');
  } else if (x < 0) {
      console.log('x is negative');
  } else {
      console.log('x is zero');
  }
  ```
* Use a `for` statement to run some code a limited number of times:
  ```
  for (let i = 0; i < 5; i++) {
      console.log(i);
  }
  ```
* Use a `for...of` statement to run some code for each item in an array:
  ```
  for (const item of items) {
      console.log(item);
  }
  ```
* Use a `while` statement to run some code until a condition is `false`:
  ```
  while (x > 0) {
      console.log(`x is positive`);
      x--;
  }
  ```
* A `do...while` statement is similar to a `while` statement, except the code will always run at least once:
  ```
  do {
      console.log(`x is positive`);
      x--;
  } while (x > 0);
  ```

### Adding scripts to a web page

* Like styles, scripts can be __inline__ or __external__ to the web page.
* Unlike styles, both inline and external scripts are added with the `script` tag.
* Also unlike styles, the `script` tag can be added to the `head` or `body` of a web page, though right before the closing `body` tag is ideal for accessibility and performance reasons.
* Here's an example of an inline script:
  ```
  <script>
      console.log('Hello, World!');
  </script>
  ```
* Here's an example of an external script:
  ```
  <script src="script.js"></script>
  ```
  In order for this example to work, the `script.js` file must be located in the same directory as the HTML file that links to it.
