FROM node:12-alpine AS build
RUN mkdir -p /app/backend && mkdir -p /app/frontend

# Install dependencies (changes not too often)
COPY backend/package.json /app/backend/package.json
COPY backend/package-lock.json /app/backend/package-lock.json
COPY frontend/package.json /app/frontend/package.json
COPY frontend/yarn.lock /app/frontend/yarn.lock

WORKDIR /app/frontend
RUN yarn install

WORKDIR /app/backend
RUN npm ci

# Copy regular files and build
COPY backend /app/backend
COPY frontend /app/frontend

WORKDIR /app/backend

WORKDIR /app/frontend
RUN yarn build

FROM node:12-alpine AS runner
RUN mkdir -p /app/backend && mkdir -p /app/frontend
WORKDIR /app/backend
COPY backend/package.json /app/backend/package.json
COPY backend/package-lock.json /app/backend/package-lock.json
RUN npm ci --only=production
COPY backend /app/backend
COPY --from=build /app/frontend/build /app/frontend/build

# Run the backend
CMD ["npm", "start"]
