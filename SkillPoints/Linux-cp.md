### `Linux` 中的 `cp` 命令

`cp` 常用来拷贝文件或目录

#### 语法
>  cp 选项[-adfilprsu] 源(source) 目标(destination)

#### 选项
`-a`：此参数的效果和同时指定`-dpR`参数相同  
`-d`：若来源档为连结档的属性(link file 类似Windows的快捷方式)，则复制连结档属性而非文件本身
`-f`：强行复制文件或目录，不论目标文件或目录是否已存在  
`-i`：覆盖既有文件之前先询问用户  
`-l`：对源文件建立硬连接，而非复制文件  
`-p`：连同文件的属性一起复制过去，而非使用默认属性(备份常用)
`-R/r`：递归处理，将指定目录下的所有文件与子目录一并处理  
`-s`：对源文件建立符号连接，而非复制文件  
`-u`：使用这项参数后只会在源文件的更改时间较目标文件更新时或是名称相互对应的目标文件并不存在时，才复制文件  
`-S`：在备份文件时，用指定的后缀“SUFFIX”代替文件的默认后缀  
`-b`：覆盖已存在的文件目标前将目标文件备份  
`-v`：详细显示命令执行的操作  
#### 参数
- 源文件：制定源文件列表。默认情况下，cp命令不能复制目录，如果要复制目录，则必须使用-R/r选项；
- 目标文件：指定目标文件。当“源文件”为多个文件时，要求“目标文件”为指定的目录。
#### 示例
```
-> pwd
/Users/pczheng/Project
```
- 复制文件 `xx.file` 到指定目录 `test/destination-folder` 下
```
cp xx.file test/destination-folder/
```
```
注：如果 test 目录下存在 destination-folde 文件夹，也可使用：
cp xx.file test/destination-folder
如果没有此文件夹，会在 test目录 下复制 xx.file 并改名为 destination-folder(无后缀)
所以推荐使用 cp xx.file test/destination-folder/
```
- 复制文件 `xx.file` 到指定目录 `test/destination-folder` 下并改名为new.file
```
cp xx.file test/destination-folder/new.file
```
- 将目录`source`下的所有文件及其子目录复制到目录`test/`中
```
cp -r source/ test/
```
- 目标目录存在同名文件，添加 `-i` 交互式确认是否覆盖
```
cp -i xx.file test/destination-folder/
```

