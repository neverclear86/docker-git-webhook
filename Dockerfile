FROM node:latest
EXPOSE 80
ADD app /app
WORKDIR /app
ENTRYPOINT yarn start
