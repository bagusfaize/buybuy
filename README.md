# LGQ Shop Explorer

### Live Demo
The application is deployed on Vercel:

**[https://lgq-shop-explorer.vercel.app/](https://lgq-shop-explorer.vercel.app/)**

***

### Tech Stack
* React 19 / TypeScript
* Vite
* React Router
* TanStack Query
* Zustand (Client-side State Management)
* TailwindCSS

### Implementation

* **API Data:** Products are fetched using **TanStack Query** from the **Platzi Fake Store API**.
* **Cart State:** The optimistic update with Tanstack Query **not implemented** since I can't find dedicated cart API on Fake Store API Docs. The cart state managed on the **client side** using **Zustand**, with state persisted across reloads using zustand middleware.

***

### How to Run Locally

Follow these steps to get a copy of the project running on your local machine.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/bagusfaize/lgq-shop-explorer.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd lgq-shop-explorer
    ```
3.  **Install dependencies** using npm:
    ```bash
    npm install
    ```
4.  **Start the development server:**
    ```bash
    npm run dev
    ```

The application running at `http://localhost:5173`.
