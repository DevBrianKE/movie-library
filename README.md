Certainly! Here's the `README.md` content in a format that you can directly copy and paste into your Markdown file:

```md
# Movie Library Application

This is a React-based web application designed to manage a movie library. Users can search for movies, add movies to a personal library, view detailed information about each movie, and remove movies from their library. The application allows users to toggle between light and dark themes and supports protected routes for certain features. The app interacts with a backend API to manage movie data.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Protected Routes and Authentication](#protected-routes-and-authentication)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The Movie Library Application is built using the React library. It allows users to perform the following actions:

- Search for movies.
- Add movies to a personal library.
- Remove movies from the library.
- View information about individual movies.
- Switch between light and dark themes.
- Navigate through multiple routes including movies, series, and episodes.

## Features

1. **Movie Search**: Users can search for movies by title using an external API.
2. **Movie Library**: Add and remove movies from the local library.
3. **Movie Details**: View detailed information about each movie, including its poster, release date, and more.
4. **Series and Episodes Management**: Manage both series and episodes.
5. **Light/Dark Theme**: Toggle between light and dark mode themes.
6. **Responsive Design**: Optimized for both desktop and mobile views.

## Technologies Used

- **React**: Frontend library for building the user interface.
- **React Router**: For routing and navigation between different views.
- **Fetch API**: For making asynchronous requests to a public API.
- **JSON Server**: For a simple mock backend to manage movie data.
- **CSS**: For styling the application and theming.
- **Local Storage**: To save user theme preferences.

## Getting Started

### Prerequisites

- **Node.js** and **npm** (Node Package Manager) are required. You can download Node.js from [here](https://nodejs.org/).
- Basic understanding of React and JavaScript is recommended.

### Installation

1. **Clone the repository**:

   ```bash
   git clone git@github.com:DevBrianKE/movie-library.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd movie-library-app
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

### Running the Application

To run the application locally, you need to ensure that you have set up your environment variables (see [Environment Variables](#environment-variables) section). Once done:

1. **Start the development server**:

   ```bash
   npm start
   ```

   This will launch the application in development mode. Open `http://localhost:3000` to view it in the browser.

2. **Run the mock backend server (JSON Server)**:

   ```bash
   npx json-server --watch db.json --port 8000
   ```

   This will start a JSON server that acts as the backend for managing movie data. The application expects the backend to be running on `http://localhost:8000`.

## Environment Variables

The app relies on environment variables to fetch movie data from the backend. Create a `.env` file in the root directory and add the following variables:

```bash
REACT_APP_API_URL=http://localhost:8000
```

- `REACT_APP_API_URL`: URL of the backend server. Defaults to `http://localhost:8000` if not provided.

Make sure to restart the development server after making changes to the environment variables.

## Available Scripts

In the project directory, you can run the following scripts:

### `npm start`

Runs the app in the development mode. Open `http://localhost:3000` to view it in your browser. The page will reload if you make edits. You will also see any lint errors in the console.

### `npm test`

Launches the test runner in interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified, and the filenames include hashes.

### `npx json-server`

Starts a mock backend using JSON Server. Ensure the server is running on `http://localhost:8000` for the app to work correctly.

## Deployment

To deploy this application, you can use services like [Render](https://render.com), [Netlify](https://www.netlify.com/), or [Vercel](https://vercel.com/). Below are the steps for deploying on [Render](https://render.com):
##NB; this application has already been deployed  [https://movie-library-1-fve9.onrender.com/]

1. **Create a new Web Service** on Render.
2. **Connect the repository** by linking it to your GitHub account.
3. **Set environment variables** (`REACT_APP_API_URL`) in the Render dashboard under the environment tab.
4. **Deploy the application** and Render will build and host the project.

Once deployed, you can access the application via the URL provided by Render.

## Contributing
The following contributed to the project ;
stanleyndonj
@DevBrianKE
DevBrianKE DevBrianKE
@annmutemi
annmutemi
@MungaiMunene
MungaiMunene

If you wish to contribute to this project:

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes with clear and concise messages.
4. Push your branch and open a pull request.

We welcome all contributions, bug fixes, and feature improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
```
