# 🛡️ Media Chronicle: Private Family Photo Indexer

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Platform: Windows Desktop](https://img.shields.io/badge/Platform-Native%20Windows%20x64-0078D6.svg?logo=windows&logoColor=white)](https://github.com/akshatdhaundiyal/media_chronicle)
[![Privacy: 100% Offline](https://img.shields.io/badge/Privacy-100%25%20Offline%20%26%20Private-10B981.svg)](https://github.com/akshatdhaundiyal/media_chronicle)
[![Pricing: $79 One-Time](https://img.shields.io/badge/Price-%2479%20One--Time%20Lifetime-00F0FF.svg)](https://github.com/akshatdhaundiyal/media_chronicle)
[![GitHub WIP](https://img.shields.io/badge/GitHub-akshatdhaundiyal%2Fmedia__chronicle-white.svg?logo=github)](https://github.com/akshatdhaundiyal/media_chronicle)

**Media Chronicle is a native Windows app that indexes family photo libraries from external drives—100% offline and private. No cloud uploads, no subscriptions.**

Official homepage & interactive showcase: **[akshatdhaundiyal.github.io/media_chronicle_homepage](https://akshatdhaundiyal.github.io/media_chronicle_homepage/)**  
WIP Product Repository: **[github.com/akshatdhaundiyal/media_chronicle](https://github.com/akshatdhaundiyal/media_chronicle)**

---

## ⚡ 8-Week MVP Scope & Credibility

> **Our focused engineering timeline delivers a standalone Windows executable with in-place drive scanning (no file copying), fast preview streaming, metadata search, local face detection/grouping, and JSON/CSV export. Multimodal vector search, Ollama VLM integration, and narrative timelines are deferred to v2.**

### The 6 Core Deliverables of the 8-Week MVP

| # | Deliverable | Engineering Specification | MVP Status |
|---|---|---|:---:|
| **1** | **Standalone Windows Executable** | Self-contained Windows x64 `.exe` installer and portable release. Zero cloud dependencies, zero external runtime setup. Installs and runs 100% offline. | **v1 Active** |
| **2** | **In-Place Drive Scanning** | Scans external HDDs, SSDs, SD cards, and NAS drives in-place. Reads directly from storage without duplicating files or consuming internal disk space. | **v1 Active** |
| **3** | **Fast Preview Streaming** | Lightweight sub-millisecond thumbnail generator and caching engine. Instant smooth scrolling across libraries containing 100,000+ photos. | **v1 Active** |
| **4** | **Instant Metadata Search** | High-performance indexing of EXIF, capture dates, camera models, GPS coordinates, and folder structures with sub-50ms query response. | **v1 Active** |
| **5** | **Local Face Detection & Grouping** | Real-time on-device biometric face detection with clustering. Automatically groups recurring family members locally without external APIs. | **v1 Active** |
| **6** | **Portable JSON / CSV Export** | Complete data sovereignty. Export entire media catalogues, tags, face clusters, and timestamps to universal JSON and CSV formats at any time. | **v1 Active** |

---

## 💰 Why Pay $79?

> **iCloud and Google Photos cost $120–$240 annually while indexing personal memories on corporate servers. Media Chronicle costs a one-time $79, replacing perpetual cloud fees with permanent software ownership and airtight privacy.**

### Lifetime Value vs. Cloud Subscriptions

| Feature / Metric | Cloud Subscriptions (Google / iCloud) | Media Chronicle Lifetime License |
|---|---|---|
| **Pricing Model** | $120 to $240 / year (Every year, forever) | **$79 One-Time (Lifetime ownership)** |
| **3-Year Total Cost** | **$360 – $720+** | **$79 total** |
| **5-Year Total Cost** | **$600 – $1,200+** | **$79 total** |
| **Break-Even Horizon** | *Never* (Costs escalate every year) | **4 to 8 Months** |
| **Data Privacy** | Scanned on corporate servers for AI training & ad profiling | **100% Offline & Private** on your local PC |
| **External Drive Support** | Forces upload or sync to proprietary cloud storage | **Direct In-Place Scan** of external HDDs/SSDs |
| **Offline Reliability** | Requires active internet connection; slow uploads | **Works completely air-gapped** with zero network calls |
| **Data Sovereignty** | Proprietary cloud lock-in with complex exports | **Full portable JSON/CSV export** at any time |

---

## 🗺️ Product Roadmap

### 🎯 v1: The 8-Week Core MVP (Current Focus)
* [x] **Standalone Windows Executable**: Bundled native distribution with offline runtime.
* [x] **In-Place External Drive Scanner**: Multi-threaded read pipeline for external drives without file copying.
* [x] **Optimized Thumbnail Cache**: Fast preview streaming with LRU cache memory bounds.
* [x] **Local EXIF & Metadata Engine**: Instant search across timestamps, ISO, lenses, and folder hierarchies.
* [x] **On-Device Face Detection & Grouping**: Fast biometric face detection and clustering.
* [x] **JSON / CSV Export Pipeline**: One-click data export to open standards.

### 🚀 v2: Advanced Intelligence Roadmap (Deferred Features)
* [ ] **Multimodal Vector Search (CLIP)**: Natural language text-to-photo semantic search executed locally (*"birthday cake on wooden table"*).
* [ ] **Local Ollama VLM Integration**: On-device Vision Language Models for automated captioning, scene reasoning, and context tags.
* [ ] **Narrative Timelines & Story Compiler**: Longitudinal memory memoirs grouping milestone life chapters across decades.
* [ ] **Pure Dart SGD Neural Identity Retrainer**: On-device Stochastic Gradient Descent to train custom face embeddings as relatives age.
* [ ] **Cloudless P2P Local Network Sync**: Direct peer-to-peer sync between home Windows PCs and local NAS units.

---

## 📂 Homepage Architecture

The homepage is organized with a modular structure:

```
media_chronicle_homepage/
├── .github/
│   └── workflows/
│       └── deploy.yml               # Automated GitHub Pages CI/CD workflow
├── assets/
│   ├── css/
│   │   ├── variables.css            # Twilight design tokens, color palette, typography
│   │   ├── base.css                 # Reset, ambient lighting glows, navbar, buttons
│   │   ├── hero.css                 # Hero showcase, $79 stats ribbon, desktop window preview
│   │   ├── lab.css                  # Interactive lab: SGD terminal, age timeline, 2D latent map
│   │   ├── sections.css             # 8-Week MVP grid, $79 pricing table, roadmap, story banner
│   │   ├── responsive.css           # Mobile & tablet breakpoints
│   │   └── styles.css               # Master aggregator stylesheet
│   ├── js/
│   │   ├── modules/
│   │   │   ├── navigation.js        # Navbar drawer, smooth scroll, tabs & license modal
│   │   │   ├── calculator.js        # Lifetime savings vs cloud calculator
│   │   │   ├── offline-simulator.js # In-place external drive scanner & zero-copy log
│   │   │   └── gallery-demo.js      # Instant sub-10ms offline search & metadata filter demo
│   │   └── main.js                  # ES Module coordinator
│   └── images/
│       ├── hero_showcase.jpg        # High-resolution Media Chronicle desktop UI preview
│       ├── face_age_progression.jpg # Biometric age timeline documentary portraits
│       └── story_memories.jpg       # Atmospheric memory story narrative collage
├── .gitignore                       # Git ignore rules
├── LICENSE                          # MIT License
├── README.md                        # Documentation & Scope Specification
├── index.html                       # Semantic HTML5 homepage structure with SEO metadata
└── robots.txt                       # Search crawler rules
```

---

## 💻 Running the Homepage Locally

Zero complex build pipelines or Python required — runs directly in modern browsers via native ES Modules.

### Option A: Using NPM (Recommended)
```powershell
npm start
```

### Option B: Double-Click Helper (Windows)
Double-click [`start.bat`](start.bat) in the root folder to launch the server and open your browser automatically.

### Option C: Using NPX Serve
```powershell
npx serve . -l 8080
```
Open **`http://localhost:8080`** in your browser.

---

## 🔗 Links & Resources

* **Product Repository (WIP)**: [akshatdhaundiyal/media_chronicle](https://github.com/akshatdhaundiyal/media_chronicle)
* **Author**: [Akshat Dhaundiyal](https://github.com/akshatdhaundiyal)
* **License**: [MIT License](LICENSE)
