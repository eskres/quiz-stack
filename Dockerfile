# Stage 1: Build React frontend
FROM node:18-alpine AS build-frontend
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
# Respect existing postbuild script (moves build to ../quiz-stack-back-end/)
ARG REACT_APP_API_URL=""
ENV REACT_APP_API_URL=$REACT_APP_API_URL
RUN mkdir -p /app/quiz-stack-back-end && npm run build

# Stage 2: Production server
FROM node:18-alpine
WORKDIR /app
COPY server/package*.json ./
RUN npm ci --omit=dev
COPY server/ ./
# Copy the built frontend (placed by postbuild script) into server's expected location
COPY --from=build-frontend /app/quiz-stack-back-end/build ./build
EXPOSE 5000
CMD ["node", "server.js"]
