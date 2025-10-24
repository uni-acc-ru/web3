FROM openjdk:8-jdk-alpine

RUN apk add --no-cache bash

WORKDIR /app

COPY . .

RUN chmod +x ./gradlew

RUN ./gradlew clean build

EXPOSE 5001

ENV JAVA_OPTS="-Djava.net.preferIPv4Stack=true -Dserver.address=0.0.0.0"

CMD ["./gradlew", "runTomcat"]
