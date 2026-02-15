# Primape Workspace Hub v1

🦍 **Primape Workspace Hub** – Multi-App Development Environment

A comprehensive static site workspace showcasing multiple independent web applications with a central hub for navigation, live crypto dashboard, and market news integration.

## 🚀 What's Included

### 1. **Primape Workspace Hub** (Root `/`)
- Central navigation hub with app cards
- 💰 **Live Crypto Dashboard** – Real-time BTC, ETH, SOL, XRP prices from CoinGecko API
- 📺 **Bloomberg Live News** – Embedded YouTube livestreams
- 📁 **Beautiful Directory Viewer** – Color-coded project structure visualization
- ✨ Responsive design with gradient accents

### 2. **FlowRoll Supply** (`/apps/flowroll/`)
- Premium jiu-jitsu rashguard e-commerce platform
- 4 featured products with pricing and sizing
- Product showcase, sizing guide, and checkout flow
- Community testimonials and ratings
- Blue accent theme (#2563eb)

### 3. **Maximillian Jiu-Jitsu** (`/apps/maximillian/`)
- Official grappling apparel shop for Maximillian Jiu-Jitsu dojo (Table View, Cape Town)
- 6 premium products: gi's, rashguards, hoodies, shorts, accessories
- Competition-ready sizing guides
- Real community testimonials from maxjj.co.za
- Deep red accent theme (#c41e3a)
- Direct links to main dojo and shop contact

## 📂 Project Structure

```
flowroll-web-workspace-v1/
├── index.html                    (Primape Hub with crypto dashboard)
├── README.md                     (this file)
├── MAXIMILLIAN_UPDATE.md         (transformation notes)
├── apps/
│   ├── flowroll/
│   │   ├── index.html           (main store)
│   │   ├── 404.html            (error page)
│   │   └── README.md           (documentation)
│   └── maximillian/
│       ├── index.html           (main store)
│       ├── 404.html            (error page)
│       └── README.md           (documentation)
└── .nojekyll                     (GitHub Pages config)
```

## 🎨 Design System

| App | Color | Purpose | Theme |
|-----|-------|---------|-------|
| FlowRoll | Blue (#2563eb) | Premium rashguards | Modern e-commerce |
| Maximillian | Red (#c41e3a) | Grappling apparel | Community-focused |
| Hub | Gradient | Navigation & tools | Professional dashboard |

## 🖥 Local Development

### Run Locally
```bash
python3 -m http.server 3000
```
Then visit:
- **Hub**: http://localhost:3000/
- **FlowRoll**: http://localhost:3000/apps/flowroll/
- **Maximillian**: http://localhost:3000/apps/maximillian/

## 🚀 Deploy to GitHub Pages

1. **Initial Setup** (already done):
   ```bash
   git remote add origin git@github.com:Octavian-Blignaut/flowroll-web-workspace-v1.git
   ```

2. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/ (root)**
   - Click **Save**

3. **Push Updates**:
   ```bash
   git add -A
   git commit -m "Update: your message here"
   git push origin main
   ```

Your site will be live at: **https://octavian-blignaut.github.io/flowroll-web-workspace-v1/**

## ✨ Key Features

### Primape Hub
- ✅ **Live Crypto Prices** – Auto-refreshing every 60 seconds via CoinGecko API
- ✅ **Manual Refresh Button** – Update prices on demand
- ✅ **Live Market Streams** – Embedded Bloomberg/financial news
- ✅ **Directory Browser** – Professional file structure visualization
- ✅ **Sticky Navigation** – Quick app switching

### FlowRoll Store
- ✅ Product showcase with images & descriptions
- ✅ ZAR pricing and availability
- ✅ Sizing guides for rashguards
- ✅ Customer testimonials (4.9★ rating)
- ✅ Multiple checkout options

### Maximillian Store
- ✅ 6 premium grappling products
- ✅ Competition-grade specifications
- ✅ Comprehensive sizing charts
- ✅ Real community feedback
- ✅ Links to main dojo (maxjj.co.za)
- ✅ Shop contact email integration

## 🔧 Tech Stack

- **Frontend**: HTML5, CSS3 (custom variables & media queries)
- **Scripting**: Vanilla JavaScript
- **APIs**: CoinGecko (crypto prices), YouTube (livestreams)
- **Hosting**: GitHub Pages
- **Version Control**: Git

## 📝 Updates & Maintenance

Edit files directly, then deploy:
```bash
git add -A
git commit -m "Describe your changes"
git push origin main
```

Changes deploy automatically to GitHub Pages within a few minutes.

## 🎯 Use Cases

- ✅ Multi-app portfolio showcase
- ✅ Product store templates
- ✅ Financial dashboard hub
- ✅ Community-driven e-commerce
- ✅ Static site generator template

## 📞 Contact & Links

**FlowRoll**
- Email: contact@flowroll.co.za
- Products: Rashguards for grapplers

**Maximillian Jiu-Jitsu**
- Location: Table View, Cape Town
- Website: https://maxjj.co.za
- Email: shop@maxjj.co.za
- Products: Gi's, rashguards, training apparel

---

**© 2026 Primape Workspace Hub**. All rights reserved.
Proudly hosted on GitHub Pages.

