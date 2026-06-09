# C语言结构体复习系统

> 分类: C语言 / HTML讲义
> 来源: c/结构体.html
> 提取说明: 从 HTML body 提取可见内容，保留标题、列表、表格和代码块。

# C语言结构体复习系统

这是一份把“结构体定义、结构体数组、typedef 起别名、结构体作为函数参数、结构体嵌套、投票选举综合练习、内存对齐”整合在一起的复习工具。 学习时建议先看总纲，再逐个展开模块，最后用演练中心自测。

结构体总纲 必须掌握规则 案例演练 易错提醒 严重错误

全部展开

全部收起

只看重点 / 显示全部

显示答案

隐藏答案

导出 PDF

总方法论 结构体基础 结构体数组 typedef 起别名 函数参数传递 结构体嵌套 投票选举案例 内存对齐 演练中心 实战策略 最终清单

## 总方法论：结构体到底在学什么？

结构体的核心思想：把“属于同一个对象的多种数据”组合成一个整体，再用变量、数组、函数、指针去管理它。

### 1. 建类型

用 `struct` 自定义一种新类型，例如学生、景点、联系方式、游戏人物。

### 2. 建变量 / 数组

一个结构体变量表示一个对象；结构体数组表示多个同类对象。

### 3. 访问和修改

普通结构体用 `.`，结构体指针推荐用 `->`。

学习顺序：先理解“结构体是自定义类型”，再掌握“数组批量管理对象”，之后学习“函数传值和传地址”，最后理解“嵌套与内存对齐”。

了解即可：不同系统、编译器、编译选项可能影响结构体内存对齐细节。当前资料主要按常见 Windows 64 位环境讲解：`char` 1 字节，`int` 4 字节，`double` 8 字节。

## 模块 1：结构体基础

当一个对象需要多个不同类型的数据共同描述时，就应该考虑使用结构体。

例如一个学生可能有姓名、年龄、性别、身高。用普通变量可以写，但如果有很多学生，变量会迅速变得混乱。 结构体可以把这些信息组合成一个新的自定义类型。

```
struct Student
{
char name[100];
int age;
char gender;
double height;
};
```

结构体定义位置

结构体可以定义在函数里面，也可以定义在函数外面。

| 位置 | 特点 |
| --- | --- |
| 函数里面 | 局部定义，只能在当前函数中使用。 |
| 函数外面 | 全局定义，多个函数都可以使用，实际学习和开发中更常见。 |

结构体变量创建与成员访问

未起别名时，创建变量要写完整类型：

```
struct Student stu;
```

访问成员使用点号：

```
stu.age = 18;
stu.gender = 'M';
stu.height = 1.75;
```

严重易错：字符数组不能在定义后直接用等号整体赋值。

```
stu.name = "张三"; // 错误
```

应该使用 `strcpy`：

```
#include <string.h>

strcpy(stu.name, "张三");
```

基础完整代码：

```
#include <stdio.h>
#include <string.h>

struct Student
{
char name[100];
int age;
char gender;
double height;
};

int main()
{
struct Student stu;

strcpy(stu.name, "张三");
stu.age = 18;
stu.gender = 'M';
stu.height = 1.75;

printf("姓名：%s\n", stu.name);
printf("年龄：%d\n", stu.age);
printf("性别：%c\n", stu.gender);
printf("身高：%.2f\n", stu.height);

return 0;
}
```

本模块记忆点：结构体是自定义数据类型；成员可以是不同类型；创建变量时未起别名要写 `struct 结构体名 变量名`；访问成员用点号。

## 模块 2：结构体数组

如果一个结构体变量表示一个对象，那么结构体数组就表示多个同类对象。

例如一个学生结构体可以表示一个学生。如果有三个学生，就可以用结构体数组统一管理，而不是写很多零散变量。

```
struct Student
{
char name[100];
int age;
};

struct Student stuArr[3] = {
{"张三", 23},
{"李四", 24},
{"王五", 25}
};
```

结构体数组如何遍历？

`stuArr[i]` 表示当前遍历到的学生，访问其成员仍然用点号。

```
for (int i = 0; i < 3; i++)
{
printf("姓名：%s，年龄：%d\n", stuArr[i].name, stuArr[i].age);
}
```

易错提醒：不能写 `stuArr.name`。因为 `stuArr` 是数组，不是某一个学生。必须先通过下标取出具体元素：`stuArr[i].name`。

本模块记忆点：结构体数组的格式是 `struct 结构体名 数组名[长度]`；数组元素是结构体；访问成员要先取下标，再点成员。

## 模块 3：typedef 起别名

`typedef` 的作用是给已有类型起一个新名字，让结构体用起来更简洁。

未起别名时，每次定义结构体变量都要写 `struct Student`。如果结构体名字很长，代码会显得啰嗦。 使用 `typedef` 后，可以像使用普通类型一样使用结构体。

```
typedef struct Student
{
char name[100];
int age;
} Student;

Student stu = {"张三", 23};
```

正式名字可以省略吗？

可以。下面这种写法只保留别名，也能正常创建变量：

```
typedef struct
{
char name[100];
int age;
} Student;
```

初学时建议保留正式名字，便于理解：`struct Student` 是原名，最后的 `Student` 是别名。

游戏人物示例：

```
#include <stdio.h>

typedef struct GameRole
{
char name[100];
int attack;
int defense;
int blood;
} GameRole;

int main()
{
GameRole arr[3] = {
{"泰罗", 100, 90, 500},
{"雷欧", 90, 80, 450},
{"艾迪", 120, 70, 600}
};

for (int i = 0; i < 3; i++)
{
printf("名字：%s，攻击力：%d，防御力：%d，血量：%d\n",
arr[i].name, arr[i].attack, arr[i].defense, arr[i].blood);
}

return 0;
}
```

易错提醒：别名可以起得很短，例如 `S`、`M`，但更推荐 `Student`、`GameRole` 这种见名知意的名字。

本模块记忆点：`typedef struct 原结构体名 { 成员列表; } 别名;`。起别名后，创建变量可以直接写 `别名 变量名`。

## 模块 4：结构体作为函数参数

结构体作为函数参数有两种传法：传值改副本，传地址改原数据。

### 传值

```
method(stu);
```

函数接收到的是一份复制品。函数里修改，不影响 `main` 中的原变量。

### 传地址

```
method2(&stu);
```

函数接收到的是原变量地址。通过指针修改，会影响 `main` 中的原变量。

为什么传值修改失败？

当函数形参写成 `S st` 时，`st` 是新变量，相当于把 `stu` 的数据复制给它。

```
void method(S st)
{
strcpy(st.name, "张三");
st.age = 23;
}
```

这里修改的是 `st`，不是 `main` 中的 `stu`。

如何通过地址修改原结构体？

函数参数写成结构体指针：

```
void method2(S *p)
{
scanf("%s", p->name);
scanf("%d", &(p->age));
}
```

`p->name` 等价于 `(*p).name`，更简洁。

scanf 细节：输入字符串数组不用加 `&`，因为数组名通常会退化为首元素地址；输入普通 `int` 要加 `&`。

```
scanf("%s", p->name);
scanf("%d", &(p->age));
```

声明位置：如果函数声明用到了结构体别名，函数声明必须写在结构体定义之后，否则编译器还不知道这个类型是什么。

完整对比代码：

```
#include <stdio.h>
#include <string.h>

typedef struct Student
{
char name[100];
int age;
} S;

void method(S st);
void method2(S *p);

int main()
{
S stu;
strcpy(stu.name, "aaa");
stu.age = 0;

method(stu);
printf("传值后：%s，%d\n", stu.name, stu.age);

method2(&stu);
printf("传地址后：%s，%d\n", stu.name, stu.age);

return 0;
}

void method(S st)
{
strcpy(st.name, "张三");
st.age = 23;
}

void method2(S *p)
{
strcpy(p->name, "李四");
p->age = 24;
}
```

本模块记忆点：想让函数修改原结构体，就传地址；结构体指针访问成员推荐使用 `->`。

## 模块 5：结构体嵌套

如果结构体的某个成员本身也是复杂对象，就可以让这个成员成为另一个结构体。

例如学生有姓名、年龄、性别、身高，这些是普通成员；但“联系方式”本身又包含手机号和邮箱，所以可以单独定义为结构体。

```
struct Message
{
char phone[12];
char mail[100];
};

struct Student
{
char name[100];
int age;
char gender;
double height;
struct Message msg;
};
```

定义顺序：`Student` 里面用到了 `Message`，所以必须先定义 `Message`，再定义 `Student`。

嵌套成员如何赋值？

访问嵌套成员要一层一层点下去：

```
strcpy(stu.msg.phone, "13112345678");
strcpy(stu.msg.mail, "12345678@qq.com");
```

`stu.msg.phone` 的含义是：学生 `stu` 的联系方式 `msg` 里的手机号 `phone`。

嵌套结构体如何批量初始化？

结构体嵌套了，大括号也最好嵌套。

```
struct Student stu = {
"李四",
24,
'F',
1.65,
{"13112347890", "5678@qq.com"}
};
```

外层大括号对应 `Student`，内层大括号对应 `Message`。

易错提醒：不要写 `stu.phone`。手机号不是直接属于学生，而是属于学生里面的联系方式：`stu.msg.phone`。

本模块记忆点：谁被嵌套，谁先定义；访问嵌套成员连续点；嵌套初始化时大括号也嵌套。

## 模块 6：综合练习——投票选举

用结构体数组管理多个景点，用随机数模拟 80 名学生投票，再找出票数最多的景点。

题目要求：班级从 A、B、C、D 四个景点中选择一个，80 名学生投票，随机数模拟投票。 如果多个景点票数相同，优先级为 `A > B > C > D`。

### 景点结构体

```
struct Spot
{
char name[100];
int count;
};
```

### 景点数组

```
struct Spot arr[4] = {
{"A", 0},
{"B", 0},
{"C", 0},
{"D", 0}
};
```

choose 为什么有两层含义？

`rand() % 4` 得到 `0、1、2、3`。它既表示投票结果，也刚好表示数组下标。

```
int choose = rand() % 4;
arr[choose].count++;
```

如果 `choose == 2`，表示投给 C，同时 `arr[2]` 也是 C 景点，所以给 C 加一票。

并列时如何处理优先级？

先找到最大票数 `max`，再从数组开头找第一个票数等于 `max` 的景点。

```
for (int i = 0; i < 4; i++)
{
if (arr[i].count == max)
{
printf("投票最多的景点为：%s\n", arr[i].name);
break;
}
}
```

数组顺序是 A、B、C、D，从前往后找，第一个最大值自然就是优先级最高的。

完整代码：

```
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

struct Spot
{
char name[100];
int count;
};

int main()
{
struct Spot arr[4] = {
{"A", 0},
{"B", 0},
{"C", 0},
{"D", 0}
};

srand((unsigned int)time(NULL));

for (int i = 0; i < 80; i++)
{
int choose = rand() % 4;
arr[choose].count++;
}

printf("四个景点的投票情况：\n");
for (int i = 0; i < 4; i++)
{
printf("%s：%d票\n", arr[i].name, arr[i].count);
}

int max = arr[0].count;
for (int i = 1; i < 4; i++)
{
if (arr[i].count > max)
{
max = arr[i].count;
}
}

for (int i = 0; i < 4; i++)
{
if (arr[i].count == max)
{
printf("投票最多的景点为：%s，共计%d张票\n", arr[i].name, arr[i].count);
break;
}
}

return 0;
}
```

本模块记忆点：本题核心是 `arr[choose].count++`；并列优先级通过“数组顺序 + 找到后 break”实现。

## 模块 7：结构体内存对齐

结构体大小不是成员大小简单相加；成员之间和结构体末尾可能会自动填充空白字节。

在常见 Windows 64 位环境中，`double` 占 8 字节，`char` 占 1 字节，`int` 占 4 字节。 但下面这个结构体通常不是 14 字节，而是 24 字节。

```
struct Num
{
double a;
char b;
int c;
char d;
};
```

基本规则：变量的首地址要尽量是自身类型大小的整数倍。结构体总大小还要是最大成员类型大小的整数倍。

为什么 double + char + int + char 是 24 字节？

| 地址范围 | 内容 | 说明 |
| --- | --- | --- |
| 0 至 7 | `double a` | 0 能被 8 整除，占 8 字节。 |
| 8 | `char b` | 8 能被 1 整除，占 1 字节。 |
| 9 至 11 | 空白填充 | `int c` 不能从 9 开始，因为 9 不能被 4 整除。 |
| 12 至 15 | `int c` | 12 能被 4 整除，占 4 字节。 |
| 16 | `char d` | 16 能被 1 整除，占 1 字节。 |
| 17 至 23 | 空白填充 | 总大小要是最大成员 `double` 的 8 的整数倍，所以补到 24。 |

调整成员顺序为什么可能变成 16 字节？

```
struct Num
{
double a;
char b;
char d;
int c;
};
```

`double a` 占 0 至 7，`char b` 占 8，`char d` 占 9。 `int c` 不能从 10 开始，所以补 10、11，从 12 开始放到 15。总大小刚好 16，是 8 的整数倍。

老师强调的细节：补空白字节不会改变成员本身大小。比如 `char b` 后面补了 3 个空白字节，`b` 本身仍然只占 1 字节。

写结构体的小心得：把小类型尽量放在一起，把大类型放在一起，通常能减少填充字节，节约空间。

验证代码：

```
#include <stdio.h>

struct Num1
{
double a;
char b;
int c;
char d;
};

struct Num2
{
double a;
char b;
char d;
int c;
};

int main()
{
printf("Num1大小：%zu\n", sizeof(struct Num1));
printf("Num2大小：%zu\n", sizeof(struct Num2));

return 0;
}
```

本模块记忆点：成员按自身大小对齐；结构体总大小按最大成员大小对齐；成员顺序会影响总大小。

## 练习 / 案例演练中心

练习 1：结构体基础定义

定义一个学生结构体，包含姓名、年龄、性别、身高，并创建一个学生变量输出。

点击查看答案解析

**答案：**使用 `struct Student` 定义类型，用 `strcpy` 给姓名赋值，用点号访问成员。

```
#include <stdio.h>
#include <string.h>

struct Student
{
char name[100];
int age;
char gender;
double height;
};

int main()
{
struct Student stu;
strcpy(stu.name, "张三");
stu.age = 18;
stu.gender = 'M';
stu.height = 1.75;

printf("%s %d %c %.2f\n", stu.name, stu.age, stu.gender, stu.height);
return 0;
}
```

**解析：**姓名是字符数组，定义后不能用 `=` 直接赋字符串，必须用 `strcpy`。其他基本类型成员可以直接赋值。

练习 2：结构体数组遍历

下面代码中，如何输出三个学生的信息？

```
struct Student arr[3] = {
{"张三", 23},
{"李四", 24},
{"王五", 25}
};
```

点击查看答案解析

**答案：**

```
for (int i = 0; i < 3; i++)
{
printf("姓名：%s，年龄：%d\n", arr[i].name, arr[i].age);
}
```

**解析：**`arr[i]` 表示当前学生，`arr[i].name` 才是当前学生的姓名。不能写 `arr.name`。

练习 3：传值和传地址判断

如果函数写成 `void change(S st)`，在函数里修改 `st.age`，会不会影响 `main` 里的 `stu.age`？如果想影响，应该怎么写？

点击查看答案解析

**答案：**不会影响。传值时函数接收的是副本。想修改原数据，应传地址：`change(&stu)`，函数参数写成 `void change(S *p)`。

```
void change(S *p)
{
p->age = 23;
}
```

**解析：**传值是复制数据；传地址是把原变量的位置交给函数。通过指针找到原变量，修改才会保留下来。

练习 4：结构体嵌套访问

已知学生结构体里有 `struct Message msg;`，联系方式中有 `phone` 和 `mail`，如何输出手机号？

点击查看答案解析

**答案：**

```
printf("%s\n", stu.msg.phone);
```

**解析：**`phone` 不直接属于 `stu`，而是属于 `stu` 里面的 `msg`，所以要连续使用点号。

练习 5：投票选举核心代码

四个景点保存在 `arr[4]` 中，如何用随机数模拟 80 人投票？

点击查看答案解析

**答案：**

```
srand((unsigned int)time(NULL));

for (int i = 0; i < 80; i++)
{
int choose = rand() % 4;
arr[choose].count++;
}
```

**解析：**`choose` 的值是 0 到 3，既代表投给哪个景点，也代表数组下标。`arr[choose].count++` 表示给对应景点加一票。

练习 6：结构体内存对齐

在常见 64 位环境下，下面结构体为什么通常是 24 字节，而不是 14 字节？

```
struct Num
{
double a;
char b;
int c;
char d;
};
```

点击查看答案解析

**答案：**因为结构体存在内存对齐。`double` 放 0 至 7，`char b` 放 8，`int c` 不能从 9 开始，要补到 12；`char d` 放 16；最后总大小要是最大成员 `double` 的 8 的整数倍，所以补到 24。

**解析：**成员之间和结构体末尾都可能补空白字节。补空白字节不会让 `char` 自己变大，它仍然是 1 字节。

## 考场攻略 / 实战策略

### 看到结构体题，先判断类型

题目是让你定义一个对象，还是让你管理多个对象？一个对象用结构体变量，多个对象优先考虑结构体数组。

### 看到函数修改结构体，先问能不能改原数据

如果要求函数修改原结构体，一般要传地址，用结构体指针接收。

### 看到嵌套结构体，先画层级

例如 `stu.msg.phone`，不要跨层访问。谁包含谁，就一层一层点下去。

### 看到 sizeof 结构体，别直接相加

先按成员顺序摆放，再考虑末尾补齐。成员顺序不同，大小可能不同。

常见错误集中处理：

错误 1：`stu.name = "张三";`。字符数组定义后不能这样赋值。

错误 2：`Student stu;`。如果没有 `typedef`，应该写 `struct Student stu;`。

错误 3：`arr.name`。结构体数组要先取元素：`arr[i].name`。

错误 4：`*p.age`。结构体指针访问成员推荐写 `p->age`。

## 最终检查清单

### 结构体基础

我知道结构体是自定义数据类型。

我会用 `struct` 定义结构体。

我知道未起别名时要写 `struct Student stu;`。

我知道访问成员用点号。

我知道字符数组赋值要用 `strcpy`。

### 数组与别名

我会定义结构体数组。

我知道 `arr[i]` 才是某个具体结构体元素。

我会用 `typedef struct` 起别名。

我知道别名要见名知意。

### 函数与嵌套

我能区分传值和传地址。

我知道传值修改副本，不影响原变量。

我知道传地址要用结构体指针接收。

我会用 `p->成员名` 访问结构体指针成员。

我知道嵌套结构体要先定义被嵌套的结构体。

### 综合与内存对齐

我理解投票案例中的 `arr[choose].count++`。

我会用数组顺序和 `break` 处理并列优先级。

我知道结构体大小不是成员大小简单相加。

我知道成员首地址要按自身大小对齐。

我知道结构体总大小要按最大成员大小对齐。

**资料主题：**C语言结构体章节复习系统

**覆盖范围：**结构体定义与使用、结构体数组、typedef 起别名、结构体作为函数参数、结构体嵌套、投票选举综合练习、结构体内存对齐。

**最后更新时间：**2026-05-07

   function expandAll() { document.querySelectorAll("details").forEach(function(detail) { detail.open = true; }); } function collapseAll() { document.querySelectorAll("details").forEach(function(detail) { detail.open = false; }); } function showAnswers() { document.querySelectorAll("details.answer-toggle").forEach(function(detail) { detail.open = true; }); } function hideAnswers() { document.querySelectorAll("details.answer-toggle").forEach(function(detail) { detail.open = false; }); } function toggleFocusMode() { document.body.classList.toggle("focus-mode"); } function printPage() { expandAll(); showAnswers(); window.print(); }
