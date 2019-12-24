FROM node:10.14.2
WORKDIR /var/www/reactjs-web/
COPY . .
RUN npm install --quiet
RUN npm run build