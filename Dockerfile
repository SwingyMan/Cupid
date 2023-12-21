FROM golang:latest as build
WORKDIR /build/
COPY CupidBackend/ /build/
RUN CGO_ENABLED=1 GOOS=linux GOARCH=amd64 go build -o app -ldflags '-extldflags "-static"'


FROM alpine:latest
LABEL authors="Marcin Bogus"
WORKDIR /backend
COPY --from=build /build/app .
EXPOSE 8080
ENV GIN_MODE release
ENTRYPOINT ["/backend/app"]