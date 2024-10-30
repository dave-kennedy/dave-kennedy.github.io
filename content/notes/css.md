---
title: CSS
---

[[toc]]

* CSS is used to modify the style (appearance) of elements on the page.
* A CSS file, also called a __stylesheet__, is a plain text file ending in `.css`.
* Like HTML files, stylesheets can be edited in any plain text editor or in an IDE.
* CSS stands for Cascading Style Sheets, which refers to the order in which styles are applied to elements and is outside the scope of this brief intro.
* CSS consists of __comments__, __rules__, __selectors__, and __media queries__.

## Adding styles to a web page

* The `style` attribute can be used to modify the style of a single element, like so: `<div style="color: red;">Warning!</div>`
* Excessive use of the `style` attribute can make your HTML difficult to read and modify. For this reason, it's better to use a stylesheet.
* Stylesheets must be added to the `head` element and can be __inline__ or __external__.
* An inline stylesheet is added with the `style` element:
  ```html
  <head>
      <meta charset="utf-8" />
      <title>My Notes</title>
      <style>
          ...
      </style>
  </head>
  ```
  The `...` between the `style` tags is just a placeholder. On a real web page, it would be replaced with CSS code.
* An external stylesheet is added with the `link` element:
  ```html
  <head>
      <meta charset="utf-8" />
      <title>My Notes</title>
      <link href="style.css" rel="stylesheet" />
  </head>
  ```
  In order for this example to work, the `style.css` file must be located in the same directory as the HTML file that references it.

## Comments

* Like in HTML, __comments__ in CSS are intended for developers and are ignored by the browser.
* Here's an example of a single-line comment: `/* This is a comment */`
* Here's an example of a multi-line comment:
  ```css
  /*
  The greatest danger facing us is ourselves, and irrational
  fear of the unknown. There is no such thing as the unknown. Only
  things temporarily hidden, temporarily not understood.
  */
  ```

## Rules

* A __rule__ looks like this: `color: red;`
* In the example above, the `color` __property__ is assigned a __value__ of `red`.
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

## Selectors

* A __selector__ looks like this: `body > div:first-child`
* The example above would match the first `div` element that is a child of the `body` element.
* Selectors group one or more rules and apply them to all elements that match, like this:
  ```css
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
* See [CSS selectors and combinators](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors/Selectors_and_combinators) for more info.

### Pseudo-classes

* When added to a selector, a __pseudo-class__ selects elements based on their state. Here are some examples:
    * The `a` element that is under the mouse pointer: `a:hover`
        * Keep in mind this doesn't work on devices without a mouse, including most phones and tablets.
    * The `a` element that is selected by clicking, tapping, or pressing the Tab key (until another element is selected): `a:focus`
    * The `a` element that is activated by clicking or tapping (until the mouse button or the user's finger is released): `a:active`
* See [Pseudo-classes](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes) for more info.

## Media queries

* A __media query__ allows us to apply styles only on certain device types or only when certain device features are present.
* In this example, the rules are only applied when the page is printed (a device type):
  ```css
  @media print {
      body {
          background-color: white;
          color: black;
      }
  }
  ```
* In this example, all `span` elements that are children of a `header` element would be displayed vertically (stacked) on screens smaller than 800 pixels wide (a device feature):
  ```css
  @media (max-width: 800px) {
      header > span {
          display: block;
      }
  }
  ```
* In this example, all `div` elements that are children of a `footer` element would be displayed horizontally (side-by-side) on screens larger than 800 pixels wide (a device feature):
  ```css
  @media (min-width: 800px) {
      footer > div {
          display: inline;
      }
  }
  ```
* See [Using media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries) for more info

