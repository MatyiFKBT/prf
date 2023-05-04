# dockerfile for the server
FROM node:lts-alpine

WORKDIR /usr/src/app/client
# using pnpm for package management
RUN npm install -g pnpm

# first install client dependencies
COPY client/package.json client/pnpm-lock.yaml ./
RUN pnpm install

# then install server dependencies
WORKDIR /usr/src/app/server
COPY server/package.json server/pnpm-lock.yaml ./
RUN pnpm install

# copy the rest and run client build
WORKDIR /usr/src/app
COPY . .
WORKDIR /usr/src/app/client
RUN pnpm run build

WORKDIR /usr/src/app/server
RUN pnpm run build

# expose port 3000
EXPOSE 3000

# run the server
CMD ["pnpm", "run", "start"]