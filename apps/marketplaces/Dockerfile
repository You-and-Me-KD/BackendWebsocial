FROM node:22.13.1-alpine as development

# Create folder will work on the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock to the container
# This will help to cache the dependencies
# If the package.json or yarn.lock file is not changed, the cache will be used
COPY package*.json ./
COPY yarn.lock ./

# Install yarn globally
# Actually don't need yarn because yarn is already installed in the node image 22.13.1-alpine
# RUN npm install -g yarn

# Install dependencies
RUN yarn install

# Copy the source code to the container
COPY . .

# Build the application
RUN yarn build

FROM node:22.13.1-alpine as production

# Set the NODE_ENV to production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

# RUN npm install -g yarn

# Install only production dependencies(do not install devDependencies)
RUN yarn install --production

# Copy the dist folder from the development container to the production container
COPY --from=development /usr/src/app/dist ./dist

# Start the application
CMD ["node", "dist/apps/marketplaces/main"]