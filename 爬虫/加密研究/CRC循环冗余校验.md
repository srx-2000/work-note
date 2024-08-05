# CRC循环冗余校验

​	上次提起这个东西还是在考研的计算机网络中。后来在快手的sig3的so文件加密中也见到了这个加密。这里就从两种方向上出发来具体的看下CRC循环冗余加密。

## 手动模拟计算

这个强烈推荐b站的一个[视频](https://www.bilibili.com/video/BV1V4411Z7VA)，视频用简单的ppt和几个考研时会用到的那种实例说明了，手动计算CRC时的全流程。当然下面也会将视频中的内容进行一个复述。

复述ing.......



## 实际应用在加密中

### 快手sig3的so加密

这里同样推荐一个大佬写的[文章](https://bbs.kanxue.com/thread-281317.htm)【当然这个文章作者在其中注明了侵删，所以有可能会被删掉】，进去之后直接搜关键词：crc32即可。

使用python纯算crc32

```python
# 这个就是手动模拟中的除数，一般会有固定的【或者说约定俗成的】几个常用除数。
CRC32_POLYNOMIAL = 0xEDB88320

def calculate_crc32(data):
    crc = 0xFFFFFFFF  # 初始值
    # 这里的data的形式：[0x45,0x25,0x85,0xa5,0x74,0x61.....0x8f]，可以看出就是以字节为单位拆分了下面的数据
    for byte in data:
        # 这里上来就进行了一个取反，是CRC32的标准，主要目的是保证数据在计算时的准确。最后对计算结果的取反则是将这里的取反进行一个还原，毕竟亦或是基础的对称加密。通过对加密再一次亦或，即可得到明文。
        crc ^= byte
        # 遍历每一个字节中的每一位，之所以这里是8，是因为一个字节有8bit，即8位
        for _ in range(8):
            # 如果遍历到的这位是1，那么将整个字节右移一位【在手算中咱们一般是固定住数据位，去右移除数，这里是固定住了除数，右移数据位】，同时与约定好的输出做亦或。
            if crc & 1:
                crc = (crc >> 1) ^ CRC32_POLYNOMIAL
            # 如果遍历到的这位是0，那么就将整个字节右移一位【类似于手动模拟器中的过掉最高位的0】
            else:
                crc >>= 1
    # 还原数据
    return crc ^ 0xFFFFFFFF  # 取反


# 示例数据
data = bytes.fromhex('452585a574619ae3eee5403180b854b7188cfc945093a20d1e0a1441ed806cfbe0ed8ea4aab0c1d5f4519f8d19c4948f')
byte_array = bytearray(data)
crc32 = calculate_crc32(byte_array)
# 打印结果
print("CRC32:", format(crc32, '08X'))
# print("CRC32:",crc32)
```

