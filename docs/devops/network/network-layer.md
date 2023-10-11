# 网络层
01. 理解网络层的作用和存在的目的
02. 掌握 IPV4 数据报文结构
03. 掌握 IPV4 地址组成结构和分类
04. 掌握 IPV4 子网以及地址划分
05. 理解什么是 CIDR
06. 掌握 ICMP 协议，数据包结构
    - 会使用 ping 命令测试网络可达性
    - 会使用 traceroute 命令检查路径消耗时间
07. 了解 ARP 协议
08. 掌握什么是路由器、路由和路由表原理
09. 了解路由协议
10. 了解什么是 Fragmentation

## PDF资料

* [网络层介绍](https://github.com/zpc7/Blog/tree/master/docs/public/pdf/网络层介绍.pdf)
* [IP地址划分](https://github.com/zpc7/Blog/tree/master/docs/public/pdf/IP地址划分.pdf)

## 练习

* MacOS 或 Linux 中使用命令查看自己电脑的 IP 地址，子网掩码
* 用户网络地址段 192.168.0.0/24，请在网段范围内划分一个子网，子网的最大主机数为16个，请写出该16个IP的网段的第一个和最后一个IP，子网掩码，可用IP数量以及广播地址
* 通过 arp 命令查看网内 IP 地址
* MacOS 或 Linux 中 ping 一个目标IP地址（为上一步获取的网络IP地址）检测网络是否可达
