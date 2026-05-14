const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const RAW_DIR = path.join(ROOT, "文稿", "数据结构");
const OUT_DIR = path.join(ROOT, "output");
const LESSON_DIR = path.join(OUT_DIR, "lessons");
const CHAPTER_DIR = path.join(OUT_DIR, "chapters");
const INTERMEDIATE_DIR = path.join(OUT_DIR, "intermediate");

function slugify(text) {
  const mapping = [
    ["开篇", "intro"],
    ["数据结构在学什么", "what-is-data-structure"],
    ["数据结构的基本概念", "basic-concepts"],
    ["算法的基本概念", "algorithm-basics"],
    ["算法的时间复杂度", "time-complexity"],
    ["算法的空间复杂度", "space-complexity"],
    ["线性表的定义和基本操作", "linear-list-basics"],
    ["顺序表的定义", "sequential-list-definition"],
    ["顺序表的插入删除", "sequential-list-insert-delete"],
    ["顺序表的查找", "sequential-list-search"],
    ["单链表的定义", "singly-linked-list-definition"],
    ["单链表的插入删除", "singly-linked-list-insert-delete"],
    ["单链表的查找", "singly-linked-list-search"],
    ["单链表的建立", "singly-linked-list-build"],
    ["双链表", "doubly-linked-list"],
    ["循环链表", "circular-linked-list"],
    ["静态链表", "static-linked-list"],
    ["顺序表和链表的比较", "sequence-vs-linked-list"],
  ];
  for (const [key, value] of mapping) {
    if (text.includes(key)) return value;
  }
  return text.replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "").toLowerCase() || "lesson";
}

function sectionId(title, index) {
  return `sec-${String(index).padStart(2, "0")}-${slugify(title).slice(0, 30)}`;
}

function cleanFilename(name) {
  return name.replace(/[\\/:*?"<>|]+/g, "_").replace(/\s+/g, "_").trim();
}

function chapterFileName(chapter) {
  const match = chapter.match(/第(.+?)章\s*(.+)/);
  if (!match) return `${cleanFilename(chapter)}.html`;
  const cn = match[1] === "一" ? "01" : match[1] === "二" ? "02" : match[1];
  return `${cn}_${cleanFilename(match[2])}.html`;
}

function text_to_paragraphs(...items) {
  return items.map((x) => x.trim()).filter(Boolean);
}

function make_section(heading, paragraphs, key, highlights = [], svgRefs = []) {
  return { heading, paragraphs, highlights, keyPoint: key, svgRefs };
}

function code_block(id, title, description, code, linkedSectionId = "") {
  return { id, title, language: "c", description, code: code.replace(/^\n|\n$/g, ""), linkedSectionId };
}

function quiz(question, options, answer, explanation) {
  return { question, options, answer, explanation };
}

function asset(id, title, purpose, type, description) {
  return { id, title, purpose, type, description };
}

function escapeTemplate(content) {
  return content.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

function transformRawTriple(src) {
  let out = "";
  let i = 0;
  while (i < src.length) {
    if (src.startsWith('r"""', i)) {
      const end = src.indexOf('"""', i + 4);
      if (end === -1) throw new Error("Unclosed raw triple string");
      out += "`" + escapeTemplate(src.slice(i + 4, end)) + "`";
      i = end + 3;
    } else {
      out += src[i];
      i += 1;
    }
  }
  return out;
}

function loadLessonData() {
  const py = fs.readFileSync(path.join(__dirname, "generate_ds_lectures.py"), "utf8");
  const commonStart = py.indexOf("COMMON_CODE =");
  const lessonsStart = py.indexOf("LESSONS: list[dict] =");
  const svgStart = py.indexOf("\n\n\ndef svg_style");
  if (commonStart < 0 || lessonsStart < 0 || svgStart < 0) {
    throw new Error("Cannot locate lesson data in Python generator");
  }
  let commonCode = py.slice(commonStart, lessonsStart).trim();
  let lessonsCode = py.slice(lessonsStart, svgStart).trim();
  commonCode = transformRawTriple(commonCode).replace(/^COMMON_CODE\s*=/, "var COMMON_CODE = globalThis.COMMON_CODE =");
  lessonsCode = transformRawTriple(lessonsCode).replace(/^LESSONS:\s*list\[dict\]\s*=/, "var LESSONS = globalThis.LESSONS =");
  const sandbox = {
    text_to_paragraphs,
    make_section,
    code_block,
    quiz,
    asset,
    globalThis: {},
  };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(commonCode, sandbox, { filename: "COMMON_CODE.pydata" });
  vm.runInContext(lessonsCode, sandbox, { filename: "LESSONS.pydata" });
  return sandbox.LESSONS;
}

function svgStyle() {
  return `
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
    </defs>`;
}

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function svgFlow(id, title, labels, width = 760, height = 260) {
  const n = labels.length;
  const boxW = Math.min(150, Math.floor((width - 80) / Math.max(n, 1)) - 12);
  const gap = n > 1 ? Math.floor((width - 60 - n * boxW) / (n - 1)) : 0;
  const y = 105;
  let out = `<svg id="${id}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(title)}" xmlns="http://www.w3.org/2000/svg">${svgStyle()}<rect class="bg" x="0" y="0" width="100%" height="100%" rx="12"/><text class="text" x="24" y="38" font-weight="700">${esc(title)}</text>`;
  labels.forEach((label, i) => {
    const x = 30 + i * (boxW + gap);
    out += `<rect class="${i === 0 ? "box pulse" : "box"}" x="${x}" y="${y}" width="${boxW}" height="64" rx="8"/>`;
    out += `<text class="text small" x="${x + boxW / 2}" y="${y + 38}" text-anchor="middle">${esc(label)}</text>`;
    if (i < n - 1) out += `<path class="arrow dash" d="M ${x + boxW + 8} ${y + 32} H ${x + boxW + gap - 8}"/>`;
  });
  out += `<circle class="accent pulse" cx="48" cy="205" r="8"/><text class="text small" x="66" y="210">动画高亮表示处理步骤正在推进</text></svg>`;
  return out;
}

function svgCells(id, title, labels, subtitle = "", highlight = null) {
  const cellW = 84, cellH = 54, startX = 70, y = 105;
  let out = `<svg id="${id}" viewBox="0 0 760 260" role="img" aria-label="${esc(title)}" xmlns="http://www.w3.org/2000/svg">${svgStyle()}<rect class="bg" width="100%" height="100%" rx="12"/><text class="text" x="24" y="38" font-weight="700">${esc(title)}</text>`;
  if (subtitle) out += `<text class="text small" x="24" y="64">${esc(subtitle)}</text>`;
  labels.forEach((lab, i) => {
    const x = startX + i * cellW;
    out += `<rect class="box" x="${x}" y="${y}" width="${cellW}" height="${cellH}"/><text class="text" x="${x + cellW / 2}" y="${y + 34}" text-anchor="middle">${esc(lab)}</text><text class="text tiny" x="${x + cellW / 2}" y="${y + cellH + 20}" text-anchor="middle">下标 ${i}</text>`;
    if (highlight === i) out += `<rect class="accent pulse" x="${x + 8}" y="${y - 16}" width="${cellW - 16}" height="6" rx="3"/>`;
  });
  out += `<rect class="accent pulse" x="${startX}" y="${y - 24}" width="36" height="8" rx="4"/><text class="text small" x="24" y="222">连续单元表示物理地址相邻，访问时按元素大小跳转。</text></svg>`;
  return out;
}

function svgChain(id, title, labels, doubly = false, circular = false) {
  const nodeW = 105, nodeH = 54, startX = 70, y = 130;
  let out = `<svg id="${id}" viewBox="0 0 820 300" role="img" aria-label="${esc(title)}" xmlns="http://www.w3.org/2000/svg">${svgStyle()}<rect class="bg" width="100%" height="100%" rx="12"/><text class="text" x="24" y="38" font-weight="700">${esc(title)}</text>`;
  labels.forEach((lab, i) => {
    const x = startX + i * 150;
    out += `<rect class="box" x="${x}" y="${y}" width="${nodeW}" height="${nodeH}" rx="8"/>`;
    if (doubly) {
      out += `<line x1="${x + 28}" y1="${y}" x2="${x + 28}" y2="${y + nodeH}" stroke="#cbd5e1"/><line x1="${x + 75}" y1="${y}" x2="${x + 75}" y2="${y + nodeH}" stroke="#cbd5e1"/><text class="text tiny" x="${x + 14}" y="${y + 32}" text-anchor="middle">pre</text><text class="text" x="${x + 52}" y="${y + 32}" text-anchor="middle">${esc(lab)}</text><text class="text tiny" x="${x + 91}" y="${y + 32}" text-anchor="middle">next</text>`;
    } else {
      out += `<line x1="${x + 67}" y1="${y}" x2="${x + 67}" y2="${y + nodeH}" stroke="#cbd5e1"/><text class="text" x="${x + 34}" y="${y + 34}" text-anchor="middle">${esc(lab)}</text><text class="text tiny" x="${x + 86}" y="${y + 33}" text-anchor="middle">next</text>`;
    }
    if (i < labels.length - 1) {
      out += `<path class="arrow dash" d="M ${x + nodeW} ${y + nodeH / 2} H ${x + 145}"/>`;
      if (doubly) out += `<path class="arrow" d="M ${x + 145} ${y + nodeH / 2 + 18} H ${x + nodeW}"/>`;
    }
  });
  const lastX = startX + (labels.length - 1) * 150;
  if (circular) {
    out += `<path class="arrow dash" d="M ${lastX + nodeW / 2} ${y + nodeH} C ${lastX + 60} 260, ${startX - 30} 260, ${startX + 20} ${y + nodeH}"/><text class="text small" x="290" y="255">尾结点指回头结点，形成闭环</text>`;
  } else {
    out += `<text class="text small" x="${lastX + nodeW + 18}" y="${y + 34}">NULL</text>`;
  }
  out += `<circle class="accent pulse" cx="48" cy="214" r="8"/><text class="text small" x="66" y="219">虚线箭头带动画，表示指针方向和遍历过程</text></svg>`;
  return out;
}

function svgCompare(id, title, left, right, leftItems, rightItems) {
  let out = `<svg id="${id}" viewBox="0 0 760 330" role="img" aria-label="${esc(title)}" xmlns="http://www.w3.org/2000/svg">${svgStyle()}<rect class="bg" width="100%" height="100%" rx="12"/><text class="text" x="24" y="38" font-weight="700">${esc(title)}</text>`;
  [[55, left, leftItems, "#2563eb"], [405, right, rightItems, "#f97316"]].forEach(([x, head, items, color]) => {
    out += `<rect class="box" x="${x}" y="75" width="300" height="210" rx="10"/><rect x="${x}" y="75" width="300" height="42" rx="10" fill="${color}" opacity=".14"/><text class="text" x="${x + 150}" y="102" text-anchor="middle" font-weight="700">${esc(head)}</text>`;
    items.forEach((item, i) => {
      const yy = 145 + i * 34;
      out += `<circle class="${color === "#2563eb" ? "main" : "accent"} pulse" cx="${x + 28}" cy="${yy - 5}" r="5"/><text class="text small" x="${x + 44}" y="${yy}">${esc(item)}</text>`;
    });
  });
  out += `<path class="arrow dash" d="M 356 180 H 402"/></svg>`;
  return out;
}

function svgFormula(id, title, formula, notes) {
  let out = `<svg id="${id}" viewBox="0 0 760 260" role="img" aria-label="${esc(title)}" xmlns="http://www.w3.org/2000/svg">${svgStyle()}<rect class="bg" width="100%" height="100%" rx="12"/><text class="text" x="24" y="38" font-weight="700">${esc(title)}</text><rect class="box" x="70" y="82" width="620" height="70" rx="10"/><text class="text" x="380" y="126" text-anchor="middle" font-size="22px" font-weight="700">${esc(formula)}</text><path class="arrow dash" d="M 120 174 H 640"/>`;
  notes.forEach((note, i) => out += `<text class="text small" x="${90 + i * 220}" y="215">${esc(note)}</text>`);
  return out + "</svg>";
}

function svgComplexityCurves(id, title) {
  const curves = [
    ["O(1)", "M90 225 H660", "#10b981"],
    ["O(log n)", "M90 250 C180 210, 330 190, 660 178", "#2563eb"],
    ["O(n)", "M90 260 L660 95", "#f97316"],
    ["O(n^2)", "M90 266 C250 250, 470 210, 660 80", "#ef4444"],
  ];
  let out = `<svg id="${id}" viewBox="0 0 760 330" role="img" aria-label="${esc(title)}" xmlns="http://www.w3.org/2000/svg">${svgStyle()}<rect class="bg" width="100%" height="100%" rx="12"/><text class="text" x="24" y="38" font-weight="700">${esc(title)}</text><path d="M80 270 H690 M80 270 V70" stroke="#1f2937" stroke-width="2"/><text class="text tiny" x="688" y="292">n</text><text class="text tiny" x="45" y="78">T(n)</text>`;
  curves.forEach(([label, d, color], i) => {
    out += `<path d="${d}" stroke="${color}" stroke-width="3" fill="none" class="dash"/><text class="text small" x="515" y="${105 + i * 28}" fill="${color}">${label}</text>`;
  });
  return out + `<circle class="accent pulse" cx="500" cy="142" r="7"/></svg>`;
}

function svgStackHeap(id, title) {
  let out = `<svg id="${id}" viewBox="0 0 760 310" role="img" aria-label="${esc(title)}" xmlns="http://www.w3.org/2000/svg">${svgStyle()}<rect class="bg" width="100%" height="100%" rx="12"/><text class="text" x="24" y="38" font-weight="700">${esc(title)}</text>`;
  [[80, "栈区 stack", ["参数 n", "局部变量 i", "返回地址"], "#2563eb"], [420, "堆区 heap", ["malloc 结点", "动态数组", "需要 free"], "#f97316"]].forEach(([x, name, items, color]) => {
    out += `<rect class="box" x="${x}" y="75" width="250" height="190" rx="10"/><text class="text" x="${x + 125}" y="105" text-anchor="middle" font-weight="700">${name}</text>`;
    items.forEach((item, i) => {
      const yy = 132 + i * 38;
      out += `<rect x="${x + 45}" y="${yy}" width="160" height="26" rx="5" fill="${color}" opacity=".14"/><text class="text small" x="${x + 125}" y="${yy + 18}" text-anchor="middle">${esc(item)}</text>`;
    });
    out += `<rect class="pulse" x="${x + 20}" y="238" width="210" height="8" rx="4" fill="${color}"/>`;
  });
  return out + `<path class="arrow dash" d="M330 170 H420"/></svg>`;
}

const SPECIAL_SVG_LABELS = {
  "002-info-flow": ["现实问题", "抽象数据", "选择结构", "算法处理", "产生价值"],
  "002-real-world-model": ["金钱/排队/关注", "数据抽象", ["数值变量", "线性序列", "图状关系"], ["float/int", "数组/队列", "用户关系图"]],
  "002-course-map": ["编程工具", "专业基础", ["C 语言", "数据结构", "算法"], ["组成原理", "操作系统", "计算机网络"]],
  "002-efficiency": ["能表示", "更高效", ["数组也能排队", "手动移动元素", "能跑"], ["队列/链表", "操作更贴合", "更省成本"]],
  "003-three-elements": ["三要素", "学习问题", ["逻辑结构", "存储结构", "数据运算"], ["关系是什么", "怎样存储", "怎样操作"]],
  "003-storage-types": ["顺序/链式", "索引/散列", ["物理相邻", "指针连接", "索引表"], ["按关键字定位", "额外空间", "快速查找"]],
  "003-structure-object": ["数据对象", "数据结构", ["同性质元素", "不强调关系"], ["元素集合", "强调关系"]],
  "004-five-features": ["必要特性", "不满足则不是算法", ["有穷性", "确定性", "可行性"], ["输入", "输出", "明确步骤"]],
  "004-good-algorithm": ["能成为算法", "好算法", ["有穷/确定/可行", "有输入输出"], ["正确", "可读", "健壮/高效"]],
  "005-big-o-rules": ["加法规则", "乘法规则", ["多项相加", "保留最高阶"], ["循环嵌套", "数量级相乘"]],
  "009-complexity": ["插入/删除表尾", "插入/删除表头", ["移动 0 个", "O(1)"], ["移动 n 个左右", "O(n)"]],
  "010-struct-compare": ["基本类型", "结构体类型", ["可直接 ==", "int/char/float"], ["逐字段比较", "按业务定义相等"]],
  "011-typedef": ["LNode *", "LinkList", ["结点指针", "强调结点"], ["链表头指针", "强调整表"]],
  "011-head-node": ["不带头结点", "带头结点", ["L 指向首元结点", "空表 L==NULL"], ["L 指向头结点", "空表 L->next==NULL"]],
  "012-head-special": ["不带头结点", "带头结点", ["表头操作改 L", "需特殊处理"], ["头指针稳定", "代码更统一"]],
  "015-traverse": ["当前结点", "next 向后", "处理数据", "prior 向前"],
  "016-boundary": ["普通双链表", "循环双链表", ["尾结点 next=NULL", "需判断空指针"], ["尾结点 next=头", "边界更统一"]],
  "017-typedef-array": ["普通写法", "typedef 数组", ["SNode a[MaxSize]", "看起来是数组"], ["SLinkList L", "强调静态链表"]],
  "017-compare": ["顺序表", "静态链表", ["连续且逻辑相邻", "可随机存取"], ["连续数组", "游标表示逻辑"]],
  "018-storage-compare": ["顺序表", "链表", ["连续空间", "随机存取", "存储密度高"], ["离散结点", "指针连接", "容量灵活"]],
  "018-operation-compare": ["顺序表", "链表", ["按位 O(1)", "插删需移动", "有序可折半"], ["查找 O(n)", "插删改指针", "额外指针域"]],
};

function renderSvg(assetDef) {
  const id = assetDef.id, title = assetDef.title;
  const spec = SPECIAL_SVG_LABELS[id];
  if (Array.isArray(spec) && Array.isArray(spec[2])) return svgCompare(id, title, spec[0], spec[1], spec[2], spec[3]);
  if (Array.isArray(spec)) return svgFlow(id, title, spec);
  if (id.includes("complexity") || id.includes("growth")) return svgComplexityCurves(id, title);
  if (assetDef.type === "address-calc") return svgFormula(id, title, "LOC(ai)=LOC(a1)+(i-1)*sizeof(ElemType)", ["起始地址", "位序 i", "元素大小"]);
  if (assetDef.type === "stack-heap") return svgStackHeap(id, title);
  if (["memory-layout", "static-array", "random-access"].includes(assetDef.type)) {
    const labels = id.includes("static") ? ["头", "A", "B", "空", "C", "空"] : id.includes("array") ? ["0", "1", "2", "3", "..."] : ["a1", "a2", "a3", "a4", "a5", "..."];
    return svgCells(id, title, labels, assetDef.description.slice(0, 38), id.includes("random") || id.includes("address") ? 2 : null);
  }
  if (["pointer", "dynamic-alloc", "realloc-flow"].includes(assetDef.type)) {
    const doubly = id.includes("double") || id.includes("dnode") || id.includes("dlist");
    const circular = id.includes("circular") || id.includes("cslist") || id.includes("cdlist");
    return svgChain(id, title, ["头", "A", "B", "C"], doubly, circular);
  }
  if (assetDef.type === "comparison") {
    return svgCompare(id, title, "方案 A", "方案 B", ["连续/直接", "查找较快", "扩容受限"], ["离散/链接", "插删灵活", "需额外信息"]);
  }
  let labels = assetDef.description.split(/[，、；。,\s]+/).filter(Boolean).slice(0, 5);
  if (labels.length < 3) labels = ["开始", ...labels, "结束"];
  return svgFlow(id, title, labels);
}

function prepareLessons(rawFiles, lessons) {
  return lessons.map((original) => {
    const lesson = { ...original };
    const match = rawFiles.find((file) => file.startsWith(lesson.source_prefix));
    if (!match) throw new Error(`Missing source for ${lesson.number} ${lesson.title}`);
    lesson.sourceFile = match;
    lesson.rawLength = fs.readFileSync(path.join(RAW_DIR, match), "utf8").length;
    lesson.id = slugify(lesson.title);
    lesson.sections.forEach((sec, i) => sec.id = sectionId(sec.heading, i + 1));
    lesson.codeBlocks.forEach((block) => {
      if (!block.linkedSectionId && lesson.sections.length) block.linkedSectionId = lesson.sections[0].id;
    });
    lesson.outline = lesson.sections.map((sec) => {
      const first = sec.paragraphs[0] || sec.keyPoint;
      return { heading: sec.heading, summary: first.slice(0, 80) + (first.length > 80 ? "..." : "") };
    });
    return lesson;
  });
}

function cleanedMarkdown(lesson) {
  const lines = [`# ${lesson.title}`, ""];
  if (lesson.subtitle) lines.push(lesson.subtitle, "");
  lines.push("## 学习目标", "");
  lesson.objectives.forEach((item) => lines.push(`- ${item}`));
  lines.push("", "## 知识点结构", "");
  lesson.outline.forEach((item) => lines.push(`- **${item.heading}：** ${item.summary}`));
  const nums = "一二三四五六七八九十";
  lesson.sections.forEach((sec, i) => {
    lines.push("", `## ${nums[i] || i + 1}、${sec.heading}`, "");
    sec.paragraphs.forEach((p) => lines.push(p, ""));
    if (sec.highlights.length) {
      lines.push("关键提示：");
      sec.highlights.forEach((h) => lines.push(`- ${h}`));
      lines.push("");
    }
    lines.push(`**本部分重点：** ${sec.keyPoint}`, "");
  });
  lines.push("## 代码整理", "");
  lesson.codeBlocks.forEach((block) => lines.push(`### ${block.title}`, "", block.description, "", "```c", block.code, "```", ""));
  lines.push("## 易错点", "");
  lesson.mistakes.forEach((m) => lines.push(`- **${m.title}：** ${m.detail}`));
  lines.push("", "## 本节总结", "");
  lesson.summary.forEach((s) => lines.push(`- ${s}`));
  lines.push("");
  return lines.join("\n");
}

function structuredJson(lesson) {
  const keys = ["id", "title", "subtitle", "objectives", "outline", "sections", "codeBlocks", "mistakes", "summary", "quiz", "svgAssets"];
  return Object.fromEntries(keys.map((key) => [key, lesson[key]]));
}

const BASE_CSS = `
:root{--page:#f5f7fb;--card:#fff;--text:#1f2937;--muted:#64748b;--main:#2563eb;--accent:#f97316;--soft:#eff6ff;--mistake:#fff7ed;--summary:#ecfdf5;--border:#dbe3ef;--code:#111827;--code-text:#e5e7eb}
body.dark{--page:#0f172a;--card:#111827;--text:#e5e7eb;--muted:#94a3b8;--soft:#172554;--mistake:#431407;--summary:#052e2b;--border:#334155;--code:#020617;--code-text:#e5e7eb}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--page);color:var(--text);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Microsoft YaHei","PingFang SC",sans-serif;line-height:1.8}.progress{position:fixed;left:0;top:0;height:4px;background:var(--main);width:0;z-index:20}.hero{background:var(--card);border-bottom:1px solid var(--border);padding:36px 24px 24px}.hero-inner{max-width:1180px;margin:0 auto}.crumb{color:var(--muted);font-size:14px}.hero h1{margin:10px 0 8px;font-size:34px;line-height:1.25;letter-spacing:0}.subtitle{margin:0;color:var(--muted)}.top-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}.btn{border:1px solid var(--border);background:var(--card);color:var(--text);border-radius:8px;padding:8px 12px;cursor:pointer;text-decoration:none}.btn:hover{border-color:var(--main);color:var(--main)}.mobile-toc{display:none;margin-top:18px}.mobile-toc select{width:100%;padding:10px;border-radius:8px;border:1px solid var(--border);background:var(--card);color:var(--text)}.layout{max-width:1180px;margin:24px auto;display:grid;grid-template-columns:260px minmax(0,1fr);gap:24px;padding:0 24px}.toc{position:sticky;top:20px;align-self:start;background:var(--card);border:1px solid var(--border);border-radius:8px;padding:16px}.toc h2{font-size:16px;margin:0 0 10px}.toc a{display:block;color:var(--muted);text-decoration:none;padding:7px 0;font-size:14px}.toc a:hover{color:var(--main)}main{min-width:0}article{background:var(--card);border:1px solid var(--border);border-radius:8px;padding:28px}.block{margin-bottom:34px}.block h2{font-size:24px;margin:0 0 14px}.block h3{font-size:19px;margin:24px 0 8px}.objectives,.outline,.highlight,.keypoint,.mistakes,.summary-box,.quiz-card{border-radius:8px;padding:16px;border:1px solid var(--border)}.objectives,.highlight,.keypoint{background:var(--soft)}.mistakes{background:var(--mistake)}.summary-box{background:var(--summary)}.outline{background:var(--card)}ul{padding-left:22px}.section-card{border-top:1px solid var(--border);padding-top:26px}.section-card:first-of-type{border-top:0;padding-top:0}.section-card p{margin:10px 0}.svg-wrap{margin:18px 0;padding:14px;border:1px solid var(--border);border-radius:8px;background:#f8fafc;overflow:auto}.svg-wrap svg{max-width:100%;height:auto;display:block;margin:auto}.codebox{margin:18px 0;border-radius:8px;overflow:hidden;background:var(--code);border:1px solid #1f2937}.code-title{display:flex;justify-content:space-between;gap:12px;align-items:center;padding:10px 14px;background:#0b1220;color:#cbd5e1;font-size:14px}.lang{color:#93c5fd}.codebox pre{margin:0;padding:16px;overflow:auto;color:var(--code-text);font-family:"SFMono-Regular",Consolas,"Liberation Mono",monospace;font-size:14px;line-height:1.7}.mistake-item{margin:10px 0}.quiz-card{background:var(--card);margin:16px 0}.quiz-options{display:grid;gap:10px;margin-top:10px}.option{width:100%;text-align:left;border:1px solid var(--border);border-radius:8px;padding:10px;background:var(--card);color:var(--text);cursor:pointer}.option.correct{border-color:#10b981;background:#ecfdf5;color:#065f46}.option.wrong{border-color:#f97316;background:#fff7ed;color:#9a3412}.explain{display:none;margin-top:10px;color:var(--muted)}.explain.show{display:block}.backtop{position:fixed;right:20px;bottom:20px;border:0;background:var(--main);color:#fff;border-radius:50%;width:46px;height:46px;font-size:18px;cursor:pointer;box-shadow:0 10px 30px rgba(37,99,235,.25)}footer{max-width:1180px;margin:12px auto 36px;padding:0 24px;color:var(--muted);font-size:14px}.index-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px}.lesson-card{background:var(--card);border:1px solid var(--border);border-radius:8px;padding:16px;text-decoration:none;color:var(--text);display:block}.lesson-card:hover{border-color:var(--main)}.lesson-card .num{color:var(--main);font-weight:700}.search{width:100%;padding:12px;border-radius:8px;border:1px solid var(--border);background:var(--card);color:var(--text);margin:18px 0}.group-title{margin-top:28px}@media (max-width:860px){.layout{display:block;padding:0 14px}.toc{display:none}.mobile-toc{display:block}.hero{padding:28px 14px 18px}.hero h1{font-size:27px}article{padding:20px}.block h2{font-size:21px}.index-grid{grid-template-columns:1fr}}
`;

const BASE_JS = `
const bar=document.querySelector('.progress');const back=document.querySelector('.backtop');function updateProgress(){const h=document.documentElement;const max=h.scrollHeight-h.clientHeight;bar.style.width=(max?h.scrollTop/max*100:0)+'%';}document.addEventListener('scroll',updateProgress,{passive:true});updateProgress();back?.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));document.querySelector('#themeToggle')?.addEventListener('click',()=>{document.body.classList.toggle('dark');localStorage.setItem('ds-theme',document.body.classList.contains('dark')?'dark':'light');});if(localStorage.getItem('ds-theme')==='dark')document.body.classList.add('dark');document.querySelectorAll('.quiz-card').forEach(card=>{const ans=card.dataset.answer;card.querySelectorAll('.option').forEach(btn=>{btn.addEventListener('click',()=>{card.querySelectorAll('.option').forEach(b=>{b.disabled=true;if(b.dataset.value===ans)b.classList.add('correct');});if(btn.dataset.value!==ans)btn.classList.add('wrong');card.querySelector('.explain')?.classList.add('show');});});});document.querySelector('#mobileToc')?.addEventListener('change',e=>{if(e.target.value)location.hash=e.target.value;});
`;

function renderLessonHtml(lesson, svgMap, prevLesson, nextLesson) {
  const nav = [`<a href="../index.html">课程首页</a>`, `<a href="#objectives">学习目标</a>`, `<a href="#outline">知识点目录</a>`];
  const mobile = [`<option value="">跳转到章节...</option>`, `<option value="#objectives">学习目标</option>`, `<option value="#outline">知识点目录</option>`];
  lesson.sections.forEach((sec) => {
    nav.push(`<a href="#${sec.id}">${esc(sec.heading)}</a>`);
    mobile.push(`<option value="#${sec.id}">${esc(sec.heading)}</option>`);
  });
  nav.push(`<a href="#code">代码整理</a>`, `<a href="#mistakes">易错点</a>`, `<a href="#summary">本节总结</a>`, `<a href="#quiz">自测题</a>`);
  mobile.push(`<option value="#code">代码整理</option>`, `<option value="#mistakes">易错点</option>`, `<option value="#summary">本节总结</option>`, `<option value="#quiz">自测题</option>`);
  let out = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(lesson.title)} - 数据结构课程 HTML 讲义</title><style>${BASE_CSS}</style></head><body><div class="progress"></div><header class="hero"><div class="hero-inner"><div class="crumb">${esc(lesson.chapter)} / 数据结构课程 HTML 讲义</div><h1>${esc(lesson.title)}</h1><p class="subtitle">${esc(lesson.subtitle)}</p><div class="top-actions"><button class="btn" id="themeToggle" type="button">深色模式</button>`;
  if (prevLesson) out += `<a class="btn" href="${esc(prevLesson.htmlFile)}">上一节</a>`;
  if (nextLesson) out += `<a class="btn" href="${esc(nextLesson.htmlFile)}">下一节</a>`;
  out += `</div><nav class="mobile-toc"><select id="mobileToc">${mobile.join("")}</select></nav></div></header><div class="layout"><aside class="toc"><h2>本节目录</h2><nav>${nav.join("")}</nav></aside><main><article>`;
  out += `<section class="block" id="objectives"><h2>学习目标</h2><div class="objectives"><ul>${lesson.objectives.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div></section>`;
  out += `<section class="block" id="outline"><h2>知识点目录</h2><div class="outline"><ul>${lesson.outline.map((x) => `<li><strong>${esc(x.heading)}：</strong>${esc(x.summary)}</li>`).join("")}</ul></div></section>`;
  lesson.sections.forEach((sec) => {
    out += `<section class="block section-card" id="${sec.id}"><h2>${esc(sec.heading)}</h2>${sec.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}`;
    if (sec.highlights.length) out += `<div class="highlight"><strong>关键提示</strong><ul>${sec.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul></div>`;
    sec.svgRefs.forEach((ref) => { if (svgMap[ref]) out += `<div class="svg-wrap">${svgMap[ref]}</div>`; });
    out += `<div class="keypoint"><strong>本部分重点：</strong>${esc(sec.keyPoint)}</div></section>`;
  });
  out += `<section class="block" id="code"><h2>代码整理</h2>`;
  lesson.codeBlocks.forEach((block) => {
    out += `<h3>${esc(block.title)}</h3><p>${esc(block.description)}</p><div class="codebox"><div class="code-title"><span>${esc(block.title)}</span><span class="lang">C</span></div><pre><code>${esc(block.code)}</code></pre></div>`;
  });
  out += `</section><section class="block" id="mistakes"><h2>易错点</h2><div class="mistakes">${lesson.mistakes.map((m) => `<div class="mistake-item"><strong>${esc(m.title)}：</strong>${esc(m.detail)}</div>`).join("")}</div></section>`;
  out += `<section class="block" id="summary"><h2>本节总结</h2><div class="summary-box"><ul>${lesson.summary.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div></section><section class="block" id="quiz"><h2>自测题</h2>`;
  lesson.quiz.forEach((q, i) => {
    out += `<div class="quiz-card" data-answer="${esc(q.answer)}"><strong>${i + 1}. ${esc(q.question)}</strong><div class="quiz-options">`;
    q.options.forEach((opt) => out += `<button class="option" type="button" data-value="${esc(opt.split(".", 1)[0])}">${esc(opt)}</button>`);
    out += `</div><div class="explain"><strong>答案：${esc(q.answer)}</strong>。${esc(q.explanation)}</div></div>`;
  });
  out += `</section></article></main></div><button class="backtop" type="button" aria-label="返回顶部">↑</button><footer>来源文稿：${esc(lesson.sourceFile)}。本页面可离线阅读，交互和 SVG 均已内嵌。</footer><script>${BASE_JS}</script></body></html>`;
  return out;
}

function renderLessonFullContent(lesson, svgMap, prefix) {
  let out = `<section class="block section-card" id="${prefix}"><h2>${esc(lesson.title)}</h2><p class="subtitle">${esc(lesson.subtitle)}</p>`;
  out += `<div class="top-actions"><a class="btn" href="../lessons/${esc(lesson.htmlFile)}">打开单课页面</a></div>`;
  out += `<section class="block" id="${prefix}-objectives"><h3>学习目标</h3><div class="objectives"><ul>${lesson.objectives.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div></section>`;
  out += `<section class="block" id="${prefix}-outline"><h3>知识点目录</h3><div class="outline"><ul>${lesson.outline.map((x) => `<li><strong>${esc(x.heading)}：</strong>${esc(x.summary)}</li>`).join("")}</ul></div></section>`;
  lesson.sections.forEach((sec) => {
    out += `<section class="block" id="${prefix}-${sec.id}"><h3>${esc(sec.heading)}</h3>${sec.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}`;
    if (sec.highlights.length) {
      out += `<div class="highlight"><strong>关键提示</strong><ul>${sec.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul></div>`;
    }
    sec.svgRefs.forEach((ref) => {
      if (svgMap[ref]) out += `<div class="svg-wrap">${svgMap[ref]}</div>`;
    });
    out += `<div class="keypoint"><strong>本部分重点：</strong>${esc(sec.keyPoint)}</div></section>`;
  });
  out += `<section class="block" id="${prefix}-code"><h3>代码整理</h3>`;
  lesson.codeBlocks.forEach((block) => {
    out += `<h3>${esc(block.title)}</h3><p>${esc(block.description)}</p><div class="codebox"><div class="code-title"><span>${esc(block.title)}</span><span class="lang">C</span></div><pre><code>${esc(block.code)}</code></pre></div>`;
  });
  out += `</section><section class="block" id="${prefix}-mistakes"><h3>易错点</h3><div class="mistakes">${lesson.mistakes.map((m) => `<div class="mistake-item"><strong>${esc(m.title)}：</strong>${esc(m.detail)}</div>`).join("")}</div></section>`;
  out += `<section class="block" id="${prefix}-summary"><h3>本节总结</h3><div class="summary-box"><ul>${lesson.summary.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div></section><section class="block" id="${prefix}-quiz"><h3>自测题</h3>`;
  lesson.quiz.forEach((q, i) => {
    out += `<div class="quiz-card" data-answer="${esc(q.answer)}"><strong>${i + 1}. ${esc(q.question)}</strong><div class="quiz-options">`;
    q.options.forEach((opt) => out += `<button class="option" type="button" data-value="${esc(opt.split(".", 1)[0])}">${esc(opt)}</button>`);
    out += `</div><div class="explain"><strong>答案：${esc(q.answer)}</strong>。${esc(q.explanation)}</div></div>`;
  });
  out += `</section></section>`;
  return out;
}

function renderChapterHtml(chapter, lessons) {
  const nav = [`<a href="../index.html">课程首页</a>`];
  const mobile = [`<option value="">跳转到课时...</option>`];
  lessons.forEach((lesson) => {
    const prefix = `lesson-${lesson.number}`;
    nav.push(`<a href="#${prefix}">${esc(lesson.number)} ${esc(lesson.title)}</a>`);
    mobile.push(`<option value="#${prefix}">${esc(lesson.number)} ${esc(lesson.title)}</option>`);
  });
  let out = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(chapter)} - 数据结构课程 HTML 讲义</title><style>${BASE_CSS}</style></head><body><div class="progress"></div><header class="hero"><div class="hero-inner"><div class="crumb">章节合并版 / 数据结构课程 HTML 讲义</div><h1>${esc(chapter)}</h1><p class="subtitle">本页按章节合并了 ${lessons.length} 节课的完整内容，保留正文、SVG 演示、代码、易错点、总结和自测题。</p><div class="top-actions"><button class="btn" id="themeToggle" type="button">深色模式</button><a class="btn" href="../index.html">返回首页</a></div><nav class="mobile-toc"><select id="mobileToc">${mobile.join("")}</select></nav></div></header><div class="layout"><aside class="toc"><h2>章节目录</h2><nav>${nav.join("")}</nav></aside><main><article>`;
  lessons.forEach((lesson) => {
    const baseName = cleanFilename(`${lesson.number}_${lesson.title.split(" ").slice(1).join(" ") || lesson.title}`);
    const svgItems = JSON.parse(fs.readFileSync(path.join(INTERMEDIATE_DIR, `${baseName}.svg.json`), "utf8"));
    const svgMap = Object.fromEntries(svgItems.map((item) => [item.id, item.svg]));
    out += renderLessonFullContent(lesson, svgMap, `lesson-${lesson.number}`);
  });
  out += `</article></main></div><button class="backtop" type="button" aria-label="返回顶部">↑</button><footer>${esc(chapter)} 合并页，共 ${lessons.length} 节课，内容来自 output/intermediate 的结构化数据和 SVG 资源。</footer><script>${BASE_JS}</script></body></html>`;
  return out;
}

function renderIndexHtml(lessons) {
  const groups = new Map();
  lessons.forEach((lesson) => {
    if (!groups.has(lesson.chapter)) groups.set(lesson.chapter, []);
    groups.get(lesson.chapter).push(lesson);
  });
  let out = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>数据结构课程 HTML 讲义</title><style>${BASE_CSS}</style></head><body><div class="progress"></div><header class="hero"><div class="hero-inner"><div class="crumb">课程目录</div><h1>数据结构课程 HTML 讲义</h1><p class="subtitle">由课堂转写文稿清洗整理生成，包含中间 Markdown、结构化 JSON、SVG 动画和离线 HTML 页面。</p><nav class="top-actions" aria-label="首页操作"><button class="btn" id="themeToggle" type="button">深色模式</button></nav><input class="search" id="search" type="search" placeholder="搜索课程标题或摘要"></div></header><main class="layout" style="grid-template-columns:1fr"><article>`;
  out += `<section class="block lesson-group"><h2 class="group-title">章节合并版</h2><div class="index-grid">`;
  for (const [chapter, items] of groups.entries()) {
    const summary = `合并 ${items.length} 节课，保留完整正文、SVG、代码、易错点、总结和自测题。`;
    out += `<a class="lesson-card" data-title="${esc(`${chapter} 合并 章节 ${summary}`)}" href="chapters/${esc(chapterFileName(chapter))}"><div class="num">章节</div><h3>${esc(chapter)}</h3><p>${esc(summary)}</p></a>`;
  }
  out += `</div></section>`;
  for (const [chapter, items] of groups.entries()) {
    out += `<section class="block lesson-group"><h2 class="group-title">${esc(chapter)}</h2><div class="index-grid">`;
    items.forEach((lesson) => {
      const summary = lesson.outline[0]?.summary || lesson.subtitle;
      out += `<a class="lesson-card" data-title="${esc(`${lesson.title} ${summary}`)}" href="lessons/${esc(lesson.htmlFile)}"><div class="num">${esc(lesson.number)}</div><h3>${esc(lesson.title)}</h3><p>${esc(summary)}</p></a>`;
    });
    out += `</div></section>`;
  }
  const indexJs = BASE_JS + `const input=document.querySelector('#search');input?.addEventListener('input',()=>{const key=input.value.trim().toLowerCase();document.querySelectorAll('.lesson-card').forEach(card=>{card.style.display=card.dataset.title.toLowerCase().includes(key)?'block':'none';});document.querySelectorAll('.lesson-group').forEach(group=>{const visible=[...group.querySelectorAll('.lesson-card')].some(card=>card.style.display!=='none');group.style.display=visible?'block':'none';});});`;
  out += `</article></main><button class="backtop" type="button" aria-label="返回顶部">↑</button><footer>共 ${lessons.length} 节课。所有链接均指向 output/lessons 下的离线 HTML 文件。</footer><script>${indexJs}</script></body></html>`;
  return out;
}

function main() {
  const rawFiles = fs.readdirSync(RAW_DIR).filter((x) => x.endsWith(".txt")).sort();
  if (!rawFiles.length) throw new Error(`No source transcripts found in ${RAW_DIR}`);
  fs.mkdirSync(LESSON_DIR, { recursive: true });
  fs.mkdirSync(CHAPTER_DIR, { recursive: true });
  fs.mkdirSync(INTERMEDIATE_DIR, { recursive: true });
  const lessons = prepareLessons(rawFiles, loadLessonData());
  lessons.forEach((lesson) => {
    const baseName = cleanFilename(`${lesson.number}_${lesson.title.split(" ").slice(1).join(" ") || lesson.title}`);
    lesson.htmlFile = `${baseName}.html`;
    const structured = structuredJson(lesson);
    const svgJson = lesson.svgAssets.map((a) => ({ id: a.id, svg: renderSvg(a) }));
    fs.writeFileSync(path.join(INTERMEDIATE_DIR, `${baseName}.cleaned.md`), cleanedMarkdown(lesson), "utf8");
    fs.writeFileSync(path.join(INTERMEDIATE_DIR, `${baseName}.structured.json`), JSON.stringify(structured, null, 2), "utf8");
    fs.writeFileSync(path.join(INTERMEDIATE_DIR, `${baseName}.svg.json`), JSON.stringify(svgJson, null, 2), "utf8");
  });
  lessons.forEach((lesson, idx) => {
    const baseName = cleanFilename(`${lesson.number}_${lesson.title.split(" ").slice(1).join(" ") || lesson.title}`);
    const svgItems = JSON.parse(fs.readFileSync(path.join(INTERMEDIATE_DIR, `${baseName}.svg.json`), "utf8"));
    const svgMap = Object.fromEntries(svgItems.map((item) => [item.id, item.svg]));
    fs.writeFileSync(path.join(LESSON_DIR, lesson.htmlFile), renderLessonHtml(lesson, svgMap, lessons[idx - 1], lessons[idx + 1]), "utf8");
  });
  const chapters = new Map();
  lessons.forEach((lesson) => {
    if (!chapters.has(lesson.chapter)) chapters.set(lesson.chapter, []);
    chapters.get(lesson.chapter).push(lesson);
  });
  for (const [chapter, items] of chapters.entries()) {
    fs.writeFileSync(path.join(CHAPTER_DIR, chapterFileName(chapter)), renderChapterHtml(chapter, items), "utf8");
  }
  fs.writeFileSync(path.join(OUT_DIR, "index.html"), renderIndexHtml(lessons), "utf8");
  fs.writeFileSync(path.join(OUT_DIR, "generation-report.json"), JSON.stringify({
    processed: lessons.length,
    sourceFiles: lessons.map((lesson) => lesson.sourceFile),
    htmlFiles: lessons.map((lesson) => `lessons/${lesson.htmlFile}`),
    chapterHtmlFiles: [...chapters.keys()].map((chapter) => `chapters/${chapterFileName(chapter)}`),
    intermediateFiles: fs.readdirSync(INTERMEDIATE_DIR).length,
  }, null, 2), "utf8");
}

main();
