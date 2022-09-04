FROM node:lts-bullseye-slim as builder
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build


FROM python:3.8-slim-bullseye
WORKDIR /app
COPY --from=builder /app/build .

EXPOSE 8080
CMD ["python", "-m", "http.server", "8080"]