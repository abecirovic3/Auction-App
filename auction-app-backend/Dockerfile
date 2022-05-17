FROM openjdk:11-jre-slim
WORKDIR /usr/src/app
COPY target/*.jar ./auction-app-backend-0.0.1-SNAPSHOT.jar
ENTRYPOINT [ "java","-jar","./auction-app-backend-0.0.1-SNAPSHOT.jar" ]