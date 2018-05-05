ssh -p 33321 huawei@zn.tczncx.com
#执行数据库
sudo docker run -it -v /home/huawei:/root mongo:3.4 bash
mongo --host 172.17.0.1 --port 27018


#进入服务器后执行数据库备份：
sudo docker run -it -v /home/huawei:/root mongo:3.4 bash
mkdir /root/dbbk0209
cd /root/dbbk0209
mongodump --host 172.17.0.1 --port 27018 --db zhongnandb

#拷贝数据库到本地
scp -P 33321 huawei@zn.tczncx.com:/home/huawei/dbbk0209.tar.gz ./

mongorestore --dir=dbbk0209/dump/zhongnandb --db=zhongnandb

mongorestore --dir=zhongnandb_20180505/dump/zhongnandb --db=zn

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
3、车辆经营下线列表
db.getCollection('operatelogouts').remove({"LicenseId" : {"$in":['12345','7654321','888888','123456']}})
4、车辆经营出发列表
db.getCollection('operatedeparts').remove({"OrderId" : {"$exists":false}})
5、驾驶员定位信息列表
db.getCollection('positiondrivers').remove({"LicenseId" : {"$exists":false}})
db.getCollection('positiondrivers').remove({"LicenseId" : {"$in":['12345']}})
db.getCollection('positiondrivers').update({"DriverRegionCode" :  {"$exists":false}},{$set:{"DriverRegionCode" : 340000}},{multi:true});

6、车辆定位信息列表
db.getCollection('positionvehicles').remove({"VehicleNo" : "124"})
db.getCollection('positionvehicles').remove({"VehicleNo" : "皖MD0456"})
7、移动终端信息列表
db.getCollection('baseinfodriverapps').remove({"LicenseId" : {"$exists":false}})
db.getCollection('baseinfodriverapps').remove({"LicenseId" : {"$in":["12345","","12345794646","123456","888888","7654321",""]}})
8、订单成功匹配列表
db.getCollection('ordermatches').remove({"OrderId" : {"$exists":false}})
9、订单生成列表
db.getCollection('ordercreates').remove({"FareType":""})
10、车辆经营到达列表
db.getCollection('operatearrives').remove({"OrderId" : {"$exists":false}})
11、车辆列表【PlateColor】
db.getCollection('baseinfovehicles').remove({"PlateColor" : {"$exists":false}})
12、订单取消列表
db.getCollection('ordercancels').remove({"OrderId" : {"$exists":false}})
13、驾驶员统计信息
db.getCollection('baseinfodriverstats').remove({"OrderId" : {"$exists":false}})
db.getCollection('baseinfodriverstats').remove({"LicenseId" : {"$in":['12345']}})
db.getCollection('baseinfodriverstats').update({"Cycle" : 201802},{$set:{"Cycle" : 201712}},{multi:true});
db.getCollection('baseinfodrivers').update({"Address" :  {"$exists":false}},{$set:{"Address" : 340000}},{multi:true});
