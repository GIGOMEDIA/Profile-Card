# Profile Card — HNG Stage 1

This is a small, accessible, responsive Profile Card built with plain HTML, CSS, and vanilla JavaScript. All visible elements include the required `data-testid` attributes for automated testing.

Files
- `index.html` — main page with semantic markup and required data-testids
- `style.css` — responsive styles (mobile-first)
- `script.js` — updates current time (ms) and provides avatar update behavior

How to run locally
1. Open `index.html` in your browser (double-click or use Live Server).

Notes for submission
- All required data-testids are present: `test-profile-card`, `test-user-name`, `test-user-bio`, `test-user-time`, `test-user-avatar`, `test-user-social-links`, `test-user-social-twitter`, `test-user-social-github`, `test-user-social-linkedin`, `test-user-hobbies`, `test-user-dislikes`.
- Social links open in a new tab with `rel="noopener noreferrer"`.
- The `test-user-time` shows `Date.now()` and updates every 1s.
- Avatar can be updated by URL or image upload; uploaded images use an object URL.

Hosting
- Deploy the repository to GitHub Pages or Netlify by connecting the repo and publishing the root.
