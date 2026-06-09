# C语言循环与循环算法复习笔记

> 分类: C语言 / HTML讲义
> 来源: c/for循环.html
> 提取说明: 从 HTML body 提取可见内容，保留标题、列表、表格和代码块。

# C语言循环与循环算法复习笔记

覆盖：while、for 与 while 区别、循环算法题、do...while。重点突出，适合复习和导出 PDF。

复习建议：先看蓝色概念，再看红色重点，最后看代码。

一键导出 PDF

## 目录

1. while 循环 2. for 和 while 的区别 3. 判断 2 的幂 4. 折纸问题 5. 整数反转 6. 平方根整数部分 7. 回文数 8. 两数相除 9. do...while 10. 知识点检查

## 1. while 循环

while 循环的作用：当条件成立时，重复执行一段代码；条件不成立时，循环结束。

### 基本格式

```
初始化语句;

while (条件判断语句)
{
循环体语句;
条件控制语句;
}
```

其中，初始化语句写在 `while` 外面；条件判断语句写在小括号里；循环体和条件控制语句写在大括号里。

### 执行流程

先执行初始化语句，然后判断条件。如果条件成立，就执行循环体和条件控制语句。执行完一次后，再回到条件判断处继续判断。直到条件不成立，循环结束。

重点：`while` 小括号里写的是“继续循环的条件”，不是“结束条件”。

### 示例：打印 3 次内容

```
#include <stdio.h>

int main()
{
int i = 1;

while (i <= 3)
{
printf("IV GG\n");
i++;
}

return 0;
}
```

注意：如果忘记 `i++`，`i` 永远是 1，条件一直成立，会造成死循环。

本节重点：while = 初始化在外，条件在小括号，循环体和条件控制在大括号；条件成立就继续，条件不成立才结束。

## 2. for 和 while 的区别

共同点：for 和 while 都是循环结构，运行规则本质一样：初始化 → 判断条件 → 执行循环体 → 条件控制 → 再判断。

### 语法层面的小区别：变量作用范围

如果变量定义在 `for` 小括号里，循环结束后不能继续使用。

```
for (int i = 1; i <= 3; i++)
{
printf("%d\n", i);
}

// 这里不能继续使用 i
```

而 `while` 通常把变量定义在循环外面，所以循环结束后变量还可以继续用。

```
int i = 1;

while (i <= 3)
{
printf("%d\n", i);
i++;
}

printf("%d\n", i);
```

不要死记：变量能不能继续用，关键不是 for 或 while，而是变量定义在哪里。for 也可以把变量定义在外面。

### 真正重要的区别：使用习惯

| 情况 | 推荐循环 | 原因 |
| --- | --- | --- |
| 知道循环次数或范围 | for | 开始、结束、变化规律集中在一行，清晰 |
| 不知道循环次数，只知道结束条件 | while | while 小括号只关注条件，更适合不确定次数 |

本节重点：知道次数或范围，用 for；不知道次数，只知道结束条件，用 while。

## 3. 循环算法题：判断一个数是不是 2 的幂

题目：给一个整数 n，判断它是否是 2 的幂。例如 1、2、4、8、16、32 都是 2 的幂。

### 核心规律

如果一个数是 2 的幂，那么它不断除以 2，最终一定会得到 1。

```
128 / 2 = 64
64 / 2 = 32
...
2 / 2 = 1
```

### 代码

```
#include <stdio.h>

int main()
{
int n;

printf("请输入一个整数：");
scanf("%d", &n);

if (n <= 0)
{
printf("no\n");
return 0;
}

while (n > 1 && n % 2 == 0)
{
n = n / 2;
}

if (n == 1)
{
printf("yes\n");
}
else
{
printf("no\n");
}

return 0;
}
```

核心条件：`while (n > 1 && n % 2 == 0)`，表示 n 还没到 1，并且还能被 2 整除，就继续除。

## 4. 循环算法题：折纸问题

题目：珠穆朗玛峰高度约 8844430 毫米，纸张厚度 0.1 毫米。问折叠多少次后，纸张厚度超过珠峰高度。

### 代码

```
#include <stdio.h>

int main()
{
double height = 8844430.0;
double paper = 0.1;
int count = 0;

while (paper <= height)
{
paper = paper * 2;
count++;
}

printf("需要折叠 %d 次\n", count);
printf("最终纸张厚度：%lf 毫米\n", paper);

return 0;
}
```

## 5. 循环算法题：整数反转

题目：把一个整数反转。例如 123 反转成 321。

取个位：
`temp = number % 10;`

去掉个位：
`number = number / 10;`

### 代码

```
#include <stdio.h>

int main()
{
int number = 123;
int rev = 0;

while (number != 0)
{
int temp = number % 10;
number = number / 10;
rev = rev * 10 + temp;
}

printf("%d\n", rev);

return 0;
}
```

## 6. 循环算法题：平方根整数部分

题目：给一个非负整数 x，返回它的算术平方根，只保留整数部分，小数部分不要。

### 代码（防溢出安全版）

```
#include <stdio.h>

int main()
{
int number;
// 使用 long long 防止当 number 很大时，i * i 导致 int 越界溢出
long long i = 1;

printf("请输入一个非负整数：");
scanf("%d", &number);

while (i * i <= number)
{
i++;
}

printf("平方根的整数部分是：%d\n", (int)(i - 1));

return 0;
}
```

进阶注意：原版 `int i` 遇上很大的数时，`i * i` 会超出整型上限导致死循环，所以此版本更替为 `long long i`，写代码时要时刻留意边界值。

## 7. 循环算法题：回文数

题目：判断一个整数是否是回文数。回文数就是正着读和倒着读都一样的数。

### 代码

```
#include <stdio.h>

int main()
{
int number = 121;
int old = number;
int rev = 0;

while (number != 0)
{
int temp = number % 10;
number = number / 10;
rev = rev * 10 + temp;
}

if (old == rev)
{
printf("yes\n");
}
else
{
printf("no\n");
}

return 0;
}
```

## 8. 循环算法题：不用乘除取余实现两数相除

题目：给两个整数，被除数和除数，不能使用乘法、除法、取余，只能用加法和减法，求商和余数。

### 代码

```
#include <stdio.h>

int main()
{
int dividend = 11;
int divisor = 3;
int quotient = 0;

if (divisor == 0)
{
printf("除数不能为0\n");
return 0;
}

while (dividend >= divisor)
{
dividend = dividend - divisor;
quotient++;
}

printf("商：%d\n", quotient);
printf("余数：%d\n", dividend);

return 0;
}
```

## 9. do...while 循环

do...while：C 语言中的一种循环结构。实际开发中用得较少，但考试中会出现，尤其是选择题。

### 基本格式

```
初始化语句;

do
{
循环体语句;
条件控制语句;
} while (条件判断语句);
```

最大特点：do...while 是先执行，再判断，所以循环体至少执行一次。

### 证明至少执行一次

```
#include <stdio.h>

int main()
{
int i = 10;

do
{
printf("%d\n", i);
i++;
} while (i <= 5);

return 0;
}
```

虽然 `10 <= 5` 一开始就不成立，但程序仍然会输出 `10`。

考试重点：看到 do...while，第一反应就是“先执行一次，再判断”。另外，最后的 `while (...);` 后面必须有分号。

## 10. 知识点遗漏检查

最终复习口诀：
次数明确用 for，条件明确用 while；do...while 先执行再判断。
取个位用 %10，去个位用 /10，拼接数字用 rev * 10 + temp。
算法题先找规律，再写循环条件，最后处理结果。
