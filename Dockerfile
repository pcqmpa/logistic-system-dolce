
FROM node:latest
MAINTAINER Dolce SAS
LABEL Name=logistic-system-dolce Version=0.0.2 
COPY package.json /tmp/package.json
RUN cd /tmp && npm install --production
RUN mkdir -p /usr/src/app && mv /tmp/node_modules /usr/src
WORKDIR /usr/src/app
COPY . /usr/src/app
EXPOSE 8000
CMD npm run prod
