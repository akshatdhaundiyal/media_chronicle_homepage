# 🌌 Media Chronicle — Official Product Homepage

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Platform: Windows Desktop](https://img.shields.io/badge/Target-Windows%20Desktop-0078D6.svg?logo=windows&logoColor=white)](https://github.com/akshatdhaundiyal/media_chronicle)
[![Flutter Version](https://img.shields.io/badge/Flutter-3.x-02569B.svg?logo=flutter&logoColor=white)](https://flutter.dev)
[![Python ML Pipeline](https://img.shields.io/badge/Pipeline-Ultralytics%20YOLOv8-FF6F00.svg?logo=python&logoColor=white)](https://github.com/akshatdhaundiyal/media_chronicle)
[![State Management](https://img.shields.io/badge/State-Riverpod%202.x-0553B1.svg)](https://riverpod.dev)

The official presentation homepage and interactive feature laboratory for **[Media Chronicle](https://github.com/akshatdhaundiyal/media_chronicle)** — a native Windows Desktop application for personal multimedia timeline management, chronological memoirs, and edge-intelligence face recognition.

---

## 📖 About the Product

**Media Chronicle** combines on-device computer vision and generative AI to give users complete sovereignty over their photos and memories:

* **100% On-Device Data Sovereignty**: All original media, metadata, and face embeddings are indexed and persisted locally via direct PostgreSQL socket synchronization. Zero mandatory third-party cloud uploads.
* **On-Device YOLO Face Detection**: Real-time biometric bounding box overlays highlighting verified family members and unidentified candidates.
* **Pure Dart Neural Classifier (`SingleLayerPerceptron`)**: Runs authentic Stochastic Gradient Descent (SGD) backpropagation on CPU/GPU to learn new identities locally without cloud API calls.
* **Chronological Age Variant Timeline**: Tracks faces across human development (childhood &rarr; teenage &rarr; young adult &rarr; mature adult). Low-similarity deviations ($>25.0$ cosine distance) trigger an age-variant resolver to maintain longitudinal identity accuracy.
* **2D Vector Embeddings Latent Map**: Visualizes 128-dimensional face embedding clusters and traces chronological progression trajectories through latent space.
* **1.2s Fast-Load Offline Bypass**: Millisecond socket health probes bypass absent Ollama VLM daemons, replacing 90-second connection timeouts with instant on-device heuristic fallbacks.
* **Modular Python YOLOv8 Pipeline**: Standalone ML engineering toolkit powered by Astral `uv`, providing CLI scripts for dataset scaffolding, fine-tuning, Albumentations transforms, and ONNX export.
* **Riverpod Clean Architecture**: Multi-layered presentation, domain, and data architecture with $O(1)$ selector rebuilds and 100% passing test coverage.

---

## ✨ Homepage Key Features

The homepage is built with **HTML5, Vanilla CSS, and modern JavaScript**, adhering to the **Twilight Ambient Design System**:

| Feature Section | Description |
|---|---|
| **Hero Showcase** | Ambient gradient background, floating luminous glow orbs, metric highlights, and a high-resolution interactive desktop preview with clickable feature hotspots. |
| **Problem vs Solution** | Side-by-side comparison illustrating the pitfalls of cloud photo platforms vs the privacy and autonomy of Media Chronicle. |
| **Interactive Lab: SGD Retrainer** | Live interactive on-device retraining simulation. Adjust learning rate ($\eta$) and epochs, watch real-time epoch logs stream in a code terminal, and view a live HTML5 Canvas loss convergence curve. |
| **Interactive Lab: Age Progression** | Chronological timeline inspector demonstrating how facial embeddings shift between ages 7, 16, 24, and 35, showcasing the biometric variant resolver. |
| **Interactive Lab: 2D Embeddings Map** | Custom canvas scatter plot mapping cluster halos, cosine distances, and age progression arcs with hoverable nodes. |
| **Interactive Lab: Offline Bypass** | Interactive toggle simulating an unreachable Ollama vision daemon, demonstrating the ~1.2s instant import benchmark vs a hung cloud queue. |
| **Pillar Deep-Dives** | In-depth technical cards detailing the design system, stories compiler, YOLO hub, Python ML tooling, fast-load bypass, and PostgreSQL sync. |
| **Riverpod Architecture Matrix** | Visual 3-tier layer diagram outlining presentation, domain/state, and infrastructure layers. |
| **Milestone Evolution** | Comprehensive roadmap tracing milestones M1 through M16, from initial scaffolding to clean Riverpod notifiers. |
| **Quickstart Guide** | Copyable setup terminal snippets for Flutter Windows Desktop compilation, Python YOLO CLI tools, and PostgreSQL. |

---

## 📂 Project Structure

```
media_chronicle_homepage/
├── .github/
│   └── workflows/
│       └── deploy.yml               # Automated GitHub Pages CI/CD deployment
├── assets/
│   ├── css/
│   │   ├── variables.css            # Design tokens, color palette, transitions
│   │   ├── base.css                 # Reset, ambient glows, navbar, buttons
│   │   ├── hero.css                 # Hero showcase, stats ribbon, window preview
│   │   ├── lab.css                  # Interactive lab, terminal, age timeline, canvas
│   │   ├── sections.css             # Features grid, story banner, architecture, milestones
│   │   ├── responsive.css           # Breakpoints & media queries
│   │   └── styles.css               # Master aggregator stylesheet
│   ├── js/
│   │   ├── modules/
│   │   │   ├── navigation.js        # Navbar, mobile drawer, tab switching, hotspots
│   │   │   ├── sgd-simulator.js     # SingleLayerPerceptron SGD training & loss curve
│   │   │   ├── face-timeline.js     # YOLO face age progression & variant resolver
│   │   │   ├── embeddings-map.js    # 2D latent vector scatter plot & clusters
│   │   │   └── offline-simulator.js # VLM socket probe & fast-load benchmark
│   │   └── main.js                  # Modular entry point
│   └── images/
│       ├── hero_showcase.jpg        # High-resolution Media Chronicle desktop UI preview
│       ├── face_age_progression.jpg # Biometric age timeline documentary portraits
│       └── story_memories.jpg       # Atmospheric memory story narrative collage
├── .gitignore                       # Git ignore rules for web, OS, Python & editor files
├── LICENSE                          # MIT License
├── README.md                        # Documentation
├── index.html                       # Semantic HTML5 homepage structure with SEO metadata
└── robots.txt                       # Search crawler index rules
```

---

## 🚀 Running Locally

No complex build step or heavy package dependencies required — the homepage is built with vanilla web technologies.

### Option 1: Python HTTP Server (Recommended)
```powershell
# Open terminal inside media_chronicle_homepage directory
python -m http.server 8080
```
Open **`http://localhost:8080`** in your browser.

### Option 2: Node.js `serve`
```powershell
npx -y serve -l 8080
```

### Option 3: VS Code / IDE Live Server
Right-click `index.html` in VS Code and select **"Open with Live Server"**.

---

## 🎨 Design System Tokens

The homepage matches the design language used in the Flutter Windows desktop application:

* **Background Surface**: `#06090F` (Midnight Deep) / `#0B0F19` (Twilight Surface)
* **Glassmorphic Acrylic**: `rgba(16, 23, 38, 0.72)` with `backdrop-filter: blur(16px)` and subtle border highlights (`rgba(255, 255, 255, 0.08)`)
* **Luminous Accents**:
  * **Neon Cyan**: `#00F0FF` (Recognized identities, primary call-to-actions, loss curve)
  * **Rose Pink**: `#F43F5E` (Age variants, unknown face queues, gradient accents)
  * **Electric Violet**: `#8B5CF6` (Ambient lighting, cluster halos)
  * **Emerald Green**: `#10B981` (PostgreSQL local sync active status)
* **Typography**:
  * **Display & Body**: [Outfit](https://fonts.google.com/specimen/Outfit) (Google Fonts geometric sans-serif)
  * **Code & Telemetry**: [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)

---

## 🔗 Related Repositories & Links

* **Product Repository (WIP)**: [akshatdhaundiyal/media_chronicle](https://github.com/akshatdhaundiyal/media_chronicle)
* **Author**: [Akshat Dhaundiyal](https://github.com/akshatdhaundiyal)
* **Design Docs**: See [docs/design_docs/](https://github.com/akshatdhaundiyal/media_chronicle/tree/main/docs/design_docs) in the product repository for full architectural milestone specifications.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
