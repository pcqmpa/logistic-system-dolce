FROM node:boron
MAINTAINER Dolce SAS
LABEL Name=logistic-system-dolce Version=0.2.0

RUN npm i -g concurrently babel-cli

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# Install app dependencies
COPY package.json /usr/src/app
RUN npm i
# Bundle app source
COPY . /usr/src/app
RUN npm run build
RUN ls
RUN mkdir -p /usr/src/app/build/orders-pictures


EXPOSE 80 3002 27017
CMD ["npm", "run", "prod"]
