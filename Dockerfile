# 获取依赖
FROM node:16-alpine as deps
RUN apk add --no-cache git

WORKDIR /usr/src/
USER root
COPY package.json ./
RUN yarn

# build dist
FROM deps as builder
COPY ./ ./
RUN yarn build

# nginx镜像
FROM nginx:1.17.8-alpine
COPY --from=builder /usr/src/dist /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/nginx.conf
