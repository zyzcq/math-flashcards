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

    // === 模块 7：常用不定积分公式 ===
    integral_formulas: {
        id: "integral_formulas",
        title: "常用不定积分公式",
        subtitle: "考研高频基础积分公式，先背这些，积分题就不至于当场沉默",
        themeColor: "violet",
        cards: [
            {
                title: "① 幂函数积分",
                q: "$$\\int x^k\\,dx$$",
                tip: "<b>记忆：</b>指数加一，除以新指数。<ul><li>前提是 $k\\neq -1$。</li><li>当 $k=-1$ 时不能套这个公式，要用 $\\ln|x|$。</li></ul>",
                a: "$$\\int x^k\\,dx=\\frac{x^{k+1}}{k+1}+C\\quad(k\\neq -1)$$"
            },
            {
                title: "① 幂函数特殊值",
                q: "$$\\int \\frac{1}{x^2}\\,dx\\quad\\text{和}\\quad\\int \\frac{1}{\\sqrt{x}}\\,dx$$",
                tip: "<b>都可看成幂函数：</b><ul><li>$\\frac{1}{x^2}=x^{-2}$。</li><li>$\\frac{1}{\\sqrt{x}}=x^{-\\frac12}$。</li></ul>",
                a: "$$\\int \\frac{1}{x^2}\\,dx=-\\frac{1}{x}+C$$<br>$$\\int \\frac{1}{\\sqrt{x}}\\,dx=2\\sqrt{x}+C$$"
            },
            {
                title: "② 倒数积分",
                q: "$$\\int \\frac{1}{x}\\,dx$$",
                tip: "<b>唯一例外：</b>$x^{-1}$ 不能用幂函数积分公式。<ul><li>对应导数：$(\\ln|x|)'=\\frac1x$。</li></ul>",
                a: "$$\\int \\frac{1}{x}\\,dx=\\ln|x|+C$$"
            },
            {
                title: "③ 指数函数积分",
                q: "$$\\int e^x\\,dx\\quad\\text{和}\\quad\\int a^x\\,dx$$",
                tip: "<b>指数函数积分先抄自己：</b><ul><li>$e^x$ 最简单，积分后还是自己。</li><li>$a^x$ 要除以 $\\ln a$。</li></ul>",
                a: "$$\\int e^x\\,dx=e^x+C$$<br>$$\\int a^x\\,dx=\\frac{a^x}{\\ln a}+C\\quad(a>0,\\ a\\neq1)$$"
            },
            {
                title: "④ 正弦余弦积分",
                q: "$$\\int \\sin x\\,dx\\quad\\text{和}\\quad\\int \\cos x\\,dx$$",
                tip: "<b>反向看导数：</b><ul><li>$(-\\cos x)'=\\sin x$。</li><li>$(\\sin x)'=\\cos x$。</li></ul>",
                a: "$$\\int \\sin x\\,dx=-\\cos x+C$$<br>$$\\int \\cos x\\,dx=\\sin x+C$$"
            },
            {
                title: "④ 正切余切积分",
                q: "$$\\int \\tan x\\,dx\\quad\\text{和}\\quad\\int \\cot x\\,dx$$",
                tip: "<b>记对数：</b><ul><li>$\\tan x=\\frac{\\sin x}{\\cos x}$，凑 $\\cos x$ 的导数。</li><li>$\\cot x=\\frac{\\cos x}{\\sin x}$，凑 $\\sin x$ 的导数。</li></ul>",
                a: "$$\\int \\tan x\\,dx=-\\ln|\\cos x|+C$$<br>$$\\int \\cot x\\,dx=\\ln|\\sin x|+C$$"
            },
            {
                title: "④ 正割余割积分",
                q: "$$\\int \\sec x\\,dx\\quad\\text{和}\\quad\\int \\csc x\\,dx$$",
                tip: "<b>常考但容易忘：</b><ul><li>$\\sec x=\\frac1{\\cos x}$。</li><li>$\\csc x=\\frac1{\\sin x}$。</li></ul>",
                a: "$$\\int \\frac{dx}{\\cos x}=\\int \\sec x\\,dx=\\ln|\\sec x+\\tan x|+C$$<br>$$\\int \\frac{dx}{\\sin x}=\\int \\csc x\\,dx=\\ln|\\csc x-\\cot x|+C$$"
            },
            {
                title: "④ 平方割函数积分",
                q: "$$\\int \\sec^2 x\\,dx\\quad\\text{和}\\quad\\int \\csc^2 x\\,dx$$",
                tip: "<b>直接对应导数：</b><ul><li>$(\\tan x)'=\\sec^2 x$。</li><li>$(\\cot x)'=-\\csc^2 x$。</li></ul>",
                a: "$$\\int \\sec^2 x\\,dx=\\tan x+C$$<br>$$\\int \\csc^2 x\\,dx=-\\cot x+C$$"
            },
            {
                title: "④ 割乘切积分",
                q: "$$\\int \\sec x\\tan x\\,dx\\quad\\text{和}\\quad\\int \\csc x\\cot x\\,dx$$",
                tip: "<b>还是反看导数：</b><ul><li>$(\\sec x)'=\\sec x\\tan x$。</li><li>$(\\csc x)'=-\\csc x\\cot x$。</li></ul>",
                a: "$$\\int \\sec x\\tan x\\,dx=\\sec x+C$$<br>$$\\int \\csc x\\cot x\\,dx=-\\csc x+C$$"
            },
            {
                title: "⑤ 反正切型积分",
                q: "$$\\int \\frac{1}{1+x^2}\\,dx\\quad\\text{和}\\quad\\int \\frac{1}{a^2+x^2}\\,dx$$",
                tip: "<b>看到平方和：</b>优先联想 $\\arctan$。<ul><li>第二个式子把 $x/a$ 看成整体。</li></ul>",
                a: "$$\\int \\frac{1}{1+x^2}\\,dx=\\arctan x+C$$<br>$$\\int \\frac{1}{a^2+x^2}\\,dx=\\frac1a\\arctan\\frac{x}{a}+C\\quad(a>0)$$"
            },
            {
                title: "⑥ 反正弦型积分",
                q: "$$\\int \\frac{1}{\\sqrt{1-x^2}}\\,dx\\quad\\text{和}\\quad\\int \\frac{1}{\\sqrt{a^2-x^2}}\\,dx$$",
                tip: "<b>看到 $1-x^2$ 或 $a^2-x^2$ 的根号：</b>优先联想 $\\arcsin$。",
                a: "$$\\int \\frac{1}{\\sqrt{1-x^2}}\\,dx=\\arcsin x+C$$<br>$$\\int \\frac{1}{\\sqrt{a^2-x^2}}\\,dx=\\arcsin\\frac{x}{a}+C\\quad(a>0)$$"
            },
            {
                title: "⑦ 根式对数型积分",
                q: "$$\\int \\frac{1}{\\sqrt{x^2+a^2}}\\,dx\\quad\\text{和}\\quad\\int \\frac{1}{\\sqrt{x^2-a^2}}\\,dx$$",
                tip: "<b>两个根式对数：</b><ul><li>$x^2+a^2$ 常见特例是 $a=1$。</li><li>$x^2-a^2$ 要注意定义域 $|x|>|a|$。</li></ul>",
                a: "$$\\int \\frac{1}{\\sqrt{x^2+a^2}}\\,dx=\\ln\\left(x+\\sqrt{x^2+a^2}\\right)+C$$<br>$$\\int \\frac{1}{\\sqrt{x^2-a^2}}\\,dx=\\ln\\left|x+\\sqrt{x^2-a^2}\\right|+C\\quad(|x|>|a|)$$"
            },
            {
                title: "⑧ 平方差分母积分",
                q: "$$\\int \\frac{1}{x^2-a^2}\\,dx\\quad\\text{和}\\quad\\int \\frac{1}{a^2-x^2}\\,dx$$",
                tip: "<b>符号互换要小心：</b><ul><li>分母是 $x^2-a^2$，对数里是 $\\frac{x-a}{x+a}$。</li><li>分母是 $a^2-x^2$，对数里倒过来。</li></ul>",
                a: "$$\\int \\frac{1}{x^2-a^2}\\,dx=\\frac{1}{2a}\\ln\\left|\\frac{x-a}{x+a}\\right|+C$$<br>$$\\int \\frac{1}{a^2-x^2}\\,dx=\\frac{1}{2a}\\ln\\left|\\frac{x+a}{x-a}\\right|+C\\quad(a>0)$$"
            },
            {
                title: "⑨ 半圆根式积分",
                q: "$$\\int \\sqrt{a^2-x^2}\\,dx$$",
                tip: "<b>半圆面积型：</b><ul><li>结果由 $\\arcsin\\frac{x}{a}$ 项和 $x\\sqrt{a^2-x^2}$ 项组成。</li><li>常见于三角代换。</li></ul>",
                a: "$$\\int \\sqrt{a^2-x^2}\\,dx=\\frac{a^2}{2}\\arcsin\\frac{x}{a}+\\frac{x}{2}\\sqrt{a^2-x^2}+C\\quad(a>0,\\ |x|\\le a)$$"
            },
            {
                title: "⑩ 正弦平方与余弦平方",
                q: "$$\\int \\sin^2 x\\,dx\\quad\\text{和}\\quad\\int \\cos^2 x\\,dx$$",
                tip: "<b>降幂公式：</b><ul><li>$\\sin^2x=\\frac{1-\\cos2x}{2}$。</li><li>$\\cos^2x=\\frac{1+\\cos2x}{2}$。</li></ul>",
                a: "$$\\int \\sin^2x\\,dx=\\frac{x}{2}-\\frac{\\sin2x}{4}+C$$<br>$$\\int \\cos^2x\\,dx=\\frac{x}{2}+\\frac{\\sin2x}{4}+C$$"
            },
            {
                title: "⑩ 正切平方与余切平方",
                q: "$$\\int \\tan^2 x\\,dx\\quad\\text{和}\\quad\\int \\cot^2 x\\,dx$$",
                tip: "<b>先拆恒等式：</b><ul><li>$\\tan^2x=\\sec^2x-1$。</li><li>$\\cot^2x=\\csc^2x-1$。</li></ul>",
                a: "$$\\int \\tan^2x\\,dx=\\tan x-x+C$$<br>$$\\int \\cot^2x\\,dx=-\\cot x-x+C$$"
            }

        ]
    },

    // === 模块 8：凑微分公式 ===
    differential_substitution: {
        id: "differential_substitution",
        title: "凑微分公式",
        subtitle: "13条常用凑微分：把 dx 打包成 d(整体)，考研积分的换挡杆",
        themeColor: "rose",
        cards: [
            {
                title: "重点｜凑微分①：$x^2$ 型",
                q: "$$\\int x f(x^2)\\,dx$$",
                tip: "<b>关键微分：</b>$$x\\,dx=\\frac12 d(x^2)$$",
                a: "$$\\int x f(x^2)\\,dx=\\frac12\\int f(x^2)\\,d(x^2)=\\frac12\\int f(u)\\,du$$"
            },
            {
                title: "重点｜凑微分②：$x^{3/2}$ 型",
                q: "$$\\int \\sqrt{x}\\,f\\left(x^{\\frac32}\\right)\\,dx$$",
                tip: "<b>关键微分：</b>$$\\sqrt{x}\\,dx=\\frac23 d\\left(x^{\\frac32}\\right)$$",
                a: "$$\\int \\sqrt{x}\\,f\\left(x^{\\frac32}\\right)\\,dx=\\frac23\\int f\\left(x^{\\frac32}\\right)d\\left(x^{\\frac32}\\right)=\\frac23\\int f(u)\\,du$$"
            },
            {
                title: "重点｜凑微分③：$\\sqrt{x}$ 型",
                q: "$$\\int \\frac{f(\\sqrt{x})}{\\sqrt{x}}\\,dx$$",
                tip: "<b>关键微分：</b>$$\\frac{dx}{\\sqrt{x}}=2d(\\sqrt{x})$$",
                a: "$$\\int \\frac{f(\\sqrt{x})}{\\sqrt{x}}\\,dx=2\\int f(\\sqrt{x})d(\\sqrt{x})=2\\int f(u)\\,du$$"
            },
            {
                title: "重点｜凑微分④：$-1/x$ 型",
                q: "$$\\int \\frac{f\\left(-\\frac1x\\right)}{x^2}\\,dx$$",
                tip: "<b>关键微分：</b>$$\\frac{dx}{x^2}=d\\left(-\\frac1x\\right)$$",
                a: "$$\\int \\frac{f\\left(-\\frac1x\\right)}{x^2}\\,dx=\\int f\\left(-\\frac1x\\right)d\\left(-\\frac1x\\right)=\\int f(u)\\,du$$"
            },
            {
                title: "重点｜凑微分⑤：$\\ln x$ 型",
                q: "$$\\int \\frac{f(\\ln x)}{x}\\,dx$$",
                tip: "<b>关键微分：</b>当 $x>0$ 时，$$\\frac1x dx=d(\\ln x)$$",
                a: "$$\\int \\frac{f(\\ln x)}{x}\\,dx=\\int f(\\ln x)d(\\ln x)=\\int f(u)\\,du\\quad(x>0)$$"
            },
            {
                title: "重点｜凑微分⑥：$e^x$ 型",
                q: "$$\\int e^x f(e^x)\\,dx$$",
                tip: "<b>关键微分：</b>$$e^x dx=d(e^x)$$",
                a: "$$\\int e^x f(e^x)\\,dx=\\int f(e^x)d(e^x)=\\int f(u)\\,du$$"
            },
            {
                title: "重点｜凑微分⑦：$a^x$ 型",
                q: "$$\\int a^x f(a^x)\\,dx$$",
                tip: "<b>关键微分：</b>$$a^x dx=\\frac1{\\ln a}d(a^x)\\quad(a>0,\\ a\\neq1)$$",
                a: "$$\\int a^x f(a^x)\\,dx=\\frac1{\\ln a}\\int f(a^x)d(a^x)=\\frac1{\\ln a}\\int f(u)\\,du$$"
            },
            {
                title: "重点｜凑微分⑧：$-\\cos x$ 型",
                q: "$$\\int \\sin x\\,f(-\\cos x)\\,dx$$",
                tip: "<b>关键微分：</b>$$\\sin x\\,dx=d(-\\cos x)$$",
                a: "$$\\int \\sin x\\,f(-\\cos x)\\,dx=\\int f(-\\cos x)d(-\\cos x)=\\int f(u)\\,du$$"
            },
            {
                title: "重点｜凑微分⑨：$\\sin x$ 型",
                q: "$$\\int \\cos x\\,f(\\sin x)\\,dx$$",
                tip: "<b>关键微分：</b>$$\\cos x\\,dx=d(\\sin x)$$",
                a: "$$\\int \\cos x\\,f(\\sin x)\\,dx=\\int f(\\sin x)d(\\sin x)=\\int f(u)\\,du$$"
            },
            {
                title: "重点｜凑微分⑩：$\\tan x$ 型",
                q: "$$\\int \\frac{f(\\tan x)}{\\cos^2 x}\\,dx$$",
                tip: "<b>关键微分：</b>$$\\frac{dx}{\\cos^2x}=\\sec^2x\\,dx=d(\\tan x)$$",
                a: "$$\\int \\frac{f(\\tan x)}{\\cos^2x}\\,dx=\\int f(\\tan x)d(\\tan x)=\\int f(u)\\,du$$"
            },
            {
                title: "重点｜凑微分⑪：$-\\cot x$ 型",
                q: "$$\\int \\frac{f(-\\cot x)}{\\sin^2 x}\\,dx$$",
                tip: "<b>关键微分：</b>$$\\frac{dx}{\\sin^2x}=\\csc^2x\\,dx=d(-\\cot x)$$",
                a: "$$\\int \\frac{f(-\\cot x)}{\\sin^2x}\\,dx=\\int f(-\\cot x)d(-\\cot x)=\\int f(u)\\,du$$"
            },
            {
                title: "重点｜凑微分⑫：$\\arctan x$ 型",
                q: "$$\\int \\frac{f(\\arctan x)}{1+x^2}\\,dx$$",
                tip: "<b>关键微分：</b>$$\\frac{1}{1+x^2}dx=d(\\arctan x)$$",
                a: "$$\\int \\frac{f(\\arctan x)}{1+x^2}\\,dx=\\int f(\\arctan x)d(\\arctan x)=\\int f(u)\\,du$$"
            },
            {
                title: "重点｜凑微分⑬：$\\arcsin x$ 型",
                q: "$$\\int \\frac{f(\\arcsin x)}{\\sqrt{1-x^2}}\\,dx$$",
                tip: "<b>关键微分：</b>$$\\frac{1}{\\sqrt{1-x^2}}dx=d(\\arcsin x)$$",
                a: "$$\\int \\frac{f(\\arcsin x)}{\\sqrt{1-x^2}}\\,dx=\\int f(\\arcsin x)d(\\arcsin x)=\\int f(u)\\,du$$"
            },
            {
                title: "重点｜凑微分例题：$\\arcsin$ 三次",
                q: "$$\\int \\frac{(\\arcsin x)^2}{\\sqrt{1-x^2}}\\,dx$$",
                tip: "<b>对应凑微分⑬：</b>令 $u=\\arcsin x$，则 $du=\\frac{dx}{\\sqrt{1-x^2}}$。",
                a: "$$\\int \\frac{(\\arcsin x)^2}{\\sqrt{1-x^2}}\\,dx=\\int u^2\\,du=\\frac13u^3+C=\\frac13\\arcsin^3x+C$$"
            }
        ]
    },

    // === 模块 9：三角函数常用公式 ===
    trig_formula_suite: {
        id: "trig_formula_suite",
        title: "三角函数常用公式",
        subtitle: "诱导、倍角、半角、和差与积化和差，先把符号稳住",
        themeColor: "sky",
        cards: [
            {
                title: "重点｜诱导公式全表",
                q: "诱导公式里，$\\frac{\\pi}{2}\\pm\\alpha$、$\\pi\\pm\\alpha$、$\\frac{3\\pi}{2}\\pm\\alpha$、$2\\pi-\\alpha$ 怎么变？",
                tip: "<b>总口诀：</b><span class='highlight'>奇变偶不变，符号看象限</span>。<ul><li>角写成 $k\\frac{\\pi}{2}+\\alpha$：$k$ 为奇数，正弦余弦互换、正切余切互换；$k$ 为偶数，函数名不变。</li><li>最后只看原函数在该象限该不该带负号。别硬背到脑袋冒烟，先判象限。</li></ul>",
                a: String.raw`
                    <div class='table-scroll'>
                        <table class='formula-table'>
                            <thead>
                                <tr><th>函数</th><th>$\frac{\pi}{2}-\alpha$</th><th>$\frac{\pi}{2}+\alpha$</th><th>$\pi-\alpha$</th><th>$\pi+\alpha$</th><th>$\frac{3\pi}{2}-\alpha$</th><th>$\frac{3\pi}{2}+\alpha$</th><th>$2\pi-\alpha$</th></tr>
                            </thead>
                            <tbody>
                                <tr><th>$\sin\theta$</th><td>$\cos\alpha$</td><td>$\cos\alpha$</td><td>$\sin\alpha$</td><td>$-\sin\alpha$</td><td>$-\cos\alpha$</td><td>$-\cos\alpha$</td><td>$-\sin\alpha$</td></tr>
                                <tr><th>$\cos\theta$</th><td>$\sin\alpha$</td><td>$-\sin\alpha$</td><td>$-\cos\alpha$</td><td>$-\cos\alpha$</td><td>$-\sin\alpha$</td><td>$\sin\alpha$</td><td>$\cos\alpha$</td></tr>
                                <tr><th>$\tan\theta$</th><td>$\cot\alpha$</td><td>$-\cot\alpha$</td><td>$-\tan\alpha$</td><td>$\tan\alpha$</td><td>$\cot\alpha$</td><td>$-\cot\alpha$</td><td>$-\tan\alpha$</td></tr>
                                <tr><th>$\cot\theta$</th><td>$\tan\alpha$</td><td>$-\tan\alpha$</td><td>$-\cot\alpha$</td><td>$\cot\alpha$</td><td>$\tan\alpha$</td><td>$-\tan\alpha$</td><td>$-\cot\alpha$</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <p class='formula-note'>速记小钩子：$\sin(\frac{\pi}{2}\pm\alpha)=\cos\alpha$，$\cos(\frac{\pi}{2}\pm\alpha)$ 才会一正一负。</p>`
            },
            {
                title: "重点｜象限符号与倒数关系",
                q: "三角函数在四个象限的符号，以及 $\\sec\\alpha$、$\\csc\\alpha$ 怎么来？",
                tip: "<b>符号先行：</b>诱导公式、半角开方都靠它。符号错了，后面再努力也只是把错题写得很端正。",
                a: String.raw`
                    <div class='table-scroll'>
                        <table class='formula-table formula-table--compact'>
                            <thead><tr><th>函数</th><th>第一象限</th><th>第二象限</th><th>第三象限</th><th>第四象限</th></tr></thead>
                            <tbody>
                                <tr><th>$\sin\theta$</th><td>$+$</td><td>$+$</td><td>$-$</td><td>$-$</td></tr>
                                <tr><th>$\cos\theta$</th><td>$+$</td><td>$-$</td><td>$-$</td><td>$+$</td></tr>
                                <tr><th>$\tan\theta$</th><td>$+$</td><td>$-$</td><td>$+$</td><td>$-$</td></tr>
                                <tr><th>$\cot\theta$</th><td>$+$</td><td>$-$</td><td>$+$</td><td>$-$</td></tr>
                            </tbody>
                        </table>
                    </div>
                    $$\sec\alpha=\frac{1}{\cos\alpha},\qquad \csc\alpha=\frac{1}{\sin\alpha}$$`
            },
            {
                title: "重点｜二倍角公式",
                q: "二倍角公式有哪些？",
                tip: "<b>考研高频：</b>$\\cos2\\alpha$ 的三种写法都要会，因为它经常负责“降幂”和“变形救场”。",
                a: String.raw`
                    $$\sin2\alpha=2\sin\alpha\cos\alpha$$
                    $$\cos2\alpha=\cos^2\alpha-\sin^2\alpha=1-2\sin^2\alpha=2\cos^2\alpha-1$$
                    $$\tan2\alpha=\frac{2\tan\alpha}{1-\tan^2\alpha},\qquad
                    \cot2\alpha=\frac{\cot^2\alpha-1}{2\cot\alpha}$$`
            },
            {
                title: "三倍角公式",
                q: "三倍角公式怎么写？",
                tip: "<b>不用每天拿出来供着背，</b>但碰到三倍角、三次幂化简时，它会突然很有用。",
                a: String.raw`
                    $$\sin3\alpha=-4\sin^3\alpha+3\sin\alpha$$
                    $$\cos3\alpha=4\cos^3\alpha-3\cos\alpha$$`
            },
            {
                title: "重点｜半角与降幂公式",
                q: "半角公式、降幂公式有哪些？",
                tip: "<b>开方要看象限：</b>$\\pm$ 不是装饰品，$\\frac{\\alpha}{2}$ 落在哪个象限就取哪个符号。",
                a: String.raw`
                    $$\sin^2\frac{\alpha}{2}=\frac{1-\cos\alpha}{2},\qquad
                    \cos^2\frac{\alpha}{2}=\frac{1+\cos\alpha}{2}$$
                    $$\sin\frac{\alpha}{2}=\pm\sqrt{\frac{1-\cos\alpha}{2}},\qquad
                    \cos\frac{\alpha}{2}=\pm\sqrt{\frac{1+\cos\alpha}{2}}$$
                    $$\tan\frac{\alpha}{2}=\frac{1-\cos\alpha}{\sin\alpha}
                    =\frac{\sin\alpha}{1+\cos\alpha}
                    =\pm\sqrt{\frac{1-\cos\alpha}{1+\cos\alpha}}$$
                    $$\cot\frac{\alpha}{2}=\frac{\sin\alpha}{1-\cos\alpha}
                    =\frac{1+\cos\alpha}{\sin\alpha}
                    =\pm\sqrt{\frac{1+\cos\alpha}{1-\cos\alpha}}$$`
            },
            {
                title: "重点｜和差公式",
                q: "$\\sin(\\alpha\\pm\\beta)$、$\\cos(\\alpha\\pm\\beta)$、$\\tan(\\alpha\\pm\\beta)$、$\\cot(\\alpha\\pm\\beta)$ 怎么展开？",
                tip: "<b>最稳记法：</b>正弦“同号”，余弦“反号”。正切分母也反号，别让它偷偷换队。",
                a: String.raw`
                    $$\sin(\alpha\pm\beta)=\sin\alpha\cos\beta\pm\cos\alpha\sin\beta$$
                    $$\cos(\alpha\pm\beta)=\cos\alpha\cos\beta\mp\sin\alpha\sin\beta$$
                    $$\tan(\alpha\pm\beta)=\frac{\tan\alpha\pm\tan\beta}{1\mp\tan\alpha\tan\beta}$$
                    $$\cot(\alpha\pm\beta)=\frac{\cot\alpha\cot\beta\mp1}{\cot\beta\pm\cot\alpha}$$
                    <p class='formula-note'>常用特例：$\tan\left(\frac{\pi}{4}-\alpha\right)=\frac{1-\tan\alpha}{1+\tan\alpha}$。</p>`
            },
            {
                title: "重点｜积化和差",
                q: "积化和差公式怎么背？",
                tip: "<b>乘积拆成和差：</b>它常用于三角积分、三角级数和化简。看到两个三角函数相乘，先问问能不能拆。",
                a: String.raw`
                    $$\sin\alpha\cos\beta=\frac12[\sin(\alpha+\beta)+\sin(\alpha-\beta)]$$
                    $$\cos\alpha\sin\beta=\frac12[\sin(\alpha+\beta)-\sin(\alpha-\beta)]$$
                    $$\cos\alpha\cos\beta=\frac12[\cos(\alpha+\beta)+\cos(\alpha-\beta)]$$
                    $$\sin\alpha\sin\beta=\frac12[\cos(\alpha-\beta)-\cos(\alpha+\beta)]$$`
            },
            {
                title: "和差化积",
                q: "和差化积公式有哪些？",
                tip: "<b>和差化积像拉链：</b>把两个角拉成“平均角”和“半差角”。题目里出现 $\\alpha+\\beta$ 与 $\\alpha-\\beta$ 时尤其顺手。",
                a: String.raw`
                    $$\sin\alpha+\sin\beta=2\sin\frac{\alpha+\beta}{2}\cos\frac{\alpha-\beta}{2}$$
                    $$\sin\alpha-\sin\beta=2\sin\frac{\alpha-\beta}{2}\cos\frac{\alpha+\beta}{2}$$
                    $$\cos\alpha+\cos\beta=2\cos\frac{\alpha+\beta}{2}\cos\frac{\alpha-\beta}{2}$$
                    $$\cos\alpha-\cos\beta=-2\sin\frac{\alpha+\beta}{2}\sin\frac{\alpha-\beta}{2}$$`
            },
            {
                title: "万能公式",
                q: "万能代换 $u=\\tan\\frac{x}{2}$ 下，$\\sin x$、$\\cos x$ 怎么表示？",
                tip: "<b>万能不是万能药，</b>但在有理化三角式里很好使。它的核心是把三角函数变成关于 $u$ 的有理式。",
                a: String.raw`
                    $$u=\tan\frac{x}{2}\quad(-\pi<x<\pi)$$
                    $$\sin x=\frac{2u}{1+u^2},\qquad \cos x=\frac{1-u^2}{1+u^2}$$
                    <p class='formula-note'>顺手补一刀：$\tan x=\frac{2u}{1-u^2}$，积分换元时还有 $dx=\frac{2}{1+u^2}du$。</p>`
            }
        ]
    },

    // === 模块 10：代数基础公式 ===
    algebra_formula_suite: {
        id: "algebra_formula_suite",
        title: "代数基础公式",
        subtitle: "二次方程、因式分解、二项式与双阶乘，基础不塌，后面才敢飞",
        themeColor: "amber",
        cards: [
            {
                title: "重点｜一元二次方程与判别式",
                q: "一元二次方程、判别式和求根公式是什么？",
                tip: "<b>考研基础件：</b>二次方程经常藏在极限、积分、特征值、配方里。看到 $ax^2+bx+c$，先把判别式请出来坐镇。",
                a: String.raw`
                    $$ax^2+bx+c=0\quad(a\ne0)$$
                    $$\Delta=b^2-4ac$$
                    $$\Delta\ge0:\quad x_{1,2}=\frac{-b\pm\sqrt{b^2-4ac}}{2a}$$
                    $$\Delta<0:\quad x_{1,2}=\frac{-b\pm\sqrt{4ac-b^2}\,i}{2a}$$`
            },
            {
                title: "重点｜韦达定理",
                q: "一元二次方程根与系数的关系是什么？",
                tip: "<b>不求根也能做题：</b>根的和、根的积就是韦达定理的两只手，很多参数题靠它直接抓答案。",
                a: String.raw`
                    若 $x_1,x_2$ 是 $ax^2+bx+c=0\ (a\ne0)$ 的两个根，则
                    $$x_1+x_2=-\frac{b}{a},\qquad x_1x_2=\frac{c}{a}$$`
            },
            {
                title: "重点｜平方与立方公式",
                q: "常用平方、立方展开公式有哪些？",
                tip: "<b>别小看展开：</b>配方、因式分解、极限化简都靠这些基础公式打地基。",
                a: String.raw`
                    $$(a+b)^2=a^2+2ab+b^2,\qquad (a-b)^2=a^2-2ab+b^2$$
                    $$(a+b)^3=a^3+3a^2b+3ab^2+b^3$$
                    $$(a-b)^3=a^3-3a^2b+3ab^2-b^3$$`
            },
            {
                title: "重点｜平方差与立方和差",
                q: "平方差、立方差、立方和怎么分解？",
                tip: "<b>符号是灵魂：</b>立方差里面全是加号，立方和中间那个 $ab$ 是负号。",
                a: String.raw`
                    $$a^2-b^2=(a+b)(a-b)$$
                    $$a^3-b^3=(a-b)(a^2+ab+b^2)$$
                    $$a^3+b^3=(a+b)(a^2-ab+b^2)$$`
            },
            {
                title: "$n$ 次方和差公式",
                q: "$a^n-b^n$ 与 $a^n+b^n$ 怎么分解？",
                tip: "<b>一串楼梯：</b>指数从 $a^{n-1}$ 一路走到 $b^{n-1}$。$a^n+b^n$ 只在 $n$ 为正奇数时能这样拆。",
                a: String.raw`
                    $$a^n-b^n=(a-b)(a^{n-1}+a^{n-2}b+\cdots+ab^{n-2}+b^{n-1})\quad(n\text{ 是正整数})$$
                    $$a^n+b^n=(a+b)(a^{n-1}-a^{n-2}b+\cdots-ab^{n-2}+b^{n-1})\quad(n\text{ 为正奇数})$$`
            },
            {
                title: "重点｜二项式定理",
                q: "二项式定理怎么展开？",
                tip: "<b>系数别硬猜：</b>第 $k$ 项的系数来自组合数，指数一个降、一个升，像交接班。",
                a: String.raw`
                    $$(a+b)^n=\sum_{k=0}^{n}C_n^k a^{n-k}b^k$$
                    $$=a^n+na^{n-1}b+\frac{n(n-1)}{2!}a^{n-2}b^2+\cdots+\frac{n(n-1)\cdots(n-k+1)}{k!}a^{n-k}b^k+\cdots+nab^{n-1}+b^n$$`
            },
            {
                title: "重点｜阶乘与双阶乘",
                q: "阶乘和双阶乘公式是什么？",
                tip: "<b>双阶乘就是隔一个乘一个：</b>偶数只乘偶数，奇数只乘奇数。别把它和普通阶乘搅成一锅粥。",
                a: String.raw`
                    $$n!=1\cdot2\cdot3\cdots n,\qquad 0!=1$$
                    $$(2n)!!=2\cdot4\cdot6\cdots(2n)=2^n\cdot n!$$
                    $$(2n-1)!!=1\cdot3\cdot5\cdots(2n-1)$$`
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
    },

    c_array1: {
        id: "c_array1",
        title: "C语言：数组与算法（上）",
        subtitle: "一维数组与遍历",
        themeColor: "emerald",
        type: "article",
        url: "c/数组1.html",
        cards: []
    },

    c_array2: {
        id: "c_array2",
        title: "C语言：数组与算法（下）",
        subtitle: "二维数组与排序算法",
        themeColor: "emerald",
        type: "article",
        url: "c/数组2.html",
        cards: []
    },

    c_func1: {
        id: "c_func1",
        title: "C语言：函数（上）",
        subtitle: "函数定义与调用",
        themeColor: "emerald",
        type: "article",
        url: "c/函数1.html",
        cards: []
    },

    c_func2: {
        id: "c_func2",
        title: "C语言：函数（下）",
        subtitle: "递归与常见函数",
        themeColor: "emerald",
        type: "article",
        url: "c/函数2.html",
        cards: []
    },

    c_pointer1: {
        id: "c_pointer1",
        title: "C语言：指针（上）",
        subtitle: "指针基础与地址运算",
        themeColor: "emerald",
        type: "article",
        url: "c/指针1.html",
        cards: []
    },

    c_pointer_adv1: {
        id: "c_pointer_adv1",
        title: "C语言：指针进阶（上）",
        subtitle: "指针与数组/函数",
        themeColor: "emerald",
        type: "article",
        url: "c/指针高级1.html",
        cards: []
    },

    c_pointer_adv2: {
        id: "c_pointer_adv2",
        title: "C语言：指针进阶（下）",
        subtitle: "多级指针与动态内存",
        themeColor: "emerald",
        type: "article",
        url: "c/指针高级2.html",
        cards: []
    },

    c_string: {
        id: "c_string",
        title: "C语言：字符串",
        subtitle: "字符串处理与常用函数",
        themeColor: "emerald",
        type: "article",
        url: "c/字符串.html",
        cards: []
    },

    c_struct: {
        id: "c_struct",
        title: "C语言：结构体",
        subtitle: "struct定义与应用",
        themeColor: "emerald",
        type: "article",
        url: "c/结构体.html",
        cards: []
    },

    english_grammar_ext: {
        id: "english_grammar_ext",
        title: "英语语法：简单句的扩展",
        subtitle: "定语从句与修饰结构",
        themeColor: "indigo",
        type: "article",
        url: "english/简单句的拓展.html",
        cards: []
    },

    english_grammar_upgrade: {
        id: "english_grammar_upgrade",
        title: "英语语法：简单句的提升",
        subtitle: "进阶句式与写作应用",
        themeColor: "indigo",
        type: "article",
        url: "english/简单句的提升.html",
        cards: []
    },
    english_grammar_parallel: {
        id: "english_grammar_parallel",
        title: "英语语法：并列句",
        subtitle: "多件事一样重要，靠并列连词连接",
        themeColor: "indigo",
        type: "article",
        url: "english/并列句.html",
        cards: []
    },
    english_grammar_object_clause: {
        id: "english_grammar_object_clause",
        title: "英语语法：宾语从句",
        subtitle: "名词性从句之一，句中充当宾语",
        themeColor: "indigo",
        type: "article",
        url: "english/宾语从句.html",
        cards: []
    },
    english_grammar_noun_clause: {
        id: "english_grammar_noun_clause",
        title: "英语语法：名词性从句",
        subtitle: "主语/宾语/表语/同位语从句总览",
        themeColor: "indigo",
        type: "article",
        url: "english/名词性从句.html",
        cards: []
    },
    english_grammar_relative_clause: {
        id: "english_grammar_relative_clause",
        title: "英语语法：定语从句",
        subtitle: "关系词、先行词与长难句修饰结构",
        themeColor: "indigo",
        type: "article",
        url: "english/定语从句.html",
        cards: []
    },
    c_pointer_adv1: {
        id: "c_pointer_adv1",
        title: "C语言：指针3",
        subtitle: "指针进阶与复杂类型",
        themeColor: "emerald",
        type: "article",
        url: "c/指针高级2.html",
        cards: []
    },

    // === 数据结构模块 ===
    ds_seq_list: {
        id: "ds_seq_list",
        title: "数据结构：顺序表",
        subtitle: "线性表的顺序存储与基本操作",
        themeColor: "amber",
        type: "article",
        url: "ds/顺序表.html",
        cards: []
    },

    ds_singly_list: {
        id: "ds_singly_list",
        title: "数据结构：单链表",
        subtitle: "定义、插删、查找、头插法与尾插法",
        themeColor: "amber",
        type: "article",
        url: "ds/单链表.html",
        cards: []
    },

    ds_doubly_list: {
        id: "ds_doubly_list",
        title: "数据结构：双链表",
        subtitle: "prior/next、插删、销毁、双向遍历",
        themeColor: "amber",
        type: "article",
        url: "ds/双链表.html",
        cards: []
    },

    ds_linear_supplement: {
        id: "ds_linear_supplement",
        title: "数据结构：循环/静态链表及对比",
        subtitle: "循环链表、静态链表与线性表比较",
        themeColor: "amber",
        type: "article",
        url: "ds/循环链表、静态链表与线性表比较.html",
        cards: []
    },

    se_quiz: {
        id: "se_quiz",
        title: "软件测试：选择与填空通关",
        subtitle: "专业课自测题库 · 答错显示记忆口诀",
        themeColor: "fuchsia",
        type: "article",
        url: "se/se_quiz.html?v=1.3",
        cards: []
    },

    wx_quiz: {
        id: "wx_quiz",
        title: "微信小程序：开发实战通关",
        subtitle: "微信小程序课后习题汇总（选择/判断/填空）",
        themeColor: "emerald",
        type: "article",
        url: "wx/wx_quiz.html?v=1.0",
        cards: []
    },

wx_short_answers: {
  "id": "wx_short_answers",
  "title": "微信小程序：核心简答闪卡",
  "subtitle": "1-8章核心简答 · 口诀化拆解",
  "themeColor": "emerald",
  "type": "flashcard",
  "cards": [
    {
      "title": "第1章：小程序特点",
      "q": "请简述微信小程序的特点。",
      "tip": "<b>记忆口诀：【即开即走不占内存，生态丰富流量省心】</b>",
      "a": "<div class='sa-list'>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>即</span>\
    <div class='sa-content'><b class='sa-title'>即开即用</b>：<span class='sa-desc'>无需下载与安装，通过扫码或搜索即可瞬间打开应用。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>走</span>\
    <div class='sa-content'><b class='sa-title'>用完即走</b>：<span class='sa-desc'>关闭后不占用手机存储空间，也不驻留后台进程。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>低</span>\
    <div class='sa-content'><b class='sa-title'>开发成本低</b>：<span class='sa-desc'>提供统一的开发框架和组件，比原生APP更容易上手。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>融</span>\
    <div class='sa-content'><b class='sa-title'>微信生态融合</b>：<span class='sa-desc'>深度打通微信支付、社交分享、客服与登录等微信特有生态。</span></div>\
  </div>\
</div>"
    },
    {
      "title": "第1章：项目创建过程",
      "q": "请简述微信小程序项目的创建过程。",
      "tip": "<b>记忆口诀：【先申账号拿AppID，下载工具建新项目】</b>",
      "a": "<div class='sa-list'>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>号</span>\
    <div class='sa-content'><b class='sa-title'>获取AppID</b>：<span class='sa-desc'>在微信公众平台注册小程序账号，并在“开发管理-开发设置”中复制AppID。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>工</span>\
    <div class='sa-content'><b class='sa-title'>下载工具</b>：<span class='sa-desc'>下载并安装对应系统版本的“微信开发者工具”。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>建</span>\
    <div class='sa-content'><b class='sa-title'>新建项目</b>：<span class='sa-desc'>启动开发者工具，扫码登录，点击“+”号选择新建小程序项目。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>配</span>\
    <div class='sa-content'><b class='sa-title'>配置信息</b>：<span class='sa-desc'>填入项目名称、选择本地目录、填入AppID，选择开发模式（小程序）及模板，点击确定生成。</span></div>\
  </div>\
</div>"
    },
    {
      "title": "第2章：WXML与HTML的区别",
      "q": "简述 WXML 和 HTML 的区别。",
      "tip": "<b>记忆口诀：【标签组件大换血，数据绑定不用DOM】</b>",
      "a": "<div class='sa-list'>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>标</span>\
    <div class='sa-content'><b class='sa-title'>标签不同</b>：<span class='sa-desc'>HTML使用div/span/img，WXML使用专属组件view/text/image。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>绑</span>\
    <div class='sa-content'><b class='sa-title'>数据绑定</b>：<span class='sa-desc'>WXML支持MVVM式的双括号“{{ }}”插值，而HTML需要通过JS手动操作DOM。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>控</span>\
    <div class='sa-content'><b class='sa-title'>指令渲染</b>：<span class='sa-desc'>WXML拥有指令属性（如wx:if、wx:for），HTML本身不具备逻辑控制能力。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>空</span>\
    <div class='sa-content'><b class='sa-title'>没有DOM树</b>：<span class='sa-desc'>WXML中没有HTML的window和document对象，无法进行标准的DOM操作。</span></div>\
  </div>\
</div>"
    },
    {
      "title": "第2章：WXSS与CSS的区别",
      "q": "简述 WXSS 和 CSS 的区别。",
      "tip": "<b>记忆口诀：【rpx适配全屏幕，import导入相对路】</b>",
      "a": "<div class='sa-list'>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>尺</span>\
    <div class='sa-content'><b class='sa-title'>rpx单位</b>：<span class='sa-desc'>新增rpx（responsive pixel）响应式像素单位，屏幕宽度固定为750rpx，自动适配不同机型。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>导</span>\
    <div class='sa-content'><b class='sa-title'>样式导入</b>：<span class='sa-desc'>提供@import语法，支持将外联样式表引入到当前样式表中。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>选</span>\
    <div class='sa-content'><b class='sa-title'>选择器受限</b>：<span class='sa-desc'>WXSS仅支持常用的选择器（如.class、#id、element等），不支持一些复杂的CSS3选择器。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>局</span>\
    <div class='sa-content'><b class='sa-title'>全局与局部</b>：<span class='sa-desc'>拥有app.wxss全局样式与页面专属wxss，页面样式会自动覆盖同名的全局样式。</span></div>\
  </div>\
</div>"
    },
    {
      "title": "第2章：Flex布局概念",
      "q": "简述 Flex 布局的概念。",
      "tip": "<b>记忆口诀：【设为flex分双轴，对齐伸缩排版优】</b>",
      "a": "<div class='sa-list'>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>容</span>\
    <div class='sa-content'><b class='sa-title'>弹性容器</b>：<span class='sa-desc'>通过将父元素的display属性设为flex，使其成为Flex容器，其子元素自动成为Flex项目。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>轴</span>\
    <div class='sa-content'><b class='sa-title'>双轴模型</b>：<span class='sa-desc'>由主轴（main axis）和交叉轴（cross axis）组成，通过flex-direction可以调整轴向。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>对</span>\
    <div class='sa-content'><b class='sa-title'>对齐控制</b>：<span class='sa-desc'>使用justify-content定义项目在主轴的对齐方式，使用align-items定义在交叉轴的对齐方式。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>伸</span>\
    <div class='sa-content'><b class='sa-title'>弹性伸缩</b>：<span class='sa-desc'>子项目可通过flex属性控制自身的放大、缩小比例及基础大小，实现自动按比例分配。</span></div>\
  </div>\
</div>"
    },
    {
      "title": "第3章：页面生命周期",
      "q": "简述页面生命周期函数包括哪些。",
      "tip": "<b>记忆口诀：【加载显示初渲染，隐藏卸载生命完】</b>",
      "a": "<div class='sa-list'>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>载</span>\
    <div class='sa-content'><b class='sa-title'>onLoad(query)</b>：<span class='sa-desc'>页面加载时触发。一个页面只调用一次，可以在此获取打开当前页面所调用的参数。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>显</span>\
    <div class='sa-content'><b class='sa-title'>onShow()</b>：<span class='sa-desc'>页面显示/切入前台时触发。每次打开页面或从后台切回前台都会执行。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>初</span>\
    <div class='sa-content'><b class='sa-title'>onReady()</b>：<span class='sa-desc'>页面初次渲染完成时触发。一个页面只调用一次，代表页面可以与视图层进行交互。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>隐</span>\
    <div class='sa-content'><b class='sa-title'>onHide()</b>：<span class='sa-desc'>页面隐藏/切入后台时触发。如wx.navigateTo跳转或微信切入后台。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>卸</span>\
    <div class='sa-content'><b class='sa-title'>onUnload()</b>：<span class='sa-desc'>页面卸载时触发。如wx.redirectTo重定向或wx.navigateBack返回上一页。</span></div>\
  </div>\
</div>"
    },
    {
      "title": "第3章：wx:if与hidden区别",
      "q": "简述 wx:if 控制属性和 hidden 属性的区别。",
      "tip": "<b>记忆口诀：【条件if控渲染，频繁显隐hidden连】</b>",
      "a": "<div class='sa-list'>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>机</span>\
    <div class='sa-content'><b class='sa-title'>渲染机制</b>：<span class='sa-desc'>wx:if是动态的销毁和重建组件；hidden仅通过修改CSS的display属性控制可见性。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>初</span>\
    <div class='sa-content'><b class='sa-title'>初始负载</b>：<span class='sa-desc'>wx:if是惰性的，初始为false则不渲染；hidden不管初始值，都会进行组件渲染。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>销</span>\
    <div class='sa-content'><b class='sa-title'>生命周期</b>：<span class='sa-desc'>wx:if切换时会触发子组件的创建与销毁生命周期；hidden不会影响组件生命周期状态。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>选</span>\
    <div class='sa-content'><b class='sa-title'>场景选择</b>：<span class='sa-desc'>频繁切换使用hidden以减少渲染开销；条件不常改变的使用wx:if以减少初始渲染时间。</span></div>\
  </div>\
</div>"
    },
    {
      "title": "第3章：下拉刷新实现",
      "q": "简述微信小程序如何实现下拉刷新。",
      "tip": "<b>记忆口诀：【配置开启Refresh，监听重置stop止】</b>",
      "a": "<div class='sa-list'>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>配</span>\
    <div class='sa-content'><b class='sa-title'>开启全局/页面配置</b>：<span class='sa-desc'>在app.json或具体页面的json配置文件中，设置\"enablePullDownRefresh\": true。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>听</span>\
    <div class='sa-content'><b class='sa-title'>监听下拉事件</b>：<span class='sa-desc'>在页面的JS文件中，编写生命周期函数onPullDownRefresh()，在里面编写刷新逻辑。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>新</span>\
    <div class='sa-content'><b class='sa-title'>更新页面数据</b>：<span class='sa-desc'>在监听事件内重新请求API，并将获取的最新数据通过this.setData()渲染至页面。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>停</span>\
    <div class='sa-content'><b class='sa-title'>主动停止动画</b>：<span class='sa-desc'>数据加载完成后，必须手动调用wx.stopPullDownRefresh()，否则下拉加载动画不会自动消失。</span></div>\
  </div>\
</div>"
    },
    {
      "title": "第3章：上拉触底实现",
      "q": "简述微信小程序如何实现上拉触底。",
      "tip": "<b>记忆口诀：【触底监听onReach，配置距离加防重】</b>",
      "a": "<div class='sa-list'>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>距</span>\
    <div class='sa-content'><b class='sa-title'>配置触底距离</b>：<span class='sa-desc'>在页面json配置中，可通过onReachBottomDistance设置触发触底的距离，单位px，默认为50px。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>听</span>\
    <div class='sa-content'><b class='sa-title'>监听触底函数</b>：<span class='sa-desc'>在页面的JS文件中，重写onReachBottom()生命周期函数，在该函数中编写加载下一页数据的逻辑。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>拼</span>\
    <div class='sa-content'><b class='sa-title'>追加合并数据</b>：<span class='sa-desc'>发送请求获取新一页的数据后，使用this.setData()将新数据拼接到原数据列表的末尾。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>锁</span>\
    <div class='sa-content'><b class='sa-title'>加入防抖节流</b>：<span class='sa-desc'>设置状态锁（如isloading），在请求发送时加锁，请求结束解锁，防止用户多次上拉重复请求。</span></div>\
  </div>\
</div>"
    },
    {
      "title": "第4章：背景音频管理",
      "q": "简述 BackgroundAudioManager 实例的属性和方法。",
      "tip": "<b>记忆口诀：【获取实例配src，Title必填play起】</b>",
      "a": "<div class='sa-list'>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>取</span>\
    <div class='sa-content'><b class='sa-title'>获取实例</b>：<span class='sa-desc'>通过wx.getBackgroundAudioManager()获取系统级唯一的背景音频播放管理器。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>属</span>\
    <div class='sa-content'><b class='sa-title'>核心属性</b>：<span class='sa-desc'>src属性（音频源链接）、title属性（音频标题，必须设置否则无法播放）、duration（总时长）、currentTime（当前播放进度）。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>方</span>\
    <div class='sa-content'><b class='sa-title'>核心方法</b>：<span class='sa-desc'>play()开始播放、pause()暂停播放、stop()停止播放、seek(position)音频进度跳转。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>听</span>\
    <div class='sa-content'><b class='sa-title'>状态监听</b>：<span class='sa-desc'>onPlay()监听播放开始、onPause()监听播放暂停、onTimeUpdate()监听播放进度更新、onEnded()监听播放自然结束。</span></div>\
  </div>\
</div>"
    },
    {
      "title": "第4章：Canvas绘图步骤",
      "q": "简述使用画布 API 进行绘图的基本步骤。",
      "tip": "<b>记忆口诀：【获取上下文设样式，路径绘制draw出来】</b>",
      "a": "<div class='sa-list'>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>创</span>\
    <div class='sa-content'><b class='sa-title'>获取画布上下文</b>：<span class='sa-desc'>在WXML定义canvas组件，通过wx.createSelectorQuery()获取节点并调用getContext('2d')获取绘图上下文（Canvas 2D标准）。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>设</span>\
    <div class='sa-content'><b class='sa-title'>设置绘制样式</b>：<span class='sa-desc'>通过上下文设置样式，如fillStyle（填充色）、strokeStyle（线条色）、lineWidth（线宽）及font（字体样式）等。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>绘</span>\
    <div class='sa-content'><b class='sa-title'>绘制图形与路径</b>：<span class='sa-desc'>调用moveTo()、lineTo()、arc()等勾勒路径，或使用fillRect()、strokeRect()、fillText()等直接输出图形与文本。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>画</span>\
    <div class='sa-content'><b class='sa-title'>渲染生成</b>：<span class='sa-desc'>若是旧版Canvas API，绘制完毕后必须调用ctx.draw()方法完成实际的画布渲染；若使用Canvas 2D则无需draw()，为实时绘制。</span></div>\
  </div>\
</div>"
    },
    {
      "title": "第4章：文件上传与下载",
      "q": "简述如何实现文件上传和文件下载。",
      "tip": "<b>记忆口诀：【选好图片upload，远程下载download传】</b>",
      "a": "<div class='sa-list'>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>上</span>\
    <div class='sa-content'><b class='sa-title'>文件上传方法</b>：<span class='sa-desc'>先调用wx.chooseMedia选择本地多媒体文件，获取tempFilePath，再通过wx.uploadFile()上传，需要指定url、filePath和name等参数。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>下</span>\
    <div class='sa-content'><b class='sa-title'>文件下载方法</b>：<span class='sa-desc'>调用wx.downloadFile()方法，指定文件url。下载成功后会在回调中返回临时文件路径tempFilePath。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>存</span>\
    <div class='sa-content'><b class='sa-title'>文件保存与打开</b>：<span class='sa-desc'>拿到下载的临时文件后，可用wx.saveFile()将其持久化保存到本地，或者用wx.openDocument()直接打开预览（如PDF/Word文档）。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>听</span>\
    <div class='sa-content'><b class='sa-title'>进度条监听</b>：<span class='sa-desc'>wx.uploadFile和wx.downloadFile会返回任务实例，通过监听onProgressUpdate事件可以获取实时进度百分比。</span></div>\
  </div>\
</div>"
    },
    {
      "title": "第5章：Animation实例获取",
      "q": "简述如何获取 Animation 实例。",
      "tip": "<b>记忆口诀：【createAnimation定参数，step结束export出】</b>",
      "a": "<div class='sa-list'>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>创</span>\
    <div class='sa-content'><b class='sa-title'>调用创建API</b>：<span class='sa-desc'>通过wx.createAnimation(Object)创建一个动画实例。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>参</span>\
    <div class='sa-content'><b class='sa-title'>配置动画参数</b>：<span class='sa-desc'>可在Object中配置duration(过渡时间)、timingFunction(动画效果)、delay(延迟)和transformOrigin(变形原点)。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>链</span>\
    <div class='sa-content'><b class='sa-title'>编写动画步骤</b>：<span class='sa-desc'>通过链式调用如rotate()、scale()等，最后调用step()表示这组动画定义完毕。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>导</span>\
    <div class='sa-content'><b class='sa-title'>导出并绑定</b>：<span class='sa-desc'>通过animation.export()导出动画数据，使用this.setData()绑定到页面的Data中，并放入WXML的animation属性里。</span></div>\
  </div>\
</div>"
    },
    {
      "title": "第5章：应用生命周期",
      "q": "简述微信小程序中应用生命周期回调函数 onLaunch( )、onShow( )、onError( )、onHide( )和 onPageNotFound( ) 的作用。",
      "tip": "<b>记忆口诀：【初始化时onLaunch，显示隐藏错丢失】</b>",
      "a": "<div class='sa-list'>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>启</span>\
    <div class='sa-content'><b class='sa-title'>onLaunch()</b>：<span class='sa-desc'>生命周期-监听小程序初始化。小程序初始化完成时触发，全局只触发一次。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>显</span>\
    <div class='sa-content'><b class='sa-title'>onShow()</b>：<span class='sa-desc'>生命周期-监听小程序启动或切前台。当小程序启动，或从后台进入前台显示时触发。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>隐</span>\
    <div class='sa-content'><b class='sa-title'>onHide()</b>：<span class='sa-desc'>生命周期-监听小程序切后台。当小程序从前台进入后台隐藏时触发。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>错</span>\
    <div class='sa-content'><b class='sa-title'>onError()</b>：<span class='sa-desc'>错误监听函数。小程序脚本发生JS错误，或者API调用失败时触发，用于收集错误日志。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>失</span>\
    <div class='sa-content'><b class='sa-title'>onPageNotFound()</b>：<span class='sa-desc'>页面不存在监听函数。小程序要打开的页面不存在时触发，可在函数内重定向到首页，避免白屏。</span></div>\
  </div>\
</div>"
    },
    {
      "title": "第5章：WebSocket连接",
      "q": "简述如何创建 WebSocket 连接。",
      "tip": "<b>记忆口诀：【connectSocket连网络，onOpen成功发消息】</b>",
      "a": "<div class='sa-list'>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>连</span>\
    <div class='sa-content'><b class='sa-title'>发起连接</b>：<span class='sa-desc'>调用wx.connectSocket()方法，传入wss协议的安全域名接口URL，返回SocketTask实例。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>听</span>\
    <div class='sa-content'><b class='sa-title'>监听开启</b>：<span class='sa-desc'>使用wx.onSocketOpen()或SocketTask.onOpen()监听连接成功建立的事件。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>发</span>\
    <div class='sa-content'><b class='sa-title'>发送数据</b>：<span class='sa-desc'>在连接成功建立后，调用wx.sendSocketMessage()或SocketTask.send()传输文本或二进制数据。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>收</span>\
    <div class='sa-content'><b class='sa-title'>接收与关闭</b>：<span class='sa-desc'>调用wx.onSocketMessage()实时监听服务端消息，在断开或退出时调用wx.closeSocket()关闭长连接。</span></div>\
  </div>\
</div>"
    },
    {
      "title": "第6章：页面切换方法区别",
      "q": "简述微信小程序中实现页面之间切换的 wx.navigateTo( )、wx.redirectTo( )和 wx.switchTab( ) 方法的区别。",
      "tip": "<b>记忆口诀：【保留navigateTo，关闭redirectTo，切换tabBar用switchTab】</b>",
      "a": "<div class='sa-list'>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>保</span>\
    <div class='sa-content'><b class='sa-title'>wx.navigateTo</b>：<span class='sa-desc'>保留当前页，跳转至非TabBar页。原页面不销毁，可以使用wx.navigateBack()返回，页面栈上限为10层。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>销</span>\
    <div class='sa-content'><b class='sa-title'>wx.redirectTo</b>：<span class='sa-desc'>关闭当前页，跳转至非TabBar页。原页面会被销毁出栈，常用于表单提交成功或登录重定向，无法返回原页。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>切</span>\
    <div class='sa-content'><b class='sa-title'>wx.switchTab</b>：<span class='sa-desc'>专门用于跳转至TabBar指定的底部导航页。跳转时会关闭并销毁页面栈中所有其他非TabBar页面。</span></div>\
  </div>\
</div>"
    },
    {
      "title": "第6章：小程序登录流程",
      "q": "简述微信小程序的登录流程。",
      "tip": "<b>记忆口诀：【login拿code，后台换openid，token回传保本地】</b>",
      "a": "<div class='sa-list'>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>凭</span>\
    <div class='sa-content'><b class='sa-title'>前端获取Code</b>：<span class='sa-desc'>小程序端调用wx.login()获取临时登录凭证code，有效期为5分钟。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>传</span>\
    <div class='sa-content'><b class='sa-title'>发送凭证至后台</b>：<span class='sa-desc'>小程序通过wx.request()将code发送给开发者自建服务器。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>换</span>\
    <div class='sa-content'><b class='sa-title'>后台向微信换密钥</b>：<span class='sa-desc'>开发者服务器向微信接口服务发送code+AppID+AppSecret，换取用户的openid和会话密钥session_key。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>存</span>\
    <div class='sa-content'><b class='sa-title'>返回并保存Token</b>：<span class='sa-desc'>服务器生成自定义登录态（Token）返给前端，前端调用wx.setStorage缓存Token，后续请求携带Token。</span></div>\
  </div>\
</div>"
    },
    {
      "title": "第7章：自定义组件创建与使用",
      "q": "简述自定义组件的创建和使用方法。",
      "tip": "<b>记忆口诀：【新建组件设JSON，页面引用using配】</b>",
      "a": "<div class='sa-list'>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>创</span>\
    <div class='sa-content'><b class='sa-title'>新建四件套与配置</b>：<span class='sa-desc'>在项目目录中右键新建Component。组件的json文件中必须声明\"component\": true。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>写</span>\
    <div class='sa-content'><b class='sa-title'>Component逻辑编写</b>：<span class='sa-desc'>在组件JS中调用Component()函数，可用properties接收外来参数，methods定义内部处理函数。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>引</span>\
    <div class='sa-content'><b class='sa-title'>配置usingComponents</b>：<span class='sa-desc'>在需要引用该组件的页面（或app.json全局）的json文件中，通过usingComponents配置键值对引入组件。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>用</span>\
    <div class='sa-content'><b class='sa-title'>在WXML内当做标签使用</b>：<span class='sa-desc'>在页面的WXML文件中直接写自定义标签（如<my-component />），并可通过属性传值和绑定事件。</span></div>\
  </div>\
</div>"
    },
    {
      "title": "第7章：useExtendedLib引入WeUI",
      "q": "简述通过 useExtendedLib 扩展库的方式引入 WeUI 组件库的方式。",
      "tip": "<b>记忆口诀：【app配置useExtend，免包体积直接引】</b>",
      "a": "<div class='sa-list'>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>配</span>\
    <div class='sa-content'><b class='sa-title'>app.json全局声明</b>：<span class='sa-desc'>In app.json中加入配置：\"useExtendedLib\": { \"weui\": true }，使小程序项目支持WeUI库。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>引</span>\
    <div class='sa-content'><b class='sa-title'>页面声明引入组件</b>：<span class='sa-desc'>在页面.json的usingComponents中直接注册组件，如\"mp-dialog\": \"weui-miniprogram/dialog/dialog\"。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>优</span>\
    <div class='sa-content'><b class='sa-title'>减包不占体积</b>：<span class='sa-desc'>通过扩展库引入的组件库代码由微信客户端直接提供，不计入小程序的代码包大小限制。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>用</span>\
    <div class='sa-content'><b class='sa-title'>页面标签渲染</b>：<span class='sa-desc'>在页面的WXML文件中，直接使用带有mp-前缀的标签进行页面渲染。</span></div>\
  </div>\
</div>"
    },
    {
      "title": "第7章：navigator的open-type",
      "q": "简述 navigator 组件的 open-type 属性的合法值及作用。",
      "tip": "<b>记忆口诀：【navigate返非Tab，重构启动用reLaunch，跳转底部switchTab】</b>",
      "a": "<div class='sa-list'>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>导</span>\
    <div class='sa-content'><b class='sa-title'>navigate / redirect</b>：<span class='sa-desc'>navigate为默认保留当前页跳转非Tab页；redirect为关闭并销毁当前页跳转非Tab页。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>切</span>\
    <div class='sa-content'><b class='sa-title'>switchTab / reLaunch</b>：<span class='sa-desc'>switchTab用于跳转到底部TabBar；reLaunch用于销毁全部页面栈并启动到任意指定页。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>返</span>\
    <div class='sa-content'><b class='sa-title'>navigateBack</b>：<span class='sa-desc'>用于页面回退，可与delta属性配合指定向上返回的级数。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>退</span>\
    <div class='sa-content'><b class='sa-title'>exit</b>：<span class='sa-desc'>用于退出小程序。仅在配合target=\"miniProgram\"且点击退出时生效。</span></div>\
  </div>\
</div>"
    },
    {
      "title": "第7章：uni-app优点",
      "q": "简述 uni-app 框架的优点。",
      "tip": "<b>记忆口诀：【一套代码多端发，基于Vue生态大】</b>",
      "a": "<div class='sa-list'>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>多</span>\
    <div class='sa-content'><b class='sa-title'>多端发布支持</b>：<span class='sa-desc'>一套代码可编译成iOS、Android、Web以及各大平台的小程序，极大节省开发成本。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>Vue</span>\
    <div class='sa-content'><b class='sa-title'>基于Vue.js开发</b>：<span class='sa-desc'>完全遵循Vue的语法和生命周期，易于上手，能够实现高效的组件化和数据流管理。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>态</span>\
    <div class='sa-content'><b class='sa-title'>生态插件繁荣</b>：<span class='sa-desc'>DCloud插件市场沉淀了大量成熟插件与模板，极大提升开发效率。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>快</span>\
    <div class='sa-content'><b class='sa-title'>优秀的渲染性能</b>：<span class='sa-desc'>App端结合原生渲染引擎，且支持小程序的轻量级运行，保证操作的顺畅流利。</span></div>\
  </div>\
</div>"
    },
    {
      "title": "第8章：小程序页面组成",
      "q": "简述微信小程序的页面组成。",
      "tip": "<b>记忆口诀：【WXML定结构，样式逻辑JSON配】</b>",
      "a": "<div class='sa-list'>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>构</span>\
    <div class='sa-content'><b class='sa-title'>WXML 页面结构</b>：<span class='sa-desc'>类似HTML，通过使用各种自带组件来搭建页面的UI结构骨架。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>样</span>\
    <div class='sa-content'><b class='sa-title'>WXSS 页面样式</b>：<span class='sa-desc'>类似CSS，用于控制组件的布局、字体、颜色以及不同设备的适配排版。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>控</span>\
    <div class='sa-content'><b class='sa-title'>JS 页面逻辑</b>：<span class='sa-desc'>运行在逻辑层，进行状态数据的声明、事件处理函数的编写以及发送API请求。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>配</span>\
    <div class='sa-content'><b class='sa-title'>JSON 页面配置</b>：<span class='sa-desc'>纯数据配置文件，定义当前页面的个性化设置（如导航标题、是否开启下拉刷新）。</span></div>\
  </div>\
</div>"
    },
    {
      "title": "第8章：uni-app页面路径设置",
      "q": "简述如何在 uni-app 项目中设置页面路径。",
      "tip": "<b>记忆口诀：【新建页面在pages，pages.json填路径】</b>",
      "a": "<div class='sa-list'>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>建</span>\
    <div class='sa-content'><b class='sa-title'>新建页面组件</b>：<span class='sa-desc'>在uni-app项目的pages文件夹下，创建页面专属的目录及后缀为.vue的单文件组件。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>配</span>\
    <div class='sa-content'><b class='sa-title'>配置pages.json</b>：<span class='sa-desc'>打开项目根目录下的全局配置文件pages.json，在pages数组中追加配置对象。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>路</span>\
    <div class='sa-content'><b class='sa-title'>指定path属性</b>：<span class='sa-desc'>在页面配置中指定path属性，填入相对于项目根目录的相对路径，如\"pages/info/info\"。</span></div>\
  </div>\
  <div class='sa-item'>\
    <span class='sa-badge sa-badge-emerald'>首</span>\
    <div class='sa-content'><b class='sa-title'>定义初始首页</b>：<span class='sa-desc'>pages数组的第一个元素，会被默认设定为项目启动时渲染的首个页面。</span></div>\
  </div>\
</div>"
    }
  ]
},

    se_short_answers: {
        id: "se_short_answers",
        title: "软件测试：核心简答闪卡",
        subtitle: "1-7章高频简答 · 口诀化拆解",
        themeColor: "fuchsia",
        type: "flashcard",
        cards: [
            {
                title: "第1章：缺陷处理流程",
                q: "请简述软件缺陷的处理流程。",
                tip: "<b>记忆口诀：【缺陷提分确认先，修复回归闭环圆】</b>",
                a: "<div class='sa-list'>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>提</span>\n    <div class='sa-content'><b class='sa-title'>提交缺陷</b>：<span class='sa-desc'>测试人员发现Bug，录入系统并提交。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>分</span>\n    <div class='sa-content'><b class='sa-title'>分配缺陷</b>：<span class='sa-desc'>主管审核后分配给相应开发人员进行处理。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>确</span>\n    <div class='sa-content'><b class='sa-title'>确认缺陷</b>：<span class='sa-desc'>开发确认该缺陷属实，准备进行修复。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>修</span>\n    <div class='sa-content'><b class='sa-title'>修复缺陷</b>：<span class='sa-desc'>开发修改代码，解决问题后提交修复版本。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>回</span>\n    <div class='sa-content'><b class='sa-title'>回归测试</b>：<span class='sa-desc'>测试验证原Bug已修复，且无新Bug引入。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>关</span>\n    <div class='sa-content'><b class='sa-title'>关闭缺陷</b>：<span class='sa-desc'>验证通过后，正式关闭该缺陷状态。</span></div>\n  </div>\n</div>"
            },
            {
                title: "第1章：测试基本流程",
                q: "请简述软件测试的基本流程。",
                tip: "<b>记忆口诀：【需求计划设用例，执行评估总结齐】</b>",
                a: "<div class='sa-list'>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>需</span>\n    <div class='sa-content'><b class='sa-title'>需求分析</b>：<span class='sa-desc'>熟悉业务逻辑，弄清“测什么”，提取测试点。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>计</span>\n    <div class='sa-content'><b class='sa-title'>制定计划</b>：<span class='sa-desc'>编写计划文档，确定资源、进度与策略。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>设</span>\n    <div class='sa-content'><b class='sa-title'>设计用例</b>：<span class='sa-desc'>运用白盒/黑盒方法设计测试步骤与预期输出。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>执</span>\n    <div class='sa-content'><b class='sa-title'>执行测试</b>：<span class='sa-desc'>搭建环境，执行用例，记录结果并提交缺陷。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>估</span>\n    <div class='sa-content'><b class='sa-title'>质量估算</b>：<span class='sa-desc'>分析缺陷数据，进行质量评估。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>结</span>\n    <div class='sa-content'><b class='sa-title'>测试总结</b>：<span class='sa-desc'>输出质量报告与测试总结。</span></div>\n  </div>\n</div>"
            },
            {
                title: "第2章：等价类划分",
                q: "请简述等价类划分法的原则。",
                tip: "<b>记忆口诀：【有效无效分两端，编号用例逐个盖】</b>",
                a: "<div class='sa-list'>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>区</span>\n    <div class='sa-content'><b class='sa-title'>区间划分</b>：<span class='sa-desc'>规定输入范围，划分1个有效和2个无效等价类。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>数</span>\n    <div class='sa-content'><b class='sa-title'>数值划分</b>：<span class='sa-desc'>规定输入个数，划分1个有效和2个无效等价类。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>集</span>\n    <div class='sa-content'><b class='sa-title'>集合划分</b>：<span class='sa-desc'>规定一组有效值，有效为集合内，无效为集合外。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>必</span>\n    <div class='sa-content'><b class='sa-title'>必满足条件</b>：<span class='sa-desc'>输入需遵守某种规则，有效为遵守，无效为不遵守。</span></div>\n  </div>\n</div>"
            },
            {
                title: "第2章：决策表合并",
                q: "请简述决策表条件项的合并规则。",
                tip: "<b>记忆口诀：【动作一致条件单，合并一列化繁难】</b>",
                a: "<div class='sa-list'>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>同</span>\n    <div class='sa-content'><b class='sa-title'>动作相同</b>：<span class='sa-desc'>若两条或多条规则的执行结果完全相同。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>单不</span>\n    <div class='sa-content'><b class='sa-title'>单一不同</b>：<span class='sa-desc'>且只有一个条件项的取值不同（一真一假）。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>合</span>\n    <div class='sa-content'><b class='sa-title'>合并为一</b>：<span class='sa-desc'>则可将此条件视为无关紧要的“无关项”(-)，合并为一条。</span></div>\n  </div>\n</div>"
            },
            {
                title: "第2章：正交实验设计",
                q: "请简述正交实验设计法测试用例的设计步骤。",
                tip: "<b>记忆口诀：【因子状态筛选先，正交表上映射完】</b>",
                a: "<div class='sa-list'>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>提</span>\n    <div class='sa-content'><b class='sa-title'>提取因子状态</b>：<span class='sa-desc'>确定影响系统的输入参数及可选值。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>筛</span>\n    <div class='sa-content'><b class='sa-title'>加权筛选</b>：<span class='sa-desc'>精简非核心因子，减轻测试工作量。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>配</span>\n    <div class='sa-content'><b class='sa-title'>匹配正交表</b>：<span class='sa-desc'>根据因子数和状态数选择契合的标准正交表。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>映</span>\n    <div class='sa-content'><b class='sa-title'>映射生成</b>：<span class='sa-desc'>用真实的因子与状态代入正交表各行生成用例。</span></div>\n  </div>\n</div>"
            },
            {
                title: "第3章：逻辑覆盖",
                q: "请简述逻辑覆盖的几种方法及区别。",
                tip: "<b>记忆口诀：【语判条件组覆盖，路径最强保质量】</b>",
                a: "<div class='sa-list'>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>语</span>\n    <div class='sa-content'><b class='sa-title'>语句覆盖</b>：<span class='sa-desc'>每行可执行代码至少运行一次。(最弱)</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>判</span>\n    <div class='sa-content'><b class='sa-title'>判定覆盖</b>：<span class='sa-desc'>每个判定的真/假分支都至少执行一次。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>条</span>\n    <div class='sa-content'><b class='sa-title'>条件覆盖</b>：<span class='sa-desc'>判定中每个子条件的真/假取值都出现一次。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>判条</span>\n    <div class='sa-content'><b class='sa-title'>判定-条件</b>：<span class='sa-desc'>同时满足判定和条件的覆盖指标。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>组</span>\n    <div class='sa-content'><b class='sa-title'>条件组合</b>：<span class='sa-desc'>每个判定中子条件真假的各种组合各出现一次。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>路</span>\n    <div class='sa-content'><b class='sa-title'>路径覆盖</b>：<span class='sa-desc'>程序所有可能的代码执行路径全部被覆盖。(最强)</span></div>\n  </div>\n</div>"
            },
            {
                title: "第3章：目标代码插桩",
                q: "请简述目标代码插桩的3种执行模式。",
                tip: "<b>记忆口诀：【即时解释与探测，目标插桩三套客】</b>",
                a: "<div class='sa-list'>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>即</span>\n    <div class='sa-content'><b class='sa-title'>即时执行</b>：<span class='sa-desc'>在基本块即将被CPU执行前进行动态分析与插桩。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>释</span>\n    <div class='sa-content'><b class='sa-title'>解释执行</b>：<span class='sa-desc'>在虚拟机或解释引擎中解释运行目标代码时进行拦截。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>探</span>\n    <div class='sa-content'><b class='sa-title'>探测执行</b>：<span class='sa-desc'>用跳转指令(JMP)替换目标代码，跳转到分析例程后返回。</span></div>\n  </div>\n</div>"
            },
            {
                title: "第4章：性能测试指标",
                q: "请简述常用的性能测试指标。",
                tip: "<b>记忆口诀：【时间吞吐并发数，资源利用性能驻】</b>",
                a: "<div class='sa-list'>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>时</span>\n    <div class='sa-content'><b class='sa-title'>响应时间</b>：<span class='sa-desc'>系统处理请求并返回结果所耗费的耗时。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>吞</span>\n    <div class='sa-content'><b class='sa-title'>吞吐量</b>：<span class='sa-desc'>单位时间内系统能处理的数据字节数或工作量。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>并</span>\n    <div class='sa-content'><b class='sa-title'>并发用户数</b>：<span class='sa-desc'>同一时间发送请求或建立长连接的用户总量。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>T</span>\n    <div class='sa-content'><b class='sa-title'>TPS</b>：<span class='sa-desc'>每秒事务数，即每秒系统成功执行的业务事务数量。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>资</span>\n    <div class='sa-content'><b class='sa-title'>资源利用率</b>：<span class='sa-desc'>CPU 占用、内存消耗、网络/磁盘 I/O 等百分比。</span></div>\n  </div>\n</div>"
            },
            {
                title: "第4章：性能测试类型",
                q: "请简述常见的性能测试种类。",
                tip: "<b>记忆口诀：【载压并发峰值现，配置可靠性能检】</b>",
                a: "<div class='sa-list'>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>载</span>\n    <div class='sa-content'><b class='sa-title'>负载测试</b>：<span class='sa-desc'>逐步加压以测出满足指标下的最大可用容量。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>压</span>\n    <div class='sa-content'><b class='sa-title'>压力测试</b>：<span class='sa-desc'>极端加压至系统崩溃，查找系统最薄弱的瓶颈。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>并</span>\n    <div class='sa-content'><b class='sa-title'>并发测试</b>：<span class='sa-desc'>极短时间内发同类请求，排查死锁与资源争用。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>峰</span>\n    <div class='sa-content'><b class='sa-title'>峰值测试</b>：<span class='sa-desc'>突发性流量测试，检验瞬间脉冲压力下的自愈能力。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>配</span>\n    <div class='sa-content'><b class='sa-title'>配置测试</b>：<span class='sa-desc'>更改软硬件配置寻找系统的最佳调优方案。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>靠</span>\n    <div class='sa-content'><b class='sa-title'>可靠性测试</b>：<span class='sa-desc'>高负载下稳定工作较长周期，验证是否崩溃或漏内存。</span></div>\n  </div>\n</div>"
            },
            {
                title: "第4章：LoadRunner组成",
                q: "请简述LoadRunner的组成部分及其作用。",
                tip: "<b>记忆口诀：【VuGen录制脚本忙，Control控场分析强】</b>",
                a: "<div class='sa-list'>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>Vu</span>\n    <div class='sa-content'><b class='sa-title'>VuGen</b>：<span class='sa-desc'>虚拟用户生成器：负责脚本的录制、编辑与调试。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>控</span>\n    <div class='sa-content'><b class='sa-title'>Controller</b>：<span class='sa-desc'>控制器：定义并执行性能场景，管理压力机。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>分</span>\n    <div class='sa-content'><b class='sa-title'>Analysis</b>：<span class='sa-desc'>分析器：汇聚压测指标，生成分析图表与报告。</span></div>\n  </div>\n</div>"
            },
            {
                title: "第5章：安全与常规测试",
                q: "请简述安全测试与常规测试的区别。",
                tip: "<b>记忆口诀：【常规测需求，安全查漏洞；常规正向走，安全逆向谋】</b>",
                a: "<div class='sa-list'>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>目</span>\n    <div class='sa-content'><b class='sa-title'>目标不同</b>：<span class='sa-desc'>常规测“是否符合需求”；安全测“是否存在漏洞”。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>思</span>\n    <div class='sa-content'><b class='sa-title'>思维不同</b>：<span class='sa-desc'>常规走正向思维验证；安全走逆向破坏思维找缺口。</span></div>\n  </div>\n</div>"
            },
            {
                title: "第5章：安全测试原则",
                q: "请简述安全测试的基本原则。",
                tip: "<b>记忆口诀：【意早全独防未然，安全测试记心田】</b>",
                a: "<div class='sa-list'>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>意</span>\n    <div class='sa-content'><b class='sa-title'>安全意识</b>：<span class='sa-desc'>全员建立“输入不可信”的安全防范和编码理念。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>早</span>\n    <div class='sa-content'><b class='sa-title'>尽早测试</b>：<span class='sa-desc'>贯穿整个软件生命周期，且需经常频繁测试。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>全</span>\n    <div class='sa-content'><b class='sa-title'>全面综合</b>：<span class='sa-desc'>从网络、数据、系统、代码逻辑等多维度覆盖。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>独</span>\n    <div class='sa-content'><b class='sa-title'>独立团队</b>：<span class='sa-desc'>引入独立的、具备黑客视角的专业安全测试队伍。</span></div>\n  </div>\n</div>"
            },
            {
                title: "第5章：XSS攻击防护",
                q: "请简述XSS的攻击原理及防范措施。",
                tip: "<b>记忆口诀：【脚本注入生漏洞，过滤转义HttpOnly】</b>",
                a: "<div class='sa-list'>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>注</span>\n    <div class='sa-content'><b class='sa-title'>注入脚本</b>：<span class='sa-desc'>攻击者在页面注入恶意HTML/JS代码，盗取用户信息。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>滤</span>\n    <div class='sa-content'><b class='sa-title'>输入过滤</b>：<span class='sa-desc'>对用户提交的数据严格过滤敏感标签(如script)。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>转</span>\n    <div class='sa-content'><b class='sa-title'>转义输出</b>：<span class='sa-desc'>对输出到页面的数据进行实体转义。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>H</span>\n    <div class='sa-content'><b class='sa-title'>HttpOnly</b>：<span class='sa-desc'>给Cookie设置HttpOnly，防范JS读取拦截。</span></div>\n  </div>\n</div>"
            },
            {
                title: "第6章：持续集成过程",
                q: "请简述持续集成的基本过程。",
                tip: "<b>记忆口诀：【提交拉取构测报，自动集成效率高】</b>",
                a: "<div class='sa-list'>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>提</span>\n    <div class='sa-content'><b class='sa-title'>代码提交</b>：<span class='sa-desc'>开发将代码推送至中心版本库。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>拉</span>\n    <div class='sa-content'><b class='sa-title'>拉取分支</b>：<span class='sa-desc'>CI服务器自动监听并拉取最新变动代码。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>构</span>\n    <div class='sa-content'><b class='sa-title'>自动构建</b>：<span class='sa-desc'>运行脚本进行编译、依赖包打入等打包动作。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>测</span>\n    <div class='sa-content'><b class='sa-title'>自动化测试</b>：<span class='sa-desc'>自动跑单元测试、接口或UI回归用例。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>报</span>\n    <div class='sa-content'><b class='sa-title'>发送报告</b>：<span class='sa-desc'>如果跑挂立即通知开发；全通过则发布产物。</span></div>\n  </div>\n</div>"
            },
            {
                title: "第6章：CI框架与容器",
                q: "请简述传统持续集成框架和持续集成容器的区别。",
                tip: "<b>记忆口诀：【容器轻快开销小，环境一致免烦恼】</b>",
                a: "<div class='sa-list'>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>开销</span>\n    <div class='sa-content'><b class='sa-title'>启动与开销</b>：<span class='sa-desc'>传统机启动慢资源大；容器(Docker)毫秒级启动资源小。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>环境</span>\n    <div class='sa-content'><b class='sa-title'>环境一致性</b>：<span class='sa-desc'>传统机容易被弄脏；容器基于纯净镜像，保证环境绝对一致。</span></div>\n  </div>\n</div>"
            },
            {
                title: "第6章：自动化测试技术",
                q: "请简述自动化测试使用的技术。",
                tip: "<b>记忆口诀：【录制回放脚本基，数关驱动显威力】</b>",
                a: "<div class='sa-list'>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>录放</span>\n    <div class='sa-content'><b class='sa-title'>录制与回放</b>：<span class='sa-desc'>录下操作并回放，简单但极难维护。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>脚</span>\n    <div class='sa-content'><b class='sa-title'>脚本技术</b>：<span class='sa-desc'>包含线性、结构化(加控制流)、共享(函数复用)等。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>数</span>\n    <div class='sa-content'><b class='sa-title'>数据驱动</b>：<span class='sa-desc'>DDT：数据和代码解耦，读取文件数据跑批量。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>关</span>\n    <div class='sa-content'><b class='sa-title'>关键字驱动</b>：<span class='sa-desc'>KDT：操作封装成表格，不写代码直接填表测试。</span></div>\n  </div>\n</div>"
            },
            {
                title: "第7章：移动App测试差异",
                q: "什么是移动App？与传统软件测试的区别是什么？",
                tip: "<b>记忆口诀：【网专交海适配全，移动测试非一般】</b>",
                a: "<div class='sa-list'>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>定</span>\n    <div class='sa-content'><b class='sa-title'>定义</b>：<span class='sa-desc'>运行在智能手机、平板等移动终端上的应用软件。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>专</span>\n    <div class='sa-content'><b class='sa-title'>专项性能</b>：<span class='sa-desc'>需特别监控电池电量、移动数据流量的消耗。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>网</span>\n    <div class='sa-content'><b class='sa-title'>网络多变</b>：<span class='sa-desc'>要模拟 Wi-Fi/4G/5G 切换、断网弱网及丢包限速。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>交</span>\n    <div class='sa-content'><b class='sa-title'>交叉中断</b>：<span class='sa-desc'>测试使用中遇到电话、短信、低电弹窗的自愈表现。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>海</span>\n    <div class='sa-content'><b class='sa-title'>海量兼容</b>：<span class='sa-desc'>适配各种魔改系统版本及各异的手机分辨率。</span></div>\n  </div>\n</div>"
            },
            {
                title: "第7章：移动App专项测试",
                q: "请简述移动App的专项测试都有哪些。",
                tip: "<b>记忆口诀：【网流中断测性能，安全升级要分明】</b>",
                a: "<div class='sa-list'>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>网</span>\n    <div class='sa-content'><b class='sa-title'>网络测试</b>：<span class='sa-desc'>弱网/丢包/网络切换测试。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>容</span>\n    <div class='sa-content'><b class='sa-title'>兼容测试</b>：<span class='sa-desc'>海量系统版本及不同分辨率屏幕的兼容性测试。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>中</span>\n    <div class='sa-content'><b class='sa-title'>中断测试</b>：<span class='sa-desc'>来电、短信等外部中断事件测试。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>能</span>\n    <div class='sa-content'><b class='sa-title'>性能专项</b>：<span class='sa-desc'>电量、流量、冷启动、内存CPU等消耗专项。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>安</span>\n    <div class='sa-content'><b class='sa-title'>安全权限</b>：<span class='sa-desc'>敏感数据存储、应用权限调用检测。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>升</span>\n    <div class='sa-content'><b class='sa-title'>安装升级</b>：<span class='sa-desc'>干净安装、卸载及覆盖升级测试。</span></div>\n  </div>\n</div>"
            }
        ]
    }
,

    linux_quiz: {
        id: "linux_quiz",
        title: "Linux：基础与应用通关",
        subtitle: "专业课选择/判断自测 · 答错显示记忆口诀",
        themeColor: "emerald",
        type: "article",
        url: "linux/linux_quiz.html?v=1.4",
        cards: []
    },

    linux_short_answers: {
        id: "linux_short_answers",
        title: "Linux：核心简答与讨论",
        subtitle: "基础原理与运维安全要点",
        themeColor: "emerald",
        type: "flashcard",
        cards: [
            {
                q: "请简述Linux操作系统相比于Windows和macOS的主要优势与劣势。",
                tip: "<b>记忆口诀：【开源剪裁命令行，生态学习两堵墙】</b>",
                a: "<div class='flex flex-col gap-3 text-left text-[0.95rem] leading-relaxed'>\n  <div class='flex items-start gap-2.5'>\n    <span class='shrink-0 mt-0.5 w-8 h-6 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-xs border border-emerald-200 shadow-sm leading-none pt-0.5 px-1'>开</span>\n    <div><b class='text-slate-700'>开源免费</b>：<span class='text-slate-500'>源码开放，可自由修改与定制，无高昂授权费。</span></div>\n  </div>\n  <div class='flex items-start gap-2.5'>\n    <span class='shrink-0 mt-0.5 w-8 h-6 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-xs border border-emerald-200 shadow-sm leading-none pt-0.5 px-1'>定</span>\n    <div><b class='text-slate-700'>高度定制</b>：<span class='text-slate-500'>可深度裁剪，适合从嵌入式到超算的各类场景。</span></div>\n  </div>\n  <div class='flex items-start gap-2.5'>\n    <span class='shrink-0 mt-0.5 w-8 h-6 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-xs border border-emerald-200 shadow-sm leading-none pt-0.5 px-1'>命</span>\n    <div><b class='text-slate-700'>命令行强</b>：<span class='text-slate-500'>CLI极其强大，非常适合自动化运维与脚本编程。</span></div>\n  </div>\n  <div class='flex items-start gap-2.5'>\n    <span class='shrink-0 mt-0.5 w-8 h-6 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-xs border border-emerald-200 shadow-sm leading-none pt-0.5 px-1'>缺生态</span>\n    <div><b class='text-slate-700'>软件生态弱</b>：<span class='text-slate-500'>劣势：桌面端商业软件（如Adobe系列、大型游戏）支持较少。</span></div>\n  </div>\n  <div class='flex items-start gap-2.5'>\n    <span class='shrink-0 mt-0.5 w-8 h-6 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-xs border border-emerald-200 shadow-sm leading-none pt-0.5 px-1'>缺易用</span>\n    <div><b class='text-slate-700'>学习门槛高</b>：<span class='text-slate-500'>劣势：对普通用户的图形化体验不如Windows/macOS直观。</span></div>\n  </div>\n</div>"
            },
            {
                q: "在Linux服务器上安装图形用户界面(GUI)有哪些优劣势？",
                tip: "<b>记忆口诀：【图形易用门槛低，耗资面广多危机】</b>",
                a: "<div class='flex flex-col gap-3 text-left text-[0.95rem] leading-relaxed'>\n  <div class='flex items-start gap-2.5'>\n    <span class='shrink-0 mt-0.5 w-8 h-6 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-xs border border-emerald-200 shadow-sm leading-none pt-0.5 px-1'>优易用</span>\n    <div><b class='text-slate-700'>降低门槛</b>：<span class='text-slate-500'>优势：图形化操作更直观，适合新手管理员或特定桌面软件环境。</span></div>\n  </div>\n  <div class='flex items-start gap-2.5'>\n    <span class='shrink-0 mt-0.5 w-8 h-6 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-xs border border-emerald-200 shadow-sm leading-none pt-0.5 px-1'>劣耗资</span>\n    <div><b class='text-slate-700'>资源开销大</b>：<span class='text-slate-500'>劣势：GUI组件会占用大量内存和CPU，降低服务器业务承载力。</span></div>\n  </div>\n  <div class='flex items-start gap-2.5'>\n    <span class='shrink-0 mt-0.5 w-8 h-6 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-xs border border-emerald-200 shadow-sm leading-none pt-0.5 px-1'>劣面广</span>\n    <div><b class='text-slate-700'>攻击面增加</b>：<span class='text-slate-500'>劣势：安装包增多导致潜在的安全漏洞增加，维护成本变高。</span></div>\n  </div>\n  <div class='flex items-start gap-2.5'>\n    <span class='shrink-0 mt-0.5 w-8 h-6 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-xs border border-emerald-200 shadow-sm leading-none pt-0.5 px-1'>劣维护</span>\n    <div><b class='text-slate-700'>维护复杂</b>：<span class='text-slate-500'>劣势：图形组件和依赖包增多，补丁、兼容性与故障排查成本都会上升，服务器通常推荐纯CLI环境。</span></div>\n  </div>\n</div>"
            },
            {
                q: "举例说明命令行在查看系统信息时的优势。",
                tip: "<b>记忆口诀：【快组远批，命令行里藏玄机】</b>",
                a: "<div class='flex flex-col gap-3 text-left text-[0.95rem] leading-relaxed'>\n  <div class='flex items-start gap-2.5'>\n    <span class='shrink-0 mt-0.5 w-8 h-6 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-xs border border-emerald-200 shadow-sm leading-none pt-0.5 px-1'>快</span>\n    <div><b class='text-slate-700'>响应极快</b>：<span class='text-slate-500'>无需加载图形界面，直接返回数据，如 `top` 命令瞬间显示资源。</span></div>\n  </div>\n  <div class='flex items-start gap-2.5'>\n    <span class='shrink-0 mt-0.5 w-8 h-6 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-xs border border-emerald-200 shadow-sm leading-none pt-0.5 px-1'>组</span>\n    <div><b class='text-slate-700'>组合强大</b>：<span class='text-slate-500'>通过管道符 `|` 可以将多个命令组合，如 `ps aux | grep nginx` 精准过滤。</span></div>\n  </div>\n  <div class='flex items-start gap-2.5'>\n    <span class='shrink-0 mt-0.5 w-8 h-6 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-xs border border-emerald-200 shadow-sm leading-none pt-0.5 px-1'>远</span>\n    <div><b class='text-slate-700'>远程低宽带</b>：<span class='text-slate-500'>SSH远程连接只需极低带宽即可流畅操作，不卡顿。</span></div>\n  </div>\n  <div class='flex items-start gap-2.5'>\n    <span class='shrink-0 mt-0.5 w-8 h-6 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-xs border border-emerald-200 shadow-sm leading-none pt-0.5 px-1'>批</span>\n    <div><b class='text-slate-700'>易于批处理</b>：<span class='text-slate-500'>能轻松将查询结果接入Shell脚本，实现自动化巡检与告警。</span></div>\n  </div>\n</div>"
            },
            {
                q: "快速修改配置文件(如/etc/hosts)时，Vim与Windows记事本的区别是什么？",
                tip: "<b>记忆口诀：【端权高批，Vim操作如飞】</b>",
                a: "<div class='flex flex-col gap-3 text-left text-[0.95rem] leading-relaxed'>\n  <div class='flex items-start gap-2.5'>\n    <span class='shrink-0 mt-0.5 w-8 h-6 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-xs border border-emerald-200 shadow-sm leading-none pt-0.5 px-1'>端</span>\n    <div><b class='text-slate-700'>终端直改</b>：<span class='text-slate-500'>许多Linux环境默认提供vi/vim，或可快速安装；可直接在终端修改，无需先下载到本地。</span></div>\n  </div>\n  <div class='flex items-start gap-2.5'>\n    <span class='shrink-0 mt-0.5 w-8 h-6 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-xs border border-emerald-200 shadow-sm leading-none pt-0.5 px-1'>权</span>\n    <div><b class='text-slate-700'>权限控制</b>：<span class='text-slate-500'>Vim可以直接配合 `sudo vim` 提权编辑系统文件，记事本难以处理Linux权限。</span></div>\n  </div>\n  <div class='flex items-start gap-2.5'>\n    <span class='shrink-0 mt-0.5 w-8 h-6 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-xs border border-emerald-200 shadow-sm leading-none pt-0.5 px-1'>高</span>\n    <div><b class='text-slate-700'>高效跳转</b>：<span class='text-slate-500'>Vim支持强大的快捷键（如 `G` 到末尾，`/` 搜索），无需鼠标拖拽。</span></div>\n  </div>\n  <div class='flex items-start gap-2.5'>\n    <span class='shrink-0 mt-0.5 w-8 h-6 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-xs border border-emerald-200 shadow-sm leading-none pt-0.5 px-1'>批</span>\n    <div><b class='text-slate-700'>批量替换</b>：<span class='text-slate-500'>Vim支持底线命令模式 `:s` 进行正则表达式级别的精准批量替换。</span></div>\n  </div>\n</div>"
            },
            {
                q: "部署符合等保2.0三级的openEuler用户管理系统，账户管理应采取哪些关键措施？",
                tip: "<b>记忆口诀：【最小密审权限分，多因认证筑安全】</b>",
                a: "<div class='flex flex-col gap-3 text-left text-[0.95rem] leading-relaxed'>\n  <div class='flex items-start gap-2.5'>\n    <span class='shrink-0 mt-0.5 w-8 h-6 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-xs border border-emerald-200 shadow-sm leading-none pt-0.5 px-1'>最小</span>\n    <div><b class='text-slate-700'>最小权限</b>：<span class='text-slate-500'>严格遵循最小权限原则，禁止多用户共享root账号。</span></div>\n  </div>\n  <div class='flex items-start gap-2.5'>\n    <span class='shrink-0 mt-0.5 w-8 h-6 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-xs border border-emerald-200 shadow-sm leading-none pt-0.5 px-1'>密</span>\n    <div><b class='text-slate-700'>密码策略</b>：<span class='text-slate-500'>结合 `login.defs`、PAM/pwquality 等配置强制密码复杂度、历史限制与定期修改周期（如90天）。</span></div>\n  </div>\n  <div class='flex items-start gap-2.5'>\n    <span class='shrink-0 mt-0.5 w-8 h-6 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-xs border border-emerald-200 shadow-sm leading-none pt-0.5 px-1'>审</span>\n    <div><b class='text-slate-700'>安全审计</b>：<span class='text-slate-500'>开启严格的登录日志审计（如监控 `/var/log/secure`）。</span></div>\n  </div>\n  <div class='flex items-start gap-2.5'>\n    <span class='shrink-0 mt-0.5 w-8 h-6 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-xs border border-emerald-200 shadow-sm leading-none pt-0.5 px-1'>权分</span>\n    <div><b class='text-slate-700'>权限分离</b>：<span class='text-slate-500'>使用 `sudo` 进行精细化授权，实现系统管理员、审计员和安全员三权分立。</span></div>\n  </div>\n  <div class='flex items-start gap-2.5'>\n    <span class='shrink-0 mt-0.5 w-8 h-6 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-xs border border-emerald-200 shadow-sm leading-none pt-0.5 px-1'>多因</span>\n    <div><b class='text-slate-700'>多因素认证</b>：<span class='text-slate-500'>对远程管理入口引入SSH密钥、密码与MFA等组合认证机制。</span></div>\n  </div>\n</div>"
            },
            {
                q: "建立符合ISO 27001标准的openEuler文件管理系统，权限管理及存储优化应采取哪些措施？",
                tip: "<b>记忆口诀：【精权加密冗快归，数据安全永相随】</b>",
                a: "<div class='flex flex-col gap-3 text-left text-[0.95rem] leading-relaxed'>\n  <div class='flex items-start gap-2.5'>\n    <span class='shrink-0 mt-0.5 w-8 h-6 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-xs border border-emerald-200 shadow-sm leading-none pt-0.5 px-1'>精权</span>\n    <div><b class='text-slate-700'>精细权限</b>：<span class='text-slate-500'>除基础 UGO 权限外，利用 ACL (`setfacl`) 实现细粒度的文件访问控制。</span></div>\n  </div>\n  <div class='flex items-start gap-2.5'>\n    <span class='shrink-0 mt-0.5 w-8 h-6 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-xs border border-emerald-200 shadow-sm leading-none pt-0.5 px-1'>主加</span>\n    <div><b class='text-slate-700'>加密存储</b>：<span class='text-slate-500'>对核心机密数据所在分区进行磁盘级加密（如 LUKS）防止物理窃取。</span></div>\n  </div>\n  <div class='flex items-start gap-2.5'>\n    <span class='shrink-0 mt-0.5 w-8 h-6 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-xs border border-emerald-200 shadow-sm leading-none pt-0.5 px-1'>冗</span>\n    <div><b class='text-slate-700'>数据冗余</b>：<span class='text-slate-500'>根据业务重要性选择 RAID1/5/6/10 等方案提供冗余容错，避免把RAID0误当作冗余方案。</span></div>\n  </div>\n  <div class='flex items-start gap-2.5'>\n    <span class='shrink-0 mt-0.5 w-8 h-6 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-xs border border-emerald-200 shadow-sm leading-none pt-0.5 px-1'>快</span>\n    <div><b class='text-slate-700'>定期快照</b>：<span class='text-slate-500'>利用 LVM 快照或支持快照的文件系统/备份系统定期保护关键数据；XFS本身不提供原生快照。</span></div>\n  </div>\n  <div class='flex items-start gap-2.5'>\n    <span class='shrink-0 mt-0.5 w-8 h-6 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-xs border border-emerald-200 shadow-sm leading-none pt-0.5 px-1'>归</span>\n    <div><b class='text-slate-700'>日志归档</b>：<span class='text-slate-500'>严格控制文件修改权限，并使用审计系统(Auditd)记录所有敏感文件的读写日志。</span></div>\n  </div>\n</div>"
            }
        ]
    },

    linux_quiz: {
        id: "linux_quiz",
        title: "Linux：基础与应用通关",
        subtitle: "八大模块核心考点（选择/判断）",
        themeColor: "emerald",
        type: "article",
        url: "linux/linux_quiz.html?v=1.3",
        cards: []
    },

    linux_short_answers: {
        id: "linux_short_answers",
        title: "Linux：核心简答与讨论",
        subtitle: "基础原理与运维安全要点",
        themeColor: "emerald",
        type: "flashcard",
        cards: [
            {
                q: "请简述Linux操作系统相比于Windows和macOS的主要优势与劣势。",
                tip: "<b>记忆口诀：【开源剪裁命令行，生态学习两堵墙】</b>",
                a: "<div class='sa-list'>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>开</span>\n    <div class='sa-content'><b class='sa-title'>开源免费</b>：<span class='sa-desc'>源码开放，可自由修改与定制，无高昂授权费。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>定</span>\n    <div class='sa-content'><b class='sa-title'>高度定制</b>：<span class='sa-desc'>可深度裁剪，适合从嵌入式到超算的各类场景。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>命</span>\n    <div class='sa-content'><b class='sa-title'>命令行强</b>：<span class='sa-desc'>CLI极其强大，非常适合自动化运维与脚本编程。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>缺生态</span>\n    <div class='sa-content'><b class='sa-title'>软件生态弱</b>：<span class='sa-desc'>劣势：桌面端商业软件（如Adobe系列、大型游戏）支持较少。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>缺易用</span>\n    <div class='sa-content'><b class='sa-title'>学习门槛高</b>：<span class='sa-desc'>劣势：对普通用户的图形化体验不如Windows/macOS直观。</span></div>\n  </div>\n</div>"
            },
            {
                q: "在Linux服务器上安装图形用户界面(GUI)有哪些优劣势？",
                tip: "<b>记忆口诀：【图形易用门槛低，耗资面广多危机】</b>",
                a: "<div class='sa-list'>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>优易用</span>\n    <div class='sa-content'><b class='sa-title'>降低门槛</b>：<span class='sa-desc'>优势：图形化操作更直观，适合新手管理员或特定桌面软件环境。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>劣耗资</span>\n    <div class='sa-content'><b class='sa-title'>资源开销大</b>：<span class='sa-desc'>劣势：GUI组件会占用大量内存和CPU，降低服务器业务承载力。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>劣面广</span>\n    <div class='sa-content'><b class='sa-title'>攻击面增加</b>：<span class='sa-desc'>劣势：安装包增多导致潜在的安全漏洞增加，维护成本变高。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>劣维护</span>\n    <div class='sa-content'><b class='sa-title'>维护复杂</b>：<span class='sa-desc'>劣势：图形组件和依赖包增多，补丁、兼容性与故障排查成本都会上升，服务器通常推荐纯CLI环境。</span></div>\n  </div>\n</div>"
            },
            {
                q: "举例说明命令行在查看系统信息时的优势。",
                tip: "<b>记忆口诀：【快组远批，命令行里藏玄机】</b>",
                a: "<div class='sa-list'>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>快</span>\n    <div class='sa-content'><b class='sa-title'>响应极快</b>：<span class='sa-desc'>无需加载图形界面，直接返回数据，如 `top` 命令瞬间显示资源。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>组</span>\n    <div class='sa-content'><b class='sa-title'>组合强大</b>：<span class='sa-desc'>通过管道符 `|` 可以将多个命令组合，如 `ps aux | grep nginx` 精准过滤。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>远</span>\n    <div class='sa-content'><b class='sa-title'>远程低宽带</b>：<span class='sa-desc'>SSH远程连接只需极低带宽即可流畅操作，不卡顿。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>批</span>\n    <div class='sa-content'><b class='sa-title'>易于批处理</b>：<span class='sa-desc'>能轻松将查询结果接入Shell脚本，实现自动化巡检与告警。</span></div>\n  </div>\n</div>"
            },
            {
                q: "快速修改配置文件(如/etc/hosts)时，Vim与Windows记事本的区别是什么？",
                tip: "<b>记忆口诀：【端权高批，Vim操作如飞】</b>",
                a: "<div class='sa-list'>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>端</span>\n    <div class='sa-content'><b class='sa-title'>终端直改</b>：<span class='sa-desc'>许多Linux环境默认提供vi/vim，或可快速安装；可直接在终端修改，无需先下载到本地。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>权</span>\n    <div class='sa-content'><b class='sa-title'>权限控制</b>：<span class='sa-desc'>Vim可以直接配合 `sudo vim` 提权编辑系统文件，记事本难以处理Linux权限。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>高</span>\n    <div class='sa-content'><b class='sa-title'>高效跳转</b>：<span class='sa-desc'>Vim支持强大的快捷键（如 `G` 到末尾，`/` 搜索），无需鼠标拖拽。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>批</span>\n    <div class='sa-content'><b class='sa-title'>批量替换</b>：<span class='sa-desc'>Vim支持底线命令模式 `:s` 进行正则表达式级别的精准批量替换。</span></div>\n  </div>\n</div>"
            },
            {
                q: "部署符合等保2.0三级的openEuler用户管理系统，账户管理应采取哪些关键措施？",
                tip: "<b>记忆口诀：【最小密审权限分，多因认证筑安全】</b>",
                a: "<div class='sa-list'>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>最小</span>\n    <div class='sa-content'><b class='sa-title'>最小权限</b>：<span class='sa-desc'>严格遵循最小权限原则，禁止多用户共享root账号。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>密</span>\n    <div class='sa-content'><b class='sa-title'>密码策略</b>：<span class='sa-desc'>结合 `login.defs`、PAM/pwquality 等配置强制密码复杂度、历史限制与定期修改周期（如90天）。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>审</span>\n    <div class='sa-content'><b class='sa-title'>安全审计</b>：<span class='sa-desc'>开启严格的登录日志审计（如监控 `/var/log/secure`）。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>权分</span>\n    <div class='sa-content'><b class='sa-title'>权限分离</b>：<span class='sa-desc'>使用 `sudo` 进行精细化授权，实现系统管理员、审计员和安全员三权分立。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>多因</span>\n    <div class='sa-content'><b class='sa-title'>多因素认证</b>：<span class='sa-desc'>对远程管理入口引入SSH密钥、密码与MFA等组合认证机制。</span></div>\n  </div>\n</div>"
            },
            {
                q: "建立符合ISO 27001标准的openEuler文件管理系统，权限管理及存储优化应采取哪些措施？",
                tip: "<b>记忆口诀：【精权加密冗快归，数据安全永相随】</b>",
                a: "<div class='sa-list'>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>精权</span>\n    <div class='sa-content'><b class='sa-title'>精细权限</b>：<span class='sa-desc'>除基础 UGO 权限外，利用 ACL (`setfacl`) 实现细粒度的文件访问控制。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>主加</span>\n    <div class='sa-content'><b class='sa-title'>加密存储</b>：<span class='sa-desc'>对核心机密数据所在分区进行磁盘级加密（如 LUKS）防止物理窃取。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>冗</span>\n    <div class='sa-content'><b class='sa-title'>数据冗余</b>：<span class='sa-desc'>根据业务重要性选择 RAID1/5/6/10 等方案提供冗余容错，避免把RAID0误当作冗余方案。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>快</span>\n    <div class='sa-content'><b class='sa-title'>定期快照</b>：<span class='sa-desc'>利用 LVM 快照或支持快照的文件系统/备份系统定期保护关键数据；XFS本身不提供原生快照。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>归</span>\n    <div class='sa-content'><b class='sa-title'>日志归档</b>：<span class='sa-desc'>严格控制文件修改权限，并使用审计系统(Auditd)记录所有敏感文件的读写日志。</span></div>\n  </div>\n</div>"
            }
        ]
    }
,

    linux_quiz: {
        id: "linux_quiz",
        title: "Linux：基础与应用通关",
        subtitle: "八大模块核心考点（选择/判断）",
        themeColor: "emerald",
        type: "article",
        url: "linux/linux_quiz.html?v=1.3",
        cards: []
    },

    linux_short_answers: {
        id: "linux_short_answers",
        title: "Linux：核心简答与讨论",
        subtitle: "基础原理与运维安全要点",
        themeColor: "emerald",
        type: "flashcard",
        cards: [
            {
                q: "请简述Linux操作系统相比于Windows和macOS的主要优势与劣势。",
                tip: "<b>记忆口诀：【开源剪裁命令行，生态学习两堵墙】</b>",
                a: "<div class='sa-list'>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>开</span>\n    <div class='sa-content'><b class='sa-title'>开源免费</b>：<span class='sa-desc'>源码开放，可自由修改与定制，无高昂授权费。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>定</span>\n    <div class='sa-content'><b class='sa-title'>高度定制</b>：<span class='sa-desc'>可深度裁剪，适合从嵌入式到超算的各类场景。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>命</span>\n    <div class='sa-content'><b class='sa-title'>命令行强</b>：<span class='sa-desc'>CLI极其强大，非常适合自动化运维与脚本编程。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>缺生态</span>\n    <div class='sa-content'><b class='sa-title'>软件生态弱</b>：<span class='sa-desc'>劣势：桌面端商业软件（如Adobe系列、大型游戏）支持较少。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>缺易用</span>\n    <div class='sa-content'><b class='sa-title'>学习门槛高</b>：<span class='sa-desc'>劣势：对普通用户的图形化体验不如Windows/macOS直观。</span></div>\n  </div>\n</div>"
            },
            {
                q: "在Linux服务器上安装图形用户界面(GUI)有哪些优劣势？",
                tip: "<b>记忆口诀：【图形易用门槛低，耗资面广多危机】</b>",
                a: "<div class='sa-list'>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>优易用</span>\n    <div class='sa-content'><b class='sa-title'>降低门槛</b>：<span class='sa-desc'>优势：图形化操作更直观，适合新手管理员或特定桌面软件环境。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>劣耗资</span>\n    <div class='sa-content'><b class='sa-title'>资源开销大</b>：<span class='sa-desc'>劣势：GUI组件会占用大量内存和CPU，降低服务器业务承载力。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>劣面广</span>\n    <div class='sa-content'><b class='sa-title'>攻击面增加</b>：<span class='sa-desc'>劣势：安装包增多导致潜在的安全漏洞增加，维护成本变高。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>劣维护</span>\n    <div class='sa-content'><b class='sa-title'>维护复杂</b>：<span class='sa-desc'>劣势：图形组件和依赖包增多，补丁、兼容性与故障排查成本都会上升，服务器通常推荐纯CLI环境。</span></div>\n  </div>\n</div>"
            },
            {
                q: "举例说明命令行在查看系统信息时的优势。",
                tip: "<b>记忆口诀：【快组远批，命令行里藏玄机】</b>",
                a: "<div class='sa-list'>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>快</span>\n    <div class='sa-content'><b class='sa-title'>响应极快</b>：<span class='sa-desc'>无需加载图形界面，直接返回数据，如 `top` 命令瞬间显示资源。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>组</span>\n    <div class='sa-content'><b class='sa-title'>组合强大</b>：<span class='sa-desc'>通过管道符 `|` 可以将多个命令组合，如 `ps aux | grep nginx` 精准过滤。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>远</span>\n    <div class='sa-content'><b class='sa-title'>远程低宽带</b>：<span class='sa-desc'>SSH远程连接只需极低带宽即可流畅操作，不卡顿。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>批</span>\n    <div class='sa-content'><b class='sa-title'>易于批处理</b>：<span class='sa-desc'>能轻松将查询结果接入Shell脚本，实现自动化巡检与告警。</span></div>\n  </div>\n</div>"
            },
            {
                q: "快速修改配置文件(如/etc/hosts)时，Vim与Windows记事本的区别是什么？",
                tip: "<b>记忆口诀：【端权高批，Vim操作如飞】</b>",
                a: "<div class='sa-list'>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>端</span>\n    <div class='sa-content'><b class='sa-title'>终端直改</b>：<span class='sa-desc'>许多Linux环境默认提供vi/vim，或可快速安装；可直接在终端修改，无需先下载到本地。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>权</span>\n    <div class='sa-content'><b class='sa-title'>权限控制</b>：<span class='sa-desc'>Vim可以直接配合 `sudo vim` 提权编辑系统文件，记事本难以处理Linux权限。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>高</span>\n    <div class='sa-content'><b class='sa-title'>高效跳转</b>：<span class='sa-desc'>Vim支持强大的快捷键（如 `G` 到末尾，`/` 搜索），无需鼠标拖拽。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>批</span>\n    <div class='sa-content'><b class='sa-title'>批量替换</b>：<span class='sa-desc'>Vim支持底线命令模式 `:s` 进行正则表达式级别的精准批量替换。</span></div>\n  </div>\n</div>"
            },
            {
                q: "部署符合等保2.0三级的openEuler用户管理系统，账户管理应采取哪些关键措施？",
                tip: "<b>记忆口诀：【最小密审权限分，多因认证筑安全】</b>",
                a: "<div class='sa-list'>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>最小</span>\n    <div class='sa-content'><b class='sa-title'>最小权限</b>：<span class='sa-desc'>严格遵循最小权限原则，禁止多用户共享root账号。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>密</span>\n    <div class='sa-content'><b class='sa-title'>密码策略</b>：<span class='sa-desc'>结合 `login.defs`、PAM/pwquality 等配置强制密码复杂度、历史限制与定期修改周期（如90天）。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>审</span>\n    <div class='sa-content'><b class='sa-title'>安全审计</b>：<span class='sa-desc'>开启严格的登录日志审计（如监控 `/var/log/secure`）。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>权分</span>\n    <div class='sa-content'><b class='sa-title'>权限分离</b>：<span class='sa-desc'>使用 `sudo` 进行精细化授权，实现系统管理员、审计员和安全员三权分立。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>多因</span>\n    <div class='sa-content'><b class='sa-title'>多因素认证</b>：<span class='sa-desc'>对远程管理入口引入SSH密钥、密码与MFA等组合认证机制。</span></div>\n  </div>\n</div>"
            },
            {
                q: "建立符合ISO 27001标准的openEuler文件管理系统，权限管理及存储优化应采取哪些措施？",
                tip: "<b>记忆口诀：【精权加密冗快归，数据安全永相随】</b>",
                a: "<div class='sa-list'>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>精权</span>\n    <div class='sa-content'><b class='sa-title'>精细权限</b>：<span class='sa-desc'>除基础 UGO 权限外，利用 ACL (`setfacl`) 实现细粒度的文件访问控制。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>主加</span>\n    <div class='sa-content'><b class='sa-title'>加密存储</b>：<span class='sa-desc'>对核心机密数据所在分区进行磁盘级加密（如 LUKS）防止物理窃取。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>冗</span>\n    <div class='sa-content'><b class='sa-title'>数据冗余</b>：<span class='sa-desc'>根据业务重要性选择 RAID1/5/6/10 等方案提供冗余容错，避免把RAID0误当作冗余方案。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>快</span>\n    <div class='sa-content'><b class='sa-title'>定期快照</b>：<span class='sa-desc'>利用 LVM 快照或支持快照的文件系统/备份系统定期保护关键数据；XFS本身不提供原生快照。</span></div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>归</span>\n    <div class='sa-content'><b class='sa-title'>日志归档</b>：<span class='sa-desc'>严格控制文件修改权限，并使用审计系统(Auditd)记录所有敏感文件的读写日志。</span></div>\n  </div>\n</div>"
            }
        ]
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
            appData.integral_formulas,
            appData.differential_substitution,
            appData.trig_formula_suite,
            appData.algebra_formula_suite,
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
            appData.c_loop_advanced,
            appData.c_array1,
            appData.c_array2,
            appData.c_func1,
            appData.c_func2,
            appData.c_pointer1,
            appData.c_pointer_adv1,
            appData.c_pointer_adv2,
            appData.c_string,
            appData.c_struct
        ]
    },
    {
        categoryTitle: "📝 考研英语",
        categoryId: "english",
        categoryBorder: "border-indigo-500",
        items: [
            appData.english_grammar,
            appData.english_grammar_ext,
            appData.english_grammar_upgrade,
            appData.english_grammar_parallel,
            appData.english_grammar_object_clause,
            appData.english_grammar_noun_clause,
            appData.english_grammar_relative_clause
        ]
    },
    {
        categoryTitle: "🗃️ 数据结构",
        categoryId: "data-structure",
        categoryBorder: "border-amber-500",
        items: [
            appData.ds_seq_list,
            appData.ds_singly_list,
            appData.ds_doubly_list,
            appData.ds_linear_supplement
        ]
    },
    {
        categoryTitle: "🧱 专业课",
        categoryId: "major",
        categoryBorder: "border-fuchsia-500",
        items: [
            {
                id: "linux_course",
                title: "Linux 运维管理",
                subtitle: "选择与简答双轨通关",
                themeColor: "emerald",
                type: "course",
                examTime: "2026-06-24T16:10:00+08:00",
                quiz: appData.linux_quiz,
                flashcard: appData.linux_short_answers
            },
            {
                id: "se_course",
                title: "软件测试与工程",
                subtitle: "选择与简答双轨通关",
                themeColor: "fuchsia",
                type: "course",
                examTime: "2026-06-30T08:50:00+08:00",
                quiz: appData.se_quiz,
                flashcard: appData.se_short_answers
            },
            {
                id: "wx_course",
                title: "微信小程序开发",
                subtitle: "选择与简答双轨通关",
                themeColor: "emerald",
                type: "course",
                examTime: "2026-06-30T14:00:00+08:00",
                quiz: appData.wx_quiz,
                flashcard: appData.wx_short_answers
            },
            {
                id: "ai_course",
                title: "人工智能导论",
                subtitle: "选择与简答双轨通关",
                themeColor: "indigo",
                type: "course",
                examTime: "2026-06-26T19:00:00+08:00",
                quiz: appData.ai_quiz,
                flashcard: appData.ai_short_answers
            }
        ]
    }
];

// ====================================================
// 首页目录修正与新增讲义挂载
// ====================================================
(function normalizeCatalogForReviewHome() {
    Object.assign(appData, {
        c_pointer_adv1: {
            id: "c_pointer_adv1",
            title: "C语言：指针进阶（上）",
            subtitle: "指针数组、数组指针与函数指针",
            themeColor: "emerald",
            type: "article",
            url: "c/指针高级1.html",
            cards: []
        },
        c_dynamic_memory: {
            id: "c_dynamic_memory",
            title: "C语言：动态内存分配",
            subtitle: "malloc/free 与内存生命周期",
            themeColor: "emerald",
            type: "article",
            url: "c/动态内存分配.html",
            cards: []
        },
        c_union: {
            id: "c_union",
            title: "C语言：联合体",
            subtitle: "union 共享存储与类型辨析",
            themeColor: "emerald",
            type: "article",
            url: "c/联合体.html",
            cards: []
        },
        c_file: {
            id: "c_file",
            title: "C语言：文件操作",
            subtitle: "文件读写、定位与错误处理",
            themeColor: "emerald",
            type: "article",
            url: "c/文件.html",
            cards: []
        },
        ai_quiz: {
            id: "ai_quiz",
            title: "人工智能：客观自测通关",
            subtitle: "选择与判断 70 题 · 答错显示记忆口诀",
            themeColor: "indigo",
            type: "article",
            url: "ai/ai_quiz.html?v=1.0",
            cards: []
        },
        ai_short_answers: {
            id: "ai_short_answers",
            title: "人工智能：核心简答闪卡",
            subtitle: "1-2章核心简答 · 口诀化拆解",
            themeColor: "indigo",
            type: "flashcard",
            cards: [
                {
                    title: "AI 发展的三个主要阶段",
                    q: "简述 AI 发展历程中的三个主要阶段及代表技术或事件。",
                    tip: "<b>记忆口诀：【诞生探索达特麦，专家寒冬限制窄，深度大模爆发快】</b>",
                    a: `<div class='sa-list'>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-sky'>诞</span>\n    <div class='sa-content'>\n      <b class='sa-title'>诞生与早期探索 (1950s-1970s)</b>：\n      <span class='sa-desc'>代表性事件是达特茅斯会议和早期逻辑推理程序的出现。</span>\n    </div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-amber'>冬</span>\n    <div class='sa-content'>\n      <b class='sa-title'>专家系统与低谷期 (1980s-1990s)</b>：\n      <span class='sa-desc'>专家系统在特定领域取得部分成功，但受限于算力和数据，AI经历“寒冬”。</span>\n    </div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>爆</span>\n    <div class='sa-content'>\n      <b class='sa-title'>深度学习与大模型 (2010s至今)</b>：\n      <span class='sa-desc'>算力提升和大数据兴起，AlphaGo击败李世石、Transformer提出、ChatGPT和DeepSeek等爆发式增长。</span>\n    </div>\n  </div>\n</div>`
                },
                {
                    title: "DeepSeek 三大领域合理应用",
                    q: "请列举 DeepSeek 大模型在三个不同领域的具体应用及具体作用。",
                    tip: "<b>记忆口诀：【客服全天轻负担，医疗辅助提诊限，内容创作灵感现】</b>",
                    a: `<div class='sa-list'>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-sky'>客</span>\n    <div class='sa-content'>\n      <b class='sa-title'>客户服务与支持</b>：\n      <span class='sa-desc'>用作智能客服，24小时在线自动回答常见问题，有效减轻人工客服负担，提升响应速度。</span>\n    </div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-rose'>医</span>\n    <div class='sa-content'>\n      <b class='sa-title'>医疗与健康</b>：\n      <span class='sa-desc'>辅助医生快速查阅和总结医学文献，解读病历信息，提供用药建议参考，提高诊疗效率。</span>\n    </div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-fuchsia'>创</span>\n    <div class='sa-content'>\n      <b class='sa-title'>内容创作与媒体</b>：\n      <span class='sa-desc'>辅助撰写新闻稿、生成营销文案、创作诗歌小说，帮助创作者提高生产效率，激发创意灵感。</span>\n    </div>\n  </div>\n</div>`
                },
                {
                    title: "微调与知识库的区别",
                    q: "简述“模型微调”与“本地知识库”实现本地化应用时的区别及各自场景。",
                    tip: "<b>记忆口诀：【微调改变权重参，外挂知识随时翻；微调固定改风格，外挂灵活隐私安】</b>",
                    a: `<div class='sa-list'>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-violet'>调</span>\n    <div class='sa-content'>\n      <b class='sa-title'>模型微调 (Fine-tuning)</b>：\n      <span class='sa-desc'><b>机制：</b>在预训练模型基础上使用行业标注数据继续训练，永久性更新模型权重参数。<b>场景：</b>适合长期、固定风格的任务需求，但需要高算力与大量标注数据。</span>\n    </div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>库</span>\n    <div class='sa-content'>\n      <b class='sa-title'>本地知识库 (RAG)</b>：\n      <span class='sa-desc'><b>机制：</b>将私有文档向量化，用户提问时检索相关片段作为上下文输入给大模型，不改变模型参数。<b>场景：</b>适合动态变化的私有数据场景，实现成本低，更新灵活。</span>\n    </div>\n  </div>\n</div>`
                },
                {
                    title: "图像 AIGC 提示词设计要素",
                    q: "设计“秋天银杏大道汉服少女”提示词并说明其包含的关键要素。",
                    tip: "<b>记忆口诀：【主景风构四要素，提示精细图不虚】</b>",
                    a: `<div class='sa-list'>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-rose'>主</span>\n    <div class='sa-content'>\n      <b class='sa-title'>主体描述明确</b>：\n      <span class='sa-desc'>人物（少女）、服饰（红色齐胸襦裙汉服）和动作（撑着淡黄色的油纸伞，缓步走在落叶上）。</span>\n    </div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-amber'>景</span>\n    <div class='sa-content'>\n      <b class='sa-title'>场景与环境细节</b>：\n      <span class='sa-desc'>地点（一条笔直的银杏大道）、季节（秋天）、地面状态（满地铺满金黄落叶）和光线（阳光透过树叶洒下斑驳光影）。</span>\n    </div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-violet'>风</span>\n    <div class='sa-content'>\n      <b class='sa-title'>风格与画质要求</b>：\n      <span class='sa-desc'>明确使用质量控制词，如“唯美”“电影质感”“4k”“超高分辨率”。</span>\n    </div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-sky'>构</span>\n    <div class='sa-content'>\n      <b class='sa-title'>构图与视觉效果</b>：\n      <span class='sa-desc'>镜头感塑造，如“背景虚化”“斑驳的光影”。</span>\n    </div>\n  </div>\n</div>`
                },
                {
                    title: "AI 销售数据分析步骤",
                    q: "简述利用 AI 表格分析销售数据表并生成趋势分析报告的具体步骤。",
                    tip: "<b>记忆口诀：【导入公式分析趋势，撰写报告人工审】</b>",
                    a: `<div class='sa-list'>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-sky'>导</span>\n    <div class='sa-content'>\n      <b class='sa-title'>第一步：导入规范</b>：\n      <span class='sa-desc'>将销售数据导入表格软件中，确保结构规范（包含日期、产品、销量、销售额等关键字段）。</span>\n    </div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-amber'>式</span>\n    <div class='sa-content'>\n      <b class='sa-title'>第二步：公式生成</b>：\n      <span class='sa-desc'>用自然语言指令（如“计算每月销售总额”）使 AI 自动识别数据范围并生成 SUMIF 或数据透视表公式。</span>\n    </div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-rose'>势</span>\n    <div class='sa-content'>\n      <b class='sa-title'>第三步：数据趋势分析</b>：\n      <span class='sa-desc'>提问 AI（如“哪个月销售最高”或“销售额趋势是上升还是下降”），AI 基于数据分析给出结论。</span>\n    </div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-violet'>文</span>\n    <div class='sa-content'>\n      <b class='sa-title'>第四步：撰写报告</b>：\n      <span class='sa-desc'>使用 DeepSeek 等文本工具生成包含数据概况、关键发现、趋势判断 and 改进建议的分析报告。</span>\n    </div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>审</span>\n    <div class='sa-content'>\n      <b class='sa-title'>第五步：人工审核</b>：\n      <span class='sa-desc'>对生成的报告进行人工审核和必要修改，确保关键数据和结论准确。</span>\n    </div>\n  </div>\n</div>`
                },
                {
                    title: "图书馆问答案例分析",
                    q: "分析图书馆智能问答：(1)用知识库理由；(2)系统流程；(3)如何防幻觉。",
                    tip: "<b>记忆口诀：【防幻实时用外挂，向量检索大模答，溯源约束防偏差】</b>",
                    a: `<div class='sa-list'>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-rose'>由</span>\n    <div class='sa-content'>\n      <b class='sa-title'>(1) 为什么使用“本地知识库”</b>：\n      <span class='sa-desc'>① 大模型没学过该图书馆私有数据（如具体馆藏分布、借阅规则），直接回答会产生严重幻觉编造规则；② 图书馆信息经常调整（如开馆时间、借阅限制），大模型知识是静态的无法更新，而知识库可随时动态修改。</span>\n    </div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-sky'>流</span>\n    <div class='sa-content'>\n      <b class='sa-title'>(2) 基于知识库的大模型工作流程</b>：\n      <span class='sa-desc'>用户提问 $\rightarrow$ 问题转向量 $\rightarrow$ 本地检索匹配得到最相关FAQ/规则文本片段 $\rightarrow$ 拼接相关片段、原始问题和约束指令组装成 Prompt $\rightarrow$ 提示词发给大模型归纳生成基于事实的答案 $\rightarrow$ 返回答案及出处片段。</span>\n    </div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>防</span>\n    <div class='sa-content'>\n      <b class='sa-title'>(3) 避免大模型幻觉的具体措施</b>：\n      <span class='sa-desc'>① 提示词明确硬性约束范围：“只能根据以下知识库内容回答，没有相关信息明确回答找不到，绝不编造”；② 建立答案溯源，强制输出出处引用供交叉检验；③ 专人定期对知识库文档做修正和抽样质检。</span>\n    </div>\n  </div>\n</div>`
                },
                {
                    title: "历史人物自媒体短片方案",
                    q: "针对自媒体制作：(1)推荐国内工具；(2)保持面部一致性；(3)语音克隆与伦理。",
                    tip: "<b>记忆口诀：【文本图像配音具，图生图与Cref齐，克隆声音需授权】</b>",
                    a: `<div class='sa-list'>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-sky'>具</span>\n    <div class='sa-content'>\n      <b class='sa-title'>(1) 推荐国内 AIGC 工具</b>：\n      <span class='sa-desc'>① 脚本：用 DeepSeek/文心一言；② 绘图：用 通义万相/文心一格；③ 配音：用 腾讯智影/讯飞配音。</span>\n    </div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-amber'>同</span>\n    <div class='sa-content'>\n      <b class='sa-title'>(2) 保证图像历史人物长相一致性</b>：\n      <span class='sa-desc'>① “图生图”模式用首张李白图做参考图输入生成后续；② 在提示词中固定外观细节（如衣着面部特征），并每次使用相同随机种子（Seed）；③ 提取多角度照片训练专有的角色一致性小模型。</span>\n    </div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-rose'>克</span>\n    <div class='sa-content'>\n      <b class='sa-title'>(3) 语音克隆推荐与伦理问题</b>：\n      <span class='sa-desc'>① 推荐米可智能或讯飞星火语音复刻。② 伦理：必须获得被克隆人书面声学授权；视频须透明显著标注 AI 声音避免误导；绝不能用于伪造发言、名人虚假代言或反欺诈。</span>\n    </div>\n  </div>\n</div>`
                },
                {
                    title: "RAG 基本原理及其作用",
                    q: "简述 RAG (检索增强生成) 的基本原理及在大模型应用中的作用。",
                    tip: "<b>记忆口诀：【检索参考模型答，幻觉大减实时刷】</b>",
                    a: `<div class='sa-list'>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-sky'>源</span>\n    <div class='sa-content'>\n      <b class='sa-title'>基本原理</b>：\n      <span class='sa-desc'>在回答前，系统先从外部数据库检索出与问题相关的文档片段，将其作为“背景参考资料”与用户提问一同喂给大模型归纳作答。</span>\n    </div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-emerald'>效</span>\n    <div class='sa-content'>\n      <b class='sa-title'>三大应用作用</b>：\n      <span class='sa-desc'>① 减少大模型“幻觉”现象，回答有据可查；② 无需重新训练即可动态实时更新模型的知识库；③ 可附带原文片段引用，增强可信度。</span>\n    </div>\n  </div>\n</div>`
                },
                {
                    title: "模型量化概念与部署作用",
                    q: "简述模型量化的概念，并说明它在本地部署大模型中的主要作用。",
                    tip: "<b>记忆口诀：【高精缩成低位整，省电省卡运行猛】</b>",
                    a: `<div class='sa-list'>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-violet'>质</span>\n    <div class='sa-content'>\n      <b class='sa-title'>模型量化概念</b>：\n      <span class='sa-desc'>将大模型参数中的高精度数值（如FP32/FP16浮点数）转换压缩为低精度数值（如INT8/INT4定点整数）的高效压缩技术。</span>\n    </div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-amber'>用</span>\n    <div class='sa-content'>\n      <b class='sa-title'>本地部署三大作用</b>：\n      <span class='sa-desc'>① 暴降显存占用和存储，家用电脑即可流畅承载原本昂贵的大模型；② 整数计算速度更迅捷，降低响应延迟；③ 减少硬件功耗，利于端侧边缘部署。</span>\n    </div>\n  </div>\n</div>`
                },
                {
                    title: "敦煌飞天壁画视频生成",
                    q: "敦煌飞天壁画视频生成：(1)推荐工具；(2)主要步骤；(3)技术困难及解决。",
                    tip: "<b>记忆口诀：【图生视频分步骤，分段首尾稳肢体】</b>",
                    a: `<div class='sa-list'>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-sky'>具</span>\n    <div class='sa-content'>\n      <b class='sa-title'>(1) 推荐工具</b>：\n      <span class='sa-desc'>推荐使用可灵 AI 或即梦 AI，它们在动态肢体动作渲染和物理稳定性方面具备国内顶尖表现。</span>\n    </div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-amber'>骤</span>\n    <div class='sa-content'>\n      <b class='sa-title'>(2) 制作主要步骤</b>：\n      <span class='sa-desc'>① 用 DeepSeek 撰写视频分镜描述与镜头细节提示词；② 导入通义万相生成高质量飞天原画作为首帧；③ 将原画导入可灵AI，输入“彩带飘逸”的图生视频动力学指令；④ 剪映拼接并配上古风配乐。</span>\n    </div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-rose'>解</span>\n    <div class='sa-content'>\n      <b class='sa-title'>(3) 技术困难与解决思路</b>：\n      <span class='sa-desc'>① **困难**：面部细节欠缺或大运动肢体容易出现物理崩坏。② **解法**：用静态飞天画作首帧作为“图生视频”的基础，使用“首尾帧控制”技术约束动作幅度，大幅提升成片品质。</span>\n    </div>\n  </div>\n</div>`
                },
                {
                    title: "展品信息讲解智能体",
                    q: "展品扫码智能体：(1)搭建平台；(2)如何防胡编乱造；(3)系统运作流程。",
                    tip: "<b>记忆口诀：【无代码平台搭建，知识库约束加严，扫码匹配大模型显】</b>",
                    a: `<div class='sa-list'>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-sky'>平</span>\n    <div class='sa-content'>\n      <b class='sa-title'>(1) 推荐搭建平台</b>：\n      <span class='sa-desc'>推荐使用字节跳动旗下的扣子(Coze)或百度智能体平台。支持无代码、可视化配置并原生提供了向量知识库插件。</span>\n    </div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-rose'>防</span>\n    <div class='sa-content'>\n      <b class='sa-title'>(2) 确保不胡编乱造具体措施</b>：\n      <span class='sa-desc'>① 将展品文档整理入库作为外挂参考；② Prompt 强制指令：“仅基于知识库作答，找不到则明确说不知道，禁自主联想”；③ 调低模型参数 Temperature 至 0 或 0.1 保证回答客观，并开启引文溯源功能。</span>\n    </div>\n  </div>\n  <div class='sa-item'>\n    <span class='sa-badge sa-badge-amber'>流</span>\n    <div class='sa-content'>\n      <b class='sa-title'>(3) 智能体交互运行流程</b>：\n      <span class='sa-desc'>观众扫码提问 $\rightarrow$ 问题向量化并在知识库做相似度匹配 $\rightarrow$ 提取匹配资料片段 $\rightarrow$ 片段和问题组装成提示词输入大模型 $\rightarrow$ 模型依据片段生成客观的事实讲解 $\rightarrow$ 展现给观众手机终端。</span>\n    </div>\n  </div>\n</div>`
                }
            ]
        }
    });

    const majorCategory = siteData.find(category => category.categoryId === "major");
    if (majorCategory) {
        const aiCourse = majorCategory.items.find(item => item.id === "ai_course");
        if (aiCourse) {
            aiCourse.quiz = appData.ai_quiz;
            aiCourse.flashcard = appData.ai_short_answers;
        }
    }

    const cCategory = siteData.find(category => category.categoryId === "c-language");
    if (!cCategory) return;

    cCategory.items = [
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
        appData.c_loop_advanced,
        appData.c_array1,
        appData.c_array2,
        appData.c_func1,
        appData.c_func2,
        appData.c_pointer1,
        appData.c_pointer_adv1,
        appData.c_pointer_adv2,
        appData.c_dynamic_memory,
        appData.c_string,
        appData.c_struct,
        appData.c_union,
        appData.c_file
    ].filter(Boolean);

})();

window.EXAM_SCHEDULE = [
    { date: "06.22 (周一)", time: "19:00-21:00", subject: "软件项目规划", status: "未关联" },
    { date: "06.24 (周三)", time: "16:10-18:10", subject: "Linux 基础", status: "对应《Linux 运维管理》" },
    { date: "06.26 (周五)", time: "19:00-21:00", subject: "人工智能大模型应用", status: "对应《人工智能导论》" },
    { date: "06.29 (周一)", time: "08:50-10:50", subject: "工业 App 应用开发", status: "未关联" },
    { date: "06.30 (周二)", time: "08:50-10:50", subject: "软件测试", status: "对应《软件测试与工程》" },
    { date: "06.30 (周二)", time: "14:00-16:00", subject: "移动应用开发技术", status: "对应《微信小程序开发》" },
    { date: "06.30 (周二)", time: "19:00-21:00", subject: "嵌入式系统", status: "未关联" }
];

