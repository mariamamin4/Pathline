# Chartwell Partners — Website Clone

## Features

### 1. Smart Sticky Navbar

- Shrinks from 80px to 60px after scrolling 50px
- Animated dropdown menus for Expertise and Services
- Mobile hamburger menu with full-screen slide-in panel
- Inline expanding search bar
- Back-to-top button appears after scrolling 400px
- Full dark mode support

---

### 2. Testimonials Carousel

- 3 client quotes with role attribution
- Auto-advances every 5 seconds
- Dot indicators and left/right arrow controls
- Clicking any control resets the autoplay timer
- Smooth slide-in CSS animation
- Full dark mode support

---

### 3. Newsletter Subscription

- Two-column layout: description text + email input
- HTML5 email validation with `required` attribute
- On submit: form hides and a success confirmation appears
- Responsive — stacks to single column on mobile
- Full dark mode support

---

### 4. Animated Counters

- Displays key stats: Years Experience, Clients Served, Placements/Year, Repeat Clients %
- Numbers animate from 0 to their target value when scrolled into view
- Triggered via `IntersectionObserver` — fires once per page load
- Full dark mode support

---

### 5. Contact Form with Validation

**Fields and rules:**

| Field | Required | Rule |
|---|---|---|
| First Name | Yes | Non-empty |
| Last Name | Yes | Non-empty |
| Email | Yes | Valid email format |
| Phone | No | 7–15 digits if provided |
| Password | Yes | Min 8 chars, 1 uppercase, 1 digit |
| Service | Yes | Must select an option |
| Message | Yes | 10–500 characters |
| Consent | Yes | Must be checked |

**Additional UX:**
- Real-time validation on blur; red/green field borders
- Password visibility toggle and live strength meter (Weak / Fair / Good / Strong)
- Live character counter on the message field
- Submit shows "Sending…" for 1.2s, then success message and form reset
- Full dark mode support

---

### 6. Scroll Progress Bar

- Fixed 3px bar at the very top of the page (above the navbar)
- Grows left-to-right as the user scrolls; reaches 100% at the bottom
- Blue-to-light-blue gradient matching the site palette
- No extra event listener — runs inside the existing scroll handler
- Visible in both light and dark modes

---

### 7. Our Firm Page

A dedicated page for company information, including:

- **Hero section** — full-screen background with team photo, headline, and CTA buttons
- **Our Story** — two-column layout with office image and key stat callout
- **Core Values** — four-card grid (Integrity, Excellence, Partnership, Compassion)
- **Consultants** — five-column team grid with photo, title, and profile link
- **Associates** — six-member research and execution team grid
- **Administrative Team** — support staff section
- Scroll progress bar, reveal animations, and dark mode support throughout



## Dark Mode

All features include `body.dark` overrides. Toggle via the moon icon in the navbar. Preference is saved to `localStorage`.

