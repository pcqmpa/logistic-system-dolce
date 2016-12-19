FROM kkarczmarczyk/node-yarn
# MAINTAINER Mateo Quintero <quinterom1592@gmail.com>

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN yarn install
COPY . /usr/src/app
RUN yarn run build

ENV NODE_ENV production

EXPOSE 8000
CMD ["yarn", "run", "prod"]

