# AI_RULES.md

This document outlines the core technologies and best practices for developing this application.

## Tech Stack Overview

This application is built using a modern web development stack, focusing on performance, scalability, and a great user experience. Key technologies include:

*   **Next.js**: A React framework for building full-stack web applications, enabling server-side rendering (SSR), static site generation (SSG), and API routes.
*   **React**: The core JavaScript library for building user interfaces, providing a component-based architecture.
*   **TypeScript**: A superset of JavaScript that adds static typing, enhancing code quality and maintainability.
*   **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs directly in your markup.
*   **Shadcn/ui**: A collection of reusable UI components built with Radix UI and styled with Tailwind CSS, providing a consistent and accessible design system.
*   **Radix UI**: A low-level UI component library that provides unstyled, accessible components, which Shadcn/ui builds upon.
*   **Lucide React**: A library for beautiful and customizable open-source icons.
*   **Vercel Blob**: A service for storing and serving files, used for handling image, video, and audio uploads.
*   **React Hook Form & Zod**: Libraries for efficient and flexible form management and schema-based validation.
*   **Next Themes**: A simple and effective solution for managing dark and and light themes in Next.js applications.
*   **Sonner**: A modern toast notification library for displaying non-intrusive messages to the user.

## Library Usage Rules

To maintain consistency, readability, and efficiency across the codebase, please adhere to the following guidelines when choosing and using libraries:

*   **UI Components**: Always prioritize using components from `shadcn/ui` (located in `components/ui/`). If a specific component is not available or requires significant customization, create a new component that wraps or extends existing `shadcn/ui` primitives rather than building from scratch.
*   **Styling**: All styling should be done using **Tailwind CSS** classes. Avoid writing custom CSS or using other styling solutions unless absolutely necessary for integrating third-party libraries that lack Tailwind support.
*   **Icons**: Use icons exclusively from the **`lucide-react`** library.
*   **Forms and Validation**: For all form handling, use **`react-hook-form`**. For schema validation, integrate **`zod`** with `@hookform/resolvers`.
*   **Theme Management**: Implement dark and light mode toggling using the **`next-themes`** library.
*   **Toast Notifications**: For displaying user notifications (toasts), use the **`sonner`** library.
*   **File Uploads**: Utilize the `@vercel/blob` package and the provided utility functions in `lib/blob-upload.ts` for all file upload functionalities.
*   **Wallet & Blockchain Interaction**: For connecting to MetaMask and handling Ethereum transactions, use the custom `use-wallet.ts` hook.
*   **Token Management**: For managing cryptocurrency tokens within the application, use the custom `use-token-management.ts` hook.
*   **Routing**: As this is a Next.js application, routing is handled by the file-system based router in the `app/` directory. Do not introduce `react-router-dom` or similar client-side routing libraries.