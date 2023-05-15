# git指令速查

## 官方指令文档

https://git-scm.com/docs

选择指定指令后可以切换为简中

## 单条指令

### git log

#### 作用

查看提交记录【commit log】

#### 格式

```bash
git log [<options>] [<revision-range>] [[--] <path>…]
```

#### 常用指令

```bash
git log
```

#### options

#### revision-range

## 成套指令

### 分支rebase合并

```bash
# 省略将分支切换到主分支的步骤
git rebase 被合并分支名
# 解决分支文件冲突
.....
git add -A
git commit -m "fix conflict with rebase"
# 下面这一步不能省略，如果省略则会发现现在的HEAD指针指向的并不是任何一个已有分支，而是指向的(no branch, rebasing master)执行之后便会将HEAD指针重新指回主分支
git rebase --continue
```

### 还原暂存区

```bash
# 将现在暂存区还原到上一次本地仓库的版本【工作目录(此时工作目录是在git add之后更改了某些东西的版本)和本地仓库都不会更改】
git reset HEAD # 其中包含了默认参数--mixed
# 最软的重置，此时暂存区，工作目录，本地仓库都不会有任何更改，仅是用来移动当前的头指针的，退回到某个版本
git reset --soft HEAD
# 将暂存区与工作目录都回到上一次版本，并删除之前的所有信息提交【这里指的提交是将工作区中的代码通过git add添加到暂存区，而非使用git commit将暂存区的代码提交到本地仓库】，当前 HEAD 指针、工作区和暂存区内容全部改变
git reset --hard HEAD
```

