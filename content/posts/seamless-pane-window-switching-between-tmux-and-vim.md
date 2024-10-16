---
title: Seamless Pane-Window Switching Between Tmux and Vim
date: 2022-07-20T09:48:51-0600
description: Improve your workflow by saving a few keystrokes.
tags:
    - Computering
    - Nix
    - TIL
    - Tmux
    - Vim
---

I can't be arsed with an extra keystroke when switching between windows in vim, so I've had this in my vimrc for years:

```
" Move the cursor to the next window left/down/up/right
nnoremap <C-H> <C-W><C-H>
nnoremap <C-J> <C-W><C-J>
nnoremap <C-K> <C-W><C-K>
nnoremap <C-L> <C-W><C-L>
```

And because the arrow keys are a stretch, I have this in my tmux.conf:

```
# Select the next pane left/down/up/right
bind h selectp -L
bind j selectp -D
bind k selectp -U
bind l selectp -R
```

With this configuration, jumping out of vim into another tmux pane only requires one extra keystroke: the tmux prefix. Fortunately, [Vim Tmux Navigator](https://github.com/christoomey/vim-tmux-navigator) solves that problem. But it's a bit complicated and messy. Turns out all it requires is a tiny vimscript and a few relatively simple tmux bindings.

Here's the vimscript:

```
" Only load this plugin if running inside tmux
if empty($TMUX)
    finish
endif

function! NextWindow(direction)
    let l:win_num = winnr()
    execute "wincmd" a:direction

    " If the window number changed, then the command succeeded. Otherwise,
    " we're at an edge window and we'll let tmux handle it.
    if l:win_num != winnr()
        return
    endif

    let l:tmux_direction = tr(a:direction, 'hjkl', 'LDUR')
    call system('tmux select-pane -' . l:tmux_direction)
endfunction

nmap <silent> <C-H> :call NextWindow('h')<CR>
nmap <silent> <C-J> :call NextWindow('j')<CR>
nmap <silent> <C-K> :call NextWindow('k')<CR>
nmap <silent> <C-L> :call NextWindow('l')<CR>
```

The tmux bindings are a little tricky. At first, I tried this:

```
bind -n C-h if -F "#{==:#{pane_current_command},nvim}" "send C-h" "selectp -L"
```

That funky nested format is required for comparing strings in tmux commands. Other than that, it's pretty straightforward. The problem is this doesn't work if vim is used as a pager, is reading from stdin, or was started from a script. In those cases, `pane_current_command` might be bash, less, man, or whatever command was entered at the command line. Instead, we have to get a list of processes belonging to the terminal attached to the pane:

```
# If nvim is running in the foreground of the current pane, let it handle these
# keys. Otherwise, select the next pane left/down/up/right.
is_nvim="[ $(ps -o comm -t #{pane_tty} | tail -1) = nvim ]"

bind -n C-h if "$is_nvim" "send C-h" "selectp -L"
bind -n C-j if "$is_nvim" "send C-j" "selectp -D"
bind -n C-k if "$is_nvim" "send C-k" "selectp -U"
bind -n C-l if "$is_nvim" "send C-l" "selectp -R"
```

Obviously, if you don't use nvim, just change the bindings accordingly.

Finally, if you use emacs-style shortcuts in your shell, you might prefer to use the alt key instead of the control key to keep the default behavior of `Ctrl-H` (backspace) and `Ctrl-K` (delete from cursor to end of line). In that case, just replace `C-` with `M-` in the vim mappings and the tmux bindings. Also, make sure to use lowercase `-h`, `-j`, etc. in the vim mappings due to how vim/xterm handles the alt key.

