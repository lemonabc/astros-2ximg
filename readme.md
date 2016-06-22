## astros-2ximg

Astros插件

项目中如果需要针对高清屏设置二倍图时，通常的做法是切两个尺寸的图片。

现在，你只需要准备好一张二倍图。存储图片时，文件名以`2x`结尾。正常引用1倍图和2倍图即可，例：

**图片位置：**

    root/img/logo2x.png
    
**如何引用：**

root/pages/user/login/login.html：

    <img src="$res(~/img/logo.png)" srcset="$res(~/img/logo2x.png) 2x" />

root/components/header/header-menu.html：

    <img src="$res(~/img/logo.png") srcset="$res(~/img/logo2x.png) 2x" />

root/components/header/header-menu.less：

    background:url(~/img/logo.png);
    background:url(~/img/logo2x.png);

你没有看错，除了文件名末尾加`2x`，不需要其他额外的操作。