
# Kodack

Kodack is a comprehensive web application designed to enhance coding practice by allowing users to manage and share coding problem lists. The platform provides tools for creating custom lists, tracking progress, and collaborating with others to streamline coding practice and improve problem-solving skills. The project leverages ReactJS, React Query, React Router, Node.js, Express, Prisma, and PostgreSQL to deliver a robust, scalable, and user-friendly experience.

## Project Overview

Kodack is a platform that helps coding enthusiasts and interview aspirants effectively manage LeetCode problem-solving. Users can:

- Access and manage a master list of essential LeetCode problems.
- Create and customize their own problem lists.
- Track progress on individual questions (e.g., mark as done, important, or under review).
- Share curated lists with others using unique access codes.
- Search and filter lists by tags or keywords.
- Collaborate on coding problems with peers or mentors.

## Features

1. **User Authentication**
   - Secure user registration, login, and password management.
   - Password reset functionality.

2. **List Management**
   - Create, update, and delete problem lists.
   - Mark lists as personal, private, or public.

3. **Question Management**
   - Add, update, or remove questions from any list.
   - Track the status of questions (done, important, review).

4. **Access Control**
   - Share lists with others via email or unique access codes.
   - Control who has access to each list and manage permissions.

5. **Dynamic Updates**
   - Dynamically add new questions to the master list by providing links to LeetCode problems.

6. **Search Functionality**
   - Search lists by keywords, topics, or tags to find relevant problem sets quickly.

7. **Audit Logging**
   - Monitor actions and changes with detailed audit logs to track all updates to lists, questions, and user access.

## Getting Started

To set up the Kodack project locally, follow the steps below for the frontend and backend setups.

### Prerequisites

- **Node.js** (v18+)
- **PostgreSQL** (for database)
- **pgAdmin** (optional, for database management and visualization)

Ensure you have all the dependencies installed for both the frontend and backend before running the application.

---

### Frontend Setup

1. **Clone the Repository**

   Clone the Kodack repository to your local machine:

   ```bash
   git clone https://github.com/krsachin9696/kodack.git
   cd kodack
   ```

2. **Install Frontend Dependencies**

   Navigate to the `client` directory and install the necessary packages:

   ```bash
   cd client
   npm install
   ```

3. **Configure Environment Variables**

   In the `client` directory, create a `.env` file with the following variables (you may need to adjust them based on your environment):

   ```env
   REACT_APP_API_URL=http://localhost:3000/api/v1  # Your API server's URL
   REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
   ```

4. **Run the Frontend Development Server**

   Start the frontend application using:

   ```bash
   npm run dev
   ```

   This will start the development server on `http://localhost:5173` by default. You can access the application in your web browser.

---

### Backend Setup

1. **Navigate to the Backend Directory**

   Go to the `server` directory where the backend code resides:

   ```bash
   cd server
   ```

2. **Install Backend Dependencies**

   Install the necessary backend dependencies:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**

   Create a `.env` file in the `server` directory with the following content:

   ```env
   DATABASE_URL=postgresql://
   username:password@localhost:5432/kodack
   PORT=3000
   SESSION_SECRET="your session secret"
   JWT_SECRET="your jwt secret key"
   USER_EMAIL="example@gmail.com"
   EMAIL_PASSCODE="your passcode"
   GOOGLE_CLIENT_ID="your google client id"
   GOOGLE_CLIENT_SECRET="your google client secret"
   ```

4. **Run Database Migrations**

   Ensure you have PostgreSQL running locally, then apply database migrations using Prisma to create the necessary tables:

   ```bash
   npx prisma migrate deploy
   ```

5. **Seed the Database (Optional)**

   If you want to seed the database with some initial data, run the following:

   ```bash
   npx prisma db seed
   ```

6. **Start the Backend Server**

   Start the backend server by running:

   ```bash
   npm run dev
   ```

   This will launch the API server on `http://localhost:3000` by default. The frontend will communicate with this backend to handle authentication, list management, and more.

---

## Contributing

Feel free to fork this repository and submit issues or pull requests for any bugs, new features, or improvements.

---

This setup should help anyone interested in running or contributing to the Kodack project. Just follow the instructions, and you'll have the platform up and running in no time!