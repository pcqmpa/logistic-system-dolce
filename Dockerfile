
FROM node:latest
MAINTAINER Dolce SAS
LABEL Name=logistic-system-dolce Version=0.0.2 
COPY package.json /usr/src/app
RUN npm install
COPY . /usr/src/app
RUN npm run build

EXPOSE 8000
CMD npm run prod
