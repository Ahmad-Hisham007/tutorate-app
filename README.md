# Tutorate Frontend Application

> A modern, responsive React-based frontend for the Tutorate platform.  
> This repository contains only the client-side code powered by Vite, Tailwind CSS and React.

## 🚀 Overview

Tutorate is an online tutoring marketplace that connects students with qualified instructors. The frontend provides
end‑to‑end user experience for browsing tuitions, managing applications, handling payments, and administrative dashboards.

This project is built with the following core technologies:

- **React 19** &mdash; component driven UI
- **Vite** &mdash; dev server and build tool
- **Tailwind CSS** + **daisyUI** &mdash; utility-first styling and prebuilt components
- **React Router 7** &mdash; client-side navigation
- **React Query (TanStack)** &mdash; data fetching and caching
- **Firebase** &mdash; authentication and database
- **Stripe** &mdash; payment processing
- **Axios** &mdash; HTTP client
- **Lottie**, **Swiper**, **AOS** &mdash; animations and UX enhancements
- **Recharts** &mdash; charts for reports

## 🗂️ Project Structure

```
src/
  assets/              # images, animations (Lottie JSON)
  Components/          # reusable UI pieces (cards, loaders, error screens)
  Contexts/            # React context providers (Auth, Query)
  Firebase/            # initialization file
  Hooks/               # custom React hooks (e.g. useRole, useAxiosSecure)
  Layouts/             # layout components (HomeLayout, DashboardLayout)
  Pages/               # route-level pages grouped by feature
  Routes/              # protected/ private route wrappers
  utils/               # helper functions (date formatting)
```

Each page corresponds to a particular route in `src/Routes/Routes.jsx` and typically pulls data via hooks from the backend API.

## ✅ Features

- User authentication with email/password & social logins via Firebase
- Role-based routing (student, tutor, admin) with `ProtectedRoute` and `PrivateRoute`
- Tuition posting, searching, and application management
- Payment flow powered by Stripe (React Stripe.js)
- Admin dashboard for managing users, tuitions, and viewing reports
- Responsive UI with animation effects, empty states, and error handling

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ (https://nodejs.org)
- npm or yarn

### Installation

```bash
git clone <repository-url> tutorate-app
cd tutorate-app
npm install   # or yarn
```

### Environment Variables

Create a `.env` file in the project root and configure any necessary keys such as:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_STRIPE_PUBLISHABLE_KEY=...
VITE_API_BASE_URL=https://your-backend.example.com
```

> Note: all environment variables must be prefixed with `VITE_` for Vite to expose them to the client.

### Development

Run the development server with hot reloading:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
```

A `dist/` folder will be created containing the production assets.

You can preview the production build locally:

```bash
npm run preview
```

## 🔧 Scripts

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start Vite development server      |
| `npm run build`   | Build the app for production       |
| `npm run preview` | Serve the production build locally |
| `npm run lint`    | Run ESLint across the source files |

## 📦 Dependencies

Key packages are defined in `package.json`. Some highlights:

- `react`, `react-dom`
- `@stripe/react-stripe-js`, `stripe`
- `firebase`
- `tailwindcss`, `@tailwindcss/vite`, `daisyui`
- `@tanstack/react-query`
- `axios`, `sweetalert2`, `react-icons`, `swiper`, `aos`

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/xyz`)
3. Make your changes and add tests if applicable
4. Ensure lint passes: `npm run lint`
5. Submit a pull request describing your changes

## 📄 License

This project is open source and available under the **MIT License**.

---

For any questions or issues, feel free to open an issue on GitHub or contact the project maintainer.
