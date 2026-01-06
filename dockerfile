FROM node:18-alpine

RUN apk update && apk add --no-cache openssl

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 3333

CMD ["npm", "run", "start"]