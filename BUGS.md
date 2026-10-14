# Bugs

## Found

- **script.js: multi-line testimonial messages are rejected.**
  `messageRegex = /^.{10,300}$/` uses `.`, which doesn't match line breaks, so any
  message typed on more than one line fails with "The message must be between
  10 and 300 characters", even when it is the right length.
  Repro: on the home page, enter a valid name and role, type "Great course." then
  Enter then "Loved it." in the message box, and click Add.

## Fixed

- **login.js: "Register here" / "Login here" links add `#` to the URL.** Fixed in `f71a65b`.
  `showRegister` and `showLogin` are click handlers on `<a href="#">` but never
  call `preventDefault()`, so the browser follows the `#` link: the URL becomes
  `login.html#` and the page jumps to the top.
  Repro: open `login.html`, click "Register here"; the address bar ends in `#`.

## Suggestions
