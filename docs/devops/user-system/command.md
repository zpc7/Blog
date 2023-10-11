# 常用命令行工具及周边

## 常用命令行工具

[Linux 常用命令学习](https://www.runoob.com/w3cnote/linux-common-command-2.html)

* cat/less/head/tail/more - 查看文件内容
* cd - 目录操作
* chmod - 修改文件权限
* chown - 修改文件归属
* cp - 复制文件
* date - 日期函数
* df/du/fdisk/lsblk- 查看磁盘，文件信息
* find - 查找文件
* free - 查看内存信息
* grep - 筛选过滤
* kill - 杀掉进程
* ln - 创建链接，类似于window下的快捷方式
* ls - 查看目录下的文件列表
* mv - 移动文件
* ps - 查看进程
* pwd - 获取当前目录
* top - 查看机器大体情况
* wc - 计数
* whereis/which - 查找命令，文件所在目录
* wget - 下载文件

---

[Linux 命令大全](https://www.runoob.com/linux/linux-command-manual.html)

* netstat - 查看机器当前的端口状态
* ifconfig/ip - 查看机器的网卡信息
* tcpdump - 网络抓包
* telnet - 测试网络连通性
* xargs - 针对管道符前的结果逐行当错下一个命令的输入参数
* awk - 按照制定字符对管道符前的结果进行制定的操作
* tar/gzip/unzip - 压缩、解压缩文件
* tree - 显示目录树

---

* [tmux](https://note.youdao.com/s/BClzvclE) - 后台多窗口运行神器
* [curl](https://www.cnblogs.com/duhuo/p/5695256.html) - 发送请求，也可以下载文件
* [pidstat/iostat](https://blog.haohtml.com/archives/14760) - 查看磁盘io情况
* [journalctl](https://blog.csdn.net/enthan809882/article/details/104551777) - 查看服务日志

### 常见操作

* 查看日志文件中的前5行内容
* 查看日志文件中的最后5行内容
* 在一个非常大的日志文件中搜索error日志
* 切换目录
* 创建一个只有root用户才可以查看的文件，并尝试修改文件权限，使其能被其他用户查看编辑
* 从虚机上复制一个文件到本地（scp）
* 在虚机上复制一个文件
* 查看系统当前时间
* 查看本地磁盘剩余空间
* 查看本地文件的大小
* 查找本地大于2M的文件，查找/var/log目录下三天前的日志文件
* 输入ping baidu.com& 回车后，再开一个终端，将其进程杀掉
* 尝试通过命令行创建一个软连接
* 统计/var/log/dpkg.log有多少行日志
* 通过wget/curl命令下载一个文件
* 尝试通过在ls -al /var/log 命令后通过管道符、grep、awk、xargs、cp命令，将该目录下的所有文件名包含dpkg的日志文件，复制到/tmp目录下
* 新建tmux的session
* 在tmux的session下创建三个窗口（window）
  + 在三个window中尝试切换
* 在tmux的session下，分出上，左下，右下三个窗格（pane）
  + 禁用鼠标模式
  + 同时在三个窗格中进行命令编辑
  + 最大化左下窗口，并恢复初始大小
  + 在窗格中搜索单词
  + 向上向下滚动屏幕中的内容
  + 关闭右下角的窗格
* 退出tmux的session，保证不要杀掉session
* 查看tmux的session，并attach进去

## 系统性能

在日常工作中，经常会遇到集群中某些机器响应迟钝，应用在其上运行十分缓慢，导致生产出现事故的情况。

一般情况下，机器性能出现问题时，无非以下几种情况，CPU, IO, Memory。当然也会遇到网络问题，引发丢包等情况，但更多的都是资源问题引发的。

### 资料

* [Linux性能分析工具汇总合集](https://zhuanlan.zhihu.com/p/52107689)
* 查看CPU个数及CPU压力
  + [top](https://blog.csdn.net/daocaokafei/article/details/113732213)
  + `lscpu | grep -i core` 一般情况下，检测CPU是否有负载压力，就看cpu的load情况，top命令或者uptime命令或者w命令都可以获取到，如果load值大于CPU的核数，且长时间处于这样的一个状态，一般情况下即可认定为CPU计算资源不足，在top中可以通过输入大写的P，按cpu使用情况排序，来找到最消耗CPU的进程，结合实际情况来判断，是否需要扩容机器资源，或者解决运行软件本身的问题

* 查看内存情况
  + [free -h](https://blog.csdn.net/weixin_51099370/article/details/125084071)
    内存也可以结合top命令来看，在top中输入大写的M，即可按照内存使用量排序，定位到最消耗内存的进程。如果free命令中的buff/cache  + available余量非常小的时候，可以根据实际情况来判断是否需要增加物理资源还是排查运行软件本身的问题了。（友情提醒，MAC下并没有free命令，想查看mac下的内存情况，可自行询问度娘或者Google）

* 查看磁盘IO
  + pidstat -t 1
  + iostat -t 1
    当磁盘IO非常高的时候，也会影响机器的性能，在top命令中，可以看到iowait升高，也是非常消耗系统资源的，通过上述命令，可以粗略定位到是那块盘IO在升高，帮助分析和解决问题

## 常用的sysctl内核参数

了解sysctl修改内核参数的方法，及常见的内核参数调整

[sysctl命令详解](https://blog.csdn.net/hxpjava1/article/details/79444116)

## iptables

[iptables系列文章](https://www.zsythink.net/archives/tag/iptables/)

## SELinux

[SELinux](https://linux.vbird.org/linux_server/rocky9/0140selinux.php)

## Make 和 gcc

日常中我们经常会遇到编写Makefile，来实现一系列固定步骤的操作，学会如何编写Makefile，如何使用make即可

[Makefile入门](https://www.cnblogs.com/jasonliu/archive/2011/12/23/2299740.html)
