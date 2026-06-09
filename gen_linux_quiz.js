const fs = require('fs');

const rawDB = [
    // === 第一组：Linux基础与应用 ===
    [1, "Linux操作系统的起源与哪个操作系统密切相关？", ["Windows", "UNIX", "DOS", "macOS"], 1, "Linux最初是Linus Torvalds受Minix（一种UNIX变种）启发而开发的类UNIX系统。"],
    [1, "下列哪个不是Linux操作系统的特点？", ["开源免费", "技术成熟且安全稳定", "主要用于个人消费级电脑市场", "支持多硬件平台运行"], 2, "Linux主要应用于服务器、云计算、超级计算机及嵌入式等领域，个人桌面市场占有率相对较低。"],
    [1, "在Linux的发展过程中，哪个许可证起到了关键作用，要求内核源代码在分发时保持开放？", ["MIT许可证", "Apache许可证", "GNU通用公共许可证(GPL)", "BSD许可证"], 2, "Linux内核采用GPL许可证。分发修改版时需要遵守GPL的源代码开放和相同许可证要求，但这不等于所有商业服务都必须免费。"],
    [1, "欧拉操作系统(EulerOS)是由哪家公司发起的？", ["阿里巴巴", "腾讯", "华为", "百度"], 2, "EulerOS 是由华为公司主导并发起的企业级Linux操作系统。"],
    [1, "华为欧拉(EulerOS)早期与哪一类Linux发行版生态兼容性较强？", ["RHEL/CentOS系", "Debian/Ubuntu系", "Arch系", "Alpine系"], 0, "EulerOS早期属于RHEL/CentOS生态的企业级Linux发行版，后续华为云欧拉等版本更多基于openEuler构建。"],
    [1, "openEuler社区主要致力于哪个方面的创新和发展？", ["个人电脑操作系统", "移动操作系统", "企业级Linux操作系统", "游戏操作系统"], 2, "openEuler主要面向服务器、云计算及边缘计算等企业级场景。"],
    [1, "欧拉操作系统主要面向哪种应用场景？", ["个人桌面", "移动设备", "服务器与云计算", "游戏主机"], 2, "EulerOS主要作为服务器及云计算基础设施的基础操作系统。"],
    [1, "openEuler社区版本命名方式主要基于什么？", ["发布者的名字", "发布年份和月份", "系统的功能特性", "随机生成的数字或字母组合"], 1, "如openEuler 22.03 LTS，代表2022年3月份发布的长期支持版。"],
    // 判断题（改选择）
    [1, "CentOS是Red Hat Enterprise Linux的商业版本，需要付费使用。", ["对", "错"], 1, "CentOS Linux曾是RHEL的免费社区重构版；CentOS Stream是面向RHEL之前的滚动预览版本，二者都不是RHEL商业订阅版。"],
    [1, "Linux内核版本中的次版本号为偶数时，表示该版本是开发版。", ["对", "错"], 1, "早期2.6之前曾有“奇数开发版、偶数稳定版”的约定；现代Linux内核已不再用这个规则判断开发版或稳定版。"],
    [1, "POSIX标准定义了操作系统应该为应用程序提供的标准接口，有助于应用程序的跨平台移植。", ["对", "错"], 0, "POSIX确保了类Unix系统之间的源码级兼容性。"],
    [1, "openEuler作为国产Linux操作系统，没有自主知识产权。", ["对", "错"], 1, "openEuler是开放原子开源基金会孵化的开源操作系统项目，由华为等社区成员持续贡献和共建，不是“没有自主知识产权”。"],

    // === 第二组：包管理与图形界面 ===
    [2, "在openEuler中，默认的包管理工具是什么？", ["YUM", "DNF", "APT", "RPM"], 1, "openEuler及较新的RHEL系系统默认使用DNF作为YUM的替代品。"],
    [2, "EPOL仓库的全称是什么？", ["Extra Packages for Enterprise Linux", "Extra Packages for openEuler", "Extended Package Online Library", "Euler Package Overlay Layer"], 1, "EPOL (Extra Packages for openEuler) 是openEuler的扩展软件包仓库。"],
    [2, "DNF相比YUM的主要优势是什么？", ["更慢的依赖解析速度", "仅支持命令行操作", "使用SAT算法解决依赖冲突", "不支持事务回滚"], 2, "DNF使用基于SAT的依赖解析器，解决了YUM在处理复杂依赖时速度慢且内存占用高的问题。"],
    [2, "XFCE桌面环境的主要特点是什么？", ["资源占用高，适合高性能硬件", "轻量级，适合低配置机器", "仅支持命令行模式", "由华为独家开发"], 1, "XFCE是一款轻量级桌面环境，资源占用较低，适合低配置机器或需要轻量桌面的场景。"],
    [2, "如何设置系统默认启动到图形界面？", ["systemctl set-default multi-user.target", "systemctl enable lightdm", "systemctl set-default graphical.target", "startx"], 2, "graphical.target对应图形界面，multi-user.target对应命令行。"],
    // 判断题（改选择）
    [2, "openEuler默认安装图形界面(GUI)。", ["对", "错"], 1, "通常服务器版Linux（包括openEuler）默认最小化安装，不包含GUI。"],
    [2, "DNF是YUM的下一代替代工具，但常用命令基本兼容。", ["对", "错"], 0, "DNF与YUM在常用命令行参数上高度兼容，但底层依赖解析和插件机制已有变化。"],
    [2, "EPOL仓库提供基础仓库之外的扩展软件包。", ["对", "错"], 0, "EPOL仓库用于提供openEuler基础仓库之外的扩展软件包，不宜简单理解为专门的硬件驱动仓库。"],
    [2, "openEuler的官方源仅支持HTTP协议访问。", ["对", "错"], 1, "openEuler官方仓库和镜像源可通过HTTP/HTTPS等方式访问，并不只限于HTTP。"],
    [2, "国内镜像源(如清华、华为云等)可以加速软件包下载。", ["对", "错"], 0, "使用国内镜像源可大幅提升由于跨国网络导致的下载慢的问题。"],

    // === 第三组：命令行基础 ===
    [3, "关于Linux命令行界面的优势，以下哪项描述正确？", ["图形化界面操作更直观", "适合批量操作和自动化运维", "无需学习任何命令即可使用", "仅适用于本地系统管理"], 1, "CLI非常适合编写脚本进行自动化运维。"],
    [3, "使用sudo命令的目的是什么？", ["切换至其他用户", "以管理员权限执行命令", "查看命令历史记录", "配置多语言环境"], 1, "sudo (superuser do) 允许普通用户临时以root身份执行命令。"],
    [3, "关于sudo命令的描述，以下哪项是正确的？", ["sudo默认允许所有用户执行管理员命令", "sudo的权限配置保存在“/etc/passwd”文件中", "用户必须被添加到“/etc/sudoers”文件才能使用sudo", "sudo -k会延长当前用户的sudo权限有效期"], 2, "sudo的配置文件为/etc/sudoers，普通用户必须在其中配置或加入特定用户组(如wheel)才能使用。"],
    [3, "关于Linux命令的基本结构，以下哪项描述错误？", ["命令的选项通常以“-”或“--”开头", "参数必须放在选项之前", "命令严格区分大小写", "多个短选项可以合并使用(如ls -al)"], 1, "标准的命令结构是：命令 [选项] [参数]，参数通常放在选项之后。"],
    [3, "管道符号“|”在Linux中的作用是什么？", ["将标准输出重定向到文件", "终止命令执行", "将一个命令的输出作为另一个命令的输入", "显示命令的详细帮助信息"], 2, "如 `ls | grep txt`，将ls的输出传递给grep作为输入。"],
    [3, "查看Shell内部命令cd的帮助信息应使用？", ["man cd", "cd --help", "help cd", "info cd"], 2, "对于Shell内置命令（如cd, echo），使用 `help` 命令查看帮助，`man` 通常用于外部命令。"],
    [3, "修改Linux系统默认语言需编辑哪个文件？", ["/etc/profile", "~/.bashrc", "/etc/locale.conf", "/etc/environment"], 2, "/etc/locale.conf 保存着系统的本地化设置，包括LANG变量。"],
    // 判断题（改选择）
    [3, "命令行界面相较于图形化界面，在批量操作和自动化运维方面效率更低。", ["对", "错"], 1, "恰恰相反，命令行极大提高了批量操作效率。"],
    [3, "Linux命令的基本结构是“命令 [参数] [选项]”。", ["对", "错"], 1, "正确结构为“命令 [选项] [参数]”。"],
    [3, "修改系统默认语言后，必须重启系统才能使配置生效。", ["对", "错"], 1, "可使用 `localectl set-locale` 或修改 `/etc/locale.conf` 后重新登录生效；当前Shell也可临时导出LANG变量，无需重启系统。"],
    [3, "sudo dnf update 需要root权限才能执行，普通用户无法直接运行。", ["对", "错"], 0, "是的，dnf update需要系统级权限，普通用户必须加sudo。"],
    [3, "在Linux中，echo \"Hello\" > file.txt 会覆盖file.txt的原有内容。", ["对", "错"], 0, "`>` 是覆盖重定向，`>>` 是追加重定向。"],

    // === 第四组：Vim编辑器 ===
    [4, "在Vim中，从命令模式进入插入模式需要按哪个键？", [":", "i", "Esc", ":wq"], 1, "按下 `i` (insert) 即可进入插入模式。"],
    [4, "以下哪个命令可以保存文件并退出Vim？", [":q", ":wq", ":q!", ":w"], 1, "`w` 表示 write (保存)，`q` 表示 quit (退出)。"],
    [4, "在Vim中，如何复制当前行？", ["Dd", "yy", "p", "x"], 1, "`yy` 意为 yank (复制) 当前行。"],
    [4, "在Vim的命令模式下，按下哪个键可以删除当前光标所在的字符？", ["X", "d", "D", "x"], 3, "小写 `x` 删除当前光标处字符，大写 `X` 删除光标前一个字符。"],
    // 判断题（改选择）
    [4, "在Vim中，输入模式下的修改需要先返回命令模式才能保存。", ["对", "错"], 0, "必须按 `Esc` 返回命令模式，再输入 `:w` 保存。"],
    [4, ":q! 命令会强制退出Vim并保存所有修改。", ["对", "错"], 1, ":q! 是强制退出并【放弃】所有修改。"],
    [4, "命令10j表示光标向下移动10行。", ["对", "错"], 0, "`j` 是向下移动，前面加数字代表移动的行数。"],
    [4, "在Vim中，:vs test.txt 会上下分屏打开test.txt。", ["对", "错"], 1, "`:vs` (vsplit) 是【垂直】左右分屏，`:sp` (split) 是【水平】上下分屏。"],
    [4, "多窗口编辑时，按Ctrl+W+W可以循环切换窗口。", ["对", "错"], 0, "Ctrl+W 是窗口操作前缀，再按 W 用于切换下一个窗口。"],

    // === 第五组：文本处理工具 ===
    [5, "以下哪个命令最适合快速查找日志文件中的错误信息？", ["ls", "grep \"ERROR\" logfile", "cat logfile", "echo \"ERROR\""], 1, "grep 是强大的文本搜索工具。"],
    [5, "使用sed命令将文件中的所有“old”替换为“new”，正确的命令是什么？", ["sed 's/old/new/' file.txt", "sed 's/new/old/' file.txt", "sed 's/old/new/g' file.txt", "sed 'old/new/g' file.txt"], 2, "`s/原字符/新字符/g` 中的 `g` 代表全局替换当前行所有匹配项。"],
    [5, "awk命令中，默认的字段分隔符是哪个？", ["逗号(,)", "制表符(\\t)", "空格(包括连续空格)", "冒号(:)"], 2, "awk默认以任何数量的空白字符(空格、Tab)作为分隔符。"],
    [5, "以下哪个正则表达式可以匹配“2023-01-01”格式的日期？", ["\\d{4}-\\d{2}-\\d{2}", "[0-9]{4}-[0-9]{2}-[0-9]{2}", "\\d+-\\d+-\\d+", "[A-Za-z]+-\\d+-\\d+"], 1, "标准正则中使用 `[0-9]{4}` 表示4位数字，`\\d` 在某些基础正则引擎(如传统grep)中不被直接支持。"],
    [5, "要从data.csv中提取第2列和第4列数据，正确的awk命令是哪个？", ["awk '{print $0}' data.csv", "awk '{print $2, $4}' data.csv", "awk -F',' '{print $2, $4}' data.csv", "awk '/2,4/' data.csv"], 2, "csv文件是以逗号分隔的，所以需要用 `-F','` 指定分隔符。"],
    [5, "以下哪个命令可以统计文件中包含“warning”的行数？", ["grep -c \"warning\" file.txt", "grep -v \"warning\" file.txt", "sed -n \"/warning/p\" file.txt", "awk \"/warning/\" file.txt"], 0, "`grep -c` 用于统计(count)匹配的行数。"],
    [5, "使用sed删除文件中的空行，正确的命令是哪个？", ["sed '/^$/d' file.txt", "sed '/empty/d' file.txt", "sed 's/^$//g' file.txt", "sed '/\\s/d' file.txt"], 0, "`^$` 代表空行（开头直接接结尾），`/d` 表示删除该行。"],
    [5, "grep -E选项的作用是什么？", ["忽略大小写", "使用扩展正则表达式", "递归搜索目录", "显示匹配行的行号"], 1, "`grep -E` 等同于 `egrep`，开启扩展正则表达式支持。"],
    [5, "以下哪个awk命令可以计算numbers.txt中数字的总和？", ["awk '{sum+=$1} END{print sum}' numbers.txt", "awk '/sum/{print $0}' numbers.txt", "awk '{print $1+$2}' numbers.txt", "awk '{sum=$1} END{print sum}' numbers.txt"], 0, "累加第一列的值存入sum变量，END块在处理完所有行后执行打印。"],
    [5, "将命令ps aux的输出通过管道传递给grep过滤出“nginx”进程，正确的命令是哪个？", ["ps aux > grep \"nginx\"", "ps aux | grep \"nginx\"", "grep \"nginx\" ps aux", "ps aux && grep \"nginx\""], 1, "管道符 `|` 将前一个命令的标准输出作为后一个命令的标准输入。"],
    // 判断题（改选择）
    [5, "grep命令默认区分大小写。", ["对", "错"], 0, "默认区分，如果要忽略大小写需要加 `-i` 参数。"],
    [5, "sed -i命令会直接修改原文件。", ["对", "错"], 0, "是的，`-i` 表示在位(in-place)修改原文件。"],
    [5, "awk的BEGIN块在处理文件内容之前执行。", ["对", "错"], 0, "BEGIN块用于初始化变量或打印表头，在读取任何输入行前执行。"],
    [5, "正则表达式^[A-Z]可以匹配所有以大写字母开头的行。", ["对", "错"], 0, "`^` 表示行首，`[A-Z]` 表示任意大写字母。"],
    [5, "grep -v \"success\" logfile会显示包含\"success\"的行。", ["对", "错"], 1, "`-v` 选项的作用是反向选择(invert match)，即显示【不包含】该字符串的行。"],

    // === 第六组：用户与权限管理 ===
    [6, "在Linux系统中，用户账户信息主要存储在哪个文件中？", ["/etc/shadow", "/etc/passwd", "/etc/group", "/etc/login.defs"], 1, "/etc/passwd 存放用户信息，/etc/shadow 存放密码哈希值。"],
    [6, "以下哪个命令可以修改用户密码过期时间？", ["passwd -e", "chage -M", "usermod -p", "useradd -x"], 1, "`chage -M` 可以设置密码的最大有效期。"],
    [6, "在openEuler/RHEL系系统中创建系统用户(通常UID<1000)的正确命令是(    )。", ["useradd -s /sbin/nologin sysuser", "useradd -r sysuser", "adduser --system sysuser", "以上都可以"], 1, "`useradd -r` 用于创建系统用户。`-s /sbin/nologin` 只设置登录Shell，不会自动分配系统UID；`adduser --system` 更常见于Debian系。"],
    [6, "将用户加入附加组的命令是(    )。", ["usermod -g", "groupmod -a", "usermod -aG", "gpasswd -a"], 2, "`usermod -aG` 表示追加(append)附加组(Group)，不会覆盖原有的组。"],
    [6, "配置sudo权限时，以下哪个做法最安全且便于维护？", ["直接编辑/etc/sudoers文件", "使用visudo -f在/etc/sudoers.d/下创建独立文件", "给所有运维人员root权限", "直接 echo 规则追加到/etc/sudoers"], 1, "推荐用 `visudo -f /etc/sudoers.d/xxx` 编辑独立配置文件，既便于维护，也能在保存时做语法检查。"],
    [6, "审计用户登录失败记录应该查看(    )。", ["/var/log/messages", "/var/log/secure", "/var/log/auth.log", "B和C都正确"], 3, "RedHat系使用 `/var/log/secure`，Debian系使用 `/var/log/auth.log`。"],
    [6, "设置用户test密码90天过期的命令是(    )。", ["chage -M 90 test", "passwd -x 90 test", "usermod -e +90 test", "useradd -f 90 test"], 0, "`chage -M` 用于设置密码有效天数。"],
    [6, "以下哪个UID范围适合普通用户？", ["0~99", "100~499", "1000~60000", "500~999"], 2, "在较新的Linux系统(如CentOS 7+)中，普通用户的UID从1000开始。"],
    [6, "查看用户所属组的命令是(    )。", ["groups", "id", "whoami", "A和B都正确"], 3, "`groups` 只显示组名，`id` 显示详细的uid和gid信息。"],
    [6, "安全删除用户账户及其主目录的命令是(    )。", ["userdel username", "userdel -r username", "deluser --remove-all-files username", "rm -rf /home/username"], 1, "`userdel -r` 会同时删除用户及其主目录与邮件池。"],
    // 判断题（改选择）
    [6, "/etc/shadow文件存储密码哈希值，普通用户不可读。", ["对", "错"], 0, "出于安全考虑，shadow文件通常只有root或特权进程可读，其中保存的是密码哈希和有效期等信息。"],
    [6, "使用useradd创建用户时，在常见默认配置下会创建同名用户组。", ["对", "错"], 0, "多数RHEL/openEuler系默认启用私有组(Private Group)机制，会为普通用户创建同名主组。"],
    [6, "visudo命令只是sudoers文件的普通编辑器，没有语法检查功能。", ["对", "错"], 1, "visudo 相比普通 vim 的最大优势就是在保存时会进行【语法检查】，防止配置错误导致无法使用sudo。"],
    [6, "usermod -L命令会锁定用户的密码登录，直到使用usermod -U解锁。", ["对", "错"], 0, "`-L` (Lock) 通常会在密码哈希前加 `!`，从而锁定密码认证；但仍需注意SSH密钥等其他认证方式。"],
    [6, "在/etc/login.defs中可以设置默认的密码策略。", ["对", "错"], 0, "该文件用于配置密码的最长/最短使用期限、警告天数等默认参数。"],

    // === 第七组：文件系统管理与权限 ===
    [7, "在Linux系统中，查看文件inode、权限和多种时间戳等完整元数据的命令是(    )。", ["ls", "ls -l", "file", "stat"], 3, "`stat` 命令可以查看文件的 inode、权限、Access/Modify/Change 等详细元数据；`ls -l` 只显示常用摘要信息。"],
    [7, "修改文件权限为“rwxr-xr--”的正确命令是(    )。", ["chmod 754", "chmod 755", "chmod 644", "chmod 751"], 0, "rwx=7, r-x=5, r--=4。"],
    [7, "以下哪种文件类型标识符表示符号链接？", ["-", "d", "l", "b"], 2, "`l` 代表 link（软链接），`-` 代表普通文件，`d` 代表目录。"],
    [7, "查找/var目录下大于100MB的日志文件应使用(    )。", ["find /var -name \"*.log\" -size +100M", "find /var -size +100M", "locate /var/.log", "du -sh /var/*"], 0, "`find /var -name \"*.log\" -size +100M` 同时限定日志文件名和文件大小，题干条件更完整。"],
    [7, "将“file1.txt”重命名为“file2.txt”的正确命令是(    )。", ["cp file1.txt file2.txt", "mv file1.txt file2.txt", "rename file1.txt file2.txt", "ln file1.txt file2.txt"], 1, "`mv` (move) 除了移动文件，也是文件重命名的标准命令。"],
    [7, "创建硬链接和源文件的关系是(    )。", ["共享inode号", "独立inode号", "共享文件名", "独立文件内容"], 0, "硬链接本质上是同一个文件数据的不同入口，它们共享相同的 inode。"],
    [7, "解压archive.tar.gz格式文件的完整命令是(    )。", ["tar -xvf archive.tar.gz", "tar -zxvf archive.tar.gz", "tar -jvxf archive.tar.gz", "unzip archive.tar.gz"], 1, "z代表gzip，x代表extract(解压)，v代表verbose(详细信息)，f代表file(指定文件)。"],
    [7, "设置目录权限使其子文件继承权限应使用(    )。", ["chmod +X", "chmod -R", "setfacl -d", "umask"], 2, "`setfacl -d` 可以设置默认ACL，使目录中新建的文件继承特定权限。"],
    [7, "查看磁盘空间使用情况的命令是(    )。", ["df -h", "du -sh", "free -m", "top"], 0, "`df -h` 用于查看文件系统/磁盘分区的使用率。"],
    [7, "在传统磁盘上安全删除文件、使其难以恢复应使用(    )。", ["rm", "shred", "unlink", "mv /dev/null"], 1, "`shred` 会多次覆写文件数据，使其更难恢复；但在SSD、日志型文件系统或写时复制文件系统上效果可能受限制。"],
    // 判断题（改选择）
    [7, "chown命令可以同时修改文件所有者和所属组。", ["对", "错"], 0, "可以使用 `chown user:group file` 同时修改两者。"],
    [7, "硬链接可以跨文件系统创建。", ["对", "错"], 1, "硬链接依赖于 inode 机制，不同文件系统 inode 独立，因此不能跨文件系统创建硬链接。"],
    [7, "umask 022表示新建文件默认权限为644。", ["对", "错"], 0, "文件默认最大权限为666，减去umask(022)，结果为 644 (rw-r--r--)。"],
    [7, "find命令的-exec参数可以批量处理搜索结果。", ["对", "错"], 0, "例如 `find . -name \"*.tmp\" -exec rm {} \\;` 批量删除文件。"],
    [7, "/proc目录存储的是真实的物理文件。", ["对", "错"], 1, "`/proc` 是一个虚拟文件系统，存储的是当前内核与进程在内存中的实时数据。"],

    // === 第八组：磁盘与文件系统 ===
    [8, "在Linux中，用于查看磁盘分区信息的命令是什么？", ["df -h", "lsblk", "Mount", "du -sh"], 1, "`lsblk` (list block devices) 用树状结构显示所有块设备与分区关系。"],
    [8, "在较新的企业级Linux中，哪个文件系统常作为默认选择，并支持在线扩容？", ["ext3", "ext4", "XFS", "FAT32"], 2, "ext4和XFS都支持在线扩容；在RHEL/openEuler等企业级场景中，XFS常作为大容量和高性能文件系统选择。"],
    [8, "使用LVM(逻辑卷管理)时，正确的操作顺序是什么？", ["物理卷→卷组→逻辑卷", "卷组→物理卷→逻辑卷", "逻辑卷→物理卷→卷组", "物理卷→逻辑卷→卷组"], 0, "PV(物理卷) -> VG(卷组) -> LV(逻辑卷)。"],
    [8, "以下哪个命令用于修复损坏的ext4文件系统？", ["fsck.ext4", "chkdsk", "mkfs.ext4", "tune2fs"], 0, "`fsck` (file system check) 用于检查和修复文件系统错误。"],
    [8, "Linux中，默认的交换分区(Swap)文件系统类型是什么？", ["ext4", "swap", "XFS", "不需要文件系统"], 1, "Swap有专用的格式（类型标记为 swap），通过mkswap命令创建。"],
    // 判断题（改选择）
    [8, "/etc/fstab文件中的最后一列表示是否启用文件系统自检(fsck)的顺序。", ["对", "错"], 0, "最后一列（第六列）如果是0表示不自检，1通常是根目录，2是其他需自检的分区。"],
    [8, "使用MBR分区表可以完整支持超过2TB的磁盘分区。", ["对", "错"], 1, "MBR分区表通常受2TB限制；超过2TB的磁盘应使用GPT分区表，可配合较新版 `fdisk`、`parted` 或 `gdisk` 管理。"],
    [8, "逻辑卷(LV)的扩展操作必须在卸载文件系统后才能执行。", ["对", "错"], 1, "LVM 的一大优势就是支持 **在线扩容** (无需卸载)。"],
    [8, "mkfs.ext4 /dev/sdb1命令会破坏该分区原有文件系统并导致原数据不可正常访问。", ["对", "错"], 0, "格式化(创建文件系统)会覆写该分区的关键元数据和超级块，原有文件系统会被破坏；这不等同于安全擦除。"],
    [8, "RAID0的主要目的是提高数据冗余性。", ["对", "错"], 1, "RAID0 的目的是提升读写**性能**，没有任何数据冗余。RAID1 才是为了数据冗余。"]
];

// Read se_quiz.html as a template
const templatePath = 'd:\\github\\math-flashcards\\se\\se_quiz.html';
const templateHtml = fs.readFileSync(templatePath, 'utf8');

// Replace standard titles
let newHtml = templateHtml
    .replace('<title>软件测试课后习题汇总</title>', '<title>Linux 基础与应用通关</title>')
    .replace('<h1 style="color: var(--theme-accent); margin-bottom: 0.5rem;">软件测试期末题库</h1>', '<h1 style="color: var(--theme-green); margin-bottom: 0.5rem;">Linux 基础通关</h1>')
    .replace('软件测试期末题库', 'Linux 基础通关')
    .replace('填空题与选择题 · 全7章考点', '选择题与判断题 · 八大模块全覆盖');

newHtml = newHtml
    .replace('数据源: 软件测试课后习题 (选择与填空)', '数据源: Linux 基础与应用题库 (选择与判断)')
    .replace(/se_quiz_mistakes/g, 'linux_quiz_mistakes')
    .replace(/se_quiz_stats/g, 'linux_quiz_stats');

// Generate the menu options for Linux
// We have 8 modules, let's group them or display them all
const newMenuGrid = `
                <div class="menu-card" onclick="app.startMode('mock')" style="border-color: var(--theme-green); background: rgba(84, 132, 96, 0.04);">
                    <div class="menu-badge" style="color: var(--theme-green); opacity:0.15;">🎓</div>
                    <h3 style="color: var(--theme-green);">模拟考试</h3>
                    <p>随机抽取 20 题<br>全模块混合 · 实战演练</p>
                    <div class="stat-pill" id="stat-mock">最高正确率: 0%</div>
                </div>

                <div class="menu-card" id="btn-mistakes" onclick="app.startMode('mistakes')" style="border-color: var(--theme-accent); background: rgba(204, 109, 78, 0.04);">
                    <div class="menu-badge" style="color: var(--theme-accent); opacity:0.15;">🎯</div>
                    <h3 style="color: var(--theme-accent);">错题攻坚</h3>
                    <p>重做历史错题<br><span id="mistake-count" style="font-weight:bold">0</span> 道待修复</p>
                </div>

                <div class="menu-card" onclick="app.startMode('part1')">
                    <div class="menu-badge">🐧</div>
                    <h3>1. 基础与包管理</h3>
                    <p>Linux基础 & 包管理 (Ch1-2)</p>
                    <div class="stat-pill" id="stat-part1">最高正确率: 0%</div>
                </div>
                
                <div class="menu-card" onclick="app.startMode('part2')">
                    <div class="menu-badge">⌨️</div>
                    <h3>2. 命令行与Vim</h3>
                    <p>CLI基础 & Vim编辑器 (Ch3-4)</p>
                    <div class="stat-pill" id="stat-part2">最高正确率: 0%</div>
                </div>
                
                <div class="menu-card" onclick="app.startMode('part3')">
                    <div class="menu-badge">📝</div>
                    <h3>3. 文本与权限</h3>
                    <p>文本处理 & 用户管理 (Ch5-6)</p>
                    <div class="stat-pill" id="stat-part3">最高正确率: 0%</div>
                </div>

                <div class="menu-card" onclick="app.startMode('part4')">
                    <div class="menu-badge">💾</div>
                    <h3>4. 磁盘与文件系统</h3>
                    <p>文件系统 & 磁盘管理 (Ch7-8)</p>
                    <div class="stat-pill" id="stat-part4">最高正确率: 0%</div>
                </div>
`;

// Inject menu.
const menuStart = newHtml.indexOf('            <div class="menu-grid">');
const menuEnd = newHtml.indexOf('            <div style="margin-top: auto;', menuStart);
if (menuStart === -1 || menuEnd === -1) {
    throw new Error("Failed to locate menu block in template.");
}
newHtml = newHtml.slice(0, menuStart) +
    `            <div class="menu-grid">${newMenuGrid}            </div>\n            \n` +
    newHtml.slice(menuEnd);

const mnemonics = [
// 1-10
    "Linux源自Unix，Minix启发林纳斯",
    "开源安全多平台，云与服务显身材，个人桌面非主力",
    "GPL保源开放，同证分发是保障",
    "欧拉出自华为手，自主底座大步走",
    "早期欧拉红帽系，兼容CentOS是默契",
    "openEuler企业级，服务器云显神力",
    "云与服务欧拉路，企业应用立支柱",
    "发布年月定版本，LTS长期用得稳",
    "CentOS免费非商用，社区重构大不同",
    "奇开发，偶稳定，旧时规则新莫套",
    // 11-20
    "POSIX搭建跨平台，源码兼容免重来",
    "原子基金来孵化，开源共建人人夸",
    "欧拉包管用DNF，SAT算法解依赖",
    "EPOL全称怎么找？openEuler扩展包",
    "DNF采用SAT，解决依赖效率高",
    "轻量桌面XFCE，低配机器跑得飞",
    "图形启动graphical，命令行设multi-user",
    "服务器默认无GUI，纯净命令行走起",
    "新版DNF替旧YUM，常用参数可平移",
    "EPOL属于扩展库，基础之外补不足",
    // 21-30
    "官方源可走HTTPS，切莫只记HTTP",
    "国内镜像下载快，清华华为把速带",
    "批量自动命令行，复杂操作显本领",
    "sudo提权做管理，Superuser Do显神力",
    "要想提权用sudo，配置写在sudoers",
    "命令选项加参数，选项短横参数后",
    "管道长长一根竖，前出化作后输入",
    "Shell内置查help，外部命令去找man",
    "修改语言去哪里？locale.conf改设置",
    "自动批量命令行，高效运维显本领",
    // 31-40
    "选项在前参在后，次序记反要出丑",
    "修改语言不重启，重登Shell即入局",
    "系统升级改配置，非root用户加sudo",
    "单尖覆盖双尖追，用错覆盖追不回",
    "按i进入插入模式，Esc退回命令舞台",
    "wq保存并退出，不保强退用q叹",
    "yy复制当前行，p键粘贴在其下",
    "小x删除当前符，大X删去前一处",
    "编辑模式想保存，先按Esc回命令",
    "q加叹号是强退，放弃修改不保留",
    // 41-50
    "j是向下k向上，10j向下移十行",
    "vs垂直左右分，sp水平上下分",
    "Ctrl+WW切窗口，多屏编辑不慌手",
    "过滤定位找grep，快速查错不疲惫",
    "sed替换s原新g，全局替换没毛病",
    "awk默认空白切，逗号冒号加大写F",
    "0到9限数字范围，大括号定重复次数",
    "CSV以逗号分隔，大写F指定分隔符",
    "统计匹配用-c，计算行数不费力",
    "脱字行首美元尾，空行匹配/d来删",
    // 51-60
    "大写E开扩展正则，egrep本是一家子",
    "每行累加在中间，END输出最终和",
    "ps查出所有进程，管道接grep做过滤",
    "grep默认分大小，忽略大小写用-i",
    "sed加小i直接改，覆盖原件不留白",
    "BEGIN尚未读入行，初始化工作它最强",
    "脱字符定在行首，大写字母紧跟后",
    "小v反向做匹配，排除此词才露脸",
    "用户信息在passwd，密码哈希在shadow",
    "修改密码过期天，chage大M记心间",
    // 61-70
    "系统用户用-r，UID小于一千整",
    "添加附加组-aG，追加不覆原组迹",
    "visudo加独立文件，语法检查保安全",
    "登录失败看两端，红帽secure德比auth",
    "chage大M设天数，九十天后换新路",
    "普通用户一千起，系统用户在一千底",
    "groups只看组名，id查UID详情",
    "删除用户连家带-r，连根拔起不留痕",
    "shadow存密码哈希，除了root谁都没戏",
    "建用户配同名组，Linux私有组显灵",
    // 71-80
    "visudo带语法检查，直接编辑容易垮塌",
    "大L锁定，大U解锁，密码控制稳当当",
    "login.defs定默认，密码策略在其中",
    "stat查看元数据，inode时间全备齐",
    "rwx为七，rx为五，r为四，权限就是七五四",
    "小l开头是软链，普通文件横杠占",
    "名字匹配用-name，大小超过用+100M",
    "重命名和移动都用mv，cp只是复制品",
    "硬链接共享inode，删掉源头文件不丢",
    "解压tar.gz用zxvf，指定文件不弄坏",
    // 81-90
    "默认继承用ACL，加参数-d指定默认",
    "df看整盘使用率，du测目录大小更适宜",
    "传统磁盘用shred，SSD由于闪存特性需谨慎",
    "chown同时改主组，格式为人冒号组",
    "硬链接不能跨文件系统，共享inode是关键",
    "新建文件基准六六六，减去022得六四四",
    "find后加-exec，处理结果批执行",
    "proc长在内存里，虚拟映射别当真",
    "树状分区看lsblk，磁盘占用问df",
    "企业常用XFS，支持在线扩容大容量",
    // 91-98
    "PV、VG再到LV，物理、卷组、逻辑卷依次建",
    "修复系统用fsck，对准分区去检测",
    "交换分区也是swap格式，mkswap建立新标记",
    "fstab最后一列定自检，零不检查正数按序排",
    "二T上限用MBR，超限建分区用GPT",
    "LVM支持在线扩容，不用卸载不耽搁",
    "mkfs格式化建系统，原盘数据不可复",
    "RAID 0只为提速而生，没有冗余一旦坏盘全崩"
];

// Format rawDB to match [1, question, options, correctIndex, explanation, moduleId, mnemonic]
const formattedDB = rawDB.map((item, idx) => {
    const mnemonic = mnemonics[idx] || "熟能生巧，多记多练！";
    return [1, item[1], item[2], item[3], item[4], item[0], mnemonic];
});

// Inject HTML structure for Mnemonic Area if the template does not already have it.
if (!newHtml.includes('id="mnemonic-area"')) {
    newHtml = newHtml.replace(
        `<div class="explanation" id="explanation">
                    <strong>来源与解析</strong>
                    <span id="exp-text"></span>
                </div>`,
        `<div class="explanation prose prose-sm hide" id="explanation">
                    <strong>来源与解析</strong>
                    <span id="exp-text"></span>
                    <div id="mnemonic-area" class="quiz-mnemonic-box prose prose-sm hide">
                        <strong class="quiz-mnemonic-title">💡 记忆口诀</strong>
                        <span id="mnemonic-text" class="quiz-mnemonic-text"></span>
                    </div>
                </div>`
    );
}

// Fix the filtering logic in the javascript part of the template
const filterLogicOriginal = `        if (mode === 'part1') rawSubset = rawDB.filter(q => q[5] >= 1 && q[5] <= 3);
        else if (mode === 'part2') rawSubset = rawDB.filter(q => q[5] >= 4 && q[5] <= 5);
        else if (mode === 'part3') rawSubset = rawDB.filter(q => q[5] >= 6 && q[5] <= 7);`;

const filterLogicNew = `        if (mode === 'part1') rawSubset = rawDB.filter(q => q[5] === 1 || q[5] === 2);
        else if (mode === 'part2') rawSubset = rawDB.filter(q => q[5] === 3 || q[5] === 4);
        else if (mode === 'part3') rawSubset = rawDB.filter(q => q[5] === 5 || q[5] === 6);
        else if (mode === 'part4') rawSubset = rawDB.filter(q => q[5] === 7 || q[5] === 8);`;

newHtml = newHtml.replace(filterLogicOriginal, filterLogicNew);

// Fix startMode map logic to include mnemonic
const questionsMapOriginal = `            return {
                id: globalId,
                type: type,
                q: item[1],
                options: finalOptions,
                ans: finalAnsIndex,
                exp: item[4],
                chapter: item[5]
            };`;

const questionsMapNew = `            return {
                id: globalId,
                type: type,
                q: item[1],
                options: finalOptions,
                ans: finalAnsIndex,
                exp: item[4],
                chapter: item[5],
                mnemonic: item[6]
            };`;

newHtml = newHtml.replace(questionsMapOriginal, questionsMapNew);

// Fix renderQuestion reset logic to hide mnemonic-area if the template is older.
const renderResetOriginal = `        document.getElementById('explanation').classList.add('hide');`;
const renderResetNew = `        document.getElementById('explanation').classList.add('hide');
        const mnemonicArea = document.getElementById('mnemonic-area');
        if (mnemonicArea) mnemonicArea.classList.add('hide');`;

if (!newHtml.includes("const mnemonicArea = document.getElementById('mnemonic-area');")) {
    newHtml = newHtml.replace(renderResetOriginal, renderResetNew);
}

// Fix handleType1Answer to show mnemonic-area when wrong
const handleType1AnsOriginal = `        if (isCorrect) {
            this.handleScoreLogic(true, q.id);
        } else {
            btnElement.classList.add('wrong');
            this.handleScoreLogic(false, q.id);
        }`;

const handleType1AnsNew = `        if (isCorrect) {
            this.handleScoreLogic(true, q.id);
            const mnemonicArea = document.getElementById('mnemonic-area');
            if (mnemonicArea) mnemonicArea.classList.add('hide');
        } else {
            btnElement.classList.add('wrong');
            this.handleScoreLogic(false, q.id);
            const mnemonicArea = document.getElementById('mnemonic-area');
            if (mnemonicArea) {
                document.getElementById('mnemonic-text').innerHTML = q.mnemonic || "熟能生巧，多记多练！";
                mnemonicArea.classList.remove('hide');
            }
        }`;

newHtml = newHtml.replace(handleType1AnsOriginal, handleType1AnsNew);

// Fix updateMenuStats keys
newHtml = newHtml.replace(
    `['mock', 'part1', 'part2', 'part3'].forEach(key => {`,
    `['mock', 'part1', 'part2', 'part3', 'part4'].forEach(key => {`
);

// Fix updateHUD modeName mapping
const hudOriginal = `        if(this.state.mode==='part1') modeName='模块1';
        if(this.state.mode==='part2') modeName='模块2';
        if(this.state.mode==='part3') modeName='模块3';`;

const hudNew = `        if(this.state.mode==='part1') modeName='模块1';
        if(this.state.mode==='part2') modeName='模块2';
        if(this.state.mode==='part3') modeName='模块3';
        if(this.state.mode==='part4') modeName='模块4';`;

newHtml = newHtml.replace(hudOriginal, hudNew);

// Replace rawDB
const rawDBStart = newHtml.indexOf('const rawDB = [');
const rawDBEnd = newHtml.indexOf('];', rawDBStart) + 2;
newHtml = newHtml.slice(0, rawDBStart) + "const rawDB = " + JSON.stringify(formattedDB, null, 4) + ";\n" + newHtml.slice(rawDBEnd);

fs.writeFileSync('d:\\github\\math-flashcards\\linux\\linux_quiz.html', newHtml, 'utf8');
console.log("Successfully created linux_quiz.html");
