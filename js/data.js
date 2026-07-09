/**
 * 具身智能众创云空间 — 静态数据
 * 所有 Mock 数据集中在此文件定义，各组件通过 window.AppData 引用
 */
window.AppData = {
  // ===== HOME =====
  homeStats: [
    { value: '1,200+', label: '数据集资源' },
    { value: '350+', label: '预训练模型' },
    { value: '80+', label: '认证企业' },
    { value: '5,000+', label: '活跃开发者' }
  ],
  coreModules: [
    { id: 'dataset', name: '数据集中心', icon: 'dataset', desc: '海量高质量训练数据' },
    { id: 'model', name: '模型库', icon: 'model', desc: 'URDF & AI 模型资源' },
    { id: 'course', name: '课程中心', icon: 'course', desc: '系统化学习路径' },
    { id: 'simulation', name: '云仿真平台', icon: 'simulation', desc: '高精度物理仿真' },
    { id: 'devtool', name: '研发工具', icon: 'devtool', desc: '智能选型引导' },
    { id: 'monitor', name: '云监控平台', icon: 'monitor', desc: '实时设备监控' },
    { id: 'devzone', name: '二次开发', icon: 'devzone', desc: '完整开发工具链' },
    { id: 'standard', name: '标准认证', icon: 'standard', desc: '权威认证路径' },
    { id: 'mall', name: '供应链商城', icon: 'mall', desc: '优质零部件采购' },
    { id: 'community', name: '众创社区', icon: 'community', desc: '开发者交流平台' },
    { id: 'paper', name: '论文解读', icon: 'paper', desc: '前沿论文深度解读' },
    { id: 'testfield', name: '测试场地', icon: 'testfield', desc: '专业场地预约测试' },
  ],
  latestNews: [
    { id:1, date:'2025-05-18', title:'平台数据集突破1200个，涵盖灵巧手、双足等多类本体', excerpt:'本次新增200+机器人操作类数据集，支持云端一键训练，显著提升研发效率。', tag:'平台公告', tagType:'primary' },
    { id:2, date:'2025-05-12', title:'具身智能云仿真平台2.0发布，支持Isaac Sim集成', excerpt:'新版本引入NVIDIA Isaac Sim引擎，仿真精度提升300%，支持100+机器人型号。', tag:'版本更新', tagType:'success' },
    { id:3, date:'2025-05-05', title:'2025具身智能创新大赛报名开启，奖金池100万元', excerpt:'聚焦家庭服务、工业装配、医疗辅助三大赛道，欢迎全球开发者参赛。', tag:'赛事活动', tagType:'warning' },
    { id:4, date:'2025-04-28', title:'华为、宇树科技等20家企业正式入驻供应链商城', excerpt:'平台供应链生态持续扩大，累计合作供应商突破100家。', tag:'生态合作', tagType:'' },
    { id:5, date:'2025-04-20', title:'具身智能国家标准（征求意见稿）发布，平台率先适配', excerpt:'首批5项行业标准已上线，支持在线自查与认证申请。', tag:'标准动态', tagType:'info' },
  ],
  partners: ['华为技术', '宇树科技', '智元机器人', '傅利叶智能', '宇泛智能', '中科院自动化所', '北京航空航天大学', '清华大学', '腾讯云', '阿里云', '百度飞桨', '英特尔'],

  // ===== HOME — 平台优势 =====
  advantages: [
    { icon: 'bolt', title: '一站式全链路', desc: '从数据采集、模型训练到仿真测试、设备部署，打通研发全流程，无需在多平台间切换' },
    { icon: 'cloud', title: '弹性云端算力', desc: '支持阿里云百炼与昆仑元双算力调度，按需弹性扩缩容，任务并发效率提升10倍' },
    { icon: 'shield', title: '权威标准认证', desc: '内置ISO/GB/CE等国内外标准库，提供在线自测工具，加速产品认证与市场准入' },
    { icon: 'puzzle', title: '开放二次开发', desc: '提供完整SDK与API接口，支持URDF模型导入、自定义算法集成，灵活适配各类场景' },
  ],
  featuredDatasets: [
    { name:'Open X-Embodiment (OXE)', count:'100万+ 轨迹', source:'Google DeepMind', tags:['全球最大','跨机器人'], scene:'通用操作', img:'images/ds_oxe.jpg' },
    { name:'智元 Agibot World', count:'1M+ 轨迹', source:'智元机器人', tags:['国内首个','人形机器人'], scene:'具身操作', img:'images/ds_agibot.jpg' },
    { name:'GraspNet-1Billion', count:'11亿 抓取姿态', source:'清华大学', tags:['清华开源','全球最大'], scene:'抓取感知', img:'images/ds_graspnet.jpg' },
  ],
  techEcosystem: [
    { name:'PyTorch', type:'框架' }, { name:'TensorFlow', type:'框架' }, { name:'JAX', type:'框架' },
    { name:'ROS2', type:'系统' }, { name:'Isaac Sim', type:'仿真' }, { name:'MuJoCo', type:'仿真' },
    { name:'OpenCV', type:'视觉' }, { name:'YOLO', type:'视觉' }, { name:'PCL', type:'点云' },
    { name:'CUDA', type:'加速' }, { name:'ONNX', type:'部署' }, { name:'Docker', type:'容器' },
    { name:'ElasticSearch', type:'数据' }, { name:'Prometheus', type:'监控' }, { name:'Kubernetes', type:'编排' },
    { name:'OPC UA', type:'通信' },
  ],
  testimonials: [
    { name:'李博士', role:'清华大学机器人实验室 · 研究员', avatar:'L', content:'平台的数据集质量和数量远超预期，特别是多模态融合类数据集，让我们的模仿学习研究效率提升了3倍。', rating:5 },
    { name:'张工', role:'宇树科技 · 高级算法工程师', avatar:'Z', content:'云仿真平台的Isaac Sim集成非常流畅，从URDF导入到分布式训练一键完成，极大缩短了我们的开发周期。', rating:5 },
    { name:'王总', role:'某协作机器人企业 · CTO', avatar:'W', content:'标准认证中心的在线自测工具帮我们提前发现了多个合规问题，产品CE认证周期从6个月缩短到了3个月。', rating:5 },
  ],

  // ===== DATASET（真实外站数据集，点击跳转官方链接）=====
  datasetCategories: ['全部', '通用机械臂/具身操作', '国内开源', '抓取与6D姿态', '移动机器人/室内导航', '灵巧手/人形机器人', '仿真数据集', '巡检识别'],
  datasetCategoryMap: {
    '通用机械臂/具身操作': { color: '#1565C0', icon: '🦾' },
    '国内开源': { color: '#E65100', icon: '🇨🇳' },
    '抓取与6D姿态': { color: '#6A1B9A', icon: '🤏' },
    '移动机器人/室内导航': { color: '#00695C', icon: '🧭' },
    '灵巧手/人形机器人': { color: '#BF360C', icon: '🤖' },
    '仿真数据集': { color: '#4527A0', icon: '💻' },
    '巡检识别': { color: '#2E7D32', icon: '🔍' },
  },
  datasets: [
    // 一、通用机械臂 / 具身操作
    { id:1, name:'Open X-Embodiment (OXE)', category:'通用机械臂/具身操作', count:'100万+ 真实轨迹', source:'Google DeepMind', url:'https://robotics-transformer-x.github.io/', tags:['跨机器人','预训练','VLA'], desc:'全球最大跨机器人通用预训练数据集，22种机器人，60个数据源，支持视觉-语言-动作模型训练。' },
    { id:2, name:'DROID', category:'通用机械臂/具身操作', count:'7.6万 野外轨迹', source:'ETH Zürich / CMU', url:'https://droid-dataset.github.io/', tags:['真实环境','鲁棒操控','单臂'], desc:'真实杂乱环境、动态干扰下的鲁棒操控数据集，基于Franka Panda单臂采集。' },
    { id:3, name:'RT-1 / RT-2', category:'通用机械臂/具身操作', count:'13.5万 轨迹', source:'Google DeepMind', url:'https://robotics-transformer-x.github.io/', tags:['VLA标杆','语言指令','桌面操作'], desc:'视觉-语言-动作（VLA）技术标杆数据集，覆盖桌面日常操作任务。' },
    { id:4, name:'BridgeData V2', category:'通用机械臂/具身操作', count:'6万+ 轨迹', source:'UC Berkeley', url:'https://rail.eecs.berkeley.edu/datasets/bridge_release/', tags:['低成本机器人','开放词汇'], desc:'低成本机器人适配，开放词汇任务，适合具身智能入门研究。' },
    { id:5, name:'RoboSet', category:'通用机械臂/具身操作', count:'28500 条完整轨迹', source:'MIT', url:'https://robopen.github.io/roboset/', tags:['多视角','自然语言','厨房任务'], desc:'28500条完整轨迹（9500遥操作+19000动觉），4视角，厨房多任务，含自然语言指令标注。' },
    // 二、国内开源
    { id:6, name:'智元 Agibot World', category:'国内开源', count:'1M+ 轨迹 / 2976.4小时', source:'智元机器人', url:'https://huggingface.co/agibot-world', tags:['国内首个','百万级','人形机器人'], desc:'国内首个百万级真实人形机器人数据集，217个任务，3000+物体，持续更新中。' },
    { id:7, name:'宇树 UnifoLM-WBT-Dataset', category:'国内开源', count:'189万条 真实轨迹', source:'宇树科技', url:'https://huggingface.co/collections/unitreerobotics/unifolm-wbt-dataset', tags:['2026最新','全身遥操作','G1/H1'], desc:'支持G1/H1人形机器人，全身遥操作数据，2026年3月最新开源，持续更新。' },
    { id:8, name:'宇树 G1 精细操作数据集', category:'国内开源', count:'5类核心操作任务', source:'宇树科技', url:'https://huggingface.co/unitreerobotics', tags:['灵巧手','多模态','精细动作'], desc:'三指灵巧手多模态数据，含拧瓶盖、叠积木、物品收纳等精细动作任务。' },
    { id:9, name:'华为白虎数据集', category:'国内开源', count:'10万+ 高质量任务数据', source:'华为', url:'https://www.openloong.org.cn/cn/datasets/baihu', tags:['异构机器人','视触觉','百万量级'], desc:'全球首个百万量级异构机器人数据集，跨本体视触觉数据。' },
    { id:10, name:'大疆 RoboMaster 2019', category:'国内开源', count:'比赛场景标注', source:'大疆创新', url:'https://www.robomaster.com/zh-CN/resource/download', tags:['竞技机器人','视觉感知','基准测试'], desc:'竞技机器人视觉感知基准，装甲板检测标注，1920×1080分辨率。' },
    // 三、抓取与 6D 姿态
    { id:11, name:'GraspNet-1Billion', category:'抓取与6D姿态', count:'11亿 抓取姿态', source:'清华大学', url:'https://graspnet.net/', tags:['全球最大','清华开源','真实场景'], desc:'清华开源，全球最大真实场景抓取数据集，190个场景，97280张图像。' },
    { id:12, name:'Dex-Net', category:'抓取与6D姿态', count:'百万级 抓取数据', source:'UC Berkeley', url:'https://berkeleyautomation.github.io/dex-net/', tags:['抓取质量','夹爪/吸盘','仿真+真实'], desc:'百万级抓取数据（仿真+真实），支持夹爪/吸盘，抓取质量评估与策略训练基准。' },
    // 四、移动机器人 / 室内导航
    { id:13, name:'ALFRED', category:'移动机器人/室内导航', count:'家庭环境 长流程任务', source:'Facebook AI', url:'https://github.com/askforalfred/alfred', tags:['具身推理','任务规划','语言指令'], desc:'家庭环境语言指令+长流程任务数据集，具身推理与任务规划标杆。' },
    { id:14, name:'RoboTHOR', category:'移动机器人/室内导航', count:'仿真室内 视觉导航', source:'Allen AI (AI2)', url:'https://ai2thor.allenai.org/robothor/', tags:['sim2real','语言交互','虚实配对'], desc:'虚实配对场景，支持sim2real迁移，视觉导航+语言交互。' },
    { id:15, name:'iGibson', category:'移动机器人/室内导航', count:'15个真实交互场景', source:'Stanford', url:'https://github.com/StanfordVL/iGibson', tags:['高保真仿真','VR采集','8000+场景'], desc:'高保真物理仿真，支持VR数据采集，兼容8000+第三方场景。' },
    // 五、灵巧手 / 人形机器人
    { id:16, name:'DexYCB', category:'灵巧手/人形机器人', count:'119GB', source:'Stanford', url:'https://dex-ycb.github.io/', tags:['人手交互','多视角','6D姿态标注'], desc:'119GB人手-物体交互与灵巧操作基准数据集，88个物体，多视角6D姿态标注。' },
    // 六、仿真数据集
    { id:17, name:'Meta-World', category:'仿真数据集', count:'50+ 机械臂任务', source:'UC Berkeley', url:'https://meta-world.github.io/', tags:['元学习','多任务迁移','RL基准'], desc:'50+机械臂任务，元学习基准，支持多任务迁移与元强化学习研究。' },
    { id:18, name:'RLBench', category:'仿真数据集', count:'100+ 仿真任务', source:'Stanford / Imperial', url:'https://github.com/stepjam/RLBench', tags:['长时序','少样本','模仿学习'], desc:'100+仿真任务，长时序操作，少样本学习与模仿学习基准。' },
    // 七、巡检识别
    // — 火灾/烟雾 —
    { id:19, name:'FIRE (Fire Image Recognition)', category:'巡检识别', count:'1000+ 张火情图像', source:'Kaggle', url:'https://www.kaggle.com/datasets/phylake1337/fire-dataset', tags:['火灾检测','烟雾识别','二分类'], desc:'1000+张火情/非火情标注图像，含室内外多种场景，支持火灾早期预警模型训练。' },
    { id:20, name:'BoWFire 烟雾火灾数据集', category:'巡检识别', count:'2类 火灾/正常场景', source:'IEEE DataPort', url:'https://ieee-dataport.org/open-access/bowfire-dataset', tags:['烟雾检测','早期预警','监控视频'], desc:'火灾烟雾检测专用数据集，含火焰和烟雾双类别标注，适合烟雾识别与早期火灾预警。' },
    // — 遗弃物品 —
    { id:21, name:'PETS 2006 遗弃行李检测', category:'巡检识别', count:'多视角 监控视频', source:'University of Reading', url:'http://www.reading.ac.uk/~peopletrng/peds.html', tags:['遗弃行李','监控视频','多视角'], desc:'PETS基准数据集，含物品遗留（unattended luggage）检测任务，支持公共安全监控算法评估。' },
    { id:22, name:'AVSS 2007 遗弃物品', category:'巡检识别', count:'110+ 视频序列', source:'IEEE AVSS', url:'https://github.com/sekwonlee00/Abandoned-Object-Detection', tags:['遗弃检测','安防监控','视频分析'], desc:'IEEE AVSS 2007挑战赛数据集，含遗弃行李场景，多场景复杂度标注，适合安防检测研究。' },
    // — 行人/跌倒 —
    { id:23, name:'UR Fall Detection Dataset', category:'巡检识别', count:'30 跌倒 + 40 日常活动', source:'University of Rzeszów', url:'https://fenix.ur.edu.pl/~mkepski/ds/uf.html', tags:['跌倒检测','行为识别','Kinect深度'], desc:'含跌倒事件30段 + 日常活动40段，Kinect双视角 + 加速度计数据，支持老人看护与溺水预警。' },
    { id:24, name:'FallVision 跌倒检测基准', category:'巡检识别', count:'1000+ 跌倒/非跌倒视频', source:'ScienceDirect', url:'https://www.sciencedirect.com/science/article/pii/S2352340925001726', tags:['跌倒基准','视频理解','室内看护'], desc:'2025年最新跌倒检测视频基准，含室内外多场景跌倒与非跌倒分类，适合智能看护系统。' },
    // — 行人计数 —
    { id:25, name:'Shanghai Tech 人群计数', category:'巡检识别', count:'1198张 33.8万标注人头', source:'ShanghaiTech University', url:'https://github.com/luxiangqiang/Shanghaitech', tags:['人群计数','密度图','大规模'], desc:'上海科技大学大规模人群计数数据集，Part_A/B两部分，含密度图标注，适合公共场所人数统计。' },
    { id:26, name:'UCSD 行人计数基准', category:'巡检识别', count:'连续帧 行人标注', source:'UC San Diego', url:'https://www.kaggle.com/datasets/annisauswasufia/shanghai-tech-crowd-counting-dataset', tags:['行人计数','密度估计','视频分析'], desc:'UCSD校园监控视频，含透视密度图与人数标注，适合边缘密度估计与实时行人计数研究。' },
    // — 果实成熟度 —
    { id:27, name:'FruitVision 水果品质基准', category:'巡检识别', count:'81K+ 张 5类水果', source:'Mendeley Data', url:'https://data.mendeley.com/datasets/xkbjx8959c/2', tags:['成熟度检测','多分类','81K规模'], desc:'涵盖苹果/香蕉/芒果/橙子/葡萄5类，含新鲜/腐败/福尔马林浸泡检测，81K+高分辨率图像。' },
    { id:28, name:'芒果香蕉成熟度检测数据集', category:'巡检识别', count:'YOLO格式 室外自然光', source:'Mendeley / HuggingFace', url:'https://huggingface.co/datasets/darthraider/fruit-ripeness-detection-dataset', tags:['YOLO格式','自然光','芒果香蕉'], desc:'芒果和香蕉成熟度检测YOLO格式数据集，自然室外光照条件，含raw/ripe/rotten三分类标注。' },
    // — 无人机巡检 —
    { id:29, name:'Blade30 风机叶片缺陷数据集', category:'巡检识别', count:'1065张 6类缺陷图像', source:'Scientific Data', url:'https://github.com/cong-yang/Blade30', tags:['风机叶片','无人机巡检','缺陷检测'], desc:'风机叶片表面缺陷多分类数据集（缺口/裂纹/污渍等6类），Nature子刊发表，支持无人机巡检。' },
    { id:30, name:'DroneCrowd 无人机人群计数', category:'巡检识别', count:'33个场景 2.3万标注人头', source:'GitHub', url:'https://github.com/VisDrone/DroneCrowd', tags:['航拍人群','无人机','密度回归'], desc:'VisDrone子系列，33个不同场景航拍视频，含多种密度级别，支持无人机视角人群密度估计。' },
    // — 工业缺陷 —
    { id:31, name:'MVTEC Anomaly Detection', category:'巡检识别', count:'15类工业产品 5000+ 缺陷图', source:'MVTec / KIT', url:'https://www.mvtec.com/company/research/datasets/mvtec-ad', tags:['工业缺陷','异常检测','无监督'], desc:'MVTec工业异常检测基准，含金属/木材/纺织品等15类产品，含正常/缺陷双类别，适合制造质量检测。' },
  ],

  // ===== MODEL =====
  modelTree: [
    { id:'1', label:'四足机器人', children:[{id:'1-1',label:'宇树 Go系列'},{id:'1-2',label:'宇树 Aliengo/B系列'},{id:'1-3',label:'ANYmal 系列'},{id:'1-4',label:'Boston Dynamics'}] },
    { id:'2', label:'人形机器人', children:[{id:'2-1',label:'宇树 H/G系列'},{id:'2-2',label:'Agility Digit'},{id:'2-3',label:'智元/傅利叶'},{id:'2-4',label:'Figure AI'}] },
    { id:'3', label:'工业/协作机械臂', children:[{id:'3-1',label:'Franka Panda'},{id:'3-2',label:'Universal Robots'},{id:'3-3',label:'FANUC'}] },
    { id:'4', label:'灵巧手/末端执行器', children:[{id:'4-1',label:'Dexterous Hand'},{id:'4-2',label:'Robotiq 夹爪'}] },
    { id:'5', label:'移动操作机器人', children:[{id:'5-1',label:'Hello Robot Stretch'},{id:'5-2',label:'TIAGo'}] },
    { id:'6', label:'教育/开源', children:[{id:'6-1',label:'Poppy 系列'},{id:'6-2',label:'SO-ARM 系列'},{id:'6-3',label:'其他教具'}] },
  ],
  urdfModels: [
    // 四足机器人
    { id:1,  name:'Unitree Go1',      category:'四足机器人',     format:'URDF',     icon:'🐕', desc:'Unitree Go1 四足机器人，12自由度，适合科研与教育。',                                      version:'1.0',   downloads:'3,200',  size:'32 KB',  file:'models/urdf/quadruped/unitree_go1.urdf',     image:'models/images/quadruped/unitree_go1.png' },
    { id:2,  name:'Unitree Go2',      category:'四足机器人',     format:'URDF',     icon:'🐕', desc:'Unitree Go2 四足机器人，标配4D LiDAR，高性能运动控制。',                                version:'1.0',   downloads:'5,100',  size:'27 KB',  file:'models/urdf/quadruped/unitree_go2.urdf',     image:'models/images/quadruped/unitree_go2.png' },
    { id:3,  name:'Unitree A1',       category:'四足机器人',     format:'URDF',     icon:'🐕', desc:'Unitree A1 高速四足机器人，极大加速度，适合强化学习研究。',                      version:'1.0',   downloads:'2,800',  size:'23 KB',  file:'models/urdf/quadruped/unitree_a1.urdf',      image:'models/images/quadruped/unitree_a1.png' },
    { id:4,  name:'Unitree AlienGo',  category:'四足机器人',     format:'URDF',     icon:'🐕', desc:'Unitree AlienGo 工业级四足机器人，IP65防护，支持室外作业。',                  version:'1.0',   downloads:'1,900',  size:'22 KB',  file:'models/urdf/quadruped/unitree_aliengo.urdf', image:'models/images/quadruped/unitree_aliengo.png' },
    { id:5,  name:'Unitree Laikago',  category:'四足机器人',     format:'URDF',     icon:'🐕', desc:'Unitree Laikago 经典四足平台，开源社区支持广泛。',                              version:'1.0',   downloads:'4,500',  size:'16 KB',  file:'models/urdf/quadruped/unitree_laikago.urdf', image:'models/images/quadruped/unitree_laikago.png' },
    { id:6,  name:'Unitree B1',       category:'四足机器人',     format:'URDF',     icon:'🐕', desc:'Unitree B1 工业防水四足机器人，适用于复杂地形巡检。',                        version:'1.0',   downloads:'1,200',  size:'41 KB',  file:'models/urdf/quadruped/unitree_b1.urdf',      image:'models/images/quadruped/unitree_b1.png' },
    { id:7,  name:'Unitree B2',       category:'四足机器人',     format:'URDF',     icon:'🐕', desc:'Unitree B2 最新工业四足机器人，续航与承载力全面升级。',                          version:'1.0',   downloads:'980',    size:'26 KB',  file:'models/urdf/quadruped/unitree_b2.urdf',      image:'models/images/quadruped/unitree_b2.png' },
    // 人形机器人
    { id:8,  name:'Unitree H1',       category:'人形机器人',     format:'URDF',     icon:'🤖', desc:'Unitree H1 通用人形机器人，19自由度，全身运动控制。',                              version:'1.0',   downloads:'2,100',  size:'23 KB',  file:'models/urdf/humanoid/unitree_h1.urdf',       image:'models/images/humanoid/unitree_h1.png' },
    { id:9,  name:'Unitree H1-2',     category:'人形机器人',     format:'URDF',     icon:'🤖', desc:'Unitree H1-2 升级版，支持灵巧手，全身29自由度。',                              version:'1.0',   downloads:'1,500',  size:'52 KB',  file:'models/urdf/humanoid/unitree_h1_2.urdf',     image:'models/images/humanoid/unitree_h1_2.png' },
    { id:10, name:'Unitree G1 (29DoF)',category:'人形机器人',    format:'URDF',     icon:'🤖', desc:'Unitree G1 轻量人形机器人，29自由度含灵巧手，适合具身智能研究。',        version:'1.0',   downloads:'3,800',  size:'33 KB',  file:'models/urdf/humanoid/unitree_g1_29dof.urdf', image:'models/images/humanoid/unitree_g1_29dof.png' },
    { id:11, name:'Unitree H2',       category:'人形机器人',     format:'URDF',     icon:'🤖', desc:'Unitree H2 全尺寸通用人形机器人，大负载高精度。',                                version:'1.0',   downloads:'860',    size:'30 KB',  file:'models/urdf/humanoid/unitree_h2.urdf',       image:'models/images/humanoid/unitree_h2.png' },
    { id:12, name:'Agility Digit',     category:'人形机器人',    format:'URDF',     icon:'🤖', desc:'Agility Robotics Digit 双足机器人，稼动式腿部，适合物流场景。',                  version:'1.0',   downloads:'1,100',  size:'24 KB',  file:'models/urdf/humanoid/digit.urdf',            image:'models/images/humanoid/agility_digit.png' },
    // 机械臂
    { id:13, name:'Franka Panda',     category:'工业/协作机械臂', format:'URDF',    icon:'🦾', desc:'Franka Emika Panda 7自由度协作机械臂，关节力矩传感，适合人机协作。',      version:'1.0',   downloads:'8,900',  size:'7 KB',   file:'models/urdf/arm/franka_panda.urdf',          image:'models/images/arm/franka_panda.png' },
    { id:14, name:'FANUC M-710iC',    category:'工业/协作机械臂', format:'URDF',    icon:'🦾', desc:'FANUC M-710iC 工业机械臂，大负载焊接/搬运场景。',                          version:'1.0',   downloads:'1,200',  size:'5 KB',   file:'models/urdf/arm/fanuc_m10ia.urdf',           image:'models/images/arm/fanuc_m710ic.png' },
    { id:15, name:'Unitree Z1',       category:'工业/协作机械臂', format:'URDF',    icon:'🦾', desc:'Unitree Z1 6自由度机械臂，轻量化设计，可搭载于四足机器人。',                  version:'1.0',   downloads:'2,100',  size:'8 KB',   file:'models/urdf/arm/unitree_z1.urdf',            image:'models/images/arm/unitree_z1.png' },
    // 灵巧手
    { id:16, name:'Dexterous Hand v1',category:'灵巧手/末端执行器',format:'URDF',  icon:'✋', desc:'Unitree Dexterous Hand v1 16自由度灵巧手，适配G1/H1-2。',                     version:'1.0',   downloads:'780',    size:'6 KB',   file:'models/urdf/hand/unitree_dex1_1.urdf',       image:'models/images/hand/unitree_dex1.png' },
    // 教育
    { id:17, name:'Poppy Ergo Jr',    category:'教育/开源',       format:'URDF',    icon:'🤖', desc:'Poppy Ergo Jr 开源教育机械臂，3D打印低成本，适合教学演示。',                  version:'1.0',   downloads:'3,400',  size:'8 KB',   file:'models/urdf/education/poppy_ergo_jr.urdf',   image:'models/images/education/poppy_ergo_jr.png' },
    // ===== 新增热门机器人 =====
    // 人形机器人（新增）
    { id:18, name:'智元 X2',           category:'人形机器人',     format:'URDF',     icon:'🤖', desc:'智元X2通用人形机器人，49自由度，搭载插臂式灵巧手，面向具身智能研究与商业落地。',     version:'1.0',   downloads:'1,650',  size:'48 KB',  file:'models/urdf/humanoid/agibot_x2.urdf',        image:'models/images/humanoid/agibot_x2.png' },
    { id:19, name:'SO-ARM101',        category:'教育/开源',       format:'URDF',     icon:'🤖', desc:'SO-ARM101 开源6自由度机械臂，3D打印低成本，支持视觉伺服，适合教育与具身智能入门。',   version:'1.0',   downloads:'2,200',  size:'12 KB',  file:'models/urdf/education/so_arm101.urdf',       image:'models/images/education/so_arm101.png' },
    { id:20, name:'傅利叶 GR-1',       category:'人形机器人',     format:'URDF',     icon:'🤖', desc:'傅利叶GR-1通用人形机器人，54自由度，支持全身运动控制与交互，面向科研与商业化。',     version:'1.0',   downloads:'1,320',  size:'45 KB',  file:'models/urdf/humanoid/fourier_gr1.urdf',      image:'models/images/humanoid/fourier_gr1.png' },
    // 四足机器人（新增）
    { id:21, name:'Boston Dynamics Spot',category:'四足机器人',  format:'URDF',     icon:'🐕', desc:'Boston Dynamics Spot 工业级四足机器人，自主导航与巡检作业平台，支持机械臂扩展。',   version:'1.0',   downloads:'4,800',  size:'55 KB',  file:'models/urdf/quadruped/boston_spot.urdf',     image:'models/images/quadruped/boston_spot.png' },
    { id:22, name:'ANYmal C',          category:'四足机器人',     format:'URDF',     icon:'🐕', desc:'ANYmal C 工业级四足机器人，ETH Zürich研发，IP67防护，适合恶劣环境自主作业。',      version:'1.0',   downloads:'1,750',  size:'38 KB',  file:'models/urdf/quadruped/anymal_c.urdf',        image:'models/images/quadruped/anymal_c.png' },
    // 机械臂（新增）
    { id:23, name:'UR5e',              category:'工业/协作机械臂', format:'URDF',    icon:'🦾', desc:'Universal Robots UR5e 协作机械臂，6自由度，负载5kg，工作半径850mm，±0.1mm精度。',  version:'1.0',   downloads:'6,700',  size:'9 KB',   file:'models/urdf/arm/ur5e.urdf',                  image:'models/images/arm/ur5e.png' },
    // 人形机器人（新增）
    { id:24, name:'Figure 02',         category:'人形机器人',     format:'URDF',     icon:'🤖', desc:'Figure 02 通用人形机器人，搭载多模态AI大模型，面向工业装配与家庭服务场景。',       version:'1.0',   downloads:'2,900',  size:'42 KB',  file:'models/urdf/humanoid/figure_02.urdf',        image:'models/images/humanoid/figure_02.png' },
  ],
  aiModels: [
    { id:101, name:'RT-2 机器人变换器', category:'端到端控制', framework:'JAX', icon:'🧠', desc:'Google DeepMind RT-2，视觉-语言-动作联合模型', accuracy:'89.4%', params:'55B', version:'1.0.0', downloads:'3,210' },
    { id:102, name:'ACT 行为克隆', category:'模仿学习', framework:'PyTorch', icon:'🎭', desc:'Action Chunking with Transformers，高精度双臂操作', accuracy:'92.1%', params:'86M', version:'1.2.0', downloads:'6,540' },
    { id:103, name:'Diffusion Policy', category:'生成式策略', framework:'PyTorch', icon:'🌊', desc:'扩散模型驱动的机器人操作策略，鲁棒性出色', accuracy:'87.6%', params:'120M', version:'0.9.5', downloads:'4,320' },
    { id:104, name:'DreamerV3 世界模型', category:'强化学习', framework:'JAX', icon:'💭', desc:'基于世界模型的无模型强化学习，样本效率高', accuracy:'85.2%', params:'200M', version:'3.0.0', downloads:'2,890' },
    { id:105, name:'OpenVLA 视觉语言动作', category:'多模态', framework:'PyTorch', icon:'👁️', desc:'开源视觉-语言-动作模型，支持自然语言指令控制', accuracy:'91.3%', params:'7B', version:'1.0.0', downloads:'5,670' },
    { id:106, name:'SAM2-Robot 分割模型', category:'视觉感知', framework:'PyTorch', icon:'🎯', desc:'Meta SAM2机器人版，实时目标分割与追踪', accuracy:'96.8%', params:'636M', version:'2.0.0', downloads:'8,120' },
  ],

  // ===== COURSE =====
  courseCategories: ['全部', '入门基础', '运动控制', '感知算法', '强化学习', '仿真平台', '行业前沿'],
  courses: [
    { id:1, title:'【自制】我造了一台钢铁侠的迷你机械臂 ！【硬核】', uploader:'稚晖君', views:'2043.8万', level:'入门', levelType:'success', category:'行业前沿', cover:'images/course_01.jpg', url:'https://www.bilibili.com/video/BV12341117rG', desc:'小型的高精度6轴机械臂在市面上几乎是空白，而up又很喜欢这类小巧紧凑的设备，所以自己从头设计了一台很酷的小手子，机械臂名为Dummy。' },
    { id:2, title:'ROS机器人入门教程（49小时·367集）', uploader:'Autolabor官方', views:'337.4万', level:'入门', levelType:'success', category:'入门基础', cover:'images/course_02.png', url:'https://www.bilibili.com/video/BV1Ci4y1L7ZZ', desc:'全网最经典的ROS入门课程，367集系统教学覆盖通信机制、导航、建图、SLAM等核心知识，配套GitHub代码仓库。' },
    { id:3, title:'2025公认最通俗易懂的具身智能实战入门教程', uploader:'RoboTech·机器人之心', views:'18.5万', level:'入门', levelType:'success', category:'入门基础', cover:'images/course_03.jpg', url:'https://www.bilibili.com/video/BV1sdfoBEEgq', desc:'从零部署Isaac Gym强化学习环境，覆盖多模态大模型、自然语言交互、强化学习、模仿学习，AI开发者实战指南。' },
    { id:4, title:'ROS2理论与实践_宇树机器人Go2开发指南', uploader:'赵虚左&宇树科技Support', views:'5.2万', level:'进阶', levelType:'warning', category:'运动控制', cover:'images/course_04.jpg', url:'https://www.bilibili.com/video/BV1vv5YzBEQH/', desc:'宇树科技官方课程，深入讲解四足机器人Go2的ROS开发、运动控制与二次开发，含实机演示。' },
    { id:5, title:'基于NVIDIA Isaac Lab的人形机器人步态训练全流程', uploader:'Maker_AI', views:'3.1万', level:'进阶', levelType:'warning', category:'仿真平台', cover:'images/course_05.jpg', url:'https://www.bilibili.com/video/BV1pCXHYBEcU', desc:'完整演示通过NVIDIA Isaac Lab训练双足机器人实现稳定行走，含关节扭矩反馈与目标速度奖励函数设计。' },
    { id:6, title:'【整整200集】2025最全最细的ROS2机器人零基础入门全套教程', uploader:'是机器人饲养员', views:'89.3万', level:'入门', levelType:'success', category:'入门基础', cover:'images/course_06.png', url:'https://www.bilibili.com/video/BV1HSEQz1E1M', desc:'ROS2零基础入门到实践，从环境搭建、项目构建到开发者工具配置，200集全程通俗易懂。' },
    { id:7, title:'【山猫M20】具身智能开发第一期：ROS2结构介绍与盲走运控', uploader:'云深处实验室', views:'4436', level:'高级', levelType:'danger', category:'运动控制', cover:'images/course_07.jpg', url:'https://www.bilibili.com/video/BV17S2VBJEN2', desc:'云深处科技官方课程，以山猫M20四轮足机器人为例，讲解ROS2程序结构与强化学习策略部署流程。' },
    { id:8, title:'【2026最新具身智能入门】融合强化学习与机器人训练', uploader:'大模型全栈', views:'242', level:'入门', levelType:'success', category:'强化学习', cover:'images/course_08.jpg', url:'https://www.bilibili.com/video/BV153Lw6BEAL', desc:'徐博士精讲具身智能入门路径，涵盖PPO算法公式推导、机器人强化学习训练，适合零基础到进阶。' },
    { id:9, title:'双足机器人强化学习：humanoid-gym sim2sim详细学习过程', uploader:'youyou_huang', views:'1.9万', level:'进阶', levelType:'warning', category:'强化学习', cover:'images/course_09.jpg', url:'https://www.bilibili.com/video/BV1k2aUemE7p', desc:'以Openloong人形机器人为例，详细讲解humanoid-gym的sim2sim强化学习训练过程，含URDF配置。' },
    { id:10, title:'B站强推！2025公认最通俗易懂的人形机器人教程', uploader:'具身机器人开发', views:'3.4万', level:'中级', levelType:'', category:'运动控制', cover:'images/course_10.jpg', url:'https://www.bilibili.com/video/BV18sSaBFEqs', desc:'涵盖人形机器人操作学习、强化学习、二次开发实战，系统讲解从建模到落地的完整技术链路。' },
  ],

  // ===== SIMULATION =====
  simScenes: ['工厂装配线','仓储取货场景','室内家庭环境','医疗手术室','户外复杂地形','楼梯攀爬场景'],
  robotModels: ['UR5e 协作臂','Franka Panda','Unitree H1 人形','Boston Spot 四足','Shadow Hand 灵巧手','KUKA iiwa 14'],
  computePackages: [
    { id:'basic', name:'基础版', price:'¥0.5/小时', desc:'4核CPU，8G内存，适合轻量仿真调试' },
    { id:'pro', name:'专业版', price:'¥2/小时', desc:'16核CPU+GPU，32G内存，适合大规模仿真' },
    { id:'enterprise', name:'企业版', price:'¥8/小时', desc:'64核CPU+A100，128G内存，适合分布式仿真' },
  ],

  // ===== DEVTOOL =====
  devtoolSceneOptions: [
    { label:'工业装配', value:'assembly' },
    { label:'仓储物流', value:'logistics' },
    { label:'医疗辅助', value:'medical' },
    { label:'家庭服务', value:'home' },
    { label:'农业采摘', value:'agriculture' },
    { label:'特种作业', value:'special' },
  ],
  devtoolDofOptions: [
    { label:'4 DOF（基础型）', value:'4' },
    { label:'6 DOF（标准型）', value:'6' },
    { label:'7 DOF（冗余型）', value:'7' },
    { label:'双臂 14 DOF', value:'14' },
  ],
  devtoolPrecisionOptions: [
    { label:'±1mm（普通级）', value:'1mm' },
    { label:'±0.1mm（精密级）', value:'0.1mm' },
    { label:'±0.02mm（超精密）', value:'0.02mm' },
  ],
  devtoolBudgetOptions: [
    { label:'10万以下', value:'lt10' },
    { label:'10-50万', value:'10-50' },
    { label:'50-200万', value:'50-200' },
    { label:'200万以上', value:'gt200' },
  ],
  devtoolLocationOptions: [
    { label:'深圳测试中心', value:'shenzhen' },
    { label:'北京展示中心', value:'beijing' },
    { label:'上海创新基地', value:'shanghai' },
    { label:'成都研究院', value:'chengdu' },
  ],

  // ===== MONITOR =====
  monitorStats: [
    { label:'在线设备', value:'24', icon:'🖥️', bg:'rgba(21,101,192,0.1)', color:'#1565C0' },
    { label:'离线设备', value:'3', icon:'⚠️', bg:'rgba(229,57,53,0.1)', color:'#E53935' },
    { label:'今日运行时长', value:'186h', icon:'⏱️', bg:'rgba(67,160,71,0.1)', color:'#43A047' },
    { label:'异常告警', value:'5', icon:'🔔', bg:'rgba(255,167,38,0.1)', color:'#FFA726' },
  ],
  devices: [
    { id:'DEV-001', name:'UR5e 协作臂 #1', type:'机械臂', location:'A区产线', online:true, cpu:'42%', memory:'3.2G', uptime:'72h 15m' },
    { id:'DEV-002', name:'Unitree H1 #3', type:'人形机器人', location:'B区展示厅', online:true, cpu:'67%', memory:'8.1G', uptime:'24h 03m' },
    { id:'DEV-003', name:'AGV 叉车 #7', type:'移动机器人', location:'仓储区', online:true, cpu:'31%', memory:'1.8G', uptime:'168h 42m' },
    { id:'DEV-004', name:'Shadow Hand #2', type:'灵巧手', location:'C区实验室', online:false, cpu:'0%', memory:'0G', uptime:'已离线' },
    { id:'DEV-005', name:'Boston Spot #1', type:'四足机器人', location:'D区测试场', online:true, cpu:'55%', memory:'4.6G', uptime:'36h 11m' },
    { id:'DEV-006', name:'Franka Panda #4', type:'机械臂', location:'E区研究室', online:true, cpu:'28%', memory:'2.1G', uptime:'48h 55m' },
  ],
  monitorAlerts: [
    { time:'2025-05-20 14:32', device:'UR5e 协作臂 #1', type:'关节温度', message:'关节2温度超限，当前78℃，阈值75℃', level:'警告', resolved:false },
    { time:'2025-05-20 13:15', device:'AGV 叉车 #7', type:'电量不足', message:'电池电量低于15%，建议立即充电', level:'警告', resolved:true },
    { time:'2025-05-20 11:48', device:'Shadow Hand #2', type:'通信中断', message:'设备心跳包超时，连接已断开', level:'严重', resolved:false },
    { time:'2025-05-20 09:22', device:'Unitree H1 #3', type:'碰撞检测', message:'步态规划器检测到碰撞风险，已自动停机', level:'严重', resolved:true },
    { time:'2025-05-19 17:05', device:'Franka Panda #4', type:'关节限位', message:'关节3接近软限位边界，建议重新规划路径', level:'提示', resolved:false },
  ],
  historyData: [
    { time:'2025-05-20 14:00', device:'UR5e 协作臂 #1', metric:'关节2温度', value:'72', unit:'℃', status:'正常' },
    { time:'2025-05-20 13:30', device:'UR5e 协作臂 #1', metric:'末端速度', value:'0.45', unit:'m/s', status:'正常' },
    { time:'2025-05-20 13:00', device:'AGV 叉车 #7', metric:'行驶速度', value:'1.2', unit:'m/s', status:'正常' },
    { time:'2025-05-20 12:30', device:'Boston Spot #1', metric:'步行速度', value:'1.5', unit:'m/s', status:'正常' },
    { time:'2025-05-20 12:00', device:'Franka Panda #4', metric:'负载力矩', value:'28.4', unit:'Nm', status:'偏高' },
    { time:'2025-05-20 11:30', device:'Shadow Hand #2', metric:'指尖力', value:'8.2', unit:'N', status:'正常' },
  ],

  // ===== DEVZONE =====
  robotBodies: [
    { id:'arm', name:'工业机械臂', icon:'🦾', desc:'6/7自由度工业级机械臂，负载5-200kg', tags:['云端训练','开箱即用'] },
    { id:'cobot', name:'协作机器人', icon:'🤝', desc:'人机协作设计，功率限制安全认证', tags:['开箱即用'] },
    { id:'humanoid', name:'人形机器人', icon:'🚶', desc:'双足人形，20+自由度，全身协调运动', tags:['云端训练'] },
    { id:'quadruped', name:'四足机器人', icon:'🐕', desc:'全地形适应，户外复杂环境探索', tags:['本地部署'] },
    { id:'mobile', name:'移动底盘', icon:'🛞', desc:'差速/全向轮底盘，含SLAM导航', tags:['开箱即用','本地部署'] },
    { id:'hand', name:'灵巧手', icon:'✋', desc:'16-24自由度灵巧手，精细操作', tags:['云端训练'] },
  ],
  devScenes: [
    { value:'pick_place', label:'抓取放置' },
    { value:'assembly', label:'精密装配' },
    { value:'nav', label:'自主导航' },
    { value:'hri', label:'人机协作' },
    { value:'inspection', label:'视觉检测' },
  ],
  devKitsMap: {
    pick_place: [
      { id:1, icon:'📷', name:'GraspNet 抓取算法包', desc:'基于点云的6D位姿估计与抓取规划SDK' },
      { id:2, icon:'🎮', name:'力控末端执行器SDK', desc:'精细力控接口，支持柔顺抓取' },
      { id:3, icon:'🗃️', name:'物体识别数据集', desc:'10万+工业零件RGBD数据集' },
    ],
    assembly: [
      { id:4, icon:'🔩', name:'精密装配视觉系统', desc:'亚毫米级视觉对准与插入引导' },
      { id:5, icon:'📐', name:'力矩控制库', desc:'螺纹装配力矩反馈控制' },
      { id:6, icon:'🤖', name:'装配任务规划器', desc:'基于任务和运动规划的TAMP框架' },
    ],
    nav: [
      { id:7, icon:'🗺️', name:'Nav2导航框架', desc:'ROS2 Nav2全栈自主导航配置包' },
      { id:8, icon:'📡', name:'多传感器融合SLAM', desc:'LiDAR+IMU+视觉融合建图' },
      { id:9, icon:'🚧', name:'动态障碍物预测', desc:'基于深度学习的行人轨迹预测' },
    ],
    hri: [
      { id:10, icon:'🗣️', name:'语音指令SDK', desc:'自然语言到机器人动作映射' },
      { id:11, icon:'👁️', name:'人体姿态估计', desc:'实时人体关节点检测与追踪' },
      { id:12, icon:'🛡️', name:'安全监控模块', desc:'人机安全距离监控与紧急停机' },
    ],
    inspection: [
      { id:13, icon:'🔍', name:'工业缺陷检测SDK', desc:'基于YOLOv10的实时缺陷识别' },
      { id:14, icon:'📊', name:'检测报告生成器', desc:'自动生成结构化质检报告' },
      { id:15, icon:'🌐', name:'3D重建工具包', desc:'基于深度相机的在线3D重建' },
    ],
  },
  devCases: [
    { id:1, icon:'🏭', name:'宇树H1仓储自主作业系统', desc:'基于H1人形机器人实现仓储货物搬运与整理，日均处理1200件', tags:['云端训练','开箱即用'], stars:'342' },
    { id:2, icon:'🔬', name:'腹腔镜手术辅助机器人', desc:'7DOF协作臂精密辅助手术，误差<0.5mm，已通过NMPA认证', tags:['本地部署'], stars:'218' },
    { id:3, icon:'🌾', name:'智慧农业草莓采摘机器人', desc:'四足+机械臂融合系统，采摘效率是人工的3倍，损伤率<0.5%', tags:['云端训练','本地部署'], stars:'156' },
  ],

  // ===== STANDARD（真实标准文档库，13类86项）=====
  standardCategoryColors: {
    '电磁兼容': '#1565C0',
    '电气安全': '#C62828',
    '各领域性能测试': '#2E7D32',
    '功能安全': '#6A1B9A',
    '机械安全': '#E65100',
    '可靠': '#00695C',
    '能效': '#AD1457',
    '算法可信': '#283593',
    '碳足迹': '#558B2F',
    '协同安全': '#0277BD',
    '协议兼容': '#4527A0',
    '信息安全': '#D84315',
    '预期功能安全': '#37474F',
  },
  standardTree: [
    { label: '全部标准' },
    { label: '电磁兼容' },
    { label: '电气安全' },
    { label: '各领域性能测试' },
    { label: '功能安全' },
    { label: '机械安全' },
    { label: '可靠' },
    { label: '能效' },
    { label: '算法可信' },
    { label: '碳足迹' },
    { label: '协同安全' },
    { label: '协议兼容' },
    { label: '信息安全' },
    { label: '预期功能安全' },
  ],
  standards: [
    // ===== 电磁兼容 (14) =====
    { code:'GB/T 17799.1-2017', name:'电磁兼容 通用标准 居住、商业和轻工业环境中的抗扰度试验', category:'电磁兼容', type:'国标', status:'现行' },
    { code:'GB/T 37284-2019', name:'服务机器人 电磁兼容 通用标准 发射要求和限值', category:'电磁兼容', type:'国标', status:'现行' },
    { code:'GB/T 38326-2019', name:'工业、科学和医疗机器人电磁兼容 发射测试方法和限值', category:'电磁兼容', type:'国标', status:'现行' },
    { code:'GB/T 38336-2019', name:'工业、科学和医疗机器人电磁兼容 发射测试方法和限值', category:'电磁兼容', type:'国标', status:'现行' },
    { code:'GB/T 39004-2020', name:'工业机器人电磁兼容设计规范', category:'电磁兼容', type:'国标', status:'现行' },
    { code:'IEC 61000-6-1:2016', name:'电磁兼容 第6-1部分 通用标准 居住、商业和轻工业环境中的抗扰度', category:'电磁兼容', type:'国际', status:'现行' },
    { code:'IEC 61000-6-2:2016', name:'电磁兼容 第6-2部分 通用标准 工业环境中的抗扰度试验', category:'电磁兼容', type:'国际', status:'现行' },
    { code:'IEC 61000-6-3:2020', name:'电磁兼容 第6-3部分 通用标准 居住、商业和轻工业环境中的发射', category:'电磁兼容', type:'国际', status:'现行' },
    { code:'IEC 61000-6-4:2018', name:'电磁兼容 第6-4部分 通用标准 工业环境中的发射', category:'电磁兼容', type:'国际', status:'现行' },
    { code:'ISO 10605:2023', name:'道路车辆 电气电子部件对静电放电抗扰性的试验方法', category:'电磁兼容', type:'国际', status:'现行' },
    { code:'ISO 11452-4:2020', name:'道路车辆 来自窄带辐射电磁能的电气骚扰的组件试验方法 第4部分', category:'电磁兼容', type:'国际', status:'现行' },
    { code:'ISO 11452-8:2015', name:'道路车辆 窄带辐射电磁能量引起的零部件电磁骚扰试验方法 第8部分', category:'电磁兼容', type:'国际', status:'现行' },
    { code:'ISO 11452-9:2021', name:'道路车辆 窄带辐射电磁能电气干扰的组分试验方法 第9部分', category:'电磁兼容', type:'国际', status:'现行' },
    { code:'ISO 16750-2:2023', name:'道路车辆 电气和电子设备的环境条件和试验 第2部分：电气负荷', category:'电磁兼容', type:'国际', status:'现行' },

    // ===== 电气安全 (6) =====
    { code:'GB 28526-2012', name:'机械电气安全 安全相关电气、电子和可编程电子控制系统的功能安全', category:'电气安全', type:'国标', status:'现行' },
    { code:'GB/T 20438.1-2017', name:'电气/电子/可编程电子安全相关系统的功能安全 第1部分：一般要求', category:'电气安全', type:'国标', status:'现行' },
    { code:'GB/T 25295-2010', name:'电气设备安全设计导则', category:'电气安全', type:'国标', status:'现行' },
    { code:'GB/T 31498-2021', name:'电动汽车碰撞后安全要求', category:'电气安全', type:'国标', status:'现行' },
    { code:'GB/T 38244-2019', name:'机器人安全总则', category:'电气安全', type:'国标', status:'现行' },
    { code:'GB/T 5226.1-2019', name:'机械电气安全机械电气设备 第1部分：通用技术条件', category:'电气安全', type:'国标', status:'现行' },

    // ===== 各领域性能测试 (27) =====
    { code:'DB35/T 2091-2022', name:'移动服务机器人运用技术要求', category:'各领域性能测试', type:'地标', status:'现行' },
    { code:'DL/T 2239-2021', name:'变电站巡检机器人检测技术规范', category:'各领域性能测试', type:'行标', status:'现行' },
    { code:'DL/T 1610-2016', name:'变电站机器人巡检系统通用技术条件', category:'各领域性能测试', type:'行标', status:'现行' },
    { code:'GB/T 12642-2013', name:'工业机器人 性能规范及其试验方法', category:'各领域性能测试', type:'国标', status:'现行' },
    { code:'GB/T 20721-2022', name:'自动导引车 通用技术条件', category:'各领域性能测试', type:'国标', status:'现行' },
    { code:'GB/T 36530-2018', name:'机器人与机器人装备 个人助理机器人的安全要求', category:'各领域性能测试', type:'国标', status:'现行' },
    { code:'GB/T 37475-2019', name:'内河水面清扫船尺度系列和作业设备', category:'各领域性能测试', type:'国标', status:'现行' },
    { code:'GB/T 38124-2019', name:'服务机器人性能测试方法', category:'各领域性能测试', type:'国标', status:'现行' },
    { code:'GB/T 38834.1-2020', name:'机器人 服务机器人性能规范及其试验方法 第1部分：轮式机器人运动', category:'各领域性能测试', type:'国标', status:'现行' },
    { code:'GB/T 38834.2-2023', name:'机器人 服务机器人性能规范及其试验方法 第2部分：导航', category:'各领域性能测试', type:'国标', status:'现行' },
    { code:'GB/T 38834.3-2023', name:'机器人 服务机器人性能规范及其试验方法 第3部分：操作', category:'各领域性能测试', type:'国标', status:'现行' },
    { code:'GB/T 38873-2020', name:'分拣机器人通用技术条件', category:'各领域性能测试', type:'国标', status:'现行' },
    { code:'GB/T 40327-2021', name:'轮式移动机器人导引运动性能测试方法', category:'各领域性能测试', type:'国标', status:'现行' },
    { code:'GB/T 41402-2022', name:'物流机器人 信息系统通用技术规范', category:'各领域性能测试', type:'国标', status:'现行' },
    { code:'GB/T 43119-2023', name:'自动驾驶封闭测试场地建设技术要求', category:'各领域性能测试', type:'国标', status:'现行' },
    { code:'GB/T 43849-2024', name:'水下机器人整机及零部件基本环境试验方法 水静压力试验方法', category:'各领域性能测试', type:'国标', status:'现行' },
    { code:'GB/T 44251-2024', name:'腿式机器人性能及试验方法', category:'各领域性能测试', type:'国标', status:'现行' },
    { code:'GB/T 45579-2025', name:'机器人智能化视觉评价方法及等级划分', category:'各领域性能测试', type:'国标', status:'现行' },
    { code:'GB/T 44253-2024', name:'巡检机器人安全要求', category:'各领域性能测试', type:'国标', status:'现行' },
    { code:'GB/T 44312-2024', name:'巡检机器人集中监控系统技术要求', category:'各领域性能测试', type:'国标', status:'现行' },
    { code:'GD14-2021', name:'水面智能搜救机器人技术指南', category:'各领域性能测试', type:'地标', status:'现行' },
    { code:'T/CAMETA XXX—2025', name:'机器人技术专业教学能力评价规范', category:'各领域性能测试', type:'团标', status:'现行' },
    { code:'T/QGCML XXXX—XXXX', name:'泳池清洁机器人通用技术规范', category:'各领域性能测试', type:'团标', status:'现行' },
    { code:'T/SSITS 507-2024', name:'防爆叉车类移动机器人 技术要求', category:'各领域性能测试', type:'团标', status:'现行' },
    { code:'T/SZROBOT 0001-2021', name:'商用清洁机器人通用技术规范', category:'各领域性能测试', type:'团标', status:'现行' },
    { code:'T/ZZB 1371-2019', name:'泳池水下清洗机器人用电动机', category:'各领域性能测试', type:'团标', status:'现行' },
    { code:'YD/T 6770-2025', name:'人工智能 关键基础技术 具身智能基准测试方法', category:'各领域性能测试', type:'行标', status:'现行' },

    // ===== 功能安全 (13) =====
    { code:'GB 11291.1-2011', name:'工业环境用机器人 安全要求 第1部分 机器人', category:'功能安全', type:'国标', status:'现行' },
    { code:'GB 11291.2-2011', name:'机器人与机器人装备 安全要求 第2部分 工业机器人的安全', category:'功能安全', type:'国标', status:'现行' },
    { code:'GB 28526-2012', name:'机械电气安全 安全相关电气、电子和可编程电子控制系统的功能安全', category:'功能安全', type:'国标', status:'现行' },
    { code:'GB/T 25000.51-2016', name:'系统与软件工程 系统与软件质量要求和评价（SQuaRE） 第51部分', category:'功能安全', type:'国标', status:'现行' },
    { code:'GB/T 25000.51', name:'系统与软件工程质量要求和评价（补充版本）', category:'功能安全', type:'国标', status:'现行' },
    { code:'GB/T 20438.1-2006', name:'电气/电子/可编程电子安全相关系统的功能安全 第1部分', category:'功能安全', type:'国标', status:'现行' },
    { code:'GB/T 20438.2-2006', name:'电气/电子/可编程电子安全相关系统的功能安全 第2部分', category:'功能安全', type:'国标', status:'现行' },
    { code:'GB/T 20438.3-2006', name:'电气/电子/可编程电子安全相关系统的功能安全 第3部分', category:'功能安全', type:'国标', status:'现行' },
    { code:'GB/T 20438.4-2006', name:'电气/电子/可编程电子安全相关系统的功能安全 第4部分', category:'功能安全', type:'国标', status:'现行' },
    { code:'GB/T 20438.5-2006', name:'电气/电子/可编程电子安全相关系统的功能安全 第5部分', category:'功能安全', type:'国标', status:'现行' },
    { code:'GB/T 20438.6-2006', name:'电气/电子/可编程电子安全相关系统的功能安全 第6部分', category:'功能安全', type:'国标', status:'现行' },
    { code:'GB/T 20438.7-2006', name:'电气/电子/可编程电子安全相关系统的功能安全 第7部分', category:'功能安全', type:'国标', status:'现行' },
    { code:'ISO 26262', name:'道路车辆 功能安全', category:'功能安全', type:'国际', status:'现行' },

    // ===== 机械安全 (8) =====
    { code:'EN ISO 12100:2010', name:'机械安全 设计通则（带书签）', category:'机械安全', type:'国际', status:'现行' },
    { code:'GB 11291.2-2013', name:'机器人与机器人装备 工业机器人的安全要求 第2部分：机器人系统与集成', category:'机械安全', type:'国标', status:'现行' },
    { code:'GB 16754-2021', name:'机械安全 急停功能 设计原则', category:'机械安全', type:'国标', status:'现行' },
    { code:'GB/T 16855.1-2025', name:'机械安全 安全控制系统 第1部分 设计通则', category:'机械安全', type:'国标', status:'现行' },
    { code:'GB/T 38244-2019', name:'机器人安全总则', category:'机械安全', type:'国标', status:'现行' },
    { code:'GB/T 39785-2021', name:'服务机器人 机械安全评估与测试方法', category:'机械安全', type:'国标', status:'现行' },
    { code:'GB/T 41393-2022', name:'娱乐机器人 安全要求及测试方法', category:'机械安全', type:'国标', status:'现行' },
    { code:'GB/T 44253-2024', name:'巡检机器人安全要求', category:'机械安全', type:'国标', status:'现行' },

    // ===== 可靠 (1) =====
    { code:'GB/T 7828-1987', name:'可靠性设计导则', category:'可靠', type:'国标', status:'现行' },

    // ===== 能效 (1) =====
    { code:'GB/T 40575-2021', name:'巡检机器人能效要求与测试方法', category:'能效', type:'国标', status:'现行' },

    // ===== 算法可信 (3) =====
    { code:'GB/T 42888-2023', name:'信息安全技术 机器学习算法安全评估规范', category:'算法可信', type:'国标', status:'现行' },
    { code:'GB/T 45225-2025', name:'人工智能 深度学习算法评估', category:'算法可信', type:'国标', status:'现行' },
    { code:'可信白皮书', name:'机器人算法可信度评估白皮书', category:'算法可信', type:'其他', status:'现行' },

    // ===== 碳足迹 (1) =====
    { code:'GB/T 24067-2024', name:'温室气体 产品碳足迹量化要求和指南', category:'碳足迹', type:'国标', status:'现行' },

    // ===== 协同安全 (4) =====
    { code:'ISO 10218 解读', name:'工业机器人安全标准 ISO 10218 解读', category:'协同安全', type:'国际', status:'参考' },
    { code:'ISO/TS 15066 解读', name:'协作机器人安全标准 ISO/TS 15066 解读', category:'协同安全', type:'国际', status:'参考' },
    { code:'ISO/TS 15066 解读（续）', name:'协作机器人安全标准 ISO/TS 15066 解读（续）', category:'协同安全', type:'国际', status:'参考' },
    { code:'GB/T 39402-2020', name:'面向人机协作的工业机器人设计规范', category:'协同安全', type:'国标', status:'现行' },

    // ===== 协议兼容 (4) =====
    { code:'通信协议参考文档', name:'机器人通信协议参考文档', category:'协议兼容', type:'其他', status:'参考' },
    { code:'GB/T 32197-2025', name:'工业机器人控制器开放式通信接口规范', category:'协议兼容', type:'国标', status:'现行' },
    { code:'GB/T 33267-2016', name:'机器人仿真开发环境接口', category:'协议兼容', type:'国标', status:'现行' },
    { code:'GB/T 35144-2017', name:'机器人仿真开发环境接口（补充）', category:'协议兼容', type:'国标', status:'现行' },

    // ===== 信息安全 (2) =====
    { code:'GB/T 38244-2019', name:'机器人安全总则（信息安全相关条款）', category:'信息安全', type:'国标', status:'现行' },
    { code:'GB/T 45502-2025', name:'服务机器人信息安全通用要求', category:'信息安全', type:'国标', status:'现行' },

    // ===== 预期功能安全 (2) =====
    { code:'GB/T 43267-2023', name:'道路车辆 预期功能安全', category:'预期功能安全', type:'国标', status:'现行' },
    { code:'ISO 21448', name:'道路车辆 预期功能安全（SOTIF）', category:'预期功能安全', type:'国际', status:'现行' },
  ],
  certPathData: {
    cobot_china: [
      { step:1, name:'产品设计审查', body:'认证机构', duration:'2周', cost:'¥2-5万', remark:'提交技术文件包' },
      { step:2, name:'GB/T 12642 性能测试', body:'中国计量院', duration:'4周', cost:'¥8-15万', remark:'含重复定位精度等测试' },
      { step:3, name:'安全功能认证', body:'机器人测试中心', duration:'3周', cost:'¥5-10万', remark:'符合GB 11291' },
      { step:4, name:'CCC认证申请', body:'CNCA指定机构', duration:'6-12周', cost:'¥3-8万', remark:'国强制认证' },
    ],
    cobot_eu: [
      { step:1, name:'风险评估报告', body:'内部/第三方', duration:'2-4周', cost:'¥2-6万', remark:'符合ISO 10218' },
      { step:2, name:'ISO/TS 15066 测试', body:'TÜV/SGS', duration:'4-6周', cost:'¥10-20万', remark:'人机协作安全验证' },
      { step:3, name:'EMC电磁兼容测试', body:'欧盟公告机构', duration:'2-3周', cost:'¥5-10万', remark:'符合EMC指令' },
      { step:4, name:'CE符合性声明', body:'申请方自声明', duration:'1周', cost:'¥0.5万', remark:'附贴CE标志' },
    ],
  },
  testCases: [
    { id:'TC-001', name:'重复定位精度测试', standard:'GB/T 12642', type:'性能', desc:'按ISO 9283标准在工作空间内5个点各重复测量30次' },
    { id:'TC-002', name:'最大速度测试', standard:'GB/T 12642', type:'性能', desc:'在额定负载下测试各轴最大线速度和角速度' },
    { id:'TC-003', name:'急停制动测试', standard:'ISO 10218-1', type:'安全', desc:'在最高速度下触发急停，测量制动距离和时间' },
    { id:'TC-004', name:'碰撞力测试', standard:'ISO/TS 15066', type:'安全', desc:'使用标准测力仪测量碰撞力，不超过规定阈值' },
    { id:'TC-005', name:'通信延迟测试', standard:'GB/T 36239', type:'功能', desc:'测量控制指令从发送到执行的端到端延迟，要求<5ms' },
    { id:'TC-006', name:'负载精度测试', standard:'GB/T 12642', type:'性能', desc:'在额定负载、50%负载、空载条件下各测试精度指标' },
  ],

  // ===== MALL（真实产品）=====
  mallCategoryTree: [
    { label:'整机', isLeaf:false, children:[{label:'协作机械臂',isLeaf:true},{label:'人形机器人',isLeaf:true},{label:'四足机器人',isLeaf:true},{label:'移动底盘',isLeaf:true}] },
    { label:'传感器', isLeaf:false, children:[{label:'深度相机',isLeaf:true},{label:'力/力矩传感器',isLeaf:true},{label:'激光雷达',isLeaf:true}] },
    { label:'末端执行器', isLeaf:false, children:[{label:'夹爪',isLeaf:true},{label:'灵巧手',isLeaf:true}] },
    { label:'驱动与传动', isLeaf:false, children:[{label:'谐波减速器',isLeaf:true},{label:'伺服电机',isLeaf:true}] },
    { label:'计算平台', isLeaf:false, children:[{label:'边缘计算',isLeaf:true},{label:'运动控制器',isLeaf:true}] },
  ],
  mallProducts: [
    { id:1, name:'Unitree Go2 四足机器人', brand:'宇树科技', spec:'标配4D LiDAR L2，最高3.5m/s，续航2h，IP65，支持ROS2二次开发', price:9970, originalPrice:11600, sales:'3.2K', rating:'4.9', img:'images/mall_01.jpg', category:'四足机器人' },
    { id:2, name:'Unitree H1 人形机器人', brand:'宇树科技', spec:'身高1.8m，全身19关节，最高5.5km/h奔跑，360°LiDAR+深度相机', price:198000, originalPrice:220000, sales:'128', rating:'4.9', img:'images/mall_02.png', category:'人形机器人' },
    { id:3, name:'Intel RealSense D435i 深度相机', brand:'Intel', spec:'RGB 1080P + 立体深度 + IMU，深度精度2%@2m，USB3.1，全局快门', price:3200, originalPrice:3800, sales:'5.6K', rating:'4.7', img:'images/mall_03.png', category:'深度相机' },
    { id:4, name:'OAK-D Lite 智能深度相机', brand:'Luxonis', spec:'4K RGB + 立体深度 + 神经推理，1.4 TOPS AI算力，USB-C，仅40g', price:1499, originalPrice:1699, sales:'4.1K', rating:'4.8', img:'images/mall_04.png', category:'深度相机' },
    { id:5, name:'NVIDIA Jetson Orin Nano Super 开发者套件', brand:'NVIDIA', spec:'40 TOPS AI算力，8GB LPDDR5，Gen4 PCIe，千兆以太网，Ubuntu 22.04', price:2999, originalPrice:3499, sales:'8.3K', rating:'5.0', img:'images/mall_05.jpg', category:'边缘计算' },
    { id:6, name:'Robotiq 2F-85 自适应夹爪', brand:'Robotiq', spec:'行程85mm，夹持力20-220N，重复精度±0.03mm，UR即插即用', price:28500, originalPrice:32000, sales:'1.8K', rating:'4.9', img:'images/mall_06.png', category:'夹爪' },
    { id:7, name:'ATI Mini45 力/力矩传感器', brand:'ATI', spec:'6轴力矩传感，Fx/Fy±145N Fz±290N，IP65，EtherCAT/RS-485', price:65000, originalPrice:72000, sales:'486', rating:'5.0', img:'images/mall_07.jpg', category:'力/力矩传感器' },
    { id:8, name:'谐波减速器 CSG-17-50', brand:'来福谐波', spec:'减速比50:1，额定扭矩24Nm，重复精度≤1角秒，杯型柔轮结构', price:6800, originalPrice:8200, sales:'2.3K', rating:'4.8', img:'images/mall_08.jpg', category:'谐波减速器' },
    { id:9, name:'UR5e 协作机械臂', brand:'优傲机器人', spec:'负载5kg，工作半径850mm，6关节，±0.1mm重复定位精度，安全碰撞检测', price:268000, originalPrice:298000, sales:'356', rating:'5.0', img:'images/mall_09.png', category:'协作机械臂' },
    { id:10, name:'Franka Emika Panda 7DOF 协作臂', brand:'Franka Emika', spec:'7自由度，负载3kg，工作半径855mm，±0.1mm精度，指尖力控', price:312000, originalPrice:350000, sales:'89', rating:'4.9', img:'images/mall_10.png', category:'协作机械臂' },
    { id:11, name:'灵巧触觉传感器 DexHand-16', brand:'因时机器人', spec:'16自由度仿人灵巧手，6维力传感，ROS2 SDK，支持Python/C++', price:48600, originalPrice:56000, sales:'432', rating:'4.7', img:'images/mall_11.png', category:'灵巧手' },
    { id:12, name:'思岚 A2 激光雷达', brand:'思岚科技', spec:'360°扫描，0.25°角分辨率，12m测距半径，USB/UART双接口', price:1580, originalPrice:1890, sales:'6.7K', rating:'4.8', img:'images/mall_12.jpg', category:'激光雷达' },
  ],
  initialOrders: [
    { id:'ORD-20250501', product:'Unitree Go2 四足机器人', amount:9970, date:'2025-05-01', status:'已完成' },
    { id:'ORD-20250415', product:'NVIDIA Jetson Orin Nano Super', amount:2999, date:'2025-04-15', status:'已完成' },
    { id:'ORD-20250310', product:'Intel RealSense D435i x3', amount:9600, date:'2025-03-10', status:'已完成' },
    { id:'ORD-20250220', product:'灵巧触觉传感器 DexHand-16', amount:48600, date:'2025-02-20', status:'配送中' },
  ],

  // ===== COMMUNITY =====
  postCategories: ['全部', '技术讨论', '项目分享', '求职招聘', '资源分享', '赛事活动'],
  posts: [
    { id:1, title:'[开源] 基于ACT的双臂协作数据采集系统，已采集10万条轨迹', excerpt:'本系统采用Franka双臂+Apple Vision Pro遥操作方案，已成功采集10万条精细操作轨迹数据，正式开源！', author:'张工', date:'2025-05-19', views:'1.2万', replies:86, category:'项目分享', categoryType:'success' },
    { id:2, title:'Unitree H1 MuJoCo仿真环境搭建踩坑记录', excerpt:'记录了从URDF导入到全身控制MPC调试的完整踩坑经历，希望帮助大家少走弯路。', author:'李博士', date:'2025-05-18', views:'8.6K', replies:43, category:'技术讨论', categoryType:'primary' },
    { id:3, title:'求职：具身智能算法工程师，5年RL+ROS经验', excerpt:'寻求具身智能领域算法工程师/研究员职位，熟悉Isaac Gym、MuJoCo，有多篇ICRA/IROS论文。', author:'王算法', date:'2025-05-17', views:'4.3K', replies:18, category:'求职招聘', categoryType:'warning' },
    { id:4, title:'分享：100GB四足机器人运动数据集免费下载', excerpt:'整理了开源社区中最完整的四足机器人运动数据集合集，包含ANYmal/Spot等5种机型共300万帧。', author:'数据侠', date:'2025-05-16', views:'2.1万', replies:124, category:'资源分享', categoryType:'' },
    { id:5, title:'2025具身智能创新挑战赛 - 家庭服务赛道经验分享', excerpt:'我们团队在初赛中取得第3名，分享完整的技术方案：视觉感知+LLM任务规划+策略模仿学习。', author:'创新团队', date:'2025-05-15', views:'6.7K', replies:57, category:'赛事活动', categoryType:'danger' },
  ],
  qaList: [
    { id:1, question:'MuJoCo中如何正确设置关节阻尼和摩擦力参数以匹配真实机器人？', votes:47, answers:6, tags:['MuJoCo','仿真','参数调整'], asker:'新手小王', date:'2025-05-18' },
    { id:2, question:'ROS2 Nav2在动态环境中频繁重规划导致抖动，如何优化？', votes:31, answers:4, tags:['ROS2','Nav2','导航'], asker:'导航小李', date:'2025-05-17' },
    { id:3, question:'Diffusion Policy训练收敛很慢，有哪些调参技巧？', votes:28, answers:3, tags:['DiffusionPolicy','模仿学习','调参'], asker:'策略研究员', date:'2025-05-16' },
    { id:4, question:'如何评估灵巧手操作任务的泛化能力？有哪些benchmark？', votes:19, answers:2, tags:['灵巧手','评估','benchmark'], asker:'灵巧手实验室', date:'2025-05-15' },
  ],
  communityProjects: [
    { id:1, icon:'🤖', name:'EmbodiedBench-2025', desc:'具身智能任务全面评测框架，含50个任务，支持12种机器人', tags:['开箱即用'], stars:'1.2K', forks:234, author:'具身评测组' },
    { id:2, icon:'🌊', name:'FlowBot-Manipulation', desc:'基于Flow Matching的灵巧操作策略学习框架，ICRA 2025 Best Paper', tags:['云端训练'], stars:'876', forks:143, author:'灵巧操作Lab' },
    { id:3, icon:'🗺️', name:'OpenNav-Humanoid', desc:'人形机器人开放导航框架，支持场景理解与语义地图构建', tags:['本地部署','开箱即用'], stars:'654', forks:98, author:'导航研究院' },
    { id:4, icon:'📊', name:'RoboEval-Suite', desc:'统一的具身智能模型评估平台，支持仿真与真实机器人双场景', tags:['开箱即用'], stars:'432', forks:67, author:'评估工具组' },
  ],
  communityEvents: [
    { id:1, name:'2025具身智能创新挑战赛', status:'报名中', statusType:'success', desc:'聚焦家庭服务、工业装配、医疗辅助三大赛道，面向全球开发者', startDate:'2025-06-01', endDate:'2025-08-31', prize:'100万元', participants:'1,248' },
    { id:2, name:'ICRA 2025 具身智能专题研讨会', status:'即将开始', statusType:'warning', desc:'汇聚全球顶级具身智能研究者，共享最前沿研究成果', startDate:'2025-05-28', endDate:'2025-05-29', prize:'无', participants:'500' },
    { id:3, name:'具身智能数据集构建马拉松', status:'进行中', statusType:'primary', desc:'48小时众包数据标注马拉松，完成目标任务即可获得平台积分奖励', startDate:'2025-05-15', endDate:'2025-05-22', prize:'等价积分8万元', participants:'3,127' },
  ],
  hotTopics: ['强化学习', '模仿学习', 'MuJoCo', 'ROS2', 'ACT策略', 'Diffusion Policy', '灵巧手', '双足行走', 'Isaac Sim', '具身大模型', 'URDF', '视触觉融合'],
  topUsers: [
    { name:'张工程师', level:8, desc:'具身智能全栈开发者，ICRA论文5篇' },
    { name:'李博士', level:9, desc:'清华机器人实验室，运动规划专家' },
    { name:'王算法', level:7, desc:'强化学习工程师，开源贡献者' },
    { name:'数据侠', level:6, desc:'机器人数据采集与标注专家' },
  ],

  // ===== PAPER（论文解读）=====
  papers: [
    {
      id: 1,
      title: 'RT-2: Vision-Language-Action Models Transfer Web Knowledge to Robotic Control',
      titleCn: 'RT-2：视觉-语言-动作模型将网络知识迁移至机器人控制',
      authors: 'Michael Ahn et al.',
      org: 'Google DeepMind',
      venue: 'CoRL 2024',
      year: 2024,
      icon: '🧠',
      tags: ['VLA', '端到端', '大模型', '迁移学习'],
      abstract: '本文提出 RT-2（Robotic Transformer 2），将大规模视觉-语言模型（VLM）直接微调为视觉-语言-动作（VLA）模型，使机器人能利用互联网规模的知识进行推理和控制。RT-2 在 PaLI-X 和 PaLM-E 等大模型基础上，将机器人动作离散化为 token，与语言 token 统一训练，实现了从网络知识到机器人操作的零样本迁移。',
      keyInsights: [
        '首次证明 VLM 可以直接作为机器人策略网络，无需额外策略头',
        '模型能理解"把水果放到碗里"等需要常识推理的指令，无需专门训练',
        '在未见过的物体和场景上，零样本成功率从 RT-1 的 28% 提升至 62%',
        'Chain-of-Thought 推理可使模型在多步骤任务中规划更合理'
      ],
      impact: 'RT-2 开创了 VLA（Vision-Language-Action）研究范式，直接催生了 OpenVLA、Octo 等开源后续工作，是具身智能大模型落地的重要里程碑。',
      link: 'https://robotics-transformer-x.github.io/'
    },
    {
      id: 2,
      title: 'Diffusion Policy: Visuomotor Policy Learning via Action Diffusion',
      titleCn: 'Diffusion Policy：基于动作扩散的视觉运动策略学习',
      authors: 'Cheng Chi et al.',
      org: 'Columbia University',
      venue: 'RSS 2023 (Best Paper Finalist)',
      year: 2023,
      icon: '🌊',
      tags: ['扩散模型', '模仿学习', '多模态动作', '操作'],
      abstract: '本文提出 Diffusion Policy，将去噪扩散模型用于机器人策略学习。不同于传统回归或高斯混合模型输出单峰动作，Diffusion Policy 通过迭代去噪生成多模态动作分布，天然适配"多种可行轨迹并存"的操作场景。作者在 15 个任务基准上验证了其优势。',
      keyInsights: [
        '扩散模型生成多模态动作分布，完美解决"同一目标多种抓法"的歧义问题',
        '引入动作序列预测（action chunking），避免逐步预测的误差累积',
        '在 15 个任务上超越传统方法，成功率平均提升 20% 以上',
        '支持图像观测输入，端到端从像素到动作，无需手工特征工程'
      ],
      impact: 'Diffusion Policy 成为模仿学习新范式，后续 DP3（3D 点云版）、Diffusion Policy Policy 等变体层出不穷，已广泛应用于双臂协作、灵巧手操作等前沿课题。',
      link: 'https://diffusion-policy.cs.columbia.edu/'
    },
    {
      id: 3,
      title: 'SayCan: Do As I Can, Not As I Say — Grounding Language in Robotic Affordances',
      titleCn: 'SayCan：基于可行性接地的大语言模型机器人规划',
      authors: 'Michael Ahn et al.',
      org: 'Google DeepMind',
      venue: 'CoRL 2022',
      year: 2022,
      icon: '🗣️',
      tags: ['LLM规划', '技能接地', '分层控制', '语言指令'],
      abstract: 'SayCan 提出将大语言模型（LLM）的常识规划能力与机器人物理可行性（affordance）结合的框架：LLM 负责高层任务分解与动作选择，底层技能策略提供可行性评分，两者相乘得到"既合理又可执行"的动作序列。解决了"LLM 知道该做什么但不知道能不能做"的问题。',
      keyInsights: [
        'LLM 输出概率 × 技能可行性分数 = 接地后的动作选择，简洁优雅',
        '使机器人能理解"我渴了"等模糊意图，自主分解为可执行步骤',
        '在厨房场景中，长程任务成功率从纯 LLM 的 14% 提升至 84%',
        '首次证明 LLM + 机器人技能库可构成实用的分层控制系统'
      ],
      impact: 'SayCan 是 LLM 驱动机器人规划的奠基之作，后续 Inner Monologue、Code as Policies、Voyager 等工作均受其启发，开启了"大模型做大脑，机器人做身体"的研究热潮。',
      link: 'https://say-can.github.io/'
    }
  ],

  // ===== TESTFIELD（测试场地预约）=====
  testFields: [
    {
      id: 1,
      name: '去野测试场',
      icon: '🏔️',
      tags: ['基础测试', '楼梯', '台阶', '淋雨'],
      desc: '综合性基础测试场地，配备标准楼梯与台阶模块，支持机器人越障、爬坡、稳定性等基础运动能力测试。内置淋雨环境模拟区，可验证设备在雨天工况下的防水性能与传感器可靠性。适合四足、人形、轮式机器人基础性能评估。',
      features: ['标准化楼梯（15°/30°/45°三档可调）', '多级台阶测试区（5cm-30cm可调）', '淋雨模拟系统（IP54-IP67分级测试）', '平整地面基准测试区'],
      location: '去野机器人测试基地',
      phone: '400-888-0001',
      price: '¥800/天起'
    },
    {
      id: 2,
      name: '去野南测试场',
      icon: '🌋',
      tags: ['极限地形', '战壕', '废墟'],
      desc: '面向极限工况的专业测试场，模拟灾害救援、军事侦察等极端场景。设有战壕穿越区、废墟攀爬区、泥泞沼泽区，可全面测试机器人在非结构化复杂地形中的通过性、稳定性和自主恢复能力。',
      features: ['战壕穿越区（深0.5-1.5m，宽0.3-0.8m）', '废墟攀爬区（不规则碎石+倒塌建筑模拟）', '泥泞沼泽区（含水位可调）', '极限坡道（最高60°）'],
      location: '去野南极限测试基地',
      phone: '400-888-0002',
      price: '¥1,200/天起'
    },
    {
      id: 3,
      name: '小木屋测试场',
      icon: '🏠',
      tags: ['智能家具', '家居场景'],
      desc: '1:1 还原真实家居环境，配备全屋智能家居系统，专为家庭服务机器人设计。覆盖客厅、厨房、卧室、卫生间等典型场景，内含智能灯光、窗帘、门锁等IoT设备，支持机器人与智能家居的联动测试。',
      features: ['全屋智能家居互联（支持Matter/HomeKit/米家）', '厨房操作区（含台面、水龙头、厨具）', '卧室与卫生间场景', '动态障碍物模拟（人体模型+宠物模型）'],
      location: '小木屋智慧家居测试中心',
      phone: '400-888-0003',
      price: '¥600/天起'
    },
    {
      id: 4,
      name: '九龙潭测试场',
      icon: '🌊',
      tags: ['智慧水域', '水下测试'],
      desc: '面向水域机器人与水下装备的专业测试基地，涵盖静水池、流动水道、浅滩湿地三种水域环境。支持水下机器人导航、管道巡检、水面救援等场景测试，配备水下定位与通信系统。',
      features: ['静水池（20m×15m，水深1-3m可调）', '流动水道（流速0-2m/s可调）', '浅滩湿地区（芦苇+淤泥仿真）', '水下定位系统（USBL+SBL）'],
      location: '九龙潭水域测试基地',
      phone: '400-888-0004',
      price: '¥1,000/天起'
    },
    {
      id: 5,
      name: '产业园测试场',
      icon: '🏭',
      tags: ['标准测试场', '工业场景'],
      desc: '标准化工业测试场地，符合 GB/T 12642、ISO 9283 等国际标准要求，可开展机器人性能规范试验。配备产线模拟区、仓储物流区、质检工位区，满足工业机器人、协作机器人、AGV/AMR 的标准认证测试需求。',
      features: ['符合 GB/T 12642 性能规范测试条件', '产线模拟区（含传送带、工装夹具）', '仓储物流区（含货架、AGV通道）', '电气安全与EMC测试间'],
      location: '机器人产业园标准测试中心',
      phone: '400-888-0005',
      price: '¥500/天起'
    }
  ],

  // ===== PROFILE =====
  permissions: [
    { module:'数据集中心', permission:'完整读写', permType:'success', expire:'永久', remark:'认证企业用户，不限量访问' },
    { module:'云仿真平台', permission:'Pro版', permType:'primary', expire:'2026-05-19', remark:'年付Pro套餐，含200小时算力' },
    { module:'模型库', permission:'完整读写', permType:'success', expire:'永久', remark:'可上传、下载、商用' },
    { module:'API 访问', permission:'企业级', permType:'warning', expire:'2026-05-19', remark:'QPS 1000，每月1000万次调用' },
  ],
};

/** 工具函数 */
window.AppUtils = {
  tagTypeMap: function(tag) {
    var m = { '云端训练': 'primary', '本地部署': 'success', '开箱即用': 'warning', '精密级': 'danger' };
    return m[tag] || '';
  },
  orderStatusType: function(s) {
    var m = { '已完成': 'success', '待支付': 'warning', '已取消': 'info', '配送中': 'primary' };
    return m[s] || '';
  },
};

/** SVG 图标库 — 现代线条风格 */
window.AppIcons = {
  dataset: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5"/><path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"/><path d="M4 17v2c0 1.66 3.58 3 8 3s8-1.34 8-3v-2"/></svg>',
  model: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',
  course: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>',
  simulation: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/><circle cx="12" cy="10" r="3"/><path d="M12 7v1"/><path d="M12 12v1"/></svg>',
  devtool: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>',
  monitor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
  devzone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>',
  standard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>',
  mall: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>',
  community: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>',
  paper: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
  testfield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/><path d="M9 9v.01"/><path d="M9 12v.01"/><path d="M9 15v.01"/><path d="M9 18v.01"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  cloud: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>',
  puzzle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 01-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 10-3.214 3.214c.446.166.855.497.925.968a.979.979 0 01-.276.837l-1.61 1.61a2.404 2.404 0 01-1.705.707 2.402 2.402 0 01-1.704-.706l-1.568-1.568a1.026 1.026 0 00-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 11-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 00-.289-.877l-1.568-1.568A2.402 2.402 0 010 12.003c0-.618.236-1.234.706-1.704L2.32 8.688a.98.98 0 01.837-.276c.47.07.802.48.968.925a2.501 2.501 0 103.214-3.214c-.446-.166-.855-.497-.925-.968a.979.979 0 01.276-.837l1.61-1.61a2.404 2.404 0 011.705-.707c.618 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 113.237 3.237c-.464.18-.894.527-.967 1.02z"/></svg>',
};

/** 组件注册容器 */
window.AppComponents = window.AppComponents || [];
