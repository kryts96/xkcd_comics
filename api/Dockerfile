#build stage
FROM golang:1.21
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . ./
RUN CGO_ENABLED=0 GOOS=linux go build -o xkcd_comic_server
EXPOSE 1234
CMD [ "./xkcd_comic_server" ]
