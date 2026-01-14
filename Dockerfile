# ---------- Build Stage ----------
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies and build the Vite app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ---------- Production Stage ----------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Install only production dependencies
COPY package*.json ./
RUN npm install --production

# Copy build output and server
COPY --from=builder /app/dist ./dist
COPY server.js ./

# Use the PORT env var set by the platform (default 5000)
ENV PORT=5000
EXPOSE 5000

CMD ["node", "server.js"]
