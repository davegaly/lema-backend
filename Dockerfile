FROM node:lts-alpine
ENV NODE_ENV=production
ENV SERVER_ENV=dev
ENV LISTENING_PORT=9001
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 9001
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
