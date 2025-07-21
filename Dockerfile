# Use a lightweight Node.js image
FROM node:16-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first for better caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --force

# Copy the entire app, including config-overrides.js
COPY . .

# Debug: Check if `config-overrides.js` exists inside the container
RUN ls -la /usr/src/app
RUN cat /usr/src/app/config-overrides.js

# Build the React app using react-app-rewired
CMD ["npm", "start"]

# Install serve globally to serve the built React files
RUN npm install -g serve

# Expose port 5000 for the server
EXPOSE 5000

# Start the server
ENTRYPOINT ["serve", "-s", "build", "-l", "5000"]
