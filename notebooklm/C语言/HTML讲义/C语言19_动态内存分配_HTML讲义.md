# C语言 · 第14章 · 动态内存分配 复习系统

> 分类: C语言 / HTML讲义
> 来源: c/动态内存分配.html
> 提取说明: 从 HTML body 提取可见内容，保留标题、列表、表格和代码块。

# C语言 · 第14章 · 动态内存分配 复习系统

覆盖：四大函数 · 十个细节 · C语言内存结构 · 五种数据的内存运行过程

malloc calloc realloc free 堆区 栈区 静态区 常量区 代码区 内存泄漏 脏数据 野指针 虚拟内存 字符串常量

使用说明： 点击模块展开/收起；练习题默认隐藏答案，点击"点击查看答案解析"展开； 顶部工具栏可一键展开/收起、显示答案、切换"只看重点"、导出 PDF。

全部展开

全部收起

显示答案

隐藏答案

只看重点

导出 PDF

### 本章目录

总纲 ①四大函数 ②malloc细节 ③free与脏数据 ④calloc与realloc ⑤内存结构总览 ⑥变量与数组运行 ⑦全局与static ⑧字符串运行 ⑨malloc内存运行 代码整理区 练习中心 实战策略 检查清单

## 0总纲：一句话看懂动态内存分配

先建框架，再填细节。

一句话核心： 动态内存分配 = 运行时向系统申请一块堆区空间，用完必须手动释放。

### 学习抓手（三句话）

抓手 1 · 函数
记住 4 个函数：`malloc`、`calloc`、`realloc`、`free`， 头文件统一 `<stdlib.h>`。

抓手 2 · 流程
固定三步：申请 → 判断是否为 NULL → 使用 → 释放 → 置空。

抓手 3 · 内存
代码区 / 栈 / 堆 / 静态区 / 常量区， malloc 的空间在堆，普通局部变量在栈。

### 本章核心对比

| 维度 | 栈区（普通数组） | 堆区（malloc 申请） |
| --- | --- | --- |
| 位置 | 栈 | 堆 |
| 空间大小 | 较小（通常几MB） | 较大（受内存限制） |
| 生命周期 | 随函数结束自动销毁 | 不 free 则一直存在 |
| 跨函数使用 | 不行（指针会失效） | 可以 |

## 1动态内存分配的四大函数

统一头文件：`#include <stdlib.h>`

核心规则： `malloc` 和 `free` 必须掌握，`calloc` 和 `realloc` 了解即可。

### 四个函数总览

| 函数 | 英文全称 | 作用 | 掌握程度 |
| --- | --- | --- | --- |
| `malloc` | memory allocation | 申请一块连续空间（不初始化） | 必须掌握 |
| `calloc` | contiguous allocation | 申请连续空间 + 初始化为 0 | 了解即可 |
| `realloc` | re-allocation | 修改已申请空间的大小 | 了解即可 |
| `free` | free | 释放空间 | 必须掌握 |

### 语法格式

```
// malloc：参数是"字节数"
void *malloc(size_t size);

// calloc：参数是"元素个数"和"每个元素大小"
void *calloc(size_t num, size_t size);

// realloc：指针 + 新的总字节数
void *realloc(void *ptr, size_t new_size);

void free(void *ptr);
```

### 标准使用流程（必背）

```
#include <stdio.h>
#include <stdlib.h>

int main() {
int size = 10;

int *p = (int *)malloc(size * sizeof(int));

if (p == NULL) {
printf("内存申请失败\n");
return 1;
}

for (int i = 0; i < size; i++) {
p[i] = (i + 1) * 10;
}

for (int i = 0; i < size; i++) {
printf("%d ", p[i]);
}

free(p);
p = NULL; // 防止野指针

return 0;
}
```

易错提醒：

- `malloc(100)` 表示申请 100 个字节，不是 100 个 `int`。
- 不要写死 `malloc(400)`，要写 `malloc(100 * sizeof(int))`，保证跨平台。
- 申请出来的空间 没有默认值，必须先赋值再读取。
- 用完 必须 `free`，否则内存泄漏。

### 访问方式：三种等价写法

```
int *p = malloc(10 * sizeof(int));

*(p + i) = 100;

// 方式二：下标（推荐）
p[i] = 100;

// 方式三：i[p]（合法但不要用）
i[p] = 100;
```

原理：`p[i]` 在底层会被编译器解析为 `*(p + i)`。 由于加法交换律 `p + i == i + p`，所以 `i[p]` 也合法。
实际开发只用 `p[i]`。

### 本模块记忆点（非重点背诵）

- `malloc` 读作 "em-a-lock"，不是 "mail-lock"。
- 英文读音不影响代码，读错不代表技术差。

## 2malloc 的 6 个核心细节

不需要死记，但代码出 bug 时要知道怎么改。

### 细节 1：单位是字节

`malloc(100)` = 申请 100 个字节。 不同类型能存的数量不同：

- `char`（1 字节）→ 存 100 个
- `short`（2 字节）→ 存 50 个
- `int`（4 字节）→ 存 25 个

```
// 推荐写法
int *p = malloc(25 * sizeof(int));
```

### 细节 2：返回值是 `void *`

```
void *malloc(size_t size);

int *p = (int *)malloc(25 * sizeof(int));

int *p = malloc(25 * sizeof(int));
```

为什么返回 `void *`？ 因为 `void *` 是通用指针，可以转成 `int *`、`char *`、`double *` 等任意类型， 这样 `malloc` 就具备通用性，可以被任何类型使用。

注意：`void *` 本身没有步长， 既不能做指针加减运算，也不能解引用取值。必须转成具体类型后才能用。

### 细节 3：只返回首地址，不记录总大小

p 首地址 ... 共 25 个 int intintintintint p 只知道：堆区起点地址 p 不知道：后面一共有 25 个元素 因此动态数组长度必须由 size 变量另行记录

```
int *p = malloc(25 * sizeof(int));

sizeof(p); // 测的是指针本身的大小（64位系统为 8 字节）

int size = 25;
int *p = malloc(size * sizeof(int));
```

传参注意：把动态数组传给函数时，要把 指针 + 长度 一起传， 因为函数无法从指针反推出数组长度。

```
void printArray(int *p, int size) {
for (int i = 0; i < size; i++) {
printf("%d ", p[i]);
}
}

printArray(p, size); // 注意是 p，不是 *p
```

### 细节 4：不会自动消失（内存泄漏）

严重错误示范：

```
while (1) {
int *p = malloc(1000 * sizeof(int));
// 从不 free，每次循环都泄漏
}
```

不断申请不释放，最终内存被耗尽，程序崩溃。

正确做法：空间不用了，立刻 `free(p);` 释放。

### 细节 5：申请过多时产生"虚拟内存"

现象：一台 32GB 内存的电脑，用循环申请 1GB × N，居然能成功申请到 80 多次。

原因： 系统只在你真正写入数据时，才把内存真正分配给你。 `malloc` 成功只是给你一个"承诺地址"，不代表物理内存立刻被占用。

malloc(1GB) 成功 获得虚拟地址范围 p[0] = 100：首次写入触发真实物理页分配 要点：malloc 成功是“地址承诺”，不是全部物理内存立即占用。

### 细节 6：空间没有初始化

错误：

```
int *p = malloc(10 * sizeof(int));
printf("%d", p[0]); // 输出垃圾值
```

规则：`malloc` 只申请空间，不清空。 使用前必须先赋值：

```
for (int i = 0; i < 10; i++) {
p[i] = 0;
}
```

### 细节汇总（6 条一句话）

1. 单位是字节，不是元素个数。
2. 返回 `void *`，需要转成具体类型。
3. 只返回首地址，不记录大小，要自己存 `size`。
4. 不会自动释放，必须 `free`。
5. 大量申请会出现虚拟内存现象（承诺≠实际分配）。
6. 空间无默认值，必须先赋值再使用。

## 3free 与"脏数据"

释放之后 ≠ 数据被清零，而是"不能再用"。

核心规则： `free(p)` 之后，`p` 指向的空间里的数据叫脏数据， 可能是旧值、0 或乱码，结果不可预测，一律不能再访问。

### 为什么叫"脏数据"？

`free` 做的事情是 "把这块空间还给系统"， 而不是"清空内容"。空间归还后，系统可以自由处置：

- 可能还是原来的值（系统还没来得及改）
- 可能被清零
- 可能被改成别的值

所以这块数据 "权限上已经失效"，叫做脏数据。

### 典型现象

```
int *p = malloc(10 * sizeof(int));
for (int i = 0; i < 10; i++) p[i] = (i + 1) * 10;

printf("%d ", p[0]);

free(p);

printf("%d ", p[0]); // 可能还是 10，也可能是 0 或乱码
```

常见误区： 有时候 `free` 后还能打印出原来的值，以为这样能继续用 —— 这是碰巧， 换个编译器、换次运行，结果就可能不同，属于"未定义行为"。

### 野指针与正确习惯

free 之前 栈：p = 0x00AA 堆：[10][20][30] ... [100] free 之后（不置空） 栈：p = 0x00AA 堆：[ ? ][ ? ][ ? ] ... 野指针 / 内容不可信 free 之后（置空） 栈：p = NULL 不再保存失效地址 规则：free(p) 释放权限，不保证清零；随后 p = NULL 可避免继续误用。

```
// 推荐写法
free(p);
p = NULL; // 防止野指针
```

黄金搭档：`free(p); p = NULL;` 一定要配套写。

## 4calloc 与 realloc（了解即可）

考试和工作中不常用，但要能看懂别人的代码。

### calloc：malloc + 初始化

```
int *p = calloc(10, sizeof(int));
```

本质：`calloc` = `malloc` + 清零。

- 整数初始化为 `0`
- 浮点数初始化为 `0.0`
- 字符初始化为 `'\0'`

其他行为（堆区、返回首地址、失败返 NULL、要 `free`）完全和 `malloc` 一样。

### 为什么实际更多用 malloc？

1. `malloc` 效率更高（不做额外清零操作）。
2. 大多数场景申请完后都会立刻覆盖赋值，`calloc` 的清零是多余工作。

### realloc 的两个关键细节

#### 细节 ① 扩容后地址"可能变，也可能不变"

情况 A：原地扩容，地址不变 1020304050空闲空间 扩容后仍在原地址1020304050????? 情况 B：原位置后方不够，地址改变 别人占用 新地址 规则：前半旧数据保留；新增部分未初始化；最终只 free realloc 成功后的指针。

#### 细节 ② 原数据保留，原空间无需手动 free

```
int *p1 = malloc(10 * sizeof(int));

int *p2 = realloc(p1, 20 * sizeof(int));
// ✅ 前 10 个元素依然是 10~100
// ✅ 后 10 个位置是垃圾值（没赋过值）
// ✅ 不用再 free(p1)，realloc 内部已处理

free(p2);
```

禁忌：扩容后不要再 `free(p1)`， 因为 `p1` 对应的旧空间已经被 `realloc` 内部释放或复用。

### 更安全的 realloc 写法

```
int *temp = realloc(p, new_size);
if (temp != NULL) {
p = temp;
} else {
// 扩容失败，p 仍指向原空间，可继续使用或 free
}
```

直接 `p = realloc(p, size);` 的问题： 如果扩容失败返回 `NULL`，`p` 原来保存的旧地址就丢了，造成内存泄漏。

## 5C 语言的内存结构总览

理解了内存结构，后面所有"变量在哪里"的问题都能画图解决。

核心规则： C 程序运行时的内存被分为 6 个区域，不同数据按规则放入不同区域。

高地址栈区 Stack：函数调用、局部变量、普通数组堆区 Heap：malloc / calloc / realloc 申请代码区 Text：程序指令初始化静态区 .data：已赋值全局 / static未初始化静态区 .bss：未赋值全局 / static常量区 .rodata：字符串字面量低地址提示：这是教学模型，实际平台的段名和地址布局可能有差异。

### 六大区域各放什么

| 区域 | 存放内容 | 生命周期 |
| --- | --- | --- |
| 代码区 | 程序指令（函数代码） | 程序运行期间 |
| 栈区 | 函数调用栈帧、局部变量、普通数组、指针变量本身 | 函数调用期间 |
| 堆区 | `malloc/calloc/realloc` 申请的空间 | `free` 之前一直存在 |
| 初始化静态区 | 已赋值的全局变量、`static` 变量 | 程序运行期间 |
| 未初始化静态区 | 未赋值的全局变量、`static` 变量 | 程序运行期间 |
| 常量区 | `char *s = "abc"` 的 `"abc"` 字面量 | 程序运行期间（不可修改） |

### 综合代码 · 六区对照

```
#include <stdio.h>
#include <stdlib.h>

int g1; // 未初始化静态区
int g2 = 10; // 初始化静态区

int main() {
int a = 1; // 栈区
int arr[3] = {1, 2, 3}; // 栈区

static int s1; // 未初始化静态区
static int s2 = 20; // 初始化静态区

char *str = "abc"; // str 在栈区，"abc" 在常量区
char buf[] = "abc"; // buf 数组在栈区（可修改）

int *p = malloc(10 * sizeof(int)); // p 在栈区，空间在堆区

free(p);
p = NULL;
return 0;
}
```

## 6变量和数组在内存中的运行过程

以一个最简单的 main 函数为例，看看栈区怎么工作。

### 示例代码

```
#include <stdio.h>

int main() {
int a = 10;
int b = 20;
int arr[3] = {1, 2, 3};
return 0;
}
```

### 运行过程（四步）

① 代码加载
整个程序代码被加载到 代码区，仅作临时存储，不在这里执行。

② main 进栈
程序运行时，`main` 函数被调用，进入 栈区 执行。

③ 变量/数组创建
`a`、`b`、`arr` 都在 main 的栈帧中分配空间。

④ main 出栈
`main` 结束后出栈，栈帧回收，`a`、`b`、`arr` 全部消失。

### 内存示意

main 执行中：创建栈帧 main 函数栈帧 a = 10 b = 20 123arr[3] 连续存放 main 结束：栈帧出栈，a / b / arr 全部失效

### 关于数组名 arr 的两层含义（重要）

内存里没有"单独的变量 arr"，`arr` 代表整个数组空间。

- 在 `sizeof(arr)` 中：`arr` 表示整个数组，结果 = 12（3×4 字节）
- 在其他表达式中：`arr` 退化为首元素地址，等价于 `&arr[0]`

```
int arr[3] = {1, 2, 3};

sizeof(arr);
sizeof(arr[0]);
sizeof(arr)/sizeof(arr[0]);

arr == &arr[0]; // true（地址相同）
*(arr + 1) == arr[1]; // true（等价访问）
```

易错提醒： 不要返回栈上局部数组的地址：

```
int *bad() {
int arr[3] = {1, 2, 3};
return arr; // ❌ 函数结束 arr 消失，地址失效
}
```

记忆点：函数内部的普通变量和普通数组 → 都在栈区， 生命周期跟函数绑定。

## 7全局变量 与 static 变量的内存运行

它们不是栈变量，生命周期跟整个程序绑定。

### 示例代码

```
#include <stdio.h>

int a = 10; // 全局变量 → 初始化静态区

int *method() {
static int b = 20; // static 局部变量 → 初始化静态区
return &b; // 返回 b 的地址（合法）
}

int main() {
int *p = method();
printf("%d\n", *p); // 输出 20
return 0;
}
```

### 运行过程

初始化静态区a = 10（全局变量）b = 20，地址 0x01 栈区 method 栈帧（临时） main 栈帧p = 0x01 规则：static 局部变量不随函数返回销毁，返回其地址合法；普通局部变量地址不可返回。

### 规则对照

| 变量形式 | 位置 | 生命周期 |
| --- | --- | --- |
| `int a = 10;`（函数内） | 栈区 | 函数期间 |
| `int a = 10;`（函数外） | 初始化静态区 | 程序期间 |
| `int a;`（函数外） | 未初始化静态区 | 程序期间 |
| `static int a = 10;` | 初始化静态区 | 程序期间 |
| `static int a;` | 未初始化静态区 | 程序期间 |

### 延长变量生命周期的两种方式

1. 把变量定义在函数外面（全局变量）
2. 在变量前加 `static`（静态局部变量）

两者都进入静态区，直到程序结束才销毁。

对比反例（危险代码）：

```
int *method() {
int b = 20;
return &b; // ❌ method 结束后 b 消失
}
```

main 拿到的地址已经失效，属于返回野指针。

## 8字符串在内存中的运行情况

两种字符串定义方式，内存位置完全不同。

### 两种写法对比

`char *str = "abc";`
字符串在常量区
❌ 内容不能修改
✅ 有复用机制

`char str[] = "abc";`
字符数组在栈区
✅ 内容可以修改
❌ 每次独立创建（无复用）

### 写法一：`char *str = "abc"`

栈区str = 0xAA 常量区 0xAA'a' 'b' 'c' '\0' 结论：str 变量本身在栈；字符串字面量在常量区。 禁忌：str[0] = 'A' 试图修改常量区，行为未定义。

禁忌：

```
char *str = "abc";
str[0] = 'A'; // ❌ 修改常量区，运行时可能崩溃
```

### 常量区的复用机制

```
char *s1 = "abc";
char *s2 = "abc";
printf("%p\n", s1); // 输出地址
printf("%p\n", s2); // 输出地址（通常与 s1 相同）
```

复用逻辑： 创建 `"abc"` 时，系统先在常量区查找 — 有 → 直接复用已有地址；没有 → 创建新的字符数组。

### 修改指针 ≠ 修改字符串内容

```
char *str = "abc";
str = "aaa"; // ✅ 合法：让 str 指向新字符串
```

str = "abc" 之后 str = 0xAA"abc" str = "aaa" 之后 str = 0xBB"aaa" "abc" 仍在常量区 结论：赋新字面量只是改变 str 保存的地址，不会改写原字符串内容。

### 写法二：`char str[] = "abc"`

此时 `str` 是真正的字符数组，在栈区， `"abc"` 只是初始化数据，内容会被拷贝一份到栈上的数组里。

```
char str[] = "abc";
str[0] = 'A'; // ✅ 合法：栈区数组，可修改
printf("%s\n", str); // 输出 Abc
```

选择规则：

- 只读、只打印 → 用 `char *str = "abc";`
- 需要修改内容 → 用 `char str[] = "abc";`

## 9malloc 申请的空间在内存中的运行

第 14 章内存结构部分的收尾：动态空间在堆区。

### 示例代码

```
#include <stdio.h>
#include <stdlib.h>

int main() {
int *p = malloc(10 * sizeof(int));
free(p);
p = NULL;
return 0;
}
```

### 内存运行示意

栈区：main 栈帧p = 0x0011 堆区：0x0011 ... 共 10 个 int 空间 规则：p 本身是局部指针变量，存在栈；p 指向的动态数组存在堆，需 free。

核心规则： `p` 本身（指针变量）在栈； `malloc` 申请的那块空间在堆。

### 通过 p 能知道什么，不能知道什么

✅ 能知道

- 堆区首地址（`p` 本身的值）
- 步长（由 `int *` 类型决定 = 4 字节）

❌ 不能知道

- 堆区空间总大小
- 能存多少个元素

→ 必须自己用变量记录 size

### 堆 vs 栈 的两大核心区别

| 维度 | 栈（普通数组） | 堆（malloc） |
| --- | --- | --- |
| 空间大小 | 较小（几 MB），大数组会栈溢出 | 很大（受总内存限制） |
| 生命周期 | 函数结束自动销毁 | 不 `free` 则一直存在 |
| 跨函数使用 | 不行 | 可以（传指针即可） |

### 跨函数使用堆空间的例子

```
#include <stdio.h>
#include <stdlib.h>

int *createArray(int size) {
int *p = malloc(size * sizeof(int));
if (p == NULL) return NULL;

for (int i = 0; i < size; i++) {
p[i] = (i + 1) * 10;
}
return p; // ✅ 可以返回堆指针
}

int main() {
int size = 5;
int *arr = createArray(size);
if (arr == NULL) return 1;

for (int i = 0; i < size; i++) {
printf("%d ", arr[i]);
}

free(arr);
arr = NULL;
return 0;
}
```

为什么以后更推荐 `malloc` 定义数组？

1. 空间大：大数组不会栈溢出。
2. 生命周期长：可跨函数使用。
3. 大小灵活：长度可以运行时决定。

## C代码整理区

本章所有重要代码的规范版本，可直接复制到 IDE 运行。

### 代码 1 · malloc 标准使用流程（必背）

```
#include <stdio.h>
#include <stdlib.h>

int main() {
int size = 10;

int *p = (int *)malloc(size * sizeof(int));

if (p == NULL) {
printf("内存申请失败\n");
return 1;
}

for (int i = 0; i < size; i++) {
p[i] = (i + 1) * 10;
}

for (int i = 0; i < size; i++) {
printf("%d ", p[i]);
}
printf("\n");

free(p);
p = NULL;

return 0;
}
```

### 代码 2 · 动态数组传参给函数

```
#include <stdio.h>
#include <stdlib.h>

void printArray(int *p, int size) {
for (int i = 0; i < size; i++) {
printf("%d ", p[i]);
}
printf("\n");
}

int main() {
int size = 25;
int *p = (int *)malloc(size * sizeof(int));
if (p == NULL) return 1;

for (int i = 0; i < size; i++) {
p[i] = i + 1;
}

printArray(p, size);

free(p);
p = NULL;
return 0;
}
```

### 代码 3 · calloc 自动初始化为 0

```
#include <stdio.h>
#include <stdlib.h>

int main() {
int size = 10;
int *p = (int *)calloc(size, sizeof(int));
if (p == NULL) return 1;

for (int i = 0; i < size; i++) {
printf("%d ", p[i]); // 输出 0 0 0 ... 0
}
printf("\n");

free(p);
p = NULL;
return 0;
}
```

### 代码 4 · realloc 安全扩容

```
#include <stdio.h>
#include <stdlib.h>

int main() {
int size = 10;
int *p = (int *)malloc(size * sizeof(int));
if (p == NULL) return 1;

for (int i = 0; i < size; i++) {
p[i] = (i + 1) * 10;
}

int *temp = (int *)realloc(p, 20 * sizeof(int));
if (temp == NULL) {
printf("扩容失败\n");
free(p);
return 1;
}
p = temp;
size = 20;

for (int i = 10; i < 20; i++) {
p[i] = (i + 1) * 10;
}

for (int i = 0; i < size; i++) {
printf("%d ", p[i]);
}
printf("\n");

free(p);
p = NULL;
return 0;
}
```

### 代码 5 · 跨函数使用堆空间

```
#include <stdio.h>
#include <stdlib.h>

int *createArray(int size) {
int *p = (int *)malloc(size * sizeof(int));
if (p == NULL) return NULL;

for (int i = 0; i < size; i++) {
p[i] = (i + 1) * 10;
}
return p;
}

int main() {
int size = 5;
int *arr = createArray(size);
if (arr == NULL) return 1;

for (int i = 0; i < size; i++) {
printf("%d ", arr[i]);
}

free(arr);
arr = NULL;
return 0;
}
```

### 代码 6 · 六大区域综合对照

```
#include <stdio.h>
#include <stdlib.h>

int g1; // 未初始化静态区
int g2 = 10; // 初始化静态区

int main() {
int a = 1; // 栈区
int arr[3] = {1, 2, 3}; // 栈区

static int s1; // 未初始化静态区
static int s2 = 20; // 初始化静态区

char *str = "abc"; // str 在栈，"abc" 在常量区
char buf[] = "abc";

int *p = malloc(10 * sizeof(int));

buf[0] = 'A'; // ✅ OK
// str[0] = 'A'; // ❌ 不能改常量区

free(p);
p = NULL;
return 0;
}
```

### 代码 7 · 返回 static 变量地址（合法）

```
#include <stdio.h>

int *getNum() {
static int b = 20; // 静态区，不随函数销毁
return &b; // ✅ 合法
}

int main() {
int *p = getNum();
printf("%d\n", *p); // 输出 20
return 0;
}
```

## P练习 / 自测中心

题目默认可见，答案默认隐藏，点击展开。

练习 1 · 概念辨析：malloc 单位

以下代码申请的是多少个 `int` 的空间？

```
int *p = malloc(100);
```

点击查看答案解析

**答案：**25 个（在 `int` 为 4 字节的系统上）。

**解析：**`malloc` 的参数单位是**字节**，不是元素个数。 100 字节 ÷ 4 字节 = 25 个 `int`。

**结论：**正确写法应该是 `malloc(100 * sizeof(int))`，保证跨平台通用性。

练习 2 · 判断输出：sizeof 陷阱

以下代码输出是多少？（64 位系统，`int` 为 4 字节）

```
int arr[10];
int *p = malloc(10 * sizeof(int));

printf("%zu\n", sizeof(arr));
printf("%zu\n", sizeof(p));
```

点击查看答案解析

**答案：**

```
40
8
```

**解析：**

- `arr` 在 `sizeof` 中表示整个数组，10 × 4 = 40。
- `p` 是指针变量，`sizeof(p)` 测的是指针本身的大小， 64 位系统固定为 8 字节。

**结论：**动态数组无法通过 `sizeof(p)` 获取空间大小，必须用单独的变量记录长度。

练习 3 · 找错：危险代码

下面的函数有什么问题？

```
int *getData() {
int arr[3] = {1, 2, 3};
return arr;
}
```

点击查看答案解析

**答案：**返回了栈区局部数组的地址，属于**野指针**。

**解析：**

```
栈区：
┌──────────────────┐
│ getData 栈帧 │
│ arr[3] │ ← 函数结束后出栈，消失
└──────────────────┘

调用方拿到的地址已指向"不存在的空间"。
```

**结论：**修复方案二选一：

1. 改为 `static int arr[3] = {1,2,3};`（静态区）
2. 改为 `int *arr = malloc(3 * sizeof(int))`（堆区），由调用方 `free`

练习 4 · 内存推理：字符串在哪里

下列哪些操作是合法的？

```
char *s1 = "abc";
char s2[] = "abc";

s1[0] = 'A';
s2[0] = 'A';
s1 = "xyz";
s2 = "xyz";
```

点击查看答案解析

**答案：**B 和 C 合法，A 和 D 非法。

**解析：**

- A 错：`s1` 指向常量区，内容不能修改。
- B 对：`s2` 是栈区的字符数组，拷贝自 `"abc"`，可修改。
- C 对：让指针 `s1` 指向新的常量字符串 `"xyz"`，改变的是指针的值。
- D 错：数组名不是可修改的左值，不能对数组整体赋值。

练习 5 · 场景判断：用 malloc 还是普通数组

以下三种场景，应该用普通数组还是 `malloc`？

1. 函数内部临时用一个 10 个 `int` 的数组
2. 用户运行时才知道要存多少个数据
3. 函数内部创建一个数组，返回给调用方使用

点击查看答案解析

**答案：**

1. 普通数组（栈）—— 数量固定、函数内用、自动回收。
2. `malloc`（堆）—— 长度运行时才能决定。
3. `malloc`（堆）—— 栈数组函数结束会消失，无法跨函数使用。

**规则：** 数量固定 + 函数内用 选栈； 运行时决定大小 / 跨函数 / 大数组 选堆。

练习 6 · 代码纠错：内存泄漏

找出下面代码的两个问题：

```
int main() {
int *p = malloc(10 * sizeof(int));
p = malloc(20 * sizeof(int));

printf("%d\n", *p);

return 0;
}
```

点击查看答案解析

**问题 1：**第二次 `malloc` 把 `p` 覆盖了， 第一次申请的 10 × 4 字节再也无法释放 ——**内存泄漏**。

**问题 2：**`malloc` 申请的空间没有初始化， `*p` 打印的是**垃圾值**。

**正确写法：**

```
int *p = malloc(10 * sizeof(int));
if (p == NULL) return 1;

free(p);
p = malloc(20 * sizeof(int));
if (p == NULL) return 1;

for (int i = 0; i < 20; i++) p[i] = 0;
printf("%d\n", p[0]);

free(p);
p = NULL;
```

练习 7 · 内存区域判断

指出以下每个变量所在的内存区域：

```
int g1;
int g2 = 100;

int main() {
int a = 10;
static int b = 20;
char *s = "hello";
int *p = malloc(5 * sizeof(int));
return 0;
}
```

点击查看答案解析

| 变量 | 位置 |
| --- | --- |
| `g1` | 未初始化静态区 |
| `g2` | 初始化静态区 |
| `a` | 栈区 |
| `b` | 初始化静态区 |
| `s`（指针本身） | 栈区 |
| `"hello"` 字面量 | 常量区 |
| `p`（指针本身） | 栈区 |
| malloc 申请的 5 个 int | 堆区 |

**关键记忆：**"指针在哪里"和"指针指向哪里"是两件事。

练习 8 · realloc 地址推理

以下两次 `printf` 输出的地址一定相同吗？

```
int *p = malloc(10 * sizeof(int));
printf("%p\n", p);

p = realloc(p, 1000 * sizeof(int));
printf("%p\n", p);
```

点击查看答案解析

**答案：**不一定。可能相同，也可能不同。

**解析：**

- 如果原空间后面还有连续空闲 → 原地扩容，地址不变。
- 如果原空间后面被占用 → 系统新找一块空间，拷贝旧数据，地址改变。

**结论：**不能假设 `realloc` 返回的地址与原地址相同， 所以要用临时指针接收并判断 `NULL`。

练习 9 · 脏数据推理

以下代码的输出一定是 "10 20" 吗？

```
int *p = malloc(2 * sizeof(int));
p[0] = 10; p[1] = 20;

free(p);

printf("%d %d\n", p[0], p[1]);
```

点击查看答案解析

**答案：**不一定。属于"脏数据"，结果未定义。

**解析：**

`free` 之后空间归还系统，里面的值可能：

- 恰好还是 10 和 20（系统没来得及改）
- 变成 0
- 变成其他随机值
- 甚至程序直接崩溃

**结论：**`free` 之后的空间**一律不能访问**。 建议配合 `p = NULL;` 防御野指针。

练习 10 · 面试题：堆 vs 栈

用一句话说清楚"普通数组"和"malloc 数组"的两大核心区别。

点击查看答案解析

**参考答案：**

1. 位置不同：普通数组在栈，`malloc` 数组在堆； 栈空间小（几 MB），堆空间大（受内存限制）。
2. 生命周期不同：普通数组随函数结束自动销毁， 堆数组只要不 `free` 就一直存在，所以可以跨函数使用。

## S实战策略（考试 / 笔试 / 面试）

遇到问题的快速判断流程。

### 策略 1 · 看到 malloc，立刻想到五步

固定五步：

1. 申请：`int *p = malloc(n * sizeof(T));`
2. 判空：`if (p == NULL) return ...;`
3. 赋值：使用前必须先写入
4. 使用：`p[i]`
5. 释放：`free(p); p = NULL;`

### 策略 2 · 判断"变量在哪里"的口诀

1. 函数外 / `static` → 静态区（看有没有赋值分两种）
2. `char *s = "xxx"` 的 `"xxx"` → 常量区
3. `malloc/calloc/realloc` 申请的 → 堆区
4. 其他函数内的普通变量、数组、指针本身 → 栈区

### 策略 3 · 常见陷阱清单

陷阱 1：返回局部变量地址

```
int *f() {
int x = 10;
return &x; // ❌
}
```

→ 改成 `static` 或 `malloc`。

陷阱 2：内存泄漏

```
p = malloc(...);
p = malloc(...); // ❌ 丢失第一块
```

→ 重新赋值前先 `free`。

陷阱 3：修改常量区

```
char *s = "abc";
s[0] = 'A'; // ❌
```

→ 改成 `char s[] = "abc";`。

陷阱 4：访问脏数据

```
free(p);
printf("%d", p[0]); // ❌
```

→ `free` 后立刻 `p = NULL;`。

陷阱 5：用 sizeof 求动态数组大小

```
int *p = malloc(10 * sizeof(int));
sizeof(p); // ❌ 只是 8
```

→ 自己用 `int size` 记录。

陷阱 6：realloc 直接赋给原指针

```
p = realloc(p, new); // ❌ 失败就丢指针
```

→ 用临时指针 `temp` 接。

### 策略 4 · 常考概念辨析

| 对比项 | A | B |
| --- | --- | --- |
| malloc vs calloc | 仅申请 | 申请 + 清零 |
| 普通数组 vs malloc 数组 | 栈 / 随函数销毁 | 堆 / 手动 free |
| `char *s = "abc"` vs `char s[] = "abc"` | 常量区 / 不可改 | 栈 / 可改 |
| 局部 vs 全局 vs static 局部 | 栈 / 函数期间 | 静态区 / 程序期间 |

## ✓考前检查清单

考前 10 分钟扫一遍。

#### 【A】四大函数

能说出 malloc / calloc / realloc / free 的头文件 `<stdlib.h>`

记住 malloc 参数单位是字节，写法 `n * sizeof(T)`

知道 malloc 返回 `void *`，可强转也可不强转

知道 calloc 会初始化为 0，malloc 不会

知道 realloc 地址可能变、旧数据保留、旧空间无需 free

记住 free 后要 `p = NULL;`

#### 【B】内存结构

能画出六大区域示意图

能判断任意变量所在区域

区分"指针在哪里"和"指针指向哪里"

普通数组 / malloc 数组的两大区别

全局变量 / static 变量生命周期和程序一样

#### 【C】字符串

`char *s = "abc"` 的 `"abc"` 在常量区，不可改

`char s[] = "abc"` 在栈区，可改

常量区有复用机制

修改指针 ≠ 修改字符串内容

#### 【D】易错点

不返回局部变量地址

不重复赋值 malloc 前忘记 free

不在 free 后继续访问空间（脏数据）

不用 sizeof(p) 求动态数组大小

realloc 用临时指针接收

使用前先赋值，malloc 空间默认值是垃圾值

**C 语言一套通关 · 第 14 章 · 动态内存分配**

覆盖范围：14-01 常用函数 · 14-02 malloc 细节 · 14-03 其他三个函数细节 · 14-04 内存结构 · 14-05 变量与数组 · 14-06 全局与 static · 14-07 字符串 · 14-08 malloc 内存运行

最后更新：2026-05-09

   (function () { function setDetails(selector, open) { document.querySelectorAll(selector).forEach(function (node) { node.open = open; }); } window.expandAll = function () { setDetails('details', true); }; window.collapseAll = function () { setDetails('details', false); }; window.showAnswers = function () { setDetails('details.answer-toggle', true); }; window.hideAnswers = function () { setDetails('details.answer-toggle', false); }; window.toggleFocusMode = function () { var btn = document.getElementById('focusBtn'); var focused = document.body.classList.toggle('focus-mode'); if (btn) btn.textContent = focused ? '显示全部' : '只看重点'; }; window.printPage = function () { window.expandAll(); window.showAnswers(); window.setTimeout(function () { window.print(); }, 200); }; document.addEventListener('DOMContentLoaded', function () { document.querySelectorAll('.nav a[href^="#"]').forEach(function (a) { a.addEventListener('click', function (e) { var target = document.querySelector(this.getAttribute('href')); if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); } }); }); }); }());
