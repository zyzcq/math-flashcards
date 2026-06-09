const fs = require('fs');

const linuxShortAnswers = [
    {
        q: "请简述Linux操作系统相比于Windows和macOS的主要优势与劣势。",
        tip: "开源剪裁命令行，生态学习两堵墙",
        a: [
            { k: "开", t: "开源免费", d: "源码开放，可自由修改与定制，无高昂授权费。" },
            { k: "定", t: "高度定制", d: "可深度裁剪，适合从嵌入式到超算的各类场景。" },
            { k: "命", t: "命令行强", d: "CLI极其强大，非常适合自动化运维与脚本编程。" },
            { k: "缺生态", t: "软件生态弱", d: "劣势：桌面端商业软件（如Adobe系列、大型游戏）支持较少。" },
            { k: "缺易用", t: "学习门槛高", d: "劣势：对普通用户的图形化体验不如Windows/macOS直观。" }
        ]
    },
    {
        q: "在Linux服务器上安装图形用户界面(GUI)有哪些优劣势？",
        tip: "图形易用门槛低，耗资面广多危机",
        a: [
            { k: "优易用", t: "降低门槛", d: "优势：图形化操作更直观，适合新手管理员或特定桌面软件环境。" },
            { k: "劣耗资", t: "资源开销大", d: "劣势：GUI组件会占用大量内存和CPU，降低服务器业务承载力。" },
            { k: "劣面广", t: "攻击面增加", d: "劣势：安装包增多导致潜在的安全漏洞增加，维护成本变高。" },
            { k: "劣维护", t: "维护复杂", d: "劣势：图形组件和依赖包增多，补丁、兼容性与故障排查成本都会上升，服务器通常推荐纯CLI环境。" }
        ]
    },
    {
        q: "举例说明命令行在查看系统信息时的优势。",
        tip: "快组远批，命令行里藏玄机",
        a: [
            { k: "快", t: "响应极快", d: "无需加载图形界面，直接返回数据，如 `top` 命令瞬间显示资源。" },
            { k: "组", t: "组合强大", d: "通过管道符 `|` 可以将多个命令组合，如 `ps aux | grep nginx` 精准过滤。" },
            { k: "远", t: "远程低宽带", d: "SSH远程连接只需极低带宽即可流畅操作，不卡顿。" },
            { k: "批", t: "易于批处理", d: "能轻松将查询结果接入Shell脚本，实现自动化巡检与告警。" }
        ]
    },
    {
        q: "快速修改配置文件(如/etc/hosts)时，Vim与Windows记事本的区别是什么？",
        tip: "端权高批，Vim操作如飞",
        a: [
            { k: "端", t: "终端直改", d: "许多Linux环境默认提供vi/vim，或可快速安装；可直接在终端修改，无需先下载到本地。" },
            { k: "权", t: "权限控制", d: "Vim可以直接配合 `sudo vim` 提权编辑系统文件，记事本难以处理Linux权限。" },
            { k: "高", t: "高效跳转", d: "Vim支持强大的快捷键（如 `G` 到末尾，`/` 搜索），无需鼠标拖拽。" },
            { k: "批", t: "批量替换", d: "Vim支持底线命令模式 `:s` 进行正则表达式级别的精准批量替换。" }
        ]
    },
    {
        q: "部署符合等保2.0三级的openEuler用户管理系统，账户管理应采取哪些关键措施？",
        tip: "最小密审权限分，多因认证筑安全",
        a: [
            { k: "最小", t: "最小权限", d: "严格遵循最小权限原则，禁止多用户共享root账号。" },
            { k: "密", t: "密码策略", d: "结合 `login.defs`、PAM/pwquality 等配置强制密码复杂度、历史限制与定期修改周期（如90天）。" },
            { k: "审", t: "安全审计", d: "开启严格的登录日志审计（如监控 `/var/log/secure`）。" },
            { k: "权分", t: "权限分离", d: "使用 `sudo` 进行精细化授权，实现系统管理员、审计员和安全员三权分立。" },
            { k: "多因", t: "多因素认证", d: "对远程管理入口引入SSH密钥、密码与MFA等组合认证机制。" }
        ]
    },
    {
        q: "建立符合ISO 27001标准的openEuler文件管理系统，权限管理及存储优化应采取哪些措施？",
        tip: "精权加密冗快归，数据安全永相随",
        a: [
            { k: "精权", t: "精细权限", d: "除基础 UGO 权限外，利用 ACL (`setfacl`) 实现细粒度的文件访问控制。" },
            { k: "主加", t: "加密存储", d: "对核心机密数据所在分区进行磁盘级加密（如 LUKS）防止物理窃取。" },
            { k: "冗", t: "数据冗余", d: "根据业务重要性选择 RAID1/5/6/10 等方案提供冗余容错，避免把RAID0误当作冗余方案。" },
            { k: "快", t: "定期快照", d: "利用 LVM 快照或支持快照的文件系统/备份系统定期保护关键数据；XFS本身不提供原生快照。" },
            { k: "归", t: "日志归档", d: "严格控制文件修改权限，并使用审计系统(Auditd)记录所有敏感文件的读写日志。" }
        ]
    }
];

let out = "    linux_short_answers: {\n";
out += '        id: "linux_short_answers",\n';
out += '        title: "Linux：核心简答与讨论",\n';
out += '        subtitle: "基础原理与运维安全要点",\n';
out += '        themeColor: "emerald",\n';
out += '        type: "flashcard",\n';
out += "        cards: [\n";
linuxShortAnswers.forEach((item, idx) => {
    out += "            {\n";
    out += `                q: ${JSON.stringify(item.q)},\n`;
    out += `                tip: ${JSON.stringify("<b>记忆口诀：【" + item.tip + "】</b>")},\n`;
    
    let aHtml = "<div class='sa-list'>\\n";
    item.a.forEach(row => {
        aHtml += `  <div class='sa-item'>\\n    <span class='sa-badge sa-badge-emerald'>${row.k}</span>\\n    <div class='sa-content'><b class='sa-title'>${row.t}</b>：<span class='sa-desc'>${row.d}</span></div>\\n  </div>\\n`;
    });
    aHtml += "</div>";
    out += `                a: "${aHtml}"\n`;
    out += "            }" + (idx === linuxShortAnswers.length - 1 ? "" : ",") + "\n";
});
out += "        ]\n    }";

fs.writeFileSync('d:\\github\\math-flashcards\\scratch_linux_short_answers.js', out, 'utf8');
console.log('Short answers data generated.');
