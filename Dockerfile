FROM kkarczmarczyk/node-yarn:6.9-wheezy
MAINTAINER Dolce SAS
LABEL Name=logistic-system-dolce Version=0.2.0

RUN npm i -g concurrently babel-cli nodemon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# Install app dependencies
COPY . /usr/src/app

RUN yarn install
# Bundle app source
RUN yarn run build
RUN ls

EXPOSE 80 3002 27017
CMD ["yarn", "run", "prod"]
