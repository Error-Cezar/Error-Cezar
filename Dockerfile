# Use the official Bun image
FROM debian:bookworm
FROM oven/bun:latest

RUN apt update && \
    apt add --no-cache ffmpeg

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
