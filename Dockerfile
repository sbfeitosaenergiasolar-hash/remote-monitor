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

# Copy public and tools directories
COPY public ./public
COPY tools ./tools

# Copy apktool.jar explicitly to ensure it's included
COPY tools/lib/apktool.jar /app/tools/lib/apktool.jar

# Create necessary directories for APK generation
RUN mkdir -p /tmp/apk-builds /app/public/apks

# Download apktool.jar from official source as backup
RUN cd /app/tools/lib && \
    if [ ! -f apktool.jar ] || [ ! -s apktool.jar ]; then \
      echo "Downloading apktool.jar..."; \
      wget -q https://bitbucket.org/iBotPeaches/apktool/downloads/apktool_2.8.1.jar -O apktool.jar; \
    fi && \
    ls -lah apktool.jar

# Verify tools are present
RUN echo "Checking tools..." && ls -lah /app/tools/lib/ && java -jar /app/tools/lib/apktool.jar --version

# Expose port
EXPOSE 8080

# Start the application
CMD ["npm", "run", "start"]
