## Обновление сайта

Во время билда будет несколько красных ошибок

'didn't resolve at build time, it will remain unchanged to be resolved at runtime'

это так и должно быть

```
cd /var/www/html/
cd <папка сайта>
sudo git pull
docker-compose up -d --build
```

## Создание нового сайта

```
cd /var/www/html/
sudo start.sh
```
Дальше ввести название сайта  доменной зоны 
(sitename без '.com') и необходимости ввести порт


