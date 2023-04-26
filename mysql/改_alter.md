### 创建示例表

```shell
msyql> create table customer_tbl ( id INT, name VARCHAR(20),age INT );
Query OK, 0 rows affected (0.01 sec)

mysql> SHOW COLUMNS FROM customer_tbl;
+-------+-------------+------+-----+---------+-------+
| Field | Type        | Null | Key | Default | Extra |
+-------+-------------+------+-----+---------+-------+
| id    | int(11)     | YES  |     | NULL    |       |
| name  | varchar(20) | YES  |     | NULL    |       |
| age   | int(11)     | YES  |     | NULL    |       |
+-------+-------------+------+-----+---------+-------+
3 rows in set (0.00 sec)
```

### 1.在表中添加一列

#### 语法格式

```mysql
ALTER TABLE table_name
ADD new_column_name column_definition
[ FIRST | AFTER column_name ];
```

#### 参数说明：

**table_name：**指定要修改的表名。

**new_column_name：**指定要添加到表中的新列的名称。

**column_definition：**指定列的数据类型和定义（NULL 或 NOT NULL 等）。

**FIRST | AFTER column_name：**它是可选的。它告诉 MySQL 在表中的哪个位置创建列。如果未指定此参数，则新列将添加到表的末尾。

#### 示例代码

```mysql
ALTER TABLE customer_tbl
ADD sex varchar(10) NOT NULL
AFTER name;
```

```shell
mysql> desc customer_tbl;
+-------+-------------+------+-----+---------+-------+
| Field | Type        | Null | Key | Default | Extra |
+-------+-------------+------+-----+---------+-------+
| id    | int(11)     | YES  |     | NULL    |       |
| name  | varchar(20) | YES  |     | NULL    |       |
| sex   | varchar(10) | NO   |     | NULL    |       |
| age   | int(11)     | YES  |     | NULL    |       |
+-------+-------------+------+-----+---------+-------+
4 rows in set (0.00 sec)
```

### 2.在表中添加多列

#### 语法格式

```mysql
ALTER TABLE table_name
ADD new_column_name column_definition
[ FIRST | AFTER column_name ],
ADD new_column_name column_definition
[ FIRST | AFTER column_name ],
…
;
```

在此示例中，我们在现有表“customer_tbl”中添加两个新列“address”和 salary。address 添加在 sex 列之后，salary 添加在 age 列之后。

#### 示例代码

```mysql
ALTER TABLE customer_tbl
ADD address varchar(100) NOT NULL  
AFTER name,  
ADD salary int(100) NOT NULL  
AFTER age ;  
```

```shell
mysql> ALTER TABLE customer_tbl
    -> ADD address varchar(100) NOT NULL
    -> AFTER name,
    -> ADD salary int(100) NOT NULL
    -> AFTER age ;
Query OK, 0 rows affected (0.01 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> desc customer_tbl;
+---------+--------------+------+-----+---------+-------+
| Field   | Type         | Null | Key | Default | Extra |
+---------+--------------+------+-----+---------+-------+
| id      | int(11)      | YES  |     | NULL    |       |
| name    | varchar(20)  | YES  |     | NULL    |       |
| address | varchar(100) | NO   |     | NULL    |       |
| sex     | varchar(10)  | NO   |     | NULL    |       |
| age     | int(11)      | YES  |     | NULL    |       |
| salary  | int(100)     | NO   |     | NULL    |       |
+---------+--------------+------+-----+---------+-------+
6 rows in set (0.00 sec)
```

### 3.修改表中的列

MODIFY 命令用于更改表的列定义。

#### 语法格式

```mysql
ALTER TABLE table_name
MODIFY column_name column_definition
[ FIRST | AFTER column_name ];
```

#### 示例代码

在此示例中，我们将列 name 修改为 varchar(50) 的数据类型，并强制该列允许 NULL 值。

```mysql
ALTER TABLE customer_tbl
MODIFY name varchar(50) NULL;
```

```shell
mysql> ALTER TABLE customer_tbl
    -> MODIFY name varchar(50) NULL;
Query OK, 0 rows affected (0.01 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> desc customer_tbl;                                            
+---------+--------------+------+-----+---------+-------+
| Field   | Type         | Null | Key | Default | Extra |
+---------+--------------+------+-----+---------+-------+
| id      | int(11)      | YES  |     | NULL    |       |
| name    | varchar(50)  | YES  |     | NULL    |       |
| address | varchar(100) | NO   |     | NULL    |       |
| sex     | varchar(10)  | NO   |     | NULL    |       |
| age     | int(11)      | YES  |     | NULL    |       |
| salary  | int(100)     | NO   |     | NULL    |       |
+---------+--------------+------+-----+---------+-------+
6 rows in set (0.00 sec)
```

如果你不设置默认值，MySQL会自动设置该字段默认为 NULL。

修改表中字段默认值示例：

```mysql
mysql> ALTER TABLE customer_tbl
    -> MODIFY salary int(100) NOT NULL DEFAULT 1000;
```

你可以使用 ALTER 来修改字段的默认值，尝试以下实例：

```mysql
mysql> ALTER TABLE customer_tbl 
       ALTER salary SET DEFAULT 1000;
```

你也可以使用 ALTER 命令及 DROP子句来删除字段的默认值，如下实例：

```mysql
mysql> ALTER TABLE customer_tbl 
       ALTER salary DROP DEFAULT;
```

修改数据表类型，可以使用 ALTER 命令及 TYPE 子句来完成。尝试以下实例，我们将表 customer_tbl 的类型修改为 MYISAM ：

```mysql
mysql> ALTER TABLE customer_tbl ENGINE = MYISAM;
```

### 4.删除表中的列

如果数据表中只剩余一列则无法使用DROP来删除。

#### 语法格式

```mysql
ALTER TABLE table_name
DROP COLUMN column_name;
```

#### 示例代码

```mysql
ALTER TABLE customer_tbl
DROP COLUMN address;  
```

```shell
mysql> ALTER TABLE customer_tbl
    -> DROP COLUMN address;
Query OK, 0 rows affected (0.00 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> desc customer_tbl;
+--------+-------------+------+-----+---------+-------+
| Field  | Type        | Null | Key | Default | Extra |
+--------+-------------+------+-----+---------+-------+
| id     | int(11)     | YES  |     | NULL    |       |
| name   | varchar(50) | YES  |     | NULL    |       |
| sex    | varchar(10) | NO   |     | NULL    |       |
| age    | int(11)     | YES  |     | NULL    |       |
| salary | int(100)    | NO   |     | NULL    |       |
+--------+-------------+------+-----+---------+-------+
5 rows in set (0.00 sec)
```

### 5.重命名表中的列

#### 语法格式

```mysql
ALTER TABLE table_name
CHANGE COLUMN old_name new_name
column_definition
[ FIRST | AFTER column_name ]
```

#### 示例代码

在此示例中，我们将列名“name”更改为“title”。

```mysql
ALTER TABLE  customer_tbl
CHANGE COLUMN name title  
varchar(20) NOT NULL;  
```

```shell
mysql> ALTER TABLE  customer_tbl
    -> CHANGE COLUMN name title
    -> varchar(20) NOT NULL;
Query OK, 0 rows affected (0.00 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> desc customer_tbl;
+--------+-------------+------+-----+---------+-------+
| Field  | Type        | Null | Key | Default | Extra |
+--------+-------------+------+-----+---------+-------+
| id     | int(11)     | YES  |     | NULL    |       |
| title  | varchar(20) | NO   |     | NULL    |       |
| sex    | varchar(10) | NO   |     | NULL    |       |
| age    | int(11)     | YES  |     | NULL    |       |
| salary | int(100)    | NO   |     | NULL    |       |
+--------+-------------+------+-----+---------+-------+
5 rows in set (0.00 sec)
```

### 6.重命名表

#### 语法格式

```mysql
ALTER TABLE TABLE_NAME
RENAME TO new_table_name;
```

#### 示例代码

在本例中，我们将表名 customer_tbl 重命名为 customer_table。

```mysql
ALTER TABLE customer_tbl  
RENAME TO customer_table; 
```

```shell
mysql> ALTER TABLE customer_tbl
    -> RENAME TO customer_table;
Query OK, 0 rows affected (0.00 sec)

mysql> desc customer_tbl;
ERROR 1146 (42S02): Table 'RUNOON.customer_tbl' doesn't exist

mysql> desc customer_table;
+--------+-------------+------+-----+---------+-------+
| Field  | Type        | Null | Key | Default | Extra |
+--------+-------------+------+-----+---------+-------+
| id     | int(11)     | YES  |     | NULL    |       |
| title  | varchar(20) | NO   |     | NULL    |       |
| sex    | varchar(10) | NO   |     | NULL    |       |
| age    | int(11)     | YES  |     | NULL    |       |
| salary | int(100)    | NO   |     | NULL    |       |
+--------+-------------+------+-----+---------+-------+
5 rows in set (0.00 sec)
```

FIRST 和 AFTER 关键字可用于 ADD 与 MODIFY 子句，所以如果你想重置数据表字段的位置就需要先使用 DROP 删除字段然后使用 ADD 来添加字段并设置位置。