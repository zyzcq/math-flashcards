const themeStyles = {
    sky: { bg: 'bg-sky-500', text: 'text-sky-600', lightBg: 'bg-sky-50', border: 'border-sky-100', icon: 'fa-square-root-variable' },
    indigo: { bg: 'bg-indigo-500', text: 'text-indigo-600', lightBg: 'bg-indigo-50', border: 'border-indigo-100', icon: 'fa-language' },
    violet: { bg: 'bg-violet-500', text: 'text-violet-600', lightBg: 'bg-violet-50', border: 'border-violet-100', icon: 'fa-chart-line' },
    emerald: { bg: 'bg-emerald-500', text: 'text-emerald-600', lightBg: 'bg-emerald-50', border: 'border-emerald-100', icon: 'fa-code' },
    rose: { bg: 'bg-rose-500', text: 'text-rose-600', lightBg: 'bg-rose-50', border: 'border-rose-100', icon: 'fa-rocket' },
    default: { bg: 'bg-slate-500', text: 'text-slate-600', lightBg: 'bg-slate-50', border: 'border-slate-100', icon: 'fa-book' }
};

const mainContainer = document.getElementById('main-container');

let fullHTML = '';

siteData.forEach(category => {
    fullHTML += `
        <div class="mb-12">
            <h2 class="text-2xl font-bold text-slate-800 mb-6 border-l-4 ${category.categoryBorder} pl-3">
                ${category.categoryTitle}
            </h2>
            <div class="category-row flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth">
    `;

    category.items.forEach(item => {
        const theme = themeStyles[item.themeColor] || themeStyles.default;
        const isArticle = item.type === "article";
        const targetUrl = isArticle ? item.url : `study.html?type=${item.id}`;
        const badgeText = isArticle ? "📑 独立讲义" : `🗂️ 共 ${item.cards.length} 张卡片`;

        fullHTML += `
            <a href="${targetUrl}" class="module-card snap-start shrink-0 w-72 bg-white rounded-2xl p-6 border ${theme.border} cursor-pointer shadow-sm relative overflow-hidden group">
                <div class="absolute -right-4 -top-4 opacity-5 transform group-hover:scale-110 transition-transform duration-500">
                    <i class="fa-solid ${theme.icon} text-9xl ${theme.text}"></i>
                </div>
                <div class="relative z-10 flex flex-col h-full">
                    <div class="w-12 h-12 rounded-xl ${theme.lightBg} ${theme.text} flex items-center justify-center text-xl mb-4 shadow-sm">
                        <i class="fa-solid ${theme.icon}"></i>
                    </div>
                    <h3 class="text-xl font-bold text-slate-800 mb-1">${item.title}</h3>
                    <p class="text-xs font-bold text-slate-400 mb-6">${item.subtitle}</p>
                    <div class="mt-auto flex items-center justify-between">
                        <span class="text-xs font-bold px-3 py-1 rounded-full ${theme.lightBg} ${theme.text}">${badgeText}</span>
                        <div class="w-8 h-8 rounded-full ${theme.bg} text-white flex items-center justify-center shadow-md transform group-hover:translate-x-1 transition-transform">
                            <i class="fa-solid fa-arrow-right text-sm"></i>
                        </div>
                    </div>
                </div>
            </a>
        `;
    });

    fullHTML += `
            </div>
        </div>
    `;
});

requestAnimationFrame(() => {
    mainContainer.innerHTML = fullHTML;
});
