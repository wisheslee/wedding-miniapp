FROM java:8
COPY target/*.jar /ROOT.jar
EXPOSE 2222
CMD kill $(lsof -i:2222  | awk '{print $2}' | grep -v PID)
CMD ["java","-jar","/ROOT.jar"]

