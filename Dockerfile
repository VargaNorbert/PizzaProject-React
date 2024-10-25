FROM node:alpine AS development
WORKDIR /react-app
COPY ./package*.json /react-app
RUN npm install --verbose
COPY . .
CMD ["npm","start"]
