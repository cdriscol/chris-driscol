FROM node:8
MAINTAINER Chris Driscol <chris@driscolsoftware.com>

WORKDIR /usr/src/app

COPY package.json yarn.lock /usr/src/app/
RUN yarn
COPY . /usr/src/app

ENV NODE_ENV production

EXPOSE 8080
EXPOSE 9001
CMD ["yarn", "bs"]
