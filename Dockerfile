# Build stage
FROM node:22 AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@latest

# Copy package files and patches
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm build

# Runtime stage - Ubuntu with Android build tools
FROM ubuntu:22.04

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    git \
    openjdk-17-jdk \
    gradle \
    android-sdk \
    nodejs \
    npm \
    && rm -rf /var/lib/apt/lists/*

# Install pnpm
RUN npm install -g pnpm@latest

# Set up Android SDK environment
ENV ANDROID_HOME=/usr/lib/android-sdk
ENV PATH=${ANDROID_HOME}/tools:${ANDROID_HOME}/platform-tools:${PATH}

WORKDIR /app

# Copy built application from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/tools ./tools

# Create necessary directories for APK generation
RUN mkdir -p /tmp/apk-builds /app/public/apks

# Expose port
EXPOSE 8080

# Start the application
CMD ["npm", "run", "start"]
