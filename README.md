# SkillVault

A responsive, multi-page website for a fictional online learning platform. Built with plain **HTML, CSS and JavaScript** — no frameworks, no build step — as a first-year university project.

## Pages

| Page | What's on it |
| --- | --- |
| **Home** (`index.html`) | Hero section, course categories, popular courses, an interactive FAQ and a student testimonials section where visitors can add their own testimonial |
| **About** (`about.html`) | Achievements (courses, students, awards) and a team section with hover effects |
| **Courses** (`courses.html`) | Grid of 15 courses, from UI/UX Design to Public Speaking |
| **Contact** (`contact.html`) | Contact details, social links and a contact form |
| **Login** (`login.html`) | Standalone login / register / logout demo backed by `localStorage` |

## Features

- **Responsive layout:** desktop, tablet (≤ 1023px) and mobile (≤ 600px) breakpoints, built with CSS Grid and Flexbox
- **Mobile navigation:** hamburger menu that opens and closes the nav on small screens
- **Navbar on scroll:** the transparent navbar gets a solid background once you scroll
- **FAQ accordion:** click a question to expand it; the icon toggles between plus and minus
- **Add a testimonial:** form with regex validation (name, role, message length); new testimonials get a random avatar and can be deleted
- **Login demo:** register and log in with credentials stored in the browser's `localStorage`
- **Theming with CSS custom properties:** all colors and container widths are defined in `:root`

## Tech stack

- HTML5
- CSS3 (custom properties, Grid, Flexbox, media queries)
- Vanilla JavaScript (DOM manipulation, events, `localStorage`)
- [Unicons](https://iconscout.com/unicons) for icons
- [Inter](https://rsms.me/inter/) font

## Running locally

No installation is needed. Clone the repo and open `index.html` in a browser:

```bash
git clone <repo-url>
cd SkillVault
```

Or, to serve it over HTTP (e.g. with the VS Code *Live Server* extension, or Python):

```bash
python -m http.server 8000
# then open http://localhost:8000
```

Because the entry point is `index.html`, the site can also be deployed as-is to GitHub Pages, Netlify or any static host.

## Project structure

```
SkillVault/
├── index.html        # Home page
├── about.html
├── courses.html
├── contact.html
├── login.html        # Login / register demo
├── script.js         # Navbar, testimonials and FAQ logic (shared by all main pages)
├── login.js          # Login / register logic
├── login.css
├── CSS/
│   ├── style.css     # Global styles + home and courses pages
│   ├── about.css
│   └── contact.css
└── images/
```

## TODO

Areas for improvement:

- [ ] **Compress the images.** `images/` is about 70 MB; some team and avatar photos are 5–18 MB each (`tm5.jpg`, `tm4.jpg`, `tm1.jpg`, `avatar9.jpg`...). Resize them to around 400–800px wide and convert to WebP. This would massively speed up page loads.
- [ ] **Add `loading="lazy"`** to images below the fold (courses, team, testimonials).
- [x] **Link the login page from the site.** `login.html` isn't reachable from the navbar right now, and it uses its own separate styles.
- [ ] **Don't store plain-text passwords in `localStorage`.** The login is a front-end demo only. Either label it as a demo, or replace it with a real backend or auth provider.
- [ ] **Make the contact form actually send.** Right now it only reloads the page. Use a service like Formspree, or add a small backend, and show a success message.
- [ ] **Persist testimonials.** Added testimonials disappear on refresh; save them to `localStorage` (or a backend).
- [ ] **Fix "Learn More" links.** Every course links back to `courses.html`, and the Categories button and footer links point to `#`. Add course detail pages, or remove the buttons.
- [x] **Fix the mobile menu state on resize.** If you close the mobile menu and then widen the window, the desktop nav stays hidden because of the inline `display: none`. Toggle a CSS class instead of setting inline styles.
- [x] **Close the mobile menu when a link is clicked**, and highlight the active page in the navbar.
- [ ] **Avoid duplicated markup.** The navbar and footer are copy-pasted in every page. Consider a static site generator or a small templating step.
- [ ] **Tidy up the CSS.** `.testimonials__container` in `style.css` never matches the HTML class `testimonials__Container`. Also, `login.css` duplicates the `:root` variables from `style.css`.
- [ ] **Improve accessibility.** Use `<button>` elements for the FAQ questions (keyboard and screen-reader support), add `aria-expanded`, use descriptive `alt` text (e.g. `"Ethan Walker"` instead of `"tm1"`), and add `aria-label`s to the icon-only social links.
- [ ] **Allow non-ASCII names in testimonials.** The name regex rejects names like "Ștefan" or "José"; use `/^[\p{L}\s'-]{3,50}$/u`.
- [ ] **Write a unique meta description for each page.** They all share the same one right now, which is bad for SEO.

## Credits

Team member photos, avatars and course images are stock photos used for educational purposes. Illustrations are from [SVG Repo](https://www.svgrepo.com/).
