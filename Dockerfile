# Base image
FROM node:14    

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the port on which your Express app is running
EXPOSE 3000

# Start the server
CMD ["npm", "start"]