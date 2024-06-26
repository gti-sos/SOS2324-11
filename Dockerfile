# Base image
FROM node:latest

# Move to app folder
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the app code to the image
COPY . .

# Copy the frontend files
COPY frontend/* ./frontend

EXPOSE 8080
CMD [ "npm", "start" ]
