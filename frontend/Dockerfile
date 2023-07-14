FROM node:18-alpine

RUN apk update

WORKDIR /home/node/app

COPY package*.json ./ 

RUN npm install --production --no-cache
RUN npm install pm2 -g

COPY . /home/node/app/

EXPOSE 3000

CMD ["pm2-runtime", "app.js"]