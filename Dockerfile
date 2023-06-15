FROM node:16.3.0-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/
RUN npm install
COPY . /app
RUN npm run build
CMD [ "npm", "run", "start" ]