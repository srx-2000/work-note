# Unidbg相关技巧

## 固定随机数

​	一般在使用unidbg进行算法还原时，遇见了输入不变的情况下，输出结果依旧在变化的情况，就可以合理的怀疑在算法的过程中有随机数的加入，最常见的两种添加随机数的方式分别是在java层和在so层。其中，在JNI中使用如`currentTimeMillis`、`randomUUID`等函数，而在so中则会使用：`gettimeofday`、`clock_gettime`、`getrandom`这种系统调用，亦或是读取`/dev/urandom`、`/dev/random`、`/dev/srandom`等文件的形式。还有可能会有：读取pid，读取内存中某个固定位置字节等。JNI的随机数固定会比较明显，在补环境的过程中只要看到像是获取uuid或是timestamp的函数直接在补的时候固定住即可，所以下面主要就so层的几个unidbg中的随机数实现进行固定。

### 主要的so层随机数

​	这里有一个确定so文件具体使用了哪个随机方式的方法：在下面几个给出的具体方法上都打上断点，使用idea的debug调试，看他会断在哪个具体的函数，即可确定使用了哪种随机数。当然也可以直接修改下面这些地方的源码加上sout输出。

#### **读取随机文件**

**说明：**

​	程序读取真机上的`/dev/urandom`、`/dev/random`、`/dev/srandom`文件，这三个路径下的文件读取，在unidbg中最后都会归结到一个类中的方法

**unidbg中的路径**

​	`src/main/java/com/github/unidbg/linux/file/RandomFileIO.java` 文件下的`read`方法

**固定方式**

​	注释掉`randBytes(buf);`，后续再有调用，就会直接返回[0,0,0,0]

#### 使用系统调用

**说明**：

​	程序会进行一些常用的系统调用，使用这些系统调用的返回值作为随机变量，如：`gettimeofday`、`clock_gettime`、`getrandom`。

**unidbg中的路径**：

1. `gettimeofday/gettimeofday64`：`src/main/java/com/github/unidbg/unix/UnixSyscallHandler.java`
2. `getrandom`：`src/main/java/com/github/unidbg/unix/UnixSyscallHandler.java`
3. `clock_gettime`：`com/github/unidbg/linux/ARM64SyscallHandler.java`

**固定方式**：

1. `gettimeofday/gettimeofday64`：注释掉`long currentTimeMillis = currentTimeMillis();`，同时声明一个13位长度的时间戳`long currentTimeMillis = 1745767990239L;`
2. `getrandom`：注释掉`random.nextBytes(bytes);`，后续再有调用，就会直接返回[0,0,0,0]
3. `clock_gettime`：暂时未遇到过，理论上是直接将`long offset = clk_id == CLOCK_REALTIME ? currentTimeMillis() * 1000000L : System.nanoTime() - nanoTime;`中的offset固定为一个值即可。

#### 读取进程信息

**说明**：

​	由于程序的pid在每次启动时都会改变，所以有的程序也会将自己的pid作为随机数加入到算法中。

**unidbg中的路径**：

​	`src/main/java/com/github/unidbg/AbstractEmulator.java`中的`getPid`方法

**固定方式**：

​	`this.pid = Integer.parseInt(pid) & 0x7fff;`将这行的this.pid写成一个固定值，需要注意不要超过`0x7fff`。

