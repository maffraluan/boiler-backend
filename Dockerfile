# Build stage
FROM node:alpine AS builder
WORKDIR /build
COPY package.json yarn.lock ./
COPY prisma ./prisma
COPY tsconfig.json ./
COPY src ./src
RUN yarn install --frozen-lockfile --ignore-scripts \
	&& yarn prisma generate \
	&& yarn build

# Production stage
FROM node:alpine
WORKDIR /app

# Create node user's home and set permissions
RUN mkdir -p /home/node && chown -R node:node /home/node

# Install system essentials
RUN apk add --no-cache curl \
	&& apk add --no-cache yarn

# Install production deps in node user's home
WORKDIR /home/node
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile --ignore-scripts \
	&& yarn add dotenv \
	&& yarn cache clean \
	&& yarn global add pm2

# Copy Prisma generated files from builder
COPY --from=builder /build/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /build/node_modules/@prisma ./node_modules/@prisma

# Switch to app directory and copy runtime files
WORKDIR /app
COPY --from=builder /build/dist ./dist
COPY .env ./

# Set NODE_PATH to find modules in node's home
ENV NODE_PATH=/home/node/node_modules

EXPOSE 5005

CMD ["node", "dist/app.js"]
