FROM node:22.13.1-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build
CMD ["yarn", "start:dev"]