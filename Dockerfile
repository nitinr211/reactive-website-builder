# Use a lightweight Node.js image
FROM node:16-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for better caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --force

# Manually install `path-browserify` for Webpack 5 compatibility
RUN npm install path-browserify

# Copy the rest of the React app files
COPY . .

# Inject Webpack fallback config for 'path' module
RUN echo 'module.exports = { resolve: { fallback: { "path": require.resolve("path-browserify") } } }' > webpack.config.js

# Build the React app
RUN npm run build

# Install serve globally to serve the built React files
RUN npm install -g serve

# Expose port 5000 for the server
EXPOSE 5000

# Use ENTRYPOINT to prevent accidental overrides
ENTRYPOINT ["serve", "-s", "build", "-l", "5000"]
