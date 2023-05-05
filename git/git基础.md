# git理论及流程

### 基本流程及对应命令

![1](./git基础.assets/1.png)

**理解**

> 1. 首先要理解一共有四个分区，其中最主要的是本地仓库和远程仓库。本地仓库是通过commit提交的，这也就是为什么每次提交到远程仓库之后都会发现明明是刚push的，但提交时间却显示为几分钟前提交的原因，因为它是以本地仓库的最新提交的时间计算的。
>
> 2. 有了上面对本地仓库的理解，就可以实现一个事情：将多次修改都提交到本地仓库，通过维护本地仓库实现本地迭代【之前全部都是将项目单纯复制一份出来直接commit+push一条龙，所以每次代码有一定修改都需要重新复制一份放过去】
>
> 3. 同时要注意一个事情，远程仓库和本地仓库的同步问题，如果一个库是多个人维护，那么此时就可能会出现远程仓库的数据与本地仓库不一致的问题，所以每次要对本地仓库进行更改之前最好都走以下的流程：
>
>    1. 在工作目录中编写了新的代码
>    2. **git pull**或**git fetch**：将远程仓库的代码同步到本地仓库
>    3. **git add -A**：将工作目录中代码加入到缓存区里
>    4. **git commit -m "提交注释"**：将缓存区的代码提交到本地仓库
>    5. **git push**：将本地仓库的代码同步到远程仓库
>
>    当然上述流程肯定有很多问题，如：如果远程仓库中某一文件的修改与本地工作目录里自己编写的是同一个文件，那么此时如何解决冲突，并合并等。

# git常用命令

## 基础环境【环境初始配置】

### 配置用户名

```bash
git config --global user.name "username"
```

### 配置邮箱

```bash
git config --global user.email "email"
```

上述两个命令在单环境，不更换环境的情况下，只需要配置一次，但是如果一台服务器上有不止一个git环境时则需要分别配置【如：gitee和github同时存在的环境】。当然也可以通过分别生成密钥并配置到对应的网站来完成操作。

### 密钥生成【与上述二选一】

```bash
#生成 key，将邮件地址替换为你 Gitee 或者 Github 使用的邮件地址
ssh-keygen -t rsa -C "email"
```

使用命令之后，会生成id_rsa_github.pub、id_rsa_github两个文件，二者分别代表了公钥和密钥。将生成的公钥放入github或gitee的对应位置，并在.ssh目录下创建文件config，并在其中写入即可：

```tex
# gitee
Host gitee.com
HostName gitee.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa_gitee
 
# github
Host github.com
HostName github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa_github
```

## 库相关环境

### 库的初始化

```bash
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/srx-2000/gittest.git
git push -u origin main
```

### 库的一次基础提交

```bash
git add -A #将所有的变化了的文件添加到缓存
git commit -m "commit"
git push
```

### 库的本地同步【将代码从云端拉下】

```bash
git clone https://github.com/srx-2000/gittest.git #直接在当前文件下clone库
git pull #往往在一个本地库中使用，用于将云端的代码同步到本地
```

### Branch【分支】

#### 切换分支

```bash
git checkout master # master可替换为任意分支名称
```

#### 创建分支

```bash
git checkout -b dev origin/master # 基于主分支创建dev分支
```

### 其余细碎命令

##### git log

查看所有提交的记录

![image-20230428175710354](./git基础.assets/image-20230428175710354.png)

##### git status

查看仓库当前状态

![image-20230504154647484](./git基础.assets/image-20230504154647484.png)
