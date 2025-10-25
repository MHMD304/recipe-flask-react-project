# Flask + React Recipe App

A minimal full‑stack project with a Flask REST API and a React frontend. The backend provides recipe CRUD endpoints and JWT‑based auth; the frontend is a Create React App client configured to proxy API requests to the Flask server in development.

## Tech Stack

- Backend: Flask, Flask-RESTX, SQLAlchemy, Flask-Migrate, Flask-JWT-Extended, python-decouple, Flask-CORS, SQLite (dev)
- Frontend: React (CRA), react-router-dom, styled-components

## Repository Structure

- backend/
  - main.py, run.py, models.py, recipes.py, auth.py, exts.py, config.py
  - migrations/ (Alembic migrations)
  - dev.db (SQLite dev database; ignored in git)
  - .env (local only; do not commit)
  - .env.example (template)
  - requirements.txt
- frontend/
  - package.json, src/, public/
  - README.md (CRA default)

## Prerequisites

- Python 3.10+
- Node.js 18+ and npm

## Setup

### 1) Backend

- Create and activate a virtual environment
  - Windows PowerShell:
    - python -m venv backend/.venv
    - backend/.venv/Scripts/Activate.ps1
- Install dependencies
  - pip install -r backend/requirements.txt
- Configure environment
  - Copy backend/.env.example to backend/.env and set values
- Initialize database (SQLite dev)
  - python backend/init_db.py
- Run the API
  - python backend/run.py
- Swagger docs available at http://127.0.0.1:5000/docs

### 2) Frontend

- Install dependencies
  - cd frontend (or open a new terminal at frontend/)
  - npm install
- Start the dev server
  - npm start
- CRA proxy in frontend/package.json points to http://127.0.0.1:5000 so API calls go to Flask during development

## Environment Variables (backend/.env)

- SECRET_KEY=your_secret
- SQLALCHEMY_TRACK_MODIFICATION=False

## API Overview

- Auth
  - POST /auth/signup — register
  - POST /auth/login — obtain accessToken and refresh_token
  - POST /auth/refresh — obtain new access token (requires refresh token)
- Recipes
  - GET /recipe/recipes — list recipes
  - POST /recipe/recipes — create recipe (JWT required)
  - GET /recipe/recipe/<id> — get by id
  - PUT /recipe/recipe/<id> — update (JWT required)
  - DELETE /recipe/recipe/<id> — delete (JWT required)

## Testing (backend)

- Uses unittest. From backend venv:
  - python -m unittest backend/test_api.py

## Production Notes

- Configure a production database URI in a ProdConfig (not provided yet) or adapt DevConfig.
- Serve the React build separately (e.g., Netlify/Vercel) and deploy Flask on a server (e.g., Render, Railway, Fly.io). Update the frontend to use your API base URL in production.
- Never commit backend/.env or dev.db.

## Common Scripts

- Backend
  - python backend/run.py — run API at :5000
- Frontend
  - npm start — React dev server at :3000
  - npm run build — production build in frontend/build

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
