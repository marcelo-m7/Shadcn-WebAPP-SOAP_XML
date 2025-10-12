# Frontend Application (SOAP Calculator UI)

This is the frontend application for the UAlg SOAP TP1WEB project, developed by Marcelo Santos (a79433) for the "Desenvolvimento de Aplicações Web 2025/26" course.

It provides a user interface to interact with the SOAP arithmetic service via a RESTful proxy.

## Technologies Used

*   **React**: A JavaScript library for building user interfaces.
*   **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
*   **Vite**: A fast build tool for modern web projects.
*   **Tailwind CSS**: A utility-first CSS framework for styling.
*   **shadcn/ui**: Re-usable components built using Radix UI and Tailwind CSS.
*   **Sonner**: A toast component for notifications.

## How to Run

To run this frontend application, ensure the SOAP server and SOAP proxy are already running.

1.  **Install dependencies (from the monorepo root):**
    ```bash
    pnpm install
    ```
2.  **Start the frontend application:**
    ```bash
    pnpm --filter frontend dev
    ```
    This will start the development server, typically on `http://localhost:32100`.

3.  **Open in browser:**
    ```bash
    pnpm open:frontend
    ```
    Or navigate to `http://localhost:32100` in your web browser.

## Project Structure

*   `src/main.tsx`: Entry point for the React application.
*   `src/App.tsx`: Defines the main application structure and routes.
*   `src/pages/Index.tsx`: The main landing page displaying project information and the calculator.
*   `src/components/Calculator.tsx`: The core calculator component.
*   `src/lib/api.ts`: Utility for making API calls to the SOAP proxy.
*   `src/components/ui/*`: shadcn/ui components.