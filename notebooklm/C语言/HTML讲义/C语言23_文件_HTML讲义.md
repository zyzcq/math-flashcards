# C语言 · 第15章 · 文件操作 复习系统

> 分类: C语言 / HTML讲义
> 来源: c/文件.html
> 提取说明: 从 HTML body 提取可见内容，保留标题、列表、表格和代码块。

# C语言 · 第15章 · 文件操作 复习系统

覆盖范围：文件路径、转义字符、文件读写(fgetc/fgets/fread/fputc/fputs/fwrite)、读写模式、文件拷贝实战

输入流/输出流 绝对路径/相对路径 转义字符 fopen / fclose fgetc / fgets / fread fputc / fputs / fwrite r / w / a / rb / wb 文件拷贝

使用说明：点击"全部展开/收起"查看所有模块；点击"显示/隐藏答案"控制练习题解析；点击"导出 PDF"一键打印保存。

全部展开

全部收起

显示答案

隐藏答案

只看重点 / 显示全部

导出 PDF

① 总纲 ② 流与方向 ③ 路径 ④ 转义字符 ⑤ fopen/fclose ⑥ 读取三函数 ⑦ 写出三函数 ⑧ 读写模式 ⑨ 文件拷贝实战 ⑩ 代码整理区 ⑪ 练习中心 ⑫ 实战策略 ⑬ 检查清单

## ① 总纲 · 一眼看懂文件操作

核心一句话 C 语言操作文件，本质就是在"程序内存"和"硬盘文件"之间搬运数据，模板永远是三步：打开 → 读或写 → 关闭。

### 三大学习抓手

🧭 抓手1：方向

站在程序角度看：读入是输入流，写出是输出流。参照物永远是程序本身。

📂 抓手2：三步模板

fopen 打开 → 读/写函数处理数据 → fclose 关闭。不管什么函数都逃不开这三步。

⚙️ 抓手3：模式

r/w/a 控制读写行为，rb/wb/ab 操作二进制，+ 表示加强读写能力。

### 整章结构图

程序(内存) 变量 / 数组 / 缓冲区 文件(硬盘) a.txt / 图片 / 视频 输入流（读）fgetc / fgets / fread 输出流（写）fputc / fputs / fwrite 通道由 fopen 打开，用完由 fclose 关闭 （参照物：程序。读入 = 输入，写出 = 输出）

## ② 流与方向 · 判断输入输出的唯一标准

核心规则 站在程序这一侧看方向：数据进程序 = 输入流（读）；数据出程序 = 输出流（写）。

### "流"是一种比喻

程序和文件之间传输数据时，字节是一个接一个连续流动的，就像水流，所以叫"流"（stream）。

### 方向对照

| 操作 | 数据方向 | 名称 | 常用函数 |
| --- | --- | --- | --- |
| 读文件 | 文件 → 程序 | 输入流 (input) | fgetc / fgets / fread |
| 写文件 | 程序 → 文件 | 输出流 (output) | fputc / fputs / fwrite |

🚫 常见误区 很多新手以为"我把数据写到文件里，就是'输入'到文件里"——错！参照物是"程序"，不是"文件"。

💡 记忆口诀 读进程序 = 输入；写出程序 = 输出。参照物永远是程序。

## ③ 文件路径 · 程序找到文件的地图

核心规则 操作文件前必须先定位文件。路径就是"文件在电脑中的位置"，分为绝对路径和相对路径。

### 什么是路径

路径描述文件在电脑中的层级位置，就像"中国 → 北京 → 某小区 → 3号楼 → 502室"的寻人路线。

例如：`C:\Users\admin\Desktop\a.txt` 表示 C 盘下 Users 文件夹下 admin 下 Desktop 下的 a.txt。

🖥️ 小知识 桌面（Desktop）本质也是一个文件夹，位置通常在 `C:\Users\用户名\Desktop`。

### 两种路径对比

| 类型 | 是否以盘符开始 | 参照物 | 是否固定 | 示例 |
| --- | --- | --- | --- | --- |
| 绝对路径 | 是（C:、D:、E:） | 无需参照物 | 固定，永不变动 | `C:\aaa\a.txt` |
| 相对路径 | 否 | 当前项目 | 随项目变化 | `aaa\a.txt` |

绝对路径：位置固定，哪个项目都找同一个 projectA projectB projectC C:\aaa\a.txt（同一个文件） 相对路径：随当前项目变化 projectA/aaa/a.txt projectB/aaa/a.txt aaa\a.txt aaa\a.txt 写法相同 → 结果不同

⚠️ 易错点 在 C 代码字符串里写 Windows 路径时，所有 `\` 必须写成 `\\`（下一节转义字符会讲）。

## ④ 转义字符 · 反斜杠不是斜杠

核心规则 反斜杠 `\` + 一个字符 = 转义字符。作用是改变后面那个字符的原本含义。

### 为什么需要转义

字符串中有些字符有特殊含义，比如：

- `"` 是字符串的开头/结尾标志
- `\` 是转义字符的标志

如果想打印它们本身，就必须用转义方式告诉编译器"我要用它的原始样子"。

### 两大经典需求

#### 需求一：打印一个双引号 `"`

```
#include <stdio.h>

int main() {
printf("\"\n");
return 0;
}
```

#### 需求二：打印一个反斜杠 `\`

```
#include <stdio.h>

int main() {
printf("\\\n");
return 0;
}
```

理解：第一个 `\` 是"改造器"，第二个 `\` 才是真正被打印的普通反斜杠。

### 常用转义字符表

| 转义字符 | 含义 | 说明 |
| --- | --- | --- |
| `\n` | 换行 | n 被改造成"换行" |
| `\t` | 制表符 Tab | t 被改造成"Tab" |
| `\\` | 反斜杠 `\` | 路径写法的关键 |
| `\"` | 双引号 `"` | 打印引号用 |
| `\'` | 单引号 `'` | 字符里用 |
| `\0` | 空字符 | 字符串结束标志 |

### Windows 路径正确写法

```
#include <stdio.h>

int main() {
char* path = "C:\\Users\\admin\\Desktop\\a.txt";
printf("%s\n", path);
return 0;
}
```

⚠️ 易错提醒 看到 `\` 要警惕，它不是普通斜杠，是"改造器"。想打印真正的 `\`，就写 `\\`。

## ⑤ fopen / fclose · 文件操作的入口和出口

核心规则 文件操作必须先用 `fopen` 打开文件，得到 `FILE*` 文件指针；用完后必须用 `fclose` 关闭文件。

### 标准三步

1. 打开文件

`FILE* fp = fopen(路径, 模式);`

2. 读 / 写数据

根据需求选择 `fgetc`、`fgets`、`fread` 或写入函数。

3. 关闭文件

`fclose(fp);` 释放资源，确保数据落盘。

### fopen 的两个参数

| 参数 | 含义 | 示例 |
| --- | --- | --- |
| 第1个参数 | 文件路径，字符串形式 | `"C:\\Users\\admin\\Desktop\\a.txt"` |
| 第2个参数 | 操作模式，决定读/写/追加/二进制 | `"r"`、`"w"`、`"rb"` |

### 基础模板

```
#include <stdio.h>

int main() {
FILE* file = fopen("C:\\Users\\admin\\Desktop\\a.txt", "r");

if (file == NULL) {
printf("文件打开失败\\n");
return 1;
}

fclose(file);
return 0;
}
```

⚠️ 易错提醒 `FILE` 必须大写；路径中的 `\` 要写成 `\\`；`fopen` 可能失败，所以建议判断 `file == NULL`。

记忆点 有几个 `fopen`，通常就应该有几个 `fclose`。

## ⑥ 读取三函数 · fgetc / fgets / fread

核心逻辑 读取文件就是把本地文件中的数据搬到程序内存中。三种读取函数的区别在于"每次读多少"。

### 三种读取方式总览

| 函数 | 读取单位 | 结束标志 | 适合场景 |
| --- | --- | --- | --- |
| `fgetc` | 一次读一个字符 | 读不到返回 `EOF`，通常是 `-1` | 逐字符处理 |
| `fgets` | 一次读一行字符串 | 读不到返回 `NULL` | 按行读取文本 |
| `fread` | 一次读多个字节 | 读不到返回 `0` | 批量读取、二进制文件 |

**6.1 fgetc：一次读一个字符**

核心规则 `fgetc(file)` 每调用一次，就从文件中读取一个字符；读到文件末尾返回 `EOF`。

#### 标准写法

```
#include <stdio.h>

int main() {
FILE* file = fopen("C:\\Users\\admin\\Desktop\\a.txt", "r");

if (file == NULL) {
printf("文件打开失败\\n");
return 1;
}

int ch;
while ((ch = fgetc(file)) != EOF) {
printf("%c", ch);
}

fclose(file);
return 0;
}
```

为什么接收变量用 int，不用 char？ 因为 `fgetc` 读到末尾会返回 `EOF`，通常是 `-1`。如果用 `char` 接收，可能无法正确判断文件结束。

#### 读取过程示意

文件内容：ABC A B C EOF(-1) 第1次 第2次 第3次 第4次读不到

了解即可：中文乱码 如果读中文出现乱码，常见原因是文件编码和控制台编码不一致。文稿中的处理方式是把 txt 文件另存为 ANSI 编码。

**6.2 fgets：一次读一行数据**

核心规则 `fgets` 一次读取一行内容，读到的数据放进字符数组；读不到时返回 `NULL`。

#### 函数格式

```
fgets(数组名, 数组长度, 文件指针);
```

| 参数 | 含义 | 示例 |
| --- | --- | --- |
| 第1个参数 | 字符数组，用来装一行数据 | `line` |
| 第2个参数 | 数组长度，最多读取多少字符 | `sizeof(line)` |
| 第3个参数 | 文件指针 | `file` |

#### 标准写法

```
#include <stdio.h>

int main() {
FILE* file = fopen("C:\\Users\\admin\\Desktop\\a.txt", "r");

if (file == NULL) {
printf("文件打开失败\\n");
return 1;
}

char line[1024];

while (fgets(line, sizeof(line), file) != NULL) {
printf("%s", line);
}

fclose(file);
return 0;
}
```

⚠️ "一行"的真正含义 `fgets` 的"一行"是以换行符 `\n` 为准，不是以屏幕显示的一行为准。编辑器窗口太窄导致的自动换行，不算真正换行。

⚠️ 打印时不要多加换行 `fgets` 通常会把行尾的 `\n` 一起读入，所以打印时常用 `printf("%s", line);`，不要随手写成 `printf("%s\n", line);`，否则可能多空一行。

**6.3 fread：一次读多个字节**

核心规则 `fread` 按字节块读取，返回本次实际读到的元素个数；如果第二个参数是 `1`，返回值就是本次读到的字节数。

#### 函数格式

```
fread(buffer, 每个元素字节数, 元素个数, 文件指针);
```

#### 标准写法

```
#include <stdio.h>

int main() {
FILE* file = fopen("C:\\Users\\admin\\Desktop\\a.txt", "rb");

if (file == NULL) {
printf("文件打开失败\\n");
return 1;
}

char buffer[1024];
size_t bytesRead;

while ((bytesRead = fread(buffer, 1, sizeof(buffer), file)) > 0) {
for (size_t i = 0; i bytesRead; i++) {
printf("%c", buffer[i]);
}
}

fclose(file);
return 0;
}
```

#### 读取 100 字节文件，缓冲区 30 字节

文件总数据：100 字节 30字节 → 返回30 30字节 → 返回30 30字节 → 返回30 10字节 → 返回10 无 → 返回0 fread 每次尽可能读满数组，最后一次可能读不满；再次读取无数据时返回 0。

🚫 不能直接把 fread 读到的数组当字符串打印 `fread` 不会自动添加字符串结束符 `\0`。如果直接 `printf("%s", buffer)`，可能把无效残留数据也打印出来。

中文被拆开的问题 在 ANSI 编码下，一个中文通常占 2 个字节。`fread` 按字节读，可能读到"半个中文"。如果逐字节原样输出，控制台可能拼回正常中文；但如果在每个字节后加 `---` 之类的额外内容，就会导致两半无法拼接，产生乱码。

## ⑦ 写出三函数 · fputc / fputs / fwrite

核心逻辑 写文件就是把程序中的数据写到本地文件中，进行永久存储。读是 `get/read`，写是 `put/write`。

### 三种写出方式总览

| 函数 | 写出单位 | 返回值 | 适合场景 |
| --- | --- | --- | --- |
| `fputc` | 一个字符 | 成功返回写出的字符；失败返回 EOF | 单字符写入 |
| `fputs` | 一个字符串 | 成功返回非负数；失败返回 EOF | 写普通文本 |
| `fwrite` | 多个字节 | 返回实际写出的元素个数 | 批量写入、二进制写入 |

### 完整示例：三种写法一起使用

```
#include <stdio.h>

int main() {
FILE* file = fopen("C:\\Users\\admin\\Desktop\\a.txt", "w");

if (file == NULL) {
printf("文件打开失败\\n");
return 1;
}

int writtenChar = fputc(97, file);
printf("fputc 写出的字符：%c\\n", writtenChar);

int putStringResult = fputs("你好你好", file);
printf("fputs 返回值：%d\\n", putStringResult);

// 3. 一次写多个字节
char data[] = { 'a', 'b', 'c', 'd', 'e' };
size_t writtenCount = fwrite(data, sizeof(char), 5, file);
printf("fwrite 写出的元素个数：%zu\\n", writtenCount);

fclose(file);
return 0;
}
```

⚠️ 不会自动换行 文件写入不会自动帮你换行。想换行要自己写 `\n`，例如 `fputs("hello\\n", file);`。

🚫 小心 w 模式 `"w"` 模式打开已有文件时，会先清空原内容，再写入新内容。不要用它打开重要文件做测试。

## ⑧ 多种读写模式 · fopen 第二个参数决定一切

核心规则 `fopen` 的模式决定：能不能读、能不能写、是否清空文件、文件不存在时是否创建、是否按二进制处理。

### 基础模式

| 模式 | 英文含义 | 能力 | 文件不存在 | 文件已存在 |
| --- | --- | --- | --- | --- |
| `"r"` | read | 只读，不能写 | 打开失败 | 保留原内容 |
| `"w"` | write | 只写，不能读 | 创建文件 | 清空原内容 |
| `"a"` | append | 追加写 | 创建文件 | 不清空，接着写 |

### r 模式下强行写入会怎样

在 `"r"` 只读模式下，如果强行调用写函数，写入会失败。

- `fputc` 失败通常返回 `-1`
- `fputs` 失败通常返回 `-1`
- `fwrite` 没写出任何内容时返回 `0`

### w 模式三个细节

文件不存在

会创建目标文件。

文件已存在

会清空文件原内容。

文件夹不存在

不会自动创建文件夹，`fopen` 会失败。

重要细节 文件的创建、清空、追加控制，都是 `fopen` 底层完成的，不是 `fputc`、`fputs`、`fwrite` 完成的。

### a 模式：追加写出

`"a"` 表示 append，追加写出，也叫续写模式。它不会清空原内容，而是在文件末尾继续写。

### 文本模式 vs 二进制模式

| 文件类型 | 判断方式 | 常用模式 | 示例 |
| --- | --- | --- | --- |
| 文本文件 | 用记事本打开能看懂 | `r / w / a` | txt、md、c、h |
| 二进制文件 | 用记事本打开是乱码 | `rb / wb / ab` | 图片、音频、视频、压缩包 |

### 扩展模式（了解即可）

| 模式 | 含义 | 理解方式 |
| --- | --- | --- |
| `"r+"` | 可读可写 | 在 `r` 的基础上增加写 |
| `"w+"` | 可写可读 | 在 `w` 的基础上增加读，仍会清空已有文件 |
| `"a+"` | 可追加写，也可读 | 在 `a` 的基础上增加读，不清空原内容 |

记忆口诀 `r` 是读，`w` 是重写，`a` 是追加；带 `b` 操作二进制，带 `+` 增加读写能力。

## ⑨ 文件拷贝实战 · fread + fwrite

核心规则 文件拷贝 = 从源文件读一块，再写到目标文件；读多少，就写多少，直到读完。

### 为什么用 fread + fwrite

拷贝文件不应该关心它是文本、图片、音频还是视频。最通用的方法是使用二进制模式：

- `"rb"`：以二进制方式读取源文件。
- `"wb"`：以二进制方式写入目标文件。
- `fread`：每次读一块字节。
- `fwrite`：把读到的这块字节原样写出去。

### 拷贝流程图

源文件 source / rb 缓冲区 buffer char buffer[1024] 目标文件 target / wb fread fwrite 循环执行：读一块 → 写一块 → 直到 fread 返回 0

### 完整代码

```
#include <stdio.h>

int main() {
FILE* sourceFile = fopen("C:\\Users\\admin\\Desktop\\source.txt", "rb");

if (sourceFile == NULL) {
printf("源文件打开失败\\n");
return 1;
}

FILE* targetFile = fopen("C:\\Users\\admin\\Desktop\\target.txt", "wb");

if (targetFile == NULL) {
printf("目标文件打开失败\\n");
fclose(sourceFile);
return 1;
}

char buffer[1024];
size_t bytesRead;

while ((bytesRead = fread(buffer, 1, sizeof(buffer), sourceFile)) > 0) {
size_t bytesWritten = fwrite(buffer, 1, bytesRead, targetFile);

if (bytesWritten != bytesRead) {
printf("写入失败\\n");
fclose(sourceFile);
fclose(targetFile);
return 1;
}
}

fclose(sourceFile);
fclose(targetFile);

printf("文件拷贝完成\\n");
return 0;
}
```

🚫 最关键错误 `fwrite(buffer, 1, bytesRead, targetFile);` 第三个参数必须是 `bytesRead`，不能写成 `sizeof(buffer)`。最后一次读取可能没有读满整个数组。

文件夹不存在时会怎样？ `"wb"` 可以创建目标文件，但不能创建中间文件夹。如果目标路径中的文件夹不存在，`fopen` 会失败，返回 `NULL`。

## ⑩ 代码整理区 · 本章重要代码模板

**代码1：打印路径字符串**

用途：理解路径在 C 语言中以字符串形式表示，Windows 反斜杠要写成 `\\`。

```
#include <stdio.h>

int main() {
char* filePath = "C:\\Users\\admin\\Desktop\\a.txt";

printf("%s\\n", filePath);

return 0;
}
```

**代码2：使用 fgetc 逐字符读取文件**

用途：一次读取一个字符，直到 `EOF`。

```
#include <stdio.h>

int main() {
FILE* file = fopen("C:\\Users\\admin\\Desktop\\a.txt", "r");

if (file == NULL) {
printf("文件打开失败\\n");
return 1;
}

int ch;

while ((ch = fgetc(file)) != EOF) {
printf("%c", ch);
}

fclose(file);
return 0;
}
```

**代码3：使用 fgets 按行读取文件**

用途：一次读取一行文本，适合普通文本文件。

```
#include <stdio.h>

int main() {
FILE* file = fopen("C:\\Users\\admin\\Desktop\\a.txt", "r");

if (file == NULL) {
printf("文件打开失败\\n");
return 1;
}

char line[1024];

while (fgets(line, sizeof(line), file) != NULL) {
printf("%s", line);
}

fclose(file);
return 0;
}
```

**代码4：使用 fread 批量读取文件**

用途：一次读取多个字节，适合批量读取，也适合二进制文件。

```
#include <stdio.h>

int main() {
FILE* file = fopen("C:\\Users\\admin\\Desktop\\a.txt", "rb");

if (file == NULL) {
printf("文件打开失败\\n");
return 1;
}

char buffer[1024];
size_t bytesRead;

while ((bytesRead = fread(buffer, 1, sizeof(buffer), file)) > 0) {
for (size_t i = 0; i bytesRead; i++) {
printf("%c", buffer[i]);
}
}

fclose(file);
return 0;
}
```

**代码5：三种写出方式**

用途：演示 `fputc`、`fputs`、`fwrite`。

```
#include <stdio.h>

int main() {
FILE* file = fopen("C:\\Users\\admin\\Desktop\\a.txt", "w");

if (file == NULL) {
printf("文件打开失败\\n");
return 1;
}

fputc('a', file);
fputc('\\n', file);

fputs("你好你好\\n", file);

char data[] = { 'a', 'b', 'c', 'd', 'e' };
fwrite(data, sizeof(char), 5, file);

fclose(file);
return 0;
}
```

**代码6：追加写出**

用途：使用 `"a"` 模式在原文件末尾继续写入，不清空原内容。

```
#include <stdio.h>

int main() {
FILE* file = fopen("C:\\Users\\admin\\Desktop\\a.txt", "a");

if (file == NULL) {
printf("文件打开失败\\n");
return 1;
}

fputs("\\n追加的新内容", file);

fclose(file);
return 0;
}
```

**代码7：通用文件拷贝**

用途：使用 `rb + fread` 和 `wb + fwrite` 复制文件。

```
#include <stdio.h>

int main() {
FILE* sourceFile = fopen("C:\\Users\\admin\\Desktop\\source.txt", "rb");

if (sourceFile == NULL) {
printf("源文件打开失败\\n");
return 1;
}

FILE* targetFile = fopen("C:\\Users\\admin\\Desktop\\target.txt", "wb");

if (targetFile == NULL) {
printf("目标文件打开失败\\n");
fclose(sourceFile);
return 1;
}

char buffer[1024];
size_t bytesRead;

while ((bytesRead = fread(buffer, 1, sizeof(buffer), sourceFile)) > 0) {
size_t bytesWritten = fwrite(buffer, 1, bytesRead, targetFile);

if (bytesWritten != bytesRead) {
printf("写入失败\\n");
fclose(sourceFile);
fclose(targetFile);
return 1;
}
}

fclose(sourceFile);
fclose(targetFile);

printf("文件拷贝完成\\n");
return 0;
}
```

## ⑪ 练习中心 · 自测与纠错

练习目标 重点训练：路径写法、读写模式、返回值判断、按字节读写、文件拷贝时"读多少写多少"。

练习1：判断路径字符串是否正确

下面代码想打印路径 `C:\aaa\a.txt`，请判断是否正确。

```
#include <stdio.h>

int main() {
char* path = "C:\aaa\a.txt";
printf("%s\n", path);
return 0;
}
```

点击查看答案解析

**答案：**不正确。

**解析：**在 C 字符串中，反斜杠 `\` 是转义字符标志，不能直接当普通路径分隔符使用。代码里的 `\a` 会被解释成转义字符，而不是普通的 `\` 加 `a`。

**正确写法：**

```
char* path = "C:\\aaa\\a.txt";
```

**结论：**Windows 路径放进 C 字符串时，所有 `\` 都要写成 `\\`。

练习2：fgetc 的返回值为什么用 int 接收？

下面代码能否稳定判断文件结束？为什么？

```
#include <stdio.h>

int main() {
FILE* file = fopen("C:\\Users\\admin\\Desktop\\a.txt", "r");

char ch;
while ((ch = fgetc(file)) != EOF) {
printf("%c", ch);
}

fclose(file);
return 0;
}
```

点击查看答案解析

**答案：**不推荐，可能不稳定。

**解析：**`fgetc` 读取成功时返回字符，读到文件末尾时返回 `EOF`，通常是 `-1`。如果用 `char` 接收，某些环境下可能无法正确保存 `-1`，导致判断错误。

**正确写法：**

```
int ch;
while ((ch = fgetc(file)) != EOF) {
printf("%c", ch);
}
```

**结论：**`fgetc` 的返回值应该用 `int` 接收。

练习3：fgets 读取的"一行"到底是什么？

如果记事本窗口很窄，一段很长的文本在屏幕上显示成了多行，但你没有按回车。`fgets` 会把它当成几行？

点击查看答案解析

**答案：**仍然是一行。

**解析：**`fgets` 判断"一行"不是看屏幕显示，而是看文件数据里有没有真正的换行符 `\n`。窗口太窄导致的自动折行，只是显示效果，不是数据换行。

**内存/文件示意：**

```
真实文件数据：
hello hello hello hello hello\n
world\n

第一次 fgets 读取：
hello hello hello hello hello\n

第二次 fgets 读取：
world\n
```

**结论：**`fgets` 的一行以 `\n` 为准。

练习4：为什么 fread 不能直接用 %s 打印？

下面代码有什么问题？

```
#include <stdio.h>

int main() {
FILE* file = fopen("C:\\Users\\admin\\Desktop\\a.txt", "rb");

char buffer[1024];
size_t n = fread(buffer, 1, sizeof(buffer), file);

printf("%s", buffer);

fclose(file);
return 0;
}
```

点击查看答案解析

**答案：**问题在于 `fread` 读到的是字节块，不保证是 C 字符串。

**解析：**C 字符串必须以 `\0` 结尾，但 `fread` 不会自动在数据末尾添加 `\0`。如果用 `%s` 打印，`printf` 会一直向后找 `\0`，可能把无效数据也打印出来。

**正确处理：**

```
for (size_t i = 0; i < n; i++) {
printf("%c", buffer[i]);
}
```

**内存示意：**

```
buffer:
[有效数据][有效数据][有效数据][未知残留][未知残留]...
fread 返回 n，说明只有前 n 个字节有效
```

**结论：**`fread` 返回多少，就只处理多少。

练习5：w 模式会不会保留原内容？

假设 `a.txt` 原内容是 `old data`，运行下面代码后文件内容是什么？

```
#include <stdio.h>

int main() {
FILE* file = fopen("C:\\Users\\admin\\Desktop\\a.txt", "w");

fputs("new data", file);

fclose(file);
return 0;
}
```

点击查看答案解析

**答案：**文件内容变成 `new data`，原来的 `old data` 被清空。

**解析：**`"w"` 是只写模式。如果文件已经存在，`fopen` 会先清空原文件内容，再进行后续写入。

**结论：**想保留原内容并接着写，应使用 `"a"` 追加模式。

练习6：文件夹不存在时会怎样？

假设桌面上没有 `aaa` 文件夹，下面代码会成功创建 `a.txt` 吗？

```
#include <stdio.h>

int main() {
FILE* file = fopen("C:\\Users\\admin\\Desktop\\aaa\\a.txt", "w");

if (file == NULL) {
printf("文件打开失败\n");
return 1;
}

fputs("hello", file);
fclose(file);

return 0;
}
```

点击查看答案解析

**答案：**不会成功。

**解析：**`"w"` 可以在目标文件不存在时创建文件，但前提是目标文件所在的文件夹已经存在。它不会自动创建中间文件夹 `aaa`。

**结论：**文件可以不存在，但前面的文件夹路径必须存在。

练习7：文件拷贝为什么写 bytesRead？

下面文件拷贝代码中，`fwrite` 的第三个参数写成 `sizeof(buffer)` 有什么问题？

```
char buffer[1024];
size_t bytesRead;

while ((bytesRead = fread(buffer, 1, sizeof(buffer), sourceFile)) > 0) {
fwrite(buffer, 1, sizeof(buffer), targetFile);
}
```

点击查看答案解析

**答案：**最后一次可能会多写无效数据。

**解析：**如果文件大小不是 1024 的整数倍，最后一次读取通常读不满整个数组。比如最后一次只读到 452 字节，`bytesRead` 就是 452。如果还写 `sizeof(buffer)`，就会把后面未更新的残留数据也写进目标文件。

**正确写法：**

```
while ((bytesRead = fread(buffer, 1, sizeof(buffer), sourceFile)) > 0) {
fwrite(buffer, 1, bytesRead, targetFile);
}
```

**结论：**文件拷贝必须遵守：读多少，写多少。

练习8：模式辨析

请判断下面场景应该使用什么模式：

1. 只读取一个普通文本文件。
2. 把新内容写入文本文件，并清空旧内容。
3. 在旧内容后面继续追加文本。
4. 复制一张图片。

点击查看答案解析

**答案：**

1. 只读取普通文本文件：`"r"`
2. 写入并清空旧内容：`"w"`
3. 追加文本：`"a"`
4. 复制图片：源文件用 `"rb"`，目标文件用 `"wb"`

**解析：**文本文件可用 `r/w/a`；图片属于二进制文件，应该使用带 `b` 的二进制模式。

**结论：**`r` 读，`w` 重写，`a` 追加，`b` 表示二进制。

## ⑫ 实战策略 · 写题和写代码时怎么判断

### 看到"读文件"，按这个流程

快速判断流程 先确定文件类型，再确定读取单位，最后选择函数。

普通文本，逐字符处理

用 `fgetc`，例如统计字符数量。

普通文本，按行处理

用 `fgets`，例如逐行读取配置、日志。

批量处理或二进制

用 `fread`，例如复制图片、视频、压缩包。

### 看到"写文件"，按这个流程

| 需求 | 模式 | 函数 | 注意事项 |
| --- | --- | --- | --- |
| 写一个字符 | `"w"` 或 `"a"` | `fputc` | 字符可用 `'a'` 或 ASCII 值 |
| 写字符串 | `"w"` 或 `"a"` | `fputs` | 不会自动换行 |
| 写多个字节 | `"wb"` 常用 | `fwrite` | 第三个参数是元素个数 |

### 常见考点

- `fopen` 第二个参数的含义：`r`、`w`、`a`、`rb`、`wb`。
- `fgetc` 到末尾返回 `EOF`，接收变量用 `int`。
- `fgets` 读不到返回 `NULL`，并且一行以 `\n` 为准。
- `fread` 返回实际读到的元素个数，不能直接按字符串打印。
- `fwrite` 返回实际写出的元素个数，文件拷贝时写入数量必须等于本次读取数量。
- `"w"` 会清空已有文件；`"a"` 不清空，接着写。
- `"w"` 和 `"wb"` 能创建文件，但不能创建不存在的文件夹。

### 常见错误代码模式

错误1：Windows 路径只写单反斜杠 `"C:\aaa\a.txt"` 是错误写法，应该写成 `"C:\\aaa\\a.txt"`。

错误2：用 char 接收 fgetc 返回值 `char ch = fgetc(file);` 不推荐。应使用 `int ch`，因为要判断 `EOF`。

错误3：fread 后直接 printf("%s", buffer) `fread` 不保证读到的是字符串，也不会自动加 `\0`。

错误4：文件拷贝时 fwrite 写 sizeof(buffer) 最后一次读不满时会多写垃圾数据。必须写 `bytesRead`。

## ⑬ 检查清单 · 考前快速过一遍

A. 概念方向

我知道文件操作的本质是程序内存和硬盘文件之间搬数据。

我知道输入/输出的参照物是程序。

我知道读文件是输入流，写文件是输出流。

B. 路径和转义

我能区分绝对路径和相对路径。

我知道桌面 Desktop 本质上也是文件夹。

我知道 C 字符串里路径的 `\` 要写成 `\\`。

我知道 `\"` 表示普通双引号，`\\` 表示普通反斜杠。

C. 打开和关闭

我会写 `FILE* file = fopen(路径, 模式);`。

我会判断 `file == NULL`。

我知道有几个 `fopen`，通常就要有几个 `fclose`。

D. 读取函数

`fgetc` 一次读一个字符，末尾返回 `EOF`。

`fgets` 一次读一行，读不到返回 `NULL`。

`fread` 一次读多个字节，返回实际读到的元素个数。

`fread` 不能直接把数组当字符串打印。

E. 写入函数和模式

`fputc` 写一个字符。

`fputs` 写一个字符串。

`fwrite` 写多个字节。

`"r"` 只读，`"w"` 重写，`"a"` 追加。

`"w"` 会清空已有文件，`"a"` 不会清空。

`"rb"`、`"wb"` 用于二进制文件。

F. 文件拷贝

我知道文件拷贝推荐用 `rb + fread` 和 `wb + fwrite`。

我知道核心循环是：读一块，写一块。

我知道 `fwrite` 第三个参数必须写本次读取到的数量。

我知道目标文件可以不存在，但目标文件所在文件夹必须存在。

**资料主题：**C语言第15章 · 文件操作

**覆盖范围：**路径、转义字符、文件读取、文件写入、读写模式、文件拷贝实战

**最后更新时间：**2026-05-09

   function expandAll() { document.querySelectorAll("details").forEach(function(detail) { detail.open = true; }); } function collapseAll() { document.querySelectorAll("details").forEach(function(detail) { detail.open = false; }); } function showAnswers() { document.querySelectorAll(".answer-toggle").forEach(function(detail) { detail.open = true; }); } function hideAnswers() { document.querySelectorAll(".answer-toggle").forEach(function(detail) { detail.open = false; }); } function toggleFocusMode() { document.body.classList.toggle("focus-mode"); } function printPage() { expandAll(); showAnswers(); setTimeout(function() { window.print(); }, 150); }
