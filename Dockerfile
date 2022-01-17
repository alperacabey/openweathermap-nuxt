FROM node:12

WORKDIR /app

ARG API_KEY
ENV API_KEY $API_KEY

ADD . /app/

RUN ls -al
RUN yarn cache clean
RUN yarn
RUN yarn build
 
ENV HOST 0.0.0.0
EXPOSE 3000
 
CMD yarn start