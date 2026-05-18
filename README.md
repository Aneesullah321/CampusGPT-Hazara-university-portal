# 🎓 CampusGPT — Hazara University Web Portal

A fully responsive, multi-page university website built for **Hazara University, Mansehra** — featuring an AI-powered campus chatbot, a professional navigation system, a modal-based login/signup flow, and a clean institutional design.
---

## 📋 Table of Contents

- [Overview](#overview)
- [Live Preview](#live-preview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Pages](#pages)
- [Navbar System](#navbar-system)
- [Chatbot](#chatbot)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

CampusGPT is a front-end university web portal designed to serve students, faculty, and applicants of Hazara University. It provides quick access to academic information, admission forms, the academic calendar, library resources, research centers, and the student portal — all wrapped in a modern, professional design.

The project was built as part of a university software project, with a focus on clean UI, accessibility, and practical functionality including a rule-based campus chatbot that answers common student queries.

---

## Live Preview

> If deployed via GitHub Pages:

```
https://<your-username>.github.io/campusgpt/
```

Replace `<your-username>` with your GitHub username after enabling GitHub Pages (see [Deployment](#deployment)).

---

## Features

### 🧭 Navigation System
- **Sticky navbar** that stays fixed at the top of every page
- Primary links: **Home · Admission · Faculties · Programs**
- **Login button** (top-right) opens a modal with tabbed Login / Sign Up
- **Hamburger menu** (☰) reveals a slide-in side drawer with secondary links: Library, Research, Student Portal, Academic Calendar
- Active page detection — current page link is automatically highlighted
- Smooth animations on drawer open/close and modal entrance
- Fully keyboard accessible (Escape to close modals/drawer)

### 🤖 Campus Chatbot (CampusGPT)
- Floating chat widget available on every page
- Answers questions about admissions, programs, fees, location, library, exams, and more
- Keyword-based response engine with pattern matching
- Supports greetings in English and Urdu (`salam`)
- Animated message bubbles with typing delay for realism

### 🔐 Auth Modal (Login / Sign Up)
- Triggered from the navbar Login button — no separate page redirect needed
- Tabbed interface: switch between Login and Sign Up within the same modal
- Sign Up data persisted to `localStorage` (compatible with `signup.html` logic)
- Success confirmation messages with auto-dismiss
- Works alongside the standalone `login.html` and `signup.html` pages

### 📱 Fully Responsive
- Optimized for desktop, tablet, and mobile
- Navigation links collapse on smaller screens — hamburger drawer takes over
- All forms and content containers reflow gracefully at any viewport

### 🎨 Design System
- Color palette rooted in Hazara University's institutional greens (`#2F5233`, `#76B947`, `#B1D8B7`)
- Gold accent (`#C9A84C`) for interactive elements
- **Cormorant Garamond** for logotype and headings (serif authority)
- **DM Sans** for body and UI text (clean readability)
- Animated gradient background across inner pages
- Subtle micro-interactions on cards, buttons, and links

---

## Project Structure

```
campusgpt/
│
├── index.html              # Home page
├── admission.html          # Online admission form
├── faculties.html          # Faculties & department blocks
├── programs.html           # Full program listing with search
├── calendar.html           # Academic calendar – 2025
├── library.html            # Library resources & off-campus access form
├── research.html           # Research areas & centers
├── student-portal.html     # Student portal login
├── login.html              # Standalone login page
├── signup.html             # Standalone sign up page
│
├── navbar.css              # ★ Universal navbar design system
├── navbar.js               # ★ Self-injecting navbar + drawer + modal logic
│
├── chatbot.css             # Chatbot widget styles
├── chatbot.js              # Chatbot logic & response engine (universal)
│
├── styles.css              # Global / legacy base styles
├── script.js               # Page-level utilities (contact form, etc.)
│
├── hu-logo.png             # University logo (local fallback)
└── README.md               # This file
```

> **★ Key files:** `navbar.css` and `navbar.js` are the two files that power the entire navigation experience. Every HTML page loads both of these — the navbar self-injects and requires no additional HTML markup in any page.

---

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero banner, quick links, contact form |
| Admission | `admission.html` | Online application form with full program list |
| Faculties | `faculties.html` | Department blocks (1–12) with modal details, search & filter |
| Programs | `programs.html` | Searchable list of all 40+ academic programs |
| Calendar | `calendar.html` | Academic year events with icons |
| Library | `library.html` | Resources, HEC digital library link, off-campus access form |
| Research | `research.html` | Research areas and centers |
| Student Portal | `student-portal.html` | Student ID / password login |
| Login | `login.html` | Standalone login (name + email) |
| Sign Up | `signup.html` | Account creation with roll number, course, semester |

---

## Navbar System

The navbar is implemented as a **self-contained, auto-injecting module** — `navbar.js` and `navbar.css`.

### How It Works

```html
<!-- Add these two lines to any HTML page — navbar appears automatically -->
<link rel="stylesheet" href="navbar.css">
<script src="navbar.js"></script>
```

The script runs on `DOMContentLoaded`, builds the full navbar HTML (logo, links, login button, hamburger, drawer, and modal), and inserts it as the first child of `<body>`. It also adds `padding-top: 70px` to `body` so content doesn't hide behind the fixed bar.

### Navbar Structure

```
[ HU Logo  Hazara University ] [ Home  Admission  Faculties  Programs ] [ Login  ☰ ]
```

### Side Drawer Contents
Opened via the ☰ hamburger button:
- 📚 Library
- 🔬 Research
- 🖥️ Student Portal
- 📅 Academic Calendar
- Contact info footer

### Login Modal
Opened via the Login button:
- **Login tab** — Name, Email, Password
- **Sign Up tab** — Name, Email, Roll No., Semester, Program, Enrolment No.
- Switch between tabs without closing the modal
- Form data saves to `localStorage` on signup (keyed by roll number)

### Public API
`navbar.js` exposes a global `window.HUNavbar` object for programmatic control:

```javascript
HUNavbar.openModal('login');    // Open modal on login tab
HUNavbar.openModal('signup');   // Open modal on signup tab
HUNavbar.closeModal();          // Close modal
HUNavbar.openDrawer();          // Open side drawer
HUNavbar.closeDrawer();         // Close side drawer
HUNavbar.switchTab('login');    // Switch modal tab
```

---

## Chatbot

The chatbot is powered by `chatbot.js`, a universal script that can be included on any page.

### How It Works

```html
<link rel="stylesheet" href="chatbot.css">
<script src="chatbot.js"></script>
```

The script auto-injects a floating **"Need Help?"** button and a chat window. It uses a keyword-matching response engine (`HU_RESPONSES` object) that handles:

| Topic | Example Queries |
|-------|----------------|
| Greetings | `hello`, `hi`, `salam` |
| Admissions | `admission`, `apply`, `fee` |
| Programs | `programs`, `courses`, `faculties` |
| Contact | `contact`, `phone`, `email`, `address` |
| Library | `library` |
| Research | `research` |
| Calendar | `calendar`, `exam`, `schedule` |
| Portal | `portal`, `login` |
| Farewells | `bye`, `goodbye`, `thank you` |

Unrecognized queries return a randomized fallback directing the user to the admissions office.

### Chatbot Public API

```javascript
HUChatbot.toggle();       // Show / hide chat window
HUChatbot.close();        // Close chat window
HUChatbot.sendMessage();  // Programmatically send a message
```

---

## Getting Started

### Prerequisites

No build tools, no package manager, no server required. This is a **pure HTML/CSS/JS** project.

### Run Locally

**Option 1 — Open directly:**
```bash
# Clone the repository
git clone https://github.com/<your-username>/campusgpt.git
cd campusgpt

# Open index.html in your browser
open index.html        # macOS
start index.html       # Windows
xdg-open index.html    # Linux
```

**Option 2 — Use VS Code Live Server (recommended):**
1. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension in VS Code
2. Open the project folder in VS Code
3. Right-click `index.html` → **Open with Live Server**
4. The site opens at `http://127.0.0.1:5500`

**Option 3 — Python HTTP server:**
```bash
cd campusgpt
python -m http.server 8000
# Visit http://localhost:8000
```

---

## Deployment

### GitHub Pages (Free & Recommended)

1. Push the project to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit — CampusGPT"
   git remote add origin https://github.com/<your-username>/campusgpt.git
   git push -u origin main
   ```

2. Go to your repository on GitHub → **Settings** → **Pages**

3. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`

4. Click **Save** — your site will be live at:
   ```
   https://<your-username>.github.io/campusgpt/
   ```

> It may take 1–2 minutes for the site to go live after saving.

### Other Platforms

| Platform | How to Deploy |
|----------|--------------|
| **Netlify** | Drag and drop the project folder at [netlify.com/drop](https://netlify.com/drop) |
| **Vercel** | Run `npx vercel` in the project folder |
| **Cloudflare Pages** | Connect your GitHub repo in the Cloudflare dashboard |

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Page structure and semantic markup |
| CSS3 | Styling, animations, responsive layout |
| Vanilla JavaScript (ES6+) | Navbar logic, chatbot, form handling |
| [Google Fonts](https://fonts.google.com) | Cormorant Garamond + DM Sans |
| [Font Awesome 6](https://fontawesome.com) | Icons throughout the UI |
| [Bootstrap 5.3](https://getbootstrap.com) | Grid and modal used in `faculties.html` |

No frameworks. No build step. No dependencies to install.

---

## Screenshots

> Add screenshots to a `/screenshots` folder and update the paths below.

| Page | Preview |
|------|---------|
| Home | `screenshots/home.png` |
| Chatbot | `screenshots/chatbot.png` |
| Login Modal | `screenshots/modal.png` |
| Admission Form | `screenshots/admission.png` |
| Side Drawer | `screenshots/drawer.png` |

---

## Contributing

Contributions are welcome. To contribute:

1. Fork the repository
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit:
   ```bash
   git commit -m "Add: your feature description"
   ```
4. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a **Pull Request** on GitHub

### Suggestions for Contribution
- Add backend integration (Node.js / PHP) for real form submissions
- Upgrade the chatbot to use the Claude API for intelligent responses
- Add a dark mode toggle
- Implement proper authentication with a database
- Add Urdu language support across all pages
- Build a faculty/staff directory page

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

You are free to use, modify, and distribute this project for educational and non-commercial purposes with attribution.

---

## Contact

**Hazara University, Mansehra**
- 📍 Dhodial, Mansehra, Khyber Pakhtunkhwa, Pakistan
- 📞 +92-997-414143-47
- 📧 info@hu.edu.pk
- 🌐 [hu.edu.pk](https://hu.edu.pk)

---

<p align="center">
  Built with ❤️ for Hazara University &nbsp;·&nbsp; CampusGPT Project &nbsp;·&nbsp; 2025
</p>
