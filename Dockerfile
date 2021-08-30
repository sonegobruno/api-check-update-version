FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3278

ENV DB_HOST=localhost
ENV DB_USERNAME=postgres
ENV DB_PASSWORD=postgres
ENV DB_PORT=5432
ENV DB_DATABASE=check-version

CMD ["npm", "run", "typeorm", "migration:run"]
CMD ["npm", "run", "dev"]