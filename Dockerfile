# Use the official Node.js 18 slim base image
FROM node:18-slim

# Install the required system dependencies for Chromium and Puppeteer
RUN apt-get update && apt-get install -y \
    wget \
    --no-install-recommends \
    libnss3 \
    libgconf-2-4 \
    libxss1 \
    libasound2 \
    fonts-liberation \
    libx11-xcb1 \
    libxcomposite-dev \
    libxcursor-dev \
    libxi6 \
    libxtst6 \
    libxrandr2 \
    libcups2-dev \
    libgtk-3-0 \
    libdbus-glib-1-2 \
    libxss1 \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Install Puppeteer
RUN npm install puppeteer

# Copy the rest of your application files
COPY . .

# Start your application (adjust according to your app startup command)
CMD ["node", "your-app.js"]
