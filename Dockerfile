FROM kkarczmarczyk/node-yarn:latest
MAINTAINER Dolce SAS
LABEL Name=logistic-system-dolce Version=0.2.0

RUN yarn global add concurrently babel-cli

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# Install app dependencies
COPY package.json /usr/src/app
RUN yarn install
# Bundle app source
COPY . /usr/src/app
RUN yarn run build
RUN ls


EXPOSE 8080 3002 27017
CMD ["yarn", "run", "prod"]
