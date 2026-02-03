# Project Analysis & Funnel Documentation

This document outlines the current structure, funnel flow, and key findings of the "Web-SaaS" infidelity finder project.

## 🚨 Critical Missing Component

- **Missing Step 2 (Instagram Input)**:
    - **STATUS UPDATE**: Found at `app/step-2/page.tsx`.
    - **Function**: Input Instagram -> Load Report -> Mundpay Checkout.
    - **Flow**: Step 1 -> Step 2 -> Mundpay -> Upsell (Auto-redirect).

## 📂 Project Structure Overview

### 1. Landing Pages (Presell/Lead Gen)
There are multiple variations of the initial "Step 1" landing page, likely for A/B testing:
- **`app/page.tsx`**: Renders `Step1` component (default entry).
- **`step-1.tsx`**: Original "Relationship Doubt" angle. Features a fake progress bar and navigates to `/step-2`.
- **`app/step-1-v2/page.tsx`**: "Did He Call You Crazy?" angle. Dark/purple theme. Navigates to `/step-2`.
- **`app/step-1-v3/page.tsx`**: "Without Proof, She'll Make You Look Crazy" (Male audience focus). Dark/cyan theme. Navigates to `/step-2`.

### 2. Funnel Steps (Upsells & Downsells)
The upsell/downsell flow is largely implemented via static HTML files in `public/` or specific Next.js routes.

- **Upsell 1 (WhatsApp)**: located at `public/u1m.html`. Simulates WhatsApp cloning.
- **Downsell 1**: located at `public/d1m.html`. 50% discount offer.
- **Upsell 2 (Tinder/Dating)**: located at `public/u2m.html`. Simulates facial recognition scan.
- **Downsell 2**: located at `public/d2m.html`. 50% discount offer. 
- **Digital Audit Upsell**: `app/initpage1/page.tsx`. "Digital Audit Kit" offer ($47).
- **Emotional Shield Upsell**: `app/initpage2/page.tsx`. "Emotional Shielding Protocol" offer ($47).
- **Sales Page**: `app/initpage/page.tsx`. "Reading Signs" info product ($37).
- **Thank You**: `public/tk.html`. Simple purchase confirmation.

### 4. White Pages / Cloaking (Safe Pages)
Per user instruction, these pages are used for cloaking or payment gateway compliance and are **not** part of the main high-conversion funnel:
- `app/initpage/page.tsx`
- `app/initpage1/page.tsx`
- `app/initpage2/page.tsx`

### 3. API Routes (`app/api/`)
- **`/api/instagram`**:
    - `profile/route.ts`: Proxies requests to RapidAPI (`instagram120.p.rapidapi.com`). **Unused by frontend.**
    - `posts/route.ts`: Proxies posts requests.
    - `image/route.ts`: Image proxy.
- **`/api/whatsapp-photo`**: Returns a **mock** response (always success, placeholder image).
- **`/api/location`**: Returns **mock** hardcoded location (São Paulo, Brazil).

## 🛠️ Tech Stack & Key Libraries
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS, Lucide React (Icons)
- **Tracking**: `FacebookTracker` component (in `step-1-v2`, `initpage`, etc.)
- **Payments**: Mundpay widget integration (in HTML files), Custom links to `pay.mycheckoutt.com` (in `initpage` variants).

## ⚠️ Action Items for Refactor
1.  **Recreate Step 2**: Design and implement the missing Instagram input page to connect Step 1 with the API.
2.  **Connect API**: Wire up the new Step 2 to `/api/instagram`.
3.  **Modernize HTML Pages**: Convert `public/*.html` files into React components (`app/upsell-1`, etc.) to unify state and design.
4.  **Mock vs Real**: Decide if `whatsapp-photo` and `location` APIs should remain mocks or be implemented for real.
