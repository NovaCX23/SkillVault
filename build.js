// ======================= BUILD =======================
//
// Copies the shared navbar and footer from partials/ into every page.
//
// In each .html page, a shared block sits between two markers:
//
//     <!-- @include nav -->
//     ...generated from partials/nav.html, don't edit here...
//     <!-- @end nav -->
//
// Edit the partial, then run:  node build.js
//
// The pages stay plain HTML (no build output folder), so the site still
// works when opened directly or deployed as-is to any static host.
// No dependencies: only Node's built-in modules.

const fs = require('fs');
const path = require('path');

const root = __dirname;
const partialsDir = path.join(root, 'partials');
const markerRegex = /^([ \t]*)<!-- @include ([\w-]+) -->\r?\n[\s\S]*?^[ \t]*<!-- @end \2 -->/gm;

const pages = fs.readdirSync(root).filter(file => file.endsWith('.html'));
let updated = 0;

for (const page of pages) {
    const filePath = path.join(root, page);
    const original = fs.readFileSync(filePath, 'utf8');
    // Keep each file's existing line endings
    const eol = original.includes('\r\n') ? '\r\n' : '\n';

    const result = original.replace(markerRegex, (match, indent, name) => {
        const partialPath = path.join(partialsDir, `${name}.html`);
        if (!fs.existsSync(partialPath)) {
            throw new Error(`${page}: no partial found for "@include ${name}" (expected partials/${name}.html)`);
        }

        // Indent the partial to match the marker
        const body = fs.readFileSync(partialPath, 'utf8')
            .replace(/\r\n/g, '\n')
            .trimEnd()
            .split('\n')
            .map(line => (line ? indent + line : line))
            .join(eol);

        return `${indent}<!-- @include ${name} -->${eol}${body}${eol}${indent}<!-- @end ${name} -->`;
    });

    if (result !== original) {
        fs.writeFileSync(filePath, result);
        updated++;
        console.log(`updated ${page}`);
    }
}

console.log(`Done: ${updated} of ${pages.length} pages updated.`);
