<div align="center">
  <h1 align="center">MeoStation — Frontend</h1>
  <h3>Hotel Management & Booking Platform</h3>

<img src="public/hotel-icon.avif" alt="HotelMaster" style="width:80px;height:80px"></a>

</div>

![Vite](https://img.shields.io/badge/Vite-DevServer-brightgreen?logo=vite)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-skyblue?logo=tailwindcss)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-RTK-purple?logo=redux)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

## Overview

React + Vite frontend for a Hotel Management & Booking system. It provides a full user experience: search and browse hotels, check availability, create bookings and payments, manage user profiles, and an admin dashboard to manage hotels, bookings, contacts, vouchers and notifications.

## Main features

- **Admin dashboard:** manage hotels, rooms, bookings, blogs, contacts, vouchers, and notifications.
- **Hotel browsing & filtering:** lists, search, categories, location filters, and paginated results.
- **Booking flow:** select rooms, choose dates, guest selection, view price breakdown, and complete bookings (payment handled by backend services).
- **Payments & orders:** integrations with payment providers (Momo, ZaloPay, etc.) handled by backend controllers and services.
- **Authentication & profiles:** register, login, email/phone verification, and manage user profiles.
- **Real-time notifications:** socket-based updates for booking status, admin messages, and promotional notifications.
- **Blog & content:** blog pages and rich content support for hotel articles and announcements.
- **File & media uploads:** upload hotel images and assets via Cloudinary integration.
- **Reviews & ratings:** guests can rate hotels and leave comments; admin can moderate reviews.
- **Vouchers & discounts:** create and apply vouchers for bookings.

## Demo

<img src="public/hotel-demo-1.gif" width="840" alt="Demo GIF 1">
<br>
<img src="public/hotel-demo-2.gif" width="840" alt="Demo GIF 2">
<br>
<img src="public/hotel-demo-3.gif" width="840" alt="Demo GIF 3">
<br>
<img src="public/hotel-demo-4.gif" width="840" alt="Demo GIF 4">

## Tech stack

- ![Vite](https://img.shields.io/badge/Vite-~6.0-brightgreen) `Vite` — Fast build tool and dev server used to run and bundle the app.
- ![React](https://img.shields.io/badge/React-19-blue) `React` — UI library for building the SPA and components.
- ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.x-skyblue) `Tailwind CSS` — Utility-first CSS framework for styling components.
- ![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.x-purple) `Redux Toolkit` — Predictable app state management (slices in `src/redux/`).
- ![Socket.IO](https://img.shields.io/badge/Socket.IO-4.x-orange) `socket.io-client` — Realtime client for notifications and live events.
- ![Axios](https://img.shields.io/badge/Axios-1.x-0052CC) `axios` — HTTP client for API requests (API layer in `src/apis/`).
- ![Ant Design](https://img.shields.io/badge/AntDesign-5.x-cyan) `antd` — UI component library used in parts of the admin UI.

## Install & development

1. Clone the repository

```powershell
git clone https://github.com/Panda0712/Meo-Station.git
```

2. Install dependencies

```powershell
npm install
```

3. Run development server

```powershell
npm run dev
```

4. Build for production

```powershell
npm run build
```

5. Preview production build

```powershell
npm run preview
```

## Notes

- For image uploads this project uses Cloudinary.
