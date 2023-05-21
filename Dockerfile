FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm i --production
CMD ["node", "server.js"]
EXPOSE 3000