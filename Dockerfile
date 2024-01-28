FROM node:18


WORKDIR /sweety-color-gen

COPY . .

RUN npm install

EXPOSE 8080

<<<<<<< HEAD
CMD ["npm", "run", "dev"]
=======
CMD ["npm", "run", "dev"]
>>>>>>> 42c974a (updated)
