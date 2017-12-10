download and install mongodb community server from below link:
https://www.mongodb.com/download-center#community

create a mongo.config file in any directory with below content:
##store data here
dbpath=C:\mongodb\data

##all output go here
logpath=C:\mongodb\log\mongo.log

##log read and write operations
diaglog=3

Use mongod.exe --config C:\mongodb\mongo.config to start MongoDB server.


mongoimport --db test --collection restaurants --drop --file C:\mongodb\primer-dataset.json

Some useful links while dev:
https://stackoverflow.com/questions/8866041/how-to-list-all-collections-in-the-mongo-shell