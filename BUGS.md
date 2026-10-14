# Bugs

## Found

## Fixed

- **script.js: multi-line testimonial messages are rejected.** Fixed in `071b966`.
  `messageRegex = /^.{10,300}$/` uses `.`, which doesn't match line breaks, so any
  message typed on more than one line fails with "The message must be between
  10 and 300 characters", even when it is the right length.
  Repro: on the home page, enter a valid name and role, type "Great course." then
  Enter then "Loved it." in the message box, and click Add.

- **login.js: "Register here" / "Login here" links add `#` to the URL.** Fixed in `f71a65b`.
  `showRegister` and `showLogin` are click handlers on `<a href="#">` but never
  call `preventDefault()`, so the browser follows the `#` link: the URL becomes
  `login.html#` and the page jumps to the top.
  Repro: open `login.html`, click "Register here"; the address bar ends in `#`.

## Suggestions

- **Allow non-ASCII roles too.** `roleRegex` in `script.js` is still
  `/^[a-zA-Z\s]{2,30}$/`, so roles like "Développeur" or "Diseñadora" are
  rejected. The TODO only covered names; the same `\p{L}` fix would work here.
- **Normalize testimonial input to NFC before validating.** `\p{L}` doesn't match
  combining marks, so a name typed in decomposed form (e.g. "S" + combining comma
  for "Ș", which some keyboards and copy-paste sources produce) is rejected.
  `name.normalize('NFC')` before the regex test would fix it.
