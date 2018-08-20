FROM java:8
COPY ./target/*.jar /ROOT.jar
EXPOSE 9091
CMD ["java","-jar","/ROOT.jar"]

