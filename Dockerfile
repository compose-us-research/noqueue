FROM node:12

RUN mkdir -p /opt/noqueue
COPY . /opt/noqueue

WORKDIR /opt/noqueue/frontend
RUN npm install && npm build

WORKDIR /opt/noqueue/backend
RUN npm install

CMD ["npm", "start"]
