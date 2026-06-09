# C语言指针高级复习系统：二维数组、数组指针、函数指针

> 分类: C语言 / HTML讲义
> 来源: c/指针高级2.html
> 提取说明: 从 HTML body 提取可见内容，保留标题、列表、表格和代码块。

# C语言指针高级复习系统

覆盖课程：二维数组两种定义格式、索引遍历、指针遍历、数组指针与指针数组、函数指针、函数指针数组练习。 本页不是普通笔记，而是按“理解结构 → 掌握写法 → 避开易错点 → 自测巩固”的方式整理。

二维数组 数组指针 指针数组 函数指针 易错点集中突破

使用方法：先看总纲，再展开每个模块；练习题默认隐藏答案，适合自测；导出 PDF 前会自动展开全部内容和答案。

全部展开

全部收起

只看重点

显示答案

隐藏答案

导出 PDF

总纲 二维数组格式一 二维数组格式二 指针遍历格式一 指针遍历格式二 数组指针与指针数组 函数指针 函数指针数组 演练中心 实战策略 检查清单

## 总纲：这几节课到底在讲什么

核心逻辑： 这几节课都围绕一个问题：不同数据结构在内存里到底存的是什么？只要看清“里面装的是数据、数组整体、还是地址”，指针类型就能推出来。

### 二维数组格式一

`int arr[3][5]`

真正的二维数组，数据连续，每一行长度固定。

### 二维数组格式二

`int *arr[3]`

本质是指针数组，里面存多个一维数组地址。

### 函数指针数组

`int (*arr[4])(int, int)`

数组里存函数地址，用下标动态调用函数。

必须掌握： 判断一个复杂指针声明时，先问：“变量名先和谁结合？”再问：“它里面存的元素是什么类型？”

本章最重要的四组对比

| 对比项 | 写法 | 本质 | 重点 |
| --- | --- | --- | --- |
| 规则二维数组 | `int arr[3][5]` | 二维数组 | 每行长度固定，连续存储 |
| 不规则二维结构 | `int *arr[3]` | 指针数组 | 每行可不同长，但要额外保存长度 |
| 数组指针 | `int (*p)[5]` | 指针 | 指向一个长度为 5 的数组 |
| 指针数组 | `int *p[5]` | 数组 | 数组里每个元素都是指针 |

## 模块 1：二维数组第一种格式与索引遍历

一句话规则： `int arr[m][n]` 表示有 `m` 个一维数组，每个一维数组有 `n` 个元素。

第一种二维数组定义方式：

```
int arr[3][5] = {
{1, 2, 3, 4, 5},
{11, 22, 33, 44, 55},
{111, 222, 333, 444, 555}
};
```

### `3` 的含义

二维数组中有 3 个一维数组，也可以理解为 3 行。

### `5` 的含义

每个一维数组里有 5 个元素，也可以理解为每行 5 列。

易错提醒： `arr[0]` 不是第一个整数，而是第一个一维数组整体；`arr[0][0]` 才是第 0 行第 0 列的整数。

用索引遍历第一种格式

```
#include <stdio.h>

int main() {
int arr[3][5] = {
{1, 2, 3, 4, 5},
{11, 22, 33, 44, 55},
{111, 222, 333, 444, 555}
};

for (int i = 0; i < 3; i++) {
for (int j = 0; j < 5; j++) {
printf("%d ", arr[i][j]);
}
printf("\n");
}

return 0;
}
```

**本模块记忆点：**二维数组索引遍历用双层循环，外层控制行，内层控制列。

## 模块 2：二维数组第二种格式与索引遍历

一句话规则： 第二种格式先定义多个一维数组，再用 `int *arr[3]` 保存这些一维数组的地址。

这种写法适合每个一维数组长度不一样的情况：

```
int arr1[3] = {1, 2, 3};
int arr2[5] = {1, 2, 3, 4, 5};
int arr3[9] = {1, 2, 3, 4, 5, 6, 7, 8, 9};

int *arr[3] = {arr1, arr2, arr3};
```

理解： `arr` 不是传统二维数组，而是指针数组。它里面存的是 `arr1`、`arr2`、`arr3` 的首地址。

关键坑： 不能用 `sizeof(arr[i]) / sizeof(int)` 求每个一维数组长度，因为 `arr[i]` 是指针，不是数组整体。

错误长度计算为什么会出问题

在 64 位系统中，指针通常占 8 字节，`int` 通常占 4 字节。

```
sizeof(arr[i]) / sizeof(int)
```

得到的往往是：

```
8 / 4 = 2
```

所以程序会误以为每个一维数组长度都是 2。

正确做法：提前保存每个数组长度

```
#include <stdio.h>

int main() {
int arr1[3] = {1, 2, 3};
int arr2[5] = {1, 2, 3, 4, 5};
int arr3[9] = {1, 2, 3, 4, 5, 6, 7, 8, 9};

int len1 = sizeof(arr1) / sizeof(arr1[0]);
int len2 = sizeof(arr2) / sizeof(arr2[0]);
int len3 = sizeof(arr3) / sizeof(arr3[0]);

int lenArr[3] = {len1, len2, len3};
int *arr[3] = {arr1, arr2, arr3};

for (int i = 0; i < 3; i++) {
for (int j = 0; j < lenArr[i]; j++) {
printf("%d ", arr[i][j]);
}
printf("\n");
}

return 0;
}
```

**本模块记忆点：**`int *arr[3]` 只保存地址，不保存每个数组的长度；长度要额外保存。

## 模块 3：用指针遍历第一种格式二维数组

一句话规则： 对于 `int arr[3][5]`，`arr` 退化后指向的是“一行”，所以指针类型是 `int (*p)[5]`。

正确指针定义：

```
int (*p)[5] = arr;
```

### `p`

指向当前一行，也就是一个长度为 5 的 `int` 数组。

### `*p`

得到当前这一行。

### `*(*p + j)`

得到当前行第 `j` 个元素的值。

必须掌握： `p + 1` 会跳过一整行。若一行有 5 个 `int`，一个 `int` 占 4 字节，则移动 20 字节。

完整代码：用数组指针遍历二维数组

```
#include <stdio.h>

int main() {
int arr[3][5] = {
{1, 2, 3, 4, 5},
{11, 22, 33, 44, 55},
{111, 222, 333, 444, 555}
};

int (*p)[5] = arr;

for (int i = 0; i < 3; i++) {
for (int j = 0; j < 5; j++) {
printf("%d ", *(*p + j));
}
printf("\n");
p++;
}

return 0;
}
```

等价写法： `*(*p + j)` 可以写成 `(*p)[j]`，后者更容易读。

易错提醒： 如果内层循环结束后忘记 `p++`，程序会一直打印第一行。

**本模块记忆点：**`int (*p)[5]` 是数组指针，`p++` 移动到下一行。

## 模块 4：用指针遍历第二种格式二维数组

一句话规则： 第二种格式 `int *arr[3]` 里面存的是 `int *`，所以获取它的指针要写 `int **p = arr;`。

```
int arr1[5] = {1, 2, 3, 4, 5};
int arr2[5] = {11, 22, 33, 44, 55};
int arr3[5] = {111, 222, 333, 444, 555};

int *arr[3] = {arr1, arr2, arr3};
int **p = arr;
```

### `p`

指向 `arr` 指针数组中的某个元素。

### `*p`

得到某个一维数组的首地址。

### `*(*p + j)`

得到当前一维数组第 `j` 个元素。

完整代码：用二级指针遍历指针数组

```
#include <stdio.h>

int main() {
int arr1[5] = {1, 2, 3, 4, 5};
int arr2[5] = {11, 22, 33, 44, 55};
int arr3[5] = {111, 222, 333, 444, 555};

int *arr[3] = {arr1, arr2, arr3};
int **p = arr;

for (int i = 0; i < 3; i++) {
for (int j = 0; j < 5; j++) {
printf("%d ", *(*p + j));
}
printf("\n");
p++;
}

return 0;
}
```

和第一种格式区别： 第一种的 `p++` 是跳到下一整行；第二种的 `p++` 是移动到指针数组的下一个地址元素。

**本模块记忆点：**`int *arr[3]` 搭配 `int **p`；访问元素用 `*(*p + j)` 或 `(*p)[j]`。

## 模块 5：数组指针和指针数组

一句话规则： 数组指针本质是指针；指针数组本质是数组。关键看变量名先和谁结合。

| 概念 | 写法 | 本质 | 含义 |
| --- | --- | --- | --- |
| 数组指针 | `int (*p)[5]` | 指针 | `p` 指向一个长度为 5 的 `int` 数组 |
| 指针数组 | `int *p[5]` | 数组 | `p` 是数组，数组里有 5 个 `int *` |

关键禁忌： `int (*p)[5]` 的小括号不能省。省掉就变成 `int *p[5]`，含义完全不同。

`arr` 和 `&arr` 的区别

```
int arr[5] = {1, 2, 3, 4, 5};
```

`arr` 通常表示第一个元素的地址，类型可理解为 `int *`，所以 `arr + 1` 跳过一个 `int`。

`&arr` 表示整个数组的地址，类型是 `int (*)[5]`，所以 `&arr + 1` 跳过整个数组。

**本模块记忆点：**`int (*p)[5]` 是数组指针；`int *p[5]` 是指针数组。

## 模块 6：函数指针

一句话规则： 函数指针就是指向函数的指针，可以通过指针调用函数。

函数指针格式：

```
返回值类型 (*指针名)(参数列表);
```

不要死背： 先写函数声明，再把函数名替换成 `(*指针名)`。

无参无返回值函数指针

```
#include <stdio.h>

void method1();

int main() {
void (*p1)() = method1;
p1();

return 0;
}

void method1() {
printf("method1\n");
}
```

有参有返回值函数指针

```
#include <stdio.h>

int method2(int number1, int number2);

int main() {
int (*p2)(int, int) = method2;

int num = p2(10, 20);
printf("%d\n", num);

return 0;
}

int method2(int number1, int number2) {
printf("method2\n");
return number1 + number2;
}
```

必须掌握： 函数指针的返回值类型和参数列表，必须和它指向的函数一致。

**本模块记忆点：**`int (*p)(int, int) = method2;`，然后可以用 `p(10, 20)` 调用函数。

## 模块 7：函数指针数组练习

一句话规则： 函数指针数组就是存放函数指针的数组，可以用数组下标动态选择要调用的函数。

题目需求：定义加、减、乘、除四个函数，用户输入两个参与计算的数字，再输入一个选择编号：

### 选择编号

`1` 加法，`2` 减法，`3` 乘法，`4` 除法。

### 核心调用

`arr[choose - 1](number1, number2)`

为什么不用一堆 if： 函数少时 `if-else` 可以，函数很多时会非常臃肿。函数指针数组能把“选择函数”变成“按下标取函数”。

完整代码：函数指针数组实现四则运算

```
#include <stdio.h>

int add(int number1, int number2);
int subtract(int number1, int number2);
int multiply(int number1, int number2);
int divide(int number1, int number2);

int main() {
int (*arr[4])(int, int) = {add, subtract, multiply, divide};

int number1;
int number2;
int choose;

printf("请录入两个数字，参与计算：\n");
scanf("%d %d", &number1, &number2);

printf("请录入一个数字，表示要进行的计算：\n");
printf("1. 加法 2. 减法 3. 乘法 4. 除法\n");
scanf("%d", &choose);

if (choose < 1 || choose > 4) {
printf("没有这个操作。\n");
return 0;
}

if (choose == 4 && number2 == 0) {
printf("除数不能为 0。\n");
return 0;
}

int result = arr[choose - 1](number1, number2);
printf("结果是：%d\n", result);

return 0;
}

int add(int number1, int number2) {
return number1 + number2;
}

int subtract(int number1, int number2) {
return number1 - number2;
}

int multiply(int number1, int number2) {
return number1 * number2;
}

int divide(int number1, int number2) {
return number1 / number2;
}
```

必须掌握： 只有形参完全相同、返回值也相同的函数，才能放到同一个函数指针数组里。

**本模块记忆点：**`int (*arr[4])(int, int)` 表示数组里有 4 个函数指针。

## 练习 / 案例演练中心

练习 1：判断 `arr[0]` 的含义

已知：

```
int arr[3][5] = {
{1, 2, 3, 4, 5},
{11, 22, 33, 44, 55},
{111, 222, 333, 444, 555}
};
```

`arr[0]` 和 `arr[0][0]` 分别表示什么？

点击查看答案解析

**答案：**`arr[0]` 表示第一个一维数组整体；`arr[0][0]` 表示第 0 行第 0 列的元素，也就是 `1`。

**解析：**二维数组可以理解为数组里面放数组。第一个下标先找到某一行，第二个下标才找到该行中的具体元素。

练习 2：为什么 `sizeof(arr[i]) / sizeof(int)` 错

已知：

```
int arr1[3] = {1, 2, 3};
int arr2[5] = {1, 2, 3, 4, 5};
int *arr[2] = {arr1, arr2};
```

为什么不能用 `sizeof(arr[i]) / sizeof(int)` 求当前一维数组长度？

点击查看答案解析

**答案：**因为 `arr[i]` 是 `int *` 指针，不是完整数组。

**解析：**`sizeof(arr[i])` 求的是指针大小。64 位系统下指针通常是 8 字节，`int` 通常是 4 字节，所以结果常常是 `2`，而不是真实数组长度。

练习 3：选择正确的数组指针写法

要定义一个指针 `p`，指向 `int arr[3][5]` 的某一行，应该怎么写？

A. `int *p[5] = arr;`

B. `int (*p)[5] = arr;`

C. `int **p = arr;`

D. `int *p = arr;`

点击查看答案解析

**答案：**B

**解析：**`arr` 退化后指向第一行，而一行的类型是 `int[5]`，所以指针类型是 `int (*)[5]`。

练习 4：区分数组指针和指针数组

请判断下面两个声明分别是什么：

```
int (*p1)[5];
int *p2[5];
```

点击查看答案解析

**答案：**`p1` 是数组指针；`p2` 是指针数组。

**解析：**`int (*p1)[5]` 中，`p1` 先和 `*` 结合，所以它是指针；`int *p2[5]` 中，`p2` 先和 `[5]` 结合，所以它是数组。

练习 5：函数指针写法

有函数声明：

```
int method2(int number1, int number2);
```

定义一个函数指针 `p2` 指向它，应该怎么写？

点击查看答案解析

**答案：**`int (*p2)(int, int) = method2;`

**解析：**把函数声明中的函数名 `method2` 替换成 `(*p2)`，参数列表保留类型即可。

练习 6：函数指针数组调用

已知：

```
int (*arr[4])(int, int) = {add, subtract, multiply, divide};

int number1 = 10;
int number2 = 3;
int choose = 3;
```

调用对应函数并保存结果，应该怎么写？调用的是哪个函数？

点击查看答案解析

**答案：**`int result = arr[choose - 1](number1, number2);`，调用的是 `multiply`。

**解析：**`choose = 3`，所以 `choose - 1 = 2`，`arr[2]` 对应 `multiply`。

## 考场攻略 / 应用方法

### 1. 看二维数组格式

`int arr[3][5]` 是规则二维数组；`int *arr[3]` 是指针数组。

### 2. 推指针类型

数组里面放什么，指针就要指向什么。二维数组格式一里面放的是一行，所以是 `int (*)[5]`。

### 3. 遍历时看 p++

格式一的 `p++` 跳到下一行；格式二的 `p++` 跳到下一个地址元素。

### 4. 函数指针数组

看到“根据编号调用不同函数”，优先想到函数指针数组。

高频错误： 把 `int (*p)[5]` 写成 `int *p[5]`；用 `sizeof(arr[i])` 求指针数组中每行长度；函数指针数组忘记 `choose - 1`。

## 最终检查清单

### 二维数组

[ ] 我知道 `int arr[3][5]` 表示 3 行 5 列。

[ ] 我知道 `arr[i]` 表示第 `i` 行，`arr[i][j]` 才是具体元素。

[ ] 我知道 `int *arr[3]` 本质是指针数组，不是严格意义上的二维数组。

[ ] 我知道不规则二维结构需要额外保存每行长度。

### 数组指针与指针数组

[ ] 我能解释 `int (*p)[5]` 是数组指针。

[ ] 我能解释 `int *p[5]` 是指针数组。

[ ] 我知道 `arr` 和 `&arr` 地址值可能一样，但类型和步长不同。

[ ] 我知道小括号不能乱省。

### 指针遍历

[ ] 我能写出 `int (*p)[5] = arr;` 遍历规则二维数组。

[ ] 我能写出 `int **p = arr;` 遍历指针数组。

[ ] 我知道 `*(*p + j)` 和 `(*p)[j]` 等价。

[ ] 我知道每遍历完一行后要移动 `p++`。

### 函数指针

[ ] 我知道函数指针格式是 `返回值类型 (*指针名)(参数列表)`。

[ ] 我能把函数声明改写成函数指针声明。

[ ] 我能写出 `int (*p)(int, int)`。

[ ] 我知道函数指针可以像函数名一样调用。

### 函数指针数组

[ ] 我能写出 `int (*arr[4])(int, int)`。

[ ] 我知道同一个函数指针数组里的函数必须类型一致。

[ ] 我知道用户输入 1 到 4 时，调用要写 `arr[choose - 1]`。

[ ] 我知道除法要判断除数不能为 0。

**资料主题：**C语言指针高级复习系统

**覆盖范围：**二维数组两种定义格式、索引遍历、指针遍历、数组指针、指针数组、函数指针、函数指针数组练习

**最后更新时间：**2026-05-06

  function expandAll() { document.querySelectorAll("details").forEach(function(detail) { detail.open = true; }); } function collapseAll() { document.querySelectorAll("details").forEach(function(detail) { detail.open = false; }); } function showAnswers() { document.querySelectorAll("details.answer-toggle").forEach(function(detail) { detail.open = true; }); } function hideAnswers() { document.querySelectorAll("details.answer-toggle").forEach(function(detail) { detail.open = false; }); } function toggleFocusMode() { document.body.classList.toggle("focus-mode"); var btn = document.getElementById("focusBtn"); if (document.body.classList.contains("focus-mode")) { btn.textContent = "显示全部"; } else { btn.textContent = "只看重点"; } } function printPage() { expandAll(); showAnswers(); setTimeout(function() { window.print(); }, 120); }
