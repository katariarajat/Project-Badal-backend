# Choose the Image which has Node installed already
FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

EXPOSE 8080
RUN npm install
CMD ["npm", "start"]