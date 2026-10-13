# MaC Foundation Website

Official website for **Make A Change (MaC) Foundation** — "Empowering Change Through Every Step."

Plain HTML/CSS/JS, no build step. Works directly on GitHub Pages.

## Pages
- `index.html` — Home
- `about.html` — About / how we work
- `programs.html` — The five pillars
- `get-involved.html` — Benefits + volunteer registration
- `contact.html` — Email + social links
- `donate.html` — Donation info, QR placeholder, and bank details

## Launching on GitHub Pages
1. Create a new repository on GitHub (e.g. `mac-foundation-website`).
2. Upload all files in this folder, keeping the `assets/` folder structure intact.
3. Go to the repo's **Settings → Pages**.
4. Under "Build and deployment", set **Source: Deploy from a branch**, branch: `main`, folder: `/ (root)`.
5. Save. GitHub will give you a live URL like `https://yourusername.github.io/mac-foundation-website/` within a minute or two.

## Editing content
- Text lives directly in each `.html` file — open in any text editor.
- Colors, fonts, and spacing live in `assets/style.css` (see the `:root` variables at the top).
- The logo is `assets/logo.jpg` — replace this file (keep the same name) to swap it everywhere.
- Social links are in `contact.html`; the registration form link appears on `index.html`, `get-involved.html`, and `contact.html`.
- **Donate page:** open `donate.html` and replace the placeholder QR box (`.qr-box`) with an `<img>` tag pointing at your actual QR code image, and fill in the bank detail rows (account name, number, IFSC, UPI ID) which currently show "—".
