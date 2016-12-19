
FROM node:latest
MAINTAINER Dolce SAS
LABEL Name=logistic-system-dolce Version=0.0.2 

RUN npm install -g concurrently babel-cli
COPY package.json /usr/src/app/package.json
RUN cd /usr/src/app && npm install
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm run build

EXPOSE 8000
CMD npm run prod
