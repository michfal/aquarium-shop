# 🐠 Aquarium Shop – E-commerce Frontend

A **e-commerce frontend application** for an aquarium store, created as a **portfolio project**.

The project demonstrates real-world frontend development skills, including:
- scalable component architecture,
- clean and maintainable TypeScript code,
- good UX practices (loading states, skeletons),
- integration with a real backend service.

---

## 🎯 Project Purpose

This project was built as a **realistic showcase application**, similar to what is commonly developed in commercial environments.

It focuses on:
- consuming real backend data instead of mock data,
- handling asynchronous data fetching and UI states,
- demonstrating architectural decision-making,
- creating a solid foundation for further feature expansion.

The project serves as a **portfolio piece** for recruiters and technical reviewers.

---

## 🛠️ Tech Stack

### Frontend
- **Vue 3** (Composition API)
- **TypeScript**
- **Vite**
- **Pinia** – state management
- **Vue Router**
- **SCSS / CSS Modules**

### Backend / Data
- **Supabase** – PostgreSQL database & API
- Supabase client for data fetching

### Tooling
- **ESLint + Prettier**

---

## ✨ Features

- product list fetched from **Supabase**,
- reusable product card components,
- skeleton loaders while data is loading,
- responsive layout (desktop & mobile),
- clean separation of UI and data-fetching logic,
- ready for further Supabase features (auth, storage).

---

## 🧠 Architectural Decisions

- **Composition API** for better logic reuse and readability,
- **Pinia** for centralized state and async data handling,
- **Supabase** as a backend-as-a-service to simulate real API usage,
- **Skeleton loaders** instead of spinners for better perceived performance,
- modular folder structure (`components`, `views`, `stores`).

---

## 🔌 Data Flow

1. Frontend requests data using the Supabase client.
2. Data is fetched from a PostgreSQL database.
3. Application state is managed via Pinia stores.
4. UI displays skeleton loaders until data is resolved.

---

## 🚀 Local Setup

```bash
git clone https://github.com/michfal/aquarium-shop.git
cd aquarium-shop
npm install
npm run dev

