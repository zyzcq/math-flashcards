// data.js
// 统一定义所有闪卡数据

const appData = {
    // === 模块 1：导数公式 ===
    derivatives: {
        id: "derivatives",
        title: "基本求导公式",
        subtitle: "微积分基础强化",
        themeColor: "sky", // 对应 Tailwind 的 sky 色系
        cards: [
            {
                title: "📐 幂函数求导",
                q: "$$(x^\\alpha)'$$",
                tip: "<b>手写口诀：$\\alpha$ 拿下来！</b><ul><li>把指数拉到前面相乘，然后次数减一。</li><li>注：$\\alpha$ 为常数。</li></ul>",
                a: "$$(x^\\alpha)' = \\alpha x^{\\alpha-1}$$"
            },
            {
                title: "📈 指数函数基础",
                q: "$$(a^x)' \\quad \\text{和} \\quad (e^x)'$$",
                tip: "<b>对比记忆：</b><ul><li>指数函数求导先抄一遍自己。</li><li>底数是 $a$ 时，后面要补乘一个 <span class='highlight'>$\\ln a$</span>。</li><li>$e^x$ 是最完美的函数，求导后完全不变。</li></ul>",
                a: "$$(a^x)' = a^x \\ln a \\quad (a>0, a \\neq 1)$$<br><br> $$(e^x)' = e^x$$"
            },
            {
                title: "🚀 指数函数高阶",
                q: "$$(a^x)^{(n)} \\quad \\text{和} \\quad (e^x)^{(n)}$$",
                tip: "<b>根据规律归纳：</b><ul><li>每对 $a^x$ 求导一次，就会多出一个 $\\ln a$。</li><li>求 $n$ 次导，就有 <span class='highlight'>$n$ 个 $\\ln a$ 相乘</span>。</li><li>$e^x$ 依然天下无敌，多少阶导数都是它自己。</li></ul>",
                a: "$$(a^x)^{(n)} = a^x(\\ln a)^n$$<br><br> $$(e^x)^{(n)} = e^x$$"
            },
            {
                title: "📉 对数函数求导",
                q: "$$(\\log_a x)'$$",
                tip: "<b>记忆法：</b><ul><li>对数求导变分式，出现 $\\frac{1}{x}$。</li><li>底数是 $a$ 时，分母要多乘一个 <span class='highlight'>$\\ln a$</span>。</li></ul>",
                a: "$$(\\log_a x)' = \\frac{1}{x \\ln a} \\quad (a>0, a \\neq 1)$$"
            },
            {
                title: "🛡️ 绝对值对数",
                q: "$$(\\ln|x|)'$$",
                tip: "<b>手写精髓：视绝对值符号而不见！</b><ul><li>不论 $x>0$ 还是 $x<0$，导数统一都是 $\\frac{1}{x}$。</li><li><b>复合函数扩展：</b>$[\\ln|u(x)|]' = \\frac{u'(x)}{u(x)}$（把里面的导数放分子，原函数放分母）。</li></ul>",
                a: "$$(\\ln|x|)' = \\frac{1}{x} \\quad (x \\neq 0)$$"
            },
            {
                title: "🌊 正弦与余弦",
                q: "$$(\\sin x)' \\quad \\text{和} \\quad (\\cos x)'$$",
                tip: "<b>核心规律（适用于所有三角函数）：</b><ul><li>名字带有 <b>“co”</b>（余）的三角函数，求导结果必带 <span class='highlight'>负号 (-)</span>！</li></ul>",
                a: "$$(\\sin x)' = \\cos x$$<br><br> $$(\\cos x)' = -\\sin x$$"
            },
            {
                title: "🌊 正切与余切",
                q: "$$(\\tan x)' \\quad \\text{和} \\quad (\\cot x)'$$",
                tip: "<b>记忆：切变平方</b><ul><li>正切变正割平方，余切变余割平方。</li><li>同样，带有“co”的 $\\cot x$ 产生 <span class='highlight'>负号 (-)</span>。</li></ul>",
                a: "$$(\\tan x)' = \\sec^2 x$$<br><br> $$(\\cot x)' = -\\csc^2 x$$"
            },
            {
                title: "🌊 正割与余割",
                q: "$$(\\sec x)' \\quad \\text{和} \\quad (\\csc x)'$$",
                tip: "<b>记忆：割生两子</b><ul><li>求导后不仅保留自己，还要乘以对应的切函数。</li><li>带有“co”的 $\\csc x$ 产生 <span class='highlight'>负号 (-)</span>。</li></ul>",
                a: "$$(\\sec x)' = \\sec x \\tan x$$<br><br> $$(\\csc x)' = -\\csc x \\cot x$$"
            },
            {
                title: "📐 反正余弦",
                q: "$$(\\arcsin x)' \\quad \\text{和} \\quad (\\arccos x)'$$",
                tip: "<b>成对记忆：</b><ul><li>分母都有根号 <span class='highlight'>$\\sqrt{1-x^2}$</span>。</li><li>带有“co”的 $\\arccos x$ 分子带 <span class='highlight'>负号</span>。</li></ul>",
                a: "$$(\\arcsin x)' = \\frac{1}{\\sqrt{1-x^2}}$$<br><br> $$(\\arccos x)' = -\\frac{1}{\\sqrt{1-x^2}}$$"
            },
            {
                title: "📐 反正余切",
                q: "$$(\\arctan x)' \\quad \\text{和} \\quad (\\text{arccot } x)'$$",
                tip: "<b>成对记忆：</b><ul><li>分母没有根号，是 <span class='highlight'>$1+x^2$</span>。</li><li>带有“co”的 $\\text{arccot } x$ 分子带 <span class='highlight'>负号</span>。</li></ul>",
                a: "$$(\\arctan x)' = \\frac{1}{1+x^2}$$<br><br> $$(\\text{arccot } x)' = -\\frac{1}{1+x^2}$$"
            },
            {
                title: "⭐ 积分常用神仙对数",
                q: "$$\\left[\\ln(x+\\sqrt{x^2+1})\\right]'$$<br>$$\\left[\\ln(x+\\sqrt{x^2-1})\\right]'$$",
                tip: "<b>秒杀技巧：直接提取根号！</b><ul><li>求导结果极其优美，就是对数括号里的那个<span class='highlight'>根号部分取倒数</span>。</li><li>常用于解复杂的微积分和反双曲函数。</li></ul>",
                a: "$$\\left[\\ln(x+\\sqrt{x^2+1})\\right]' = \\frac{1}{\\sqrt{x^2+1}}$$ <br><br> $$\\left[\\ln(x+\\sqrt{x^2-1})\\right]' = \\frac{1}{\\sqrt{x^2-1}}$$"
            }
        ]
    },

    // === 模块 2：等价无穷小 ===
    equivalent: {
        id: "equivalent",
        title: "等价无穷小记忆卡",
        subtitle: "x → 0 数二专用",
        themeColor: "indigo", // 对应 Tailwind 的 indigo 色系
        cards: [
            { title: "基础三角", q: "$$\\sin x \\sim ?$$", a: "$$\\sin x \\sim x$$", tip: "<b>最基础的起点：</b><ul><li>在单位圆中，$x \\to 0$ 时弧长约等于弦长。</li><li>这是所有三角函数等价的母式。</li></ul>" },
            { title: "基础三角", q: "$$\\tan x \\sim ?$$", a: "$$\\tan x \\sim x$$", tip: "<b>切线斜率：</b><ul><li>$\\tan x$ 在原点处的切线斜率为 1。</li><li>注意：虽然 $\\sin x$ 和 $\\tan x$ 都等价于 $x$，但它们的<span class='highlight'>三阶差值</span>不同。</li></ul>" },
            { title: "反三角", q: "$$\\arcsin x \\sim ?$$", a: "$$\\arcsin x \\sim x$$", tip: "<b>镜像记忆：</b><ul><li>因为 $\\sin x \\sim x$，所以其反函数在原点附近的性状也是 $y=x$。</li></ul>" },
            { title: "反三角", q: "$$\\arctan x \\sim ?$$", a: "$$\\arctan x \\sim x$$", tip: "<b>镜像记忆：</b><ul><li>同理，由 $\\tan x \\sim x$ 推导而来。</li></ul>" },
            { title: "二阶核心", q: "$$1 - \\cos x \\sim ?$$", a: "$$1 - \\cos x \\sim \\frac{1}{2}x^2$$", tip: "<b>必背重点：</b><ul><li>由半角公式 $2\\sin^2(x/2)$ 推导而来。</li><li><span class='highlight'>系数 1/2</span> 极易漏掉，务必警惕。</li></ul>" },
            { title: "二阶核心", q: "$$\\sec x - 1 \\sim ?$$", a: "$$\\sec x - 1 \\sim \\frac{1}{2}x^2$$", tip: "<b>倒数关系：</b><ul><li>$\\sec x - 1 = \\frac{1-\\cos x}{\\cos x}$，因为 $\\cos x \\to 1$，所以和 $1-\\cos x$ 等价。</li></ul>" },
            { title: "指数函数", q: "$$e^x - 1 \\sim ?$$", a: "$$e^x - 1 \\sim x$$", tip: "<b>切线逻辑：</b><ul><li>$e^x$ 在 $(0,1)$ 点的切线方程是 $y = x+1$。</li><li>变形即得 $e^x - 1 \\sim x$。</li></ul>" },
            { title: "指数函数", q: "$$a^x - 1 \\sim ?$$", a: "$$a^x - 1 \\sim x \\ln a$$", tip: "<b>底数转换：</b><ul><li>$a^x = e^{x \\ln a}$，把 $x \\ln a$ 看作整体代入即可。</li><li>注意多出的常数 $\\ln a$。</li></ul>" },
            { title: "对数函数", q: "$$\\ln(1+x) \\sim ?$$", a: "$$\\ln(1+x) \\sim x$$", tip: "<b>注意前提：</b><ul><li>必须凑成 $\\ln(1 + \\Delta)$ 的形式，且 $\\Delta \\to 0$。</li><li>它是 $e^x - 1 \\sim x$ 的反函数形式。</li></ul>" },
            { title: "对数函数", q: "$$\\log_a(1+x) \\sim ?$$", a: "$$\\log_a(1+x) \\sim \\frac{x}{\\ln a}$$", tip: "<b>换底公式：</b><ul><li>$\\log_a(1+x) = \\frac{\\ln(1+x)}{\\ln a}$，分母多了常数 $\\ln a$。</li></ul>" },
            { title: "幂指函数", q: "$$(1+x)^\\alpha - 1 \\sim ?$$", a: "$$(1+x)^\\alpha - 1 \\sim \\alpha x$$", tip: "<b>广义二项式：</b><ul><li>当 $\\alpha = 1/2$ 时即为 $\\sqrt{1+x}-1 \\sim \\frac{1}{2}x$。</li><li>记住：<span class='highlight'>幂次下放</span>，变为系数。</li></ul>" },
            { title: "二阶作差", q: "$$x - \\ln(1+x) \\sim ?$$", a: "$$x - \\ln(1+x) \\sim \\frac{1}{2}x^2$$", tip: "<b>大题高频考点：</b><ul><li>源自麦克劳林展开：$\\ln(1+x) = x - x^2/2 + \\dots$</li><li>做解答题经常用来凑项！</li></ul>" },
            { title: "二阶作差", q: "$$e^x - 1 - x \\sim ?$$", a: "$$e^x - 1 - x \\sim \\frac{1}{2}x^2$$", tip: "<b>大题高频考点：</b><ul><li>源自麦克劳林展开：$e^x = 1 + x + x^2/2! + \\dots$</li></ul>" },
            { title: "三阶作差", q: "$$x - \\sin x \\sim ?$$", a: "$$x - \\sin x \\sim \\frac{1}{6}x^3$$", tip: "<b>口诀：正弦变六分</b><ul><li>源自泰勒展开：$\\sin x = x - x^3/6 + \\dots$</li><li>在第一象限，$x > \\sin x$，故差值为正。</li></ul>" },
            { title: "三阶作差", q: "$$\\arcsin x - x \\sim ?$$", a: "$$\\arcsin x - x \\sim \\frac{1}{6}x^3$$", tip: "<b>对称记忆：</b><ul><li>系数同样是 <span class='highlight'>1/6</span>。</li><li>因为 $\\arcsin x > x$，结果为正。</li></ul>" },
            { title: "三阶作差", q: "$$\\tan x - x \\sim ?$$", a: "$$\\tan x - x \\sim \\frac{1}{3}x^3$$", tip: "<b>口诀：正切变三分</b><ul><li>正切函数在原点附近增长比 $x$ 快。</li><li>系数 $1/3$ 是 $1/6$ 的两倍。</li></ul>" },
            { title: "三阶作差", q: "$$x - \\arctan x \\sim ?$$", a: "$$x - \\arctan x \\sim \\frac{1}{3}x^3$$", tip: "<b>镜像记忆：</b><ul><li>系数同样是 <span class='highlight'>1/3</span>。</li><li>注意 $\\arctan x$ 增长比 $x$ 慢，故 $x - \\arctan x$ 为正。</li></ul>" },
            { title: "综合大招", q: "$$\\tan x - \\sin x \\sim ?$$", a: "$$\\tan x - \\sin x \\sim \\frac{1}{2}x^3$$", tip: "<b>拆分技巧：</b><ul><li>等于 $(\\tan x - x) + (x - \\sin x)$。</li><li>即 $1/3 + 1/6 = <span class='highlight'>1/2</span>$。</li><li>大题求极限的最爱。</li></ul>" },
            { title: "指数进阶", q: "$$a^x - b^x \\sim ?$$", a: "$$a^x - b^x \\sim x \\ln\\left(\\frac{a}{b}\\right)$$", tip: "<b>提取公因式：</b><ul><li>等于 $b^x( (a/b)^x - 1 )$。</li><li>因为 $b^x \\to 1$，利用 $(a/b)^x - 1 \\sim x \\ln(a/b)$ 即得。</li></ul>" },
            { title: "1^∞杀招", q: "$$(1+x)^{\\frac{1}{x}} - e \\sim ?$$", a: "$$(1+x)^{\\frac{1}{x}} - e \\sim -\\frac{e}{2}x$$", tip: "<b>极其重要：</b><ul><li>大题常考复合极限！</li><li>现场推导极慢，记住系数 <span class='highlight'>-e/2</span> 能在考场上救命。</li></ul>" },
            { title: "三阶组合", q: "$$\\arcsin x - \\sin x \\sim ?$$", a: "$$\\arcsin x - \\sin x \\sim \\frac{1}{3}x^3$$", tip: "<b>拆分相加：</b><ul><li>等于 $(\\arcsin x - x) + (x - \\sin x)$。</li><li>即 $1/6 + 1/6 = <span class='highlight'>1/3</span>$。</li></ul>" },
            { title: "三阶组合", q: "$$\\tan x - \\arctan x \\sim ?$$", a: "$$\\tan x - \\arctan x \\sim \\frac{2}{3}x^3$$", tip: "<b>拆分相加：</b><ul><li>等于 $(\\tan x - x) + (x - \\arctan x)$。</li><li>即 $1/3 + 1/3 = <span class='highlight'>2/3</span>$。</li></ul>" }
        ]
    },

    // === 模块 3：泰勒公式 ===
    taylor: {
        id: "taylor",
        title: "泰勒公式记忆卡",
        subtitle: "核心展开式",
        themeColor: "violet", // 改为紫罗兰色以区分前两个
        cards: [
            {
                title: "🌟 核心母座",
                q: "$$f(x)$$",
                tip: "万物起源的泰勒/麦克劳林公式。<br><b>牢记三大对应关系：</b><ul><li>第 <span class='highlight'>n 阶导数</span> $f^{(n)}(0)$</li><li>除以 <span class='highlight'>n 的阶乘</span> $n!$</li><li>乘以 <span class='highlight'>x 的 n 次方</span> $x^n$</li></ul>",
                a: "$$f(x) = f(0) + f'(0)x + \\frac{f''(0)}{2!}x^2 + \\dots + \\frac{f^{(n)}(0)}{n!}x^n + o(x^n)$$"
            },
            {
                title: "📐 正弦函数",
                q: "$$\\sin x$$",
                tip: "<b>记忆口诀：奇次幂、有阶乘、减号</b><ul><li><b>奇偶性：</b>奇函数，只有 <span class='highlight'>奇数次幂</span> ($x, x^3$)。</li><li><b>分母：</b>带有 <span class='highlight'>阶乘</span> ($3!$)。</li><li><b>符号：</b>由正转负 ($x - \\dots$)。</li></ul>",
                a: "$$\\sin x = x - \\frac{x^3}{3!} + o(x^3)$$"
            },
            {
                title: "📐 余弦函数",
                q: "$$\\cos x$$",
                tip: "<b>记忆口诀：偶次幂、有阶乘、交替号</b><ul><li><b>奇偶性：</b>偶函数，只有 <span class='highlight'>偶数次幂</span> ($x^2, x^4$)。常数项 $1$ 视为 $0$ 次幂。</li><li><b>分母：</b>带有 <span class='highlight'>阶乘</span> ($2!, 4!$)。</li><li><b>符号：</b>一正一负 <span class='highlight'>交替</span> ($1 - \\dots + \\dots$)。</li></ul>",
                a: "$$\\cos x = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} + o(x^4)$$"
            },
            {
                title: "📐 反正弦",
                q: "$$\\arcsin x$$",
                tip: "<b>对比 $\\sin x$ 记忆：</b><ul><li>各项幂次与分母形式 ($x^3, 3!$) 与 $\\sin x$ 完全长得一样。</li><li>唯一的区别：中间的减号变成了 <span class='highlight'>加号 (+)</span>。</li></ul>",
                a: "$$\\arcsin x = x + \\frac{x^3}{3!} + o(x^3)$$"
            },
            {
                title: "📐 正切函数",
                q: "$$\\tan x$$",
                tip: "⚠️ <b>极易错预警区！</b><ul><li><b>无阶乘：</b>分母 <span class='highlight'>绝对没有阶乘</span>！就只是孤零零的数字 $3$。</li><li><b>全正号：</b>中间全部都是 <span class='highlight'>加号 (+)</span>。</li><li><b>奇函数：</b>和 $\\sin x$ 一样都是 $x$ 和 $x^3$。</li></ul>",
                a: "$$\\tan x = x + \\frac{x^3}{3} + o(x^3)$$"
            },
            {
                title: "📐 反正切",
                q: "$$\\arctan x$$",
                tip: "<b>与 $\\tan x$ 形成镜像对比：</b><ul><li>$\\tan x$ 是加号，$\\arctan x$ 变成了 <span class='highlight'>减号 (-)</span>。</li><li>同样 <span class='highlight'>没有阶乘</span>！分母就是直接的数字 $3$。</li><li>同样只有奇次幂。</li></ul>",
                a: "$$\\arctan x = x - \\frac{x^3}{3} + o(x^3)$$"
            },
            {
                title: "📈 对数函数",
                q: "$$\\ln(1+x)$$",
                tip: "<b>记忆口诀：自然数分母、交替号</b><ul><li><b>起点：</b>从一阶 $x$ 开始，接下来的次幂不跳跃 ($x^2, x^3$)。</li><li><b>分母：</b>紧跟着次幂 ($2, 3$)，<span class='highlight'>没有阶乘</span>！</li><li><b>符号：</b>一正一负 <span class='highlight'>交替</span> ($+ - +$)。</li></ul>",
                a: "$$\\ln(1+x) = x - \\frac{x^2}{2} + \\frac{x^3}{3} + o(x^3)$$"
            },
            {
                title: "📈 指数函数",
                q: "$$e^x$$",
                tip: "<b>最老实、最完美的函数：</b><ul><li><b>全都有：</b>次幂一点都不跳 ($x, x^2, x^3$)。</li><li><b>全有阶乘：</b>分母规规矩矩全带 <span class='highlight'>阶乘</span> ($2!, 3!$)。</li><li><b>全正号：</b>全场 <span class='highlight'>都是加号 (+)</span>。</li></ul>",
                a: "$$e^x = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + o(x^3)$$"
            },
            {
                title: "🔢 广义二项式",
                q: "$$(1+x)^\\alpha$$",
                tip: "<b>展开记忆：</b><ul><li><b>第一项 & 第二项：</b>$1 + \\alpha x$ 非常好记。</li><li><b>第三项：</b>分子是阶梯下降相乘 <span class='highlight'>$\\alpha(\\alpha-1)$</span>，分母对应次幂的 <span class='highlight'>阶乘 $2!$</span>。</li><li>皮亚诺余项为 $o(x^2)$。</li></ul>",
                a: "$$(1+x)^\\alpha = 1 + \\alpha x + \\frac{\\alpha(\\alpha-1)}{2!}x^2 + o(x^2)$$"
            }
        ]
    }
},
    // === 这里记得在上一个模块的 } 后面加一个逗号 ===
    ,
    // === 模块 4：三角函数特殊值 ===
    trig_special: {
        id: "trig_special",
        title: "三角函数特殊值",
        subtitle: "表格数据速记",
        themeColor: "sky", 
        cards: [
            {
                title: "🌊 基础组：正弦与余弦",
                q: "$$\\sin\\theta \\quad \\text{和} \\quad \\cos\\theta$$<br><span class='text-sm font-normal text-slate-500'>(30°, 45°, 60°)</span>",
                tip: "<b>口诀：</b><ul><li>$\\sin$ 的分子从小到大：$1, \\sqrt{2}, \\sqrt{3}$。</li><li>$\\cos$ 的分子从大到小：$\\sqrt{3}, \\sqrt{2}, 1$。</li><li>分母全都是 $2$。</li></ul>",
                a: "<b>$\\sin\\theta$:</b> $$\\frac{1}{2}, \\quad \\frac{\\sqrt{2}}{2}, \\quad \\frac{\\sqrt{3}}{2}$$<br><br><b>$\\cos\\theta$:</b> $$\\frac{\\sqrt{3}}{2}, \\quad \\frac{\\sqrt{2}}{2}, \\quad \\frac{1}{2}$$"
            },
            {
                title: "📈 进阶组：正切与余切",
                q: "$$\\tan\\theta \\quad \\text{和} \\quad \\cot\\theta$$<br><span class='text-sm font-normal text-slate-500'>(30°, 45°, 60°)</span>",
                tip: "<b>联系：</b><ul><li>$45^\\circ$ 时两者相等，都是 $1$。</li><li>$30^\\circ$ 和 $60^\\circ$ 的结果刚好对调，且互为倒数。</li></ul>",
                a: "<b>$\\tan\\theta$:</b> $$\\frac{\\sqrt{3}}{3}, \\quad 1, \\quad \\sqrt{3}$$<br><br><b>$\\cot\\theta$:</b> $$\\sqrt{3}, \\quad 1, \\quad \\frac{\\sqrt{3}}{3}$$"
            },
            {
                title: "🛡️ 倒数组：正割与余割",
                q: "$$\\sec\\theta \\quad \\text{和} \\quad \\csc\\theta$$<br><span class='text-sm font-normal text-slate-500'>(30°, 45°, 60°)</span>",
                tip: "<b>定义：</b>$\\sec$ 是 $\\cos$ 的倒数，$\\csc$ 是 $\\sin$ 的倒数。<br>遇到 $\\frac{2}{\\sqrt{3}}$ 时，分子分母同乘 $\\sqrt{3}$ 有理化，即得 $\\frac{2\\sqrt{3}}{3}$。",
                a: "<b>$\\sec\\theta$:</b> $$\\frac{2\\sqrt{3}}{3}, \\quad \\sqrt{2}, \\quad 2$$<br><br><b>$\\csc\\theta$:</b> $$2, \\quad \\sqrt{2}, \\quad \\frac{2\\sqrt{3}}{3}$$"
            },
            {
                title: "🪓 坐标轴关键点：0° 和 90°",
                q: "当 $\\theta = 0^\\circ (0)$ 和 $90^\\circ (\\frac{\\pi}{2})$ 时的所有值",
                tip: "<b>重点提示：</b>分母为 $0$ 的情况（$\\tan 90^\\circ$, $\\cot 0^\\circ$, $\\sec 90^\\circ$, $\\csc 0^\\circ$）都是<b>不存在</b>的！",
                a: "<b>对于 $0^\\circ$:</b><br>$\\sin=0, \\cos=1, \\tan=0$<br>$\\cot=\\text{不存在}, \\sec=1, \\csc=\\text{不存在}$<br><br><b>对于 $90^\\circ$:</b><br>$\\sin=1, \\cos=0, \\tan=\\text{不存在}$<br>$\\cot=0, \\sec=\\text{不存在}, \\csc=1$"
            },
            {
                title: "🪓 坐标轴关键点：180° 和 270°",
                q: "当 $\\theta = 180^\\circ (\\pi)$ 和 $270^\\circ (\\frac{3\\pi}{2})$ 时的所有值",
                tip: "<b>符号变化：</b>在 $x$ 轴负半轴和 $y$ 轴负半轴，$\\sin$ 和 $\\cos$ 会出现负数（$-1$）。",
                a: "<b>对于 $180^\\circ$:</b><br>$\\sin=0, \\cos=-1, \\tan=0$<br>$\\cot=\\text{不存在}, \\sec=-1, \\csc=\\text{不存在}$<br><br><b>对于 $270^\\circ$:</b><br>$\\sin=-1, \\cos=0, \\tan=\\text{不存在}$<br>$\\cot=0, \\sec=\\text{不存在}, \\csc=-1$"
            }
        ]
    };
