<div align="center">

  <h1 align="center">ResuMint - AI Resume Analyzer</h1>

   <div align="center">
    <h3>Track jobs. Improve resumes. Get Hired.</h3>
    <p>ResuMint is an intelligent tool designed to enhance your job search journey. By leveraging AI, it provides detailed analysis, ATS scoring, and actionable feedback to help you craft the perfect resume.</p>
   </div>
</div>

## 📋 <a name="table">Table of Contents</a>

1. ✨ [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🔗 [Assets](#links)

## <a name="introduction">✨ Introduction</a>
**ResuMint** is an AI-powered resume analysis application designed to help job seekers improve their resumes. It uses advanced Large Language Models (LLMs) to scan uploaded resumes, score them against job descriptions, and provide actionable feedback on tone, content, structure, and ATS (Applicant Tracking System) compatibility.

The application is built as a **Single Page Application (SPA)** that runs entirely in the browser, leveraging the **Puter.js** cloud platform for backend services (Auth, Storage, Database, AI).

## <a name="tech-stack">⚙️ Technology Stack</a>

### Frontend Frameworks & Libraries
-   **Core Framework:** [React Router v7](https://reactrouter.com/) (formerly Remix/React Router integration) - Handles routing and data loading.
-   **UI Library:** [React v19](https://react.dev/) - Component-based UI architecture.
-   **State Management:** [Zustand](https://github.com/pmndrs/zustand) - Lightweight global state management (used for Auth, Filesystem, and Caching).
-   **Styling:** [TailwindCSS v4](https://tailwindcss.com/) - Utility-first CSS framework for styling.
-   **Build Tool:** [Vite](https://vitejs.dev/) - High-performance frontend tooling.

### AI & Backend (Puter.js Integration)
The application does not use a traditional server (Node.js/Python). Instead, it relies on **[Puter.js](https://docs.puter.com/)**, a browser-based cloud OS SDK.
-   **Authentication:** `puter.auth` handles user sign-in/sign-out logic.
-   **File System:** `puter.fs` stores uploaded PDF resumes and converted resume images.
-   **Database:** `puter.kv` (Key-Value Store) acts as the database, storing JSON objects containing resume metadata, feedback, and file paths, indexed by a unique UUID.
-   **AI Model:** The application uses **Claude 3.7 Sonnet** (via `puter.ai.chat`) for analyzing resume content.

### Critical Dependencies
-   **pdfjs-dist:** Used to render PDFs and convert them to images for preview.
-   **react-dropzone:** Handles file drag-and-drop interactions.
-   **tw-animate-css:** Provides animation utilities for UI transitions.

## 🧱 Core Architecture & Workflow

### A. Authentication Flow
1.  Users visit the app.
2.  `usePuterStore` checks `puter.auth.isSignedIn()`.
3.  If not signed in, they are redirected to `/auth`.
4.  Once authenticated, the user object is stored in the global Zustand store.

### B. The "Upload & Analyze" Workflow
1.  **Input:** User fills out Company Name, Job Title, Job Description, and uploads a PDF Resume.
2.  **File Processing:**
    -   The PDF acts as the source of truth.
    -   `pdfjs-dist` converts the first page of the PDF into an image (Blob).
3.  **Storage (Puter FS):**
    -   The PDF is uploaded to the user's Puter cloud storage.
    -   The generated image is also uploaded to Puter cloud storage.
4.  **AI Analysis:**
    -   The app constructs a prompt containing the Job Title, Description, and the Resume file.
    -   It calls `puter.ai.chat` (Claude 3.7 Sonnet).
    -   **Prompt Goal:** Generate a JSON response with scores (0-100) and specific tips for Content, Tone, Structure, and ATS compatibility.
5.  **Database Entry (Puter KV):**
    -   A new record is created in the Key-Value store: `resume:{uuid}`.
    -   Content: `{ id, companyName, jobTitle, resumePath, imagePath, feedback }`.

### C. The "Review" Workflow (Dashboard)
1.  **Home Page:** Fetches all keys matching `resume:*` from `puter.kv`.
2.  **Display:** Renders a grid of `ResumeCard` components.
    -   **Optimization:** Uses a recently implemented **Client-Side Cache** to store object URLs for resume images, preventing redundant network requests and memory leaks.
3.  **Detail View:** Clicking a card navigates to `/resume/{id}`.
    -   Displays the Resume Preview (Left).
    -   Displays the AI Feedback Analysis (Right).

## <a name="features">🔋 Key Features</a>

### 📊 Smart Scoring System
-   **Overall Score:** A weighted average of sub-category scores.
-   **Category Breakdown:**
    -   **Tone & Style:** Evaluates professional voice and clarity.
    -   **Content:** Checks for relevance to the job description.
    -   **Structure:** Analyzes formatting and readability.
    -   **Skills:** Verifies if required skills from the job description are present.

### 🤖 ATS Compatibility Check
-   Simulates an ATS scan to see if the resume parses correctly.
-   Provides warnings (Red/Yellow) and Success messages (Green) based on keywords and formatting.

### � Detailed Feedback
-   **Accordion UI:** Users can expand each category (Content, Structure, etc.).
-   **Actionable Tips:** specific advice on what to "Fix" (Warnings) and what "Looks Good" (Checks).

### 🚀 Performance Optimizations
-   **Blob Caching:** Images and PDF blobs are cached in memory after the first load to ensure instant navigation between the list and detail views.
-   **Lazy Loading:** Resumes are fetched only when needed (though the list metadata is fetched upfront).

## Summary of Data Flow
`User Input` -> `Puter FS (File Storage)` -> `Puter AI (Analysis)` -> `Puter KV (Metadata Store)` -> `UI Display`

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Installation**

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/your-username/ai-resume-analyzer.git
    cd ai-resume-analyzer
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```

4.  **Open the App**
    Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## <a name="links">🔗 Assets</a>

*   [Puter.js Documentation](https://docs.puter.com/)
*   [React Router Documentation](https://reactrouter.com/en/main)
*   [Tailwind CSS Documentation](https://tailwindcss.com/docs)
