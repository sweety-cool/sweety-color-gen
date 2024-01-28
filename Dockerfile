FROM node:18


WORKDIR /sweety-color-gen

COPY . .

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "dev"]
