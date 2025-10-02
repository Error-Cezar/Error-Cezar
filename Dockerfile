# Use the official Bun image
FROM oven/bun:latest

# Update package lists and install ffmpeg
RUN apt-get update && \
    apt-get install -y ffmpeg && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json bun.lock ./
RUN bun install

# Copy all source files, including the public directory
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Start the Bun app
CMD ["bun", "run", "start"]
