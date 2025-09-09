# STAGE 1: Build the admin UI
FROM node:18-alpine AS build
WORKDIR /opt/app
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# STAGE 2: Setup production environment
FROM node:18-alpine
ENV NODE_ENV=production
WORKDIR /opt/app

COPY --from=build /opt/app/package.json ./
COPY --from=build /opt/app/package-lock.json ./
RUN npm ci --production

COPY --from=build /opt/app/config ./config
COPY --from=build /opt/app/src ./src
COPY --from=build /opt/app/database ./database
COPY --from=build /opt/app/public ./public
COPY --from=build /opt/app/dist ./dist

EXPOSE 1337
CMD ["npm", "run", "start"]