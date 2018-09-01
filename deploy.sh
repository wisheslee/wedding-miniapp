pwd
$MAVEN_HOME/bin/mvn clean package -Dmaven.test.skip=true
docker stop ycycqwedding
docker build -t ycycqwedding .
docker rmi $(docker images -f "dangling=true" -q)
docker run --rm --name ycycqwedding --net=host -p 2222:2222 -itd ycycqwedding