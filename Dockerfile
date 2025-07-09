
FROM node:22

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code into the container
COPY . .

# Expose the port your app uses
EXPOSE 3000

# Command to run your app
CMD ["node", "src/index.js"]
