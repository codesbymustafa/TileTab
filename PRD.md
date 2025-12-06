
-----

# Product Requirements Document: TileTab (v2.0)

**Product:** TileTab Chrome Extension
**Status:** Approved for Engineering
**Date:** December 5, 2025
**Owner:** Brainstormer (Acting Senior PM)

-----

## 1\. Executive Summary

**TileTab** is a high-performance, developer-centric Chrome Extension that replaces the standard "New Tab" page with a tiled, resizable, binary-tree layout similar to IDEs like VS Code. It addresses the market gap between rigid dashboards (Momentum) and cluttered icon grids (Infinity).

**Core Value Proposition:** A "Browser OS" that offers the speed of local native widgets combined with the flexibility of cloud-hosted remote widgets via a secure "Hybrid Architecture," ensuring zero dead states even when offline.

-----

## 2\. Product Vision

To build the **"VS Code of Browser Dashboards."** We are moving away from decorative new tab pages to a functional **Command Center**. Users construct their own productivity operating system using modular "Flexbits" that respect efficiency, keyboard workflows, and data density.

-----

## 3\. Target Audience & Personas

| Persona | Role | Pain Points | Key Features Needed |
| :--- | :--- | :--- | :--- |
| **The Developer (Alex)** | Full Stack Dev | Forgets if localhost is running; hates context switching. | Localhost Pinger, JSON Formatter, Binary Tree Resizing. |
| **The Day Trader (Sarah)** | Crypto/Stock Trader | Needs real-time data at a glance; standard dashboards are too slow. | Remote Stock Widget (Iframe), Red/Green Alerts, Ticker Tape. |
| **The Student (Jordan)** | University Student | Distracted easily; loses research tabs. | Pomodoro Timer, Synced Notes, Tab Manager. |
| **The Aesthete (Mia)** | Designer | Needs visual inspiration; current tools are ugly. | Moodboard Tile (Paste from clipboard), Color Extractor. |

-----

## 4\. Problem Statement

Current "New Tab" extensions force a trade-off:

1.  **Rigidity:** You cannot resize or arrange widgets freely (Momentum).
2.  **Staleness:** Widgets break when APIs change, requiring a full extension update/review (48h delay).
3.  **Fragility:** Remote-based dashboards fail completely when offline (The "Dino" problem).

## 5\. Solution Overview: The Hybrid Shell

TileTab uses a **Hybrid Architecture**:

  * **The Shell:** A local React app (WXT Framework) that works 100% offline.
  * **The Content:** A mix of "Native Flexbits" (bundled) and "Remote Flexbits" (Iframes hosted on Vercel).
  * **The Glue:** A generic `postMessage` protocol that allows remote widgets to offload their state to the Shell, ensuring instant loading and offline fallbacks.

-----

## 6\. Technical Architecture

### 6.1 Technology Stack

  * **Framework:** **WXT** (Vite-based) for Manifest V3 compliance.
  * **Frontend:** React 19 + Tailwind CSS (v4).
  * **State Management:** Zustand + Immer (for Binary Tree manipulation).
  * **Backend/Auth:** **Supabase** (Auth, Layout Storage, Settings Sync).
  * **Remote Hosting:** **Vercel** (Hosting for Type D Flexbits).

### 6.2 Data Flow & Normalization

To support **Multiple Layouts** and **Reusable Widgets**, we use a normalized state pattern.

1.  **Widget Registry (`widget_instances`):**
      * *Concept:* The "Database" of all configured widgets.
      * *Structure:* A flat map of `UUID -> { type, settings, cached_data }`.
      * *Storage:* `chrome.storage.local` (Master) + Supabase (Backup).
2.  **Layout Trees (`layouts`):**
      * *Concept:* The "View."
      * *Structure:* JSON Binary Tree referencing Widget UUIDs.
      * *Storage:* `chrome.storage.local` + Supabase.

### 6.3 The Anti-Dino Protocol (Offline Logic)

The Shell is the Gatekeeper. It never blindly renders an iframe.

  * **IF Online:** Shell renders `<iframe src="https://tiletab-widgets.vercel.app/..." />`. The iframe fetches live data.
  * **IF Offline:** Shell **unmounts** the iframe. It renders a `<GenericFallback />` component using `cached_data` from the Registry.

-----

## 7\. Functional Requirements: The Flexbit System

### 7.1 Type A: Native Flexbits (The Core)

  * **Tech:** Bundled React Components.
  * **Network:** 100% Offline.
  * **Storage:** `localStorage`.

| Flexbit | Features | Settings Schema |
| :--- | :--- | :--- |
| **Clock** | Analog/Digital/World Faces. | `{ "format": "12h/24h", "type": "analog/digital", "timezone": "UTC" }` |
| **Calendar** | View Day/Week/Month. | `{ "startDay": "monday", "view": "month" }` |
| **Stopwatch** | Start/Stop/Lap. | *Transient State* |
| **Timer** | Countdown, Pomodoro presets. | `{ "work": 25, "break": 5, "sound": "bell" }` |
| **Search** | Multi-engine, Local File Search, AI Shortcuts. | `{ "engine": "google", "ai_shortcuts": true }` |
| **Password Gen** | Length, Char sets, Pronounceable mode. | `{ "length": 16, "symbols": true }` |
| **Calculator** | Basic/Scientific, History Tape. | `{ "mode": "scientific", "tape": true }` |
| **Converter** | Length, Weight, Temp, Speed. | `{ "category": "length", "precision": 2 }` |

### 7.2 Type B: Synced Flexbits (Productivity)

  * **Tech:** Native React Components.
  * **Network:** Local First (Syncs to Supabase).

| Flexbit | Features |
| :--- | :--- |
| **Notes** | Rich Text (Bold/Italic), Auto-save. |
| **To-Do List** | Drag-reorder, Priority High/Med/Low, Due Dates. |
| **Quick Links** | Grid of Favicons, Folder support. |

### 7.3 Type C: Exclusive Permission Flexbits (Power User)

  * **Tech:** Native Widgets using Chrome APIs.
  * **Permissions:** Optional (requested on use).

| Flexbit | Features | Required Permission |
| :--- | :--- | :--- |
| **Tab Manager** | Save/Restore Sessions, Merge Windows, Chrome Tab Groups support. | `tabs`, `tabGroups` |
| **Web Blocker** | Block URL/Keyword, Schedule, Password Lock. | `declarativeNetRequest` |
| **History** | Search/Filter History, Visit Heatmap. | `history` |
| **Downloads** | Recent downloads, Pause/Resume. | `downloads` |
| **Top Sites** | Auto-generated "Most Visited". | `topSites` |

### 7.4 Type D: Remote Flexbits (Live Content)

  * **Tech:** Hosted on Vercel. Loaded via `<iframe>`.
  * **Network:** Online Only (with cached fallback).

| Flexbit | Features | Input / URL Params |
| :--- | :--- | :--- |
| **Weather** | C/F, Wind, UV. Auto-Location. | `{ "city": "London", "units": "metric" }` |
| **News** | Categories (Tech, Biz), Sources (BBC). | `{ "feed": "tech", "images": true }` |
| **Stock Chart** | Candle/Line, Indicators (RSI). | `{ "symbol": "AAPL", "interval": "1D" }` |
| **Crypto Chart**| Crypto pairs (BTC-USD). | `{ "pair": "BTC-USD" }` |
| **Forex Chart** | Currency pairs. | `{ "pair": "EUR-USD" }` |
| **Currency** | Live Rate Converter. | `{ "from": "USD", "to": "EUR" }` |
| **Quotes** | Sources (Stoic, Tech). | `{ "category": "stoic" }` |
| **Embeds** | Wrappers for ChatGPT, YouTube, X. | `{ "service": "chatgpt" }` |

-----

## 8\. Communication Protocol (`postMessage`)

### 8.1 Initialization (Parent -\> Child)

The Shell injects configuration into the "dumb" iframe on load.

```javascript
// Message from Shell to Iframe
{
  "type": "ZY_INIT",
  "instanceId": "uuid-1234",
  "theme": "dark",
  "settings": { "symbol": "TSLA", "interval": "1wk" }, // Widget-specific
  "cachedData": { "price": 150.20 } // For instant rendering before fetch
}
```

### 8.2 Update Loop (Child -\> Parent)

The Iframe sends data back to the Shell for storage.

```javascript
// Message from Iframe to Shell
{
  "type": "ZY_UPDATE",
  "instanceId": "uuid-1234",
  "payload": {
    "settings": { "symbol": "AAPL" }, // If user changed input
    "data": { "price": 154.20 }       // For offline cache
  }
}
```

-----

## 9\. User Interface Requirements

### 9.1 Layout & Interaction

  * **Tree Resizing:** Draggable borders between nodes. Updates must be 60fps smooth.
  * **Edit Mode:**
      * Global toggle button.
      * When active: Widget headers expand, delete buttons appear, iframes receive `pointer-events: none` (to enable dragging over them).
  * **Drag & Drop:**
      * "Ghost" image follows cursor.
      * Drop zones highlight (Split Top/Bottom/Left/Right).
      * **Logic:** Drag start = Lift state to store + Opacity 0.4. Drop = Update Tree JSON.

### 9.2 Sidebar Settings

  * Clicking "Settings" on a widget opens the Global Sidebar.
  * Sidebar renders a form based on the widget's `schema` (defined in Registry).
  * Changes in Sidebar instantly update the widget via `postMessage` (no reload).

-----

## 10\. Success Metrics (KPIs)

1.  **Retention:** % of users who keep the extension enabled after 7 days (Target: \>40%).
2.  **Engagement:** Average number of widgets per layout (Target: \>4).
3.  **Performance:** "New Tab" render time (Time to Interactive) \< 200ms.

-----

## 11\. Release Plan

### Phase 1: The "Local" MVP (Weeks 1-2)

  * **Scope:** Shell, Tree Engine, Type A (Native) Widgets.
  * **Goal:** A functional, offline resizing dashboard.

### Phase 2: The "Hybrid" Engine (Weeks 3-4)

  * **Scope:** Vercel deployment, `postMessage` protocol, Type D (Remote) Widgets.
  * **Goal:** Stock charts and News feeds working with offline fallback.

### Phase 3: The "Cloud" Sync (Week 5)

  * **Scope:** Supabase Auth, Multi-layout support, Type B (Synced) Widgets.
  * **Goal:** Cross-device synchronization.

### Phase 4: Power Features (Week 6+)

  * **Scope:** Type C (Permissions) Widgets, Tab Manager, Web Blocker.
  * **Goal:** Feature parity with top competitors.

-----

## 12\. Open Questions & Risks

  * **Risk:** Vercel Function Timeouts for remote data fetching.
      * **Mitigation:** Fetch data client-side inside the iframe (React `fetch`) rather than using Vercel serverless proxies where possible.
  * **Risk:** `topSites` permission friction.
      * **Mitigation:** Do not ask on install. Only ask when the user drags the "Top Sites" widget to the grid.

-----

**Appendix A: Default Layout**
Upon first install, the user sees:

  * **Split Vertical:** Left (Clock + Quick Links), Right (Google Search).
  * *Why:* Simple, loads instantly, demonstrates the split concept immediately.