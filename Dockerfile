FROM node:12

WORKDIR /app

COPY package.json .
COPY dist ./dist

RUN npm i --quiet

ENV NODE_ENV=production
EXPOSE 8000

CMD ["node", "./dist/app.js"]