FROM node:18-alpine as deps
WORKDIR /app
COPY package.json ./
RUN yarn

FROM node:18-alpine as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY .envProd ./.env
RUN yarn build

FROM node:18-alpine as start
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env ./.env
RUN npm install serve -g
EXPOSE 3000
CMD ["serve", "-s", "dist"]
