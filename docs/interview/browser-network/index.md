# 浏览器/网络

<Badge type="info" text="浏览器渲染原理" />
<Badge type="tip" text="网络" />
<Badge type="warning" text="WebAPI" />
<Badge type="danger" text="设备能力" />
<Badge type="info" text="HTTP" />
<Badge type="tip" text="AJAX" />
<Badge type="warning" text="RESTful API" />

## 推荐

* [字节面试：如何实现准时的setTimeout](https://mp.weixin.qq.com/s/v7YJAmMhzSAFzlJXY4mXTg)
* [在页面关闭时，前端上传监控数据的4个解决方案](https://mp.weixin.qq.com/s/ObeQWNoGAW05bOL_B3f3tw)
* [进程和线程](https://www.liaoxuefeng.com/wiki/1016959663602400/1017627212385376)  
    对于操作系统来说，一个任务就是一个进程（Process），比如打开一个浏览器就是启动一个浏览器进程，打开一个记事本就启动了一个记事本进程，打开两个记事本就启动了两个记事本进程，打开一个Word就启动了一个Word进程

    有些进程还不止同时干一件事，比如Word，它可以同时进行打字、拼写检查、打印等事情。在一个进程内部，要同时干多件事，就需要同时运行多个“子任务”，**我们把进程内的这些“子任务”称为线程（Thread）**

    由于每个进程至少要干一件事，所以，一个进程至少有一个线程。当然，像Word这种复杂的进程可以有多个线程，多个线程可以同时执行，多线程的执行方式和多进程是一样的，也是由操作系统在多个线程之间快速切换，让每个线程都短暂地交替运行，看起来就像同时执行一样。当然，真正地同时执行多线程需要多核CPU才可能实现。
