# C语言 · 共用体 union 复习系统

> 分类: C语言 / HTML讲义
> 来源: c/联合体.html
> 提取说明: 从 HTML body 提取可见内容，保留标题、列表、表格和代码块。

# C语言 · 第13章 · 共用体 union 复习系统

覆盖：共用体定义、基本使用、内存特点、大小计算、结构体与共用体区别

union 共用体 / 联合体 / 共同体 内存共用 sizeof 内存对齐 struct vs union typedef

使用建议：先看“总纲”建立框架，再按模块复习；最后做练习题自测。导出 PDF 前会自动展开全部内容和答案。

全部展开

全部收起

显示答案

隐藏答案

只看重点

导出 PDF

导航 总纲 使用场景 定义与使用 内存特点 大小计算 覆盖与取值 struct vs union 代码整理区 练习中心 实战策略 检查清单

总

## 总纲：这章到底学什么

共用体（union）的核心：多个成员共用同一块内存，同一时间通常只有一个成员有效。

### 1. 什么时候用

当“一个数据”可能有多种类型，但同一时刻只会采用其中一种类型时，可以用共用体。

### 2. 怎么用

用 `union` 定义类型，用 `.` 访问成员，字符串成员赋值用 `strcpy`。

### 3. 怎么考

常考成员共用内存、后赋值覆盖、`sizeof` 大小计算、和 `struct` 的区别。

易混点：结构体解决“一个事物有多个属性”；共用体解决“一个属性有多种可能类型”。

1

## 使用场景：什么情况下需要共用体

一个数据可能出现多种数据类型，并且同一时间只需要其中一种，就可以考虑使用 `union`。

案例 A：金融项目中的“钱”

钱这个数据，在不同情况下可能有不同形式：

- `int`：例如 `99999`
- `double`：例如 `123.32`
- `char[]`：例如 `"100万"`

只用一种普通类型难以同时表达这些情况。

案例 B：考试成绩

成绩也可能有多种表示方式：

- `int`：例如 `95`
- `double`：例如 `89.5`
- `char`：例如 `'A'`、`'B'`、`'C'`、`'D'`

这类“类型不固定的属性”适合使用共用体。

禁忌：不要把共用体理解成“可以同时保存多个值”。它的重点是“多种类型选一种”。

本模块记忆点：共用体适合表示“一个属性，多种可能类型”。

2

## 定义与基本使用

定义共用体使用关键字 `union`，它也是一种自定义数据类型。

**基本格式：**

```
union 共用体名
{
类型1 成员名1;
类型2 成员名2;
类型3 成员名3;
};
```

**文稿中的钱类型可以整理为：**

```
union MoneyType
{
int money_i;
double money_d;
char money_str[100];
};
```

定义变量：
`union MoneyType money;`
前面是自定义类型，后面是变量名。

成员名不能重复：
不要三个成员都叫 `money`，否则访问时无法区分。

**赋值和取值：**

```
#include <stdio.h>
#include <string.h>

union MoneyType
{
int money_i;
double money_d;
char money_str[100];
};

int main()
{
union MoneyType money;

money.money_i = 99999;
printf("整数形式：%d\n", money.money_i);

money.money_d = 123.32;
printf("小数形式：%.2lf\n", money.money_d);

strcpy(money.money_str, "100万");
printf("字符串形式：%s\n", money.money_str);

return 0;
}
```

字符串成员是字符数组，不能写 `money.money_str = "100万";`。必须使用 `strcpy`，并包含头文件 `#include <string.h>`。

本模块记忆点：共用体成员使用 `.` 访问；字符串成员赋值用 `strcpy`。

3

## 共用体的四个特点

### 特点 1：多个中文名

共用体、联合体、共同体，说的都是 C 语言里的 `union`。

### 特点 2：成员共用内存

所有成员使用同一块内存空间，因此成员起始地址相同。

### 特点 3：大小不是成员总和

共用体大小主要看最大成员，同时还会受到内存对齐影响。

### 特点 4：后赋值会覆盖前值

因为共用同一块内存，多次赋值时，后写入的数据会覆盖之前的数据。

**打印地址验证成员共用内存：**

```
#include <stdio.h>

union MoneyType
{
int money_i;
double money_d;
char money_str[100];
};

int main()
{
union MoneyType money;

printf("money_i 地址：%p\n", (void *)&money.money_i);
printf("money_d 地址：%p\n", (void *)&money.money_d);
printf("money_str 地址：%p\n", (void *)money.money_str);

return 0;
}
```

运行后会发现三个地址相同。原因是 `money_i`、`money_d`、`money_str` 都从同一块内存的起始位置开始存。

本模块记忆点：共用体不是“各存各的”，而是“大家共用同一个地方”。

4

## sizeof 与内存对齐：共用体大小怎么算

共用体大小计算：先看能容纳最大成员的空间，再让总大小满足最大单个成员的整数倍。

**文稿中的经典例子：**

```
union MoneyType
{
int money_i; // 通常 4 字节
double money_d; // 通常 8 字节
char money_str[100]; // 100 个 char，总共 100 字节
};
```

| 成员 | 说明 | 大小判断 |
| --- | --- | --- |
| `money_i` | `int` | 通常 4 字节 |
| `money_d` | `double` | 通常 8 字节，是最大单个成员 |
| `money_str` | `char[100]` | 总共 100 字节，但判断最大单个成员时要拆成 100 个 `char` |

关键细节：数组成员要拆开看。`char money_str[100]` 是 100 个单独的 `char`，每个 `char` 是 1 字节。因此最大单个成员仍然是 `double`，即 8 字节。

为什么结果是 104？

1. 共用体必须能容纳最大的整体成员，`char[100]` 需要 100 字节。
2. 最大单个成员的对齐基准是 `double`，即 8 字节。
3. 总大小必须是 8 的整数倍。
4. 100 不是 8 的整数倍，所以向后补 4 个空白字节。
5. 最终大小是 104 字节。

```
#include <stdio.h>

union MoneyType
{
int money_i;
double money_d;
char money_str[100];
};

int main()
{
union MoneyType money;

printf("sizeof(money.money_i) = %zu\n", sizeof(money.money_i));
printf("sizeof(money.money_d) = %zu\n", sizeof(money.money_d));
printf("sizeof(money.money_str) = %zu\n", sizeof(money.money_str));
printf("sizeof(money) = %zu\n", sizeof(money));

return 0;
}
```

严重易错：共用体大小不是所有成员相加，也不一定直接等于最大整体成员大小；还要考虑内存对齐。

本模块记忆点：谁大听谁的，但还要听内存对齐的。

5

## 后赋值覆盖：怎么存，就怎么取

共用体每次通常只能有一个有效成员。后一次赋值会覆盖前一次赋值。

```
#include <stdio.h>

union Data
{
int data_i;
double data_d;
};

int main()
{
union Data data;

data.data_i = 99;
data.data_d = 1.23;

printf("按 double 读取：%lf\n", data.data_d); // 正确
printf("按 int 读取：%d\n", data.data_i); // 错误，结果无意义

return 0;
}
```

原因：`data_i` 和 `data_d` 使用同一块内存。先存 `int`，再存 `double`，第二次写入会覆盖第一次的数据。

存储规则不同：`int` 和 `double` 在内存中的二进制格式不同。存的是 `double`，却按 `int` 读取，结果就是错误数据。

本模块记忆点：赋给哪个成员，就从哪个成员取；最后一次给谁赋值，当前有效成员就是谁。

6

## 结构体和共用体的区别

结构体表示“一个事物的多个属性”；共用体表示“一个属性的多种可能类型”。

| 对比项 | 结构体 struct | 共用体 union |
| --- | --- | --- |
| 代码层面 | 表示一种事物，里面有多个属性 | 表示一个属性，但这个属性有多种数据类型 |
| 典型案例 | 女朋友、学生、老师等对象 | 钱、成绩等类型不固定的属性 |
| 存储方式 | 成员各存各的，空间互相独立 | 成员存在一起，共用同一块内存 |
| 多次赋值 | 多个成员可同时保存各自的值 | 后赋值会覆盖前面的数据 |
| 内存占用 | 大致是所有成员大小之和，再加内存对齐 | 谁大听谁的，再受内存对齐影响 |

结构体适合描述“事物”

- 女朋友：名字、年龄、性别、身高
- 学生：姓名、年龄、考试成绩
- 老师：姓名、年龄、工作年龄

```
struct Student
{
char name[50];
int age;
double score;
};
```

共用体适合描述“属性的多种类型”

- 钱：整数、小数、字符串
- 成绩：整数、小数、ABCD 等级

```
union Score
{
int score_i;
double score_d;
char score_level;
};
```

本模块记忆点：如果多个数据要同时存在，用 `struct`；如果同一时间只选一种类型，用 `union`。

7

## typedef：给共用体起别名

`typedef` 可以给共用体类型起别名，让定义变量更简洁。

不使用 typedef

```
union MoneyType money;
```

每次定义变量都要写 `union MoneyType`。

使用 typedef

```
typedef union MoneyType
{
int money_i;
double money_d;
char money_str[100];
} Money;

Money money;
```

可以直接用 `Money` 定义变量。

了解即可：文稿中也提到可以起别名为 `MT`。实际写代码时，更推荐起有意义的名字，例如 `Money`。

码

## 代码整理区：可复制运行

代码 1：共用体基本使用

```
#include <stdio.h>
#include <string.h>

typedef union MoneyType
{
int money_i;
double money_d;
char money_str[100];
} Money;

int main()
{
Money money;

money.money_i = 99999;
printf("整数形式：%d\n", money.money_i);

money.money_d = 123.32;
printf("小数形式：%.2lf\n", money.money_d);

strcpy(money.money_str, "100万");
printf("字符串形式：%s\n", money.money_str);

return 0;
}
```

代码 2：打印成员地址，验证共用内存

```
#include <stdio.h>

typedef union MoneyType
{
int money_i;
double money_d;
char money_str[100];
} Money;

int main()
{
Money money;

printf("money_i 地址：%p\n", (void *)&money.money_i);
printf("money_d 地址：%p\n", (void *)&money.money_d);
printf("money_str 地址：%p\n", (void *)money.money_str);

return 0;
}
```

代码 3：sizeof 验证共用体大小

```
#include <stdio.h>

typedef union MoneyType
{
int money_i;
double money_d;
char money_str[100];
} Money;

int main()
{
Money money;

printf("int成员大小：%zu\n", sizeof(money.money_i));
printf("double成员大小：%zu\n", sizeof(money.money_d));
printf("字符串数组成员大小：%zu\n", sizeof(money.money_str));
printf("整个共用体大小：%zu\n", sizeof(money));

return 0;
}
```

代码 4：结构体和共用体对比

```
#include <stdio.h>

struct StructData
{
int data_i;
double data_d;
};

union UnionData
{
int data_i;
double data_d;
};

int main()
{
printf("struct大小：%zu\n", sizeof(struct StructData));
printf("union大小：%zu\n", sizeof(union UnionData));

return 0;
}
```

练

## 练习中心：题目可见，答案隐藏

练习 1：判断适用场景

下面两种情况分别应该用 `struct` 还是 `union`？

A. 表示一个学生，需要同时保存姓名、年龄、成绩。

B. 表示一个成绩，可能是整数分、小数分，也可能是 A/B/C/D 等级。

点击查看答案解析

**答案：**A 用 `struct`，B 用 `union`。

**解析：**A 是“一个事物的多个属性”，姓名、年龄、成绩要同时存在，所以用结构体。B 是“一个属性的多种类型”，同一时间成绩只会用一种形式，所以用共用体。

**结论：**多个属性同时存在用 `struct`；多种类型选一种用 `union`。

练习 2：计算 sizeof

下面共用体在常见 64 位环境下大小是多少？

```
union MoneyType
{
int money_i;
double money_d;
char money_str[100];
};
```

点击查看答案解析

**答案：**通常是 104 字节。

**解析：**`char[100]` 需要 100 字节空间；最大单个成员是 `double`，对齐基准是 8 字节。100 不是 8 的整数倍，所以补 4 字节到 104。

**结论：**共用体大小既要能容纳最大整体成员，也要考虑最大单个成员的对齐要求。

练习 3：判断输出是否可靠

下面代码最后一行输出是否可靠？为什么？

```
union Data
{
int data_i;
double data_d;
};

int main()
{
union Data data;
data.data_i = 99;
data.data_d = 1.23;
printf("%d\n", data.data_i);
return 0;
}
```

点击查看答案解析

**答案：**不可靠，结果是错误数据。

**解析：**`data.data_d = 1.23;` 会覆盖之前 `data.data_i = 99;` 写入的数据。最后再按 `int` 读取同一块内存，读到的不是原来的 99。

**内存示意：**同一块空间先放 99，随后改放 1.23；现在空间里的有效内容是 double 格式的 1.23。

**结论：**怎么存，就怎么取；最后给哪个成员赋值，就按哪个成员取。

练习 4：找出字符串赋值错误

下面代码哪里错了？应该怎么改？

```
union MoneyType
{
int money_i;
double money_d;
char money_str[100];
};

int main()
{
union MoneyType money;
money.money_str = "100万";
return 0;
}
```

点击查看答案解析

**答案：**`money.money_str = "100万";` 错了。

**解析：**`money_str` 是字符数组，数组不能用 `=` 整体赋值。应该使用 `strcpy`，并引入 `#include <string.h>`。

```
#include <stdio.h>
#include <string.h>

union MoneyType
{
int money_i;
double money_d;
char money_str[100];
};

int main()
{
union MoneyType money;
strcpy(money.money_str, "100万");
printf("%s\n", money.money_str);

return 0;
}
```

**结论：**字符数组赋值用 `strcpy`，不能直接用 `=`。

练习 5：结构体和共用体内存区别

为什么下面两个类型大小不同？

```
struct S
{
int data_i;
double data_d;
};

union U
{
int data_i;
double data_d;
};
```

点击查看答案解析

**答案：**`struct S` 通常更大，`union U` 通常是 8 字节。

**解析：**结构体中 `int` 和 `double` 各存各的，整体大小大致是成员之和再加对齐填充。共用体中二者共用同一块内存，大小以较大的 `double` 为主。

**结论：**结构体成员独立存储；共用体成员共用存储。

策

## 实战策略：考试和写代码怎么判断

判断 struct / union：

1. 先看它是“一个事物”还是“一个属性”。
2. 一个事物有多个属性同时存在：用 `struct`。
3. 一个属性有多种可能类型：用 `union`。

判断 sizeof：

1. 列出所有成员大小。
2. 数组成员要拆成单个元素判断最大单个成员。
3. 找对齐基准。
4. 总大小补到基准的整数倍。

常见陷阱 1：看到多个成员连续赋值，要立刻想到“后赋值覆盖前面的值”。

常见陷阱 2：看到字符串数组成员直接用 `=` 赋值，要立刻判断为错误。

常见陷阱 3：计算共用体大小时，不要简单相加，也不要忽略内存对齐。

记忆口诀：结构体各存各的；共用体存在一起。结构体表示事物；共用体表示属性多类型。

查

## 最终检查清单

- ✓知道共用体、联合体、共同体都是 `union`。必掌握
- ✓会写共用体定义格式：`union 类型名 { 成员; };`。必掌握
- ✓知道共用体也是一种自定义数据类型。必掌握
- ✓成员名不能重复。易错
- ✓定义变量写法：`union 类型名 变量名;`。必掌握
- ✓使用 `.` 访问成员。必掌握
- ✓字符数组成员赋值用 `strcpy`，需要 `#include <string.h>`。高频错误
- ✓所有成员共用同一块内存，成员地址相同。必掌握
- ✓后赋值会覆盖前面的值。禁忌
- ✓牢记“怎么存，就怎么取”。禁忌
- ✓共用体大小不是成员总和，而是看最大成员和内存对齐。必掌握
- ✓数组成员判断最大单个成员时，要拆成单个元素看。易错
- ✓结构体表示一个事物的多个属性。必掌握
- ✓共用体表示一个属性的多种可能类型。必掌握
- ✓`typedef` 可以给共用体起别名。了解即可

**C语言共用体 union 复习系统**

覆盖范围：共用体定义、使用场景、内存特点、sizeof 计算、结构体与共用体区别

最后更新时间：2026-05-08

    function expandAll() { document.querySelectorAll("details").forEach(function(detail) { detail.open = true; }); } function collapseAll() { document.querySelectorAll("details").forEach(function(detail) { detail.open = false; }); } function showAnswers() { document.querySelectorAll("details.answer-toggle").forEach(function(detail) { detail.open = true; }); } function hideAnswers() { document.querySelectorAll("details.answer-toggle").forEach(function(detail) { detail.open = false; }); } function toggleFocusMode() { const body = document.body; const button = document.getElementById("focusBtn"); body.classList.toggle("focus-mode"); if (body.classList.contains("focus-mode")) { button.textContent = "显示全部"; button.style.background = "var(--amber)"; button.style.color = "#ffffff"; button.style.borderColor = "var(--amber)"; } else { button.textContent = "只看重点"; button.style.background = ""; button.style.color = ""; button.style.borderColor = ""; } } function printPage() { expandAll(); showAnswers(); setTimeout(function() { window.print(); }, 250); }
