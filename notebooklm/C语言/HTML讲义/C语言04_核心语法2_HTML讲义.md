# 核心语法2

> 分类: C语言 / HTML讲义
> 来源: c/核心语法2.html
> 提取说明: 从 HTML body 提取可见内容，保留标题、列表、表格和代码块。

# C语言核心语法2复习笔记

标识符、scanf键盘录入、字符串输入、多个数据录入、考试真题

一键导出 PDF

## 课程结构

01标识符：程序员自己起的名字

02scanf：键盘录入基本使用

03字符串：char数组、%s、字符串大小

04练习：录入年龄并打印

05scanf一次录入多个数据

06考试真题：scanf判断题、长方体面积和体积

## 一、标识符

**标识符**就是程序员自己起的名字。变量名、函数名、数组名等，只要是自己命名的，都属于标识符。

一句话：标识符是一个统称，变量名只是标识符的一种。

### 1. 标识符的硬性规则

| 规则 | 说明 | 示例 |
| --- | --- | --- |
| 只能由字母、数字、下划线组成 | 不能有空格、点、美元符号、减号等 | `age`、`age2`、`user_name` |
| 不能以数字开头 | 数字可以出现在后面，但不能放第一位 | `a2`正确，`2a`错误 |
| 不能是关键字 | C语言已经使用的单词不能再当名字 | `if`、`return`、`void`不能用 |
| 区分大小写 | `a`和`A`是两个不同变量 | `if`是关键字，`If`不是关键字 |

考试小坑：`if`不能作为标识符，但`If`可以，因为C语言严格区分大小写。不过实际开发中不建议用这种容易混淆的名字。

### 2. 标识符命名建议

命名建议不是语法强制要求，不遵守也可能不报错，但会让代码难读。

- 变量名尽量使用英文单词。
- 做到见名知意。
- 普通变量名尽量小写。
- 多个单词可以用下划线连接，例如 `student_age`。

```
int age; // 推荐
int student_age; // 推荐
int aaa; // 不推荐，看不出含义
int AGE; // 普通变量不推荐全大写
```

### 3. 文件名命名建议

- C语言源文件一般是 `xxx.c`。
- 文件名建议全部小写。
- 多个单词之间用下划线连接。
- 文件名可以数字开头，例如 `01_variable_demo.c`。

本节重点：标识符只能由字母、数字、下划线组成；不能数字开头；不能是关键字；严格区分大小写。

## 二、scanf键盘录入基础

直接给变量赋值时，数据是写死的：

```
int a = 10;
```

如果想让变量的值由用户输入决定，就要使用键盘录入。

### 1. scanf的作用

`scanf`是C语言提供好的输入函数，用来接收用户从键盘输入的数据，并赋值给对应变量。

| 函数 | 作用 | 示例 |
| --- | --- | --- |
| `printf` | 输出数据 | `printf("%d", a);` |
| `scanf` | 输入数据 | `scanf("%d", &a);` |

### 2. 输入整数的基本格式

```
int a;
scanf("%d", &a);
```

这里的含义是：从键盘输入一个整数，并把这个整数存入变量 `a`。

- `%d`：表示输入整数。
- `&a`：表示把输入的数据存到变量 `a` 中。

注意：普通变量使用 `scanf` 输入时，变量名前面要加 `&`。至于为什么，后面学习指针和地址时再深入理解。

### 3. 推荐写法：加提示信息

```
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int main()
{
int a;

printf("请输入一个整数：");
scanf("%d", &a);

printf("变量a里面的值为：%d\n", a);

return 0;
}
```

`printf`提示信息不是必须的，但可以让用户知道程序需要输入什么。

### 4. VS中scanf安全警告

在Visual Studio中，直接使用 `scanf` 可能出现 `C4996` 警告。解决方式是在代码最上方添加：

```
#define _CRT_SECURE_NO_WARNINGS
```

注意它要写在 `#include <stdio.h>` 前面。

本节重点：输入整数的核心代码是 `scanf("%d", &变量名);`。

## 三、字符串输入输出

名字、文本等不是整数，也不是小数，而是字符串。C语言中通常用 `char数组` 保存字符串。

### 1. 字符和字符串

| 类型 | 写法 | 说明 |
| --- | --- | --- |
| 字符 | `char ch = 'a';` | 单个字符，用单引号 |
| 字符串 | `char name[100];` | 多个字符组成，用字符数组 |

### 2. 字符串变量定义

```
char name[100];
```

这表示定义一个字符数组 `name`，用来保存字符串。

如果定义时已经知道内容，也可以写：

```
char str[4] = "aaa";
```

### 3. 字符串大小计算

字符串末尾有一个隐藏的结束标记：

```
'\0'
```

所以 `"aaa"` 表面上是3个字符，实际需要4个字节位置：

```
'a' 'a' 'a' '\0'
```

| 内容 | 课程环境下大小 | 原因 |
| --- | --- | --- |
| `"aaa"` | 4字节 | 3个英文字符 + 1个结束标记 |
| `"aaa你"` | 6字节 | 3个英文字符 + 1个中文字符2字节 + 1个结束标记 |

补充：中文占几个字节和编码有关。课程环境中按VS/VC默认情况，一个中文通常按2字节理解。实际写程序时，可以把数组开大一些，例如 `char name[100];`。

### 4. 字符串输入输出

字符串输入输出使用 `%s`。

```
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int main()
{
char name[100];

printf("请输入一个名字：");
scanf("%s", name);

printf("你输入的名字是：%s\n", name);

return 0;
}
```

注意：输入普通整数变量要写 `&a`，但输入字符数组时一般写 `name`，不写 `&name`。

限制：`scanf("%s", name);`默认遇到空格会停止。例如输入 `zhang san`，通常只会读到 `zhang`。

### 5. sizeof查看大小

```
#include <stdio.h>

int main()
{
char str[4] = "aaa";

printf("%s\n", str);
printf("%zu\n", sizeof(str));
printf("%zu\n", sizeof("aaa"));

return 0;
}
```

本节重点：C语言保存字符串用 `char数组`，输入输出字符串用 `%s`，字符串结尾有隐藏的 `'\0'`。

## 四、练习：录入年龄并打印

需求：键盘录入自己的年龄，并按照格式输出：

```
我的年龄为18岁
```

### 完整代码

```
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int main()
{
int age;

printf("请输入您的年龄：");
scanf("%d", &age);

printf("我的年龄为%d岁\n", age);

return 0;
}
```

### scanf格式字符串不要乱写

`scanf`的第一个参数规定了用户输入的格式。一般只写占位符，不要乱加其他内容。

不推荐：

```
scanf("aaa%d", &age);
```

这样要求用户必须输入类似：

```
aaa18
```

### scanf里不要随便写\n

不推荐：

```
scanf("%d\n", &age);
```

这样可能导致程序继续等待输入，看起来像卡住。

推荐：

```
scanf("%d", &age);
```

本节重点：`scanf`第一个参数里一般只写占位符，例如 `%d`，不要随便写 `\n` 或普通字符。

## 五、一次录入多个数据

如果要输入两个整数，可以写两个 `scanf`，但更推荐一次录入：

```
scanf("%d %d", &number1, &number2);
```

### 1. 完整示例：录入两个整数并求和

```
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int main()
{
int number1;
int number2;

printf("请输入两个整数：");
scanf("%d %d", &number1, &number2);

printf("两个整数的和为：%d\n", number1 + number2);

return 0;
}
```

### 2. 占位符和变量一一对应

| 要求 | 说明 |
| --- | --- |
| 数量一致 | 几个占位符，就要有几个变量接收 |
| 类型一致 | `%d`对应`int`，`%lf`对应`double` |
| 顺序一致 | 第一个占位符对应第一个变量，第二个对应第二个变量 |

### 3. 分隔符建议用空格

推荐：

```
scanf("%d %d", &a, &b);
```

输入时可以写：

```
10 20
```

也可以分两行输入：

```
10
20
```

如果写逗号：

```
scanf("%d,%d", &a, &b);
```

那用户必须输入：

```
10,20
```

不要用数字当分隔符。因为 `%d` 会尽可能多地读取连续数字，容易导致读取结果不符合预期。

本节重点：一次输入多个整数，写多个 `%d`，后面按顺序写多个 `&变量名`。

## 六、考试真题：scanf判断题

题目：已知整数变量 `a`、`b`、`c`，要从键盘输入数据并正确赋值，正确语句是什么？

正确写法：

```
scanf("%d %d %d", &a, &b, &c);
```

### 错误点总结

| 错误类型 | 错误原因 | 正确写法 |
| --- | --- | --- |
| 函数名写错 | 写成了 `read` 等 | `scanf` |
| 变量前少了 `&` | 普通变量接收输入需要地址 | `&a`、`&b`、`&c` |
| 占位符大小写错 | C语言区分大小写，`%D`不是`%d` | `%d` |

考试记忆：函数名 `scanf`，整数 `%d`，普通变量前加 `&`。

## 七、考试真题：长方体面积和体积

题目：键盘录入三个小数，分别表示长方体的长、宽、高。求A面、B面、C面的面积以及长方体体积，结果保留两位小数。

### 1. 公式

| 项目 | 公式 |
| --- | --- |
| A面面积 | 长 × 宽 |
| B面面积 | 宽 × 高 |
| C面面积 | 长 × 高 |
| 体积 | 长 × 宽 × 高 |

### 2. double输入和输出

| 场景 | 写法 |
| --- | --- |
| scanf输入double | `%lf` |
| printf保留两位小数 | `%.2lf` |

### 3. 完整代码

```
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int main()
{
double length;
double width;
double height;

printf("请输入三个小数，分别表示长、宽、高：");
scanf("%lf %lf %lf", &length, &width, &height);

double areaA = length * width;
double areaB = width * height;
double areaC = length * height;
double volume = length * width * height;

printf("A面的面积为：%.2lf\n", areaA);
printf("B面的面积为：%.2lf\n", areaB);
printf("C面的面积为：%.2lf\n", areaC);
printf("长方体的体积为：%.2lf\n", volume);

return 0;
}
```

### 4. 示例

```
输入：
5.2 2.5 3.1

输出：
A面的面积为：13.00
B面的面积为：7.75
C面的面积为：16.12
长方体的体积为：40.30
```

本节重点：输入 `double` 用 `%lf`；输出保留两位小数用 `%.2lf`。

## 八、总复习速记

| 知识点 | 必须记住 |
| --- | --- |
| 标识符 | 字母、数字、下划线；不能数字开头；不能是关键字；区分大小写 |
| 输入整数 | `scanf("%d", &a);` |
| 输入字符串 | `scanf("%s", name);` |
| 输入多个整数 | `scanf("%d %d", &a, &b);` |
| 输入double | `scanf("%lf", &x);` |
| 输出两位小数 | `printf("%.2lf", x);` |
| 字符串结尾 | 隐藏结束标记 `'\0'`，数组大小要多留1位 |
| scanf注意 | 格式字符串一般只写占位符，不要乱写 `\n` 或其他字符 |

高频错误：

- `scanf("%d", a);`：少了 `&`。
- `scanf("%d\n", &a);`：不建议在 `scanf` 里写 `\n`。
- `scanf("%D", &a);`：`%D`错误，整数是 `%d`。
- `char name;`：只能存一个字符，不能存字符串。
- `char str[3] = "aaa";`：没给 `'\0'` 留位置。

## 九、最终掌握代码合集

### 1. 输入一个整数

```
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int main()
{
int a;

printf("请输入一个整数：");
scanf("%d", &a);

printf("你输入的是：%d\n", a);

return 0;
}
```

### 2. 输入一个字符串

```
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int main()
{
char name[100];

printf("请输入一个名字：");
scanf("%s", name);

printf("你输入的名字是：%s\n", name);

return 0;
}
```

### 3. 输入两个整数并求和

```
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int main()
{
int number1;
int number2;

printf("请输入两个整数：");
scanf("%d %d", &number1, &number2);

printf("两个整数的和为：%d\n", number1 + number2);

return 0;
}
```

### 4. 长方体面积和体积

```
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int main()
{
double length;
double width;
double height;

printf("请输入三个小数，分别表示长、宽、高：");
scanf("%lf %lf %lf", &length, &width, &height);

double areaA = length * width;
double areaB = width * height;
double areaC = length * height;
double volume = length * width * height;

printf("A面的面积为：%.2lf\n", areaA);
printf("B面的面积为：%.2lf\n", areaB);
printf("C面的面积为：%.2lf\n", areaC);
printf("长方体的体积为：%.2lf\n", volume);

return 0;
}
```
