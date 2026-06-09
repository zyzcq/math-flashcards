# C语言数组与常见算法复习笔记

> 分类: C语言 / HTML讲义
> 来源: c/数组2.html
> 提取说明: 从 HTML body 提取可见内容，保留标题、列表、表格和代码块。

C语言数组与常见算法复习笔记

一键导出 PDF

# C语言数组与常见算法复习笔记

使用方法打开本 HTML 文件后，点击右上角“一键导出 PDF”，在打印窗口中选择“另存为 PDF”。

复习目标掌握数组内存、数组遍历、求最值、求和、反转、打乱、顺序查找、二分查找、插值查找。

1. 数组在内存中的理解 2. 数组求最值 3. 数组求和基础版 4. 数组求和升级版 5. 反转数组 6. 打乱数组 7. 基本查找 8. 二分查找 9. 插值查找 10. 遗漏检查清单

## 1. 数组在内存中的理解

数组在内存中是**连续存储**的。比如：

```
int arr[] = {1, 2, 3};
```

如果一个 `int` 占 4 个字节，那么这个数组有 3 个元素，总共占用 12 个字节。

核心理解数组访问元素，本质是：

```
元素地址 = 数组首地址 + 索引 × 单个元素占用字节数
```

`arr[0]` 表示从首地址偏移 0 个元素，`arr[1]` 表示偏移 1 个元素，`arr[2]` 表示偏移 2 个元素。

易错点索引不是直接表示字节数，而是表示偏移几个“元素单位”。

如果是 `int` 数组，偏移 1 个单位通常是 4 字节；如果是 `char` 数组，偏移 1 个单位就是 1 字节。

观察数组地址：

```
#include <stdio.h>

int main()
{
int arr[] = {1, 2, 3};

printf("&arr = %p\n", (void *)&arr);
printf("&arr[0] = %p\n", (void *)&arr[0]);
printf("&arr[1] = %p\n", (void *)&arr[1]);
printf("&arr[2] = %p\n", (void *)&arr[2]);

return 0;
}
```

`&arr` 和 `&arr[0]` 打印出来的地址值可能一样，但含义和类型不同，后面学指针会更深入。

本节重点：

- 内存是程序运行时临时存储数据的地方。
- 内存地址是每个字节空间的编号。
- 地址本质是二进制，通常显示成十六进制。
- `&` 是取地址运算符。
- 只知道首地址不够，还必须知道数据类型，才能确定读取几个字节。
- 数组长度可以用 `sizeof(arr) / sizeof(arr[0])` 计算。

## 2. 数组求最值

求最大值的思想：先假设第一个元素最大，然后遍历后面的元素。如果发现更大的，就更新 `max`。

```
#include <stdio.h>

int main()
{
int arr[] = {33, 5, 22, 44, 55};
int len = sizeof(arr) / sizeof(arr[0]);

int max = arr[0];

for (int i = 1; i < len; i++)
{
if (arr[i] > max)
{
max = arr[i];
}
}

printf("最大值是：%d\n", max);

return 0;
}
```

不能遗漏`max` 的初始值不要随便写成 0。

如果数组全是负数，例如 `{-33, -5, -22}`，那么 `max = 0` 会导致结果错误。正确做法是让 `max` 来自数组中已有的数据，通常写 `arr[0]`。

循环为什么从 1 开始因为 `arr[0]` 已经被当成临时最大值了，没有必要自己和自己比较。

求最小值只需要把判断条件反过来：

```
int min = arr[0];

for (int i = 1; i < len; i++)
{
if (arr[i] < min)
{
min = arr[i];
}
}
```

本节重点：

- 求最大值用 `max` 保存当前最大值。
- 求最小值用 `min` 保存当前最小值。
- `max` 和 `min` 的初始值都应该来自数组本身。
- 如果初始值是 `arr[0]`，循环可以从 `i = 1` 开始。

## 3. 数组求和基础版

题目要求：生成 10 个 1 到 100 之间的随机数，存入数组，然后求所有数据的和。

解题流程：

- 定义长度为 10 的数组。
- 设置随机数种子。
- 生成随机数并存入数组。
- 遍历数组求和。

```
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main()
{
int arr[10] = {0};
int len = sizeof(arr) / sizeof(arr[0]);

srand((unsigned int)time(NULL));

for (int i = 0; i < len; i++)
{
int num = rand() % 100 + 1;
arr[i] = num;
}

printf("数组中的随机数是：\n");
for (int i = 0; i < len; i++)
{
printf("%d\n", arr[i]);
}

int sum = 0;
for (int i = 0; i < len; i++)
{
sum += arr[i];
}

printf("数组所有数据的和是：%d\n", sum);

return 0;
}
```

随机数范围

```
rand() % 100 + 1
```

表示生成 1 到 100 之间的随机数。`rand() % 100` 的范围是 0 到 99，再加 1 就变成 1 到 100。

初学建议一个循环尽量只做一件事。

可以把“生成随机数”“打印数组”“求和”拆成三个循环，这样更容易排错。虽然可以合并，但初学阶段不建议一开始就合并。

本节重点：

- `int arr[10] = {0};` 表示定义 10 个元素并初始化为 0。
- `srand((unsigned int)time(NULL));` 用当前时间设置随机数种子。
- `sum += arr[i];` 等价于 `sum = sum + arr[i];`
- 数组负责批量存数据，循环负责批量处理数据。

## 4. 数组求和升级版

升级要求：

- 生成 10 个 1 到 100 之间的随机数。
- 随机数不能重复。
- 求和。
- 求平均数。
- 统计有多少个数据比平均数小。

核心难点生成不重复随机数。

思路：每生成一个随机数，先判断它是否已经存在。如果不存在，才存入数组；如果存在，就重新生成，当前索引不前进。

```
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int contains(int arr[], int len, int num);

int main()
{
int arr[10] = {0};
int len = sizeof(arr) / sizeof(arr[0]);

srand((unsigned int)time(NULL));

int i = 0;
while (i < len)
{
int num = rand() % 100 + 1;

if (!contains(arr, len, num))
{
arr[i] = num;
i++;
}
}

printf("数组中的数据是：\n");
for (int i = 0; i < len; i++)
{
printf("%d\n", arr[i]);
}

int sum = 0;
for (int i = 0; i < len; i++)
{
sum += arr[i];
}

int avg = sum / len;

int count = 0;
for (int i = 0; i < len; i++)
{
if (arr[i] < avg)
{
count++;
}
}

printf("总和为：%d\n", sum);
printf("平均数为：%d\n", avg);
printf("比平均数小的数据有：%d 个\n", count);

return 0;
}

int contains(int arr[], int len, int num)
{
for (int i = 0; i < len; i++)
{
if (arr[i] == num)
{
return 1;
}
}

return 0;
}
```

关键易错点只有成功存入数组后，`i` 才能加 1。

如果把 `i++` 固定写在 `for` 循环第三部分，即使生成了重复数字，索引也会前进，导致数组位置可能留下默认值 0。

本节重点：

- `contains` 函数用于判断数字是否已经存在。
- 返回 `1` 表示存在，返回 `0` 表示不存在。
- `if (!contains(...))` 表示“不存在才添加”。
- `avg = sum / len` 如果是整数运算，小数部分会被舍掉。
- `count++` 用来统计符合条件的数据个数。
- 调试重复问题时，可以临时把随机范围改小，例如 `rand() % 10 + 1`。

## 5. 反转数组

题目要求：键盘录入 5 个数据，放入数组，然后遍历、反转、再遍历。

核心思想双指针。

`i` 指向数组最左边，`j` 指向数组最右边。每次交换 `arr[i]` 和 `arr[j]`，然后 `i++`、`j--`，直到两者相遇或交叉。

```
#include <stdio.h>

void printArr(int arr[], int len);

int main()
{
int arr[5] = {0};
int len = sizeof(arr) / sizeof(arr[0]);

for (int i = 0; i < len; i++)
{
printf("请录入第%d个元素：\n", i + 1);
scanf("%d", &arr[i]);
}

printf("反转前的数组：\n");
printArr(arr, len);

int i = 0;
int j = len - 1;

while (i < j)
{
int temp = arr[i];
arr[i] = arr[j];
arr[j] = temp;

i++;
j--;
}

printf("反转后的数组：\n");
printArr(arr, len);

return 0;
}

void printArr(int arr[], int len)
{
for (int i = 0; i < len; i++)
{
printf("%d\n", arr[i]);
}
}
```

交换必须用临时变量

```
int temp = arr[i];
arr[i] = arr[j];
arr[j] = temp;
```

不能直接互相赋值，否则原来的值会丢失。

本节重点：

- `scanf("%d", &arr[i]);` 表示把输入的数据存入数组第 `i` 个位置。
- `i + 1` 是为了提示用户“第几个元素”，不是数组索引从 1 开始。
- `while (i < j)` 表示左指针还在右指针左边时继续交换。
- 交换后必须写 `i++` 和 `j--`，否则可能死循环。
- 如果遍历代码多次使用，可以封装成 `printArr` 函数。

## 6. 打乱数组

题目要求：定义数组并提前存入 1 到 5，打乱数组中数据的顺序。

文稿思路遍历数组，每次让当前索引 `i` 的元素和一个随机索引 `index` 的元素交换。

```
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main()
{
int arr[] = {1, 2, 3, 4, 5};
int len = sizeof(arr) / sizeof(arr[0]);

srand((unsigned int)time(NULL));

for (int i = 0; i < len; i++)
{
int index = rand() % len;

int temp = arr[i];
arr[i] = arr[index];
arr[index] = temp;
}

for (int i = 0; i < len; i++)
{
printf("%d\n", arr[i]);
}

return 0;
}
```

随机索引

```
int index = rand() % len;
```

如果数组长度是 5，那么随机索引范围就是 0 到 4，刚好是合法索引范围。

补充：更标准的洗牌写法

```
for (int i = len - 1; i > 0; i--)
{
int index = rand() % (i + 1);

int temp = arr[i];
arr[i] = arr[index];
arr[index] = temp;
}
```

这叫 Fisher-Yates 洗牌算法。文稿写法适合理解“随机索引交换”，这个版本更标准。

本节重点：

- 打乱数组不是改变元素本身，而是改变元素的位置。
- 使用随机数前要设置随机数种子。
- 随机数种子只设置一次，不要放进循环里。
- 打乱数组和反转数组都用到了“交换元素”。
- 反转数组是和固定另一端交换，打乱数组是和随机索引交换。

## 7. 基本查找

基本查找也叫顺序查找。它的思想是：从数组第一个元素开始，一个一个往后找。

查找规则：

- 如果找到，返回当前元素索引。
- 如果没找到，返回 `-1`。
- 因为数组不存在 `-1` 索引，所以 `-1` 可以表示“没找到”。

```
#include <stdio.h>

int order(int arr[], int len, int num);

int main()
{
int arr[] = {11, 22, 55, 77, 44};
int num = 55;
int len = sizeof(arr) / sizeof(arr[0]);

int index = order(arr, len, num);

if (index == -1)
{
printf("没有找到这个数据\n");
}
else
{
printf("找到了，索引是：%d\n", index);
}

return 0;
}

int order(int arr[], int len, int num)
{
for (int i = 0; i < len; i++)
{
if (arr[i] == num)
{
return i;
}
}

return -1;
}
```

本节重点：

- 顺序查找不要求数组有序。
- 找到后直接 `return i;`，函数会结束。
- 循环结束仍没找到，返回 `-1`。
- 顺序查找简单，但数据量大时效率较低。

## 8. 二分查找

二分查找也叫折半查找。核心思想是：每次排除一半的查找范围。

前提条件数组必须有序。可以从小到大，也可以从大到小，但不能乱序。

下面代码默认数组是从小到大排列。

二分查找需要三个变量：

- `min`：当前查找范围的最小索引。
- `max`：当前查找范围的最大索引。
- `middle`：当前查找范围的中间索引。

```
middle = (min + max) / 2;
```

```
#include <stdio.h>

int binarySearch(int arr[], int len, int num);

int main()
{
int arr[] = {7, 23, 79, 81, 103, 127, 131, 147};
int len = sizeof(arr) / sizeof(arr[0]);
int num = 131;

int index = binarySearch(arr, len, num);

printf("%d\n", index);

return 0;
}

int binarySearch(int arr[], int len, int num)
{
int min = 0;
int max = len - 1;

while (min <= max)
{
int middle = (min + max) / 2;

if (arr[middle] < num)
{
min = middle + 1;
}
else if (arr[middle] > num)
{
max = middle - 1;
}
else
{
return middle;
}
}

return -1;
}
```

三个易错点

- 比较时用 `arr[middle]`，不是用 `middle`。
- `arr[middle] < num`，说明目标在右边，更新 `min = middle + 1`。
- `arr[middle] > num`，说明目标在左边，更新 `max = middle - 1`。
- 循环条件是 `min <= max`。当 `min == max` 时，还有一个元素要检查。

找不到的判断如果 `min` 跑到 `max` 的右边，也就是 `min > max`，说明查找范围已经空了，返回 `-1`。

能不能先排序再二分查找？

如果只是判断数据是否存在，可以排序后二分查找；但如果要返回数据在原数组中的索引，不建议这样做。因为排序后元素位置发生变化，返回的是排序后的索引，不是原来的索引。

本节重点：

- 二分查找适用于有序数组。
- 每次看中间值，并排除不可能的一半。
- 比顺序查找效率高。
- 当前代码适用于从小到大的数组；从大到小需要反过来调整判断方向。

## 9. 插值查找

插值查找是在二分查找基础上的优化。二分查找每次都取正中间，而插值查找会根据目标值的位置比例，让 `middle` 尽可能靠近目标值。

二分查找的 `middle`：

```
middle = (min + max) / 2;
```

插值查找的 `middle`：

```
middle = min + (num - arr[min]) * (max - min) / (arr[max] - arr[min]);
```

公式理解

`(num - arr[min]) / (arr[max] - arr[min])` 表示目标值在当前数据范围中的大概比例。

最后加上 `min`，是为了把位置偏移到当前查找范围内。

```
#include <stdio.h>

int interpolationSearch(int arr[], int len, int num);

int main()
{
int arr[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
int len = sizeof(arr) / sizeof(arr[0]);
int num = 3;

int index = interpolationSearch(arr, len, num);

printf("%d\n", index);

return 0;
}

int interpolationSearch(int arr[], int len, int num)
{
int min = 0;
int max = len - 1;

while (min <= max)
{
if (num < arr[min] || num > arr[max])
{
return -1;
}

if (arr[max] == arr[min])
{
if (arr[min] == num)
{
return min;
}
else
{
return -1;
}
}

int middle = min + (num - arr[min]) * (max - min) / (arr[max] - arr[min]);

if (arr[middle] < num)
{
min = middle + 1;
}
else if (arr[middle] > num)
{
max = middle - 1;
}
else
{
return middle;
}
}

return -1;
}
```

适用条件

- 数组必须有序。
- 数据分布最好比较均匀。
- 如果数据分布不均匀，插值查找效率可能反而不如二分查找。
- 没有最好的算法，只有最适合当前场景的算法。

本节重点：

- 插值查找和二分查找的流程基本一样。
- 两者区别主要在 `middle` 的计算方式。
- 二分查找固定取中间。
- 插值查找根据目标值比例估算位置。

## 10. 遗漏检查清单

下面按课程逐项检查，确保没有遗漏关键知识点。

| 模块 | 已覆盖知识点 | 复习提醒 |
| --- | --- | --- |
| 数组内存 | 连续存储、首地址、索引偏移量、数据类型决定读取字节数、十六进制地址、`&` 取地址、数组长度公式 | 重点理解“索引就是偏移量”。 |
| 求最值 | `max`、`min`、默认值用 `arr[0]`、循环从 1 开始、不能默认写 0 | 全负数、全正数场景容易考。 |
| 求和基础版 | 定义数组、随机数种子、`rand() % 100 + 1`、遍历数组、累加思想、一个循环先做一件事 | `sum += arr[i]` 是核心。 |
| 求和升级版 | 不重复随机数、`contains` 函数、成功赋值才 `i++`、求平均数、统计小于平均数的个数 | 最容易错在重复时索引不该前进。 |
| 反转数组 | 键盘录入、`scanf`、封装打印函数、双指针、交换变量、`while (i < j)` | 交换后必须移动两个指针。 |
| 打乱数组 | 随机索引、随机种子只设置一次、当前元素和随机位置交换、Fisher-Yates 补充 | 本质还是元素交换。 |
| 基本查找 | 顺序查找、从头到尾遍历、找到返回索引、没找到返回 `-1`、不要求数组有序 | `-1` 表示失败，因为没有负数索引。 |
| 二分查找 | 有序前提、`min`、`max`、`middle`、每次排除一半、找不到条件、不能混淆索引和数据 | 比较的是 `arr[middle]`，不是 `middle`。 |
| 插值查找 | 基于二分优化、按比例计算 `middle`、有序且分布均匀时效果好、分布不均匀可能变慢 | 记住：没有最好算法，只有合适算法。 |

## 最终复习口诀

数组内存数组连续存，索引是偏移，类型定字节。

数组处理遍历拿元素，变量存结果，条件决定更新。

查找算法顺序挨个找，二分砍一半，插值估位置。

易错提醒不要乱设初始值，不要忘记数组有序前提，不要把索引当数据比较。

本笔记已检查覆盖：

数组内存、索引偏移、数组长度、求最大值、求最小值、随机数组求和、不重复随机数、平均数统计、反转数组、打乱数组、顺序查找、二分查找、插值查找、关键代码、易错点、适用条件均已整理。
