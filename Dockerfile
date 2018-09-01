FROM java:8
COPY target/*.jar /ROOT.jar
EXPOSE 2222
CMD ["java","-jar","/ROOT.jar"]

