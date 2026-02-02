# React Task Manager

A simple React application for managing tasks, built with Create React App and using JSON Server for a mock backend.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd react-workshop-1
   ```

2. **Install dependencies:**

   Run the following command to install all required dependencies:

   ```bash
   npm install
   ```

## Running the Application

1. **Start the JSON Server (Mock Backend):**

   The app uses JSON Server to simulate a backend API. Run the server on port 8000:

   ```bash
   npm run server
   ```

   This will start the server at `http://localhost:8000` and watch the `db.json` file for changes.

2. **Start the React App:**

   In a new terminal window, run the development server:

   ```bash
   npm start
   ```

   The app will be available at `http://localhost:3000` in your browser.

## Available Scripts

- `npm start`: Runs the app in development mode.
- `npm run server`: Starts the JSON Server for the mock API.
- `npm test`: Launches the test runner.
- `npm run build`: Builds the app for production.
- `npm run eject`: Ejects from Create React App (irreversible).

## Project Structure

- `src/`: Contains the React application code.
- `public/`: Static assets.
- `db.json`: Mock data for the JSON Server.

## Troubleshooting

- **Port Conflicts:** If port 3000 or 8000 is already in use, the application may fail to start. Ensure these ports are free or modify the scripts in `package.json` to use different ports.
- **Installation Issues:** If you encounter errors during `npm install`, try deleting the `node_modules` folder and `package-lock.json` file, then run `npm install` again.

## Features

- Add, view, and manage tasks.
- Mark tasks as completed.
- Responsive design.

## Contributing

Feel free to fork and contribute to this project.

## License

This project is private.
