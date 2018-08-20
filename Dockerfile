FROM java:8
RUN ll ./target
ADD target/*.jar /ROOT.jar
EXPOSE 9091
CMD ["java","-jar","/ROOT.jar"]

