FROM node:16.8.0-alpine3.14
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/
RUN npm install
COPY . /app
RUN npm run build
CMD [ "npm", "run", "start" ]