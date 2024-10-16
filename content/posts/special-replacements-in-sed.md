---
title: Special Replacements in Sed
date: 2022-07-14T16:15:58-0600
description: Watch out for the ampersand in your sed commands.
tags:
    - Computering
    - Nix
    - Sed
    - TIL
---

I'm exploring a bunch of data in Java. The debugger in IntelliJ is powerful, but I find it much easier to export the data to JSON and use Python. I used GSON to export the data, but the resulting files were full of stuff like this:

```
"expression": "\u0026sum\u0026 ( ~input~ ) \u003e 0"
```

I recognized those as unicode escape sequences but didn't know which characters they represented off the top of my head. Typing `<Ctrl-V>u0026` into vim inserted an ampersand. Then I turned to sed to fix up the files:

```
$ sed -i 's/\u0026/&/g' data.json
```

Which didn't work. Turns out an ampersand means something special to sed:

> The replacement may contain the special character & to refer to that portion of the pattern space which matched, and the special escapes \1 through \9 to refer to the corresponding matching sub-expressions in the regexp.

I knew `\1` through `\9` referred to capturing groups but the `&` thing surprised me.

The solution is simply to escape the ampersand. However, because `\u` also means something special (uppercase, I guess), it also has to be escaped:

```
$ sed -i 's/\\u0026/\&/g' data.json
```

Turns out awk treats `&` in replacements the same way. Go figure.

Thanks goes once again to [Gilles](https://unix.stackexchange.com/a/296732), whose infinite wisdom has helped me on countless occasions.

The sed manual is available [here](https://www.gnu.org/software/sed/manual/sed.html) or with `info sed`. `man sed` is lacking in comparison.

