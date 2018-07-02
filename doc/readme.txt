/etc/resolv.conf 中：nameserver 192.168.10.182
需改成：nameserver 202.102.192.68


http://api.tczncx.com/resetplatform


日志文件:/app/zn/deploy/dist/log

/app/zn/deploy/centos6.9

测试步骤:

先停止:uploadsrv
docker-compose -f ./uploadsrv.yml up
停止:simulatorsrv
docker-compose -f ./simulatorsrv.yml up

//------------
http://api.tczncx.com/starttest_resetuploaded

http://api.tczncx.com/starttest_datalegitimacy_interval/100
http://api.tczncx.com/starttest_datalegitimacy_interval_getstatus

/starttest_resetuploaded
/starttest_connectivity

查看日志:
http://api.tczncx.com/log/simulatorsrv.html

http://api.tczncx.com/log/uploadsrv_err.html
