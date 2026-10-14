# Bugs

## Found

- **login.js: "Register here" / "Login here" links add `#` to the URL.**
  `showRegister` and `showLogin` are click handlers on `<a href="#">` but never
  call `preventDefault()`, so the browser follows the `#` link: the URL becomes
  `login.html#` and the page jumps to the top.
  Repro: open `login.html`, click "Register here"; the address bar ends in `#`.

## Fixed

## Suggestions
