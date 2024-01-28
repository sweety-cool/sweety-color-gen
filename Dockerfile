FROM node:18

# mkdir /app && cd /app
WORKDIR /sweety-color-gen

COPY . .

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "dev"]
