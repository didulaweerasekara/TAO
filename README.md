# TAO website

A fast, dependency-free static website for **TAO — Thrive in Life & Career**.
Plain HTML, CSS and JavaScript: no build step, no framework, free to host on GitHub Pages.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home |
| `about.html` | About |
| `team.html` | Team profiles (click "View profile" for a full pop-up bio) |
| `testimonials.html` | Testimonials |
| `blog.html` + `blog/*.html` | Blog index and articles |
| `contact.html` | Contact details and enquiry form |
| `404.html` | Not-found page |

## First things to change

1. **Contact details, social links, form** → edit `assets/js/config.js`. The header, footer and Contact page all update from that one file.
2. **All sample content** (team names, testimonials, blog posts, About story) is placeholder text written to show the design. Replace it before going live. Search for `SAMPLE` in the HTML files to find each block.
3. **Accent colour** → change `--brass` (and `--brass-deep`) at the top of `assets/css/styles.css`.

## Adding your images

Drop files into these folders. Until an image exists, a branded placeholder is shown automatically — nothing breaks.

| Folder / file | What | Suggested size |
| --- | --- | --- |
| `assets/img/team/member-1.jpg` … `member-4.jpg` | Team portraits (4:5) | 800 × 1000 px |
| `assets/img/blog/<article-name>.jpg` | Blog covers, same name as the article page | 1600 × 1000 px |
| `assets/img/testimonials/client-1.jpg` … | Optional client headshots (square) | 200 × 200 px |
| `assets/img/about-workshop.jpg` | Photo on the About page | 1400 × 1120 px |

Team and blog photos are shown in greyscale and turn to colour on hover, so photos from different sources look consistent. To keep them in colour, remove `grayscale(1) contrast(1.05)` from the `.photo img, .media--tone img` rule in `styles.css`.

The logo files in `assets/img/` were generated from your original `Logo.png`:
`logo-white.png` / `logo-black.png` (full lockup), `mark-white.png` / `mark-black.png` (TAO only), favicons and `og-image.png` (social sharing card).

## Adding a team member

Open `team.html`, copy one `<article class="member …">` block, give it a new `id` (e.g. `member-5`) and edit the text. Save the portrait as `assets/img/team/member-5.jpg`.

## Adding a blog post

1. Copy `blog/executive-presence.html` to `blog/your-post-name.html` and edit the title, date, category and text.
2. Add a matching `<a class="post-card …">` block in `blog.html` (and, optionally, `index.html`).
3. Cover image: `assets/img/blog/your-post-name.jpg`.

## Making the contact form work

GitHub Pages cannot receive form submissions itself. Two options:

- **Free form service (recommended):** create a form at [formspree.io](https://formspree.io), copy its endpoint URL (looks like `https://formspree.io/f/abcdwxyz`) and paste it into `formEndpoint` in `assets/js/config.js`.
- **Nothing to set up:** leave `formEndpoint` empty and the form opens the visitor's email app with the message pre-filled.

## Publishing on GitHub Pages

1. Create a GitHub repository and upload everything in this folder (drag-and-drop on github.com works, or use git).
2. In the repository: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, choose `main` and `/ (root)`, then Save.
3. After a minute the site is live at `https://<username>.github.io/<repository>/`.
   (Name the repository `<username>.github.io` to publish at the root address instead.)

**Custom domain:** in Settings → Pages, enter your domain and follow GitHub's DNS instructions.

### Notes for after you have a real web address

- `404.html` uses root-relative paths (`/assets/...`). It works on a custom domain or a `<username>.github.io` repository. If the site lives at `<username>.github.io/<repository>/`, change `/assets/` to `/<repository>/assets/` and `href="/"` to `href="/<repository>/"` in that file.
- Social-sharing previews (`og:image`) work best with an absolute URL. Once you know your address, change `content="assets/img/og-image.png"` to e.g. `content="https://yourdomain.com/assets/img/og-image.png"` in each page's `<head>`.

## Previewing locally

Open `index.html` in a browser, or for the most accurate result run a tiny server in this folder:

```
python -m http.server 8000
```

then visit <http://localhost:8000>.
