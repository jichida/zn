ssh -p 33321 huawei@zn.tczncx.com
#执行数据库
docker run -it -v /root:/root mongo:3.4 bash
mongo --host 172.17.0.1 --port 27018


#进入服务器后执行数据库备份：
sudo docker run -it -v /home/huawei:/root mongo:3.4 bash
mkdir /root/dbbk0209
cd /root/dbbk0209
mongodump --host 172.17.0.1 --port 27018 --db zhongnandb

#拷贝数据库到本地
scp -P 33321 huawei@zn.tczncx.com:/home/huawei/dbbk0209.tar.gz ./

mongorestore --dir=dbbk0209/dump/zhongnandb --db=zhongnandb

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
开始清理数据库
1、乘客列表
db.getCollection('userriders').update({"username" : "13218888400" },{"$set":{"created_at":"2017-11-15 07:33:58"}});
db.getCollection('userriders').update({"username" : "15212186117" },{"$set":{"created_at":"2017-11-15 07:33:58"}});
db.getCollection('userriders').update({"username" : "15056542570" },{"$set":{"created_at":"2017-11-15 07:33:58"}});
db.getCollection('userriders').update({"username" : "13770635745" },{"$set":{"created_at":"2017-11-15 07:33:58"}});
db.getCollection('userriders').update({"username" : "15850547943" },{"$set":{"created_at":"2017-11-15 08:33:58"}});
2、司机列表
db.getCollection('userdrivers').update({"username" : "15961125167" },{"$set":{"created_at":"2017-11-15 07:33:58"}});
db.getCollection('userdrivers').update({"username" : "18019890099" },{"$set":{"created_at":"2017-11-15 07:33:58"}});
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
3、车辆经营上线列表
db.getCollection('operatelogins').remove({"LicenseId" : {"$exists":false}})
4、车辆经营出发列表
db.getCollection('operatedeparts').remove({"OrderId" : {"$exists":false}})
5、驾驶员定位信息列表
db.getCollection('positiondrivers').remove({"LicenseId" : {"$exists":false}})
6、车辆定位信息列表
db.getCollection('positionvehicles').remove({"VehicleNo" : "124"})
db.getCollection('positionvehicles').remove({"VehicleNo" : "皖MD0456"})
7、移动终端信息列表
