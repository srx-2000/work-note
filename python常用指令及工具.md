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
4. selenium参数大全

```tex
https://peter.sh/experiments/chromium-command-line-switches
```



**方式一**

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

**方式二**

编写setup.py文件

```python
# setup.py文件内容
from setuptools import setup

setup(
    name='beierTools',  # 应用名（pip安装和卸载时的名字）
    version='0.0.12',  # 当前版本，每次打包都需要更改，否则上传时会重复报错
    author='Beier',  # 作者
    author_email='1601684622@qq.com',  # 作者邮箱
    licence='MIT License',  # 许可协议
    url='https://github.com/srx-2000/beier_tools',  # 应用主页链接
    description='Beier developments tools', # 描述
    packages=["encrypt", "operation"], # 如果要打包的目标中有多个模块，需要加上这行，列表中的元素就是模块名
    install_requires=["pycryptodome>=3.18.0"],  # 依赖包
)
```

打包发布命令

```bash
# 打包，注意每次需要更改version的值
python setup.py sdist
# 发布，注意删除上一个版本的，因为这里用了通配符，当然如果觉得每次删很麻烦可以把通配符改成具体版本名称
twine upload dist/*
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

