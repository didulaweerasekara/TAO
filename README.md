# TAO: Thrive in Life & Career

The website of **TAO**, a professional development institution for communication, leadership, negotiation and influence.

Plain HTML, CSS and JavaScript. No framework, no build step. It deploys to GitHub Pages as it is.

Live address: <https://didulaweerasekara.github.io/TAO/>

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home |
| `about.html` | Why TAO exists, the name, philosophy and approach |
| `programmes.html` | Full programme catalogue (individuals and organisations) |
| `events.html` | Upcoming and recent workshops |
| `facilitators.html` | Facilitator profiles |
| `organisations.html` | For Organisations |
| `insights.html` + `insights/*.html` | Evergreen articles |
| `newsletter.html` | TAO Newsletter: current issue, archive, subscribe |
| `contact.html` | Enquiry form |
| `privacy.html`, `terms.html` | Legal |
| `404.html` | Not-found page (uses absolute `/TAO/` paths) |

`team.html`, `blog.html`, `testimonials.html` and `blog/*.html` are redirects from the old template addresses.

## Where to edit things

| To change… | Edit |
| --- | --- |
| Email, phone, WhatsApp, location, social links, form endpoint | `assets/js/config.js` |
| Facilitators, programmes, events, newsletter issues, insights list, testimonials, photographs | `assets/js/content.js` |
| Navigation and footer | `assets/js/site.js` (the `NAV` list and footer block) |
| Colours and typography | top of `assets/css/styles.css` (`:root`) |
| Page wording | the page's `.html` file |

`content.js` has instructions at the top. The short version:

- **Add a programme:** copy an object in `programmes`, give it a unique `id`. It appears in the catalogue, the contact form dropdown and on facilitator profiles automatically. `featured: true` puts it on the home page.
- **Add an event:** copy the commented example in `events` and set `status: "upcoming"`. When it has happened, change it to `"past"`, and it moves to *Recent workshops*.
- **Add a newsletter issue:** add a new object at the **top** of `newsletter`. The first issue is the current issue; older ones stay in the archive. Empty sections are hidden.
- **Add an insight:** copy an article in `insights/`, rename it, edit it, then add a matching entry at the top of `insights` in `content.js`.
- **Add a testimonial:** add `{ quote, name, role, programme }` to `testimonials`. The section is hidden until at least one exists. Publish only verified feedback, with permission.
- **Add a facilitator:** add an object to `facilitators` and portraits to `assets/img/photos/`.

## Photographs

Processed photos live in `assets/img/photos/` as `<name>-<width>.jpg` (two widths each, for responsive loading). The registry at the top of `content.js` maps each photo to its files, size and alt text. To replace a photo, save new files with the same names, or add new ones and update the registry.

Portraits are cropped 4:5; landscape photos are 4:3. Keep faces in the upper-middle of a portrait crop.

## Making the forms work

GitHub Pages cannot receive form submissions itself. Enquiries and newsletter sign-ups both use `formEndpoint` in `config.js`:

1. Create a free form at [formspree.io](https://formspree.io) and copy its endpoint (e.g. `https://formspree.io/f/abcdwxyz`).
2. Paste it into `formEndpoint`.

If `formEndpoint` is empty but `email` is set, forms open the visitor's email app instead. **Until one of the two is set, forms cannot deliver messages**. Set this before sharing the site widely.

## Publishing

The site is served by GitHub Pages from the `main` branch root. Push to `main` and it updates within a minute or two.

If you move to a custom domain, update `siteUrl` in `config.js`, the `canonical`/`og:` URLs in each page's `<head>`, and the `/TAO/` paths in `404.html`.

## Previewing locally

Open `index.html` in a browser, or run a small server in this folder:

```
python -m http.server 8000
```

then visit <http://localhost:8000>.
