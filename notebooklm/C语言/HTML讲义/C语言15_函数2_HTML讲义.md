# C语言函数、常见函数与随机数复习笔记

> 分类: C语言 / HTML讲义
> 来源: c/函数2.html
> 提取说明: 从 HTML body 提取可见内容，保留标题、列表、表格和代码块。

# C语言函数、常见函数与随机数复习笔记

覆盖：定义函数、函数注意事项、math.h、time.h、随机数、猜数字小游戏

展开全部

收起全部

一键导出 PDF

## 一、定义函数的核心方法

核心方法 写函数前先问三个问题：我要干什么？需要什么？结果还要不要继续用？

| 问题 | 决定什么 | 理解 |
| --- | --- | --- |
| 我定义函数是为了干什么？ | 函数体、函数名 | 函数里面真正要做的事 |
| 干这件事需要什么？ | 形参 | 外部需要传给函数的数据 |
| 干完后调用处还要不要用结果？ | 返回值类型 | 需要继续使用就返回，不需要就用 void |

例子 1：求长方形面积并比较大小

求长方形面积需要长和宽，所以形参有两个。面积要继续用于比较，所以函数要返回面积。

```
#include <stdio.h>

double getArea(double len, double width)
{
double area = len * width;
return area;
}

int main()
{
double area1 = getArea(5.3, 2.7);
double area2 = getArea(1.5, 0.8);

if (area1 > area2)
{
printf("第一个长方形更大\n");
}
else if (area1 < area2)
{
printf("第二个长方形更大\n");
}
else
{
printf("两个长方形一样大\n");
}

return 0;
}
```

例子 2：求圆面积并比较大小

求圆面积真正需要外部提供的是半径。圆周率是固定值，不建议作为形参传入。

```
#include <stdio.h>

#define PI 3.14

double getCircleArea(double r)
{
return PI * r * r;
}

int main()
{
double area1 = getCircleArea(3.0);
double area2 = getCircleArea(5.0);

if (area1 > area2)
{
printf("第一个圆更大\n");
}
else if (area1 < area2)
{
printf("第二个圆更大\n");
}
else
{
printf("两个圆一样大\n");
}

return 0;
}
```

本节重点：形参不是越多越好，只写真正需要外部传入、会变化的数据。固定值可以写在函数内部或定义成常量。

## 二、函数的注意事项

| 注意点 | 说明 | 常见错误 |
| --- | --- | --- |
| 函数不调用就不执行 | 程序从 main 开始执行，其他函数必须被调用才执行 | 只定义函数，不调用 |
| 函数名不能重复 | C 语言不支持普通函数重名 | 写两个 sum 函数 |
| 函数不能嵌套定义 | 函数之间是平级关系 | 在 main 里面定义 fun |
| 函数写在 main 后面要声明 | 提前告诉编译器后面有这个函数 | main 先调用，后面才定义，但没声明 |
| return 后面不要写代码 | return 会结束当前函数 | return 后继续 printf |
| void 函数可以省略 return | 也可以写 return; 用来结束函数 | void 函数 return 100; |

函数声明、定义、调用的区别

```
// 函数声明：只有函数头，后面有分号
void fun();
int sum(int a, int b);

// 函数定义：有函数体
void fun()
{
printf("fun函数被执行了\n");
}

int sum(int a, int b)
{
return a + b;
}

// 函数调用
fun();
int result = sum(10, 20);
```

return、break、continue 的区别

| 关键字 | 作用范围 | 作用 |
| --- | --- | --- |
| return | 整个函数 | 结束当前函数，可返回结果 |
| break | 循环或 switch | 结束当前循环或 switch |
| continue | 循环 | 跳过本轮循环，进入下一轮 |

本节重点：函数相关报错优先检查：有没有调用、函数名是否重复、是否嵌套定义、是否提前声明、return 用法是否正确。

## 三、C 语言常见函数与头文件

头文件 C 语言把很多现成函数放在不同头文件里。使用函数前，要导入对应头文件。

| 头文件 | 常见函数 | 作用 |
| --- | --- | --- |
| stdio.h | printf、scanf | 输入输出 |
| math.h | pow、sqrt、ceil、floor、fabs | 数学计算 |
| stdlib.h | abs、labs、llabs、srand、rand | 标准库、绝对值、随机数 |
| time.h | time | 时间相关 |

学习函数不用死背：重点看函数的参数和返回值。可以查参考手册、问 AI、看 VS 鼠标悬停提示。

## 四、math.h 常见数学函数

| 函数 | 作用 | 例子 |
| --- | --- | --- |
| pow(a, b) | 求 a 的 b 次幂 | pow(2, 3) 得到 8 |
| sqrt(x) | 求平方根 | sqrt(9) 得到 3 |
| ceil(x) | 向上取整，进一法 | ceil(12.3) 得到 13 |
| floor(x) | 向下取整，去尾法 | floor(12.7) 得到 12 |
| abs(x) | 求 int 绝对值 | abs(-13) 得到 13 |

数学函数示例代码

```
#include <stdio.h>
#include <math.h>
#include <stdlib.h>

int main()
{
double res1 = pow(2, 3);
printf("2的3次幂：%lf\n", res1);

double res2 = sqrt(9);
printf("9的平方根：%lf\n", res2);

double res3 = ceil(12.3);
printf("12.3向上取整：%lf\n", res3);

double res4 = floor(12.7);
printf("12.7向下取整：%lf\n", res4);

int res5 = abs(-13);
printf("-13的绝对值：%d\n", res5);

return 0;
}
```

不同类型的绝对值函数

| 类型 | 函数 | 格式控制符 |
| --- | --- | --- |
| int | abs | %d |
| long | labs | %ld |
| long long | llabs | %lld |
| double | fabs | %lf |

注意：小数绝对值用 fabs，不要用 abs。llabs 是 C99 之后的函数。

易错点：函数名必须写准确：pow 不是 power，ceil 不是 cell，floor 不是 flow，rand 不是 round。

## 五、time.h 与 time 函数

时间戳 time(NULL) 获取的是当前时间戳：从 1970年1月1日 00:00:00 到当前时间经过的秒数。

| 知识点 | 说明 |
| --- | --- |
| 头文件 | #include <time.h> |
| 常用写法 | time(NULL) |
| NULL | 必须大写，表示不额外存储时间 |
| 返回值类型 | time_t，很多环境底层可理解成整数类型 |
| 打印方式 | 可强转 long long 后用 %lld 打印 |

```
#include <stdio.h>
#include <time.h>

int main()
{
time_t res = time(NULL);

printf("当前时间戳是：%lld\n", (long long)res);

return 0;
}
```

本节重点：time(NULL) 返回的是时间戳，不是直接显示年月日。时间戳适合程序计算时间差。

## 六、随机数基础：srand 与 rand

伪随机数 C 语言的随机数不是真正随机，而是通过数学公式计算出来的。后一个随机数依赖前一个数。

随机数计算思想可以理解为：

当前随机数 = 根据前一个数、参数和取余运算计算出来的结果。第一个数需要一个初始值，这个初始值叫种子。

| 函数 | 头文件 | 作用 |
| --- | --- | --- |
| srand(seed) | stdlib.h | 设置随机数种子 |
| rand() | stdlib.h | 获取随机数，无参数，有 int 返回值 |

获取 10 个随机数的基础代码

```
#include <stdio.h>
#include <stdlib.h>

int main()
{
srand(1);

for (int i = 1; i <= 10; i++)
{
int num = rand();
printf("%d\n", num);
}

return 0;
}
```

注意：srand 一般只设置一次，放在循环外面。rand 才是生成随机数的函数。

## 七、随机数的两个弊端与解决方法

### 弊端 1：种子不变，结果固定

如果一直写 srand(1)，每次运行得到的随机数序列通常一样。如果忘记写 srand，很多环境会默认使用种子 1。

解决：用当前时间作为种子。

```
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main()
{
srand((unsigned int)time(NULL));

for (int i = 1; i <= 10; i++)
{
int num = rand();
printf("%d\n", num);
}

return 0;
}
```

### 弊端 2：rand 默认范围不可控

rand 默认范围是 0 到 RAND_MAX。文稿环境中 RAND_MAX 是 32767，但不同环境可能不同。

生成 min 到 max 之间的随机数，包含 min 和 max：
rand() % (max - min + 1) + min

| 需求 | 代码 |
| --- | --- |
| 1 到 100 | rand() % 100 + 1 |
| 7 到 23 | rand() % 17 + 7 |
| 8 到 49 | rand() % 42 + 8 |
| 12 到 87 | rand() % 76 + 12 |
| 17 到 39，不包含 39 | rand() % 22 + 17 |

理解：rand() % 100 的结果是 0 到 99，再加 1 就变成 1 到 100。

## 八、综合练习：猜数字小游戏

这个小游戏综合使用了随机数、时间种子、键盘录入、while 循环、if 判断和 break。

| 步骤 | 代码思路 |
| --- | --- |
| 生成答案 | rand() % 100 + 1 |
| 反复猜 | while(1) |
| 读取输入 | scanf("%d", &guess) |
| 判断大小 | if / else if / else |
| 猜中结束 | break |

猜数字完整代码

```
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main()
{
srand((unsigned int)time(NULL));

int number = rand() % 100 + 1;
int guess;

while (1)
{
printf("请输入您要猜的数字：\n");
scanf("%d", &guess);

if (guess < number)
{
printf("小了\n");
}
else if (guess > number)
{
printf("大了\n");
}
else
{
printf("中了\n");
break;
}
}

return 0;
}
```

VS 注意：如果 scanf 报不安全，可以在代码最上方加 #define _CRT_SECURE_NO_WARNINGS，或者在项目属性里配置预处理器定义。

猜数字技巧：不要从 1 开始一个个猜。可以先猜 50，根据“大了”或“小了”不断缩小范围，这就是折半思想。

## 九、最终复习清单

- 函数定义 写函数前问：干什么、需要什么、结果是否继续用。
- 形参 只写真正需要外部传入的数据，固定值不要乱写成形参。
- 返回值 调用处需要继续用结果，就写具体返回值类型；不需要就写 void。
- 函数规则 不调用不执行，函数名不能重复，函数不能嵌套定义。
- 声明 函数定义在 main 后面时，要在 main 前面先声明。
- return return 会结束函数，return 后面的代码不会执行。
- 头文件 用函数前要导入对应头文件。
- math.h 掌握 pow、sqrt、ceil、floor、fabs。
- stdlib.h 掌握 abs、labs、llabs、srand、rand。
- time.h 掌握 time(NULL)，它返回时间戳。
- 随机数 srand 设置种子，rand 生成随机数。
- 时间种子 srand((unsigned int)time(NULL)) 可以让结果更随机。
- 范围公式 rand() % (max - min + 1) + min。
- 小游戏 猜数字 = 随机数 + scanf + while + if + break。

## 十、遗漏检查

| 课程内容 | 是否已覆盖 |
| --- | --- |
| 定义函数的三个问题 | 已覆盖 |
| 长方形面积与圆面积案例 | 已覆盖 |
| 函数不调用不执行 | 已覆盖 |
| 函数名不能重复 | 已覆盖 |
| 函数不能嵌套定义 | 已覆盖 |
| 函数声明与 main 后定义 | 已覆盖 |
| return 后代码无效 | 已覆盖 |
| void 函数中的 return | 已覆盖 |
| 头文件与函数查询方法 | 已覆盖 |
| math.h 五个函数 | 已覆盖 |
| 不同类型绝对值函数 | 已覆盖 |
| time 函数、NULL、time_t、时间戳 | 已覆盖 |
| 伪随机数、种子、srand、rand | 已覆盖 |
| 随机数两个弊端及解决 | 已覆盖 |
| 指定随机范围公式与练习 | 已覆盖 |
| 猜数字小游戏完整代码 | 已覆盖 |
| VS 中 scanf 配置问题 | 已覆盖 |

检查结果：当前几节课的主线知识点、代码案例、易错点、课堂练习和补充说明均已整理，没有跳过文稿中的核心知识点。

  function openAll() { document.querySelectorAll("details").forEach(function(item) { item.open = true; }); } function closeAll() { document.querySelectorAll("details").forEach(function(item) { item.open = false; }); }
