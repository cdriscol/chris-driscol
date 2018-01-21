FROM node
MAINTAINER Chris Driscol <chris@driscolsoftware.com>

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN yarn
COPY . /usr/src/app

ENV NODE_ENV production

EXPOSE 8080
CMD ["yarn", "bs"]