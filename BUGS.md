# Bugs

## Found

## Fixed

- **about.html: footer social links announce the wrong name.** Fixed in `6d8a6d5`. Introduced by me
  in `eaf6147`: the script that added `aria-label`s to the team members' social
  links also matched the footer (it came after the last team card), so screen
  readers announce the footer icons as "Alexander Pierce on Facebook" etc.
  instead of "SkillVault on Facebook".
  Repro: on `about.html`, inspect the footer social links, or tab to them with a
  screen reader on.

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
- **Restore keyboard focus outlines site-wide.** The reset in `CSS/style.css`
  (`* { outline: 0; }`) removes the focus ring from every link, button and input,
  so keyboard users can't see where they are. I only added a `:focus-visible`
  style for the new FAQ buttons; a global `:focus-visible` rule would fix the rest.
- **Add labels to form fields.** The testimonial, contact and login inputs only
  have placeholders, which screen readers don't reliably announce and which
  disappear while typing. Visible `<label>`s (or at least `aria-label`) would help.
- **Expose the mobile menu state.** The hamburger/close buttons could set
  `aria-expanded` and `aria-controls` on open/close, like the FAQ buttons now do.
- **Align the contact page breakpoint.** `CSS/contact.css` switches to the tablet
  layout at `max-width: 1024px`, while every other stylesheet uses `1023px`. At
  exactly 1024px the navbar is in desktop mode but the contact page is in tablet
  mode. It renders fine, it's just inconsistent.
