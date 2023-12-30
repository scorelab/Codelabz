FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the entire project directory to the container
COPY . .

# Expose the desired port for the Node.js server
EXPOSE 5173

# Run the Node.js server
CMD [ "npm", "run", "dev", "--host" ]
