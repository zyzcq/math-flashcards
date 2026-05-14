from __future__ import annotations

import html
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
RAW_DIR = ROOT / "文稿" / "数据结构"
OUT_DIR = ROOT / "output"
LESSON_DIR = OUT_DIR / "lessons"
INTERMEDIATE_DIR = OUT_DIR / "intermediate"


def slugify(text: str) -> str:
    mapping = {
        "开篇": "intro",
        "数据结构在学什么": "what-is-data-structure",
        "数据结构的基本概念": "basic-concepts",
        "算法的基本概念": "algorithm-basics",
        "算法的时间复杂度": "time-complexity",
        "算法的空间复杂度": "space-complexity",
        "线性表的定义和基本操作": "linear-list-basics",
        "顺序表的定义": "sequential-list-definition",
        "顺序表的插入删除": "sequential-list-insert-delete",
        "顺序表的查找": "sequential-list-search",
        "单链表的定义": "singly-linked-list-definition",
        "单链表的插入删除": "singly-linked-list-insert-delete",
        "单链表的查找": "singly-linked-list-search",
        "单链表的建立": "singly-linked-list-build",
        "双链表": "doubly-linked-list",
        "循环链表": "circular-linked-list",
        "静态链表": "static-linked-list",
        "顺序表和链表的比较": "sequence-vs-linked-list",
    }
    for key, value in mapping.items():
        if key in text:
            return value
    s = re.sub(r"[^A-Za-z0-9]+", "-", text).strip("-").lower()
    return s or "lesson"


def section_id(title: str, index: int) -> str:
    return f"sec-{index:02d}-{slugify(title)[:30]}"


def clean_filename(name: str) -> str:
    name = re.sub(r"[\\/:*?\"<>|]+", "_", name)
    name = re.sub(r"\s+", "_", name.strip())
    return name


def text_to_paragraphs(*items: str) -> list[str]:
    return [item.strip() for item in items if item.strip()]


def make_section(heading: str, paragraphs: list[str], key: str, highlights: list[str] | None = None, svg_refs: list[str] | None = None) -> dict:
    return {
        "heading": heading,
        "paragraphs": paragraphs,
        "highlights": highlights or [],
        "keyPoint": key,
        "svgRefs": svg_refs or [],
    }


def code_block(cid: str, title: str, desc: str, code: str, linked: str = "") -> dict:
    return {
        "id": cid,
        "title": title,
        "language": "c",
        "description": desc,
        "code": code.strip("\n"),
        "linkedSectionId": linked,
    }


def quiz(question: str, options: list[str], answer: str, explanation: str) -> dict:
    return {
        "question": question,
        "options": options,
        "answer": answer,
        "explanation": explanation,
    }


def asset(aid: str, title: str, purpose: str, typ: str, desc: str) -> dict:
    return {
        "id": aid,
        "title": title,
        "purpose": purpose,
        "type": typ,
        "description": desc,
    }


COMMON_CODE = {
    "seq_def": r"""
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>

#define InitSize 10
typedef int ElemType;

typedef struct {
    ElemType *data;
    int length;
    int maxSize;
} SqList;

bool InitList(SqList *L) {
    L->data = (ElemType *)malloc(sizeof(ElemType) * InitSize);
    if (L->data == NULL) {
        return false;
    }
    L->length = 0;
    L->maxSize = InitSize;
    return true;
}

bool IncreaseSize(SqList *L, int len) {
    ElemType *old = L->data;
    ElemType *newData = (ElemType *)malloc(sizeof(ElemType) * (L->maxSize + len));
    if (newData == NULL) {
        return false;
    }
    for (int i = 0; i < L->length; ++i) {
        newData[i] = old[i];
    }
    L->data = newData;
    L->maxSize += len;
    free(old);
    return true;
}

void DestroyList(SqList *L) {
    free(L->data);
    L->data = NULL;
    L->length = 0;
    L->maxSize = 0;
}
""",
    "seq_ops": r"""
#include <stdbool.h>
#define MaxSize 50
typedef int ElemType;

typedef struct {
    ElemType data[MaxSize];
    int length;
} SqList;

bool ListInsert(SqList *L, int i, ElemType e) {
    if (i < 1 || i > L->length + 1) {
        return false;
    }
    if (L->length >= MaxSize) {
        return false;
    }
    for (int j = L->length; j >= i; --j) {
        L->data[j] = L->data[j - 1];
    }
    L->data[i - 1] = e;
    L->length++;
    return true;
}

bool ListDelete(SqList *L, int i, ElemType *e) {
    if (i < 1 || i > L->length) {
        return false;
    }
    *e = L->data[i - 1];
    for (int j = i; j < L->length; ++j) {
        L->data[j - 1] = L->data[j];
    }
    L->length--;
    return true;
}
""",
    "link_def": r"""
#include <stdbool.h>
#include <stdlib.h>

typedef int ElemType;

typedef struct LNode {
    ElemType data;
    struct LNode *next;
} LNode, *LinkList;

bool InitList(LinkList *L) {
    *L = (LNode *)malloc(sizeof(LNode));
    if (*L == NULL) {
        return false;
    }
    (*L)->next = NULL;
    return true;
}

bool Empty(LinkList L) {
    return L->next == NULL;
}
""",
    "link_insert_delete": r"""
#include <stdbool.h>
#include <stdlib.h>

typedef int ElemType;
typedef struct LNode {
    ElemType data;
    struct LNode *next;
} LNode, *LinkList;

LNode *GetElem(LinkList L, int i) {
    if (i < 0) {
        return NULL;
    }
    LNode *p = L;
    int j = 0;
    while (p != NULL && j < i) {
        p = p->next;
        j++;
    }
    return p;
}

bool InsertNextNode(LNode *p, ElemType e) {
    if (p == NULL) {
        return false;
    }
    LNode *s = (LNode *)malloc(sizeof(LNode));
    if (s == NULL) {
        return false;
    }
    s->data = e;
    s->next = p->next;
    p->next = s;
    return true;
}

bool ListInsert(LinkList L, int i, ElemType e) {
    if (i < 1) {
        return false;
    }
    LNode *p = GetElem(L, i - 1);
    return InsertNextNode(p, e);
}

bool ListDelete(LinkList L, int i, ElemType *e) {
    if (i < 1) {
        return false;
    }
    LNode *p = GetElem(L, i - 1);
    if (p == NULL || p->next == NULL) {
        return false;
    }
    LNode *q = p->next;
    *e = q->data;
    p->next = q->next;
    free(q);
    return true;
}
""",
}


LESSONS: list[dict] = [
    {
        "number": "002",
        "chapter": "第一章 绪论",
        "source_prefix": "002 ",
        "title": "1.0 开篇：数据结构在学什么",
        "subtitle": "把现实世界的问题信息化，并用计算机高效处理",
        "objectives": [
            "理解数据结构课程关注的两个核心问题：表示信息与高效处理信息。",
            "能把现实场景抽象为变量、数组、队列、图等数据组织形式。",
            "知道数据结构与 C 语言、算法、计算机组成、操作系统、计算机网络之间的关系。",
        ],
        "sections": [
            make_section(
                "从现实世界到计算机中的数据",
                text_to_paragraphs(
                    "数据结构这门课首先要解决的是：怎样用程序代码把现实世界中的问题信息化。金钱可以被表示为数值，排队可以被表示为一组有先后关系的数据，社交网络中的关注关系则需要表达用户之间更复杂的连接关系。",
                    "信息化不是单纯把东西录入电脑，而是要选出合适的数据元素、数据项以及它们之间的关系。只有把现实对象变成计算机能识别和处理的数据，后续的查找、排序、插入、删除、推荐等操作才有基础。",
                ),
                "数据结构的第一层意义是建模：把现实对象抽象成数据元素，把对象之间的联系抽象成结构。",
                ["现实对象进入程序后，需要变成数据、关系和操作。", "不同场景需要不同的数据组织方式。"],
                ["002-info-flow", "002-real-world-model"],
            ),
            make_section(
                "信息化之后还要追求高效处理",
                text_to_paragraphs(
                    "把现实问题信息化只是第一步。真正产生价值的是让计算机高效处理这些信息，例如排队叫号能节省顾客等待成本，社交网络能快速维护和查询用户关系。",
                    "同样是表示排队，用数组、链表、队列等方式实现，插入、删除、查找的效率会不同。数据结构课程会不断比较这些方案，让我们知道在什么场景下选择哪种结构更合适。",
                ),
                "数据结构不仅关心能不能表示问题，还关心处理这些数据是否高效。",
                ["好的数据组织方式能降低时间和空间开销。"],
                ["002-efficiency"],
            ),
            make_section(
                "与计算机专业基础课的关系",
                text_to_paragraphs(
                    "C 语言提供了变量、数组、结构体、指针、动态内存等表达工具；数据结构则教我们如何把这些工具组织成能解决问题的数据模型。",
                    "计算机组成原理帮助理解 CPU、内存等硬件如何工作；操作系统帮助理解系统如何管理资源；计算机网络解释不同设备之间如何传递信息。数据结构位于应用开发的核心位置，因为多数应用都在组织并处理数据。",
                ),
                "C 语言是表达工具，数据结构是组织数据的思路，算法是在结构之上处理数据的方法。",
                ["数据结构连接了编程语言和现实应用。"],
                ["002-course-map"],
            ),
        ],
        "codeBlocks": [
            code_block(
                "code-002-model",
                "用结构体表示排队取号信息",
                "原课用排队系统说明信息化。这里把一波顾客抽象为一个数据元素，字段就是数据项。",
                r"""
#include <stdio.h>

typedef struct {
    int ticketNo;
    int people;
    int takeTimeMinute;
} CustomerTicket;

int main(void) {
    CustomerTicket t = { 18, 4, 12 };
    printf("号数:%d 人数:%d 取号时间:%d分钟\n",
           t.ticketNo, t.people, t.takeTimeMinute);
    return 0;
}
""",
            )
        ],
        "mistakes": [
            {"title": "把数据结构理解成只会写代码", "detail": "数据结构更重要的是抽象现实关系，代码只是实现这种抽象的工具。"},
            {"title": "只关注能否存储，不关注效率", "detail": "同一批数据可以有多种存储方式，后续操作的时间和空间代价可能相差很大。"},
            {"title": "忽视 C 语言基础", "detail": "数组、结构体、指针和 malloc/free 是学习后续顺序表、链表的基础。"},
        ],
        "summary": [
            "数据结构研究如何表示现实信息，以及如何高效处理这些信息。",
            "变量、数组、结构体、指针等 C 语言工具会在后续课程中被组合成各种数据结构。",
            "理解数据结构能帮助我们更好地理解信息化应用背后的数据组织方式。",
        ],
        "quiz": [
            quiz("数据结构课程首先关注的核心问题是什么？", ["A. 如何安装编译器", "B. 如何把现实问题抽象为可处理的数据及关系", "C. 如何设计网页动画", "D. 如何背诵所有函数名"], "B", "课程开篇强调的是现实世界问题的信息化，以及后续高效处理。"),
            quiz("排队叫号系统中的一波顾客更适合作为什么？", ["A. 一个数据元素", "B. 一个编译器", "C. 一个操作系统", "D. 一个网络协议"], "A", "一波顾客包含号数、人数、取号时间等数据项，整体可作为一个数据元素。"),
            quiz("为什么仅用一个 float 变量不能表达微博关注关系？", ["A. float 只能表示数值", "B. float 不能输出", "C. float 一定占 8 字节", "D. float 不能出现在结构体中"], "A", "关注关系涉及用户之间的连接，属于关系结构，不是一个简单数值。"),
        ],
        "svgAssets": [
            asset("002-info-flow", "信息化处理流程", "展示现实对象如何进入程序并产生价值", "algorithm-flow", "现实对象经过抽象、存储、算法处理，得到有价值的服务。"),
            asset("002-real-world-model", "现实场景的数据抽象", "对比金钱、排队、关注关系的抽象结果", "comparison", "不同现实场景分别对应数值、线性关系和图状关系。"),
            asset("002-course-map", "基础课程关系图", "说明 C 语言、数据结构、算法与其他专业课的关系", "comparison", "课程之间的依赖和分工。"),
            asset("002-efficiency", "表示与效率", "强调同一问题可有多种结构选择", "comparison", "数组、链表、队列处理排队场景的差异。"),
        ],
    },
    {
        "number": "003",
        "chapter": "第一章 绪论",
        "source_prefix": "003 ",
        "title": "1.1 数据结构的基本概念",
        "subtitle": "数据、数据元素、逻辑结构、存储结构与抽象数据类型",
        "objectives": [
            "区分数据、数据对象、数据元素、数据项和组合项。",
            "掌握数据结构的三要素：逻辑结构、存储结构、数据运算。",
            "理解抽象数据类型只定义逻辑结构和运算，不规定具体存储实现。",
        ],
        "sections": [
            make_section(
                "数据、数据元素与数据项",
                text_to_paragraphs(
                    "数据是信息的载体，是能输入计算机并被程序识别、处理的符号集合。从计算机角度看，现实世界中的文字、数字、图片、关系最终都需要被转换成二进制形式。",
                    "数据元素是数据的基本单位，通常作为整体处理；数据项是组成数据元素的更小字段。以排队系统为例，一波顾客是一个数据元素，号数、取号时间、就餐人数是数据项。生日这种信息还可以拆成年、月、日等更小数据项，多个数据项组合成组合项。",
                ),
                "数据元素与数据项不是死记概念，而是由业务需求决定的抽象层次。",
                ["数据元素是整体，数据项是组成整体的字段。"],
                ["003-data-hierarchy"],
            ),
            make_section(
                "数据结构与数据对象",
                text_to_paragraphs(
                    "数据结构是相互之间存在一种或多种特定关系的数据元素的集合，强调数据元素之间的关系。数据对象是具有相同性质的数据元素的集合，不一定强调元素之间是否有关系。",
                    "例如某门店排队顾客之间有明确先后顺序，可以构成一个数据结构；所有门店的排队顾客信息具有相同性质，可以看作同一个数据对象。",
                ),
                "数据结构强调元素之间的关系，数据对象强调元素具有相同性质。",
                ["结构的核心是关系。"],
                ["003-structure-object"],
            ),
            make_section(
                "数据结构的三要素",
                text_to_paragraphs(
                    "逻辑结构描述数据元素之间的逻辑关系，常见类型有集合、线性结构、树形结构、图状或网状结构。线性结构是一对一关系，树形结构是一对多关系，图状结构是多对多关系。",
                    "存储结构也叫物理结构，描述逻辑关系在计算机中的实现方式，常见有顺序存储、链式存储、索引存储和散列存储。顺序存储要求逻辑相邻的元素物理上也相邻；链式存储用指针表示后继关系；索引存储额外建立索引表；散列存储根据关键字计算地址。",
                    "数据运算是针对逻辑结构定义的操作，如队列的入队、出队；具体实现则依赖存储结构。同样是插入队尾，顺序存储和链式存储的实现细节完全不同。",
                ),
                "学习任何具体数据结构，都要同时问：逻辑关系是什么、如何存储、要支持哪些运算。",
                ["逻辑结构面向问题，存储结构面向计算机，运算连接需求和实现。"],
                ["003-three-elements", "003-storage-types"],
            ),
            make_section(
                "数据类型与抽象数据类型",
                text_to_paragraphs(
                    "数据类型是一个值的集合和定义在该集合上的一组操作。原子类型的值不可再分，如 bool、int；结构类型的值可以拆成多个分量，如 C 语言结构体。",
                    "抽象数据类型 ADT 是对数据组织及相关操作的抽象定义。它关心逻辑结构和运算，不关心底层到底用顺序存储、链式存储还是其他存储方式实现。",
                ),
                "ADT 把“是什么”和“能做什么”先定义清楚，把“怎么存、怎么写代码”留给实现阶段。",
                ["抽象数据类型不绑定具体存储结构。"],
                ["003-adt"],
            ),
        ],
        "codeBlocks": [
            code_block(
                "code-003-customer",
                "数据元素与数据项示例",
                "用结构体表达排队顾客信息，展示数据元素由多个数据项组成。",
                r"""
typedef struct {
    int ticketNo;      // 关键字：排队号，可区分不同顾客
    int people;        // 数据项：就餐人数
    int takeHour;      // 数据项：取号小时
    int takeMinute;    // 数据项：取号分钟
} CustomerInfo;
""",
            )
        ],
        "mistakes": [
            {"title": "混淆数据对象和数据结构", "detail": "数据对象强调同性质，数据结构强调元素之间有特定关系。"},
            {"title": "把逻辑结构等同于存储结构", "detail": "线性表是逻辑结构，顺序表和链表是不同存储实现。"},
            {"title": "认为 ADT 必须说明 malloc 或数组", "detail": "ADT 只定义逻辑组织和操作，不规定底层存储。"},
        ],
        "summary": [
            "数据结构由逻辑结构、存储结构和数据运算三要素共同描述。",
            "常见逻辑结构包括集合、线性结构、树形结构、图状结构。",
            "常见存储结构包括顺序、链式、索引和散列存储。",
            "抽象数据类型先描述逻辑和操作，再由具体代码选择存储方式实现。",
        ],
        "quiz": [
            quiz("数据结构最强调什么？", ["A. 文件扩展名", "B. 数据元素之间的关系", "C. 编译器版本", "D. 变量名必须很短"], "B", "结构本质上就是元素之间的关系。"),
            quiz("下列哪一项属于逻辑结构？", ["A. 顺序存储", "B. 链式存储", "C. 树形结构", "D. 散列存储"], "C", "树形结构描述元素之间一对多的逻辑关系。"),
            quiz("抽象数据类型 ADT 不关心哪件事？", ["A. 数据的逻辑结构", "B. 可执行的操作", "C. 具体采用哪种存储结构", "D. 操作的语义"], "C", "ADT 是抽象定义，具体存储属于实现阶段。"),
        ],
        "svgAssets": [
            asset("003-data-hierarchy", "数据层次关系", "展示数据、数据元素、数据项的层级", "memory-layout", "数据对象中包含数据元素，数据元素由数据项组成。"),
            asset("003-structure-object", "数据对象与数据结构", "对比数据对象和数据结构的关注点", "comparison", "数据对象强调同性质，数据结构强调元素之间的关系。"),
            asset("003-three-elements", "数据结构三要素", "展示逻辑结构、存储结构、运算之间的关系", "comparison", "学习数据结构的三条主线。"),
            asset("003-storage-types", "四种存储结构", "对比顺序、链式、索引、散列存储", "comparison", "不同存储结构表达关系的方式不同。"),
            asset("003-adt", "ADT 抽象边界", "说明 ADT 与实现的分层", "algorithm-flow", "先定义逻辑和运算，再选择存储实现。"),
        ],
    },
    {
        "number": "004",
        "chapter": "第一章 绪论",
        "source_prefix": "004 ",
        "title": "1.2.1 算法的基本概念",
        "subtitle": "算法定义、五个特性和好算法的标准",
        "objectives": [
            "理解算法是求解特定问题的有限步骤描述。",
            "掌握算法必须具备的有穷性、确定性、可行性、输入、输出。",
            "理解好算法还应具备正确性、可读性、健壮性、高效率和低存储需求。",
        ],
        "sections": [
            make_section(
                "程序、数据结构与算法",
                text_to_paragraphs(
                    "经典说法“程序 = 数据结构 + 算法”强调了两件事：数据结构负责组织和表示问题中的信息，算法负责按明确步骤处理这些数据，从而解决实际问题。",
                    "做番茄炒蛋需要食材和步骤；程序也类似，数据结构像食材，算法像加工步骤。没有合适的数据，算法无从处理；没有算法，数据也不能产生价值。",
                ),
                "数据结构解决“处理什么”，算法解决“怎样处理”。",
                ["算法是处理数据的步骤描述。"],
                ["004-program-equation"],
            ),
            make_section(
                "算法的五个必要特性",
                text_to_paragraphs(
                    "有穷性要求算法在有限步内结束，每一步也能在有限时间完成。一直运行的应用程序或死循环不是算法。",
                    "确定性要求每条指令含义明确，对相同输入必须得到相同输出。若排序时遇到年龄相同的人没有规定稳定规则，结果可能前后不一致，就不满足确定性。",
                    "可行性要求每个步骤能被计算机实现。算法可以有零个或多个输入，但必须有一个或多个输出，且输出与输入之间有确定关系。",
                ),
                "只要缺少有穷性、确定性、可行性、输入、输出中的任意一项，就不能称为严格意义上的算法。",
                ["算法的描述必须明确、可执行、会结束。"],
                ["004-five-features"],
            ),
            make_section(
                "好算法的评价标准",
                text_to_paragraphs(
                    "正确性是第一要求：算法必须能正确解决问题。一个能运行但排序结果错误的过程仍可能是算法，却不是好算法。",
                    "可读性要求算法描述或代码容易理解，便于协作和维护；健壮性要求面对非法输入时能作出合理反应，而不是产生莫名其妙的结果。",
                    "高效率和低存储需求分别对应后续要学习的时间复杂度和空间复杂度。实际开发中，问题规模一大，低效算法会暴露明显性能问题。",
                ),
                "好算法不仅要能算对，还要容易读、能处理边界、时间和空间开销可接受。",
                ["正确性是底线，效率和健壮性决定工程质量。"],
                ["004-good-algorithm"],
            ),
        ],
        "codeBlocks": [
            code_block(
                "code-004-select",
                "按年龄递增排序并处理同龄情况",
                "原课用按年龄排序说明算法步骤和确定性。这里给出稳定选择排序的 C 实现：年龄相同则保持原先相对顺序。",
                r"""
#include <stdio.h>

typedef struct {
    char name[16];
    int age;
} Person;

void stableSelectByAge(Person a[], int n) {
    for (int i = 0; i < n - 1; ++i) {
        int min = i;
        for (int j = i + 1; j < n; ++j) {
            if (a[j].age < a[min].age) {
                min = j;
            }
        }
        Person temp = a[min];
        for (int k = min; k > i; --k) {
            a[k] = a[k - 1];
        }
        a[i] = temp;
    }
}
""",
            )
        ],
        "mistakes": [
            {"title": "把程序都叫算法", "detail": "程序可以长期运行，算法必须有穷。微信是程序，不是一个单独算法。"},
            {"title": "忽略确定性", "detail": "相同输入必须有相同输出，模糊的步骤描述会破坏确定性。"},
            {"title": "只看结果不看健壮性", "detail": "好算法要处理非法输入，避免边界条件造成错误。"},
        ],
        "summary": [
            "算法是对特定问题求解步骤的有限描述。",
            "算法必须具有有穷性、确定性、可行性、输入和输出。",
            "好算法要正确、可读、健壮，并尽量高效、节省空间。",
        ],
        "quiz": [
            quiz("死循环为什么不能称为算法？", ["A. 没有变量", "B. 不满足有穷性", "C. 没有注释", "D. 不能用 C 写"], "B", "算法必须在有限步内结束。"),
            quiz("“找到最小年龄的人”在有两人同龄时还需要补充规则，主要是为了满足什么？", ["A. 有穷性", "B. 确定性", "C. 输入性", "D. 低存储需求"], "B", "相同输入应得到相同输出，因此要规定同龄时如何处理。"),
            quiz("高效率和低存储需求分别对应后续哪两个概念？", ["A. 指针和数组", "B. 时间复杂度和空间复杂度", "C. 结构体和联合体", "D. 顺序存储和链式存储"], "B", "效率用时间复杂度衡量，存储开销用空间复杂度衡量。"),
        ],
        "svgAssets": [
            asset("004-program-equation", "程序组成", "展示数据结构与算法的分工", "algorithm-flow", "数据结构提供数据组织，算法提供处理步骤。"),
            asset("004-five-features", "算法五特性", "归纳算法必须具备的五项性质", "comparison", "有穷性、确定性、可行性、输入、输出。"),
            asset("004-good-algorithm", "好算法评价", "展示好算法的质量维度", "comparison", "正确、可读、健壮、高效、低存储需求。"),
        ],
    },
    {
        "number": "005",
        "chapter": "第一章 绪论",
        "source_prefix": "005 ",
        "title": "1.2.2 算法的时间复杂度",
        "subtitle": "用大 O 表示法分析算法运行时间随问题规模的增长",
        "objectives": [
            "理解为什么不能只用事后统计运行时间评价算法。",
            "掌握大 O 表示法、加法规则、乘法规则和常见数量级顺序。",
            "能分析循环、嵌套循环、对数循环和查找算法的最好、最坏、平均时间复杂度。",
        ],
        "sections": [
            make_section(
                "为什么需要时间复杂度",
                text_to_paragraphs(
                    "直接把程序跑一遍统计时间，会受到机器性能、编程语言、编译器质量和测试环境影响，不能客观反映算法本身优劣。有些算法甚至不能等运行后再统计，例如高风险控制系统。",
                    "时间复杂度关注的是算法执行时间 T 与问题规模 n 之间的增长关系。问题规模越大，算法运行时间通常越长，我们希望在运行前就估计这种增长趋势。",
                ),
                "时间复杂度不是精确秒数，而是问题规模扩大时运行时间的增长数量级。",
                ["评价算法要排除与算法设计无关的外界因素。"],
                ["005-tn-model"],
            ),
            make_section(
                "大 O 表示法与数量级",
                text_to_paragraphs(
                    "分析时间复杂度时，只保留表达式中增长最快的最高阶项，并把常数系数化为 1。例如 3n + 3 记为 O(n)，n^2 + 6n + 100 记为 O(n^2)。",
                    "常见增长顺序可以记为：常数阶 O(1) < 对数阶 O(log n) < 线性阶 O(n) < 线性对数阶 O(n log n) < 平方阶 O(n^2) < 立方阶 O(n^3) < 指数阶 O(2^n) < 阶乘阶 O(n!)。",
                    "多项相加保留数量级最高的一项，这是加法规则；循环嵌套时数量级相乘，这是乘法规则。",
                ),
                "大 O 表示法抓主导项：低阶项和常数系数在大规模问题下可以忽略。",
                ["先找基本操作，再看它执行次数与 n 的关系。"],
                ["005-growth-curves", "005-big-o-rules"],
            ),
            make_section(
                "循环、嵌套循环与对数循环",
                text_to_paragraphs(
                    "顺序执行的语句只影响常数项，通常可以忽略。含循环的程序重点看循环体中的基本操作执行了多少次；多层嵌套循环重点看最深层循环总共执行多少次。",
                    "如果循环变量每次加 1，通常是线性阶 O(n)；两层都与 n 相关的嵌套循环通常是 O(n^2)；如果循环变量每次翻倍，循环次数大约是 log2 n，因此是 O(log n)。",
                ),
                "循环复杂度的核心问题是：基本操作到底执行了多少次。",
                ["最深层循环的执行次数往往决定复杂度。"],
                ["005-loop-analysis"],
            ),
            make_section(
                "最好、最坏和平均时间复杂度",
                text_to_paragraphs(
                    "有些算法的运行时间和输入数据状态有关。在线性查找中，如果目标元素在第一个位置，最好时间复杂度是 O(1)；如果在最后一个位置，最坏时间复杂度是 O(n)。",
                    "平均时间复杂度通常假设目标出现在各位置的概率相同，再计算期望执行次数。线性查找平均需要约 (n+1)/2 次比较，因此仍为 O(n)。实际评价算法时更常关注最坏和平均情况，最好情况参考价值较小。",
                ),
                "同一个算法可能有不同情况下的复杂度，考试和工程中通常重点看最坏与平均情况。",
                ["输入分布会影响执行次数。"],
                ["005-search-cases"],
            ),
        ],
        "codeBlocks": [
            code_block(
                "code-005-complexity",
                "三个典型时间复杂度示例",
                "对应课程中的逐步递增、翻倍循环和线性查找。",
                r"""
#include <stdio.h>

void loveLinear(int n) {
    for (int i = 1; i <= n; ++i) {
        printf("%d\n", i);       // O(n)
    }
}

void loveLog(int n) {
    for (int i = 1; i <= n; i *= 2) {
        printf("%d\n", i);       // O(log n)
    }
}

int locateN(const int a[], int n) {
    for (int i = 0; i < n; ++i) {
        if (a[i] == n) {
            return i;            // 最好 O(1)，最坏 O(n)
        }
    }
    return -1;
}
""",
            )
        ],
        "mistakes": [
            {"title": "把运行秒数当成时间复杂度", "detail": "秒数受机器、语言和编译器影响，复杂度关心增长数量级。"},
            {"title": "没有去掉低阶项和常数系数", "detail": "3n+3、100n+8 都是 O(n)，不能把常数误当成复杂度核心。"},
            {"title": "忽视输入状态", "detail": "线性查找的最好、最坏、平均情况可能不同，要按题意分析。"},
        ],
        "summary": [
            "时间复杂度描述 T(n) 的增长数量级，而不是精确运行时间。",
            "大 O 记法保留最高阶项并去掉常数系数。",
            "循环分析重点是基本操作执行次数，嵌套循环常用乘法规则。",
            "线性查找等算法需要区分最好、最坏和平均情况。",
        ],
        "quiz": [
            quiz("3n + 100 的时间复杂度是？", ["A. O(100)", "B. O(3n)", "C. O(n)", "D. O(n^2)"], "C", "大 O 记法去掉低阶项和常数系数。"),
            quiz("循环 `for (i=1; i<=n; i*=2)` 的复杂度通常是？", ["A. O(1)", "B. O(log n)", "C. O(n)", "D. O(n^2)"], "B", "每次翻倍，执行次数约为 log2 n。"),
            quiz("在线性查找中，目标在最后一个位置时的时间复杂度是？", ["A. O(1)", "B. O(log n)", "C. O(n)", "D. O(n!)"], "C", "需要从头扫描到最后一个元素。"),
        ],
        "svgAssets": [
            asset("005-tn-model", "T(n) 与问题规模", "展示算法时间随 n 增长", "algorithm-flow", "问题规模 n 决定基本操作执行次数，进而决定 T(n)。"),
            asset("005-growth-curves", "常见复杂度增长曲线", "对比 O(1)、O(log n)、O(n)、O(n^2)、O(2^n)", "algorithm-flow", "不同数量级的增长差异。"),
            asset("005-big-o-rules", "大 O 化简规则", "展示加法和乘法规则", "comparison", "相加取高阶，相乘合并数量级。"),
            asset("005-loop-analysis", "循环次数分析", "展示线性、平方、对数循环", "algorithm-flow", "不同循环结构对应不同执行次数。"),
            asset("005-search-cases", "线性查找三种情况", "展示最好、最坏、平均情况", "algorithm-flow", "目标位置影响循环次数。"),
        ],
    },
    {
        "number": "006",
        "chapter": "第一章 绪论",
        "source_prefix": "006 ",
        "title": "1.2.3 算法的空间复杂度",
        "subtitle": "分析算法额外内存开销与问题规模的关系",
        "objectives": [
            "理解空间复杂度衡量算法运行所需内存空间与问题规模 n 的关系。",
            "能区分常数空间、线性空间、平方空间等常见情况。",
            "掌握递归调用栈对空间复杂度的影响。",
        ],
        "sections": [
            make_section(
                "程序运行时的内存开销",
                text_to_paragraphs(
                    "程序运行前，代码会被加载到内存中；运行时还需要保存参数、局部变量、临时数据等。代码区大小通常和问题规模 n 无关，空间复杂度重点关注会随 n 变化的额外空间。",
                    "如果一个算法只使用固定数量的变量，即使 n 变大，所需额外空间也不变，它的空间复杂度是 O(1)，这种算法也称为可以原地工作。",
                ),
                "空间复杂度关注随问题规模变化的额外内存，而不是所有内存细节。",
                ["固定数量变量通常只贡献常数空间。"],
                ["006-memory-layout"],
            ),
            make_section(
                "数组变量带来的空间复杂度",
                text_to_paragraphs(
                    "若函数中定义了长度为 n 的数组，数组空间随 n 线性增长，空间复杂度是 O(n)。若定义 n x n 的二维数组，空间开销随 n^2 增长，空间复杂度是 O(n^2)。",
                    "分析时不必纠结 int 到底占几个字节，因为大 O 表示法最终会去掉常数系数。我们只需判断哪些变量的大小与问题规模相关，并保留最高阶项。",
                ),
                "普通程序的空间复杂度通常看与 n 相关的数据结构大小。",
                ["数组长度直接影响空间数量级。"],
                ["006-array-space"],
            ),
            make_section(
                "递归调用栈与空间复杂度",
                text_to_paragraphs(
                    "函数每调用一次，系统都要为该层调用保存参数、局部变量和返回地址等信息，这些信息会形成函数调用栈。递归调用会产生多层栈帧，因此递归深度会影响空间复杂度。",
                    "若每层递归只使用常数空间，且递归深度为 n，则空间复杂度为 O(n)。若每层还定义长度与当前参数相关的数组，总空间可能变成 1 + 2 + ... + n，即 O(n^2)。",
                ),
                "大多数递归题的空间复杂度可以先看递归深度，再考虑每层是否有额外大数组。",
                ["递归不是免费调用，每一层都会占用调用栈空间。"],
                ["006-recursion-stack", "006-recursion-sum"],
            ),
        ],
        "codeBlocks": [
            code_block(
                "code-006-space",
                "空间复杂度示例",
                "展示 O(1)、O(n) 以及递归 O(n) 的典型来源。",
                r"""
void constantSpace(int n) {
    int i = 0;
    int sum = 0;       // 变量个数固定，S(n)=O(1)
    while (i <= n) {
        sum += i;
        i++;
    }
}

void linearSpace(int n) {
    int a[n];          // 数组长度随 n 变化，S(n)=O(n)
    for (int i = 0; i < n; ++i) {
        a[i] = i;
    }
}

void recursivePrint(int n) {
    if (n <= 0) {
        return;
    }
    recursivePrint(n - 1);  // 递归深度 n，调用栈 S(n)=O(n)
}
""",
            )
        ],
        "mistakes": [
            {"title": "把所有内存都算进空间复杂度", "detail": "空间复杂度通常关注随 n 增长的额外空间，代码区和固定变量多为常数项。"},
            {"title": "递归只看代码里有没有数组", "detail": "即使没有数组，递归调用栈也会占空间。"},
            {"title": "过度纠结具体字节数", "detail": "大 O 分析关注数量级，int 是 4 字节还是其他值通常不影响结果。"},
        ],
        "summary": [
            "空间复杂度 S(n) 描述算法额外空间随问题规模的增长关系。",
            "固定变量是 O(1)，长度为 n 的数组是 O(n)，n x n 数组是 O(n^2)。",
            "递归空间通常由递归深度和每层调用的空间共同决定。",
        ],
        "quiz": [
            quiz("只使用固定几个 int 变量的算法空间复杂度通常是？", ["A. O(1)", "B. O(n)", "C. O(n^2)", "D. O(2^n)"], "A", "固定数量变量不随 n 增长。"),
            quiz("定义 `int a[n][n]` 的主要空间数量级是？", ["A. O(1)", "B. O(log n)", "C. O(n)", "D. O(n^2)"], "D", "二维数组有 n*n 个元素。"),
            quiz("递归深度为 n，且每层只用常数空间时，总空间复杂度是？", ["A. O(1)", "B. O(n)", "C. O(n^2)", "D. O(n!)"], "B", "每层常数空间乘以 n 层调用栈。"),
        ],
        "svgAssets": [
            asset("006-memory-layout", "程序运行内存区域", "展示代码、变量和额外数据空间", "stack-heap", "空间复杂度关注随 n 增长的部分。"),
            asset("006-array-space", "数组空间增长", "展示一维与二维数组空间差异", "memory-layout", "长度 n 与 n x n 数组的空间数量级。"),
            asset("006-recursion-stack", "递归调用栈", "展示递归深度形成的栈帧", "stack-heap", "每层递归都占用一份栈空间。"),
            asset("006-recursion-sum", "递归每层数组求和", "展示 1+2+...+n 的空间累加", "algorithm-flow", "每层空间不同时需累加后取数量级。"),
        ],
    },
    {
        "number": "007",
        "chapter": "第二章 线性表",
        "source_prefix": "007 ",
        "title": "2.1 线性表的定义和基本操作",
        "subtitle": "线性表的逻辑结构、术语和抽象操作",
        "objectives": [
            "掌握线性表的定义：相同数据类型的 n 个数据元素的有限序列。",
            "理解表长、空表、位序、表头、表尾、直接前驱、直接后继等术语。",
            "熟悉线性表常见基本操作：初始化、销毁、插入、删除、查找、求长、输出、判空。",
        ],
        "sections": [
            make_section(
                "线性表的定义",
                text_to_paragraphs(
                    "线性表是具有相同数据类型的 n 个数据元素的有限序列，通常写作 L = (a1, a2, ..., an)。这里的“相同数据类型”意味着每个数据元素大小一致；“序列”强调元素之间有先后次序；“有限”排除了无限整数序列这样的对象。",
                    "线性表是一种逻辑结构，不等同于数组。数组只是实现线性表的一种可能方式，后续还会用链式存储实现线性表。",
                ),
                "线性表的关键词是同类型、有限、有序。",
                ["线性表描述一对一的逻辑关系。"],
                ["007-linear-list"],
            ),
            make_section(
                "重要术语：位序、前驱和后继",
                text_to_paragraphs(
                    "线性表的表长是元素个数 n，n=0 时为空表。第一个元素称为表头元素，最后一个元素称为表尾元素。",
                    "位序表示元素在线性表中的第几个位置，位序从 1 开始；而 C 语言数组下标从 0 开始。除第一个元素外，每个元素有唯一直接前驱；除最后一个元素外，每个元素有唯一直接后继。",
                ),
                "位序从 1 开始，数组下标从 0 开始，是后续顺序表代码最容易错的地方。",
                ["第 i 个元素通常对应数组下标 i-1。"],
                ["007-position-index"],
            ),
            make_section(
                "线性表的基本操作",
                text_to_paragraphs(
                    "线性表常见基本操作包括 InitList 初始化、DestroyList 销毁、ListInsert 插入、ListDelete 删除、LocateElem 按值查找、GetElem 按位查找、Length 求表长、PrintList 输出、Empty 判空等。",
                    "从更一般的角度看，数据结构的操作常围绕创建、销毁、增、删、改、查展开。是否需要额外定义“改”操作，取决于实际需求；通常改之前也要先查到目标元素。",
                ),
                "学习一个数据结构时，可以用“创、销、增、删、改、查”作为基本思路。",
                ["基本操作是给使用者调用的数据结构接口。"],
                ["007-operations"],
            ),
            make_section(
                "C 语言中的参数修改",
                text_to_paragraphs(
                    "教材中常用 C++ 引用写法表示“修改结果要带回调用者”。在纯 C 语言中，应使用指针参数实现同样目的。例如需要修改线性表本身时传入 SqList *L，需要把删除元素带回时传入 ElemType *e。",
                    "函数命名和参数命名要有可读性。DestroyList、ListInsert、GetElem 这样的名字比 a、b 更能表达函数意图，也更利于考试和协作。",
                ),
                "只要函数需要修改调用者手里的对象，就要用指针或其他能带回修改结果的机制。",
                ["C 用指针模拟“引用传参”的效果。"],
                ["007-parameter-flow"],
            ),
        ],
        "codeBlocks": [
            code_block(
                "code-007-interface",
                "线性表抽象接口示例",
                "用 C 风格函数原型整理课程中提到的基本操作。",
                r"""
#include <stdbool.h>

typedef int ElemType;
typedef struct SqList SqList;

bool InitList(SqList *L);
void DestroyList(SqList *L);
bool ListInsert(SqList *L, int i, ElemType e);
bool ListDelete(SqList *L, int i, ElemType *e);
int LocateElem(const SqList *L, ElemType e);
bool GetElem(const SqList *L, int i, ElemType *e);
int Length(const SqList *L);
void PrintList(const SqList *L);
bool Empty(const SqList *L);
""",
            )
        ],
        "mistakes": [
            {"title": "把位序和下标混用", "detail": "位序从 1 开始，数组下标从 0 开始，写顺序表代码时常要使用 i-1。"},
            {"title": "忽略有限性", "detail": "所有整数按顺序排列不是线性表，因为元素个数无限。"},
            {"title": "需要带回修改却按值传参", "detail": "C 中按值传参只修改副本，必须用指针参数带回结果。"},
        ],
        "summary": [
            "线性表是同类型数据元素构成的有限有序序列。",
            "表长、位序、表头、表尾、前驱、后继是重要基础术语。",
            "基本操作围绕创建、销毁、增删改查展开。",
            "C 语言中需要用指针参数带回对对象或结果变量的修改。",
        ],
        "quiz": [
            quiz("线性表中第 i 个元素若用数组存储，通常对应哪个下标？", ["A. i", "B. i-1", "C. i+1", "D. 2i"], "B", "位序从 1 开始，数组下标从 0 开始。"),
            quiz("空表的表长是多少？", ["A. -1", "B. 0", "C. 1", "D. 不确定"], "B", "n=0 时线性表为空表。"),
            quiz("C 函数要把删除的元素值带回调用者，应传入什么？", ["A. ElemType e", "B. ElemType *e", "C. int i", "D. char name[]"], "B", "指针参数可以修改调用者提供的变量。"),
        ],
        "svgAssets": [
            asset("007-linear-list", "线性表逻辑结构", "展示一对一的前后关系", "memory-layout", "a1 到 an 构成有限序列。"),
            asset("007-position-index", "位序与数组下标", "强调位序从 1、下标从 0", "address-calc", "第 i 个元素对应下标 i-1。"),
            asset("007-operations", "线性表基本操作", "展示创销增删改查", "algorithm-flow", "线性表接口围绕基本操作组织。"),
            asset("007-parameter-flow", "参数修改是否带回", "展示按值传参和指针传参差异", "pointer", "C 中用指针带回修改结果。"),
        ],
    },
    {
        "number": "008",
        "chapter": "第二章 线性表",
        "source_prefix": "008 ",
        "title": "2.2.1 顺序表的定义",
        "subtitle": "顺序存储、静态分配、动态分配与随机存取",
        "objectives": [
            "理解顺序表是用顺序存储实现的线性表。",
            "掌握静态分配和动态分配两种顺序表实现方式。",
            "理解 sizeof、malloc、free、ElemType、SqList、MaxSize 等术语和代码写法。",
            "掌握顺序表随机存取、存储密度高、扩容和插删不方便等特点。",
        ],
        "sections": [
            make_section(
                "顺序存储与地址计算",
                text_to_paragraphs(
                    "顺序表是用顺序存储方式实现的线性表，即逻辑上相邻的数据元素在物理内存中也相邻。由于线性表中数据元素类型相同，每个元素占用空间相等，所以只要知道起始地址和元素大小，就能直接计算第 i 个元素的地址。",
                    "C 语言中用 sizeof(ElemType) 获取一个数据元素占多少字节。地址公式可写为 LOC(ai) = LOC(a1) + (i - 1) * sizeof(ElemType)。这正是顺序表能够随机存取的根本原因。",
                ),
                "顺序表用物理相邻表达逻辑相邻，地址可直接计算。",
                ["sizeof 不是 size off；它用于获得类型或对象占用的字节数。"],
                ["008-contiguous-memory", "008-address-calc"],
            ),
            make_section(
                "静态分配实现顺序表",
                text_to_paragraphs(
                    "静态分配使用定长数组保存数据元素，例如 data[MaxSize]。结构体中还要保存 length，表示当前实际元素个数。MaxSize 是容量上限，length 是当前长度，二者不能混淆。",
                    "初始化时必须把 length 设为 0。数组内容可以不全部清零，因为合法访问应只访问 0 到 length-1 的位置；但若访问未使用区域，可能读到内存脏数据。静态数组容量一旦确定就不能改变，申请过大浪费空间，申请过小又容易不够用。",
                ),
                "静态顺序表简单，但容量固定；length 必须可靠维护。",
                ["MaxSize 是容量，length 是当前元素个数。"],
                ["008-static-array"],
            ),
            make_section(
                "动态分配与扩容",
                text_to_paragraphs(
                    "动态分配用 ElemType *data 指向一片由 malloc 申请的连续空间，同时记录 length 和 maxSize。malloc 返回的是一片空间的起始地址，需要转换为 ElemType * 后保存到 data。",
                    "扩容时，可以重新 malloc 一片更大的连续空间，把旧数据复制过去，更新 maxSize，再 free 旧空间。虽然动态分配能改变容量，但复制数据有时间开销。由 malloc 申请的堆空间必须手动 free。",
                ),
                "动态顺序表容量更灵活，但扩容仍要复制数据，malloc 与 free 要成对出现。",
                ["malloc 不是 my lock；realloc 虽可用，但手写 malloc+复制+free 更能看清过程。"],
                ["008-dynamic-alloc", "008-realloc-flow"],
            ),
            make_section(
                "顺序表的特点",
                text_to_paragraphs(
                    "顺序表支持随机访问，按位查找可在 O(1) 时间完成；每个存储单元只保存数据元素本身，不需要额外指针，因此存储密度高。",
                    "缺点是容量扩展不方便，静态分配不能扩容，动态分配扩容需要复制数据；插入和删除时，为保持物理相邻，常常需要移动大量元素。",
                ),
                "顺序表查找快、存储密度高，但扩容和插删成本较高。",
                ["随机存取是顺序表最重要的优势。"],
                ["008-random-access"],
            ),
        ],
        "codeBlocks": [
            code_block("code-008-sqlist", "动态顺序表定义、初始化与扩容", "整理课程中的 malloc、free、sizeof 和 len 扩容参数。", COMMON_CODE["seq_def"]),
        ],
        "mistakes": [
            {"title": "把 sizeof 写成 size off", "detail": "C 语言关键字是 sizeof，用于获取类型或对象占用字节数。"},
            {"title": "把 ElemType、SqList 识别错误", "detail": "ElemType 表示数据元素类型，SqList 表示顺序表类型，Sq 是 Sequence 的缩写。"},
            {"title": "混淆 length 和 maxSize", "detail": "length 是当前长度，maxSize 或 MaxSize 是最大容量。"},
            {"title": "malloc 后忘记 free", "detail": "动态申请的堆空间不会自动回收，必须手动释放。"},
        ],
        "summary": [
            "顺序表用连续内存保存线性表元素。",
            "静态分配使用定长数组，动态分配使用 malloc 申请连续空间。",
            "顺序表可以 O(1) 按位访问，但扩容、插入、删除不够方便。",
            "写 C 代码时要准确使用 sizeof、malloc、free、ElemType、SqList、length、MaxSize 等术语。",
        ],
        "quiz": [
            quiz("顺序表能随机存取的根本原因是？", ["A. 使用了递归", "B. 元素连续存放且大小相同", "C. 使用了链式指针", "D. length 从 1 开始"], "B", "起始地址和元素大小确定后，可直接计算任意元素地址。"),
            quiz("动态顺序表扩容后，旧空间应如何处理？", ["A. 留着不管", "B. 用 free 释放", "C. 用 sizeof 释放", "D. 把 length 设为 -1"], "B", "malloc 申请的堆空间需要用 free 归还系统。"),
            quiz("静态顺序表中的 MaxSize 表示什么？", ["A. 当前元素个数", "B. 最大容量", "C. 第一个元素地址", "D. 元素位序"], "B", "MaxSize 是数组容量上限，length 才是当前长度。"),
        ],
        "svgAssets": [
            asset("008-contiguous-memory", "顺序表连续内存", "展示逻辑相邻与物理相邻", "memory-layout", "a1 到 a5 在内存中连续存放。"),
            asset("008-address-calc", "顺序表地址计算", "展示 LOC(ai) 公式", "address-calc", "由起始地址和元素大小直接定位。"),
            asset("008-static-array", "静态分配结构", "展示 data[MaxSize] 与 length", "static-array", "容量固定，当前长度可变。"),
            asset("008-dynamic-alloc", "动态分配结构", "展示 data 指针、length、maxSize 与堆空间", "dynamic-alloc", "data 指向 malloc 申请的连续空间。"),
            asset("008-realloc-flow", "动态扩容流程", "展示 malloc 新空间、复制、free 旧空间", "realloc-flow", "扩容需要搬移已有元素。"),
            asset("008-random-access", "随机存取", "说明 O(1) 按位访问", "random-access", "第 i 个元素可直接定位。"),
        ],
    },
    {
        "number": "009",
        "chapter": "第二章 线性表",
        "source_prefix": "009 ",
        "title": "2.2.2-1 顺序表的插入删除",
        "subtitle": "移动元素、边界检查与时间复杂度",
        "objectives": [
            "掌握顺序表插入操作的移动方向、边界检查和 length 更新。",
            "掌握顺序表删除操作的移动方向、删除值返回和 length 更新。",
            "能分析顺序表插入、删除的最好、最坏、平均时间复杂度。",
        ],
        "sections": [
            make_section(
                "插入操作的基本思想",
                text_to_paragraphs(
                    "在顺序表第 i 个位置插入元素 e，需要先把第 i 个位置及其后面的元素依次后移一位，再把 e 放入下标 i-1 的位置，最后 length 加 1。",
                    "移动元素时必须从后往前移动。若从前往后移动，后面的旧元素会被覆盖，数据会丢失。插入前还要检查 i 是否在 1 到 length+1 之间，以及表是否已满。",
                ),
                "顺序表插入的关键是后移元素，从后往前移，最后维护 length。",
                ["插入第 i 位，数组下标是 i-1。"],
                ["009-insert-shift"],
            ),
            make_section(
                "删除操作的基本思想",
                text_to_paragraphs(
                    "删除第 i 个元素时，先把 data[i-1] 保存到输出参数 e 中，再把 i 之后的元素依次前移一位，最后 length 减 1。",
                    "删除操作要检查 i 是否在 1 到 length 之间。e 需要把删除的值带回调用者，在 C 语言中应使用 ElemType *e。顺序表本身会被修改，因此也应传入 SqList *L。",
                ),
                "顺序表删除的关键是保存被删元素、从前往后前移元素、更新 length。",
                ["删除时移动方向与插入相反。"],
                ["009-delete-shift"],
            ),
            make_section(
                "时间复杂度分析",
                text_to_paragraphs(
                    "插入最好情况是插入表尾，无需移动元素，时间复杂度 O(1)；最坏情况是插入表头，需要移动 n 个元素，时间复杂度 O(n)。若各插入位置等概率，平均需要移动 n/2 个元素，平均时间复杂度 O(n)。",
                    "删除最好情况是删除表尾，无需移动元素，时间复杂度 O(1)；最坏情况是删除表头，需要移动 n-1 个元素，时间复杂度 O(n)。平均时间复杂度同样为 O(n)。",
                ),
                "顺序表插删的主要时间开销来自移动元素，平均和最坏都是 O(n)。",
                ["表尾操作快，表头操作移动最多。"],
                ["009-complexity"],
            ),
            make_section(
                "健壮性和接口反馈",
                text_to_paragraphs(
                    "一个好的基本操作不能只在正确输入下工作，还要能处理非法位置、表满、空表等边界情况。函数返回 bool 值可以让调用者知道操作是否成功。",
                    "这些检查不是形式主义。边界条件正是程序最容易出错的地方，尤其是初学者写插入、删除循环时，移动范围和下标很容易写错。",
                ),
                "基本操作要让调用者用得明白，也要让错误输入被及时拒绝。",
                ["返回 true/false 是清晰的失败反馈。"],
                ["009-guard-flow"],
            ),
        ],
        "codeBlocks": [
            code_block("code-009-seq-ops", "顺序表插入与删除", "使用 C 指针参数实现课程中的插入、删除逻辑。", COMMON_CODE["seq_ops"]),
        ],
        "mistakes": [
            {"title": "插入移动方向写反", "detail": "插入要从后往前移动，否则会覆盖尚未移动的数据。"},
            {"title": "忘记维护 length", "detail": "插入后 length++，删除后 length--，否则表的逻辑长度错误。"},
            {"title": "位序和下标差 1", "detail": "第 i 个元素对应 data[i-1]，循环边界要特别注意。"},
            {"title": "删除值没有带回", "detail": "C 语言中应使用 ElemType *e 返回被删除元素。"},
        ],
        "summary": [
            "顺序表插入需要后移元素，删除需要前移元素。",
            "插入合法位置是 1 到 length+1，删除合法位置是 1 到 length。",
            "插入和删除的最好时间复杂度为 O(1)，最坏和平均为 O(n)。",
            "健壮的代码要检查非法参数和容量状态，并通过返回值反馈成功或失败。",
        ],
        "quiz": [
            quiz("顺序表插入时，移动元素应从哪里开始？", ["A. 从表头向后", "B. 从最后一个元素向前", "C. 从新元素开始", "D. 不需要移动"], "B", "从后向前移动才能避免覆盖旧数据。"),
            quiz("在长度为 n 的顺序表表头插入元素，需要移动多少个元素？", ["A. 0", "B. 1", "C. n", "D. n+1"], "C", "原有 n 个元素都要后移一位。"),
            quiz("删除第 i 个元素后，length 应如何变化？", ["A. 不变", "B. 加 1", "C. 减 1", "D. 设为 MaxSize"], "C", "删除一个元素后当前长度减少 1。"),
        ],
        "svgAssets": [
            asset("009-insert-shift", "顺序表插入后移", "展示插入第 3 位时元素后移", "algorithm-flow", "从后往前移动元素再写入新值。"),
            asset("009-delete-shift", "顺序表删除前移", "展示删除第 3 位时元素前移", "algorithm-flow", "保存被删元素后前移后继元素。"),
            asset("009-complexity", "插删复杂度", "展示表头、表尾和平均移动次数", "comparison", "移动次数决定复杂度。"),
            asset("009-guard-flow", "插删边界检查", "展示位置合法性和容量检查", "algorithm-flow", "非法输入直接返回 false。"),
        ],
    },
    {
        "number": "010",
        "chapter": "第二章 线性表",
        "source_prefix": "010 ",
        "title": "2.2.2-2 顺序表的查找",
        "subtitle": "按位查找、按值查找和随机存取",
        "objectives": [
            "掌握顺序表按位查找 GetElem 的实现和 O(1) 时间复杂度。",
            "理解指针加下标访问时，系统会按指针指向类型的大小计算地址。",
            "掌握按值查找 LocateElem 的实现、结构体比较注意点和 O(n) 复杂度。",
        ],
        "sections": [
            make_section(
                "按位查找与随机存取",
                text_to_paragraphs(
                    "按位查找是取得线性表第 i 个元素。顺序表中元素连续存放且大小相同，因此第 i 个元素可直接用 data[i-1] 访问，时间复杂度为 O(1)。",
                    "无论是静态数组还是动态分配的 data 指针，都可以使用下标形式访问。编译器会根据指针指向类型的大小，计算 data + 下标 对应的真实地址。",
                ),
                "顺序表的按位查找不需要循环，体现了随机存取特性。",
                ["指针类型会影响每个下标跨过多少字节。"],
                ["010-random-access", "010-pointer-step"],
            ),
            make_section(
                "按值查找的实现",
                text_to_paragraphs(
                    "按值查找是在顺序表中寻找值等于 e 的元素，并返回其位序。若顺序表无序，只能从第一个元素开始依次比较，找到后返回 i+1，找不到返回 0 或其他约定失败值。",
                    "如果目标在第一个位置，最好时间复杂度 O(1)；如果在最后或不存在，最坏时间复杂度 O(n)；等概率出现时，平均时间复杂度 O(n)。",
                ),
                "无序顺序表按值查找需要顺序扫描，平均和最坏都是 O(n)。",
                ["返回位序时要把数组下标加 1。"],
                ["010-locate-flow"],
            ),
            make_section(
                "结构体比较的注意点",
                text_to_paragraphs(
                    "对于 int、char、double、float 等基本类型，可以直接使用 == 比较。对于 struct 结构体类型，C 语言不能直接用 == 判断两个结构体是否相等。",
                    "如果数据元素是结构体，应根据业务需求逐个比较关键字段，或者封装一个 equal 函数。数据结构考试有时允许抽象地写 e1 == e2，但若题目要求严格 C 语言代码，就要写出字段比较。",
                ),
                "结构体按值查找要明确“相等”的业务含义，C 代码中不能直接用 == 比较结构体。",
                ["考试时要看题目是否要求严格 C 语法。"],
                ["010-struct-compare"],
            ),
        ],
        "codeBlocks": [
            code_block(
                "code-010-search",
                "顺序表按位与按值查找",
                "按位查找使用 data[i-1]，按值查找顺序扫描。",
                r"""
#include <stdbool.h>
#define MaxSize 50
typedef int ElemType;

typedef struct {
    ElemType data[MaxSize];
    int length;
} SqList;

bool GetElem(const SqList *L, int i, ElemType *e) {
    if (i < 1 || i > L->length) {
        return false;
    }
    *e = L->data[i - 1];
    return true;
}

int LocateElem(const SqList *L, ElemType e) {
    for (int i = 0; i < L->length; ++i) {
        if (L->data[i] == e) {
            return i + 1;
        }
    }
    return 0;
}
""",
            ),
            code_block(
                "code-010-struct-eq",
                "结构体相等判断",
                "当 ElemType 是结构体时，需要自己定义比较逻辑。",
                r"""
#include <stdbool.h>

typedef struct {
    int ticketNo;
    int people;
} Customer;

bool CustomerEqual(Customer a, Customer b) {
    return a.ticketNo == b.ticketNo && a.people == b.people;
}
""",
            ),
        ],
        "mistakes": [
            {"title": "按位查找返回 data[i]", "detail": "位序 i 对应下标 i-1，直接写 data[i] 会错一位。"},
            {"title": "认为指针下标总是移动 1 字节", "detail": "p[i] 的地址步长由 p 指向的数据类型大小决定。"},
            {"title": "直接用 == 比较结构体", "detail": "标准 C 不支持结构体直接相等比较，需要逐字段判断。"},
        ],
        "summary": [
            "顺序表按位查找 O(1)，因为可根据地址公式直接定位。",
            "无序顺序表按值查找需要顺序扫描，复杂度通常为 O(n)。",
            "基本类型可用 ==，结构体要自己定义相等规则。",
        ],
        "quiz": [
            quiz("顺序表按位查找的时间复杂度是？", ["A. O(1)", "B. O(log n)", "C. O(n)", "D. O(n^2)"], "A", "连续存储且元素大小相同，可直接定位。"),
            quiz("LocateElem 返回位序时，找到下标 i 的元素应返回？", ["A. i-1", "B. i", "C. i+1", "D. length"], "C", "位序从 1 开始，下标从 0 开始。"),
            quiz("C 语言中两个 struct 变量能否直接用 == 比较？", ["A. 能", "B. 不能，通常要逐字段比较", "C. 只有 malloc 后能", "D. 只有数组里能"], "B", "标准 C 不支持结构体直接相等比较。"),
        ],
        "svgAssets": [
            asset("010-random-access", "按位查找 O(1)", "展示 data[i-1] 直接访问", "random-access", "根据位序直接定位数组位置。"),
            asset("010-pointer-step", "指针下标步长", "展示不同指针类型影响地址步长", "address-calc", "ElemType * 每次跨过 sizeof(ElemType)。"),
            asset("010-locate-flow", "按值查找顺序扫描", "展示从头到尾比较", "algorithm-flow", "找到目标返回位序，找不到返回 0。"),
            asset("010-struct-compare", "结构体比较", "展示逐字段比较", "comparison", "结构体相等取决于字段规则。"),
        ],
    },
    {
        "number": "011",
        "chapter": "第二章 线性表",
        "source_prefix": "011 ",
        "title": "2.3.1 单链表的定义",
        "subtitle": "链式存储、结点结构、typedef、带头结点与不带头结点",
        "objectives": [
            "理解单链表用结点的 next 指针表示逻辑后继关系。",
            "掌握 LNode、LinkList、typedef 和头指针的含义。",
            "区分带头结点与不带头结点的初始化和判空条件。",
        ],
        "sections": [
            make_section(
                "链式存储与单链表结点",
                text_to_paragraphs(
                    "单链表是用链式存储实现的线性表。每个结点包含数据域 data 和指针域 next，next 指向下一个结点。由于每个结点只有一个后继指针，所以称为单链表。",
                    "链表中的结点可以离散存放在内存各处，拓展容量时只需申请一个新结点并修改指针，不要求整片连续空间。但单链表不支持随机存取，查找第 i 个结点只能从头开始沿 next 逐个向后找。",
                ),
                "单链表用指针表示前后关系，换来了容量灵活性，也失去了随机存取。",
                ["结点 = 数据域 + 指针域。"],
                ["011-node-structure", "011-chain-memory"],
            ),
            make_section(
                "C 语言中的结点定义与 typedef",
                text_to_paragraphs(
                    "可以用 struct LNode 定义结点类型，其中 data 保存数据元素，struct LNode *next 保存后继结点地址。typedef 可为类型取别名，让代码更简洁。",
                    "LNode * 强调“这是一个结点指针”；LinkList 本质上也是 LNode *，但语义上强调“这是一个链表的头指针”。教材中两种写法都会出现，关键是理解它们底层等价、语义侧重点不同。",
                ),
                "LNode * 和 LinkList 类型等价，但命名表达的语义不同。",
                ["typedef 是类型重命名，不会创建变量。"],
                ["011-typedef"],
            ),
            make_section(
                "带头结点与不带头结点",
                text_to_paragraphs(
                    "不带头结点时，头指针 L 直接指向第一个数据结点；空表时 L == NULL。初始化时需要把 L 设为 NULL，避免脏数据。",
                    "带头结点时，L 指向一个不存放实际数据的头结点；空表时 L->next == NULL。带头结点能把表头插入、删除等操作统一成普通位置操作，代码通常更简单，因此后续默认多采用带头结点写法。",
                ),
                "带头结点让表头操作更统一，不带头结点在处理第一个元素时常要特殊分支。",
                ["两种实现的判空条件不同。"],
                ["011-head-node"],
            ),
        ],
        "codeBlocks": [
            code_block("code-011-link-def", "带头结点单链表定义与初始化", "整理 LNode、LinkList、InitList 和 Empty 的 C 写法。", COMMON_CODE["link_def"]),
            code_block(
                "code-011-no-head",
                "不带头结点的初始化与判空",
                "不带头结点时，头指针直接代表第一个数据结点。",
                r"""
#include <stdbool.h>

typedef int ElemType;
typedef struct LNode {
    ElemType data;
    struct LNode *next;
} LNode, *LinkList;

void InitListWithoutHead(LinkList *L) {
    *L = NULL;
}

bool EmptyWithoutHead(LinkList L) {
    return L == NULL;
}
""",
            ),
        ],
        "mistakes": [
            {"title": "把 LinkList 当成新结构体", "detail": "LinkList 通常只是 LNode * 的别名，表示链表头指针。"},
            {"title": "判空条件写错", "detail": "带头结点看 L->next，不带头结点看 L 本身是否为 NULL。"},
            {"title": "忘记初始化头指针或头结点 next", "detail": "未初始化的指针可能含有脏数据，导致访问非法地址。"},
        ],
        "summary": [
            "单链表结点由 data 和 next 组成，next 表示逻辑后继。",
            "链式存储不要求物理连续，容量扩展方便，但不支持随机存取。",
            "带头结点和不带头结点的初始化、判空与表头操作处理方式不同。",
        ],
        "quiz": [
            quiz("单链表结点通常包含哪两部分？", ["A. data 和 next", "B. length 和 MaxSize", "C. front 和 rear", "D. key 和 hash"], "A", "单链表结点包含数据域和后继指针域。"),
            quiz("带头结点单链表为空时，通常满足什么条件？", ["A. L == NULL", "B. L->next == NULL", "C. L->data == 0", "D. L->next == L"], "B", "头结点存在，但没有第一个数据结点。"),
            quiz("单链表为什么不能随机存取？", ["A. 结点没有 data", "B. 结点不一定连续，必须沿 next 查找", "C. 不能用 malloc", "D. length 不能保存"], "B", "必须从头结点沿指针逐个定位目标结点。"),
        ],
        "svgAssets": [
            asset("011-node-structure", "单链表结点结构", "展示 data + next", "pointer", "一个结点由数据域和指针域组成。"),
            asset("011-chain-memory", "链式离散存储", "展示物理离散但逻辑相邻", "memory-layout", "指针把离散结点串成线性结构。"),
            asset("011-typedef", "LNode 与 LinkList", "展示类型别名的语义", "comparison", "同为指针，语义侧重点不同。"),
            asset("011-head-node", "带头结点与不带头结点", "对比两种单链表", "comparison", "头指针和判空条件不同。"),
        ],
    },
    {
        "number": "012",
        "chapter": "第二章 线性表",
        "source_prefix": "012 ",
        "title": "2.3.2-1 单链表的插入删除",
        "subtitle": "按位插入、后插、前插、按位删除和指定结点删除",
        "objectives": [
            "掌握带头结点单链表按位插入和删除的基本过程。",
            "理解后插操作和前插操作的指针修改顺序。",
            "掌握删除指定结点时复制后继数据的技巧及其局限。",
        ],
        "sections": [
            make_section(
                "带头结点的按位插入",
                text_to_paragraphs(
                    "在第 i 个位置插入新结点，需要先找到第 i-1 个结点 p，再把新结点 s 插到 p 后面。带头结点时可把头结点看成第 0 个结点，因此 i=1 的表头插入也能走同一套逻辑。",
                    "核心指针修改顺序是先令 s->next = p->next，再令 p->next = s。若顺序颠倒，可能让 s 指向自己，或让后续链断开。",
                ),
                "单链表插入先找前驱，再后插；指针修改顺序不能颠倒。",
                ["带头结点让第一个位置插入不必特殊处理。"],
                ["012-insert-after", "012-insert-order"],
            ),
            make_section(
                "不带头结点的特殊情况",
                text_to_paragraphs(
                    "不带头结点时，L 直接指向第一个数据结点。如果要在第 1 个位置插入，必须修改头指针 L，让它指向新结点，因此需要单独处理 i=1 的情况。",
                    "这正是带头结点写法更方便的原因：头指针始终指向头结点，不会因为表头插入或删除而改变。",
                ),
                "不带头结点时，表头插入和删除会修改头指针，代码更容易出现分支。",
                ["考试要先看题目是否带头结点。"],
                ["012-head-special"],
            ),
            make_section(
                "后插、前插与数据复制技巧",
                text_to_paragraphs(
                    "给定结点 p，在其后插入新元素只需 O(1)：申请新结点 s，写入数据，执行 s->next = p->next 与 p->next = s。",
                    "给定结点 p，要在它前面插入元素时，单链表不能直接找到前驱。若没有头指针，可先把新结点插到 p 后面，再交换或复制数据域，从逻辑效果上实现“前插”。这种技巧时间复杂度 O(1)。",
                ),
                "单链表擅长后插；前插若找不到前驱，可用数据复制技巧转化。",
                ["结点位置不动，数据可以移动。"],
                ["012-pre-insert"],
            ),
            make_section(
                "删除操作",
                text_to_paragraphs(
                    "按位删除第 i 个结点，需要先找到第 i-1 个结点 p，再令 q = p->next，保存 q->data，令 p->next = q->next，最后 free(q)。最好情况删除第一个结点为 O(1)，平均和最坏为 O(n)。",
                    "若只给定要删除的结点 p，可以把后继结点 q 的数据复制到 p，再让 p 跳过 q 并 free(q)，从逻辑上删除 p。但如果 p 是最后一个结点，q 为 NULL，这种方法失效，只能从头查找前驱。",
                ),
                "删除结点要修改前驱指针并释放被删结点；指定结点删除技巧不能处理尾结点。",
                ["free 用于归还 malloc 申请的结点空间。"],
                ["012-delete-node", "012-delete-given"],
            ),
        ],
        "codeBlocks": [
            code_block("code-012-link-ops", "单链表插入与删除", "整理按位插入、后插、按位删除的带头结点版本。", COMMON_CODE["link_insert_delete"]),
            code_block(
                "code-012-delete-given",
                "删除指定结点的 O(1) 技巧",
                "仅当 p 不是尾结点时可用。",
                r"""
#include <stdbool.h>
#include <stdlib.h>

typedef struct LNode {
    int data;
    struct LNode *next;
} LNode;

bool DeleteNode(LNode *p) {
    if (p == NULL || p->next == NULL) {
        return false;     // 尾结点不能用此技巧删除
    }
    LNode *q = p->next;
    p->data = q->data;
    p->next = q->next;
    free(q);
    return true;
}
""",
            ),
        ],
        "mistakes": [
            {"title": "后插两句顺序颠倒", "detail": "必须先接上后继 s->next，再让 p->next 指向 s。"},
            {"title": "忘记处理不带头结点的 i=1", "detail": "表头插入或删除会改变头指针，需要特殊处理。"},
            {"title": "删除后忘记 free", "detail": "malloc 申请的结点删除后必须释放，否则内存泄漏。"},
            {"title": "指定结点删除误用于尾结点", "detail": "尾结点没有后继，复制后继数据的方法会访问空指针。"},
        ],
        "summary": [
            "带头结点单链表按位插入和删除都先找第 i-1 个结点。",
            "后插操作是很多链表操作的基础，指针顺序非常关键。",
            "前插和指定结点删除可以借助数据复制技巧，但有适用边界。",
            "链表插删本身改指针是 O(1)，按位操作的 O(n) 通常来自查找位置。",
        ],
        "quiz": [
            quiz("在 p 后插入 s，正确的两句顺序是？", ["A. p->next=s; s->next=p->next", "B. s->next=p->next; p->next=s", "C. p=s; s=p->next", "D. free(s); p->next=s"], "B", "先让 s 接上原后继，再让 p 指向 s。"),
            quiz("带头结点单链表在第 1 位插入时，要找哪个结点？", ["A. 第 -1 个", "B. 第 0 个头结点", "C. 第 1 个数据结点", "D. 尾结点"], "B", "头结点可视作第 0 个结点。"),
            quiz("只给定结点 p，用复制后继数据删除 p 时，哪种情况不能处理？", ["A. p 是中间结点", "B. p 是尾结点", "C. p 有后继", "D. p->next 非空"], "B", "尾结点没有后继，无法复制 q->data。"),
        ],
        "svgAssets": [
            asset("012-insert-after", "单链表后插过程", "展示 s 插入 p 后", "pointer", "s 先指向 p 的原后继，再由 p 指向 s。"),
            asset("012-insert-order", "指针顺序错误示意", "展示颠倒顺序导致自环或断链", "pointer", "强调指针修改顺序。"),
            asset("012-head-special", "带头与不带头表头插入", "对比是否需要修改头指针", "comparison", "不带头结点要特殊处理 i=1。"),
            asset("012-pre-insert", "前插的数据复制技巧", "展示先后插再换数据", "algorithm-flow", "用数据移动实现逻辑前插。"),
            asset("012-delete-node", "按位删除过程", "展示 p、q 和 free", "pointer", "前驱 p 跳过 q 后释放 q。"),
            asset("012-delete-given", "删除指定结点技巧", "展示复制后继数据后删除后继", "algorithm-flow", "适用于 p 非尾结点。"),
        ],
    },
    {
        "number": "013",
        "chapter": "第二章 线性表",
        "source_prefix": "013 ",
        "title": "2.3.2-2 单链表的查找",
        "subtitle": "按位查找、按值查找、求表长与封装思想",
        "objectives": [
            "掌握带头结点单链表按位查找 GetElem 的循环写法。",
            "掌握按值查找 LocateElem 和求表长 Length 的遍历思想。",
            "理解封装基本操作可以减少重复代码并提升可维护性。",
        ],
        "sections": [
            make_section(
                "按位查找",
                text_to_paragraphs(
                    "带头结点单链表可以把头结点视为第 0 个结点。按位查找第 i 个结点时，令 p 从头结点出发，计数器 j 从 0 开始，每次 p = p->next、j++，直到 j == i 或 p == NULL。",
                    "如果 i 超过实际表长，最终 p 会变为 NULL，调用者可据此判断查找失败。按位查找需要从头遍历，因此平均和最坏时间复杂度都是 O(n)。",
                ),
                "单链表按位查找没有地址公式，只能沿 next 指针逐个走。",
                ["返回 NULL 是常见的失败反馈。"],
                ["013-get-elem"],
            ),
            make_section(
                "按值查找",
                text_to_paragraphs(
                    "按值查找从第一个数据结点开始，逐个比较 p->data 与目标值 e。找到则返回当前结点指针，遍历到 NULL 仍未找到则返回 NULL。",
                    "若 ElemType 是 int 等基本类型，可以用 ==；若是结构体，应自定义相等判断规则。按值查找同样需要顺序遍历，时间复杂度为 O(n)。",
                ),
                "单链表按值查找本质上也是遍历，目标越靠后比较越多。",
                ["链表有序也不能像顺序表那样直接折半查找。"],
                ["013-locate-elem"],
            ),
            make_section(
                "求表长与封装复用",
                text_to_paragraphs(
                    "求单链表长度时，让 p 指向第一个数据结点，每经过一个结点计数器加 1，直到 p == NULL。这个过程和查找操作一样，核心都是遍历。",
                    "实现 GetElem 后，按位插入和按位删除可以直接调用 GetElem(L, i-1) 找前驱，再调用后插或删除逻辑。把常用功能封装成基本操作，可以避免重复代码，也便于统一修复 bug。",
                ),
                "链表操作的基础能力是遍历；封装能让复杂操作更清晰、更好维护。",
                ["GetElem 是插入、删除等操作可复用的基础。"],
                ["013-length", "013-reuse"],
            ),
        ],
        "codeBlocks": [
            code_block(
                "code-013-search",
                "单链表查找与求长",
                "基于带头结点单链表的 GetElem、LocateElem 和 Length。",
                r"""
#include <stddef.h>

typedef int ElemType;
typedef struct LNode {
    ElemType data;
    struct LNode *next;
} LNode, *LinkList;

LNode *GetElem(LinkList L, int i) {
    if (i < 0) {
        return NULL;
    }
    LNode *p = L;
    int j = 0;
    while (p != NULL && j < i) {
        p = p->next;
        j++;
    }
    return p;
}

LNode *LocateElem(LinkList L, ElemType e) {
    LNode *p = L->next;
    while (p != NULL && p->data != e) {
        p = p->next;
    }
    return p;
}

int Length(LinkList L) {
    int len = 0;
    for (LNode *p = L->next; p != NULL; p = p->next) {
        len++;
    }
    return len;
}
""",
            )
        ],
        "mistakes": [
            {"title": "从头结点开始比较 data", "detail": "带头结点不存实际数据，按值查找应从 L->next 开始。"},
            {"title": "循环条件漏掉 p != NULL", "detail": "若不检查空指针，越界查找会访问非法地址。"},
            {"title": "认为单链表按位查找是 O(1)", "detail": "单链表不连续，必须从头沿指针查找，复杂度 O(n)。"},
        ],
        "summary": [
            "单链表按位、按值查找和求表长都依赖遍历。",
            "带头结点时可把头结点视为第 0 个结点。",
            "查找失败常用 NULL 表示，调用者应检查返回值。",
            "封装 GetElem 等基本操作能减少重复代码，提高可维护性。",
        ],
        "quiz": [
            quiz("带头结点单链表中，GetElem(L, 0) 通常返回什么？", ["A. NULL", "B. 头结点", "C. 第一个数据结点", "D. 尾结点"], "B", "带头结点可视为第 0 个结点。"),
            quiz("单链表按位查找第 i 个结点的平均复杂度是？", ["A. O(1)", "B. O(log n)", "C. O(n)", "D. O(n^2)"], "C", "必须从头沿 next 逐个定位。"),
            quiz("求单链表长度时，计数器何时加 1？", ["A. 每经过一个数据结点", "B. 每经过一个空指针", "C. 只在头结点", "D. 只在尾结点"], "A", "遍历数据结点，每访问一个数据结点长度加 1。"),
        ],
        "svgAssets": [
            asset("013-get-elem", "按位查找路径", "展示 p 和 j 从头向后移动", "pointer", "计数器和指针同步前进。"),
            asset("013-locate-elem", "按值查找路径", "展示逐结点比较 data", "algorithm-flow", "找到目标或走到 NULL。"),
            asset("013-length", "求表长遍历", "展示计数累加", "algorithm-flow", "每经过一个数据结点 len++。"),
            asset("013-reuse", "基本操作复用", "展示 GetElem 支撑插入删除", "algorithm-flow", "封装减少重复逻辑。"),
        ],
    },
    {
        "number": "014",
        "chapter": "第二章 线性表",
        "source_prefix": "014 ",
        "title": "2.3.2-3 单链表的建立",
        "subtitle": "尾插法、头插法与链表逆置思想",
        "objectives": [
            "掌握尾插法建立单链表，并理解尾指针 r 的作用。",
            "掌握头插法建立单链表，并理解输入序列会被逆置。",
            "理解头插法可用于链表逆置这一常见考点。",
        ],
        "sections": [
            make_section(
                "尾插法建立单链表",
                text_to_paragraphs(
                    "尾插法每次把新结点插入表尾。若每次都从头查找尾结点，建立 n 个结点需要 0+1+...+(n-1) 次查找，复杂度 O(n^2)。",
                    "更好的做法是维护尾指针 r，让 r 始终指向当前尾结点。每读入一个数据元素，就申请新结点 s，令 r->next = s，再令 r = s。最终把 r->next 置为 NULL。这样建立 n 个结点只需 O(n)。",
                ),
                "尾插法要用尾指针 r 避免每次从头找表尾。",
                ["r 永远指向当前最后一个数据结点。"],
                ["014-tail-insert"],
            ),
            make_section(
                "头插法建立单链表",
                text_to_paragraphs(
                    "头插法每次把新结点插入头结点之后。核心代码是 s->next = L->next; L->next = s。因为每次都插到表头，输入顺序为 10、16、27 时，最终链表顺序会变成 27、16、10。",
                    "初始化时应把头结点的 next 置为 NULL。若不初始化，头结点 next 可能含有脏数据，导致最后一个结点指向未知区域。",
                ),
                "头插法简单高效，但会得到输入序列的逆序。",
                ["头插法的链表方向与输入顺序相反。"],
                ["014-head-insert"],
            ),
            make_section(
                "头插法与链表逆置",
                text_to_paragraphs(
                    "因为头插法会逆置输入顺序，所以常用于链表逆置。可以新建一个空链表，依次取旧链表元素并头插到新链表；也可以把旧链表的结点逐个摘下，再头插回原头结点之后，实现原地逆置。",
                    "这一思想比死记代码更重要：很多复杂链表题都可以拆成“摘下一个结点”和“把结点头插到另一个位置”。",
                ),
                "头插法不仅用于建表，也是一类链表逆置题的核心思路。",
                ["逆置链表时可以反复执行头插。"],
                ["014-reverse"],
            ),
        ],
        "codeBlocks": [
            code_block(
                "code-014-build",
                "头插法与尾插法",
                "以数组输入代替 scanf，便于阅读和测试。",
                r"""
#include <stdbool.h>
#include <stdlib.h>

typedef int ElemType;
typedef struct LNode {
    ElemType data;
    struct LNode *next;
} LNode, *LinkList;

bool InitList(LinkList *L) {
    *L = (LNode *)malloc(sizeof(LNode));
    if (*L == NULL) {
        return false;
    }
    (*L)->next = NULL;
    return true;
}

bool CreateListTail(LinkList *L, const ElemType a[], int n) {
    if (!InitList(L)) {
        return false;
    }
    LNode *r = *L;
    for (int i = 0; i < n; ++i) {
        LNode *s = (LNode *)malloc(sizeof(LNode));
        if (s == NULL) {
            return false;
        }
        s->data = a[i];
        s->next = NULL;
        r->next = s;
        r = s;
    }
    return true;
}

bool CreateListHead(LinkList *L, const ElemType a[], int n) {
    if (!InitList(L)) {
        return false;
    }
    for (int i = 0; i < n; ++i) {
        LNode *s = (LNode *)malloc(sizeof(LNode));
        if (s == NULL) {
            return false;
        }
        s->data = a[i];
        s->next = (*L)->next;
        (*L)->next = s;
    }
    return true;
}
""",
            )
        ],
        "mistakes": [
            {"title": "尾插法不维护尾指针", "detail": "每次从头找尾会把建表复杂度提高到 O(n^2)。"},
            {"title": "头结点 next 未初始化", "detail": "头插法依赖 L->next，若其中有脏数据会导致链表尾部异常。"},
            {"title": "忘记头插法会逆序", "detail": "每个新结点都插到最前面，最终顺序与输入顺序相反。"},
        ],
        "summary": [
            "尾插法保持输入顺序，使用尾指针可做到 O(n)。",
            "头插法每次插到表头，最终链表是输入序列的逆序。",
            "头插法思想常用于链表逆置题。",
        ],
        "quiz": [
            quiz("尾插法中尾指针 r 的作用是？", ["A. 指向头结点前一个位置", "B. 始终指向当前尾结点", "C. 保存链表长度", "D. 释放结点"], "B", "r 让每次尾插都能 O(1) 找到表尾。"),
            quiz("输入 10、16、27，用头插法建立链表，最终顺序是？", ["A. 10、16、27", "B. 27、16、10", "C. 16、10、27", "D. 空表"], "B", "头插法每次插在最前面，因此逆序。"),
            quiz("不维护尾指针的尾插法建立 n 个结点，复杂度可能是？", ["A. O(1)", "B. O(log n)", "C. O(n)", "D. O(n^2)"], "D", "每次从头找尾，总查找次数为等差数列。"),
        ],
        "svgAssets": [
            asset("014-tail-insert", "尾插法建表", "展示 r 指针随尾结点移动", "pointer", "新结点接到 r 后，r 更新为新结点。"),
            asset("014-head-insert", "头插法建表", "展示新结点插到头结点之后", "pointer", "每次新结点成为第一个数据结点。"),
            asset("014-reverse", "头插法逆置链表", "展示摘下结点并头插", "algorithm-flow", "头插法实现链表逆序。"),
        ],
    },
    {
        "number": "015",
        "chapter": "第二章 线性表",
        "source_prefix": "015 ",
        "title": "2.3.3 双链表",
        "subtitle": "prior 与 next 双向指针、插入删除边界和双向遍历",
        "objectives": [
            "理解双链表结点包含 prior、data、next 三部分。",
            "掌握双链表初始化、判空、后插、删除和销毁的基本写法。",
            "理解双链表可以向前遍历，也能更方便地找到前驱。",
        ],
        "sections": [
            make_section(
                "双链表结点结构",
                text_to_paragraphs(
                    "单链表只能通过 next 找后继，给定某个结点时找前驱很麻烦。双链表在每个结点中增加 prior 指针，指向前驱结点，同时保留 next 指向后继结点。",
                    "带头结点双链表初始化时，申请头结点，并把头结点的 prior 和 next 都设为 NULL。判空只需判断 L->next == NULL。",
                ),
                "双链表用额外的 prior 指针换取双向移动能力。",
                ["DNode 中的 D 表示 double。"],
                ["015-dnode"],
            ),
            make_section(
                "双链表插入",
                text_to_paragraphs(
                    "在结点 p 后插入 s，需要同时维护四条关系：s->next 指向 p 的原后继；若 p 原来有后继，则原后继的 prior 指向 s；s->prior 指向 p；p->next 指向 s。",
                    "若 p 是尾结点，p->next 为 NULL，此时不能访问 p->next->prior，应先判断 p->next 是否为空。指针赋值顺序也很重要，过早改 p->next 会丢失原后继。",
                ),
                "双链表插入要同时接好前后两个方向，尾结点情况要避免空指针。",
                ["先保存或使用原后继，再改 p->next。"],
                ["015-insert"],
            ),
            make_section(
                "双链表删除和销毁",
                text_to_paragraphs(
                    "删除 p 的后继结点 q 时，先令 p->next = q->next；若 q 有后继，再令 q->next->prior = p；最后 free(q)。若 p 本来没有后继，删除失败。",
                    "销毁双链表可以循环删除头结点的后继结点，直到表空，最后释放头结点并把头指针置空。由 malloc 申请的每个结点都应释放。",
                ),
                "删除操作既要断开 next，也要修复 prior，最后释放结点空间。",
                ["删除尾结点时要跳过 q->next->prior。"],
                ["015-delete"],
            ),
            make_section(
                "双向遍历与查找",
                text_to_paragraphs(
                    "双链表可以沿 next 从前往后遍历，也可以沿 prior 从某个结点往前遍历。若不想处理头结点，向前遍历时可在 p->prior == NULL 前停止。",
                    "双链表仍然不支持随机存取。按位查找、按值查找依旧需要遍历，时间复杂度通常为 O(n)。",
                ),
                "双链表比单链表更方便双向移动，但查找某个位序仍是 O(n)。",
                ["双向不是随机存取。"],
                ["015-traverse"],
            ),
        ],
        "codeBlocks": [
            code_block(
                "code-015-dlink",
                "双链表插入与删除",
                "包含尾结点边界判断的后插和删除操作。",
                r"""
#include <stdbool.h>
#include <stdlib.h>

typedef int ElemType;
typedef struct DNode {
    ElemType data;
    struct DNode *prior;
    struct DNode *next;
} DNode, *DLinkList;

bool InsertNextDNode(DNode *p, DNode *s) {
    if (p == NULL || s == NULL) {
        return false;
    }
    s->next = p->next;
    if (p->next != NULL) {
        p->next->prior = s;
    }
    s->prior = p;
    p->next = s;
    return true;
}

bool DeleteNextDNode(DNode *p) {
    if (p == NULL || p->next == NULL) {
        return false;
    }
    DNode *q = p->next;
    p->next = q->next;
    if (q->next != NULL) {
        q->next->prior = p;
    }
    free(q);
    return true;
}
""",
            )
        ],
        "mistakes": [
            {"title": "删除时只改 next 不改 prior", "detail": "双链表有两个方向的连接，必须保持一致。"},
            {"title": "尾结点插入或删除访问空指针", "detail": "p->next 或 q->next 为 NULL 时不能再访问其 prior。"},
            {"title": "认为双链表可随机存取", "detail": "双链表能双向走，但仍需沿指针逐个查找。"},
        ],
        "summary": [
            "双链表结点包含 prior、data、next。",
            "插入和删除要维护前后两个方向的指针。",
            "边界处要检查后继是否为空，避免空指针访问。",
            "双链表可双向遍历，但查找复杂度仍通常为 O(n)。",
        ],
        "quiz": [
            quiz("双链表相比单链表新增了什么指针？", ["A. prior", "B. front", "C. rear", "D. hash"], "A", "prior 指向前驱结点。"),
            quiz("在 p 后插入 s 时，若 p 是尾结点，应避免访问什么？", ["A. p->data", "B. p->next->prior", "C. s->prior", "D. s->next"], "B", "尾结点 p->next 为 NULL。"),
            quiz("双链表按位查找的复杂度通常是？", ["A. O(1)", "B. O(log n)", "C. O(n)", "D. O(n^3)"], "C", "仍需要沿指针遍历。"),
        ],
        "svgAssets": [
            asset("015-dnode", "双链表结点", "展示 prior、data、next", "pointer", "结点有前驱和后继两个方向指针。"),
            asset("015-insert", "双链表后插", "展示四条指针修改", "pointer", "同时接好 p、s、原后继。"),
            asset("015-delete", "双链表删除", "展示跳过 q 并修复 prior", "pointer", "删除 p 的后继 q。"),
            asset("015-traverse", "双向遍历", "展示 next 与 prior 两个方向", "algorithm-flow", "可从前往后也可从后往前。"),
        ],
    },
    {
        "number": "016",
        "chapter": "第二章 线性表",
        "source_prefix": "016 ",
        "title": "2.3.4 循环链表",
        "subtitle": "循环单链表、循环双链表与表头表尾操作",
        "objectives": [
            "理解循环单链表和循环双链表的闭环结构。",
            "掌握循环链表的初始化、判空和表尾判断条件。",
            "理解循环链表在表头、表尾操作以及边界代码上的优势。",
        ],
        "sections": [
            make_section(
                "循环单链表",
                text_to_paragraphs(
                    "普通单链表的尾结点 next 指向 NULL，循环单链表的尾结点 next 指回头结点。初始化空循环单链表时，头结点的 next 指向自己；判空条件是 L->next == L。",
                    "判断某结点 p 是否为表尾，可看 p->next 是否等于头结点 L。因为形成闭环，只要给定某个结点并沿 next 走，最终可以回到链表中任意位置。",
                ),
                "循环单链表把尾部接回头结点，空表时头结点指向自己。",
                ["遍历循环链表时停止条件不再是 NULL。"],
                ["016-cslist"],
            ),
            make_section(
                "尾指针与表头表尾操作",
                text_to_paragraphs(
                    "普通单链表若只知道头指针，找尾结点需要 O(n)。循环单链表可以让 L 指向尾结点，此时 L->next 就是头结点，所以表头和表尾都能在 O(1) 时间定位。",
                    "若应用场景经常在表头或表尾操作，带尾指针的循环单链表会更方便。不过在表尾插入或删除后，要维护尾指针的正确指向。",
                ),
                "循环单链表配合尾指针，可以快速定位表头和表尾。",
                ["尾指针 L 的 next 即为头结点。"],
                ["016-tail-pointer"],
            ),
            make_section(
                "循环双链表",
                text_to_paragraphs(
                    "循环双链表中，尾结点 next 指向头结点，头结点 prior 指向尾结点。初始化空表时，头结点的 next 和 prior 都指向自己；判空仍可看 L->next == L。",
                    "普通双链表在尾结点后插或删除尾结点时要避免空指针，但循环双链表的头尾相接使 next 和 prior 不为空，许多边界代码可以统一处理。",
                ),
                "循环双链表把两个方向都闭合，使头尾边界更统一。",
                ["普通链表的 NULL 边界，在循环链表中变成头结点边界。"],
                ["016-cdlist", "016-boundary"],
            ),
            make_section(
                "写循环链表代码的检查思路",
                text_to_paragraphs(
                    "写链表代码时，应先明确空表状态、表头和表尾判断条件，再写遍历停止条件。循环链表尤其不能照搬普通链表的 p != NULL。",
                    "插入或删除时要分别考虑表头、表中、表尾三种位置。只要这些边界都能覆盖，代码通常就比较稳。",
                ),
                "循环链表的难点不是概念，而是遍历停止条件和边界判断要换成“是否回到头结点”。",
                ["先想清楚空表长什么样，再写初始化和判空。"],
                ["016-checklist"],
            ),
        ],
        "codeBlocks": [
            code_block(
                "code-016-circular",
                "循环单链表与循环双链表初始化",
                "展示空表时指针如何指回头结点。",
                r"""
#include <stdbool.h>
#include <stdlib.h>

typedef int ElemType;

typedef struct LNode {
    ElemType data;
    struct LNode *next;
} LNode, *LinkList;

bool InitCircularList(LinkList *L) {
    *L = (LNode *)malloc(sizeof(LNode));
    if (*L == NULL) {
        return false;
    }
    (*L)->next = *L;
    return true;
}

bool EmptyCircularList(LinkList L) {
    return L->next == L;
}

typedef struct DNode {
    ElemType data;
    struct DNode *prior;
    struct DNode *next;
} DNode, *DLinkList;

bool InitCircularDList(DLinkList *L) {
    *L = (DNode *)malloc(sizeof(DNode));
    if (*L == NULL) {
        return false;
    }
    (*L)->prior = *L;
    (*L)->next = *L;
    return true;
}
""",
            )
        ],
        "mistakes": [
            {"title": "循环链表判空仍写 next == NULL", "detail": "带头结点循环单链表空表时 L->next == L。"},
            {"title": "遍历停止条件照搬普通链表", "detail": "循环链表不会自然走到 NULL，应以是否回到头结点作为停止条件。"},
            {"title": "尾指针更新遗漏", "detail": "若 L 指向尾结点，表尾插入或删除后要更新 L。"},
        ],
        "summary": [
            "循环单链表尾结点 next 指向头结点，空表时头结点 next 指向自己。",
            "循环双链表头尾两个方向都闭合，空表时 next 和 prior 都指向头结点。",
            "循环链表可统一部分边界处理，但遍历停止条件必须改写。",
        ],
        "quiz": [
            quiz("带头结点循环单链表为空时满足什么？", ["A. L == NULL", "B. L->next == NULL", "C. L->next == L", "D. L->data == 0"], "C", "空循环单链表中头结点指向自己。"),
            quiz("判断循环单链表结点 p 是否为尾结点，可检查什么？", ["A. p == NULL", "B. p->next == L", "C. p->data == -1", "D. p->next == NULL"], "B", "尾结点的 next 指回头结点。"),
            quiz("循环双链表空表时，头结点 prior 指向哪里？", ["A. NULL", "B. 第一个数据结点", "C. 头结点自己", "D. 随机地址"], "C", "空循环双链表的 prior 和 next 都指向头结点自身。"),
        ],
        "svgAssets": [
            asset("016-cslist", "循环单链表", "展示尾结点 next 指回头结点", "pointer", "单向闭环。"),
            asset("016-tail-pointer", "尾指针定位头尾", "展示 L 指向尾结点时 L->next 为头结点", "pointer", "O(1) 找表头和表尾。"),
            asset("016-cdlist", "循环双链表", "展示 next 与 prior 两个闭环", "pointer", "双向闭环。"),
            asset("016-boundary", "循环链表边界统一", "对比普通双链表和循环双链表尾部操作", "comparison", "NULL 边界变为头结点。"),
            asset("016-checklist", "循环链表代码检查", "展示空表、表头、表尾、遍历停止条件", "algorithm-flow", "写代码前先确认边界条件。"),
        ],
    },
    {
        "number": "017",
        "chapter": "第二章 线性表",
        "source_prefix": "017 ",
        "title": "2.3.5 静态链表",
        "subtitle": "用数组模拟链式结构，用游标表示后继",
        "objectives": [
            "理解静态链表是用数组实现的链表，游标 next 保存后继下标。",
            "掌握静态链表结点定义、初始化、空闲结点标记和基本操作思路。",
            "理解静态链表与顺序表、单链表的区别和适用场景。",
        ],
        "sections": [
            make_section(
                "静态链表的基本思想",
                text_to_paragraphs(
                    "静态链表分配一整片连续数组空间，每个数组元素是一个结点，包含 data 和 next。这里的 next 不存真实内存地址，而存下一个结点的数组下标，也叫游标。",
                    "数组下标 0 常作为头结点，不存实际数据。若某结点 next 为 -1，可表示它是表尾；若用 -2 标记空闲结点，计算机就能区分哪些数组位置尚未被链表使用。",
                ),
                "静态链表用数组下标模拟指针，逻辑相邻不要求物理下标相邻。",
                ["游标 next 的角色类似单链表中的指针。"],
                ["017-static-layout", "017-cursor-link"],
            ),
            make_section(
                "静态链表的 C 定义",
                text_to_paragraphs(
                    "可以先定义 Node 结构体，再声明 Node list[MaxSize]。教材中可能使用 typedef struct {...} SLinkList[MaxSize] 的写法，它本质上是把“长度为 MaxSize 的结点数组”重命名为 SLinkList。",
                    "每个结点大小固定，因此数组下标可以根据起始地址和结点大小换算为实际地址。但查找第 i 个逻辑结点时，仍要从头结点沿游标逐个查找。",
                ),
                "SLinkList 本质上是结点数组，只是命名上强调它是一种静态链表。",
                ["typedef 可以给数组类型取别名。"],
                ["017-typedef-array"],
            ),
            make_section(
                "基本操作思路",
                text_to_paragraphs(
                    "初始化时，头结点 list[0].next 设为 -1，表示空表；其他空闲结点可把 next 设为 -2，表示可用空间。插入时先找到空闲结点，再找到第 i-1 个逻辑结点，修改游标完成连接。",
                    "删除时，修改前驱结点的 next 让它跳过被删结点，再把被删结点 next 标记为 -2，表示回收到空闲区。与顺序表不同，静态链表插删不需要大量移动元素；与单链表相同，按位查找仍是 O(n)。",
                ),
                "静态链表插删改游标，不移动元素；查找仍要沿逻辑链走。",
                ["删除后要把结点标记为空闲。"],
                ["017-insert-delete"],
            ),
            make_section(
                "特点与应用",
                text_to_paragraphs(
                    "静态链表容量固定，不能像动态链表那样随时 malloc 新结点；它也不支持随机存取某个逻辑位序。优点是在不支持指针的语言中也能模拟链表，且数据数量基本固定时比较合适。",
                    "操作系统中的文件分配表 FAT 可以从静态链表的角度理解：用表项和下标关系表示文件块之间的后继关系。",
                ),
                "静态链表是数组和链表思想的折中：数组存空间，游标存关系。",
                ["适合容量固定、需要游标关系的场景。"],
                ["017-compare"],
            ),
        ],
        "codeBlocks": [
            code_block(
                "code-017-static",
                "静态链表定义与初始化",
                "用 FREE=-2 标记空闲结点，用 NIL=-1 表示链表结束。",
                r"""
#include <stdbool.h>

#define MaxSize 50
#define NIL -1
#define FREE -2

typedef int ElemType;

typedef struct {
    ElemType data;
    int next;       // 游标：下一个结点的数组下标
} SNode;

typedef SNode SLinkList[MaxSize];

void InitSLinkList(SLinkList L) {
    L[0].next = NIL;       // 0 号单元作为头结点
    for (int i = 1; i < MaxSize; ++i) {
        L[i].next = FREE;  // 标记为空闲结点
    }
}

int FindFree(SLinkList L) {
    for (int i = 1; i < MaxSize; ++i) {
        if (L[i].next == FREE) {
            return i;
        }
    }
    return NIL;
}
""",
            )
        ],
        "mistakes": [
            {"title": "把游标当真实地址", "detail": "静态链表 next 保存的是数组下标，不是内存地址。"},
            {"title": "以为静态链表可随机按位访问", "detail": "虽然底层是数组，但逻辑位序要沿游标查找。"},
            {"title": "未标记空闲结点", "detail": "不标记空闲位置，插入时无法可靠判断哪些数组单元可用。"},
        ],
        "summary": [
            "静态链表用数组存储结点，用游标保存后继下标。",
            "头结点常放在 0 号单元，-1 表示结束，空闲结点可用特殊值标记。",
            "静态链表插删不移动元素，但查找逻辑位序仍是 O(n)。",
            "它容量固定，适合数据规模稳定或不便使用指针的场景。",
        ],
        "quiz": [
            quiz("静态链表中 next 通常保存什么？", ["A. 后继结点地址", "B. 后继结点数组下标", "C. 当前长度", "D. MaxSize"], "B", "静态链表用游标即数组下标模拟指针。"),
            quiz("静态链表删除结点后，常把该结点标记为什么状态？", ["A. 表头", "B. 空闲", "C. 满表", "D. 随机存取"], "B", "删除后该数组单元可被后续插入复用。"),
            quiz("静态链表查找第 i 个逻辑结点的复杂度通常是？", ["A. O(1)", "B. O(log n)", "C. O(n)", "D. O(n^2)"], "C", "需要从头结点沿游标逐个查找。"),
        ],
        "svgAssets": [
            asset("017-static-layout", "静态链表数组布局", "展示连续数组中的结点", "static-array", "每个数组元素含 data 和 next。"),
            asset("017-cursor-link", "游标连接逻辑顺序", "展示 0 -> 2 -> 1 -> 3 的逻辑链", "pointer", "逻辑顺序由游标决定。"),
            asset("017-typedef-array", "数组类型 typedef", "说明 SLinkList 是结点数组别名", "comparison", "typedef 给数组类型命名。"),
            asset("017-insert-delete", "静态链表插删", "展示找空闲结点和修改游标", "algorithm-flow", "插删主要修改 next 游标。"),
            asset("017-compare", "静态链表特点", "对比顺序表、单链表和静态链表", "comparison", "连续空间、游标关系、容量固定。"),
        ],
    },
    {
        "number": "018",
        "chapter": "第二章 线性表",
        "source_prefix": "018 ",
        "title": "2.3.6 顺序表和链表的比较",
        "subtitle": "从逻辑结构、存储结构和基本操作选择合适实现",
        "objectives": [
            "能从逻辑结构、存储结构和基本操作三个维度比较顺序表与链表。",
            "掌握顺序表和链表在创建、销毁、插删、查找方面的效率差异。",
            "能根据表长是否稳定、插删是否频繁、查找是否频繁选择合适结构。",
        ],
        "sections": [
            make_section(
                "逻辑结构相同，存储结构不同",
                text_to_paragraphs(
                    "顺序表和链表在逻辑上都是线性表，元素之间都是一对一的前后关系。它们的主要差别来自存储结构：顺序表用连续空间，链表用指针把离散结点连接起来。",
                    "顺序表可以随机存取，存储密度高，但要求大片连续空间，扩容不方便。链表空间分配灵活，添加结点只需 malloc 一小片空间，但不支持随机存取，并且每个结点需要额外指针域，存储密度较低。",
                ),
                "顺序表与链表的逻辑结构相同，性能差异主要由存储结构决定。",
                ["连续存储带来随机存取，链式存储带来容量灵活。"],
                ["018-storage-compare"],
            ),
            make_section(
                "创建与销毁",
                text_to_paragraphs(
                    "顺序表初始化时通常要预分配一片连续空间。分配小了后续扩容麻烦，分配大了会浪费空间。静态顺序表空间由系统随作用域结束回收；动态顺序表用 malloc 申请的堆空间必须 free。",
                    "链表初始化通常只需头指针和可选头结点，之后每次扩展再 malloc 新结点。销毁链表时要遍历所有结点并逐个 free，不能只把头指针置空。",
                ),
                "动态申请的空间必须释放；链表销毁要逐结点 free。",
                ["malloc 和 free 应成对出现。"],
                ["018-create-destroy"],
            ),
            make_section(
                "插入删除与查找",
                text_to_paragraphs(
                    "顺序表插入、删除需要移动元素，最坏和平均时间复杂度都是 O(n)，时间开销主要来自元素搬移。链表插入、删除本身改指针很快，但按位操作前往往要先查找目标位置，整体平均和最坏也常为 O(n)。当数据元素很大时，移动大量元素的实际代价可能远高于沿链查找。",
                    "顺序表按位查找是 O(1)，无序按值查找是 O(n)，若有序则可用折半查找达到 O(log n)。链表无论按位还是按值，通常都必须从头遍历，复杂度为 O(n)，即使元素有序也难以直接折半。",
                ),
                "插删频繁更偏向链表，按位查找频繁更偏向顺序表。",
                ["两者插删的大 O 可能相同，但常数代价和数据大小会影响实际效率。"],
                ["018-operation-compare"],
            ),
            make_section(
                "如何选择",
                text_to_paragraphs(
                    "如果线性表长度难以预估，且经常插入、删除，例如排队取号、叫号等动态场景，链表更合适。",
                    "如果线性表长度可预估、比较稳定，且查询操作多，例如班级点名、固定名单查询，顺序表通常效率更高。答简答题时，可以按逻辑结构、存储结构、基本操作三条线组织答案。",
                ),
                "选择结构要结合场景：表长是否稳定、是否频繁插删、是否频繁查询。",
                ["没有绝对更好，只有更适合当前需求。"],
                ["018-choice-flow"],
            ),
        ],
        "codeBlocks": [
            code_block(
                "code-018-destroy",
                "动态顺序表与链表销毁",
                "对比顺序表释放整片空间和链表逐结点释放。",
                r"""
#include <stdlib.h>

typedef int ElemType;

typedef struct {
    ElemType *data;
    int length;
    int maxSize;
} SqList;

void DestroySqList(SqList *L) {
    free(L->data);
    L->data = NULL;
    L->length = 0;
    L->maxSize = 0;
}

typedef struct LNode {
    ElemType data;
    struct LNode *next;
} LNode, *LinkList;

void DestroyLinkList(LinkList *L) {
    LNode *p = *L;
    while (p != NULL) {
        LNode *next = p->next;
        free(p);
        p = next;
    }
    *L = NULL;
}
""",
            )
        ],
        "mistakes": [
            {"title": "只看大 O 不看实际代价", "detail": "顺序表和链表插删都可能是 O(n)，但顺序表移动大元素的代价可能更高。"},
            {"title": "链表销毁只把头指针置空", "detail": "这样会丢失结点地址并造成内存泄漏，必须逐个 free。"},
            {"title": "认为有序链表可直接折半查找", "detail": "链表不能随机定位中点，折半查找依赖顺序表的随机存取。"},
        ],
        "summary": [
            "顺序表和链表都是线性表，差异主要来自存储结构。",
            "顺序表随机存取、存储密度高；链表容量灵活、插删改指针方便。",
            "顺序表扩容和插删移动元素不方便；链表查找慢且有指针开销。",
            "选择时看表长是否稳定、插删是否频繁、查询是否频繁。",
        ],
        "quiz": [
            quiz("顺序表按位查找的复杂度是？", ["A. O(1)", "B. O(n)", "C. O(n^2)", "D. O(n!)"], "A", "顺序表支持随机存取。"),
            quiz("链表相对顺序表的主要优势是？", ["A. 随机存取更快", "B. 存储密度一定更高", "C. 容量扩展和插删更灵活", "D. 不需要指针"], "C", "链表不要求连续空间，插删主要改指针。"),
            quiz("班级名单人数稳定且查询频繁，更适合使用什么？", ["A. 顺序表", "B. 链表", "C. 只能用静态链表", "D. 不能用线性表"], "A", "表长稳定且查询多，顺序表随机访问优势明显。"),
        ],
        "svgAssets": [
            asset("018-storage-compare", "存储结构对比", "展示顺序表连续与链表离散", "comparison", "同为线性表，物理实现不同。"),
            asset("018-create-destroy", "创建销毁对比", "展示预分配与逐结点释放", "algorithm-flow", "不同结构的内存管理差异。"),
            asset("018-operation-compare", "基本操作效率对比", "展示插删查找复杂度", "comparison", "按操作类型比较两种结构。"),
            asset("018-choice-flow", "结构选择流程", "根据场景选择顺序表或链表", "algorithm-flow", "表长、插删、查询决定选择。"),
        ],
    },
]


def svg_style() -> str:
    return """
    <style>
      .bg{fill:#f8fafc}.box{fill:#fff;stroke:#cbd5e1;stroke-width:2}.main{fill:#2563eb}.accent{fill:#f97316}.ok{fill:#10b981}
      .text{fill:#1f2937;font-family:'Microsoft YaHei','PingFang SC',sans-serif;font-size:16px}.small{font-size:13px}.tiny{font-size:12px}
      .arrow{stroke:#2563eb;stroke-width:2.4;fill:none;marker-end:url(#arrow)}.dash{stroke-dasharray:7 5;animation:dash 3s linear infinite}
      .pulse{animation:pulse 3s ease-in-out infinite}.move{animation:move 4s ease-in-out infinite}.scan{animation:scan 4s ease-in-out infinite}
      @keyframes dash{to{stroke-dashoffset:-48}}@keyframes pulse{0%,100%{opacity:.35}50%{opacity:1}}@keyframes move{0%,100%{transform:translateX(0)}50%{transform:translateX(18px)}}@keyframes scan{0%,100%{transform:translateX(0)}50%{transform:translateX(250px)}}
    </style>
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#2563eb"/>
      </marker>
    </defs>
    """


def svg_flow(aid: str, title: str, labels: list[str], width: int = 760, height: int = 260) -> str:
    n = len(labels)
    box_w = min(150, (width - 80) // max(n, 1) - 12)
    gap = (width - 60 - n * box_w) // max(n - 1, 1) if n > 1 else 0
    y = 105
    parts = [f'<svg id="{aid}" viewBox="0 0 {width} {height}" role="img" aria-label="{html.escape(title)}" xmlns="http://www.w3.org/2000/svg">', svg_style()]
    parts.append('<rect class="bg" x="0" y="0" width="100%" height="100%" rx="12"/>')
    parts.append(f'<text class="text" x="24" y="38" font-weight="700">{html.escape(title)}</text>')
    for i, label in enumerate(labels):
        x = 30 + i * (box_w + gap)
        cls = "box pulse" if i == 0 else "box"
        parts.append(f'<rect class="{cls}" x="{x}" y="{y}" width="{box_w}" height="64" rx="8"/>')
        parts.append(f'<text class="text small" x="{x + box_w/2}" y="{y + 38}" text-anchor="middle">{html.escape(label)}</text>')
        if i < n - 1:
            parts.append(f'<path class="arrow dash" d="M {x + box_w + 8} {y + 32} H {x + box_w + gap - 8}"/>')
    parts.append('<circle class="accent pulse" cx="48" cy="205" r="8"/>')
    parts.append('<text class="text small" x="66" y="210">动画高亮表示处理步骤正在推进</text>')
    parts.append("</svg>")
    return "".join(parts)


def svg_cells(aid: str, title: str, labels: list[str], subtitle: str = "", highlight: int | None = None) -> str:
    width, height = 760, 260
    cell_w, cell_h = 84, 54
    start_x, y = 70, 105
    parts = [f'<svg id="{aid}" viewBox="0 0 {width} {height}" role="img" aria-label="{html.escape(title)}" xmlns="http://www.w3.org/2000/svg">', svg_style()]
    parts.append('<rect class="bg" width="100%" height="100%" rx="12"/>')
    parts.append(f'<text class="text" x="24" y="38" font-weight="700">{html.escape(title)}</text>')
    if subtitle:
        parts.append(f'<text class="text small" x="24" y="64">{html.escape(subtitle)}</text>')
    for i, lab in enumerate(labels):
        x = start_x + i * cell_w
        fill_cls = "accent pulse" if highlight == i else ("ok" if i < len(labels) - 1 else "main")
        parts.append(f'<rect class="box" x="{x}" y="{y}" width="{cell_w}" height="{cell_h}"/>')
        parts.append(f'<text class="text" x="{x + cell_w/2}" y="{y + 34}" text-anchor="middle">{html.escape(lab)}</text>')
        parts.append(f'<text class="text tiny" x="{x + cell_w/2}" y="{y + cell_h + 20}" text-anchor="middle">下标 {i}</text>')
        if highlight == i:
            parts.append(f'<rect class="{fill_cls}" x="{x + 8}" y="{y - 16}" width="{cell_w - 16}" height="6" rx="3"/>')
    parts.append(f'<rect class="accent pulse" x="{start_x}" y="{y - 24}" width="36" height="8" rx="4"/>')
    parts.append('<text class="text small" x="24" y="222">连续单元表示物理地址相邻，访问时按元素大小跳转。</text>')
    parts.append("</svg>")
    return "".join(parts)


def svg_chain(aid: str, title: str, labels: list[str], doubly: bool = False, circular: bool = False) -> str:
    width, height = 820, 300
    node_w, node_h = 105, 54
    start_x, y = 70, 130
    parts = [f'<svg id="{aid}" viewBox="0 0 {width} {height}" role="img" aria-label="{html.escape(title)}" xmlns="http://www.w3.org/2000/svg">', svg_style()]
    parts.append('<rect class="bg" width="100%" height="100%" rx="12"/>')
    parts.append(f'<text class="text" x="24" y="38" font-weight="700">{html.escape(title)}</text>')
    for i, lab in enumerate(labels):
        x = start_x + i * 150
        parts.append(f'<rect class="box" x="{x}" y="{y}" width="{node_w}" height="{node_h}" rx="8"/>')
        if doubly:
            parts.append(f'<line x1="{x+28}" y1="{y}" x2="{x+28}" y2="{y+node_h}" stroke="#cbd5e1"/>')
            parts.append(f'<line x1="{x+75}" y1="{y}" x2="{x+75}" y2="{y+node_h}" stroke="#cbd5e1"/>')
            parts.append(f'<text class="text tiny" x="{x+14}" y="{y+32}" text-anchor="middle">pre</text>')
            parts.append(f'<text class="text" x="{x+52}" y="{y+32}" text-anchor="middle">{html.escape(lab)}</text>')
            parts.append(f'<text class="text tiny" x="{x+91}" y="{y+32}" text-anchor="middle">next</text>')
        else:
            parts.append(f'<line x1="{x+67}" y1="{y}" x2="{x+67}" y2="{y+node_h}" stroke="#cbd5e1"/>')
            parts.append(f'<text class="text" x="{x+34}" y="{y+34}" text-anchor="middle">{html.escape(lab)}</text>')
            parts.append(f'<text class="text tiny" x="{x+86}" y="{y+33}" text-anchor="middle">next</text>')
        if i < len(labels) - 1:
            parts.append(f'<path class="arrow dash" d="M {x + node_w} {y + node_h/2} H {x + 145}"/>')
            if doubly:
                parts.append(f'<path class="arrow" d="M {x + 145} {y + node_h/2 + 18} H {x + node_w}"/>')
    if circular:
        last_x = start_x + (len(labels) - 1) * 150
        parts.append(f'<path class="arrow dash" d="M {last_x + node_w/2} {y+node_h} C {last_x+60} 260, {start_x-30} 260, {start_x+20} {y+node_h}"/>')
        parts.append('<text class="text small" x="290" y="255">尾结点指回头结点，形成闭环</text>')
    else:
        last_x = start_x + (len(labels) - 1) * 150
        parts.append(f'<text class="text small" x="{last_x + node_w + 18}" y="{y + 34}">NULL</text>')
    parts.append('<circle class="accent pulse" cx="48" cy="214" r="8"/>')
    parts.append('<text class="text small" x="66" y="219">虚线箭头带动画，表示指针方向和遍历过程</text>')
    parts.append("</svg>")
    return "".join(parts)


def svg_compare(aid: str, title: str, left: str, right: str, left_items: list[str], right_items: list[str]) -> str:
    width, height = 760, 330
    parts = [f'<svg id="{aid}" viewBox="0 0 {width} {height}" role="img" aria-label="{html.escape(title)}" xmlns="http://www.w3.org/2000/svg">', svg_style()]
    parts.append('<rect class="bg" width="100%" height="100%" rx="12"/>')
    parts.append(f'<text class="text" x="24" y="38" font-weight="700">{html.escape(title)}</text>')
    for x, head, items, color in [(55, left, left_items, "#2563eb"), (405, right, right_items, "#f97316")]:
        parts.append(f'<rect class="box" x="{x}" y="75" width="300" height="210" rx="10"/>')
        parts.append(f'<rect x="{x}" y="75" width="300" height="42" rx="10" fill="{color}" opacity=".14"/>')
        parts.append(f'<text class="text" x="{x+150}" y="102" text-anchor="middle" font-weight="700">{html.escape(head)}</text>')
        for i, item in enumerate(items):
            yy = 145 + i * 34
            parts.append(f'<circle class="{"main" if color=="#2563eb" else "accent"} pulse" cx="{x+28}" cy="{yy-5}" r="5"/>')
            parts.append(f'<text class="text small" x="{x+44}" y="{yy}">{html.escape(item)}</text>')
    parts.append('<path class="arrow dash" d="M 356 180 H 402"/>')
    parts.append("</svg>")
    return "".join(parts)


def svg_formula(aid: str, title: str, formula: str, notes: list[str]) -> str:
    width, height = 760, 260
    parts = [f'<svg id="{aid}" viewBox="0 0 {width} {height}" role="img" aria-label="{html.escape(title)}" xmlns="http://www.w3.org/2000/svg">', svg_style()]
    parts.append('<rect class="bg" width="100%" height="100%" rx="12"/>')
    parts.append(f'<text class="text" x="24" y="38" font-weight="700">{html.escape(title)}</text>')
    parts.append('<rect class="box" x="70" y="82" width="620" height="70" rx="10"/>')
    parts.append(f'<text class="text" x="380" y="126" text-anchor="middle" font-size="22px" font-weight="700">{html.escape(formula)}</text>')
    parts.append('<path class="arrow dash" d="M 120 174 H 640"/>')
    for i, note in enumerate(notes):
        parts.append(f'<text class="text small" x="{90 + i*220}" y="215">{html.escape(note)}</text>')
    parts.append("</svg>")
    return "".join(parts)


def svg_complexity_curves(aid: str, title: str) -> str:
    width, height = 760, 330
    parts = [f'<svg id="{aid}" viewBox="0 0 {width} {height}" role="img" aria-label="{html.escape(title)}" xmlns="http://www.w3.org/2000/svg">', svg_style()]
    parts.append('<rect class="bg" width="100%" height="100%" rx="12"/>')
    parts.append(f'<text class="text" x="24" y="38" font-weight="700">{html.escape(title)}</text>')
    parts.append('<path d="M80 270 H690 M80 270 V70" stroke="#1f2937" stroke-width="2"/>')
    parts.append('<text class="text tiny" x="688" y="292">n</text><text class="text tiny" x="45" y="78">T(n)</text>')
    curves = [
        ("O(1)", "M90 225 H660", "#10b981"),
        ("O(log n)", "M90 250 C180 210, 330 190, 660 178", "#2563eb"),
        ("O(n)", "M90 260 L660 95", "#f97316"),
        ("O(n^2)", "M90 266 C250 250, 470 210, 660 80", "#ef4444"),
    ]
    for i, (label, d, color) in enumerate(curves):
        parts.append(f'<path d="{d}" stroke="{color}" stroke-width="3" fill="none" class="dash"/>')
        parts.append(f'<text class="text small" x="{515}" y="{105 + i*28}" fill="{color}">{label}</text>')
    parts.append('<circle class="accent pulse" cx="500" cy="142" r="7"/>')
    parts.append("</svg>")
    return "".join(parts)


def svg_stack_heap(aid: str, title: str) -> str:
    width, height = 760, 310
    parts = [f'<svg id="{aid}" viewBox="0 0 {width} {height}" role="img" aria-label="{html.escape(title)}" xmlns="http://www.w3.org/2000/svg">', svg_style()]
    parts.append('<rect class="bg" width="100%" height="100%" rx="12"/>')
    parts.append(f'<text class="text" x="24" y="38" font-weight="700">{html.escape(title)}</text>')
    for x, name, items, color in [
        (80, "栈区 stack", ["参数 n", "局部变量 i", "返回地址"], "#2563eb"),
        (420, "堆区 heap", ["malloc 结点", "动态数组", "需要 free"], "#f97316"),
    ]:
        parts.append(f'<rect class="box" x="{x}" y="75" width="250" height="190" rx="10"/>')
        parts.append(f'<text class="text" x="{x+125}" y="105" text-anchor="middle" font-weight="700">{name}</text>')
        for i, item in enumerate(items):
            yy = 132 + i * 38
            parts.append(f'<rect x="{x+45}" y="{yy}" width="160" height="26" rx="5" fill="{color}" opacity=".14"/>')
            parts.append(f'<text class="text small" x="{x+125}" y="{yy+18}" text-anchor="middle">{item}</text>')
        parts.append(f'<rect class="pulse" x="{x+20}" y="238" width="210" height="8" rx="4" fill="{color}"/>')
    parts.append('<path class="arrow dash" d="M330 170 H420"/>')
    parts.append("</svg>")
    return "".join(parts)


def generic_svg(asset_def: dict) -> str:
    aid = asset_def["id"]
    title = asset_def["title"]
    desc = asset_def["description"]
    typ = asset_def["type"]
    if "complexity" in aid or "growth" in aid:
        return svg_complexity_curves(aid, title)
    if typ == "address-calc":
        return svg_formula(aid, title, "LOC(ai)=LOC(a1)+(i-1)*sizeof(ElemType)", ["起始地址", "位序 i", "元素大小"])
    if typ == "stack-heap":
        return svg_stack_heap(aid, title)
    if typ in {"memory-layout", "static-array", "random-access"}:
        labels = ["a1", "a2", "a3", "a4", "a5", "..."]
        if "static" in aid:
            labels = ["头", "A", "B", "空", "C", "空"]
        elif "array" in aid:
            labels = ["0", "1", "2", "3", "..."]
        return svg_cells(aid, title, labels, desc[:38], 2 if "random" in aid or "address" in aid else None)
    if typ in {"pointer", "dynamic-alloc", "realloc-flow"}:
        if "double" in aid or "dnode" in aid or "dlist" in aid:
            return svg_chain(aid, title, ["头", "A", "B", "C"], doubly=True, circular="circular" in aid or "cdlist" in aid)
        return svg_chain(aid, title, ["头", "A", "B", "C"], circular="circular" in aid or "cslist" in aid)
    if typ == "comparison":
        return svg_compare(aid, title, "方案 A", "方案 B", ["连续/直接", "查找较快", "扩容受限"], ["离散/链接", "插删灵活", "需额外信息"])
    labels = re.split(r"[，、；。,\s]+", desc)
    labels = [x for x in labels if x][:4] or ["输入", "处理", "输出"]
    if len(labels) < 3:
        labels = ["开始", *labels, "结束"]
    return svg_flow(aid, title, labels[:5])


SPECIAL_SVG_LABELS = {
    "002-info-flow": ["现实问题", "抽象数据", "选择结构", "算法处理", "产生价值"],
    "002-real-world-model": ("金钱/排队/关注", "数据抽象", ["数值变量", "线性序列", "图状关系"], ["float/int", "数组/队列", "用户关系图"]),
    "002-course-map": ("编程工具", "专业基础", ["C 语言", "数据结构", "算法"], ["组成原理", "操作系统", "计算机网络"]),
    "002-efficiency": ("能表示", "更高效", ["数组也能排队", "手动移动元素", "能跑"], ["队列/链表", "操作更贴合", "更省成本"]),
    "003-three-elements": ("三要素", "学习问题", ["逻辑结构", "存储结构", "数据运算"], ["关系是什么", "怎样存储", "怎样操作"]),
    "003-storage-types": ("顺序/链式", "索引/散列", ["物理相邻", "指针连接", "索引表"], ["按关键字定位", "额外空间", "快速查找"]),
    "003-structure-object": ("数据对象", "数据结构", ["同性质元素", "不强调关系"], ["元素集合", "强调关系"]),
    "004-five-features": ("必要特性", "不满足则不是算法", ["有穷性", "确定性", "可行性"], ["输入", "输出", "明确步骤"]),
    "004-good-algorithm": ("能成为算法", "好算法", ["有穷/确定/可行", "有输入输出"], ["正确", "可读", "健壮/高效"]),
    "005-big-o-rules": ("加法规则", "乘法规则", ["多项相加", "保留最高阶"], ["循环嵌套", "数量级相乘"]),
    "009-complexity": ("插入/删除表尾", "插入/删除表头", ["移动 0 个", "O(1)"], ["移动 n 个左右", "O(n)"]),
    "010-struct-compare": ("基本类型", "结构体类型", ["可直接 ==", "int/char/float"], ["逐字段比较", "按业务定义相等"]),
    "011-typedef": ("LNode *", "LinkList", ["结点指针", "强调结点"], ["链表头指针", "强调整表"]),
    "011-head-node": ("不带头结点", "带头结点", ["L 指向首元结点", "空表 L==NULL"], ["L 指向头结点", "空表 L->next==NULL"]),
    "012-head-special": ("不带头结点", "带头结点", ["表头操作改 L", "需特殊处理"], ["头指针稳定", "代码更统一"]),
    "015-traverse": ["当前结点", "next 向后", "处理数据", "prior 向前"],
    "016-boundary": ("普通双链表", "循环双链表", ["尾结点 next=NULL", "需判断空指针"], ["尾结点 next=头", "边界更统一"]),
    "017-typedef-array": ("普通写法", "typedef 数组", ["SNode a[MaxSize]", "看起来是数组"], ["SLinkList L", "强调静态链表"]),
    "017-compare": ("顺序表", "静态链表", ["连续且逻辑相邻", "可随机存取"], ["连续数组", "游标表示逻辑"]),
    "018-storage-compare": ("顺序表", "链表", ["连续空间", "随机存取", "存储密度高"], ["离散结点", "指针连接", "容量灵活"]),
    "018-operation-compare": ("顺序表", "链表", ["按位 O(1)", "插删需移动", "有序可折半"], ["查找 O(n)", "插删改指针", "额外指针域"]),
}


def render_svg(asset_def: dict) -> str:
    aid = asset_def["id"]
    spec = SPECIAL_SVG_LABELS.get(aid)
    if isinstance(spec, list):
        return svg_flow(aid, asset_def["title"], spec)
    if isinstance(spec, tuple):
        left, right, left_items, right_items = spec
        return svg_compare(aid, asset_def["title"], left, right, left_items, right_items)
    return generic_svg(asset_def)


def prepare_lessons(raw_files: list[Path]) -> list[dict]:
    by_prefix = {}
    for path in raw_files:
        by_prefix[path.name[:4]] = path
    prepared = []
    for lesson in LESSONS:
        match = None
        for path in raw_files:
            if path.name.startswith(lesson["source_prefix"]):
                match = path
                break
        if match is None:
            raise FileNotFoundError(f"Missing source for {lesson['number']} {lesson['title']}")
        raw_text = match.read_text(encoding="utf-8")
        lesson = dict(lesson)
        lesson["sourceFile"] = match.name
        lesson["rawLength"] = len(raw_text)
        lesson["id"] = slugify(lesson["title"])
        for idx, sec in enumerate(lesson["sections"], start=1):
            sec["id"] = section_id(sec["heading"], idx)
        for block in lesson["codeBlocks"]:
            if not block["linkedSectionId"] and lesson["sections"]:
                block["linkedSectionId"] = lesson["sections"][0]["id"]
        outline = []
        for sec in lesson["sections"]:
            first = sec["paragraphs"][0] if sec["paragraphs"] else sec["keyPoint"]
            outline.append({"heading": sec["heading"], "summary": first[:80] + ("..." if len(first) > 80 else "")})
        lesson["outline"] = outline
        prepared.append(lesson)
    return prepared


def cleaned_markdown(lesson: dict) -> str:
    lines = [f"# {lesson['title']}", ""]
    if lesson.get("subtitle"):
        lines += [lesson["subtitle"], ""]
    lines += ["## 学习目标", ""]
    for item in lesson["objectives"]:
        lines.append(f"- {item}")
    lines += ["", "## 知识点结构", ""]
    for item in lesson["outline"]:
        lines.append(f"- **{item['heading']}：** {item['summary']}")
    numerals = "一二三四五六七八九十"
    for idx, sec in enumerate(lesson["sections"], start=1):
        prefix = numerals[idx - 1] if idx <= len(numerals) else str(idx)
        lines += ["", f"## {prefix}、{sec['heading']}", ""]
        for p in sec["paragraphs"]:
            lines += [p, ""]
        if sec["highlights"]:
            lines.append("关键提示：")
            for h in sec["highlights"]:
                lines.append(f"- {h}")
            lines.append("")
        lines += [f"**本部分重点：** {sec['keyPoint']}", ""]
    lines += ["## 代码整理", ""]
    if lesson["codeBlocks"]:
        for block in lesson["codeBlocks"]:
            lines += [f"### {block['title']}", "", block["description"], "", "```c", block["code"], "```", ""]
    else:
        lines += ["本节不涉及必须记忆的 C 语言实现代码。", ""]
    lines += ["## 易错点", ""]
    for m in lesson["mistakes"]:
        lines.append(f"- **{m['title']}：** {m['detail']}")
    lines += ["", "## 本节总结", ""]
    for s in lesson["summary"]:
        lines.append(f"- {s}")
    lines.append("")
    return "\n".join(lines)


def structured_json(lesson: dict) -> dict:
    keys = ["id", "title", "subtitle", "objectives", "outline", "sections", "codeBlocks", "mistakes", "summary", "quiz", "svgAssets"]
    return {k: lesson[k] for k in keys}


def html_escape(text: str) -> str:
    return html.escape(text, quote=True)


def render_code(code: str) -> str:
    return html_escape(code)


BASE_CSS = r"""
:root{--page:#f5f7fb;--card:#fff;--text:#1f2937;--muted:#64748b;--main:#2563eb;--accent:#f97316;--soft:#eff6ff;--mistake:#fff7ed;--summary:#ecfdf5;--border:#dbe3ef;--code:#111827;--code-text:#e5e7eb}
body.dark{--page:#0f172a;--card:#111827;--text:#e5e7eb;--muted:#94a3b8;--soft:#172554;--mistake:#431407;--summary:#052e2b;--border:#334155;--code:#020617;--code-text:#e5e7eb}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--page);color:var(--text);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Microsoft YaHei","PingFang SC",sans-serif;line-height:1.8}
.progress{position:fixed;left:0;top:0;height:4px;background:var(--main);width:0;z-index:20}.hero{background:var(--card);border-bottom:1px solid var(--border);padding:36px 24px 24px}.hero-inner{max-width:1180px;margin:0 auto}.crumb{color:var(--muted);font-size:14px}.hero h1{margin:10px 0 8px;font-size:34px;line-height:1.25;letter-spacing:0}.subtitle{margin:0;color:var(--muted)}
.top-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}.btn{border:1px solid var(--border);background:var(--card);color:var(--text);border-radius:8px;padding:8px 12px;cursor:pointer}.btn:hover{border-color:var(--main);color:var(--main)}
.mobile-toc{display:none;margin-top:18px}.mobile-toc select{width:100%;padding:10px;border-radius:8px;border:1px solid var(--border);background:var(--card);color:var(--text)}
.layout{max-width:1180px;margin:24px auto;display:grid;grid-template-columns:260px minmax(0,1fr);gap:24px;padding:0 24px}.toc{position:sticky;top:20px;align-self:start;background:var(--card);border:1px solid var(--border);border-radius:8px;padding:16px}.toc h2{font-size:16px;margin:0 0 10px}.toc a{display:block;color:var(--muted);text-decoration:none;padding:7px 0;font-size:14px}.toc a:hover{color:var(--main)}
main{min-width:0}article{background:var(--card);border:1px solid var(--border);border-radius:8px;padding:28px}.block{margin-bottom:34px}.block h2{font-size:24px;margin:0 0 14px}.block h3{font-size:19px;margin:24px 0 8px}.objectives,.outline,.highlight,.keypoint,.mistakes,.summary-box,.quiz-card{border-radius:8px;padding:16px;border:1px solid var(--border)}
.objectives,.highlight,.keypoint{background:var(--soft)}.mistakes{background:var(--mistake)}.summary-box{background:var(--summary)}.outline{background:var(--card)}ul{padding-left:22px}.section-card{border-top:1px solid var(--border);padding-top:26px}.section-card:first-of-type{border-top:0;padding-top:0}.section-card p{margin:10px 0}.svg-wrap{margin:18px 0;padding:14px;border:1px solid var(--border);border-radius:8px;background:#f8fafc;overflow:auto}.svg-wrap svg{max-width:100%;height:auto;display:block;margin:auto}
.codebox{margin:18px 0;border-radius:8px;overflow:hidden;background:var(--code);border:1px solid #1f2937}.code-title{display:flex;justify-content:space-between;gap:12px;align-items:center;padding:10px 14px;background:#0b1220;color:#cbd5e1;font-size:14px}.lang{color:#93c5fd}.codebox pre{margin:0;padding:16px;overflow:auto;color:var(--code-text);font-family:"SFMono-Regular",Consolas,"Liberation Mono",monospace;font-size:14px;line-height:1.7}
.mistake-item{margin:10px 0}.quiz-card{background:var(--card);margin:16px 0}.quiz-options{display:grid;gap:10px;margin-top:10px}.option{width:100%;text-align:left;border:1px solid var(--border);border-radius:8px;padding:10px;background:var(--card);color:var(--text);cursor:pointer}.option.correct{border-color:#10b981;background:#ecfdf5;color:#065f46}.option.wrong{border-color:#f97316;background:#fff7ed;color:#9a3412}.explain{display:none;margin-top:10px;color:var(--muted)}.explain.show{display:block}.backtop{position:fixed;right:20px;bottom:20px;border:0;background:var(--main);color:#fff;border-radius:50%;width:46px;height:46px;font-size:18px;cursor:pointer;box-shadow:0 10px 30px rgba(37,99,235,.25)}
footer{max-width:1180px;margin:12px auto 36px;padding:0 24px;color:var(--muted);font-size:14px}.index-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px}.lesson-card{background:var(--card);border:1px solid var(--border);border-radius:8px;padding:16px;text-decoration:none;color:var(--text);display:block}.lesson-card:hover{border-color:var(--main)}.lesson-card .num{color:var(--main);font-weight:700}.search{width:100%;padding:12px;border-radius:8px;border:1px solid var(--border);background:var(--card);color:var(--text);margin:18px 0}.group-title{margin-top:28px}
@media (max-width:860px){.layout{display:block;padding:0 14px}.toc{display:none}.mobile-toc{display:block}.hero{padding:28px 14px 18px}.hero h1{font-size:27px}article{padding:20px}.block h2{font-size:21px}.index-grid{grid-template-columns:1fr}}
"""


BASE_JS = r"""
const bar=document.querySelector('.progress');
const back=document.querySelector('.backtop');
function updateProgress(){const h=document.documentElement;const max=h.scrollHeight-h.clientHeight;bar.style.width=(max? h.scrollTop/max*100:0)+'%';}
document.addEventListener('scroll',updateProgress,{passive:true});updateProgress();
back?.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
document.querySelector('#themeToggle')?.addEventListener('click',()=>{document.body.classList.toggle('dark');localStorage.setItem('ds-theme',document.body.classList.contains('dark')?'dark':'light');});
if(localStorage.getItem('ds-theme')==='dark')document.body.classList.add('dark');
document.querySelectorAll('.quiz-card').forEach(card=>{const ans=card.dataset.answer;card.querySelectorAll('.option').forEach(btn=>{btn.addEventListener('click',()=>{card.querySelectorAll('.option').forEach(b=>{b.disabled=true;if(b.dataset.value===ans)b.classList.add('correct');});if(btn.dataset.value!==ans)btn.classList.add('wrong');card.querySelector('.explain')?.classList.add('show');});});});
document.querySelector('#mobileToc')?.addEventListener('change',e=>{if(e.target.value)location.hash=e.target.value;});
"""


def render_lesson_html(lesson: dict, svg_map: dict[str, str], prev_next: tuple[dict | None, dict | None]) -> str:
    prev_lesson, next_lesson = prev_next
    nav_links = ['<a href="../index.html">课程首页</a>', '<a href="#objectives">学习目标</a>', '<a href="#outline">知识点目录</a>']
    mobile_options = ['<option value="">跳转到章节...</option>', '<option value="#objectives">学习目标</option>', '<option value="#outline">知识点目录</option>']
    for sec in lesson["sections"]:
        nav_links.append(f'<a href="#{sec["id"]}">{html_escape(sec["heading"])}</a>')
        mobile_options.append(f'<option value="#{sec["id"]}">{html_escape(sec["heading"])}</option>')
    nav_links += ['<a href="#code">代码整理</a>', '<a href="#mistakes">易错点</a>', '<a href="#summary">本节总结</a>', '<a href="#quiz">自测题</a>']
    mobile_options += ['<option value="#code">代码整理</option>', '<option value="#mistakes">易错点</option>', '<option value="#summary">本节总结</option>', '<option value="#quiz">自测题</option>']
    body = [
        '<!doctype html><html lang="zh-CN"><head><meta charset="utf-8">',
        '<meta name="viewport" content="width=device-width, initial-scale=1">',
        f'<title>{html_escape(lesson["title"])} - 数据结构课程 HTML 讲义</title>',
        f'<style>{BASE_CSS}</style></head><body><div class="progress"></div>',
        '<header class="hero"><div class="hero-inner">',
        f'<div class="crumb">{html_escape(lesson["chapter"])} / 数据结构课程 HTML 讲义</div>',
        f'<h1>{html_escape(lesson["title"])}</h1>',
        f'<p class="subtitle">{html_escape(lesson["subtitle"])}</p>',
        '<div class="top-actions"><button class="btn" id="themeToggle" type="button">深色模式</button>',
    ]
    if prev_lesson:
        body.append(f'<a class="btn" href="{html_escape(prev_lesson["htmlFile"])}">上一节</a>')
    if next_lesson:
        body.append(f'<a class="btn" href="{html_escape(next_lesson["htmlFile"])}">下一节</a>')
    body.append('</div><nav class="mobile-toc"><select id="mobileToc">' + "".join(mobile_options) + '</select></nav></div></header>')
    body.append('<div class="layout"><aside class="toc"><h2>本节目录</h2><nav>' + "".join(nav_links) + '</nav></aside><main><article>')
    body.append('<section class="block" id="objectives"><h2>学习目标</h2><div class="objectives"><ul>')
    body.extend(f'<li>{html_escape(x)}</li>' for x in lesson["objectives"])
    body.append('</ul></div></section>')
    body.append('<section class="block" id="outline"><h2>知识点目录</h2><div class="outline"><ul>')
    body.extend(f'<li><strong>{html_escape(x["heading"])}：</strong>{html_escape(x["summary"])}</li>' for x in lesson["outline"])
    body.append('</ul></div></section>')
    for sec in lesson["sections"]:
        body.append(f'<section class="block section-card" id="{sec["id"]}"><h2>{html_escape(sec["heading"])}</h2>')
        for p in sec["paragraphs"]:
            body.append(f'<p>{html_escape(p)}</p>')
        if sec["highlights"]:
            body.append('<div class="highlight"><strong>关键提示</strong><ul>')
            body.extend(f'<li>{html_escape(h)}</li>' for h in sec["highlights"])
            body.append('</ul></div>')
        for ref in sec["svgRefs"]:
            if ref in svg_map:
                body.append(f'<div class="svg-wrap">{svg_map[ref]}</div>')
        body.append(f'<div class="keypoint"><strong>本部分重点：</strong>{html_escape(sec["keyPoint"])}</div></section>')
    body.append('<section class="block" id="code"><h2>代码整理</h2>')
    for block in lesson["codeBlocks"]:
        body.append(f'<h3>{html_escape(block["title"])}</h3><p>{html_escape(block["description"])}</p>')
        body.append('<div class="codebox"><div class="code-title"><span>' + html_escape(block["title"]) + '</span><span class="lang">C</span></div>')
        body.append(f'<pre><code>{render_code(block["code"])}</code></pre></div>')
    body.append('</section>')
    body.append('<section class="block" id="mistakes"><h2>易错点</h2><div class="mistakes">')
    for m in lesson["mistakes"]:
        body.append(f'<div class="mistake-item"><strong>{html_escape(m["title"])}：</strong>{html_escape(m["detail"])}</div>')
    body.append('</div></section>')
    body.append('<section class="block" id="summary"><h2>本节总结</h2><div class="summary-box"><ul>')
    body.extend(f'<li>{html_escape(x)}</li>' for x in lesson["summary"])
    body.append('</ul></div></section>')
    body.append('<section class="block" id="quiz"><h2>自测题</h2>')
    for idx, q in enumerate(lesson["quiz"], start=1):
        body.append(f'<div class="quiz-card" data-answer="{html_escape(q["answer"])}"><strong>{idx}. {html_escape(q["question"])}</strong><div class="quiz-options">')
        for opt in q["options"]:
            val = opt.split(".", 1)[0]
            body.append(f'<button class="option" type="button" data-value="{html_escape(val)}">{html_escape(opt)}</button>')
        body.append(f'</div><div class="explain"><strong>答案：{html_escape(q["answer"])}</strong>。{html_escape(q["explanation"])}</div></div>')
    body.append('</section></article></main></div><button class="backtop" type="button" aria-label="返回顶部">↑</button>')
    body.append(f'<footer>来源文稿：{html_escape(lesson["sourceFile"])}。本页面可离线阅读，交互和 SVG 均已内嵌。</footer>')
    body.append(f'<script>{BASE_JS}</script></body></html>')
    return "".join(body)


def render_index_html(lessons: list[dict]) -> str:
    groups: dict[str, list[dict]] = {}
    for lesson in lessons:
        groups.setdefault(lesson["chapter"], []).append(lesson)
    body = [
        '<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">',
        '<title>数据结构课程 HTML 讲义</title>',
        f'<style>{BASE_CSS}</style></head><body><div class="progress"></div>',
        '<header class="hero"><div class="hero-inner"><div class="crumb">课程目录</div><h1>数据结构课程 HTML 讲义</h1>',
        '<p class="subtitle">由课堂转写文稿清洗整理生成，包含中间 Markdown、结构化 JSON、SVG 动画和离线 HTML 页面。</p>',
        '<div class="top-actions"><button class="btn" id="themeToggle" type="button">深色模式</button></div>',
        '<input class="search" id="search" type="search" placeholder="搜索课程标题或摘要"></div></header>',
        '<main class="layout" style="grid-template-columns:1fr"><article>',
    ]
    for chapter, items in groups.items():
        body.append(f'<section class="block lesson-group"><h2 class="group-title">{html_escape(chapter)}</h2><div class="index-grid">')
        for lesson in items:
            summary = lesson["outline"][0]["summary"] if lesson["outline"] else lesson["subtitle"]
            body.append(
                f'<a class="lesson-card" data-title="{html_escape(lesson["title"])} {html_escape(summary)}" href="lessons/{html_escape(lesson["htmlFile"])}">'
                f'<div class="num">{html_escape(lesson["number"])}</div><h3>{html_escape(lesson["title"])}</h3>'
                f'<p>{html_escape(summary)}</p></a>'
            )
        body.append('</div></section>')
    body.append('</article></main><button class="backtop" type="button" aria-label="返回顶部">↑</button>')
    index_js = BASE_JS + r"""
const input=document.querySelector('#search');
input?.addEventListener('input',()=>{const key=input.value.trim().toLowerCase();document.querySelectorAll('.lesson-card').forEach(card=>{card.style.display=card.dataset.title.toLowerCase().includes(key)?'block':'none';});document.querySelectorAll('.lesson-group').forEach(group=>{const visible=[...group.querySelectorAll('.lesson-card')].some(card=>card.style.display!=='none');group.style.display=visible?'block':'none';});});
"""
    body.append(f'<footer>共 {len(lessons)} 节课。所有链接均指向 output/lessons 下的离线 HTML 文件。</footer><script>{index_js}</script></body></html>')
    return "".join(body)


def main() -> None:
    raw_files = sorted(RAW_DIR.glob("*.txt"))
    if not raw_files:
        raise SystemExit(f"No source transcripts found in {RAW_DIR}")
    LESSON_DIR.mkdir(parents=True, exist_ok=True)
    INTERMEDIATE_DIR.mkdir(parents=True, exist_ok=True)
    lessons = prepare_lessons(raw_files)
    for lesson in lessons:
        base_name = clean_filename(f'{lesson["number"]}_{lesson["title"].split(" ", 1)[-1]}')
        html_file = f"{base_name}.html"
        lesson["htmlFile"] = html_file
        structured = structured_json(lesson)
        svg_json = [{"id": a["id"], "svg": render_svg(a)} for a in lesson["svgAssets"]]
        (INTERMEDIATE_DIR / f"{base_name}.cleaned.md").write_text(cleaned_markdown(lesson), encoding="utf-8")
        (INTERMEDIATE_DIR / f"{base_name}.structured.json").write_text(json.dumps(structured, ensure_ascii=False, indent=2), encoding="utf-8")
        (INTERMEDIATE_DIR / f"{base_name}.svg.json").write_text(json.dumps(svg_json, ensure_ascii=False, indent=2), encoding="utf-8")
    for idx, lesson in enumerate(lessons):
        base_name = clean_filename(f'{lesson["number"]}_{lesson["title"].split(" ", 1)[-1]}')
        svg_items = json.loads((INTERMEDIATE_DIR / f"{base_name}.svg.json").read_text(encoding="utf-8"))
        svg_map = {item["id"]: item["svg"] for item in svg_items}
        prev_lesson = lessons[idx - 1] if idx > 0 else None
        next_lesson = lessons[idx + 1] if idx + 1 < len(lessons) else None
        html_text = render_lesson_html(lesson, svg_map, (prev_lesson, next_lesson))
        (LESSON_DIR / lesson["htmlFile"]).write_text(html_text, encoding="utf-8")
    (OUT_DIR / "index.html").write_text(render_index_html(lessons), encoding="utf-8")
    report = {
        "processed": len(lessons),
        "sourceFiles": [lesson["sourceFile"] for lesson in lessons],
        "htmlFiles": [f"lessons/{lesson['htmlFile']}" for lesson in lessons],
        "intermediateFiles": len(list(INTERMEDIATE_DIR.glob("*"))),
    }
    (OUT_DIR / "generation-report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")


if __name__ == "__main__":
    main()
