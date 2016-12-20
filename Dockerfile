
FROM node:boron
MAINTAINER Dolce SAS
LABEL Name=logistic-system-dolce Version=0.0.2 

RUN npm install -g concurrently babel-cli

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# Install app dependencies
COPY package.json /usr/src/app
RUN npm install
# Bundle app source
COPY . /usr/src/app
RUN npm run build
RUN ls


EXPOSE 3001
CMD ["npm", "run", "prod"]
