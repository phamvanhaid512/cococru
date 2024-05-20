FROM --platform=linux/amd64 node:16
RUN mkdir -p /home/node/app/

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm","start" ]
