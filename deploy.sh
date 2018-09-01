pwd
mv src/main/resources/application-prod.yml src/main/resources/application.yml
$MAVEN_HOME/bin/mvn clean package -Dmaven.test.skip=true
docker stop ycycqwedding
docker build -t ycycqwedding .
docker rmi $(docker images -f "dangling=true" -q)
docker run --rm --name ycycqwedding -p 2222:2222 -itd ycycqwedding