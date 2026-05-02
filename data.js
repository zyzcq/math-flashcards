// data.js
// 统一定义所有知识模块和闪卡数据

const appData = {
    // === 模块 1：导数公式 ===
    derivatives: {
        id: "derivatives",
        title: "基本求导公式",
        subtitle: "微积分基础强化",
        themeColor: "sky", 
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
                a: "$$\\left[\\ln(x+\\sqrt{x^2+1})\\right]' = \\frac{1}{\\sqrt{x^2+1}}$$<br><br>$$\\left[\\ln(x+\\sqrt{x^2-1})\\right]' = \\frac{1}{\\sqrt{x^2-1}}$$"
            }
        ]
    },

    // === 模块 2：等价无穷小 ===
    equivalent: {
        id: "equivalent",
        title: "等价无穷小记忆卡",
        subtitle: "x → 0 数二专用",
        themeColor: "sky", 
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
        themeColor: "violet", 
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
    },
    
    // === 模块 4：三角函数特殊值 ===
    trig_special: {
        id: "trig_special",
        title: "三角函数特殊值",
        subtitle: "核心角度与坐标轴数据速记",
        themeColor: "sky",
        cards: [
            {
                title: "🌊 基础组：正弦与余弦",
                q: "$$\\sin\\theta \\quad \\text{与} \\quad \\cos\\theta$$<br><span class='text-sm font-normal text-slate-500'>($30^\\circ, 45^\\circ, 60^\\circ$ &nbsp;|&nbsp; $\\frac{\\pi}{6}, \\frac{\\pi}{4}, \\frac{\\pi}{3}$)</span>",
                tip: "<b>规律记忆：</b><br><ul><li>分母恒为 $2$。</li><li>$\\sin$ 分子递增：$\\sqrt{1}, \\sqrt{2}, \\sqrt{3}$（即 $1, \\sqrt{2}, \\sqrt{3}$）。</li><li>$\\cos$ 分子递减：$\\sqrt{3}, \\sqrt{2}, \\sqrt{1}$（即 $\\sqrt{3}, \\sqrt{2}, 1$）。</li></ul>",
                a: "<b>$\\sin\\theta$:</b> $$\\frac{1}{2}, \\quad \\frac{\\sqrt{2}}{2}, \\quad \\frac{\\sqrt{3}}{2}$$<hr class='my-2 border-slate-200'><b>$\\cos\\theta$:</b> $$\\frac{\\sqrt{3}}{2}, \\quad \\frac{\\sqrt{2}}{2}, \\quad \\frac{1}{2}$$"
            },
            {
                title: "📈 进阶组：正切与余切",
                q: "$$\\tan\\theta \\quad \\text{与} \\quad \\cot\\theta$$<br><span class='text-sm font-normal text-slate-500'>($30^\\circ, 45^\\circ, 60^\\circ$ &nbsp;|&nbsp; $\\frac{\\pi}{6}, \\frac{\\pi}{4}, \\frac{\\pi}{3}$)</span>",
                tip: "<b>原理与联系：</b><br><ul><li>$\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}$，且 $\\tan$ 在第一象限是<b>递增</b>的。</li><li>$45^\\circ$ 是分水岭，两者皆为 $1$。</li><li>$30^\\circ$ 与 $60^\\circ$ 的值互为倒数：$\\frac{\\sqrt{3}}{3}$ 和 $\\sqrt{3}$。</li></ul>",
                a: "<b>$\\tan\\theta$:</b> $$\\frac{\\sqrt{3}}{3}, \\quad 1, \\quad \\sqrt{3}$$<hr class='my-2 border-slate-200'><b>$\\cot\\theta$:</b> $$\\sqrt{3}, \\quad 1, \\quad \\frac{\\sqrt{3}}{3}$$"
            },
            {
                title: "🛡️ 倒数组：正割与余割",
                q: "$$\\sec\\theta \\quad \\text{与} \\quad \\csc\\theta$$<br><span class='text-sm font-normal text-slate-500'>($30^\\circ, 45^\\circ, 60^\\circ$ &nbsp;|&nbsp; $\\frac{\\pi}{6}, \\frac{\\pi}{4}, \\frac{\\pi}{3}$)</span>",
                tip: "<b>定义推导：</b><br><ul><li>$\\sec\\theta = \\frac{1}{\\cos\\theta}$，$\\csc\\theta = \\frac{1}{\\sin\\theta}$。</li><li>记忆技巧：首字母不匹配原则（$S$配$C$，$C$配$S$）。</li><li>计算提示：$\\frac{2}{\\sqrt{3}}$ 分母有理化后即为 $\\frac{2\\sqrt{3}}{3}$。</li></ul>",
                a: "<b>$\\sec\\theta$:</b> $$\\frac{2\\sqrt{3}}{3}, \\quad \\sqrt{2}, \\quad 2$$<hr class='my-2 border-slate-200'><b>$\\csc\\theta$:</b> $$2, \\quad \\sqrt{2}, \\quad \\frac{2\\sqrt{3}}{3}$$"
            },
            {
                title: "🪓 坐标轴关键点：0° 与 90°",
                q: "$$\\theta = 0^\\circ (0) \\quad \\text{与} \\quad 90^\\circ \\left(\\frac{\\pi}{2}\\right)$$",
                tip: "<b>单位圆坐标法：</b> 设圆上坐标 $(x, y) = (\\cos\\theta, \\sin\\theta)$。<br><ul><li>$0^\\circ$ 对应最右侧坐标 $(1, 0)$。</li><li>$90^\\circ$ 对应最上方坐标 $(0, 1)$。</li><li><b>注意：</b>任何分母为 $0$ 的情况（如 $\\frac{y}{x}$ 且 $x=0$）皆为<b>不存在</b>。</li></ul>",
                a: "<b>对于 $0^\\circ (0)$:</b><br>$\\sin=0, \\quad \\cos=1, \\quad \\tan=0$<br>$\\cot=\\text{不存在}, \\quad \\sec=1, \\quad \\csc=\\text{不存在}$<hr class='my-2 border-slate-200'><b>对于 $90^\\circ (\\frac{\\pi}{2})$:</b><br>$\\sin=1, \\quad \\cos=0, \\quad \\tan=\\text{不存在}$<br>$\\cot=0, \\quad \\sec=\\text{不存在}, \\quad \\csc=1$"
            },
            {
                title: "🪓 坐标轴关键点：180° 与 270°",
                q: "$$\\theta = 180^\\circ (\\pi) \\quad \\text{与} \\quad 270^\\circ \\left(\\frac{3\\pi}{2}\\right)$$",
                tip: "<b>单位圆坐标法：</b> 坐标 $(x, y) = (\\cos\\theta, \\sin\\theta)$。<br><ul><li>$180^\\circ$ 对应最左侧坐标 $(-1, 0)$。</li><li>$270^\\circ$ 对应最下方坐标 $(0, -1)$。</li><li>与前一组相比，只是在非零值上增加了<b>负号</b>。</li></ul>",
                a: "<b>对于 $180^\\circ (\\pi)$:</b><br>$\\sin=0, \\quad \\cos=-1, \\quad \\tan=0$<br>$\\cot=\\text{不存在}, \\quad \\sec=-1, \\quad \\csc=\\text{不存在}$<hr class='my-2 border-slate-200'><b>对于 $270^\\circ (\\frac{3\\pi}{2})$:</b><br>$\\sin=-1, \\quad \\cos=0, \\quad \\tan=\\text{不存在}$<br>$\\cot=0, \\quad \\sec=\\text{不存在}, \\quad \\csc=-1$"
            }
        ]
    },
    // === 模块 5：高阶导数 ===
    high_order_derivatives: {
        id: "high_order_derivatives",
        title: "常用高阶导数",
        subtitle: "n为正整数 · 核心推导与记忆",
        themeColor: "rose", 
        cards: [
            {
                title: "🚀 复合指数高阶",
                q: "$$(e^{ax+b})^{(n)}$$",
                tip: "<b>核心规律：</b><ul><li>每次根据复合函数链式法则求导，都会多出一个系数 <span class='highlight'>$a$</span>。</li><li>指数部分 $e^{ax+b}$ 永远抄一遍自己，保持不变。</li></ul>",
                a: "$$(e^{ax+b})^{(n)} = a^n e^{ax+b}$$"
            },
            {
                title: "🌊 复合正弦高阶",
                q: "$$[\\sin(ax+b)]^{(n)}$$",
                tip: "<b>相位递增法：</b><ul><li>每次求 $(ax+b)'=a$，就提取出一个 $a$，求 $n$ 次就有 <span class='highlight'>$a^n$</span>。</li><li>每求一次导，相当于把原函数的相位增加 <span class='highlight'>$\\frac{\\pi}{2}$</span>。</li></ul>",
                a: "$$[\\sin(ax+b)]^{(n)} = a^n \\sin\\left(ax+b + \\frac{n\\pi}{2}\\right)$$"
            },
            {
                title: "🌊 复合余弦高阶",
                q: "$$[\\cos(ax+b)]^{(n)}$$",
                tip: "<b>与正弦完全同理：</b><ul><li>每次求导产生一个 $a$，累积为 $a^n$。</li><li>同样是在括号里加上 <span class='highlight'>$\\frac{n\\pi}{2}$</span>，不需要死记正负号转换！</li></ul>",
                a: "$$[\\cos(ax+b)]^{(n)} = a^n \\cos\\left(ax+b + \\frac{n\\pi}{2}\\right)$$"
            },
            {
                title: "📉 复合对数高阶",
                q: "$$[\\ln(ax+b)]^{(n)}$$",
                tip: "<b>注意三要素（极易错）：</b><ul><li><b>符号：</b>从一阶开始是正负交替，注意指数是 <span class='highlight'>$n-1$</span>。</li><li><b>阶乘：</b>分子是 <span class='highlight'>$(n-1)!$</span>，不是 $n!$。</li><li>分母的次数正好是求导的阶数 $n$。</li></ul>",
                a: "$$[\\ln(ax+b)]^{(n)} = (-1)^{n-1} a^n \\frac{(n-1)!}{(ax+b)^n}$$"
            },
            {
                title: "➗ 倒数函数高阶",
                q: "$$\\left(\\frac{1}{ax+b}\\right)^{(n)}$$",
                tip: "<b>推导与神仙联系：</b><ul><li><b>推导：</b>每次求导，指数 $-1, -2 \\dots -n$ 拿下来相乘，形成 $(-1)^n n!$。</li><li><b>降维打击：</b>这个式子其实也可以理解为对数求导的高一阶形式：<span class='highlight'>$\\frac{1}{a}[\\ln(ax+b)]^{(n+1)}$</span>。</li></ul>",
                a: "$$\\left(\\frac{1}{ax+b}\\right)^{(n)} = (-1)^n a^n \\frac{n!}{(ax+b)^{n+1}}$$"
            }
        ]
    },
    // === 模块 6：罗尔定理辅助函数 ===
    rolle_auxiliary: {
        id: "rolle_auxiliary",
        title: "罗尔定理辅助函数",
        subtitle: "微分中值定理核心构造法",
        themeColor: "emerald", 
        cards: [
            {
                title: "🔄 乘积法则逆用 I",
                q: "$$f(x)f'(x)$$",
                tip: "<b>逆运算思维：</b><ul><li>见到原函数与一阶导数直接相乘，立刻联想平方项的求导。</li><li>源自：$$[f^2(x)]' = 2f(x)f'(x)$$</li></ul>",
                a: "令 $$F(x) = f^2(x)$$"
            },
            {
                title: "🔄 乘积法则逆用 II",
                q: "$$[f'(x)]^2 + f(x)f''(x)$$",
                tip: "<b>结构特征：</b>一阶导数的平方 加上 原函数乘二阶导数。<ul><li>这是标准乘积求导公式 $$(uv)' = u'v + uv'$$ 的直接逆用。</li><li>源自：$$[f(x)f'(x)]' = [f'(x)]^2 + f(x)f''(x)$$</li></ul>",
                a: "令 $$F(x) = f(x)f'(x)$$"
            },
            {
                title: "🚀 神奇的指数因子 (必考)",
                q: "$$f'(x) + f(x)$$ <br><br> $$f'(x) - f(x)$$ <br><br> $$f'(x) + kf(x)$$",
                tip: "<b>手写小结：见到 $$f' \\pm f$$ 必配指数函数！</b><ul><li>加号配正指数 $$e^x$$，减号配负指数 $$e^{-x}$$。</li><li>源自通式：$$[f(x)e^{\\varphi(x)}]' = [f'(x) + f(x)\\varphi'(x)]e^{\\varphi(x)}$$</li></ul>",
                a: "令 $$F(x) = f(x)e^x$$ <hr class='my-2 border-slate-200'> 令 $$F(x) = f(x)e^{-x}$$ <hr class='my-2 border-slate-200'> 令 $$F(x) = f(x)e^{kx}$$"
            },
            {
                title: "➗ 商的法则逆用 I",
                q: "见到 $$f'(x)x - f(x)$$ <br><span class='text-sm font-normal text-slate-500'>$$(x \\neq 0)$$</span>",
                tip: "<b>特征：</b>一阶导数乘 $$x$$，再减去原函数。<ul><li>看到中间的<b>减号</b>和乘数 $$x$$，就应该想到分母是 $$x$$ 的商的求导。</li><li>源自：$$\\left[\\frac{f(x)}{x}\\right]' = \\frac{f'(x)x - f(x)}{x^2}$$</li></ul>",
                a: "令 $$F(x) = \\frac{f(x)}{x}$$"
            },
            {
                title: "➗ 商的法则逆用 II",
                q: "见到 $$f''(x)f(x) - [f'(x)]^2$$",
                tip: "<b>高阶特征：</b>二阶导乘原函数 减去 一阶导的平方。<ul><li>这是 $$\\left[\\frac{f'(x)}{f(x)}\\right]'$$ 的分子部分。</li><li><b>高阶技巧：</b>当 $$f(x) > 0$$ 时，因为 $$[\\ln f(x)]' = \\frac{f'(x)}{f(x)}$$，对其再求导也会产生同样的分子！</li></ul>",
                a: "当 $$f(x) \\neq 0$$ 时，<br>令 $$F(x) = \\frac{f'(x)}{f(x)}$$ <hr class='my-2 border-slate-200'> 当 $$f(x) > 0$$ 时，<br>亦可令 $$F(x) = \\ln f(x)$$"
            }
        ]
    },
    
    // ==========================================
    // ============ 新增独立页面模块 ============
    // ==========================================

    // === 模块 7：英语语法 ===
    english_grammar: {
        id: "english_grammar",
        title: "英语语法：简单句",
        subtitle: "考研英语句句真研",
        themeColor: "indigo",
        type: "article",
        url: "english/简单句.html",
        cards: []
    },

    // === 模块 8：C语言 - for循环 ===
    c_for_loop: {
        id: "c_for_loop",
        title: "C语言：for循环",
        subtitle: "for/while及循环算法",
        themeColor: "emerald",
        type: "article",
        url: "c/for循环.html",
        cards: []
    },

    c_branching: {
        id: "c_branching",
        title: "顺序与分支结构",
        subtitle: "if/else/switch语句",
        themeColor: "emerald",
        type: "article",
        url: "c/1_顺序_分支结构.html",
        cards: []
    },

    c_loop: {
        id: "c_loop",
        title: "C语言：循环基础",
        subtitle: "while/do-while基础",
        themeColor: "emerald",
        type: "article",
        url: "c/循环.html",
        cards: []
    },

    c_loop_advanced: {
        id: "c_loop_advanced",
        title: "C语言：循环高级",
        subtitle: "嵌套循环与算法优化",
        themeColor: "emerald",
        type: "article",
        url: "c/循环高级.html",
        cards: []
    },

    c_syntax_core1: {
        id: "c_syntax_core1",
        title: "C语言：核心语法（上）",
        subtitle: "变量/数据类型/输入输出",
        themeColor: "emerald",
        type: "article",
        url: "c/核心语法1.html",
        cards: []
    },

    c_syntax_core2: {
        id: "c_syntax_core2",
        title: "C语言：核心语法（下）",
        subtitle: "数组/函数/指针基础",
        themeColor: "emerald",
        type: "article",
        url: "c/核心语法2.html",
        cards: []
    },

    c_syntax_basics1: {
        id: "c_syntax_basics1",
        title: "C语言：语法基础上",
        subtitle: "程序基本结构",
        themeColor: "emerald",
        type: "article",
        url: "c/语法基础上.html",
        cards: []
    },

    c_syntax_basics2: {
        id: "c_syntax_basics2",
        title: "C语言：语法基础下",
        subtitle: "控制流与函数",
        themeColor: "emerald",
        type: "article",
        url: "c/语法基础下.html",
        cards: []
    },

    c_operator1: {
        id: "c_operator1",
        title: "C语言：运算符（一）",
        subtitle: "算术与赋值运算符",
        themeColor: "emerald",
        type: "article",
        url: "c/运算符1.html",
        cards: []
    },

    c_operator2: {
        id: "c_operator2",
        title: "C语言：运算符（二）",
        subtitle: "关系与逻辑运算符",
        themeColor: "emerald",
        type: "article",
        url: "c/运算符2.html",
        cards: []
    },

    c_operator3: {
        id: "c_operator3",
        title: "C语言：运算符（三）",
        subtitle: "位运算与条件运算符",
        themeColor: "emerald",
        type: "article",
        url: "c/运算符3.html",
        cards: []
    }
};

// ====================================================
// 首页分类展示数据（index.html 使用 siteData 渲染）
// ====================================================
const siteData = [
    {
        categoryTitle: "📐 考研数学",
        categoryId: "math",
        categoryBorder: "border-sky-500",
        items: [
            appData.derivatives,
            appData.equivalent,
            appData.taylor,
            appData.trig_special,
            appData.high_order_derivatives,
            appData.rolle_auxiliary
        ]
    },
    {
        categoryTitle: "💻 C语言程序设计",
        categoryId: "c-language",
        categoryBorder: "border-emerald-500",
        items: [
            appData.c_syntax_basics1,
            appData.c_syntax_basics2,
            appData.c_syntax_core1,
            appData.c_syntax_core2,
            appData.c_operator1,
            appData.c_operator2,
            appData.c_operator3,
            appData.c_branching,
            appData.c_loop,
            appData.c_for_loop,
            appData.c_loop_advanced
        ]
    },
    {
        categoryTitle: "📝 考研英语",
        categoryId: "english",
        categoryBorder: "border-indigo-500",
        items: [
            appData.english_grammar
        ]
    }
];