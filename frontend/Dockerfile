FROM node:alpine as builder

WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .
RUN PROD=true yarn build

FROM nginx

WORKDIR /app
COPY --from=builder /app/build /app/build

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
