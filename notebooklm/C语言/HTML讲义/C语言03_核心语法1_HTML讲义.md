# 核心语法1

> 分类: C语言 / HTML讲义
> 来源: c/核心语法1.html
> 提取说明: 从 HTML body 提取可见内容，保留标题、列表、表格和代码块。

# C语言数据类型复习笔记

覆盖：数据类型作用、整数、小数、字符、sizeof、后缀、signed / unsigned、易错点

导出 PDF / 打印

### 复习目录

1. 数据类型作用 2. 类型总览 3. 整数类型 4. sizeof 5. signed / unsigned 6. 小数类型 7. 字符类型 8. 速查表 9. 完整练习代码 10. 易错点

## 1. 数据类型的作用

C语言定义变量的基本格式：

```
数据类型 变量名 = 数据值;
```

例如：

```
int num = 56;
```

作用一：决定能存什么

`int` 存整数，`float / double` 存小数，`char` 存字符。

作用二：决定占多大空间

变量是内存空间，空间大小由数据类型决定。

### bit、Byte 和常见单位

| 单位 | 含义 |
| --- | --- |
| `bit` | 一个二进制位，只能是 `0` 或 `1` |
| `Byte` | `1 Byte = 8 bit` |
| `KB / MB / GB` | 相邻单位通常按 `1024` 换算 |

课程中还提到更大的单位，如 TB、PB、EB、ZB、YB。YB 非常大，初学阶段了解即可。

### 例子：int 存储 56

`56` 的二进制可以写成：

```
111000
```

但如果使用 `int` 保存，在常见 Windows 环境中，`int` 通常占 `4` 字节，也就是 `32` bit，所以会补齐为：

```
00000000 00000000 00000000 00111000
```

记忆：数据类型不是摆设，它决定变量“存什么”和“占多大”。

## 2. C语言常见数据类型总览

本阶段围绕变量继续学习：数据类型、标识符、键盘录入。其中这几节课重点是数据类型。

| 分类 | 类型 | 用途 |
| --- | --- | --- |
| 整数 | `short`、`int`、`long`、`long long` | 保存整数 |
| 小数 | `float`、`double`、`long double` | 保存小数，也叫实数或浮点数 |
| 字符 | `char` | 保存单个字符 |

默认规则 普通整数默认用 `int`；普通小数默认用 `double`。

## 3. 整数类型

整数类型有四种：

```
short
int
long
long long
```

| 类型 | 名称 | Windows 常见大小 | 重点 |
| --- | --- | --- | --- |
| `short` | 短整型 | 2 字节 | 常见范围：`-32768 到 32767` |
| `int` | 整型 | 4 字节 | 整数默认类型，常见范围约正负 21 亿 |
| `long` | 长整型 | Windows 常见 4 字节 | 范围要求大于等于 `int` |
| `long long` | 超长整型 | 8 字节 | C99 才有，C89 / C90 没有 |

类型大小不是 C 语言完全固定死的，和操作系统、编译器、平台位数有关。具体大小用 `sizeof` 测。

### 整数大小原则

```
short = int = long = long long
```

课程中也提到：Windows 下 `long` 通常是 4 字节；Linux 中，32 位常见 4 字节，64 位可能是 8 字节。

### 定义与打印

```
#include <stdio.h>

int main()
{
short a = 10;
int b = 100;
long c = 1000L;
long long d = 10000LL;

printf("%d\n", a);
printf("%d\n", b);
printf("%ld\n", c);
printf("%lld\n", d);

return 0;
}
```

long 后缀

`long c = 1000L;`

long long 后缀

`long long d = 10000LL;`

推荐大写

用 `L`、`LL`，不要用小写 `l`，避免和数字 `1` 混淆。

### 完整写法

| 常用写法 | 完整写法 |
| --- | --- |
| `short` | `short int` |
| `long` | `long int` |
| `long long` | `long long int` |

错误写法：`int int a = 10;`。`int` 本身就是完整类型，不能再加一个 `int`。

### 超出范围会出错

例如常见 Windows 环境下：

```
short a = 32768; // 超过 short 常见最大值 32767，可能出错
int b = 2147483648; // 超过 int 常见最大值，可能出错
```

具体为什么会变成其他数字，后面学整数溢出、补码时再深入。

## 4. sizeof：测量类型大小

`sizeof` 是 C 语言关键字，用来测量变量或数据类型占几个字节。

测类型

`sizeof(int)`

测变量

`sizeof(a)`

打印格式

`%zu`

```
#include <stdio.h>

int main()
{
int a = 10;

printf("%zu\n", sizeof(int));
printf("%zu\n", sizeof(a));

return 0;
}
```

记忆：类型大小不要死背，想知道当前电脑上占几个字节，就用 `sizeof`。

## 5. signed 和 unsigned

signed：有符号

可以表示正数、负数和 0。

`signed int e = -100;`

unsigned：无符号

只能表示 0 和正数。

`unsigned int f = 999;`

普通整数默认就是有符号，所以：

```
int e = -100;
```

等价于：

```
signed int e = -100;
```

### unsigned 打印

```
unsigned int f = 999;
printf("%u\n", f);
```

### unsigned short 范围变化

| 类型 | 常见范围 |
| --- | --- |
| `short` | `-32768 到 32767` |
| `unsigned short` | `0 到 65535` |

理解方式：无符号类型不再表示负数，原来负数那部分范围挪到了正数范围。

```
32767 + 32768 = 65535
```

不要给 `unsigned` 强行赋负数，例如 `unsigned int f = -100;`，结果会变成一个不符合直觉的正数。

### unsigned 可以和整数类型组合

```
unsigned short
unsigned int
unsigned long
unsigned long long
```

`unsigned` 不能和小数类型组合。错误：`unsigned double a = 3.14;`

## 6. 小数类型

C语言中的小数也叫实数或浮点数。常用小数类型：

```
float
double
```

还有一个不常用的高精度小数：

```
long double
```

| 类型 | 名称 | Windows 常见大小 | 课程重点 |
| --- | --- | --- | --- |
| `float` | 单精度小数 | 4 字节 | 最多约 38 位数量级，精度约小数点后 6 位 |
| `double` | 双精度小数 | 8 字节 | 最多约 308 位数量级，精度约小数点后 15 位 |
| `long double` | 高精度小数 | Windows 常见 8 字节 | 其他平台可能 12 或 16 字节，精度约 18 到 19 位 |

小数取值范围通常比整数大，因为小数底层类似科学计数法存储。范围大不代表完全精确，小数可能存在精度误差。

### float

```
float a = 3.14F;

printf("%f\n", a); // 默认保留 6 位小数
printf("%.2f\n", a); // 保留 2 位小数
```

因为 C 语言中小数默认是 `double`，所以给 `float` 赋值时建议加 `F` 后缀。

### double

```
double b = 1.78;

printf("%f\n", b);
printf("%.2f\n", b);
```

如果题目没有特殊要求，小数优先使用 `double`。

课程演示中提到 `%lf`。实际在 `printf` 中，打印 `double` 通常用 `%f` 即可；以后学习 `scanf` 输入时，读取 `double` 才重点使用 `%lf`。

### long double

```
long double c = 3.141592653589793238L;

printf("%Lf\n", c);
printf("%.2Lf\n", c);
```

小数不能和 `unsigned` 组合。错误：`unsigned float`、`unsigned double`、`unsigned long double`。

## 7. 字符类型 char

字符类型只有一个：

```
char
```

`char` 用来存储单个字符。字符要用单引号。

```
char c = 'a';
```

### char 能保存什么

| 类别 | 例子 |
| --- | --- |
| 小写英文字母 | `'a'`、`'b'` |
| 大写英文字母 | `'A'`、`'B'` |
| 数字字符 | `'0'`、`'1'` |
| 英文标点 | `'.'`、`','`、`'!'` |

课程中说 `char` 的取值范围是 ASCII 码表中的内容。普通 `char` 不适合直接保存中文汉字，也不适合直接保存中文标点。

### 定义与打印

```
#include <stdio.h>

int main()
{
char c1 = 'a';
char c2 = '1';
char c3 = 'A';
char c4 = '.';

printf("%c\n", c1);
printf("%c\n", c2);
printf("%c\n", c3);
printf("%c\n", c4);

return 0;
}
```

### 字符 1 和数字 1 不一样

```
char c = '1';
int n = 1;
```

### char 的大小

在 Windows 操作系统中，`char` 通常占 1 个字节。

```
printf("%zu\n", sizeof(char));
```

不推荐：`char c = '你';`。普通 `char` 通常只占 1 字节，中文字符通常不止 1 字节，可能输出问号或乱码。

## 8. 复习速查表

### 打印格式

| 类型 / 用途 | 格式符 |
| --- | --- |
| `short`、`int` | `%d` |
| `long` | `%ld` |
| `long long` | `%lld` |
| `unsigned int` | `%u` |
| `float`、`double` | `%f` |
| `long double` | `%Lf` |
| `char` | `%c` |
| `sizeof` 结果 | `%zu` |

### 后缀规则

| 类型 | 后缀 | 例子 |
| --- | --- | --- |
| `long` | `L` | `long a = 1000L;` |
| `long long` | `LL` | `long long b = 10000LL;` |

### Windows 常见字节大小

| 类型 | Windows 常见大小 | 备注 |
| --- | --- | --- |
| `char` | 1 字节 | 字符类型 |
| `short` | 2 字节 | 短整型 |
| `int` | 4 字节 | 整数默认类型 |
| `long` | 4 字节 | Windows 下 32 位和 64 位通常都是 4 字节 |
| `long long` | 8 字节 | C99 才有 |
| `float` | 4 字节 | 单精度小数 |
| `double` | 8 字节 | 小数默认类型 |
| `long double` | Windows 常见 8 字节 | 其他系统可能是 12 或 16 字节 |

这些大小不是所有环境都固定。不同操作系统、不同编译器可能不同。最准确的方式永远是 `sizeof`。

### 取值范围关系

课程中给出的常见取值范围关系：

```
double > float > long long > long > int > short
```

小数的取值范围通常比整数大，因为小数底层类似科学计数法存储。但范围大不代表完全精确，小数可能存在精度误差。

### 默认类型

整数默认类型

`int`

小数默认类型

`double`

字符类型

`char`

### unsigned 规则

| 规则 | 说明 |
| --- | --- |
| `signed` | 有符号，可以表示正数、负数和 0 |
| `unsigned` | 无符号，只能表示 0 和正数 |
| 整数默认 | 默认是 `signed` |
| 无符号打印 | 使用 `%u` |
| 组合限制 | `unsigned` 只能和整数类型组合，不能和小数类型组合 |

复习时优先记这句话：整数默认 `int`，小数默认 `double`，字符用 `char`，大小用 `sizeof` 测。

## 9. 完整练习代码

这份代码覆盖这几节课的核心知识点，适合复习时直接运行。

```
#include <stdio.h>

int main()
{
short a = 10;
int b = 100;
long c = 1000L;
long long d = 10000LL;

printf("short a = %d
", a);
printf("int b = %d
", b);
printf("long c = %ld
", c);
printf("long long d = %lld
", d);

printf("sizeof(short) = %zu
", sizeof(short));
printf("sizeof(int) = %zu
", sizeof(int));
printf("sizeof(long) = %zu
", sizeof(long));
printf("sizeof(long long) = %zu
", sizeof(long long));

short int e = 20;
long int f = 2000L;
long long int g = 30000LL;

printf("short int e = %d
", e);
printf("long int f = %ld
", f);
printf("long long int g = %lld
", g);

// 错误写法：int 后面不能再加 int

signed int h = -100;
unsigned int i = 999;
unsigned short j = 65535;

printf("signed int h = %d
", h);
printf("unsigned int i = %u
", i);
printf("unsigned short j = %u
", j);

float k = 3.14F;
double l = 1.78;
long double m = 3.141592653589793238L;

printf("float k = %f
", k);
printf("float k 保留两位 = %.2f
", k);

printf("double l = %f
", l);
printf("double l 保留两位 = %.2f
", l);

printf("long double m = %Lf
", m);
printf("long double m 保留两位 = %.2Lf
", m);

printf("sizeof(float) = %zu
", sizeof(float));
printf("sizeof(double) = %zu
", sizeof(double));
printf("sizeof(long double) = %zu
", sizeof(long double));

char n1 = 'a';
char n2 = '1';
char n3 = 'A';
char n4 = '.';

printf("char n1 = %c
", n1);
printf("char n2 = %c
", n2);
printf("char n3 = %c
", n3);
printf("char n4 = %c
", n4);

printf("sizeof(char) = %zu
", sizeof(char));
printf("sizeof(n1) = %zu
", sizeof(n1));

// 九、错误示例：unsigned 不能和小数类型组合
// unsigned double wrong1 = 3.14; // 错误
// unsigned float wrong2 = 3.14F; // 错误

return 0;
}
```

这段代码重点看三类内容：变量怎么定义、`printf` 怎么打印、`sizeof` 怎么测大小。

## 10. 易错点集中复习

### 1. 字符和字符串不要混淆

正确：字符

`char c = 'A';`

单引号，表示一个字符。

错误：字符串

`char c = "A";`

双引号表示字符串，不是本节的字符类型。

### 2. 字符数字和整数数字不同

```
char c = '1';
int n = 1;
```

它们显示出来可能都像 1，但类型不同。

### 3. 不要直接用普通 char 保存中文

不推荐：`char c = '你';`。普通 `char` 通常只有 1 字节，中文字符通常不止 1 字节，可能输出问号或乱码。

### 4. 不要把 unsigned 和小数混用

错误

`unsigned double a = 3.14;`

`unsigned float b = 3.14F;`

正确

`double a = 3.14;`

`float b = 3.14F;`

### 5. 不要忘记常见后缀

```
long a = 1000L;
long long b = 10000LL;
float c = 3.14F;
long double d = 3.14L;
```

### 6. 不要超出类型范围

常见 Windows 环境下：

```
short a = 32768; // 可能出错，因为 short 常见最大值是 32767
int b = 2147483648; // 可能出错，因为超过 int 常见最大值
```

具体原因后面会通过整数溢出、二进制、补码继续解释。

### 7. 不要死背所有类型大小

类型大小会受操作系统、编译器、平台位数影响。复习时记常见情况即可，真正准确的结果用 `sizeof` 测。

### 8. 代码报错时怎么排查

| 问题表现 | 优先检查 |
| --- | --- |
| 类型说明符组合无效 | 是不是写了 `unsigned double`、`unsigned float` 这类错误组合 |
| 打印结果奇怪 | 格式符是否匹配，例如 `long` 是否用了 `%ld` |
| 数值变成异常结果 | 是否超出了类型的取值范围 |
| 小数输出很多 0 | `%f` 默认保留 6 位小数，可以用 `%.2f` 控制 |
| 中文字符输出问号 | 是否误用普通 `char` 保存中文 |

复习目标不是一次性背完所有细节，而是写代码时知道：类型怎么选、格式符怎么写、大小怎么测、报错怎么改。

## 11. 最终记忆版

数据类型两个作用

决定能存什么；决定占多大内存。

默认选择

整数用 `int`，小数用 `double`。

测大小

`sizeof(类型)` 或 `sizeof(变量)`，打印用 `%zu`。

后缀

`long` 加 `L`，`long long` 加 `LL`，`float` 加 `F`。

限制

`unsigned` 只能修饰整数，不能修饰小数。

字符

`char` 存单个字符，用单引号，打印用 `%c`。

### 一句话复习

C语言数据类型分为整数、小数、字符；整数默认 `int`，小数默认 `double`，字符用 `char`；不同类型大小不同，用 `sizeof` 测；打印时格式符必须匹配。

  function exportPDF() { window.print(); }
