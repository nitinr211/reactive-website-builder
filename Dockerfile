# Use a lightweight Node.js image
FROM node:16-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first for better caching
COPY package.json package-lock.json ./

# Install dependencies, including customize-cra and react-app-rewired
RUN npm install --force

# Copy the entire app, including `config-overrides.js`
COPY . .

# Ensure Webpack recognizes `path-browserify`
RUN ls -la /usr/src/app  # Debug: Check if config-overrides.js exists
RUN cat /usr/src/app/config-overrides.js  # Debug: Show its content

# Build the React app using react-app-rewired
RUN npm run build

# Install serve globally to serve the built React files
RUN npm install -g serve

# Expose port 5000 for the server
EXPOSE 5000

# Start the server
ENTRYPOINT ["serve", "-s", "build", "-l", "5000"]
