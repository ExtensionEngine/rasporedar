FROM node:18

LABEL org.opencontainers.image.authors="bdeak@extensionengine.com"
LABEL org.opencontainers.image.source="https://github.com/ExtensionEngine/rasporedar"

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3001

CMD ["yarn", "dev"]
