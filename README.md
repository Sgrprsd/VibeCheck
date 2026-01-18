# VibeCheck. — The Anti-Algorithm Curation Engine

**VibeCheck.** is a minimalist, community-driven platform designed to bring back the art of human curation. In an era of noisy algorithmic feeds, VibeCheck. offers a quiet, high-signal space where users share "Recs" (recommendations) based on genuine quality, not engagement bait.

## Core Philosophy

- **No Algorithms**: A pure, chronological feed. If you follow someone, you see their Vibe.
- **Visual First**: A "zine-like" aesthetic with serif typography, generous whitespace, and rich media embeds.
- **Curate & Collect**: A "Steal" (Re-Rec) mechanic that allows users to quickly curate a library of things they love from others.

## Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS v4, Lucide Icons.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose).
- **Auth**: Passport.js (Google OAuth 2.0).
- **Media**: Cloudinary (Image Optimization), Metascraper (Link Previews).

## Key Features

- **Chronological Feed**: See what your network is recommending in real-time.
- **Rich Recs**: Share links (auto-scraped metadata) or upload high-res images.
- **Re-Rec (One-Click Steal)**: Add someone else's recommendation to your own profile.
- **Google Auth**: Frictionless login and account creation.
- **Minimalist UI**: Mobile-first design focused on reading experience.

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (Local or Atlas URI)
- Cloudinary Account
- Google Cloud Console Project (for OAuth)

### Environment Variables

Create a `.env` file in the `server` directory:

```env
MONGO_URI=mongodb://127.0.0.1:27017/curation_platform
COOKIE_KEY=somerandomstring
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Installation

1.  **Clone the repository**

    ```bash
    git clone <repo-url>
    cd antigravity_projects
    ```

2.  **Install Server Dependencies**

    ```bash
    cd server
    npm install
    ```

3.  **Install Client Dependencies**
    ```bash
    cd ../client
    npm install
    ```

### Running the App

1.  **Start the Backend** (Runs on port 5000)

    ```bash
    cd server
    npm start
    ```

2.  **Start the Frontend** (Runs on port 5173)
    ```bash
    cd client
    npm run dev
    ```
