# C语言字符串复习系统

> 分类: C语言 / HTML讲义
> 来源: c/字符串.html
> 提取说明: 从 HTML body 提取可见内容，保留标题、列表、表格和代码块。

C Language Review System

# C语言字符串复习系统

本页面整合“字符串两种定义方式、键盘录入与遍历、字符串数组、常见字符串函数、登录练习、统计次数练习”等内容， 适合课后复盘、考前检查和代码自测。

使用方法：先看“总纲”建立框架，再逐个复习核心模块；练习区先自己判断，再点击查看答案解析。

字符串底层 必须掌握：'\0' 字符数组 易错：指针接收输入 练习：登录与统计 禁忌：修改字符串常量

全部展开

全部收起

只看重点

显示答案

隐藏答案

导出 PDF

总纲 字符串本质 输入与遍历 字符串数组 常见函数 登录练习 统计次数 演练中心 实战策略 检查清单

Core Framework

## 总方法论：学字符串，抓住三件事

### 1. 底层

字符串不是 C 语言的独立基本类型，本质是以 `'\0'` 结尾的字符数组。

### 2. 空间

凡是要写入、拼接、复制的字符串，都必须有可写空间，不能写进字符串常量。

### 3. 处理

字符串处理通常是“遍历字符”或“调用 `string.h` 函数”。

总规则：判断一段字符串代码能不能运行，先问三个问题：有没有 `'\0'`？空间够不够？内容能不能被修改？

Module 1

## 模块 1：字符串本质与两种定义方式

C 语言字符串的本质是字符数组，末尾必须有 `'\0'` 作为结束标记。

### 字符数组方式

```
char str1[] = "abc";
```

底层内容是 `'a'`、`'b'`、`'c'`、`'\0'`。数组中的内容可以修改。

### 字符指针方式

```
const char *str2 = "abc";
```

指针保存字符串常量的首地址。字符串常量通常在只读常量区，不应该修改。

核心解释：为什么 C 语言没有专门的 string 类型？

C 语言有 `int`、`char`、`float`、`double` 等基本类型， 但没有原生的 `string` 类型。字符串在底层会拆成多个字符保存，所以 C 语言用字符数组表示字符串。

例如 `"abc"` 看起来是一个整体，但底层实际是：

```
'a' 'b' 'c' '\0'
```

必须掌握：`'\0'` 是字符串结束标记，不是字符 `'0'`。 `printf("%s", str)` 会一直打印，直到遇到 `'\0'` 才停止。

易错提醒：`char str[3] = "abc";` 没有给 `'\0'` 留空间，打印时可能读出乱码。 推荐写 `char str[] = "abc";` 或 `char str[4] = "abc";`。

严重禁忌：不要修改字符串常量，例如 `char *p = "abc"; p[0] = 'Q';`。 这可能导致程序崩溃。更规范的写法是 `const char *p = "abc";`。

了解即可：相同的字符串常量可能被复用。例如两个指针都指向 `"abcd"`， 它们的地址可能相同。是否复用与编译器有关，但结论不变：不要修改字符串常量。

Module 2

## 模块 2：键盘录入字符串并遍历

键盘录入字符串时，要准备可写的字符数组；遍历字符串时，遍历到 `'\0'` 为止。

### 1. 正确接收输入

```
char str[100];

printf("请输入字符串：\n");
scanf("%99s", str);
```

为什么 `str` 前面不用加 `&`？ 数组名 `str` 在这里可以表示数组首地址，`scanf` 需要的正是这个地址。

不能这样写：

```
char *str;
scanf("%s", str);
```

原因：`str` 没有指向有效的可写内存。

### 2. 遍历字符串

```
char *p = str;

while (*p != '\0')
{
printf("%c\n", *p);
p++;
}
```

指针 `p` 一开始指向第一个字符。每打印一个字符，`p++` 向后移动一格。 遇到 `'\0'`，说明字符串结束。

输入：`abc`
底层：`'a' 'b' 'c' '\0'`
输出：`a`、`b`、`c`

补充：`scanf("%s", str)` 遇到空格会停止读取。 本课程当前练习不处理带空格字符串。

Module 3

## 模块 3：保存多个字符串

一个字符串是一个字符数组；多个字符串可以用二维字符数组，也可以用指针数组。

### 方式一：二维字符数组

```
char names[5][20] = {
"张三",
"李四",
"王五",
"赵六",
"钱七"
};
```

数组本身保存字符串内容。每一行是一个字符串。

### 方式二：指针数组

```
const char *names2[5] = {
"张三",
"李四",
"王五",
"赵六",
"钱七"
};
```

数组保存的是字符串常量的地址，不是把内容复制进数组。

### 遍历写法

```
for (int i = 0; i < 5; i++)
{
printf("%s\n", names[i]);
}
```

易错：不能写 `char str[100] = names[i];`。 数组不能这样直接接收另一个数组。若只是临时访问，写 `char *str = names[i];` 即可。

| 对比项 | 二维字符数组 | 指针数组 |
| --- | --- | --- |
| 保存内容 | 直接保存字符串内容 | 保存字符串地址 |
| 是否可改 | 通常可以修改数组内容 | 字符串常量不应该修改 |
| 适合场景 | 需要修改姓名内容 | 只读展示多个固定字符串 |

Module 4

## 模块 4：字符串常见函数

使用字符串函数前，先导入 `#include <string.h>`。

| 函数 | 作用 | 关键规则 |
| --- | --- | --- |
| `strlen` | 获取字符串长度 | 不统计 `'\0'`，统计的是字节数 |
| `strcat` | 拼接字符串 | 把第二个字符串拼到第一个字符串末尾 |
| `strcpy` | 复制字符串 | 用第二个字符串覆盖第一个字符串 |
| `strcmp` | 比较字符串内容 | 返回 0 表示相同，非 0 表示不同 |
| `_strlwr` | 转小写 | VS 中常见写法，只处理英文大小写 |
| `_strupr` | 转大写 | VS 中常见写法，只处理英文大小写 |

函数细节与例子

### `strlen`：长度

```
strlen("abc") // 结果是 3，不是 4
```

它不计算结束标记 `'\0'`。对于中文，它统计的是字节数，不一定等于汉字个数。

### `strcat`：拼接

```
char str2[100] = "abc";
char str3[] = "qwer";

strcat(str2, str3);
```

### `strcpy`：复制覆盖

```
char str2[100] = "abc";
char str3[] = "qwer";

strcpy(str2, str3);
```

### `strcmp`：比较内容

```
strcmp("abc", "abc")
strcmp("abc", "acb")
strcmp("abc", "abc ")
```

重要禁忌：`strcat`、`strcpy`、`_strlwr`、`_strupr` 都会修改传入字符串，所以目标字符串必须是可修改数组，并且空间必须足够。

了解即可：`strlwr` 和 `strupr` 不是标准 C 的通用函数。 在 VS 中可能提示旧函数过时，使用 `_strlwr`、`_strupr`。

Module 5

## 模块 5：练习 1——用户登录

登录练习的核心：用字符数组接收输入，用 `strcmp` 比较用户名和密码，用循环控制三次机会。

```
#include <stdio.h>
#include <string.h>

int main()
{
const char *rightUsername = "张三";
const char *rightPassword = "1234qwer";

for (int i = 1; i <= 3; i++)
{
char username[100];
char password[100];

printf("请输入用户名：\n");
scanf("%99s", username);

printf("请输入密码：\n");
scanf("%99s", password);

if (strcmp(username, rightUsername) == 0 &&
strcmp(password, rightPassword) == 0)
{
printf("登录成功\n");
break;
}
else
{
if (i == 3)
{
printf("登录失败次数过多，账号已被锁定，请联系管理员\n");
}
else
{
printf("登录失败，还剩下%d次机会\n", 3 - i);
}
}
}

return 0;
}
```

必须掌握：字符串内容比较用 `strcmp(a, b) == 0`， 不要用 `a == b`。

老师强调的调试思想：代码要“一段一段写，一段一段测”。 先测试输入是否成功，再测试比较是否正确，最后加循环。

易错：输入用户名和密码的代码必须放在循环里面。 如果放在循环外面，用户只输入一次，程序会拿同一份数据比较三次。

补充：课程中提到一个现阶段无法彻底解决的小 bug： 如果最后一次输入了另一个用户名，提示“某某被锁定”可能不准确。 真正的账号系统需要数据库或本地文件记录用户状态。当前阶段掌握模拟登录逻辑即可。

Module 6

## 模块 6：练习 2——统计字符次数

看到“统计”，先想到计数器；统计字符串中的字符，就要遍历字符串并判断字符范围。

```
#include <stdio.h>
#include <string.h>

int main()
{
char str[100];

printf("请输入一个字符串：\n");
scanf("%99s", str);

int bigCount = 0;
int smallCount = 0;
int numberCount = 0;

int len = strlen(str);

for (int i = 0; i < len; i++)
{
char c = str[i];

if (c >= 'a' && c <= 'z')
{
smallCount++;
}
else if (c >= 'A' && c <= 'Z')
{
bigCount++;
}
else if (c >= '0' && c <= '9')
{
numberCount++;
}
}

printf("大写字符出现了%d次\n", bigCount);
printf("小写字符出现了%d次\n", smallCount);
printf("数字字符出现了%d次\n", numberCount);

return 0;
}
```

必须掌握：数字字符是 `'0'` 到 `'9'`， 不是整数 `0` 到 `9`。

易错修正：大写字母范围应是 `'A'` 到 `'Z'`。

另一种遍历写法：不使用 strlen

```
for (int i = 0; str[i] != '\0'; i++)
{
char c = str[i];
}
```

这种写法直接利用字符串结束标记 `'\0'`，不需要 `#include <string.h>`。

测试技巧：不要靠眼睛数长字符串。 可以在原输入后面额外加一个小写、一个大写、一个数字，看三个计数是否都加 1。

Practice Center

## 练习 / 案例演练中心

练习 1：判断数组长度是否足够

`char str[3] = "abc"; printf("%s\n", str);`

这段代码有什么风险？

点击查看答案解析

**答案：**数组空间不够，可能打印乱码或产生未定义行为。

**解析：**`"abc"` 底层需要保存 `'a'`、`'b'`、`'c'`、`'\0'`，至少需要 4 个位置。

**正确写法：**`char str[4] = "abc";` 或 `char str[] = "abc";`

练习 2：为什么不能用字符指针接收输入？

```
char *str;
scanf("%s", str);
```

这段代码为什么不安全？

点击查看答案解析

**答案：**`str` 没有指向有效的可写内存。

**解析：**`scanf` 会把输入内容写入 `str` 指向的位置，但这个指针没有初始化，程序不知道该写到哪里。

**正确写法：**`char str[100]; scanf("%99s", str);`

练习 3：比较字符串内容

```
char username[100] = "张三";
const char *rightUsername = "张三";

if (username == rightUsername)
{
printf("相同");
}
```

这段代码能正确比较字符串内容吗？

点击查看答案解析

**答案：**不能。

**解析：**`==` 比较的是地址，不是字符串内容。两个字符串内容相同，但地址可能不同。

**正确写法：**`strcmp(username, rightUsername) == 0`

练习 4：strcat 和 strcpy 的区别

```
char a[100] = "abc";
char b[] = "qwer";

strcat(a, b);
```

执行后 `a` 的内容是什么？如果换成 `strcpy(a, b)` 呢？

点击查看答案解析

**答案：**`strcat(a, b)` 后，`a` 是 `"abcqwer"`；`strcpy(a, b)` 后，`a` 是 `"qwer"`。

**解析：**`strcat` 是追加，保留原内容；`strcpy` 是覆盖，原内容会被替换。

练习 5：统计字符次数

`输入：abcdABCD1234aA1`

大写、小写、数字字符分别出现多少次？

点击查看答案解析

**答案：**大写 5 次，小写 5 次，数字 5 次。

**解析：**`abcd` 是 4 个小写，后面的 `a` 又加 1；`ABCD` 是 4 个大写，后面的 `A` 又加 1；`1234` 是 4 个数字字符，后面的 `1` 又加 1。

Strategy

## 考场攻略 / 实战策略

### 看到字符串定义题

先判断是字符数组还是字符指针；再判断是否要修改内容；最后检查有没有给 `'\0'` 留空间。

### 看到输入题

优先写 `char str[容量];`，再用 `scanf("%限定长度s", str)` 接收。

### 看到比较题

字符串内容比较用 `strcmp`。返回 0 才是相同。

### 看到统计题

马上想到计数器：初始化为 0，满足条件就 `++`，最后输出。

快速判断步骤：

1. 这段字符串是否需要被修改？需要就必须用可写字符数组。
2. 是否涉及字符串结束？检查 `'\0'`。
3. 是否涉及字符串内容比较？使用 `strcmp`。
4. 是否涉及拼接或复制？检查目标空间是否足够。
5. 是否统计字符？遍历字符串并用字符范围判断。

Final Checklist

## 最终检查清单

### 基础概念

[ ] 我知道 C 语言没有原生字符串类型。

[ ] 我知道字符串底层是字符数组。

[ ] 我知道字符串末尾必须有 `'\0'`。

[ ] 我能区分 `'\0'` 和 `'0'`。

### 定义与存储

[ ] 我能写出 `char str[] = "abc";`。

[ ] 我知道字符数组内容可以修改。

[ ] 我知道 `char *p = "abc";` 指向字符串常量。

[ ] 我不会修改字符串常量。

### 输入与遍历

[ ] 我会用字符数组接收输入。

[ ] 我知道 `scanf` 中数组名不加 `&`。

[ ] 我不会用未初始化指针接收输入。

[ ] 我会遍历到 `'\0'`。

### 函数与练习

[ ] 我会使用 `strlen`、`strcat`、`strcpy`、`strcmp`。

[ ] 我知道 `strcmp` 返回 0 表示相同。

[ ] 我会写三次登录机会的循环。

[ ] 我会统计大写、小写、数字字符次数。

**资料主题：**C语言第 11 章字符串复习系统

**覆盖范围：**字符串定义、底层存储、键盘录入、遍历、字符串数组、常见函数、登录练习、统计次数练习

**最后更新时间：**2026-05-06

  function expandAll() { document.querySelectorAll("details").forEach(function (detail) { detail.open = true; }); } function collapseAll() { document.querySelectorAll("details").forEach(function (detail) { detail.open = false; }); } function showAnswers() { document.querySelectorAll("details.answer-toggle").forEach(function (detail) { detail.open = true; }); } function hideAnswers() { document.querySelectorAll("details.answer-toggle").forEach(function (detail) { detail.open = false; }); } function toggleFocusMode() { document.body.classList.toggle("focus-mode"); var btn = document.getElementById("focusBtn"); if (document.body.classList.contains("focus-mode")) { btn.textContent = "显示全部"; } else { btn.textContent = "只看重点"; } } function printPage() { expandAll(); showAnswers(); setTimeout(function () { window.print(); }, 120); }
