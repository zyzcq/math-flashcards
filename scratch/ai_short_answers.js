// ai_short_answers.js
// 自动生成的 AI 期末简答题闪卡数据
// 格式符合 study.html 闪卡模块中的 sa-list 结构

const ai_short_answers = [
    {
        title: "第1章：AI发展历程",
        q: "简述人工智能发展历程中的三个主要阶段，并说明每个阶段的代表性技术或标志性事件。",
        tip: "<b>记忆口诀：【早期符号专家秀，统计机器数据求，深度大模全网牛】</b>",
        a: `<div class='sa-list'>
  <div class='sa-item'>
    <span class='sa-badge sa-badge-indigo'>符</span>
    <div class='sa-content'>
      <b class='sa-title'>早期符号主义/推理期 (1950s-1970s)</b>：
      <span class='sa-desc'>以逻辑推理和专家系统为主。标志性事件：1956年达特茅斯会议首次正式提出“人工智能”概念。</span>
    </div>
  </div>
  <div class='sa-item'>
    <span class='sa-badge sa-badge-indigo'>统</span>
    <div class='sa-content'>
      <b class='sa-title'>统计学习与机器学习期 (1980s-2010s)</b>：
      <span class='sa-desc'>以数据驱动的浅层模型为主，代表技术为支持向量机(SVM)、决策树、随机森林等。</span>
    </div>
  </div>
  <div class='sa-item'>
    <span class='sa-badge sa-badge-indigo'>深</span>
    <div class='sa-content'>
      <b class='sa-title'>深度学习与大模型期 (2010s至今)</b>：
      <span class='sa-desc'>以神经网络和海量数据预训练为特征。标志事件有Transformer架构提出、AlphaGo战胜李世石，以及近年来ChatGPT和DeepSeek的大爆发。</span>
    </div>
  </div>
</div>`
    },
    {
        title: "第1章：DeepSeek应用",
        q: "请列举DeepSeek大模型在三个不同领域中的应用场景，并分别说明其在该领域的具体作用。",
        tip: "<b>记忆口诀：【代码自动降门槛，创作思路广延展，数据提取快精简】</b>",
        a: `<div class='sa-list'>
  <div class='sa-item'>
    <span class='sa-badge sa-badge-indigo'>码</span>
    <div class='sa-content'>
      <b class='sa-title'>软件开发领域</b>：
      <span class='sa-desc'>可用于代码自动补全、Bug快速定位与修复、自动生成详尽的测试用例及代码注释，极大降低编程门槛并提升效率。</span>
    </div>
  </div>
  <div class='sa-item'>
    <span class='sa-badge sa-badge-indigo'>创</span>
    <div class='sa-content'>
      <b class='sa-title'>内容创作领域</b>：
      <span class='sa-desc'>辅助撰写公文、新闻稿件、撰写短视频脚本或小说大纲，在人类创作陷入瓶颈时提供创意灵感与大纲思路。</span>
    </div>
  </div>
  <div class='sa-item'>
    <span class='sa-badge sa-badge-indigo'>数</span>
    <div class='sa-content'>
      <b class='sa-title'>数据分析领域</b>：
      <span class='sa-desc'>自动解析凌乱的 Excel 表格数据，生成对应的 SQL 查询脚本，并提炼关键数据结论生成多维度的总结性报告。</span>
    </div>
  </div>
</div>`
    },
    {
        title: "第2章：微调与知识库",
        q: "简述什么是“模型微调”，并说明它与“本地知识库”在实现本地化应用时的区别与各自适用场景。",
        tip: "<b>记忆口诀：【微调改变模型脑，知识外挂随时找】</b>",
        a: `<div class='sa-list'>
  <div class='sa-item'>
    <span class='sa-badge sa-badge-indigo'>调</span>
    <div class='sa-content'>
      <b class='sa-title'>模型微调 (Fine-tuning)</b>：
      <span class='sa-desc'><b>原理：</b>改变大模型底层的神经元权重，用特定行业数据进行二次训练。<b>特点：</b>内化知识，使模型适应特定语调、说话风格和专业逻辑。<b>场景：</b>需要特定人设、垂直领域专家（如专业法官、医生口吻回答）的深度定制。</span>
    </div>
  </div>
  <div class='sa-item'>
    <span class='sa-badge sa-badge-indigo'>库</span>
    <div class='sa-content'>
      <b class='sa-title'>本地知识库 (RAG)</b>：
      <span class='sa-desc'><b>原理：</b>不改变模型本身的参数权重。通过外挂数据库把问题相关的参考文本匹配出来，强塞进 Prompt 做开卷参考。<b>特点：</b>更新快（加减文档即可）、成本极低且回答精准、能提供数据溯源。<b>场景：</b>图书馆、企业内部制度问答，对幻觉容忍度极低的客服。</span>
    </div>
  </div>
</div>`
    },
    {
        title: "第2章：图片AIGC提示词",
        q: "请写出一个用于图片类AIGC工具的高质量提示词，生成“秋天银杏大道上的汉服少女”，并解释该提示词的关键要素。",
        tip: "<b>记忆口诀：【主体背景与光影，画质风格不可省】</b>",
        a: `<div class='sa-list'>
  <div class='sa-item'>
    <span class='sa-badge sa-badge-indigo'>词</span>
    <div class='sa-content'>
      <b class='sa-title'>提示词示例</b>：
      <span class='sa-desc'>“高清摄影，秋天的银杏大道，金黄色的落叶铺满地面，一位穿着精致红色汉服的年轻少女在道路中央迎着镜头缓步前行，温暖的夕阳透过杏叶的缝隙洒落斑驳光影，画面呈现唯美宁静的氛围，电影级光效，8k分辨率。”</span>
    </div>
  </div>
  <div class='sa-item'>
    <span class='sa-badge sa-badge-indigo'>主</span>
    <div class='sa-content'>
      <b class='sa-title'>主体描述 (Subject)</b>：
      <span class='sa-desc'>明确了“一位穿着精致红色汉服的年轻少女在道路中央迎着镜头缓步前行”，指明人物动作、装束。</span>
    </div>
  </div>
  <div class='sa-item'>
    <span class='sa-badge sa-badge-indigo'>景</span>
    <div class='sa-content'>
      <b class='sa-title'>环境背景 (Background)</b>：
      <span class='sa-desc'>“秋天的银杏大道，金黄色的落叶铺满地面”，锁定了季节特征与地表细节。</span>
    </div>
  </div>
  <div class='sa-item'>
    <span class='sa-badge sa-badge-indigo'>光</span>
    <div class='sa-content'>
      <b class='sa-title'>光影氛围 (Lighting & Mood)</b>：
      <span class='sa-desc'>“温暖的夕阳透过杏叶的缝隙洒落斑驳光影，画面呈现唯美宁静的氛围，电影级光效”，提升了画面的艺术张力。</span>
    </div>
  </div>
  <div class='sa-item'>
    <span class='sa-badge sa-badge-indigo'>质</span>
    <div class='sa-content'>
      <b class='sa-title'>画质风格限制 (Style & Quality)</b>：
      <span class='sa-desc'>“高清摄影”、“8k分辨率”，控制渲染细节，确保AI不会生成劣质或抽象画。</span>
    </div>
  </div>
</div>`
    },
    {
        title: "第2章：AI销售分析步骤",
        q: "说明如何利用AI智能办公工具自动分析一份销售数据表并生成趋势分析报告，请简述具体步骤。",
        tip: "<b>记忆口诀：【数据先导提问题，公式图表报告齐】</b>",
        a: `<div class='sa-list'>
  <div class='sa-item'>
    <span class='sa-badge sa-badge-indigo'>入</span>
    <div class='sa-content'>
      <b class='sa-title'>1. 数据导入与清洗</b>：
      <span class='sa-desc'>将销售明细 Excel 表格导入到集成了大模型或 AI 功能的办公软件中（如 WPS AI 或 Excel Copilot），检查有无空值错项。</span>
    </div>
  </div>
  <div class='sa-item'>
    <span class='sa-badge sa-badge-indigo'>问</span>
    <div class='sa-content'>
      <b class='sa-title'>2. 自然语言提出统计需求</b>：
      <span class='sa-desc'>在 AI 对话框中输入自然语言指令，例如：“帮我计算各地区的总销售额，并找出销量最高的产品分类”。</span>
    </div>
  </div>
  <div class='sa-item'>
    <span class='sa-badge sa-badge-indigo'>算</span>
    <div class='sa-content'>
      <b class='sa-title'>3. 自动计算与生成图表</b>：
      <span class='sa-desc'>AI 在后台自动编写所需的统计函数（如 SUMIF、VLOOKUP），生成汇总表并一键渲染出对应的可视化趋势柱状图或折线图。</span>
    </div>
  </div>
  <div class='sa-item'>
    <span class='sa-badge sa-badge-indigo'>报</span>
    <div class='sa-content'>
      <b class='sa-title'>4. 一键指令生成文字报告</b>：
      <span class='sa-desc'>向 AI 发出续写指令：“根据上述汇总数据和折线趋势，撰写一份包含原因总结和下季预测的300字趋势分析报告”。</span>
    </div>
  </div>
</div>`
    },
    {
        title: "第2章：图书馆问答案例",
        q: "结合图书馆智能问答案例，回答：(1)为何用本地知识库；(2)系统工作流程；(3)如何避免幻觉。",
        tip: "<b>记忆口诀：【防幻隐私用外挂，提问检索模型跨，溯源约束零偏差】</b>",
        a: `<div class='sa-list'>
  <div class='sa-item'>
    <span class='sa-badge sa-badge-indigo'>理</span>
    <div class='sa-content'>
      <b class='sa-title'>1. 为什么使用“本地知识库”而非直接问大模型</b>：
      <span class='sa-desc'>① 避免幻觉编造：大模型缺乏图书馆的内部实时信息，容易瞎编借阅规则；② 私密性与实时更新：馆内的具体藏书分布、实时借还状态均是私有的实时数据，直接询问通用模型无法获得。</span>
    </div>
  </div>
  <div class='sa-item'>
    <span class='sa-badge sa-badge-indigo'>流</span>
    <div class='sa-content'>
      <b class='sa-title'>2. 问答系统的工作流程</b>：
      <span class='sa-desc'>学生输入问题（如“怎么借书”） $\rightarrow$ 系统把问题做向量化并在本地检索出规则文档 $\rightarrow$ 把相关文档和学生原问题合并成提示词发送给大模型 $\rightarrow$ 模型阅读文档提炼成口语化答案 $\rightarrow$ 返回给学生。</span>
    </div>
  </div>
  <div class='sa-item'>
    <span class='sa-badge sa-badge-indigo'>控</span>
    <div class='sa-content'>
      <b class='sa-title'>3. 避免产生“幻觉”的具体措施</b>：
      <span class='sa-desc'>① 严格限制提示词：设定“请仅根据提供的本地知识库内容作答，若知识库未提，则回复不知道”；② 溯源比对：在回答中附加信息源链接、页码或书籍货架号，供学生二次交叉验证。</span>
    </div>
  </div>
</div>`
    },
    {
        title: "第2章：人物短片生成",
        q: "针对历史人物视频制作，推荐国内AI工具，并说明如何保持人物面部一致性以及语音克隆注意点。",
        tip: "<b>记忆口诀：【图文配音三利器，垫图锁脸保一致，克隆授权伦理治】</b>",
        a: `<div class='sa-list'>
  <div class='sa-item'>
    <span class='sa-badge sa-badge-indigo'>荐</span>
    <div class='sa-content'>
      <b class='sa-title'>1. 推荐国内 AIGC 工具</b>：
      <span class='sa-desc'>文案大纲用 DeepSeek/Kimi ；图片生成（手绘风格）用 通义万相/即梦AI ；语音解说合成用 腾讯智影/剪映。</span>
    </div>
  </div>
  <div class='sa-item'>
    <span class='sa-badge sa-badge-indigo'>同</span>
    <div class='sa-content'>
      <b class='sa-title'>2. 保证不同视频中历史人物形象一致性</b>：
      <span class='sa-desc'>① 在生图工具中使用“角色参考（Character Reference / --cref）”参数；② 在生图时使用“图生图（垫图）”功能，输入固定的第一张人物图像来约束后续面部特征。</span>
    </div>
  </div>
  <div class='sa-item'>
    <span class='sa-badge sa-badge-indigo'>克</span>
    <div class='sa-content'>
      <b class='sa-title'>3. 语音克隆工具与伦理规范</b>：
      <span class='sa-desc'>① 推荐剪映或奇妙元。② 伦理规范：必须获得被克隆人明确的书面声学授权；绝不能用于伪造发言、造谣或反欺诈安全验证；发布作品必须在显要位置注明“本视频声音由 AI 克隆生成”。</span>
    </div>
  </div>
</div>`
    },
    {
        title: "第2章：RAG基本原理",
        q: "简述RAG(检索增强生成)的基本原理及其在大模型应用中的作用。",
        tip: "<b>记忆口诀：【检索参考模型答，幻觉大减实时刷】</b>",
        a: `<div class='sa-list'>
  <div class='sa-item'>
    <span class='sa-badge sa-badge-indigo'>理</span>
    <div class='sa-content'>
      <b class='sa-title'>基本原理</b>：
      <span class='sa-desc'>结合了外部检索（如同搜索引擎）与生成模型（如大模型）。当用户提问时，系统首先去向量数据库检索出最相关的文本块，再把这些文本块和原问题作为上下文组装成 Prompt 给大模型，由模型归纳解答。</span>
    </div>
  </div>
  <div class='sa-item'>
    <span class='sa-badge sa-badge-indigo'>效</span>
    <div class='sa-content'>
      <b class='sa-title'>两大核心作用</b>：
      <span class='sa-desc'>① <b>减少幻觉：</b>将模型生硬的凭空猜测转化为“开卷考试”，有效提高答案准确性；② <b>获取最新知识：</b>无需昂贵的增量预训练，仅修改外部检索数据源，模型即可立刻回答最近发生的实时信息。</span>
    </div>
  </div>
</div>`
    },
    {
        title: "第2章：模型量化作用",
        q: "简述什么是模型量化，并说明它在本地部署大模型中的主要作用。",
        tip: "<b>记忆口诀：【高精缩成低位整，省电省卡运行猛】</b>",
        a: `<div class='sa-list'>
  <div class='sa-item'>
    <span class='sa-badge sa-badge-indigo'>质</span>
    <div class='sa-content'>
      <b class='sa-title'>量化概念</b>：
      <span class='sa-desc'>指将大模型内部连续、高精度的权重数值（如 32位 或 16位 浮点数，FP32/FP16）截断转换为低精度、离散的数值（如 4位 或 8位 整数，INT4/INT8）以压缩模型的技术。</span>
    </div>
  </div>
  <div class='sa-item'>
    <span class='sa-badge sa-badge-indigo'>用</span>
    <div class='sa-content'>
      <b class='sa-title'>主要作用</b>：
      <span class='sa-desc'>① <b>暴降显存门槛：</b>一个 70B 模型用 FP16 加载需要超 140G 显存，4bit量化后仅需约 40G 左右，家用电脑也能运行；② <b>推理加速：</b>低位整数乘加运算速度远快于高精浮点，显著缩短了生成每个 Token 的响应延迟。</span>
    </div>
  </div>
</div>`
    },
    {
        title: "第2章：敦煌飞天视频",
        q: "敦煌飞天壁画视频任务：(1)推荐国内视频生成工具；(2)主要步骤；(3)技术困难及解决思路。",
        tip: "<b>记忆口诀：【图生视频分步骤，分段首尾稳肢体】</b>",
        a: `<div class='sa-list'>
  <div class='sa-item'>
    <span class='sa-badge sa-badge-indigo'>具</span>
    <div class='sa-content'>
      <b class='sa-title'>1. 推荐国内工具</b>：
      <span class='sa-desc'>推荐使用可灵 AI（Kuaishou Keling）或即梦 AI（ByteDance Jimeng），这两者均具备世界领先的图生视频动力学和高逼真度渲染。</span>
    </div>
  </div>
  <div class='sa-item'>
    <span class='sa-badge sa-badge-indigo'>骤</span>
    <div class='sa-content'>
      <b class='sa-title'>2. 制作步骤</b>：
      <span class='sa-desc'>① 用 DeepSeek 编写壁画复活的画幅、分镜头与运镜提示词；② 导入生图软件（如通义万相）生成一到两张高精度静态敦煌壁画；③ 将静态原图导入可灵AI，输入图生视频提示词（如“彩带飘曳，漫步空中”）进行动态拟真；④ 在剪映等软件中剪辑并配置古风BGM。</span>
    </div>
  </div>
  <div class='sa-item'>
    <span class='sa-badge sa-badge-indigo'>克</span>
    <div class='sa-content'>
      <b class='sa-title'>3. 困难（彩带和肢体变形崩坏）与解决思路</b>：
      <span class='sa-desc'>① **困难**：飞天绸带是高柔性长线，AI极易在运动中发生物理混乱与身体扭曲。② **解决**：缩短单词生成帧数（如先生成3秒），启用“首尾帧控制”技术锁定绸带始末轨迹，在提示词中追加“物理合理性、人体解剖正确”的权重约束。</span>
    </div>
  </div>
</div>`
    },
    {
        title: "第2章：展品问答智能体",
        q: "展品信息智能问答体任务：(1)平台选择；(2)如何防胡编乱造；(3)智能体工作流程。",
        tip: "<b>记忆口诀：【无代码平台搭建，知识库约束加严，扫码匹配大模型显】</b>",
        a: `<div class='sa-list'>
  <div class='sa-item'>
    <span class='sa-badge sa-badge-indigo'>台</span>
    <div class='sa-content'>
      <b class='sa-title'>1. 平台推荐</b>：
      <span class='sa-desc'>推荐使用字节跳动旗下的扣子 (Coze) 平台搭建。它内置了完备的知识库管理、插件机制与工作流模块，无需任何代码经验即可开发。</span>
    </div>
  </div>
  <div class='sa-item'>
    <span class='sa-badge sa-badge-indigo'>防</span>
    <div class='sa-content'>
      <b class='sa-title'>2. 防胡编乱造措施</b>：
      <span class='sa-desc'>① **外挂知识库**：把所有展品名称、朝代、背后的历史故事文档整理成 TXT/PDF，上传到扣子知识库中；② **高强度提示词限制**：在 Prompt 中强制约束：“你只能用知识库里的内容回答展品。要是观众问的藏品库里没有，就回答‘抱歉，暂未收录该藏品信息’，决不能瞎编”；③ **降低模型温度**：将 Temperature 调至 0.1 或 0，使其生成极度确定性。</span>
    </div>
  </div>
  <div class='sa-item'>
    <span class='sa-badge sa-badge-indigo'>流</span>
    <div class='sa-content'>
      <b class='sa-title'>3. 智能体交互流程</b>：
      <span class='sa-desc'>观众现场扫码 $\rightarrow$ 弹出扣子智能体界面 $\rightarrow$ 观众输入自然语言问题 $\rightarrow$ 智能体先在后台检索知识库 $\rightarrow$ 找到对应的瓷器或剪纸资料段落 $\rightarrow$ 将段落和问题一同送入大模型提炼回答 $\rightarrow$ 文本显示并自动语音播报给观众。</span>
    </div>
  </div>
</div>`
    }
];
