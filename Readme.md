# Next.js and Django Dashboard Project

## Overview

This project is a dashboard application with a frontend built using Next.js and a backend using Django. The frontend displays various charts, and the backend serves the data for these charts via API endpoints.

## Getting Started

You can quickly start the project using Docker or set it up manually for local development. Follow the instructions below based on your preference.

### Running with Docker

Docker Compose makes it easy to set up and run the project. It will build and start both the frontend and backend services with a single command.

1. **Clone the repository:**

   ```bash
   git clone <https://github.com/ojninja16/next_dashboard.git>
   cd <repository-directory>
2. **Build and start the services:""

   ```bash
   docker-compose up --build
   ```
3. **Access the application:**

    
- **Frontend (Next.js):** Open [http://localhost:3000](http://localhost:3000) in your browser.
- **Backend (Django):** The backend API will be accessible at [http://py-backend:8000/api](http://py-backend:8000/api).

  The `api/data.ts` file in the frontend is configured to use the backend API URL [http://py-backend:8000/api](http://py-backend:8000/api) when running in Docker Compose.

### Running Locally

If you prefer to run the frontend and backend separately on your local machine, follow these steps:

#### Frontend (Next.js)

1. Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Run the Next.js development server:
    ```bash
    npm run dev
    ```

   The frontend will be available at [http://localhost:3000](http://localhost:3000).

#### Backend (Django)

1. Navigate to the `backend` directory:
    ```bash
    cd backend
    ```

2. Create and activate a virtual environment:
    ```bash
    python -m venv env
    source env/bin/activate  # On Windows: env\Scripts\activate
    ```

3. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4. Run Django migrations:
    ```bash
    python manage.py migrate
    ```

5. Start the Django development server:
    ```bash
    python manage.py runserver
    ```

   The backend API will be available at [http://localhost:8000/api](http://localhost:8000/api).

**Note:** If running the frontend and backend separately, ensure that you update the API URL in `api/data.ts` to [http://localhost:8000/api](http://localhost:8000/api) for local development.

To adjust the API URL for Docker, the configuration in `api/data.ts` should be:
```typescript
const API_BASE_URL = 'http://py-backend:8000/api/';
