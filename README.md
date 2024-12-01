# Streakify Chrome Extension

Streakify is a Chrome extension that fetches your submission data from **Codeforces** and **Leetcode** using their respective APIs and displays this data in the form of a **heatmap** and a **graph**. It provides a quick overview of your coding streaks and contributions.

This extension is built using **Vite** (for fast development), **React** (for the UI), **TypeScript** (for type safety), and **Tailwind CSS** (for utility-first styling).

---

## Features

- **Fetches data from Codeforces and Leetcode**: Displays your solved problems and submission counts.
- **Heatmap Display**: Visualizes your coding activity in a heatmap similar to GitHub's contributions graph.
- **Interactive Graph**: A graphical representation of your problem-solving streak.
- **Year Selection**: Allows you to view your submission data year-wise.

---

## Tech Stack

- **Vite**: A modern, fast build tool for web development.
- **React**: JavaScript library for building the user interface.
- **TypeScript**: Superset of JavaScript for type safety and improved developer experience.
- **Tailwind CSS**: Utility-first CSS framework for responsive and customizable UI.

---

## Installation

### 1. Clone the Repository

Start by cloning the project repository to your local machine:

```bash
git clone https://github.com/JigyasuRajput/streakify.git
cd streakify
```

### 2. Install Dependencies

#### Option 1: Installing Dependencies via NPM/Yarn

Run the following command to install the dependencies:

```bash
# Using npm
npm install

# OR Using yarn
yarn install
```

This will install all the necessary packages listed in the `package.json` file, including React, Vite, Tailwind CSS, and other dependencies.

#### Option 2: Installing Dependencies Using Docker (Optional)

If you'd prefer to set up the project using Docker, follow these steps:

1. Make sure Docker is installed on your system.
2. Create a Docker container using the provided `Dockerfile`.

```bash
docker build -t streakify-extension .
docker run -it -p 3000:3000 streakify-extension
```

This will start the Vite development server inside a Docker container and map it to port `3000` on your machine.

---

## Running the Extension

### 1. Development Mode

To start the development server, run the following command:

```bash
# Using npm
npm run dev

# OR Using yarn
yarn dev
```

This will start the Vite server and open your extension in a local development environment. You can now test and develop your Chrome extension with live-reloading.

### 2. Build for Production

To build the extension for production (minified and optimized for deployment), use the following command:

```bash
# Using npm
npm run build

# OR Using yarn
yarn build
```

After building the extension, you’ll find the production build in the `dist/` directory. You can load this build into Chrome as an unpacked extension for testing.

### 3. Loading the Extension into Chrome

1. Open **Chrome** and navigate to `chrome://extensions/`.
2. Enable **Developer Mode** by toggling the switch in the top-right corner.
3. Click on **Load unpacked** and select the `dist/` folder from the project directory.
4. The extension should now appear in your browser toolbar.

---

## Features & Components

### 1. **Heatmap**

The heatmap is the core feature of the extension, displaying your coding activity. Each cell in the heatmap represents a day, and the intensity of the color represents the number of problems solved on that day.

- Data is fetched from **Codeforces** and **Leetcode** APIs.
- The heatmap shows activity over a full year, with the option to view data for different years.
- Hovering over a cell shows detailed information like the number of problems solved on that day.

### 2. **Graph**

The graph provides a visual representation of your streaks over time.

- Data points are shown for each month, with the total number of problems solved during that month.
- This graph is interactive, allowing users to hover over data points to get more information.

### 3. **Codeforces and Leetcode API Integration**

The extension fetches data from **Codeforces** and **Leetcode** using their APIs. The extension expects you to provide API keys to fetch the data.

- **Codeforces** API: Fetches user activity and submissions data.
- **Leetcode** API: Fetches the number of problems solved by the user.

---

## Screenshots

Go to assests folder if images are not showing

![UI Screenshot](./assets/UI_screenshot.PNG)
_User Interface to add coding profiles._

![Heatmap Screenshot](./assets/heatmap_screenshot.PNG)
_Example of the heatmap displaying user coding activity._

![Graph Screenshot](./assets/graph_screenshot.PNG)
_Example of the interactive graph showing monthly coding streaks._

---

## Contributing

1. **Fork the Repository**: Fork the repo and create a new branch for your feature or fix.
2. **Make Your Changes**: Implement your feature or fix, ensuring all new code is well-documented and tested.
3. **Submit a Pull Request**: Once your changes are ready, submit a pull request with a detailed explanation of what has been added or fixed.

---
