FROM node:12

RUN mkdir -p /app
COPY . /app

WORKDIR /app/frontend
RUN yarn install && yarn build

WORKDIR /app/backend
RUN npm install

CMD ["npm", "start"]
