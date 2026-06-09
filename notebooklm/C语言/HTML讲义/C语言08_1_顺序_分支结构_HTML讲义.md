# C语言：顺序与分支结构

> 分类: C语言 / HTML讲义
> 来源: c/1_顺序_分支结构.html
> 提取说明: 从 HTML body 提取可见内容，保留标题、列表、表格和代码块。

# C语言：顺序与分支结构

程序不是一行一行背出来的，而是按“默认顺序执行，遇到条件就选择路径”来理解。

## 一、程序的默认执行顺序

C 程序默认按照语句出现的先后顺序执行。顺序结构是所有控制结构的基础。

```
#include <stdio.h>

int main(void) {
int a = 10;
int b = 20;
int sum = a + b;

printf("%d\n", sum);
return 0;
}
```

记忆线索：顺序结构就像做题步骤：先读入数据，再处理数据，最后输出结果。

## 二、if 语句：条件成立才执行

`if` 用来表达“如果条件成立，就执行某段代码”。条件表达式的结果为真时执行代码块，为假时跳过。

```
int score = 86;

if (score >= 60) {
printf("pass\n");
}
```

注意：判断相等要写 `==`，赋值才写 `=`。这是分支题最常见的失误之一。

## 三、if else：二选一

当条件成立和不成立都要处理时，使用 `if else`。

```
if (score >= 60) {
printf("pass\n");
} else {
printf("fail\n");
}
```

主动回忆：看到二选一题目，先把条件读成一句中文，再判断真分支和假分支分别做什么。

## 四、多分支：else if

`else if` 用于多个互斥条件。程序会从上到下检查，遇到第一个成立的分支后就不再继续判断后面的分支。

```
if (score >= 90) {
printf("A\n");
} else if (score >= 80) {
printf("B\n");
} else if (score >= 60) {
printf("C\n");
} else {
printf("D\n");
}
```

易错点：多分支条件的顺序很重要。成绩分段通常要从高到低写，否则高分可能先被低分条件截走。

## 五、switch：固定值匹配

`switch` 适合判断一个表达式等于若干固定值的情况。

```
int day = 3;

switch (day) {
case 1:
printf("Monday\n");
break;
case 2:
printf("Tuesday\n");
break;
case 3:
printf("Wednesday\n");
break;
default:
printf("Unknown\n");
break;
}
```

高频提醒：`case` 后面通常要写 `break`。不写会继续执行后面的 case，这叫“贯穿”。

## 六、考前检查清单

- 能区分 `=` 和 `==`。
- 能解释 `if`、`if else`、`else if` 的使用场景。
- 能说明 `switch` 中 `break` 的作用。
- 能根据题意判断分支条件的先后顺序。
