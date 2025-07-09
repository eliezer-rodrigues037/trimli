DOCKER_NETWORK=trimli_network

ensure-docker-network:
	docker network inspect $(DOCKER_NETWORK) >/dev/null 2>&1 || docker network create $(DOCKER_NETWORK)

mysql-on-docker:
	docker run -d --network $(DOCKER_NETWORK) \
	--name trimli_mysql \
	-e MYSQL_USER=mysql \
	-e MYSQL_PASSWORD=mysql \
	-e MYSQL_DATABASE=trimli_db \
	-e MYSQL_ROOT_PASSWORD=mysql \
	-v trimly_db_data:/var/lib/mysql \
	-p 3306:3306 \
	mysql:8.0
	@echo "Waiting for MySQL to be ready..."
	@until docker exec trimli_mysql mysql -umysql -pmysql -e 'SELECT 1' 2>/dev/null; do \
		sleep 1; \
	done
	docker exec trimli_mysql mysql -umysql -pmysql \
		-e "CREATE DATABASE IF NOT EXISTS \`trimli_db\`;"