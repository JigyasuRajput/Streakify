# Use the official Node.js image from Docker Hub (the latest version)
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the container
COPY package*.json ./

# Install dependencies
RUN npm install
# If you are using Yarn instead of npm, use the following:
# RUN yarn install

# Copy the rest of the application code to the container
COPY . .

# Expose the port the app will run on (default Vite port is 3000)
EXPOSE 3000

# Command to run the app (development mode using Vite)
CMD ["npm", "run", "dev"]
# Or if you're using Yarn:
# CMD ["yarn", "dev"]
