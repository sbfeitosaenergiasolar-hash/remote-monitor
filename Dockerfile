# Build stage
FROM node:22-alpine AS builder

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

# Runtime stage
FROM node:22-alpine

# Install Java for apktool and jarsigner
RUN apk add --no-cache openjdk17-jre openjdk17-jdk

WORKDIR /app

# Copy built application from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Copy public directory if it exists
RUN mkdir -p /app/public /app/tools

# Copy tools directory from builder
COPY --from=builder /app/tools /app/tools

# Create necessary directories for APK generation
RUN mkdir -p /tmp/apk-builds /app/public/apks

# Expose port
EXPOSE 8080

# Start the application
CMD ["npm", "run", "start"]
