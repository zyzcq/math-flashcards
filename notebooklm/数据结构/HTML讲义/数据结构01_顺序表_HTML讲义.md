# C语言 · 顺序表查找复习系统

> 分类: 数据结构 / HTML讲义
> 来源: ds/顺序表.html
> 提取说明: 从 HTML body 提取可见内容，保留标题、列表、表格和代码块。

# C语言 · 顺序表查找复习系统

覆盖范围：顺序表的按位查找、按值查找、静态/动态顺序表访问方式、指针下标访问原理、结构体比较、时间复杂度分析与考试易错点。

按位查找 GetElem 按值查找 LocateElem 随机存取 O(1) 位序 vs 数组下标 指针 + 下标 struct 不能直接 == 时间复杂度

使用方法：先看总纲建立框架，再展开核心模块复习规则；最后到练习中心自测。点击“导出 PDF”会自动展开所有知识点和答案。

全部展开

全部收起

显示答案

隐藏答案

只看重点 / 显示全部

导出 PDF

总纲 按位查找 指针下标原理 按值查找 结构体比较 复杂度 代码整理区 练习中心 实战策略 检查清单

## 总纲：顺序表查找的核心方法

一句话核心： 顺序表“按位查找”快，因为它连续存储，可以直接算地址；“按值查找”通常慢，因为不知道目标值在哪，只能从头到尾比较。

#### 抓手 1：位置找元素

给定位序 `i`，直接访问 `data[i - 1]`。

#### 抓手 2：值找位置

给定元素值 `e`，从 `data[0]` 开始逐个比较。

#### 抓手 3：C 语言语法边界

基本类型可用 `==`，结构体不能直接用 `==` 比较。

本节最容易丢分的点： 题目说“第 `i` 个元素”通常是位序，从 1 开始；数组下标从 0 开始，所以代码里是 `data[i - 1]`。

核心模块 1：按位查找 GetElem

按位查找的任务是：给定线性表中的位置 `i`，取得第 `i` 个数据元素。

核心规则： 顺序表第 `i` 个元素对应数组下标 `i - 1`。

例子： 如果顺序表是 `[10, 20, 30, 40]`，查找第 3 个元素，应访问 `data[2]`，结果是 `30`。

### 静态顺序表中的按位查找

静态顺序表通常用固定数组保存元素。若不做健壮性检查，核心代码很短：

```
ElemType GetElem(SqList L, int i) {
return L.data[i - 1];
}
```

注意： 上面写法只展示核心逻辑。实际写代码时最好检查 `i` 是否满足 `1 <= i <= L.length`。

### 更规范的 C 语言写法

为了让调用者知道查找是否成功，可以返回 `bool`，再通过指针参数 `e` 带回查到的元素。

```
#include <stdio.h>
#include <stdbool.h>

#define MaxSize 10
typedef int ElemType;

typedef struct {
ElemType data[MaxSize];
int length;
} SqList;

bool GetElem(SqList L, int i, ElemType *e) {
if (i < 1 || i > L.length) {
return false;
}

*e = L.data[i - 1];
return true;
}

int main(void) {
SqList list = {{10, 20, 30, 40}, 4};
ElemType value = 0;

if (GetElem(list, 3, &value)) {
printf("第3个元素是：%d\n", value);
} else {
printf("查找失败：位置非法\n");
}

return 0;
}
```

记忆点：按位查找 = `data[i - 1]`；合法范围 = `1 <= i <= length`。

核心模块 2：动态顺序表中，为什么指针也能像数组一样用

动态顺序表中，`data` 不再是固定数组，而是一个指针。它指向 `malloc` 申请的一整片连续内存空间。

核心规则： 在 C 语言中，指针可以配合下标访问连续空间，`data[i]` 等价于 `*(data + i)`。

```
#include <stdio.h>
#include <stdlib.h>

#define InitSize 10
typedef int ElemType;

typedef struct {
ElemType *data;
int maxSize;
int length;
} SeqList;

void InitList(SeqList *L) {
L->data = (ElemType *)malloc(sizeof(ElemType) * InitSize);

if (L->data == NULL) {
printf("内存申请失败\n");
return;
}

L->maxSize = InitSize;
L->length = 0;
}

int main(void) {
SeqList list;
InitList(&list);

if (list.data == NULL) {
return 1;
}

list.data[0] = 100;
list.data[1] = 200;
list.length = 2;

printf("第1个元素：%d\n", list.data[0]);
printf("第2个元素：%d\n", list.data[1]);

free(list.data);
list.data = NULL;

return 0;
}
```

### 指针类型决定每次跳多少字节

文稿强调：即使两个指针指向同一个地址，只要指针类型不同，访问 `p[i]` 时“跳过的字节数”也不同。

假设 `data` 指向地址 2000，且 `ElemType` 占 6 字节：

- `data[0]` 访问地址 2000 开始的 6 个字节。
- `data[1]` 访问地址 2006 开始的 6 个字节。
- `data[2]` 访问地址 2012 开始的 6 个字节。

如果 `int *p` 指向同样的地址 2000，且 `int` 占 4 字节：

- `p[0]` 访问地址 2000 开始的 4 个字节。
- `p[1]` 访问地址 2004 开始的 4 个字节。
- `p[2]` 访问地址 2008 开始的 4 个字节。

### 为什么 `malloc` 后要转换成对应指针类型

`malloc` 申请的是一片原始内存。把返回值转换成 `ElemType *`，就是告诉编译器：以后用 `data[i]` 访问时，每个元素按 `sizeof(ElemType)` 个字节理解。

```
L->data = (ElemType *)malloc(sizeof(ElemType) * InitSize);
```

严重错误： 如果指针类型写错，程序可能从错误的字节边界取数据，导致访问结果混乱。

记忆点：`data[i]` 不是简单地址加 `i`，而是地址加 `i * sizeof(指针指向的类型)`。

核心模块 3：按值查找 LocateElem

按值查找的任务是：给定一个元素值 `e`，在线性表中查找是否存在与 `e` 相等的元素；如果存在，返回它的位序。

核心规则： 无序顺序表按值查找只能从头到尾依次比较，找到后返回 `数组下标 + 1`。

```
int LocateElem(SqList L, ElemType e) {
for (int i = 0; i < L.length; i++) {
if (L.data[i] == e) {
return i + 1;
}
}

return 0;
}
```

这里返回 `i + 1`，是因为 `i` 是数组下标，从 0 开始；而线性表的位序从 1 开始。

例子： 顺序表为 `[7, 8, 9, 10, 11, 12]`，查找 `9`：

- 第一次比较 `7 == 9`，不相等。
- 第二次比较 `8 == 9`，不相等。
- 第三次比较 `9 == 9`，相等，返回 `2 + 1 = 3`。

### 完整可运行示例

```
#include <stdio.h>

#define MaxSize 10
typedef int ElemType;

typedef struct {
ElemType data[MaxSize];
int length;
} SqList;

int LocateElem(SqList L, ElemType e) {
for (int i = 0; i < L.length; i++) {
if (L.data[i] == e) {
return i + 1; // 返回位序，不是数组下标
}
}

return 0; // 0 表示没有找到
}

int main(void) {
SqList list = {{7, 8, 9, 10, 11, 12}, 6};

int position = LocateElem(list, 9);

if (position != 0) {
printf("元素9的位序是：%d\n", position);
} else {
printf("没有找到元素9\n");
}

return 0;
}
```

注意： 如果没有找到，常用 `0` 表示失败，因为线性表没有第 0 个位置。

记忆点：按值查找 = 逐个比较；找到返回位序 `i + 1`；没找到返回 `0`。

核心模块 4：结构体元素如何比较相等

如果顺序表存放的是 `int`、`char`、`float`、`double` 等基本类型，通常可以直接用 `==` 比较。

核心规则： C 语言中不能直接用 `==` 判断两个结构体变量是否相等。

### 错误示例：结构体直接比较

```
#include <stdio.h>

typedef struct {
int number;
int people;
} Customer;

int main(void) {
Customer first = {1, 1};
Customer second = {1, 1};

/*
错误：C 语言不允许直接用 == 比较结构体。
if (first == second) {
printf("相等\n");
}
*/

return 0;
}
```

不能这样做： `first == second` 在严格 C 语言中通常无法编译。结构体是否相等，需要你自己定义判断标准。

### 正确示例：写比较函数

```
#include <stdio.h>
#include <stdbool.h>

#define MaxSize 10

typedef struct {
int number;
int people;
} Customer;

typedef struct {
Customer data[MaxSize];
int length;
} CustomerList;

bool CustomerEqual(Customer x, Customer y) {
return x.number == y.number && x.people == y.people;
}

int LocateCustomer(CustomerList L, Customer target) {
for (int i = 0; i < L.length; i++) {
if (CustomerEqual(L.data[i], target)) {
return i + 1;
}
}

return 0;
}

int main(void) {
CustomerList list = {
{
{1, 20},
{2, 30},
{3, 40}
},
3
};

Customer target = {2, 30};
int position = LocateCustomer(list, target);

if (position != 0) {
printf("目标顾客的位序是：%d\n", position);
} else {
printf("没有找到目标顾客\n");
}

return 0;
}
```

了解即可 C++ 可以通过运算符重载让结构体或类支持 `==`，但本节重点是 C 语言，不展开。

考试提醒： 如果考试科目是“数据结构”，更关注算法逻辑，抽象写法里常用 `==` 表达“两个元素相等”。如果考试科目是“C 语言程序设计”，通常更严格，结构体比较要写字段比较或比较函数。

记忆点：基本类型可直接 `==`；结构体要逐字段比较，最好封装成比较函数。

核心模块 5：查找操作的时间复杂度

### 按位查找：O(1)

按位查找只需要根据位置直接访问 `data[i - 1]`。没有循环，也不需要从头扫描。

原因： 顺序表连续存储，且每个元素大小相同，所以只要知道起始地址和元素大小，就能立即算出第 `i` 个元素的位置。

### 按值查找：最好 O(1)，最坏 O(n)，平均 O(n)

| 情况 | 说明 | 比较次数 | 复杂度 |
| --- | --- | --- | --- |
| 最好情况 | 目标元素刚好在表头 | 1 次 | `O(1)` |
| 最坏情况 | 目标元素在表尾，或不存在 | n 次 | `O(n)` |
| 平均情况 | 目标元素出现在每个位置的概率相同 | `(n + 1) / 2` | `O(n)` |

平均比较次数：

```
(1 + 2 + 3 + ... + n) / n = (n + 1) / 2
```

因此数量级仍然是 `O(n)`。

了解即可 如果顺序表中的数据有序，例如从小到大排列，后续可以使用更高效的查找算法，如二分查找。本节只要求掌握无序顺序表的顺序查找。

记忆点：按位查找看“位置”，直接访问；按值查找看“值”，通常扫描。

## 代码整理区：本节重要代码合集

以下代码均为规范 C 语言版本，包含必要头文件、`main()` 和 `return 0;`，可复制运行。

代码 1：静态顺序表 · 按位查找 + 按值查找

```
#include <stdio.h>
#include <stdbool.h>

#define MaxSize 10
typedef int ElemType;

typedef struct {
ElemType data[MaxSize];
int length;
} SqList;

bool GetElem(SqList L, int i, ElemType *e) {
if (i < 1 || i > L.length) {
return false;
}

*e = L.data[i - 1];
return true;
}

int LocateElem(SqList L, ElemType e) {
for (int i = 0; i < L.length; i++) {
if (L.data[i] == e) {
return i + 1;
}
}

return 0;
}

int main(void) {
SqList list = {{7, 8, 9, 10, 11, 12}, 6};

ElemType value = 0;
if (GetElem(list, 3, &value)) {
printf("第3个元素是：%d\n", value);
} else {
printf("按位查找失败\n");
}

int position = LocateElem(list, 10);
if (position != 0) {
printf("元素10的位序是：%d\n", position);
} else {
printf("没有找到元素10\n");
}

return 0;
}
```

代码 2：动态顺序表 · 指针下标访问

```
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define InitSize 10
typedef int ElemType;

typedef struct {
ElemType *data;
int maxSize;
int length;
} SeqList;

bool InitList(SeqList *L) {
L->data = (ElemType *)malloc(sizeof(ElemType) * InitSize);

if (L->data == NULL) {
return false;
}

L->maxSize = InitSize;
L->length = 0;
return true;
}

bool GetElem(SeqList L, int i, ElemType *e) {
if (i < 1 || i > L.length) {
return false;
}

*e = L.data[i - 1];
return true;
}

void DestroyList(SeqList *L) {
free(L->data);
L->data = NULL;
L->maxSize = 0;
L->length = 0;
}

int main(void) {
SeqList list;

if (!InitList(&list)) {
printf("初始化失败：内存申请失败\n");
return 1;
}

list.data[0] = 100;
list.data[1] = 200;
list.data[2] = 300;
list.length = 3;

ElemType value = 0;
if (GetElem(list, 2, &value)) {
printf("第2个元素是：%d\n", value);
}

DestroyList(&list);
return 0;
}
```

代码 3：结构体顺序表 · 自定义相等判断

```
#include <stdio.h>
#include <stdbool.h>

#define MaxSize 10

typedef struct {
int number;
int people;
} Customer;

typedef struct {
Customer data[MaxSize];
int length;
} CustomerList;

bool CustomerEqual(Customer x, Customer y) {
return x.number == y.number && x.people == y.people;
}

int LocateCustomer(CustomerList L, Customer target) {
for (int i = 0; i < L.length; i++) {
if (CustomerEqual(L.data[i], target)) {
return i + 1;
}
}

return 0;
}

int main(void) {
CustomerList list = {
{
{101, 2},
{102, 4},
{103, 6}
},
3
};

Customer target = {102, 4};
int position = LocateCustomer(list, target);

if (position != 0) {
printf("找到目标顾客，位序：%d\n", position);
} else {
printf("未找到目标顾客\n");
}

return 0;
}
```

## 练习中心：题目可见，答案隐藏

建议先独立判断，再点击查看解析。

练习 1：位序和数组下标

顺序表 `L.data = {5, 10, 15, 20}`，`L.length = 4`。如果要取得第 3 个元素，应该访问哪个数组下标？结果是多少？

点击查看答案解析

**答案：**访问 `L.data[2]`，结果是 `15`。

**解析：**第 3 个元素是位序，位序从 1 开始；数组下标从 0 开始，所以数组下标是 `3 - 1 = 2`。

**结论：**第 `i` 个元素对应 `data[i - 1]`。

练习 2：判断输出结果

下面程序输出什么？

```
#include <stdio.h>

#define MaxSize 10
typedef int ElemType;

typedef struct {
ElemType data[MaxSize];
int length;
} SqList;

int LocateElem(SqList L, ElemType e) {
for (int i = 0; i < L.length; i++) {
if (L.data[i] == e) {
return i + 1;
}
}

return 0;
}

int main(void) {
SqList list = {{3, 6, 9, 12}, 4};
printf("%d\n", LocateElem(list, 9));
printf("%d\n", LocateElem(list, 7));
return 0;
}
```

点击查看答案解析

**答案：**

```
3
0
```

**解析：**`9` 位于数组下标 `2`，返回位序 `2 + 1 = 3`。`7` 不存在，所以返回 `0`。

**结论：**`LocateElem` 找到返回位序，没找到返回 `0`。

练习 3：指针下标访问推理

假设 `int` 占 4 字节，`int *p` 指向地址 2000。请问 `p[0]`、`p[1]`、`p[2]` 分别从哪个地址开始取数据？

点击查看答案解析

**答案：**

- `p[0]` 从地址 2000 开始。
- `p[1]` 从地址 2004 开始。
- `p[2]` 从地址 2008 开始。

**解析：**`p[i]` 等价于 `*(p + i)`，指针加 1 不是地址数值加 1，而是跳过一个 `int` 的大小，也就是 4 字节。

**内存示意：**

```
地址 2000 ~ 2003：p[0]
地址 2004 ~ 2007：p[1]
地址 2008 ~ 2011：p[2]
```

**结论：**指针类型决定下标访问时每次跳多少字节。

练习 4：找代码错误

下面代码有什么问题？应该如何修改？

```
typedef struct {
int number;
int people;
} Customer;

int main(void) {
Customer x = {1, 2};
Customer y = {1, 2};

if (x == y) {
printf("相等\n");
}

return 0;
}
```

点击查看答案解析

**答案：**错误在 `x == y`。C 语言中不能直接用 `==` 比较两个结构体变量。

**解析：**结构体是否相等需要自己定义标准，比如所有字段都相等才算相等。

**正确写法：**

```
#include <stdio.h>
#include <stdbool.h>

typedef struct {
int number;
int people;
} Customer;

bool CustomerEqual(Customer x, Customer y) {
return x.number == y.number && x.people == y.people;
}

int main(void) {
Customer x = {1, 2};
Customer y = {1, 2};

if (CustomerEqual(x, y)) {
printf("相等\n");
}

return 0;
}
```

**结论：**结构体比较要逐字段判断，最好封装成比较函数。

练习 5：复杂度判断

无序顺序表长度为 `n`。按位查找和按值查找的时间复杂度分别是多少？为什么？

点击查看答案解析

**答案：**按位查找是 `O(1)`；按值查找平均是 `O(n)`。

**解析：**按位查找可以直接通过 `data[i - 1]` 找到元素，不需要循环。按值查找不知道目标值在哪里，只能从头开始逐个比较。

**结论：**位置已知，用随机存取；值已知但位置未知，用顺序扫描。

## 实战策略：考试 / 笔试快速判断

#### 看到“第 i 个元素”

立刻想到：这是位序，代码访问 `data[i - 1]`。

#### 看到“查找值 e”

无序表默认从头扫到尾，找到返回位序，找不到返回失败标记。

#### 看到“动态顺序表 data”

`data` 是指针，但指向连续空间，所以可以写 `data[i]`。

#### 看到“结构体相等”

严格 C 语言中不要写 `x == y`，要写比较函数。

常见陷阱：

- 把位序 `i` 误写成数组下标 `data[i]`。
- 按值查找找到后返回了数组下标，而不是位序。
- 忘记处理“没找到”的情况。
- 结构体直接用 `==` 比较。
- 误以为指针加 1 是地址数值加 1，而不是跳过一个元素大小。

答题模板：

顺序表按位查找的时间复杂度为 `O(1)`，因为顺序表连续存储且元素大小相同，可以根据起始地址和元素位序直接计算目标元素地址。

顺序表按值查找在无序情况下平均时间复杂度为 `O(n)`，因为需要从表头开始逐个比较，平均比较次数为 `(n + 1) / 2`。

## 考前检查清单

### 概念与规则

我知道按位查找是根据位置找元素。

我知道按值查找是根据元素值找位序。

我知道位序从 1 开始，数组下标从 0 开始。

我知道第 `i` 个元素对应 `data[i - 1]`。

### C 语言细节

我知道动态顺序表的 `data` 是指针。

我知道 `data[i]` 等价于 `*(data + i)`。

我知道指针类型决定每次跳多少字节。

我知道 `malloc` 需要 `#include <stdlib.h>`。

### 代码能力

我能写出 `GetElem`。

我能写出 `LocateElem`。

我能写出结构体比较函数。

我会用 `0` 表示按值查找失败。

### 复杂度

我知道按位查找是 `O(1)`。

我知道按值查找最好是 `O(1)`。

我知道按值查找最坏是 `O(n)`。

我知道按值查找平均是 `O(n)`。

## 资料信息

**资料主题：**C语言 / 数据结构 · 顺序表的查找

**覆盖范围：**按位查找、按值查找、静态顺序表、动态顺序表、指针下标访问、结构体比较、时间复杂度分析。

**最后更新时间：**2026-05-14

完整性检查清单：

```
请确认全文包含：
<!-- END: 首页 -->
<!-- END: 工具栏 -->
<!-- END: 导航栏 -->
<!-- END: 总纲 -->
<!-- END: 核心模块1：按位查找 -->
<!-- END: 核心模块2：指针下标访问原理 -->
<!-- END: 核心模块3：按值查找 -->
<!-- END: 核心模块4：结构体比较 -->
<!-- END: 核心模块5：查找操作时间复杂度 -->
<!-- END: 代码整理区 -->
<!-- END: 练习中心 -->
<!-- END: 实战策略 -->
<!-- END: 检查清单 -->
<!-- END: 页脚 -->
<!-- END: JavaScript -->
</body>
</html>
```

   function expandAll() { document.querySelectorAll("details").forEach(function(detail) { detail.open = true; }); } function collapseAll() { document.querySelectorAll("details").forEach(function(detail) { detail.open = false; }); } function showAnswers() { document.querySelectorAll(".answer-toggle").forEach(function(detail) { detail.open = true; }); } function hideAnswers() { document.querySelectorAll(".answer-toggle").forEach(function(detail) { detail.open = false; }); } function toggleFocusMode() { document.body.classList.toggle("focus-mode"); } function printPage() { expandAll(); showAnswers(); setTimeout(function() { window.print(); }, 120); } window.addEventListener("beforeprint", function() { expandAll(); showAnswers(); });
