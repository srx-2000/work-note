## ADB常用命令

```shell
root uid 0 gid 0
system uid 1000 gid 1000
shell uid 2000 gid 2000
app uid >10000 gid >10000
```

```shell
adb devices #查看当前设备是否链接
adb -s  #指定设备名称 后面跟相应的命令 比如：adb -s emulator-5554 shell
adb shell #进入手机管理
adb install apkpath -r -f -s #比如：adb install -r ..\magisk.apk
adb uninstall apkpackname -k  #比如：adb uninstall com.topjohnwu.magisk
adb push #电脑端文件路径 手机端文件路径
adb pull #手机端文件路径  电脑端文件路径
adb reboot #重启手机
adb reboot recovery #重启恢复模式
adb reboot bootloader #重启引导模式 
adb shell monkey -v -p com.tencent.mobileqq 500
adb shell getprop #获取手机参数
```

```shell
adb root #重新启动 adbd 守护进程并在设备上提供 root 权限。这样可以在设备上运行需要 root 权限的 adb 命令，如修改系统级文件和设置。
adb remount #将 /system 分区挂载为可写，允许你使用root权限的 adb shell 进行修改系统文件。
adb shell "su -c xxx" #通过 adb shell 连接到设备并使用 su 命令在设备上运行一条命令 "xxx" 。 "su" 是 Linux 中 superuser（超级用户）的缩写，它允许用户在其他用户权限基础上执行特权操作。 使用 “-c” 参数允许在切换到超级用户权限后立即执行一个命令。
adb devices # 查看手机设备
adb shell getprop ro.product.model # 查看设备型号
adb shell dumpsys battery # 查看电池信息
adb shell settings get secure android_id # 查看设备ID
adb shell dumpsys iphonesubinfo # 查看设备IMEI
adb shell getprop ro.build.version.release # 查看Android版本
adb shell ifconfig # 查看手机网络信息
adb logcat  # 查看设备日志
adb reboot # 重启手机设备
adb install /path/demo.apk # 安装一个apk
adb uninstall <package> # 卸载一个apk
adb shell ps # 查看系统运行进程
adb shell ls /path/ # 查看系统磁盘情况
adb shell screencap -p /sdcard/aa.png # 手机设备截屏
adb pull /sdcard/aa.png ./ # 手机文件下载到电脑
adb push aa.png /data/local/ # 电脑文件上传到手机
adb shell screenrecord /sdcard/ab.mp4 # 手机设备录像
adb shell wm size # 手机屏幕分辨率
adb shell wm density # 手机屏幕密度
adb shell input tap xvalue yvalue # 手机屏幕点击
adb shell input swipe 1000 1500 200 200 # 手机屏幕滑动
adb shell input swipe 1000 1500 0 0 1000 # 手机屏幕带时间滑动
adb shell input text xxxxx # 手机文本输入
adb shell input keyevent xx # 手机键盘事件
```

## ADB SHELL常用命令

```shell
#1、安装、卸载应用
pm list packages # 列出设备中已经安装的所有应用包（包括系统应用和用户应用)
pm path packname # 查看apk安装的路径
pm install -r -f -s apppath # 安装apk，r 强制安装，f 安装手机内存 s 安装sdcard
pm uninstall -k packname # 卸载应用 -k 保留应用数据 /data/data/packname下的数据 或者 /sdcard/Android/data/packnmae
rm -r /data/data/packname # 彻底删除残留文件 
```

```shell
pm enable packname # 设置应用为不可用，或者组件不可用 组件跟类的完整路径 
pm disable packname # 设置应用可用
pm setInstallLocation 0 1 2 # 设置应用安装的默认目录 0：auto 1：手机内存 2：sdcard
pm getInstallLocation # 查看当前设置
pm clear packname # 清除掉应用缓存数据 
```

```shell
#2、结束系统进程
kill pid
```

```shell
#3、屏幕解锁
rm /data/system/gesture.key
rm /data/syste/locksettings.*
```

```shell
#4、应用及应用数据的备份，移动应用到系统应用。
busybox cp -r -f -p -P source/* des/
```

```shell
#5、查看短信，联系人数据库
cat /data/data/com.android.providers.contacts/databases/contacts2.db > /data/lcoal/tmp/1.db
adb pull /data/lcoal/tmp/1.db pc_path
```

## linux常用命令（权限）

```shell
rm #移除文件 或 文件夹 rm /data/local/tmp/1.apk
cd #进入目录 cd /data/local/tmp
cat #查看文件内容 cat /proc/cpuinfo ;复制文件 cat /data/local/tmp/1.apk > /sdcard/1.apk
cp   #复制文件 cp /data/local/tmp/1.apk /sdcard/1.apk
mv   #移动文件，重命名文件 mv /data/local/tmp/1.apk /data/local/tmp/2.apk
chmod   #为文件或目录赋权限 chmod 777 /data/local/tmp/1.apk
chown   #为文件赋所属者 chown 0.0 /data/local/tmp/1.apk
echo   #写入文件 如果文件不存在创建并写入 echo '111' > /sdcard/1111.txt
md5sum   #获取文件md5码 md5sum /system/app/1.apk
halt   #关机
reboot   #重启手机
id    #获取当前用户信息
touch   #创建一个空文件 touch /data/local/tmp/1.txt
sleep   #睡眠多少秒 sleep 10
mkdir   #创建文件夹 mkdir /sdcard/nihao
ps     #查看当前系统所有进程
ls   #列出当前文件夹下的文件
```

```shell
mount   #挂载分区 mount -o remount rw /system
df   #查看磁盘空间 df /system
```

## 实例（刷抖音）

```python
import subprocess
package_name = "com.ss.android.ugc.aweme"
# 打开抖音
subprocess.getoutput(f"adb shell am start -n {package_name}/.splash.SplashActivity")
# 刷抖音（在屏幕滑动的命令）
subprocess.getoutput(f"adb shell input swipe 311 952 622 444 400")
# 点赞（在屏幕点击的命令） 开发者选项-输入-指针位置 
subprocess.getoutput(f"adb shell input tap 660 790")
```

