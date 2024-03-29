# Base64加密的研究

## 概述

​	base64加密本质上就是一个映射表，通过将utf8下的编码转为ASCII码对应的索引。进而用这些索引的二进制数进行一些加密操作，最终将加密算出的值与一个特定的base64映射表进行映射，从而达成最终的加密。

​	如果用简单的流程符号表示的话：

> 1. 明文==>ASCII码对应的索引
>
> 2. ASCII码对应的索引==>二进制表示
> 3. 二进制表示==>重新进行二进制位数划分
> 4. 重新划分后的二进制==>补0
> 5. 补0后==>按划分转为十进制
> 6. 用十进制找到**base64映射表**对应的字母。
>
> 
>
> 其中：新的二进制位数划分、base64映射表讲道理来说都是可以自行定义的。
>
> 1. 我可以将原先每个字符8位的二进制，重新划分为6位一组，长度不足6位的补0即可。
>
> 2. 同样的这个base64映射表我也可以自己定义。

## 规则

![img](https://img-blog.csdnimg.cn/067b779ce1d14179947ee912b8f029c8.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBATXJZdXNoaXdlbg==,size_20,color_FFFFFF,t_70,g_se,x_16)

1. 把3个字节变成4个字节,6位为一组，高位补两个0，组成一个字节，这样十进制中正好从0到63
2. 每76个字符加一个换行符。
3. 最后的结束符也要处理。
   Base64要求把每三个8Bit的字节转换为四个6Bit的字节（3*8 = 4*6 = 24），然后把6Bit再添两位高位0，组成四个8Bit的字节，也就是说，转换后的字符串理论上将要比原来的长1/3。

## 举例

### 举例一（末尾没有=号）

​	把UTF-8编码的`abc`进行base64编码其具体过程如下：

1. UTF-8编码的`abc`其底层用二进制表示为`01100001 01100010 01100011`
2. 拆分，每六位一组：`011000 010110 001001 100011`
3. 高位补两个0：00`011000`，00`010110`，00`001001 `， 00`100011`
4. 查找base64编码转换表，00`011000`，00`010110`，00`001001 `， 00`100011`十进制为：24，22，9，35，对应的字符为：YWJj

> **注：**这里使用的映射表就是上面规则中的表

### 举例二（末尾有`=`号）

​	在1中的规则，第一条对于这个有稍微的变化，因为这个末尾差分6个为一组时，最后只有4个，怎么办呢，先低位补0，补成6位，然后在高位补两个0，组成一个字节，这样十进制中正好从0到63

​	把UTF-8编码的ab进行base64编码其具体过程如下：

1. UTF-8编码的ab其底层用二进制表示为01100001 01100010
2. 拆分，每六位一组，末尾只有4位，先低位补0，补成6位：011000 010110 001000
3. 高位补两个0：00011000，00010110，00001000
4. 查找base64编码转换表，00011000，00010110，00001000 十进制为：24，22，8对于的字符为：YWI
5. 补一个`=`号，最后结果为：`YWI=`

> **等号数量：**在举例1中字节数量应该是3的倍数，如果这个条件不能满足的话，具体的解决办法是这样的：剩余的字节根据编码规则继续单独转过程如上述所述，最后再用=号补满4个字节。这就是为什么有些Base64编码会以一个或两个等号结束的原因，但等号最多只有两个。因为一个原字节至少会变成两个目标字节，所以余数任何情况下都只可能是0，1，2这三个数中的一个。如果余数是0的话，就表示原文字节数正好是3的倍数（最理想的情况）。如果是1的话，转成2个Base64编码字符，为了让Base64编码是4的倍数，就要补2个等号；同理，如果是2的话，就要补1个等号。

## 变种

### 关于URL的改进Base64编码

- 标准的Base64并不适合直接放在URL里传输，因为URL编码器会把标准Base64中的“/”和“+”字符变为形如“%XX”的形式，而这些“%”号在存入数据库时还需要再进行转换，因为ANSI SQL中已将“%”号用作通配符。
- 为解决此问题，可采用一种用于URL的改进Base64编码，它在末尾填充’='号，并将标准Base64中的“+”和“/”分别改成了“-”和“_”，即把 二.base64编码转换表（64个可打印字符）中的62和63对应的字符改成了-和_
- 这样就免去了在URL编解码和数据库存储时所要作的转换，避免了编码信息长度在此过程中的增加，并统一了数据库、表单等处对象标识符的格式。

> 这也就意味着以后如果看到url中包含了比较长的加密可以尝试将其中`-`和`_`替换成`+`和`/`，而后再送给解密工具解密。

## 参考

规则及例子：https://blog.csdn.net/MrYushiwen/article/details/120266000