# build stage
FROM node:17-alpine as build
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.21.6
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
