docker-compose  -f ./mongodb.yml  up -d
docker-compose  -f ./redis.yml up -d
docker-compose  -f ./simulatorsrv.yml up -d
docker-compose  -f ./uploadsrv.yml up -d
docker-compose  -f ./znserver.yml up -d
docker-compose  -f ./nginx.yml up -d
