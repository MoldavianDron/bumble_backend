# Base image
FROM --platform=linux/amd64 node:20-alpine as base

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
COPY . .

# Run only migrations (remove dev command)
CMD npm run migrate up