# Use a Node.js 16 base image
FROM node:16

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install nodemon globally
RUN npm install -g nodemon

# Expose the application port
EXPOSE 3000

# Start the application with nodemon in development
# TODO: change this to make sure this works on prod
CMD ["npm", "run", "start:dev"]