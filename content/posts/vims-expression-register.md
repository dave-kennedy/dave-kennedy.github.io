---
title: Vim's Expression Register
date: 2023-04-27T18:54:40-0600
description: Wrangling one of the beloved editor's most cryptic features.
tags:
    - Computering
    - Nix
    - TIL
    - Vim
---

Say you'd like to insert the current date and time into the document you're editing. Obviously, you could do it by hand. But what if you need to do it a lot? And what if you need it to be ISO format? That's kind of tedious and error prone. Instead, you can enter the following command:

```
:put = strftime('%FT%T%z')
```

This syntax is misleading. It looks like we're assigning the result of a function call to a variable named `put`. Actually, we're calling the `:put` command with two arguments: the name of a register and an expression. Normally, `:put x` would insert the contents of register `x` on a new line after the cursor. `:put =` is an exception in that it allows a second argument: an expression to be evaluated before it's inserted. After running this command, the expression register will contain the expression, not the result. You can see this for yourself with `:reg =`, which displays:

```
Type Name Content
  c  "=   strftime('%FT%T%z')
Press ENTER or type command to continue
```

A nice side-effect of this is you can re-evaluate the expression and insert the new result with `:put =`, leaving out the second argument. You're already thinking of ways to exploit this, aren't you?

Anyways, I can never remember this command. I'd much rather create a user-defined function with a blatantly obvious name:

```
function! InsertDate()
    put = strftime('%FT%T%z')
endfunction
```

I can call this function with `:call InsertDate()`, but I prefer to make it even easier with a user-defined command:

```
command! InsertDate call InsertDate()
```

This way, I can just enter `:InsertDate`.

Now, say you'd like to insert the date and time on the *current* line after the cursor instead of on a *new* line. The `:put` command only works "linewise", meaning it can only insert text on a new line, and there's no alternative command that works like `:put` that is "charwise." You can use the normal mapping `"xp` to insert the contents of register `x` on the current line after the cursor, but `"=p` doesn't insert anything. Instead, it prompts you to enter an expression. So you type `"=strftime('%FT%T%z')` and hit the Enter key and -- what happened? Turns out this is just another way to set the contents of the expression register. To insert the result of the expression, use the normal mapping `p` to insert the contents of the unnamed register, which contains the result of the expression until you use it, at which point its contents are replaced by whatever was there before. If you want to insert the result of the expression again, you have to type `"=`, followed by the Enter key, followed by `p`. This crazy behavior is undocumented as far as I can tell.

Whatever. This is why we created a function, so we don't have to jump through all these inane hoops every time we want to insert the date and time:

```
function! InsertDate()
    normal "=strftime('%FT%T%z')^Mp
endfunction
```

This technically works but it contains a literal carriage return character. The `^M` is a single character, not caret followed by M, which you can enter in insert mode with `Ctrl-V` followed by the Enter key. Control characters don't always play nice with other programs -- I had to use a caret followed by M to display it correctly in the browser. You can replace it with the string `<CR>`, which vim interprets as the Enter key. But the `:normal` command doesn't recognize special characters like `<CR>` or `<Esc>`, so we have to wrap the whole line in the `:execute` command:

```
function! InsertDate()
    execute "normal \"=strftime('%FT%T%z')\<CR>p"
endfunction
```

Make sure to escape the double quote in the middle of the command *and* the `<CR>`. Clear as mud, right?

I started translating this to Lua, hoping it would simplify things. While it's arguably easier to understand, it's also quite verbose:

```
function insert_date()
  local pos = vim.api.nvim_win_get_cursor(0)[2]
  local line = vim.api.nvim_get_current_line()
  local new_line = line:sub(0, pos) .. os.date('%FT%T%z') .. line:sub(pos + 1)
  vim.api.nvim_set_current_line(new_line)
end
```

What I really want is something like this:

```
function insert_date()
    vim.buffer.insert(os.date('%FT%T%z'))
end
```

I love the idea of an editor that's easy to program and customize, but it often requires a lot more effort than most users are willing to muster. When I'm writing and I need to insert the current date and time, I don't want to think about escape sequences, ex-commands, normal mode, special registers, etc. Whatever efficiency I gained from this exercise is eclipsed by the time I spent poring over documentation and help forums (not to mention writing this article). It might be worth the effort if I could apply what I learned here elsewhere, but I know I'm in for another learning curve the next time I'm tempted to extend my favorite editor.

Vim is so full of idiosyncrasies like this, I could turn this post into a series. Maybe I will. Then again, maybe I'm done with vim.

