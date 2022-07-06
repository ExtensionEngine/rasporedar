FROM node:18

WORKDIR /app

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

COPY package.json ./

RUN pnpm install

COPY . .

EXPOSE 3000
CMD ["pnpm", "dev"]