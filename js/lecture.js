(function enhanceLecturePage() {
    const LECTURE_PROGRESS_KEY = 'lecture_reading_progress';

    function normalizePath(value) {
        return decodeURIComponent(String(value || ''))
            .replace(/\\/g, '/')
            .replace(/^.*?(c|english)\//, '$1/');
    }

    function escapeHtml(value) {
        return String(value ?? '').replace(/[&<>"']/g, char => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[char]));
    }

    function readJson(key) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : {};
        } catch (error) {
            localStorage.removeItem(key);
            return {};
        }
    }

    function writeJson(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    function getCatalog() {
        if (typeof siteData === 'undefined') return [];
        return siteData.flatMap(category => {
            const items = Array.isArray(category.items) ? category.items : [];
            return items
                .filter(item => item?.type === 'article' && item.url)
                .map(item => ({ item, category }));
        });
    }

    function getCurrentEntry(catalog) {
        const currentPath = normalizePath(window.location.pathname);
        const index = catalog.findIndex(entry => normalizePath(entry.item.url) === currentPath);
        return {
            currentPath,
            index,
            entry: index >= 0 ? catalog[index] : null,
            prev: index > 0 ? catalog[index - 1] : null,
            next: index >= 0 && index < catalog.length - 1 ? catalog[index + 1] : null
        };
    }

    function inferTitle(entry) {
        if (entry?.item?.title) return entry.item.title;
        const h1 = document.querySelector('h1');
        return h1?.textContent?.trim() || document.title || '学习讲义';
    }

    function getKeywordProfile(title, path) {
        const source = `${title} ${path}`;
        const profiles = [
            {
                match: /动态内存|malloc|free|内存/,
                memory: '动态内存按“申请 → 判空 → 使用 → 释放 → 置空”五步回忆。',
                mistakes: ['忘记检查 malloc 返回值', 'free 后继续使用悬空指针', '申请大小没有乘以 sizeof']
            },
            {
                match: /文件|fopen|fclose|读写/,
                memory: '文件操作按“打开 → 检查 → 读写 → 关闭 → 判断错误”形成闭环。',
                mistakes: ['打开失败仍继续读写', '混淆文本模式和二进制模式', '忘记 fclose 导致缓冲区未刷新']
            },
            {
                match: /联合体|union/,
                memory: '联合体的核心是“成员共享同一段空间，同一时间只可信一个解释”。',
                mistakes: ['把 union 当 struct 使用', '忘记记录当前有效成员', '忽略大小由最大成员决定']
            },
            {
                match: /指针/,
                memory: '指针题先说清楚“指向谁、类型是什么、移动一步跨多大”。',
                mistakes: ['混淆指针数组和数组指针', '越界访问', '把地址和地址里的值混为一谈']
            },
            {
                match: /数组/,
                memory: '数组复习抓住“下标从 0 开始、连续存储、传参退化”。',
                mistakes: ['下标越界', 'sizeof 数组和 sizeof 指针混淆', '二维数组列数丢失']
            },
            {
                match: /函数/,
                memory: '函数按“声明、定义、调用、参数传递、返回值”五点检查。',
                mistakes: ['声明和定义不一致', '递归缺少终止条件', '误以为形参修改一定影响实参']
            },
            {
                match: /循环|for|while/,
                memory: '循环题按“初值、条件、更新、循环不变量、退出状态”检查。',
                mistakes: ['边界多一少一', '更新语句位置错误', '死循环或提前退出']
            },
            {
                match: /运算符/,
                memory: '运算符先看优先级，再看结合性，最后看副作用顺序。',
                mistakes: ['把优先级当求值顺序', '自增自减副作用判断错误', '忽略整型提升']
            },
            {
                match: /结构体|struct/,
                memory: '结构体抓住“成员集合、点运算、箭头运算、整体赋值”。',
                mistakes: ['混淆 . 和 ->', '忽略内存对齐', '结构体数组访问层级错误']
            },
            {
                match: /英语|简单句|谓语|从句/,
                memory: '英语句子先找谓语动词，再确定主干，最后处理修饰成分。',
                mistakes: ['没先定位谓语', '把修饰语当主干', '从句边界划分不清']
            }
        ];

        return profiles.find(profile => profile.match.test(source)) || {
            memory: '先抓概念边界，再看例题模式，最后用自测题主动回忆。',
            mistakes: ['只看懂例题但不能复述规则', '忽略适用条件', '复习后没有做主动回忆']
        };
    }

    function buildReview(entry, path) {
        const title = inferTitle(entry);
        const profile = getKeywordProfile(title, path);
        const subject = path.startsWith('english/') ? '英语' : 'C 语言';

        return {
            title,
            subject,
            goals: [
                `用自己的话复述本页核心概念`,
                `说出至少 2 个高频易错点`,
                `能根据例题步骤独立完成同类题`
            ],
            memory: profile.memory,
            mistakes: profile.mistakes,
            recall: [
                `不看正文，${subject}这页最重要的规则是什么？`,
                '这页内容最容易和哪个相近概念混淆？',
                '如果考试只给一道题，应该先检查哪一步？'
            ],
            checklist: [
                '能闭眼复述本页标题下的核心路径',
                '能解释红色易错提醒为什么会错',
                '能从目录跳到薄弱段落再复习一遍'
            ]
        };
    }

    function slugify(text, index) {
        return `lecture-section-${index}-${String(text || '')
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\u4e00-\u9fa5-]/g, '')}`;
    }

    function collectHeadings() {
        const headings = Array.from(document.querySelectorAll('h2, h3'))
            .filter(heading => !heading.closest('.lecture-study-shell, .lecture-review-footer, .lecture-topbar'));

        return headings.slice(0, 24).map((heading, index) => {
            if (!heading.id) heading.id = slugify(heading.textContent, index);
            return {
                id: heading.id,
                text: heading.textContent.trim(),
                level: heading.tagName === 'H3' ? 3 : 2
            };
        }).filter(item => item.text);
    }

    function renderTopbar(title, prev, next) {
        const prevLink = prev ? `<a class="lecture-link" href="../${prev.item.url}">上一篇</a>` : '';
        const nextLink = next ? `<a class="lecture-link" href="../${next.item.url}">下一篇</a>` : '';

        return `
            <div class="lecture-progress" aria-hidden="true"><span class="lecture-progress__bar"></span></div>
            <div class="lecture-topbar">
                <div class="lecture-topbar__title">${escapeHtml(title)}</div>
                <nav class="lecture-nav" aria-label="讲义导航">
                    <a class="lecture-link" href="../index.html">返回首页</a>
                    ${prevLink}
                    ${nextLink}
                </nav>
            </div>
        `;
    }

    function renderStudyShell(review, headings) {
        const toc = headings.length
            ? headings.map(heading => `
                <li>
                    <a class="level-${heading.level}" href="#${heading.id}">${escapeHtml(heading.text)}</a>
                </li>
            `).join('')
            : '<li><span class="level-2">本页暂无可生成目录的小标题</span></li>';

        return `
            <section class="lecture-study-shell" aria-label="本页复习导览">
                <div class="lecture-study-grid">
                    <article class="lecture-review-card lecture-card--concept">
                        <h2>${escapeHtml(review.title)}</h2>
                        <p>按“先回忆、再阅读、最后自测”的顺序学习。本页不追求一次看完，重点是能主动说出来。</p>
                        <div class="lecture-pill-row" aria-label="颜色提示">
                            <span class="lecture-pill lecture-pill--blue">概念</span>
                            <span class="lecture-pill lecture-pill--green">例题</span>
                            <span class="lecture-pill lecture-pill--amber">提醒</span>
                            <span class="lecture-pill lecture-pill--red">易错</span>
                            <span class="lecture-pill lecture-pill--purple">记忆</span>
                        </div>
                        <ul class="lecture-focus-list">
                            ${review.goals.map(goal => `<li>${escapeHtml(goal)}</li>`).join('')}
                            <li>${escapeHtml(review.memory)}</li>
                        </ul>
                    </article>
                    <aside class="lecture-review-card lecture-toc-card">
                        <h3>本页目录</h3>
                        <ul class="lecture-toc-list">${toc}</ul>
                    </aside>
                </div>
            </section>
        `;
    }

    function renderFooter(review) {
        return `
            <section class="lecture-review-footer" aria-label="复习巩固">
                <article class="lecture-review-card lecture-card--memory">
                    <h3>核心记忆</h3>
                    <p>${escapeHtml(review.memory)}</p>
                </article>
                <article class="lecture-review-card lecture-card--warning">
                    <h3>易错提醒</h3>
                    <ul class="lecture-check-list">
                        ${review.mistakes.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
                    </ul>
                </article>
                <article class="lecture-review-card lecture-card--practice">
                    <h3>主动回忆</h3>
                    <ul class="lecture-recall-list">
                        ${review.recall.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
                    </ul>
                </article>
                <article class="lecture-review-card lecture-card--concept">
                    <h3>考前检查</h3>
                    <ul class="lecture-check-list">
                        ${review.checklist.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
                    </ul>
                </article>
            </section>
        `;
    }

    function enhanceCodeBlocks() {
        document.querySelectorAll('pre').forEach((pre, index) => {
            if (pre.closest('.lecture-code-wrap')) return;

            const wrap = document.createElement('div');
            wrap.className = 'lecture-code-wrap';
            pre.parentNode.insertBefore(wrap, pre);
            wrap.appendChild(pre);

            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'lecture-copy-btn';
            button.textContent = '复制';
            button.setAttribute('aria-label', `复制第 ${index + 1} 段代码`);
            button.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(pre.textContent);
                    button.textContent = '已复制';
                    setTimeout(() => { button.textContent = '复制'; }, 1400);
                } catch (error) {
                    button.textContent = '复制失败';
                    setTimeout(() => { button.textContent = '复制'; }, 1400);
                }
            });
            wrap.appendChild(button);
        });
    }

    function trackReading(path) {
        const bar = document.querySelector('.lecture-progress__bar');
        const update = () => {
            const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
            const percent = Math.min(Math.max((window.scrollY / max) * 100, 0), 100);
            if (bar) bar.style.width = `${percent}%`;

            const store = readJson(LECTURE_PROGRESS_KEY);
            store[path] = { percent: Math.round(percent), updatedAt: Date.now() };
            writeJson(LECTURE_PROGRESS_KEY, store);
        };

        update();
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
    }

    function init() {
        if (document.body.classList.contains('lecture-enhanced')) return;

        const catalog = getCatalog();
        const { currentPath, entry, prev, next } = getCurrentEntry(catalog);
        const title = inferTitle(entry);
        const review = buildReview(entry, currentPath);
        const headings = collectHeadings();

        document.body.classList.add('lecture-enhanced');
        document.body.insertAdjacentHTML('afterbegin', renderTopbar(title, prev, next));
        document.querySelector('.lecture-topbar').insertAdjacentHTML('afterend', renderStudyShell(review, headings));
        document.body.insertAdjacentHTML('beforeend', renderFooter(review));

        enhanceCodeBlocks();
        trackReading(currentPath);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
