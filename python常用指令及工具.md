# python爬虫常用指令及工具等

1. 清华镜像

```
https://pypi.tuna.tsinghua.edu.cn/simple
```

2. js逆向API参考文档

```
https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator
```

3. pip包打包指令

```bash
#教程链接
https://blog.csdn.net/YKenan/article/details/129946118 
```

```bash
# 指令
py -m build #打包生成dist文件夹，注意不可以挂着梯子打包，会报hostname的错误
twine check dist/* #检查内容
twine upload dist/* #上传
```

4. pip包升级命令

```bash
pip install --upgrade packge_name
```

5. tqdm进度条

```python
from tqdm import tqdm
list=[1,2,3,4]
bar=tqdm(list,file=sys.stdout)
for step,data in enumate(bar):
    """
    do something with data and step
    """
    time.sleep(0.5)
```

