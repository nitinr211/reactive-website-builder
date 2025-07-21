# Use a lightweight Node.js image
FROM node:16-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first for better caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --force

# Use a lightweight Node.js image
FROM node:16-alpine

WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install --force
COPY . .

EXPOSE 5000

CMD ["npm", "start"]
