FROM node:latest
WORKDIR /app
COPY package.json /app/
RUN yarn install
COPY . /app
RUN npm install -g nodemon
CMD [“node”, app.js”]
EXPOSE 3000