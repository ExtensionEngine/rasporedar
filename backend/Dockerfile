FROM node:18

WORKDIR /app

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install

COPY . .

EXPOSE 3001
CMD ["pnpm", "dev"]
