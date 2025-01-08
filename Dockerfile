# Dockerfile for React server
FROM node:16-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy React app files
COPY . .

# Install dependencies with --force and build the app
RUN npm install --force && npm run build

# Use a lightweight HTTP server to serve the static files
RUN npm install -g serve

# Expose the port for the React app
EXPOSE 5000

# Start the server
CMD ["serve", "-s", "build", "-l", "5000"]

