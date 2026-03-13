# Pacific Coast Roasters — Shopify Theme

A full fork of [Shopify Dawn](https://github.com/Shopify/dawn) customized for Pacific Coast Roasters.
All PCR sections, snippets, assets, and template JSON are committed directly to this repo.

**Deadline:** Sunday, March 15, 2026
**Store:** pacificcoastroasters.com · 10 Hangar Way, Watsonville, CA 95076

---

## Local development

Prerequisites: [Node.js](https://nodejs.org/) v18+, [Shopify CLI](https://shopify.dev/docs/themes/tools/cli) v3+

```bash
# Install Shopify CLI (if not already installed)
npm install -g @shopify/cli @shopify/theme

# Authenticate with the store
shopify auth login --store pacificcoastroasters.myshopify.com

# Start local dev server (live preview in browser)
shopify theme dev --store pacificcoastroasters.myshopify.com
```

## Deploy to Shopify

```bash
# Push directly to the store (creates/updates a theme)
shopify theme push --store pacificcoastroasters.myshopify.com

# Or package as a zip for manual upload
shopify theme package
# Then: Shopify admin → Online Store → Themes → Add theme → Upload zip
```

---

## PCR custom files

### Sections

| File | Used on | What it does |
|------|---------|-------------|
| `sections/pcr-header.liquid` | All pages (via `layout/theme.liquid`) | Announcement bar, sticky nav, mobile menu overlay |
| `sections/pcr-hero.liquid` | Homepage | Full-bleed hero, white content box, 3 CTA buttons |
| `sections/pcr-trust-bar.liquid` | Homepage | Trust signals bar (icon + text blocks) |
| `sections/pcr-featured-products.liquid` | Homepage | 4-col grid: 3 products + subscription CTA |
| `sections/pcr-memorial.liquid` | Homepage, Our Story | Mike Gobel story — video + text two-column |
| `sections/pcr-social-proof.liquid` | Homepage | Stars + review cards + Instagram photo grid |
| `sections/pcr-collection-hero.liquid` | Collection pages | Collection title, description, product count, hero image |
| `sections/pcr-product.liquid` | Product pages | Gallery, roast indicator, flavor pills, variant selector, ATC |
| `sections/pcr-wholesale.liquid` | Wholesale page | Full schema-driven wholesale marketing page |

### Snippets

| File | What it does |
|------|-------------|
| `snippets/pcr-card-product.liquid` | Product card: roast badge, flavor pills, variant selector, ATC |
| `snippets/wholesale-form.liquid` | Wholesale inquiry form (contact form, routed to store email) |
| `snippets/roast-indicator.liquid` | 5-dot roast scale (Light ○○●○○ Dark) |

### Assets

| File | What it does |
|------|-------------|
| `assets/pcr-custom.css` | All brand tokens, layout overrides, component styles |
| `assets/pcr-cards.js` | Variant selector: updates price + hidden input on size change |

### Templates (pre-configured)

| Template | Sections |
|----------|---------|
| `templates/index.json` | pcr-hero → pcr-trust-bar → pcr-featured-products → pcr-memorial → pcr-social-proof |
| `templates/collection.json` | pcr-collection-hero → main-collection-product-grid |
| `templates/product.json` | pcr-product → related-products |
| `templates/page.wholesale.json` | pcr-wholesale (fully populated with content) |
| `templates/page.our-story.json` | pcr-memorial → our-values multicolumn → farmers-market band |
| `templates/page.brew-guides.json` | Standard page |
| `templates/page.contact.json` | Standard contact form page |

---

## Brand tokens (in `assets/pcr-custom.css`)

| Variable | Value | Usage |
|----------|-------|-------|
| `--pcr-gold` | `#EBB826` | Heritage Gold — promo banners, secondary buttons |
| `--pcr-black` | `#111111` | Roaster Black — primary text, buttons, borders |
| `--pcr-red` | `#E3342F` | Crimson Red — sale tags only |
| `--pcr-blue` | `#2A4365` | Pacific Blue — link hover, nav interactive states |
| `--pcr-white` | `#FDFDFB` | Canvas White — page background |
| `--pcr-font-heading` | Arvo / Rokkitt / Zilla Slab | Bold, uppercase for section headers |
| `--pcr-font-body` | Work Sans / Assistant / Inter | |

---

## Shopify admin setup checklist

Do this before pushing the theme live. All steps are in the Shopify admin.

### Products
- [ ] Create metafield: **Flavor Notes** — namespace `custom`, key `flavor_notes`, type: Single line text, List of values
- [ ] Create metafield: **Roast Level** — namespace `custom`, key `roast_level`, type: Integer (1–5)
- [ ] Populate all 7 products with flavor notes, roast level, and size variants
- [ ] Set product **Vendor** field = roast name (e.g. "Medium Roast") as fallback display

### Collections
- [ ] `best-sellers` — Mike's Blend, Rise & Gr!nd, Shadow Work
- [ ] `exotics` — Peaberry, Pinkerton, Tanzania
- [ ] All products available at `/collections/all`

### Pages
- [ ] **Wholesale** — handle `wholesale`, template `page.wholesale`
- [ ] **Our Story** — handle `our-story`, template `page.our-story`
- [ ] **Brew Guides** — handle `brew-guides`, template `page.brew-guides`
- [ ] **Contact Us** — handle `contact-us`, template `page.contact`
- [ ] **FAQ & Shipping** — handle `faq`, standard page template

### Navigation
- [ ] **Main menu** (handle `main-menu`): Best Sellers · Exotics · Coffee · Subscription · Wholesale
- [ ] **Footer menu** (handle `footer`): FAQ & Shipping · Brew Guides · Wholesale · Contact Us
- [ ] Logo links home (no "Home" nav item needed)

### Theme settings (Online Store → Themes → Customize → Gear icon)
- [ ] Upload logo (SVG or 2x PNG, transparent background)
- [ ] Colors — Scheme 1: bg `#FDFDFB`, text `#111111`, solid button `#111111`/white
- [ ] Colors — Scheme 2: bg `#EBB826`, text `#111111` (gold accent sections)
- [ ] Colors — Scheme 3: bg `#111111`, text `#FFFFFF` (footer)
- [ ] Typography: heading = Arvo, body = Work Sans
- [ ] Buttons: corner radius 0px
- [ ] Product cards: border 1px, radius 0px, image padding 0px

### Notifications
- [ ] Settings → Notifications → Contact form — set delivery email for wholesale form submissions

---

## Staying in sync with Dawn upstream

```bash
git remote add upstream https://github.com/Shopify/dawn.git
git fetch upstream
git merge upstream/main  # resolve any conflicts in PCR files manually
```

---

## Editing content after launch

| What | Where |
|------|-------|
| Announcement bar text | Theme Editor → PCR Header settings |
| Hero image / copy / buttons | Theme Editor → PCR Hero settings |
| Featured products | Theme Editor → PCR Featured Products → Collection |
| Memorial story copy | Theme Editor → PCR Memorial Story settings |
| Review quotes / Instagram photos | Theme Editor → PCR Social Proof → blocks |
| Wholesale page content | Theme Editor → PCR Wholesale → section settings + blocks |
| Brand colors / fonts | Theme Editor → Gear icon → Colors / Typography |
| CSS token overrides | Edit `assets/pcr-custom.css`, then `shopify theme push` |
