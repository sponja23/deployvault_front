# deployvault_front

**deployvault_front** is a React application designed to manage authentication, package distribution, and retrieval, with user-friendly UI components and seamless navigation.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Installation](#installation)
4. [Running the App Locally](#running-the-app-locally)
5. [Deployment](#deployment)
6. [Project Structure](#project-structure)
7. [Technologies Used](#technologies-used)
8. [Contributing](#contributing)
9. [License](#license)

## Project Overview

This application provides a user interface for package distribution and retrieval while ensuring secure access through authentication features. It uses modern UI components and routing to create a smooth user experience.

## Features

- **Authentication:** Login and registration functionality with route protection.
- **Package Distribution:** Share and manage access to packages.
- **Package Retrieval:** Download and access available packages.
- **User Interface:** Customizable and reusable components for buttons, inputs, and navigation bars.
- **Responsive Design:** Built with `react-bootstrap` and `prime-react` for a mobile-friendly interface.

## Installation

To run this project locally, you need to have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.

1. Clone the repository:

   ```bash
   git clone git@github.com:CaliforniaOpenSource/deployvault_front.git
   ```

2. Navigate to the project directory:

   ```bash
   cd deployvault_front
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

## Running the App Locally

To start the development server and run the application locally, use the following command:

```bash
npm run dev
```

This will start the app on `http://localhost:5173` by default. You can now open your browser and access the application.

## Deployment

To deploy the application using Vercel, follow these steps:

1. **Install the Vercel CLI:**

   First, you need to install the Vercel CLI globally on your machine:

   ```bash
   npm install -g vercel
   ```

2. **Log in to Vercel:**

   If you haven't already, log in to your Vercel account:

   ```bash
   vercel login
   ```

3. **Deploy the App:**

   Inside your project directory, run the following command to deploy the application:

   ```bash
   vercel
   ```

   Follow the prompts to configure the deployment. Vercel will automatically create a production-ready build and deploy it to a live URL.

4. **Deploy Subsequent Updates:**

   To deploy updates, simply run:

   ```bash
   vercel --prod
   ```

   This will deploy the latest changes to your production site.

## Project Structure

Here's a breakdown of the project's structure:

```plaintext
src/
├── assets/
├── components/
│   ├── CaOSButton/
│   ├── CaOSInput/
│   ├── CaOSSpinner/
├── features/
│   ├── Authentication/
│   │   ├── AuthForm/
│   │   ├── RequireAuth/
│   │   ├── useAuthForm/
│   ├── PackageDistribution/
│   │   ├── PackageDistribution/
│   │   ├── ShareRepoModal/
│   │   ├── usePackageDistribution/
│   │   ├── UserAccessList/
│   ├── PackageRetrieval/
│   │   ├── PackageRetrieval/
│   ├── ui/
│   │   ├── authbar/
│   │   ├── menu/
│   │   ├── Navbar/
│   │   ├── ProfileBar/
│   ├── userSettings/
├── views/
│   ├── Home/
│   ├── Landing/
│   ├── Profile/
│   ├── Layout/
```

### Key Directories:

- **`assets`**: Contains static assets like images and fonts.
- **`components`**: General-purpose, reusable components such as buttons and inputs.
- **`features`**: Organized by functionality, this directory includes modules for authentication, package management, and UI elements.
- **`views`**: Contains page components for different sections of the application, such as Home, Landing, Profile, and Layout.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **React Router**: A routing library for React applications.
- **React Bootstrap**: Provides Bootstrap components for React.
- **PrimeReact**: A collection of rich UI components for React.
- **React Toastify**: Used for toast notifications.

## Contributing

Contributions are welcome! If you'd like to improve this project, please fork the repository and submit a pull request. Here are some things you can do:

- **Report Bugs**: If you find a bug, please report it using GitHub issues.
- **Request Features**: You can request a feature enhancement.
- **Submit PRs**: Fork the project and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

---
