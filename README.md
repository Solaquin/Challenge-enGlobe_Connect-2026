# Challenge-enGlobe_Connect 2026

A full-stack web app for managing and tracking **product/marketing launches** — with a dashboard, a calendar view of upcoming launches, asset uploads, and role-based access control. Built as a submission for the enGlobe Connect 2026 challenge.

## Project Overview and Goals

enGlobe Connect centralizes the lifecycle of a "launch" (e.g. a product or campaign release) in one place, so teams don't have to track it across spreadsheets and chat threads. The goals of the project are to:

- Give teams a **dashboard** with stats and a filterable table of all launches.
- Provide a **calendar view** to see upcoming launch dates at a glance.
- Let users **create, edit, and view launch details**, including uploaded assets (files/images) and status history.
- Support **authentication and role-based permissions**, so only authorized users can create, edit, or manage certain launches.
- Offer a simple **REST API** backend that the frontend (and potentially other clients) can consume.

### Frontend design reference

The frontend UI/UX concept for this project was prototyped in Google Stitch:
🔗 [Stitch design project](https://stitch.withgoogle.com/projects/10278296842097155260)

This is the visual reference used to guide the layout and styling of the dashboard, calendar, and launch forms in the `client` app.

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- npm (comes with Node.js)

### 1. Clone the repository

```bash
git clone https://github.com/Solaquin/Challenge-enGlobe_Connect-2026.git
cd Challenge-enGlobe_Connect-2026
```

### 2. Set up the backend (`server`)

```bash
cd server
npm install
```

Create a `.env` file inside `server/` with at least the following variables:

```env
PORT=8080
JWT_SECRET=your_jwt_secret_here
```

The server uses `better-sqlite3` for the database and will initialize/create the SQLite database automatically on startup (see `server/database/initDatabase.js`).

Start the backend:

```bash
node server.js
```

By default the API runs at `http://localhost:8080` and exposes a health check at `GET /api/health`.

### 3. Set up the frontend (`client`)

In a separate terminal:

```bash
cd client
npm install
npm run dev
```

By default Vite serves the app at `http://localhost:5173`. The backend's CORS config currently only allows requests from this origin, so keep the default port when developing locally.

### 4. Build for production (optional)

```bash
cd client
npm run build
```

This generates a production-ready static build in `client/dist`.

## Technologies Used

**Frontend (`client`)**
- [React 19](https://react.dev/) + [Vite](https://vitejs.dev/) — UI and build tooling
- [React Router](https://reactrouter.com/) — client-side routing and protected routes
- [Tailwind CSS](https://tailwindcss.com/) (v4, via `@tailwindcss/vite`) — styling
- [Axios](https://axios-http.com/) — HTTP client for API calls
- [react-hot-toast](https://react-hot-toast.com/) — notifications
- [react-icons](https://react-icons.github.io/react-icons/) — icon set
- ESLint — linting

**Backend (`server`)**
- [Node.js](https://nodejs.org/) + [Express 5](https://expressjs.com/) — REST API framework
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) — embedded SQLite database
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) — authentication (JWT)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) — password hashing
- [multer](https://github.com/expressjs/multer) — file/asset uploads
- [express-validator](https://express-validator.github.io/) — request validation
- [cors](https://github.com/expressjs/cors) / [dotenv](https://github.com/motdotla/dotenv) — middleware and config

**Design**
- [Google Stitch](https://stitch.withgoogle.com/projects/10278296842097155260) — used to prototype the frontend UI/UX before implementation

## Known Issues or Limitations

- **No root-level environment example file**: a `.env.example` isn't included yet, so required variables (`PORT`, `JWT_SECRET`, and any others used by auth/uploads) need to be inferred from the code until one is added.
- **Hardcoded CORS origin**: the backend only allows `http://localhost:5173` by default, so deploying the frontend elsewhere (or changing the dev port) will require updating `server/app.js`.
- **SQLite as the database**: `better-sqlite3` is great for local development but is a single-file, single-process database — not ideal for production/multi-instance deployments without further changes.
- **No automated tests**: the `server` package's `test` script is a placeholder (`echo "Error: no test specified"`), and no test suite currently exists for either the client or server.
- **No CI/CD pipeline**: there's no GitHub Actions workflow yet for linting, testing, or deployment.
- **Minimal documentation on API endpoints**: routes exist for launches, auth, assets, status history, and dashboard data, but there isn't yet a documented API reference (e.g. OpenAPI/Swagger or Postman collection).
- **Uploaded assets stored on local disk**: files uploaded via `multer` are served from a local `/uploads` directory, which won't persist or scale well in most hosting environments without a dedicated storage solution (e.g. S3).

---

*This README was drafted based on the current repository structure and may need updates as the project evolves.*
