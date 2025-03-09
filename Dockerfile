# Use a lightweight Node.js image
FROM node:16-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first for better caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --force

# Copy the entire app
COPY . .

# Build the React app
RUN npm run build

# Install serve globally to serve the built React files
RUN npm install -g serve

# Expose port 5000 for the server
EXPOSE 5000

# Start the server
ENTRYPOINT ["serve", "-s", "build", "-l", "5000"]
