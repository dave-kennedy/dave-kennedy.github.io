---
title: Better Vim-Style Key Bindings in Tmux
date: 2022-07-14T20:36:34-0600
tags:
    - Computering
    - Nix
    - TIL
    - Tmux
    - Vim
---

I was confused by tmux's "vi-style" key bindings in copy mode, which don't behave at all like I expected: `Space` starts the selection (like `v` in vim), `Enter` copies and clears the selection (like `y`), while `Ctrl-V` toggles block selection mode but doesn't start the selection.

![overload.gif](overload.gif)

Fortunately, tmux supports braces and conditionals in key bindings. This confused me too because there are two constructs: the `%if` keyword and the `if-shell` command.

`%if` conditions are only evaluated once when the config is loaded. This binding doesn't work because `#{selection_present}` evaluates to `0` when tmux starts:

```
bind-key -T copy-mode C-v {
    %if "#{selection_present}"
    display-message yes
    %else
    display-message no
    %endif
}
```

On the other hand, the `if-shell` command in this binding will be called every time `<Ctrl-v>` is pressed:

```
bind-key -T copy-mode C-v {
    if-shell -F "#{selection_present}" {
        display-message yes
    } {
        display-message no
    }
}
```

The `-F` flag tells tmux to evaluate the condition without calling an external shell command, as the name implies. Otherwise it would try to run `0` or `1` in the shell and fail.

In addition, `if-shell` commands can be nested, so we can mimic vim's behavior with the following config:

```
set-option -g mode-keys vi

bind-key -T copy-mode-vi v {
    if-shell -F "#{selection_present}" {
        if-shell -F "#{rectangle_toggle}" {
            send-keys -X rectangle-off
        } {
            send-keys -X clear-selection
        }
    } {
        send-keys -X begin-selection
    }
}

bind-key -T copy-mode-vi C-v {
    if-shell -F "#{selection_present}" {
        if-shell -F "#{rectangle_toggle}" {
            send-keys -X clear-selection
        } {
            send-keys -X rectangle-on
        }
    } {
        send-keys -X begin-selection
        send-keys -X rectangle-on
    }
}

bind-key -T copy-mode-vi y send-keys -X copy-selection-and-cancel
```

