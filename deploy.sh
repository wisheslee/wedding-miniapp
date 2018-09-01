pwd
$MAVEN_HOME/bin/mvn clean package
docker build -t ycycqwedding .
docker rmi $(docker images -f "dangling=true" -q)
docker stop ycycqwedding
docker run --rm -p 2222:2222 -itd ycycqwedding