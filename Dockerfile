
FROM node:latest
MAINTAINER Dolce SAS
LABEL Name=logistic-system-dolce Version=0.0.2 
COPY package.json /tmp/package.json
RUN npm install -g concurrently babel-cli
RUN cd /tmp && npm install --production
RUN mkdir -p /usr/src/app && mv /tmp/node_modules /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm run build

EXPOSE 8000
CMD npm run prod
