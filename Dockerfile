# Use the official Node.js 20 image from Docker Hub
FROM node:20

# Create and set the working directory inside the container
WORKDIR /src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application's source code
COPY . .

# Expose port 3000 to the host machine
EXPOSE 3000

# Define the command to run your app
CMD [ "npm", "start" ]