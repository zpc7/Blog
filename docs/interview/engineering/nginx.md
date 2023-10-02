# Nginx
* [掘金 - 作为一名前端，该如何理解Nginx？](https://juejin.cn/post/7082655545491980301)
   > 这篇文章中对于正向代理和方向代理解释的不是很易懂, 可以参考这条评论理解:
   > 正向代理，客户端不想让服务器知道客户端的ip，所以让代理服务器去访问，再返回给客户端。
   > 反向代理，服务器不想客户端知道是哪个服务器响应的，所以让代理服务器去分配，让空闲的服务器去响应。
* [B 站视频, 快进看部分示例](https://www.bilibili.com/video/BV1zJ411w7SV?p=14&spm_id_from=pageDriver&vd_source=1a29ec279d8312af227f4fd0ae163adf)
* [写给前端同学的Nginx配置指南](https://mp.weixin.qq.com/s/irgQW4DTAyX3SPF-F5ccdQ)
* [前端必备知识之 Nginx 复盘总结](https://mp.weixin.qq.com/s/Yr7M0_EcCPukQ1_q10k7hQ)

## TW-Devops-Training 简介

nginx是一款高性能、可靠性强的Web服务器和反向代理服务器，广泛应用于互联网领域。下面是一些关于nginx的基础知识：

1. 安装nginx

在Linux系统中，你可以通过包管理器安装nginx，如：

```
sudo apt-get install nginx
```

在安装完成后，你可以通过以下命令启动nginx服务：

```
sudo systemctl start nginx
```

1. 配置nginx

nginx的配置文件是/etc/nginx/nginx.conf，你可以通过编辑该文件来配置nginx的行为，如监听端口、反向代理、负载均衡等。以下是一些常用的配置选项：

* server：定义一个HTTP服务器块。
* listen：定义监听的IP地址和端口号。
* location：定义一个请求的URI地址和相应的处理方式。
* proxy_pass：定义反向代理的目标地址。
* upstream：定义负载均衡的后端服务器。

1. 重载nginx配置

当你修改了nginx的配置文件后，需要重载nginx配置才能使修改生效。你可以使用以下命令来重载nginx：

```
sudo nginx -s reload
```

1. 查看nginx状态

你可以使用以下命令查看nginx的状态：

```
sudo systemctl status nginx
```

1. 日志管理

nginx会记录访问日志和错误日志，它们的默认路径分别为：

* 访问日志：/var/log/nginx/access.log
* 错误日志：/var/log/nginx/error.log

你可以通过修改nginx的配置文件来配置日志的格式和路径。

1. nginx反向代理和负载均衡的配置示例

```
http {
  upstream backend {
    server backend1.example.com;
    server backend2.example.com;
  }

  server {
    listen 80;
    server_name frontend.example.com;

    location / {
      proxy_pass <http://backend;>
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
  }
}
```

这个示例配置中，我们定义了一个名为backend的upstream，其中包含了两个后端服务器backend1.example.com和backend2.example.com。然后我们定义了一个名为frontend.example.com的server，在该server中，我们将所有请求都转发到backend中的服务器，并设置了一些代理请求头，以便后端服务器能够获取客户端的真实IP地址。

在这个配置中，nginx会将请求分发到backend中的服务器，从而实现了负载均衡。如果某个后端服务器出现故障，nginx会自动将请求转发到其他可用的服务器上。
