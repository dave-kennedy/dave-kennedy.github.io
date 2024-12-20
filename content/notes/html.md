---
title: HTML
---

[[toc]]

* All web pages begin with an HTML file, i.e. a plain text file ending in `.html`.
* HTML files can be edited in any plain text editor, like Notepad on Windows or TextEdit on Mac, or in an IDE, like IntelliJ or VS Code.
* HTML stands for HyperText Markup Language and is often referred to simply as __markup__.
* When you open an HTML file in your web browser, the browser parses (reads) its contents and renders (draws) it on the screen.
* The browser's __address bar__ displays the URL of the file, which is the location where the file is stored.
    * If the file is stored on your hard drive, the URL will begin with `file:///`.
    * If the file is stored on another computer, the URL will most likely begin with `http://` or `https://`.
* HTML consists of __directives__, __comments__, and __nodes__.

## Directives

* A __directive__ looks like this: `<!doctype html>`
* Directives aren't rendered. They're just instructions for the browser.
* The `doctype` directive tells the browser to use the latest version of HTML.
* The first line of every HTML file must contain the `doctype` directive and nothing else.

## Comments

* A __comment__ is a note left by a developer for others or for themselves and is ignored by the browser.
* Here's an example of a single-line comment: `<!-- This is a comment -->`
* Here's an example of a multi-line comment:
  ```html
  <!--
  The greatest danger facing us is ourselves, and irrational
  fear of the unknown. There is no such thing as the unknown. Only
  things temporarily hidden, temporarily not understood.
  -->
  ```

## Nodes and elements

* Almost everything else in an HTML file is a __node__.
* There are two primary types of nodes: __text__ and __elements__.
* There's not much to say about text nodes. This is one of them.
* An __element__ looks like this: `<div>...</div>`
* In the example above, `<div>` is the __opening tag__ and `</div>` is the __closing tag__. The `...` between the tags is just a placeholder.
    * Notice the forward slash (/) at the beginning of the closing tag.
* Most elements can have one or more __child nodes__. Anything inserted between the opening and closing tag is a __descendant node__.
* Every node has a __parent element__ and can have many __ancestor elements__.
* Here's an example of an element with children:
  ```html
  <div>
      <p>
          This is some text.
      </p>
  </div>
  ```
  In this example:
    * The `div` element is the parent of the `p` element and an ancestor of the text node.
    * The `p` element is the parent of the text node and the only child of the `div` element.
    * The text node is the only child of the `p` element and a descendant of the `div` element.
    * Notice each child node is indented one additional level from its parent. This isn't strictly required but makes it easier for developers to visualize the hierarchy of nodes. This hierarchy is sometimes called a __tree__.
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

## A complete example

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
  ```html
  <!doctype html>
  <html>
      <head>
          <meta charset="utf-8" />
          <title>My Notes</title>
      </head>
      <body>
          <h1>My Notes</h1>
          <p>HTML is neat!</p>
          <p>
              Answers to all your questions can be found
              <a href="https://developer.mozilla.org/">here</a>.
          </p>
      </body>
  </html>
  ```

