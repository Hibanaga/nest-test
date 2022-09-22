# syntax=docker/dockerfile:1

FROM node:16.15.1-alpine AS base

WORKDIR /app
COPY [ "package.json", "yarn.lock*", "./" ]

FROM base AS dev
RUN yarn install --frozen-lockfile
COPY . .
CMD [ "yarn", "start:dev" ]

FROM base AS prod
RUN yarn install --frozen-lockfile --production
COPY . .
RUN yarn global add @nestjs/cli
RUN yarn build
CMD [ "yarn", "start:prod" ]
