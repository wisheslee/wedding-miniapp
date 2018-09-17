pwd
mv src/main/resources/application-test.yml src/main/resources/application.yml
$MAVEN_HOME/bin/mvn clean package -Dmaven.test.skip=true
docker stop ycycqweddingtest
docker build -t ycycqweddingtest .
docker rmi $(docker images -f "dangling=true" -q)
docker run --rm --name ycycqweddingtest -p 2223:2222 -itd -v /var/log/liji/ycycqweddingtest:/var/log/liji/ycycqweddingtest ycycqweddingtest