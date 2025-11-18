# Store Rating Application

Full-stack application for store ratings with role-based access control.

## Tech Stack
- **Backend**: NestJS + TypeORM
- **Database**: PostgreSQL
- **Frontend**: React + Vite

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **PostgreSQL** (version 14 or higher) - [Download here](https://www.postgresql.org/download/)
- **npm** or **yarn** package manager (comes with Node.js)

## Step-by-Step Setup Instructions

### Step 1: Database Setup

1. **Start PostgreSQL service** (if not already running)
   - Windows: PostgreSQL should start automatically, or use Services app
   - Mac: `brew services start postgresql`
   - Linux: `sudo systemctl start postgresql`

2. **Create the database**
   
   Open PostgreSQL command line (psql) or use a GUI tool like pgAdmin:
   ```sql
   CREATE DATABASE store_rating_db;
   ```

   Or using command line:
   ```bash
   psql -U postgres
   CREATE DATABASE store_rating_db;
   \q
   ```

### Step 2: Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the `backend` directory:
   ```bash
   copy .env.example .env
   ```
   
   Edit the `.env` file with your database credentials:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=your_postgres_password
   DB_DATABASE=store_rating_db
   JWT_SECRET=your-secret-key-change-in-production
   PORT=3000
   ```

4. **Start the backend server**
   ```bash
   npm run start:dev
   ```

   You should see:
   ```
   Admin user created
   Application is running on: http://localhost:3000
   ```

   The backend will automatically:
   - Create database tables
   - Seed a default admin user

### Step 3: Frontend Setup

1. **Open a new terminal** (keep backend running)

2. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   You should see:
   ```
   VITE v5.x.x  ready in xxx ms
   ➜  Local:   http://localhost:5173/
   ```

### Step 4: Access the Application

1. **Open your browser** and navigate to:
   ```
   http://localhost:5173
   ```

2. **Login with default admin credentials**:
   - Email: `admin@system.com`
   - Password: `Admin@123`

## User Roles & Access

### 1. System Administrator
- Add new stores, users, and admin users
- View dashboard with statistics (total users, stores, ratings)
- Manage all users and stores
- Apply filters on listings
- Full system access

### 2. Normal User
- Register and login
- View all stores
- Search stores by name and address
- Submit ratings (1-5) for stores
- Update their own ratings
- Change password

### 3. Store Owner
- Login to platform
- View their store's ratings
- See average rating
- View list of users who rated their store
- Change password

## Testing the Application

### Create a Normal User
1. Click "Register" on login page
2. Fill in the form (remember: name must be 20-60 characters)
3. Submit and you'll be logged in as a normal user

### Create a Store (as Admin)
1. Login as admin
2. Navigate to Stores section
3. Add a new store with owner details

### Submit a Rating (as Normal User)
1. Login as normal user
2. Browse stores
3. Click on star rating to submit (1-5 stars)

## Form Validation Rules

- **Name**: 20-60 characters
- **Email**: Valid email format
- **Password**: 8-16 characters, must include at least one uppercase letter and one special character
- **Address**: Maximum 400 characters

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

### Users (Admin only)
- `GET /users` - List all users (with filters)
- `POST /users` - Create new user
- `GET /users/count` - Get total user count
- `PATCH /users/password` - Update password

### Stores
- `GET /stores` - List all stores (with filters)
- `POST /stores` - Create store (Admin only)
- `GET /stores/count` - Get total store count

### Ratings
- `POST /ratings` - Submit/update rating
- `GET /ratings/store/:storeId` - Get store ratings
- `GET /ratings/user/:storeId` - Get user's rating for a store
- `GET /ratings/count` - Get total ratings count

## Troubleshooting

### Backend won't start
- Check PostgreSQL is running
- Verify database credentials in `.env`
- Ensure database `store_rating_db` exists

### Frontend can't connect to backend
- Ensure backend is running on port 3000
- Check for CORS errors in browser console

### Database connection errors
- Verify PostgreSQL service is running
- Check username/password in `.env`
- Ensure database exists

## Project Structure

```
store-rating-app/
├── backend/
│   ├── src/
│   │   ├── auth/          # Authentication module
│   │   ├── users/         # Users module
│   │   ├── stores/        # Stores module
│   │   ├── ratings/       # Ratings module
│   │   ├── entities/      # Database entities
│   │   └── main.ts        # Application entry
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/         # React pages
│   │   ├── context/       # Auth context
│   │   └── main.jsx       # App entry
│   └── package.json
└── README.md
```

## Default Admin Credentials

**Email**: admin@system.com  
**Password**: Admin@123

⚠️ **Important**: Change the admin password after first login in production!
