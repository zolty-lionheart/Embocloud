// ============================================================
//  RoboCloud 全域测试管控中枢 - 主逻辑
// ============================================================

// ====== 全局数据 ======
const ROBOTS = [
  { id:'RB-01', name:'巡检先锋', type:'巡检机器人', status:'online', battery:87, task:'园区A区巡检', pos:[18,35], speed:1.2, protocol:'ROS2', scene:'园区' },
  { id:'RB-02', name:'服务小智', type:'服务机器人', status:'online', battery:63, task:'大厅引导服务', pos:[42,55], speed:0.8, protocol:'MQTT', scene:'室内' },
  { id:'RB-03', name:'仓储蜂鸟', type:'仓储机器人', status:'warning', battery:18, task:'货架B区分拣', pos:[65,30], speed:0, protocol:'Modbus', scene:'仓储' },
  { id:'RB-04', name:'特战鹰眼', type:'特种机器人', status:'online', battery:92, task:'危险区域勘察', pos:[30,70], speed:2.1, protocol:'DDS', scene:'特种' },
  { id:'RB-05', name:'道路巡航', type:'巡检机器人', status:'online', battery:74, task:'市政道路检测', pos:[75,65], speed:1.8, protocol:'ROS2', scene:'道路' },
  { id:'RB-06', name:'家庭助手', type:'服务机器人', status:'online', battery:56, task:'家庭环境监测', pos:[52,20], speed:0.5, protocol:'Zigbee', scene:'家庭' },
  { id:'RB-07', name:'消防卫士', type:'特种机器人', status:'error',  battery:45, task:'通信异常', pos:[85,45], speed:0, protocol:'DDS', scene:'特种' },
  { id:'RB-08', name:'物流飞鱼', type:'仓储机器人', status:'online', battery:81, task:'跨楼层运输', pos:[20,60], speed:1.5, protocol:'AMQP', scene:'仓储' },
  { id:'RB-09', name:'农业守望', type:'巡检机器人', status:'idle', battery:100, task:'待机中', pos:[58,80], speed:0, protocol:'ROS2', scene:'农业' },
  { id:'RB-10', name:'安保巡逻', type:'巡检机器人', status:'online', battery:69, task:'南区安防巡逻', pos:[12,18], speed:1.1, protocol:'MQTT', scene:'园区' },
  { id:'RB-11', name:'手术助手', type:'服务机器人', status:'online', battery:78, task:'手术室辅助', pos:[40,42], speed:0.3, protocol:'ROS2', scene:'医疗' },
  { id:'RB-12', name:'矿山探测', type:'特种机器人', status:'idle', battery:95, task:'待机中', pos:[72,18], speed:0, protocol:'DDS', scene:'矿山' },
];

const TEST_CASES = [
  { id:'TC-001', name:'导航精度测试', robot:'RB-01', scene:'园区A区', status:'pass', passRate:98.5, duration:'12分32秒', date:'2026-03-31' },
  { id:'TC-002', name:'障碍物规避测试', robot:'RB-04', scene:'特种环境', status:'pass', passRate:96.2, duration:'8分11秒', date:'2026-03-31' },
  { id:'TC-003', name:'多机协同搬运', robot:'RB-03,RB-08', scene:'仓储B区', status:'running', passRate:72.0, duration:'进行中', date:'2026-03-31' },
  { id:'TC-004', name:'电量管理与回充', robot:'RB-02', scene:'大厅', status:'pass', passRate:100, duration:'5分45秒', date:'2026-03-30' },
  { id:'TC-005', name:'传感器融合验证', robot:'RB-05', scene:'道路', status:'failed', passRate:61.3, duration:'18分20秒', date:'2026-03-30' },
  { id:'TC-006', name:'极端温度适应性', robot:'RB-12', scene:'矿山', status:'pending', passRate:0, duration:'待执行', date:'2026-03-31' },
  { id:'TC-007', name:'通信链路压力测试', robot:'RB-07', scene:'特种', status:'failed', passRate:43.8, duration:'22分10秒', date:'2026-03-30' },
  { id:'TC-008', name:'室内定位精度', robot:'RB-06', scene:'家庭', status:'pass', passRate:99.1, duration:'7分58秒', date:'2026-03-29' },
];

const TASKS = [
  { id:'T-089', name:'园区全域安防巡检', robots:['RB-01','RB-10'], scene:'园区', status:'running', progress:68, createTime:'09:15', priority:'高' },
  { id:'T-090', name:'仓储系统压力测试', robots:['RB-03','RB-08'], scene:'仓储', status:'running', progress:35, createTime:'09:42', priority:'高' },
  { id:'T-091', name:'服务机器人用户体验测试', robots:['RB-02','RB-06','RB-11'], scene:'室内', status:'pending', progress:0, createTime:'10:00', priority:'中' },
  { id:'T-092', name:'特种环境极限测试', robots:['RB-04','RB-07','RB-12'], scene:'特种', status:'pending', progress:0, createTime:'14:00', priority:'高' },
  { id:'T-088', name:'道路自动驾驶验证', robots:['RB-05'], scene:'道路', status:'done', progress:100, createTime:'08:00', priority:'中' },
  { id:'T-087', name:'农业机器人播种精度', robots:['RB-09'], scene:'农业', status:'done', progress:100, createTime:'07:30', priority:'低' },
];

const REPORTS = [
  { id:'RPT-024', name:'2026Q1 巡检机器人综合测试报告', date:'2026-03-30', total:156, pass:141, fail:15, rate:90.4, author:'张天' },
  { id:'RPT-023', name:'仓储机器人多机协同专项报告', date:'2026-03-28', total:88, pass:82, fail:6, rate:93.2, author:'李明' },
  { id:'RPT-022', name:'特种机器人极限环境适应性报告', date:'2026-03-25', total:64, pass:51, fail:13, rate:79.7, author:'王芳' },
  { id:'RPT-021', name:'服务机器人用户交互测试报告', date:'2026-03-20', total:120, pass:117, fail:3, rate:97.5, author:'赵磊' },
];

// ====== 时钟 ======
function updateClock() {
  const now = new Date();
  const t = now.toLocaleTimeString('zh-CN', {hour12: false});
  const el = document.getElementById('topbar-time');
  if (el) el.textContent = t;
}
setInterval(updateClock, 1000);
updateClock();

// ====== Listen for parent iframe navigation commands ======
window.addEventListener('message', function(e) {
  if (e.data && e.data.type === 'robotcloud-switch') {
    var target = e.data.target;
    if (target && typeof switchPage === 'function') {
      switchPage(target, null);
      // Notify parent of successful navigation
      window.parent.postMessage({ type: 'robotcloud-navigate', target: target }, '*');
    }
  }
});

// ====== 页面切换 ======
let currentPage = 'dashboard';
let chartInstances = {};

function switchPage(page, el) {
  currentPage = page;
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if (el) el.classList.add('active');

  // 销毁旧图表
  Object.values(chartInstances).forEach(c => { try { c.dispose(); } catch(e){} });
  chartInstances = {};

  const main = document.getElementById('main-content');
  main.innerHTML = '';
  main.classList.add('fade-in');
  setTimeout(() => main.classList.remove('fade-in'), 400);

  const pages = {
    dashboard:   renderDashboard,
    monitor:     renderMonitor,
    tasks:       renderTasks,
    testing:     renderTesting,
    robots:      renderRobots,
    dispatch:    renderDispatch,
    analytics:   renderAnalytics,
    reports:     renderReports,
    simulation:  renderSimulation,
    simtest:     renderSimTest,
    safety:      renderSafety,
  };

  if (pages[page]) pages[page](main);
}

// ====== 通知面板 ======
function showNotifications() {
  document.getElementById('notification-panel').classList.add('open');
  document.getElementById('overlay').classList.add('show');
}

function showSettings() { alert('设置功能开发中...'); }

function closePanel(id) {
  document.getElementById(id).classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
}

function closeAllPanels() {
  document.querySelectorAll('.notification-panel').forEach(p => p.classList.remove('open'));
  document.getElementById('overlay').classList.remove('show');
}

// ============================================================
//  PAGE: 总览大屏
// ============================================================
function renderDashboard(el) {
  const onlineCount = ROBOTS.filter(r => r.status === 'online').length;
  const errorCount  = ROBOTS.filter(r => r.status === 'error').length;
  const warnCount   = ROBOTS.filter(r => r.status === 'warning').length;
  const runningTasks = TASKS.filter(t => t.status === 'running').length;

  el.innerHTML = `
  <div class="page-header">
    <div>
      <div class="page-title"><span class="page-icon">📊</span> 总览大屏</div>
      <div class="page-subtitle">全域机器人测试管控 · 实时数据聚合视图</div>
    </div>
    <div class="header-actions">
      <button class="btn btn-outline btn-sm" onclick="exportDashboard()">⬇ 导出快照</button>
      <button class="btn btn-primary btn-sm" onclick="switchPage('monitor', null)">📡 进入监控</button>
    </div>
  </div>

  <div class="metric-grid">
    <div class="metric-card blue">
      <div class="metric-label">接入机器人</div>
      <div class="metric-value">${ROBOTS.length}<span class="metric-unit"> 台</span></div>
      <div class="metric-change up">↑ 较昨日 +2</div>
      <div class="metric-bg-icon">🤖</div>
    </div>
    <div class="metric-card green">
      <div class="metric-label">在线运行</div>
      <div class="metric-value">${onlineCount}<span class="metric-unit"> 台</span></div>
      <div class="metric-change up">↑ 在线率 ${Math.round(onlineCount/ROBOTS.length*100)}%</div>
      <div class="metric-bg-icon">✅</div>
    </div>
    <div class="metric-card yellow">
      <div class="metric-label">执行中任务</div>
      <div class="metric-value">${runningTasks}<span class="metric-unit"> 项</span></div>
      <div class="metric-change up">↑ 今日累计 ${TASKS.length}</div>
      <div class="metric-bg-icon">⚡</div>
    </div>
    <div class="metric-card red">
      <div class="metric-label">异常告警</div>
      <div class="metric-value">${errorCount + warnCount}<span class="metric-unit"> 项</span></div>
      <div class="metric-change down">↓ 需立即处理 ${errorCount}</div>
      <div class="metric-bg-icon">⚠️</div>
    </div>
    <div class="metric-card purple">
      <div class="metric-label">今日测试用例</div>
      <div class="metric-value">158<span class="metric-unit"> 条</span></div>
      <div class="metric-change up">↑ 通过率 94.3%</div>
      <div class="metric-bg-icon">🧪</div>
    </div>
    <div class="metric-card cyan">
      <div class="metric-label">数据采集量</div>
      <div class="metric-value">2.4<span class="metric-unit"> GB</span></div>
      <div class="metric-change up">↑ 实时写入中</div>
      <div class="metric-bg-icon">📊</div>
    </div>
  </div>

  <div class="grid-2" style="margin-bottom:16px">
    <div class="card">
      <div class="card-header">
        <span class="card-title">🤖 机器人状态分布</span>
        <span class="tag tag-info">实时</span>
      </div>
      <div id="chart-robot-status" style="height:200px"></div>
    </div>
    <div class="card">
      <div class="card-header">
        <span class="card-title">📈 今日测试通过率趋势</span>
      </div>
      <div id="chart-pass-trend" style="height:200px"></div>
    </div>
  </div>

  <div class="grid-2" style="margin-bottom:16px">
    <div class="card">
      <div class="card-header">
        <span class="card-title">⚡ 活跃任务</span>
        <button class="btn btn-outline btn-xs" onclick="switchPage('tasks',null)">查看全部</button>
      </div>
      <table class="data-table">
        <thead><tr><th>任务ID</th><th>名称</th><th>场景</th><th>进度</th><th>状态</th></tr></thead>
        <tbody>
          ${TASKS.filter(t => t.status !== 'done').map(t => `
          <tr>
            <td><code style="color:var(--accent);font-size:11px">${t.id}</code></td>
            <td>${t.name}</td>
            <td><span class="tag tag-info">${t.scene}</span></td>
            <td>
              <div style="display:flex;align-items:center;gap:8px">
                <div class="progress-bar" style="flex:1">
                  <div class="progress-fill ${t.progress>80?'success':t.progress>40?'':''}" style="width:${t.progress}%"></div>
                </div>
                <span style="font-size:11px;color:var(--text-muted);width:30px">${t.progress}%</span>
              </div>
            </td>
            <td><span class="tag ${t.status==='running'?'tag-running':t.status==='pending'?'tag-pending':'tag-pass'}">${
              t.status==='running'?'执行中':t.status==='pending'?'待执行':'已完成'
            }</span></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
    <div class="card">
      <div class="card-header">
        <span class="card-title">🚨 最新告警</span>
        <span class="badge-count">3</span>
      </div>
      ${ROBOTS.filter(r => r.status==='error'||r.status==='warning').map(r => `
      <div style="display:flex;align-items:center;gap:12px;padding:10px;border-radius:8px;margin-bottom:6px;background:${r.status==='error'?'rgba(239,68,68,0.08)':'rgba(245,158,11,0.08)'};border:1px solid ${r.status==='error'?'rgba(239,68,68,0.25)':'rgba(245,158,11,0.25)'}">
        <span style="font-size:22px">🤖</span>
        <div style="flex:1">
          <div style="font-size:13px;font-weight:500">${r.name} (${r.id})</div>
          <div style="font-size:11px;color:var(--text-muted)">${r.task} · 电量${r.battery}%</div>
        </div>
        <span class="tag ${r.status==='error'?'tag-error':'tag-warning'}">${r.status==='error'?'通信异常':'电量不足'}</span>
      </div>`).join('')}
      <div style="display:flex;align-items:center;gap:12px;padding:10px;border-radius:8px;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.25)">
        <span style="font-size:22px">🧪</span>
        <div style="flex:1">
          <div style="font-size:13px;font-weight:500">TC-005 传感器融合验证</div>
          <div style="font-size:11px;color:var(--text-muted)">RB-05 · 通过率仅61.3%</div>
        </div>
        <span class="tag tag-error">测试失败</span>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <span class="card-title">🌐 机器人品类覆盖与场景分布</span>
    </div>
    <div id="chart-scene-bar" style="height:160px"></div>
  </div>
  `;

  // 图表1：机器人状态饼图
  initChart('chart-robot-status', {
    backgroundColor: 'transparent',
    tooltip: { trigger:'item', formatter:'{b}: {c}台 ({d}%)' },
    legend: { orient:'vertical', right:10, top:'center', textStyle:{color:'#7aa0c4',fontSize:11} },
    series: [{
      type:'pie', radius:['45%','70%'], center:['40%','50%'],
      label:{ show:false },
      itemStyle:{ borderRadius:4, borderColor:'transparent', borderWidth:2 },
      data: [
        { value: ROBOTS.filter(r=>r.status==='online').length, name:'在线运行', itemStyle:{color:'#10b981'} },
        { value: ROBOTS.filter(r=>r.status==='idle').length, name:'空闲待机', itemStyle:{color:'#00b4ff'} },
        { value: ROBOTS.filter(r=>r.status==='warning').length, name:'告警中', itemStyle:{color:'#f59e0b'} },
        { value: ROBOTS.filter(r=>r.status==='error').length, name:'通信异常', itemStyle:{color:'#ef4444'} },
      ]
    }]
  });

  // 图表2：今日通过率趋势
  const hours = Array.from({length:10}, (_,i) => `${(i+1).toString().padStart(2,'0')}:00`);
  initChart('chart-pass-trend', {
    backgroundColor:'transparent',
    tooltip:{ trigger:'axis', backgroundColor:'rgba(13,31,53,0.9)', borderColor:'rgba(0,180,255,0.3)', textStyle:{color:'#e2f0ff',fontSize:12} },
    grid:{ top:20, bottom:20, left:40, right:20 },
    xAxis:{ type:'category', data:hours, axisLine:{lineStyle:{color:'rgba(0,180,255,0.2)'}}, axisLabel:{color:'#4a6580',fontSize:10} },
    yAxis:{ type:'value', min:80, max:100, axisLabel:{color:'#4a6580',fontSize:10,formatter:'{value}%'}, splitLine:{lineStyle:{color:'rgba(0,180,255,0.06)'}} },
    series:[{
      type:'line', smooth:true,
      data:[88,90,91,94,93,95,96,94,97,94],
      lineStyle:{color:'#00b4ff',width:2},
      areaStyle:{color:{type:'linear',x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:'rgba(0,180,255,0.25)'},{offset:1,color:'rgba(0,180,255,0)'}]}},
      itemStyle:{color:'#00b4ff'},
      symbol:'circle', symbolSize:5
    }]
  });

  // 图表3：场景分布
  const scenes = [...new Set(ROBOTS.map(r=>r.scene))];
  const counts = scenes.map(s => ROBOTS.filter(r=>r.scene===s).length);
  initChart('chart-scene-bar', {
    backgroundColor:'transparent',
    tooltip:{ trigger:'axis', backgroundColor:'rgba(13,31,53,0.9)', borderColor:'rgba(0,180,255,0.3)', textStyle:{color:'#e2f0ff'} },
    grid:{ top:10, bottom:25, left:40, right:20 },
    xAxis:{ type:'category', data:scenes, axisLine:{lineStyle:{color:'rgba(0,180,255,0.2)'}}, axisLabel:{color:'#7aa0c4',fontSize:11} },
    yAxis:{ type:'value', axisLabel:{color:'#4a6580',fontSize:10}, splitLine:{lineStyle:{color:'rgba(0,180,255,0.06)'}} },
    series:[{
      type:'bar', data:counts, barWidth:'50%',
      itemStyle:{borderRadius:[4,4,0,0], color:{type:'linear',x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:'#00b4ff'},{offset:1,color:'rgba(0,180,255,0.2)'}]}}
    }]
  });
}

// ============================================================
//  PAGE: 实时监控
// ============================================================
function renderMonitor(el) {
  el.innerHTML = `
  <div class="page-header">
    <div>
      <div class="page-title"><span class="page-icon">📡</span> 实时监控</div>
      <div class="page-subtitle">机器人位置追踪 · 传感器数据流 · 通信链路状态</div>
    </div>
    <div class="header-actions">
      <select class="btn btn-outline btn-sm" style="color:var(--accent);cursor:pointer" onchange="filterScene(this.value)">
        <option value="">全部场景</option>
        <option>园区</option><option>仓储</option><option>道路</option>
        <option>特种</option><option>室内</option><option>家庭</option>
      </select>
      <button class="btn btn-primary btn-sm" onclick="refreshMonitor()">🔄 刷新</button>
    </div>
  </div>

  <div class="grid-2" style="margin-bottom:16px">
    <div class="card" style="padding:0;overflow:hidden">
      <div style="padding:12px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between">
        <span class="card-title">🗺 机器人实时位置图</span>
        <div style="display:flex;gap:10px;font-size:11px">
          <span style="color:var(--success)">● 在线</span>
          <span style="color:var(--warning)">● 告警</span>
          <span style="color:var(--danger)">● 异常</span>
          <span style="color:var(--accent)">● 空闲</span>
        </div>
      </div>
      <div class="map-container" id="robot-map">
        <div class="map-grid"></div>
        <svg class="map-paths" id="map-paths"></svg>
        ${ROBOTS.map(r => `
        <div class="map-robot ${r.status==='online'?'active':r.status==='warning'?'warning':r.status==='error'?'error':'active'}"
             style="left:${r.pos[0]}%;top:${r.pos[1]}%;transform:translate(-50%,-50%)"
             onclick="showRobotDetail('${r.id}')">
          <div class="map-robot-body">
            ${r.type.includes('巡检')?'🔍':r.type.includes('服务')?'🤖':r.type.includes('仓储')?'📦':'⚡'}
          </div>
          <div class="map-robot-pulse"></div>
          <div class="map-tooltip">${r.id} · ${r.name}</div>
        </div>`).join('')}
        <!-- 区域标注 -->
        <div style="position:absolute;top:10px;left:10px;font-size:10px;color:rgba(0,180,255,0.4);border:1px dashed rgba(0,180,255,0.15);padding:3px 7px;border-radius:4px">A区-园区</div>
        <div style="position:absolute;top:10px;right:10px;font-size:10px;color:rgba(0,180,255,0.4);border:1px dashed rgba(0,180,255,0.15);padding:3px 7px;border-radius:4px">B区-仓储</div>
        <div style="position:absolute;bottom:10px;left:10px;font-size:10px;color:rgba(0,180,255,0.4);border:1px dashed rgba(0,180,255,0.15);padding:3px 7px;border-radius:4px">C区-特种</div>
        <div style="position:absolute;bottom:10px;right:10px;font-size:10px;color:rgba(0,180,255,0.4);border:1px dashed rgba(0,180,255,0.15);padding:3px 7px;border-radius:4px">D区-道路</div>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <span class="card-title">📟 传感器数据流</span>
        <select class="btn btn-outline btn-xs" id="sensor-robot-sel" onchange="updateSensorCharts(this.value)" style="cursor:pointer;color:var(--accent)">
          ${ROBOTS.filter(r=>r.status==='online').map(r=>`<option value="${r.id}">${r.id} ${r.name}</option>`).join('')}
        </select>
      </div>
      <div class="sensor-grid" id="sensor-grid">
        ${renderSensorCards('RB-01')}
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <span class="card-title">📋 机器人状态列表</span>
      <div class="search-bar">
        <span>🔍</span>
        <input type="text" placeholder="搜索机器人..." id="robot-search" oninput="filterRobotTable(this.value)">
      </div>
    </div>
    <table class="data-table" id="robot-table">
      <thead><tr><th>机器人ID</th><th>名称</th><th>类型</th><th>状态</th><th>当前任务</th><th>电量</th><th>速度</th><th>协议</th><th>场景</th></tr></thead>
      <tbody>
        ${ROBOTS.map(r => `
        <tr data-robot="${r.id}">
          <td><code style="color:var(--accent);font-size:11px">${r.id}</code></td>
          <td style="font-weight:500">${r.name}</td>
          <td style="color:var(--text-secondary)">${r.type}</td>
          <td><span class="tag ${r.status==='online'?'tag-online':r.status==='warning'?'tag-warning':r.status==='error'?'tag-error':'tag-idle'}">
            <span class="tag-dot"></span>
            ${r.status==='online'?'在线':r.status==='warning'?'告警':r.status==='error'?'异常':'空闲'}
          </span></td>
          <td style="color:var(--text-secondary);font-size:12px">${r.task}</td>
          <td>
            <div style="display:flex;align-items:center;gap:6px">
              <div class="progress-bar" style="width:60px">
                <div class="progress-fill ${r.battery<20?'danger':r.battery<50?'warning':'success'}" style="width:${r.battery}%"></div>
              </div>
              <span style="font-size:11px;color:${r.battery<20?'var(--danger)':r.battery<50?'var(--warning)':'var(--success)'}">${r.battery}%</span>
            </div>
          </td>
          <td style="color:var(--accent2)">${r.speed} m/s</td>
          <td><span class="tag tag-info" style="font-size:10px">${r.protocol}</span></td>
          <td style="color:var(--text-muted)">${r.scene}</td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>
  `;
  startRobotAnimation();
}

function renderSensorCards(robotId) {
  const robot = ROBOTS.find(r => r.id === robotId) || ROBOTS[0];
  const sensors = [
    { name:'激光雷达距离', val: (Math.random()*3+0.5).toFixed(2), unit:'m' },
    { name:'IMU角速度', val: (Math.random()*5).toFixed(2), unit:'rad/s' },
    { name:'摄像头帧率', val: (Math.random()*10+25).toFixed(1), unit:'fps' },
    { name:'超声波', val: (Math.random()*2+0.3).toFixed(2), unit:'m' },
    { name:'温度传感器', val: (Math.random()*20+25).toFixed(1), unit:'°C' },
    { name:'气压计', val: (Math.random()*5+1010).toFixed(1), unit:'hPa' },
  ];
  return sensors.map(s => `
  <div class="sensor-card">
    <div class="sensor-name">${s.name}</div>
    <div class="sensor-value">${s.val}<span style="font-size:12px;color:var(--text-muted)"> ${s.unit}</span></div>
    <div class="sensor-trend" id="sensor-${s.name.replace(/\s/g,'')}-chart"></div>
  </div>`).join('');
}

function updateSensorCharts(robotId) {
  const grid = document.getElementById('sensor-grid');
  if (grid) grid.innerHTML = renderSensorCards(robotId);
}

function filterRobotTable(query) {
  const rows = document.querySelectorAll('#robot-table tbody tr');
  rows.forEach(row => {
    row.style.display = row.innerText.toLowerCase().includes(query.toLowerCase()) ? '' : 'none';
  });
}

let robotAnimInterval = null;
function startRobotAnimation() {
  robotAnimInterval = setInterval(() => {
    const robots = document.querySelectorAll('.map-robot');
    robots.forEach((el, i) => {
      const r = ROBOTS[i];
      if (r && r.status === 'online') {
        const dx = (Math.random()-0.5)*2;
        const dy = (Math.random()-0.5)*2;
        let newX = parseFloat(el.style.left) + dx;
        let newY = parseFloat(el.style.top) + dy;
        newX = Math.max(5, Math.min(95, newX));
        newY = Math.max(5, Math.min(90, newY));
        el.style.left = newX + '%';
        el.style.top = newY + '%';
      }
    });
  }, 2000);
}

function showRobotDetail(id) {
  const r = ROBOTS.find(x => x.id === id);
  if (!r) return;
  alert(`机器人详情\n\nID: ${r.id}\n名称: ${r.name}\n类型: ${r.type}\n状态: ${r.status}\n任务: ${r.task}\n电量: ${r.battery}%\n速度: ${r.speed}m/s\n协议: ${r.protocol}`);
}

function refreshMonitor() {
  if (robotAnimInterval) clearInterval(robotAnimInterval);
  switchPage('monitor', document.querySelector('[data-page="monitor"]'));
}

// ============================================================
//  PAGE: 场景任务编排
// ============================================================
function renderTasks(el) {
  el.innerHTML = `
  <div class="page-header">
    <div>
      <div class="page-title"><span class="page-icon">🗂</span> 场景任务编排</div>
      <div class="page-subtitle">可视化任务流设计 · 多场景适配 · 智能调度配置</div>
    </div>
    <div class="header-actions">
      <button class="btn btn-outline btn-sm">📥 导入模板</button>
      <button class="btn btn-primary btn-sm" onclick="createTask()">＋ 新建任务</button>
    </div>
  </div>

  <div class="tab-bar">
    <div class="tab active" onclick="switchTab(this,'task-list')">任务列表</div>
    <div class="tab" onclick="switchTab(this,'task-flow')">流程编排</div>
    <div class="tab" onclick="switchTab(this,'task-template')">场景模板</div>
  </div>

  <div id="task-list" class="task-tab-content">
    <table class="data-table">
      <thead><tr><th>任务ID</th><th>任务名称</th><th>关联机器人</th><th>场景</th><th>优先级</th><th>进度</th><th>状态</th><th>操作</th></tr></thead>
      <tbody>
        ${TASKS.map(t => `
        <tr>
          <td><code style="color:var(--accent);font-size:11px">${t.id}</code></td>
          <td style="font-weight:500">${t.name}</td>
          <td><div style="display:flex;flex-wrap:wrap;gap:4px">${t.robots.map(r=>`<span class="tag tag-info" style="font-size:10px">${r}</span>`).join('')}</div></td>
          <td>${t.scene}</td>
          <td><span class="tag ${t.priority==='高'?'tag-error':t.priority==='中'?'tag-warning':'tag-idle'}">${t.priority}</span></td>
          <td>
            <div style="display:flex;align-items:center;gap:8px;min-width:120px">
              <div class="progress-bar" style="flex:1">
                <div class="progress-fill" style="width:${t.progress}%"></div>
              </div>
              <span style="font-size:11px;color:var(--text-muted)">${t.progress}%</span>
            </div>
          </td>
          <td><span class="tag ${t.status==='running'?'tag-running':t.status==='done'?'tag-pass':'tag-pending'}">${
            t.status==='running'?'执行中':t.status==='done'?'已完成':'待执行'
          }</span></td>
          <td>
            <div style="display:flex;gap:6px">
              <button class="btn btn-outline btn-xs">详情</button>
              ${t.status==='running'?`<button class="btn btn-danger btn-xs">暂停</button>`:`<button class="btn btn-success btn-xs">启动</button>`}
            </div>
          </td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>

  <div id="task-flow" class="task-tab-content" style="display:none">
    <div class="card" style="margin-bottom:16px">
      <div class="card-header">
        <span class="card-title">⚡ 园区全域安防巡检 - 任务流</span>
        <div style="display:flex;gap:8px">
          <button class="btn btn-outline btn-sm">💾 保存</button>
          <button class="btn btn-primary btn-sm">▶ 执行</button>
        </div>
      </div>
      <div class="flow-container" id="flow-diagram">
        ${renderFlowNodes()}
      </div>
    </div>
    <div class="grid-2">
      <div class="card">
        <div class="card-header"><span class="card-title">⚙️ 节点配置</span></div>
        <div style="padding:10px">
          <div style="margin-bottom:12px">
            <div style="font-size:11px;color:var(--text-muted);margin-bottom:4px">节点名称</div>
            <input type="text" value="初始化环境" style="background:rgba(0,0,0,0.2);border:1px solid var(--border);border-radius:6px;padding:6px 10px;color:var(--text-primary);font-size:12px;width:100%;outline:none">
          </div>
          <div style="margin-bottom:12px">
            <div style="font-size:11px;color:var(--text-muted);margin-bottom:4px">执行机器人</div>
            <select style="background:var(--bg-card);border:1px solid var(--border);border-radius:6px;padding:6px 10px;color:var(--text-primary);font-size:12px;width:100%;outline:none">
              ${ROBOTS.map(r=>`<option value="${r.id}">${r.id} - ${r.name}</option>`).join('')}
            </select>
          </div>
          <div style="margin-bottom:12px">
            <div style="font-size:11px;color:var(--text-muted);margin-bottom:4px">超时时间(秒)</div>
            <input type="number" value="300" style="background:rgba(0,0,0,0.2);border:1px solid var(--border);border-radius:6px;padding:6px 10px;color:var(--text-primary);font-size:12px;width:100%;outline:none">
          </div>
          <div style="margin-bottom:12px">
            <div style="font-size:11px;color:var(--text-muted);margin-bottom:4px">失败处理</div>
            <select style="background:var(--bg-card);border:1px solid var(--border);border-radius:6px;padding:6px 10px;color:var(--text-primary);font-size:12px;width:100%;outline:none">
              <option>重试3次</option><option>跳过</option><option>终止任务</option>
            </select>
          </div>
          <button class="btn btn-primary btn-sm" style="width:100%">应用配置</button>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title">📅 调度策略</span></div>
        <div style="padding:10px">
          ${[
            ['触发方式', '定时触发', ['定时触发','手动触发','事件驱动','API调用']],
            ['执行频率', '每日09:00', ['一次性','每小时','每日09:00','每周一']],
            ['并发数限制', '3台并行', ['1台','2台','3台并行','无限制']],
            ['优先级策略', '高优先级', ['高优先级','低优先级','FIFO','抢占式']],
          ].map(([label, val, opts]) => `
          <div style="margin-bottom:12px">
            <div style="font-size:11px;color:var(--text-muted);margin-bottom:4px">${label}</div>
            <select style="background:var(--bg-card);border:1px solid var(--border);border-radius:6px;padding:6px 10px;color:var(--text-primary);font-size:12px;width:100%;outline:none">
              ${opts.map(o=>`<option ${o===val?'selected':''}>${o}</option>`).join('')}
            </select>
          </div>`).join('')}
          <button class="btn btn-success btn-sm" style="width:100%">保存调度配置</button>
        </div>
      </div>
    </div>
  </div>

  <div id="task-template" class="task-tab-content" style="display:none">
    <div class="grid-auto">
      ${[
        { icon:'🏢', name:'园区安防巡检', desc:'适配园区、停车场等开放空间，支持多路段分段巡检', robots:'巡检机器人', tags:['GPS定位','夜视摄像','热成像'] },
        { icon:'🏭', name:'仓储分拣调度', desc:'货架定位+搬运路径优化，适配多层仓储环境', robots:'仓储机器人', tags:['SLAM建图','货架识别','动态避障'] },
        { icon:'🛣', name:'道路自主驾驶', desc:'市政/园区道路自动驾驶测试，覆盖极端天气场景', robots:'巡检机器人', tags:['车道检测','信号灯','行人避障'] },
        { icon:'🏠', name:'家庭服务测试', desc:'室内服务机器人语音交互、物品搬运、充电回桩', robots:'服务机器人', tags:['语音识别','手势检测','自动回充'] },
        { icon:'⚡', name:'特种极限测试', desc:'高温/低温/粉尘/水下等极端环境下的适应性测试', robots:'特种机器人', tags:['温控测试','防水测试','防爆验证'] },
        { icon:'🌾', name:'农业精准作业', desc:'农田巡检、播种精度、作物识别、病虫害监测', robots:'巡检机器人', tags:['多光谱','GNSS','农药喷洒'] },
      ].map(t => `
      <div class="card" style="cursor:pointer" onclick="useTemplate('${t.name}')">
        <div style="font-size:32px;margin-bottom:10px">${t.icon}</div>
        <div style="font-size:14px;font-weight:600;margin-bottom:6px">${t.name}</div>
        <div style="font-size:12px;color:var(--text-muted);margin-bottom:12px;line-height:1.5">${t.desc}</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px">
          ${t.tags.map(tag=>`<span class="tag tag-info" style="font-size:10px">${tag}</span>`).join('')}
        </div>
        <div style="font-size:11px;color:var(--text-muted)">适用：${t.robots}</div>
      </div>`).join('')}
    </div>
  </div>
  `;
}

function renderFlowNodes() {
  const nodes = [
    { name:'初始化\n环境', status:'done', icon:'⚙' },
    { name:'设备\n自检', status:'done', icon:'🔧' },
    { name:'地图\n加载', status:'done', icon:'🗺' },
    { name:'路径\n规划', status:'running', icon:'📍' },
    { name:'巡检\n执行', status:'active', icon:'🔍' },
    { name:'数据\n采集', status:'active', icon:'📊' },
    { name:'异常\n检测', status:'active', icon:'⚠' },
    { name:'报告\n生成', status:'pending', icon:'📋' },
  ];
  return nodes.map((n, i) => `
    <div class="flow-node ${n.status}" onclick="selectFlowNode(${i})" title="${n.name.replace('\n','')}">
      <div style="font-size:18px;margin-bottom:4px">${n.icon}</div>
      <div style="font-size:11px;white-space:pre-line;line-height:1.3">${n.name}</div>
    </div>
    ${i < nodes.length-1 ? '<div class="flow-arrow">→</div>' : ''}
  `).join('');
}

function selectFlowNode(i) {
  console.log('选中节点', i);
}

function switchTab(el, tabId) {
  el.closest('.app-layout, .main-content, body').querySelectorAll ? null : null;
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('.task-tab-content').forEach(c => c.style.display = 'none');
  const target = document.getElementById(tabId);
  if (target) target.style.display = '';
}

function createTask() {
  alert('新建任务功能 - 在实际系统中会打开任务编排对话框');
}

function useTemplate(name) {
  alert(`已选择模板：${name}\n将自动填充任务配置...`);
}

// ============================================================
//  PAGE: 自动化测试
// ============================================================
function renderTesting(el) {
  el.innerHTML = `
  <div class="page-header">
    <div>
      <div class="page-title"><span class="page-icon">🧪</span> 自动化测试</div>
      <div class="page-subtitle">测试用例管理 · 自动执行引擎 · 实时日志追踪</div>
    </div>
    <div class="header-actions">
      <button class="btn btn-outline btn-sm">📥 导入用例</button>
      <button class="btn btn-primary btn-sm" onclick="runAllTests()">▶ 批量执行</button>
    </div>
  </div>

  <div class="grid-2" style="margin-bottom:16px">
    <div class="card">
      <div class="card-header">
        <span class="card-title">📋 测试用例</span>
        <span class="badge-count">${TEST_CASES.length}</span>
      </div>
      <table class="data-table">
        <thead><tr><th>用例ID</th><th>名称</th><th>机器人</th><th>通过率</th><th>状态</th><th>操作</th></tr></thead>
        <tbody>
          ${TEST_CASES.map(tc => `
          <tr onclick="selectTestCase('${tc.id}')" style="cursor:pointer">
            <td><code style="color:var(--accent);font-size:11px">${tc.id}</code></td>
            <td style="font-weight:500">${tc.name}</td>
            <td style="font-size:11px;color:var(--text-muted)">${tc.robot}</td>
            <td>
              ${tc.status !== 'pending' ? `
              <div style="display:flex;align-items:center;gap:6px">
                <div class="progress-bar" style="width:50px">
                  <div class="progress-fill ${tc.passRate>=90?'success':tc.passRate>=70?'warning':'danger'}" style="width:${tc.passRate}%"></div>
                </div>
                <span style="font-size:11px;color:${tc.passRate>=90?'var(--success)':tc.passRate>=70?'var(--warning)':'var(--danger)'}">${tc.passRate}%</span>
              </div>` : '<span style="color:var(--text-muted);font-size:11px">待执行</span>'}
            </td>
            <td><span class="tag ${tc.status==='pass'?'tag-pass':tc.status==='running'?'tag-running':tc.status==='failed'?'tag-failed':'tag-pending'}">
              ${tc.status==='pass'?'✓ 通过':tc.status==='running'?'⟳ 执行中':tc.status==='failed'?'✗ 失败':'待执行'}
            </span></td>
            <td>
              <button class="btn btn-outline btn-xs" onclick="event.stopPropagation();runTest('${tc.id}')">
                ${tc.status==='running'?'⏹ 停止':'▶ 运行'}
              </button>
            </td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>

    <div class="card">
      <div class="card-header">
        <span class="card-title">⚡ 执行日志 · TC-003 多机协同搬运</span>
        <span class="tag tag-running"><span class="tag-dot"></span>执行中</span>
      </div>
      <div class="log-terminal" id="test-log">
        ${generateTestLogs()}
      </div>
      <div style="margin-top:12px">
        <div style="font-size:11px;color:var(--text-muted);margin-bottom:6px">执行进度 72%</div>
        <div class="progress-bar" style="height:8px">
          <div class="progress-fill warning" style="width:72%"></div>
        </div>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <span class="card-title">📊 测试执行步骤 · TC-003</span>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0">
      <div style="padding-right:16px;border-right:1px solid var(--border)">
        ${[
          { num:1, name:'初始化仓储环境', desc:'加载B区地图，校准货架坐标', status:'done', time:'00:12' },
          { num:2, name:'RB-03启动分拣', desc:'扫描货架标签，确认目标货物', status:'done', time:'00:45' },
          { num:3, name:'RB-08就位支援', desc:'跨楼层路径规划，移动至B区', status:'done', time:'01:20' },
          { num:4, name:'多机协同搬运', desc:'两机械臂同步抓取，防碰撞检测', status:'running', time:'进行中' },
          { num:5, name:'路径避障验证', desc:'动态障碍物绕行测试', status:'pending', time:'待执行' },
          { num:6, name:'放置精度检测', desc:'货物放置误差 ≤ 5mm', status:'pending', time:'待执行' },
        ].map(s => `
        <div class="test-step">
          <div class="step-num ${s.status}">${s.status==='done'?'✓':s.status==='running'?s.num:s.status==='failed'?'✗':s.num}</div>
          <div class="step-info">
            <div class="step-name">${s.name}</div>
            <div class="step-desc">${s.desc}</div>
            <div class="step-time">⏱ ${s.time}</div>
          </div>
        </div>`).join('')}
      </div>
      <div style="padding-left:16px">
        <div style="font-size:12px;font-weight:600;color:var(--text-secondary);margin-bottom:12px;text-transform:uppercase;letter-spacing:1px">实时指标</div>
        <div id="chart-test-realtime" style="height:220px"></div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:12px">
          <div style="text-align:center;padding:8px;background:rgba(16,185,129,0.08);border-radius:8px;border:1px solid rgba(16,185,129,0.2)">
            <div style="font-size:18px;font-weight:700;color:var(--success)">52</div>
            <div style="font-size:10px;color:var(--text-muted)">通过</div>
          </div>
          <div style="text-align:center;padding:8px;background:rgba(239,68,68,0.08);border-radius:8px;border:1px solid rgba(239,68,68,0.2)">
            <div style="font-size:18px;font-weight:700;color:var(--danger)">4</div>
            <div style="font-size:10px;color:var(--text-muted)">失败</div>
          </div>
          <div style="text-align:center;padding:8px;background:rgba(0,180,255,0.08);border-radius:8px;border:1px solid rgba(0,180,255,0.2)">
            <div style="font-size:18px;font-weight:700;color:var(--accent)">16</div>
            <div style="font-size:10px;color:var(--text-muted)">待测</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;

  // 实时指标图表
  initChart('chart-test-realtime', {
    backgroundColor:'transparent',
    tooltip:{ trigger:'axis', backgroundColor:'rgba(13,31,53,0.9)', borderColor:'rgba(0,180,255,0.3)', textStyle:{color:'#e2f0ff',fontSize:11} },
    legend:{ top:0, right:0, textStyle:{color:'#7aa0c4',fontSize:10} },
    grid:{ top:25, bottom:25, left:35, right:10 },
    xAxis:{ type:'category', data:Array.from({length:12},(_,i)=>i+'s'), axisLabel:{color:'#4a6580',fontSize:10}, axisLine:{lineStyle:{color:'rgba(0,180,255,0.15)'}} },
    yAxis:{ type:'value', axisLabel:{color:'#4a6580',fontSize:10}, splitLine:{lineStyle:{color:'rgba(0,180,255,0.06)'}} },
    series:[
      { name:'定位误差(mm)', type:'line', smooth:true, data:[3.1,2.8,3.2,2.5,2.9,3.0,2.7,2.4,2.8,3.1,2.6,2.9], lineStyle:{color:'#00b4ff',width:1.5}, areaStyle:{color:'rgba(0,180,255,0.08)'}, itemStyle:{color:'#00b4ff'}, symbol:'none' },
      { name:'协同延迟(ms)', type:'line', smooth:true, data:[45,42,48,44,46,43,47,41,45,44,46,43], lineStyle:{color:'#00ffc8',width:1.5}, itemStyle:{color:'#00ffc8'}, symbol:'none' },
    ]
  });

  // 自动追加日志
  setInterval(() => {
    const log = document.getElementById('test-log');
    if (log) {
      const msgs = ['[INFO] 机械臂位置校准中...', '[DATA] 抓取力矩: 12.4Nm', '[INFO] 防碰撞距离: 0.32m', '[SUCCESS] 步骤4子任务完成'];
      const colors = ['log-info','log-data','log-info','log-success'];
      const i = Math.floor(Math.random()*msgs.length);
      const t = new Date().toLocaleTimeString('zh-CN',{hour12:false});
      log.innerHTML += `<div class="log-line"><span class="log-time">${t}</span><span class="${colors[i]}">${msgs[i]}</span></div>`;
      log.scrollTop = log.scrollHeight;
    }
  }, 1500);
}

function generateTestLogs() {
  const logs = [
    ['09:42:15', 'INFO', '任务 TC-003 开始执行', 'log-info'],
    ['09:42:16', 'INFO', 'RB-03 初始化完成，已连接', 'log-info'],
    ['09:42:17', 'INFO', 'RB-08 初始化完成，已连接', 'log-info'],
    ['09:42:30', 'DATA', '仓储B区地图加载成功，分辨率0.05m', 'log-data'],
    ['09:43:05', 'SUCCESS', '货架扫描完成，识别货物32件', 'log-success'],
    ['09:43:45', 'INFO', 'RB-08 跨楼层路径规划: 3楼→1楼', 'log-info'],
    ['09:45:12', 'INFO', '两机器人就位，开始协同搬运', 'log-info'],
    ['09:45:30', 'DATA', '协同误差: 2.3mm，阈值: 5mm ✓', 'log-data'],
    ['09:46:02', 'WARNING', '检测到动态障碍物，正在规避', 'log-warning'],
    ['09:46:08', 'SUCCESS', '规避成功，继续执行', 'log-success'],
  ];
  return logs.map(([t,l,m,c]) => `<div class="log-line"><span class="log-time">${t}</span><span class="${c}">[${l}] ${m}</span></div>`).join('');
}

function runAllTests() { alert('批量执行：将按优先级依次执行所有待测用例'); }
function runTest(id) { alert(`执行测试用例: ${id}`); }
function selectTestCase(id) { alert(`查看测试详情: ${id}`); }

// ============================================================
//  PAGE: 机器人管理
// ============================================================
function renderRobots(el) {
  el.innerHTML = `
  <div class="page-header">
    <div>
      <div class="page-title"><span class="page-icon">🤖</span> 机器人管理</div>
      <div class="page-subtitle">设备注册 · 协议适配 · 生命周期管理</div>
    </div>
    <div class="header-actions">
      <button class="btn btn-outline btn-sm">📡 批量接入</button>
      <button class="btn btn-primary btn-sm">＋ 注册设备</button>
    </div>
  </div>

  <div class="metric-grid" style="grid-template-columns:repeat(5,1fr)">
    ${[
      ['blue','巡检机器人',ROBOTS.filter(r=>r.type.includes('巡检')).length,'🔍'],
      ['green','服务机器人',ROBOTS.filter(r=>r.type.includes('服务')).length,'🤖'],
      ['yellow','仓储机器人',ROBOTS.filter(r=>r.type.includes('仓储')).length,'📦'],
      ['purple','特种机器人',ROBOTS.filter(r=>r.type.includes('特种')).length,'⚡'],
      ['cyan','协议类型',['ROS2','MQTT','DDS','Modbus','AMQP','Zigbee'].length,'🔗'],
    ].map(([c,label,val,icon]) => `
    <div class="metric-card ${c}">
      <div class="metric-label">${label}</div>
      <div class="metric-value">${val}<span class="metric-unit"> 台</span></div>
      <div class="metric-bg-icon">${icon}</div>
    </div>`).join('')}
  </div>

  <div class="grid-auto">
    ${ROBOTS.map(r => `
    <div class="robot-card ${r.status==='online'||r.status==='idle'?'active':r.status==='warning'?'warning':'error'}">
      <div class="robot-avatar">
        ${r.type.includes('巡检')?'🔍':r.type.includes('服务')?'🤖':r.type.includes('仓储')?'📦':'⚡'}
      </div>
      <div class="robot-name">${r.name}</div>
      <div class="robot-type">${r.id} · ${r.type}</div>
      <div style="text-align:center;margin-bottom:10px">
        <span class="tag ${r.status==='online'?'tag-online':r.status==='warning'?'tag-warning':r.status==='error'?'tag-error':'tag-idle'}">
          <span class="tag-dot"></span>
          ${r.status==='online'?'在线':r.status==='warning'?'告警':r.status==='error'?'异常':'空闲'}
        </span>
      </div>
      <div class="robot-stats">
        <div class="robot-stat">
          <div class="robot-stat-label">电量</div>
          <div class="robot-stat-value" style="color:${r.battery<20?'var(--danger)':r.battery<50?'var(--warning)':'var(--success)'}">${r.battery}%</div>
        </div>
        <div class="robot-stat">
          <div class="robot-stat-label">协议</div>
          <div class="robot-stat-value" style="font-size:11px">${r.protocol}</div>
        </div>
        <div class="robot-stat">
          <div class="robot-stat-label">速度</div>
          <div class="robot-stat-value">${r.speed}m/s</div>
        </div>
        <div class="robot-stat">
          <div class="robot-stat-label">场景</div>
          <div class="robot-stat-value" style="font-size:11px">${r.scene}</div>
        </div>
      </div>
      <div style="margin-top:10px">
        <div style="font-size:10px;color:var(--text-muted);margin-bottom:4px">电量状态</div>
        <div class="progress-bar">
          <div class="progress-fill ${r.battery<20?'danger':r.battery<50?'warning':'success'}" style="width:${r.battery}%"></div>
        </div>
      </div>
      <div style="margin-top:10px;display:flex;gap:6px">
        <button class="btn btn-outline btn-xs" style="flex:1">详情</button>
        <button class="btn btn-outline btn-xs" style="flex:1" onclick="sendCommand('${r.id}')">指令</button>
      </div>
    </div>`).join('')}
  </div>
  `;
}

function sendCommand(id) {
  alert(`向 ${id} 发送远程指令（回充/急停/重启...）`);
}

// ============================================================
//  PAGE: 多机协同调度
// ============================================================
function renderDispatch(el) {
  el.innerHTML = `
  <div class="page-header">
    <div>
      <div class="page-title"><span class="page-icon">🗺</span> 多机协同调度</div>
      <div class="page-subtitle">任务分配优化 · 路径冲突检测 · 实时调度决策</div>
    </div>
    <div class="header-actions">
      <button class="btn btn-outline btn-sm">🔄 重新规划</button>
      <button class="btn btn-primary btn-sm">⚡ 智能调度</button>
    </div>
  </div>

  <div class="grid-2" style="margin-bottom:16px">
    <div class="card">
      <div class="card-header">
        <span class="card-title">📋 调度队列</span>
        <span class="badge-count">${TASKS.filter(t=>t.status!=='done').length}</span>
      </div>
      ${TASKS.filter(t=>t.status!=='done').map(t => `
      <div style="display:flex;align-items:center;gap:12px;padding:10px;border-radius:8px;margin-bottom:6px;background:rgba(0,0,0,0.15);border:1px solid var(--border)">
        <div style="width:36px;height:36px;border-radius:8px;background:rgba(0,180,255,0.1);border:1px solid var(--border-bright);display:flex;align-items:center;justify-content:center;font-size:16px">
          ${t.status==='running'?'⚡':'⏳'}
        </div>
        <div style="flex:1">
          <div style="font-size:13px;font-weight:500;margin-bottom:2px">${t.name}</div>
          <div style="font-size:11px;color:var(--text-muted)">${t.robots.length}台机器人 · ${t.scene} · ${t.createTime}</div>
          <div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:4px">
            ${t.robots.map(r=>`<span class="tag tag-info" style="font-size:10px">${r}</span>`).join('')}
          </div>
        </div>
        <div style="text-align:right">
          <span class="tag ${t.status==='running'?'tag-running':'tag-pending'}">${t.status==='running'?'调度中':'排队中'}</span>
          <div style="font-size:11px;color:var(--text-muted);margin-top:4px">${t.progress}%</div>
        </div>
      </div>`).join('')}
    </div>

    <div class="card">
      <div class="card-header">
        <span class="card-title">🤖 机器人负载均衡</span>
      </div>
      <div id="chart-load-balance" style="height:280px"></div>
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <span class="card-title">📊 调度甘特图</span>
      <div style="font-size:11px;color:var(--text-muted)">今日任务时间线</div>
    </div>
    <div id="chart-gantt" style="height:220px"></div>
  </div>
  `;

  // 负载均衡雷达图
  initChart('chart-load-balance', {
    backgroundColor:'transparent',
    tooltip:{ trigger:'item', backgroundColor:'rgba(13,31,53,0.9)', borderColor:'rgba(0,180,255,0.3)', textStyle:{color:'#e2f0ff'} },
    legend:{ bottom:0, textStyle:{color:'#7aa0c4',fontSize:10} },
    radar:{
      radius:'60%', center:['50%','46%'],
      indicator:ROBOTS.filter(r=>r.status==='online').slice(0,6).map(r=>({name:r.id, max:100})),
      axisLine:{lineStyle:{color:'rgba(0,180,255,0.15)'}},
      splitLine:{lineStyle:{color:'rgba(0,180,255,0.08)'}},
      axisLabel:{color:'#4a6580',fontSize:9},
    },
    series:[{
      type:'radar',
      data:[{
        value: ROBOTS.filter(r=>r.status==='online').slice(0,6).map(r=>Math.round(r.battery*0.8+Math.random()*20)),
        name:'当前负载',
        itemStyle:{color:'#00b4ff'},
        areaStyle:{color:'rgba(0,180,255,0.15)'},
        lineStyle:{color:'#00b4ff',width:1.5}
      },{
        value: ROBOTS.filter(r=>r.status==='online').slice(0,6).map(()=>Math.round(60+Math.random()*20)),
        name:'额定上限',
        itemStyle:{color:'rgba(16,185,129,0.5)'},
        areaStyle:{color:'rgba(16,185,129,0.05)'},
        lineStyle:{color:'rgba(16,185,129,0.5)',width:1,type:'dashed'}
      }]
    }]
  });

  // 甘特图
  const robotNames = ROBOTS.slice(0,8).map(r=>r.id);
  const ganttData = robotNames.map((r,i) => {
    const start = 8 + Math.random()*2;
    const end = start + 1 + Math.random()*3;
    return [i, start, Math.min(end,12)];
  });

  initChart('chart-gantt', {
    backgroundColor:'transparent',
    tooltip:{ trigger:'item', backgroundColor:'rgba(13,31,53,0.9)', borderColor:'rgba(0,180,255,0.3)', textStyle:{color:'#e2f0ff'} },
    grid:{ top:10, bottom:30, left:60, right:20 },
    xAxis:{ type:'value', min:7, max:18, axisLabel:{color:'#4a6580',fontSize:10,formatter:v=>`${v}:00`}, splitLine:{lineStyle:{color:'rgba(0,180,255,0.06)'}} },
    yAxis:{ type:'category', data:robotNames, axisLabel:{color:'#7aa0c4',fontSize:10}, axisLine:{lineStyle:{color:'rgba(0,180,255,0.15)'}} },
    series:[{
      type:'custom',
      renderItem: (params, api) => {
        const categoryIndex = api.value(0);
        const start = api.coord([api.value(1), categoryIndex]);
        const end = api.coord([api.value(2), categoryIndex]);
        const height = api.size([0,1])[1] * 0.6;
        return {
          type:'rect',
          shape:{ x:start[0], y:start[1]-height/2, width:end[0]-start[0], height },
          style:{ fill:'rgba(0,180,255,0.6)', stroke:'rgba(0,180,255,0.9)', lineWidth:1 },
        };
      },
      data: ganttData,
      encode:{ x:[1,2], y:0 }
    }]
  });
}

// ============================================================
//  PAGE: 数据采集分析
// ============================================================
function renderAnalytics(el) {
  el.innerHTML = `
  <div class="page-header">
    <div>
      <div class="page-title"><span class="page-icon">📈</span> 数据采集分析</div>
      <div class="page-subtitle">传感器数据 · 性能趋势 · 多维度统计分析</div>
    </div>
    <div class="header-actions">
      <select class="btn btn-outline btn-sm" style="color:var(--accent);cursor:pointer">
        <option>今日</option><option>近7天</option><option>近30天</option><option>自定义</option>
      </select>
      <button class="btn btn-primary btn-sm">⬇ 导出数据</button>
    </div>
  </div>

  <div class="metric-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:16px">
    ${[
      ['blue','总采集数据量','2.4 GB','↑ 实时写入'],
      ['green','传感器节点',ROBOTS.length * 6,'↑ 全部在线'],
      ['yellow','数据帧率','1,248 fps','↑ 实时流式'],
      ['cyan','分析报告', REPORTS.length + ' 份','↑ 本月生成'],
    ].map(([c,l,v,ch]) => `
    <div class="metric-card ${c}">
      <div class="metric-label">${l}</div>
      <div class="metric-value" style="font-size:22px">${v}</div>
      <div class="metric-change up">${ch}</div>
    </div>`).join('')}
  </div>

  <div class="grid-2" style="margin-bottom:16px">
    <div class="card">
      <div class="card-header"><span class="card-title">📡 传感器数据实时流</span></div>
      <div id="chart-sensor-realtime" style="height:220px"></div>
    </div>
    <div class="card">
      <div class="card-header"><span class="card-title">🎯 导航精度分布</span></div>
      <div id="chart-nav-accuracy" style="height:220px"></div>
    </div>
  </div>

  <div class="grid-3">
    <div class="card">
      <div class="card-header"><span class="card-title">⚡ 电量消耗趋势</span></div>
      <div id="chart-battery-trend" style="height:180px"></div>
    </div>
    <div class="card">
      <div class="card-header"><span class="card-title">🌡 环境温度监测</span></div>
      <div id="chart-temp" style="height:180px"></div>
    </div>
    <div class="card">
      <div class="card-header"><span class="card-title">🔗 通信质量统计</span></div>
      <div id="chart-comm-quality" style="height:180px"></div>
    </div>
  </div>
  `;

  // 传感器实时流
  const timeLabels = Array.from({length:20},(_,i)=>i+'s');
  const genData = () => Array.from({length:20},()=>+(Math.random()*4+1).toFixed(2));
  initChart('chart-sensor-realtime', {
    backgroundColor:'transparent',
    tooltip:{ trigger:'axis', backgroundColor:'rgba(13,31,53,0.9)', borderColor:'rgba(0,180,255,0.3)', textStyle:{color:'#e2f0ff',fontSize:11} },
    legend:{ top:0, right:0, textStyle:{color:'#7aa0c4',fontSize:10} },
    grid:{ top:28, bottom:22, left:40, right:10 },
    xAxis:{ type:'category', data:timeLabels, axisLabel:{color:'#4a6580',fontSize:10}, axisLine:{lineStyle:{color:'rgba(0,180,255,0.15)'}} },
    yAxis:{ type:'value', axisLabel:{color:'#4a6580',fontSize:10,formatter:'{value}m'}, splitLine:{lineStyle:{color:'rgba(0,180,255,0.06)'}} },
    series:[
      { name:'激光雷达', type:'line', smooth:true, data:genData(), lineStyle:{color:'#00b4ff',width:1.5}, areaStyle:{color:'rgba(0,180,255,0.06)'}, symbol:'none' },
      { name:'超声波', type:'line', smooth:true, data:genData(), lineStyle:{color:'#00ffc8',width:1.5}, symbol:'none' },
      { name:'毫米波', type:'line', smooth:true, data:genData(), lineStyle:{color:'#7c3aed',width:1.5}, symbol:'none' },
    ]
  });

  // 导航精度散点图
  const scatterData = Array.from({length:60},()=>[+(Math.random()*2-1).toFixed(3), +(Math.random()*2-1).toFixed(3)]);
  initChart('chart-nav-accuracy', {
    backgroundColor:'transparent',
    tooltip:{ trigger:'item', formatter: p=>`X: ${p.data[0]}m<br>Y: ${p.data[1]}m`, backgroundColor:'rgba(13,31,53,0.9)', borderColor:'rgba(0,180,255,0.3)', textStyle:{color:'#e2f0ff',fontSize:11} },
    grid:{ top:10, bottom:30, left:40, right:20 },
    xAxis:{ type:'value', min:-2, max:2, axisLabel:{color:'#4a6580',fontSize:10,formatter:'{value}m'}, splitLine:{lineStyle:{color:'rgba(0,180,255,0.06)'}}, axisLine:{lineStyle:{color:'rgba(0,180,255,0.15)'}} },
    yAxis:{ type:'value', min:-2, max:2, axisLabel:{color:'#4a6580',fontSize:10,formatter:'{value}m'}, splitLine:{lineStyle:{color:'rgba(0,180,255,0.06)'}} },
    series:[
      { type:'scatter', data:scatterData, symbolSize:4, itemStyle:{color:'rgba(0,180,255,0.6)'} },
      { type:'scatter', data:[[0,0]], symbolSize:10, itemStyle:{color:'#ef4444'}, name:'目标点' },
    ]
  });

  // 电量消耗
  initChart('chart-battery-trend', {
    backgroundColor:'transparent',
    tooltip:{ trigger:'axis', backgroundColor:'rgba(13,31,53,0.9)', borderColor:'rgba(0,180,255,0.3)', textStyle:{color:'#e2f0ff',fontSize:11} },
    grid:{ top:10, bottom:22, left:35, right:10 },
    xAxis:{ type:'category', data:['07:00','08:00','09:00','10:00','11:00','12:00'], axisLabel:{color:'#4a6580',fontSize:10}, axisLine:{lineStyle:{color:'rgba(0,180,255,0.15)'}} },
    yAxis:{ type:'value', max:100, axisLabel:{color:'#4a6580',fontSize:10,formatter:'{value}%'}, splitLine:{lineStyle:{color:'rgba(0,180,255,0.06)'}} },
    series:[{
      type:'bar', data:[95,88,82,74,68,62],
      barWidth:'60%',
      itemStyle:{borderRadius:[3,3,0,0], color:{type:'linear',x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:'#f59e0b'},{offset:1,color:'rgba(245,158,11,0.2)'}]}}
    }]
  });

  // 温度监测
  initChart('chart-temp', {
    backgroundColor:'transparent',
    tooltip:{ trigger:'axis', backgroundColor:'rgba(13,31,53,0.9)', borderColor:'rgba(0,180,255,0.3)', textStyle:{color:'#e2f0ff',fontSize:11} },
    grid:{ top:10, bottom:22, left:35, right:10 },
    xAxis:{ type:'category', data:timeLabels.slice(0,10), axisLabel:{color:'#4a6580',fontSize:10}, axisLine:{lineStyle:{color:'rgba(0,180,255,0.15)'}} },
    yAxis:{ type:'value', axisLabel:{color:'#4a6580',fontSize:10,formatter:'{value}°C'}, splitLine:{lineStyle:{color:'rgba(0,180,255,0.06)'}} },
    series:[{
      type:'line', smooth:true,
      data:[25.2,25.5,25.8,26.1,26.3,26.0,26.5,26.8,27.1,26.9],
      lineStyle:{color:'#ef4444',width:2},
      areaStyle:{color:'rgba(239,68,68,0.08)'},
      itemStyle:{color:'#ef4444'}, symbol:'none'
    }]
  });

  // 通信质量
  initChart('chart-comm-quality', {
    backgroundColor:'transparent',
    tooltip:{ trigger:'item', backgroundColor:'rgba(13,31,53,0.9)', borderColor:'rgba(0,180,255,0.3)', textStyle:{color:'#e2f0ff'} },
    legend:{ orient:'vertical', right:0, top:'center', textStyle:{color:'#7aa0c4',fontSize:10} },
    series:[{
      type:'pie', radius:['40%','65%'], center:['42%','50%'],
      label:{show:false},
      data:[
        {value:78, name:'优秀(≥-70dBm)', itemStyle:{color:'#10b981'}},
        {value:14, name:'良好(-70~-85)', itemStyle:{color:'#00b4ff'}},
        {value:6,  name:'一般(-85~-95)', itemStyle:{color:'#f59e0b'}},
        {value:2,  name:'差(<-95dBm)', itemStyle:{color:'#ef4444'}},
      ]
    }]
  });
}

// ============================================================
//  PAGE: 测试报告
// ============================================================
function renderReports(el) {
  el.innerHTML = `
  <div class="page-header">
    <div>
      <div class="page-title"><span class="page-icon">📋</span> 测试报告</div>
      <div class="page-subtitle">自动生成 · 多格式导出 · 历史追溯</div>
    </div>
    <div class="header-actions">
      <button class="btn btn-outline btn-sm">🔍 筛选</button>
      <button class="btn btn-primary btn-sm" onclick="generateReport()">＋ 生成报告</button>
    </div>
  </div>

  <div class="grid-auto" style="margin-bottom:20px">
    ${REPORTS.map(r => `
    <div class="report-card" onclick="viewReport('${r.id}')">
      <div class="report-header">
        <div>
          <div class="report-title">${r.name}</div>
          <div class="report-meta">📅 ${r.date} · 👤 ${r.author}</div>
        </div>
        <span class="tag ${r.rate>=90?'tag-pass':r.rate>=80?'tag-warning':'tag-failed'}">${r.rate}%</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill ${r.rate>=90?'success':r.rate>=80?'warning':'danger'}" style="width:${r.rate}%"></div>
      </div>
      <div class="report-stats">
        <div class="report-stat">
          <div class="report-stat-val">${r.total}</div>
          <div class="report-stat-label">总用例</div>
        </div>
        <div class="report-stat">
          <div class="report-stat-val" style="color:var(--success)">${r.pass}</div>
          <div class="report-stat-label">通过</div>
        </div>
        <div class="report-stat">
          <div class="report-stat-val" style="color:var(--danger)">${r.fail}</div>
          <div class="report-stat-label">失败</div>
        </div>
      </div>
      <div style="display:flex;gap:8px;margin-top:12px">
        <button class="btn btn-outline btn-xs" style="flex:1" onclick="event.stopPropagation();downloadReport('${r.id}','pdf')">📄 PDF</button>
        <button class="btn btn-outline btn-xs" style="flex:1" onclick="event.stopPropagation();downloadReport('${r.id}','excel')">📊 Excel</button>
        <button class="btn btn-outline btn-xs" style="flex:1" onclick="event.stopPropagation();shareReport('${r.id}')">🔗 分享</button>
      </div>
    </div>`).join('')}
  </div>

  <div class="card">
    <div class="card-header">
      <span class="card-title">📈 历史通过率趋势</span>
    </div>
    <div id="chart-report-trend" style="height:200px"></div>
  </div>
  `;

  initChart('chart-report-trend', {
    backgroundColor:'transparent',
    tooltip:{ trigger:'axis', backgroundColor:'rgba(13,31,53,0.9)', borderColor:'rgba(0,180,255,0.3)', textStyle:{color:'#e2f0ff',fontSize:11} },
    legend:{ top:0, right:0, textStyle:{color:'#7aa0c4',fontSize:10} },
    grid:{ top:28, bottom:25, left:40, right:10 },
    xAxis:{ type:'category', data:['2月1日','2月15日','3月1日','3月10日','3月20日','3月30日'], axisLabel:{color:'#4a6580',fontSize:10}, axisLine:{lineStyle:{color:'rgba(0,180,255,0.15)'}} },
    yAxis:{ type:'value', min:75, max:100, axisLabel:{color:'#4a6580',fontSize:10,formatter:'{value}%'}, splitLine:{lineStyle:{color:'rgba(0,180,255,0.06)'}} },
    series:[
      { name:'整体通过率', type:'line', smooth:true, data:[82,85,87,89,92,94], lineStyle:{color:'#00b4ff',width:2}, areaStyle:{color:'rgba(0,180,255,0.1)'}, itemStyle:{color:'#00b4ff'} },
      { name:'巡检类', type:'line', smooth:true, data:[84,87,88,91,93,95], lineStyle:{color:'#10b981',width:2}, itemStyle:{color:'#10b981'} },
      { name:'特种类', type:'line', smooth:true, data:[78,80,82,84,86,88], lineStyle:{color:'#f59e0b',width:2}, itemStyle:{color:'#f59e0b'} },
    ]
  });
}

function viewReport(id) { alert(`查看报告: ${id}`); }
function downloadReport(id, fmt) { alert(`下载 ${id} 为 ${fmt.toUpperCase()} 格式`); }
function shareReport(id) { alert(`生成报告分享链接: ${id}`); }
function generateReport() { alert('正在自动生成最新测试报告...'); }

// ============================================================
//  PAGE: 仿真虚实联动
// ============================================================
function renderSimulation(el) {
  el.innerHTML = `
  <div class="page-header">
    <div>
      <div class="page-title"><span class="page-icon">🌐</span> 仿真虚实联动</div>
      <div class="page-subtitle">数字孪生 · 虚拟测试 · 虚实数据对比验证</div>
    </div>
    <div class="header-actions">
      <button class="btn btn-outline btn-sm">⚙ 仿真配置</button>
      <button class="btn btn-primary btn-sm" onclick="startSimulation()">▶ 启动仿真</button>
    </div>
  </div>

  <div class="metric-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:16px">
    ${[
      ['green','仿真实例','4 个','● 运行中'],
      ['blue','同步延迟','12 ms','↑ 低延迟'],
      ['yellow','模型精度','97.3%','↑ 高保真'],
      ['purple','仿真加速比','8x','↑ 快速验证'],
    ].map(([c,l,v,ch])=>`
    <div class="metric-card ${c}">
      <div class="metric-label">${l}</div>
      <div class="metric-value" style="font-size:22px">${v}</div>
      <div class="metric-change up" style="color:var(--${c==='green'?'success':c==='blue'?'accent':c==='yellow'?'warning':'accent3'})">${ch}</div>
    </div>`).join('')}
  </div>

  <div class="sim-split" style="margin-bottom:16px">
    <div class="sim-pane" style="background:#030d18">
      <div class="sim-label" style="color:var(--accent)">🌐 虚拟仿真场景</div>
      <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:16px">
        <div style="position:relative;width:320px;height:240px">
          <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(0,180,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,180,255,0.05) 1px,transparent 1px);background-size:20px 20px"></div>
          <!-- 仿真机器人 -->
          ${[
            [40,45,'🔍','#00b4ff'],
            [60,35,'📦','#00ffc8'],
            [55,65,'⚡','#7c3aed'],
          ].map(([x,y,icon,color])=>`
          <div style="position:absolute;left:${x}%;top:${y}%;transform:translate(-50%,-50%);text-align:center">
            <div style="width:28px;height:28px;border-radius:50%;border:2px solid ${color};background:${color}22;display:flex;align-items:center;justify-content:center;font-size:13px;animation:pulse-glow 2s infinite">${icon}</div>
            <div style="width:40px;height:1px;background:${color};margin-top:-1px;opacity:0.5"></div>
          </div>`).join('')}
          <!-- 路径 -->
          <svg style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none">
            <path d="M 128 108 L 192 84 L 176 156" stroke="#00b4ff" stroke-width="1" stroke-dasharray="4,4" fill="none" opacity="0.5"/>
          </svg>
        </div>
        <div style="font-size:11px;color:var(--text-muted)">数字孪生环境 · 实时同步</div>
      </div>
    </div>
    <div class="sim-pane" style="background:#040810">
      <div class="sim-label" style="color:var(--success)">📷 真实现场采集</div>
      <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:12px">
        <div style="width:280px;height:200px;background:rgba(0,0,0,0.5);border:1px solid rgba(16,185,129,0.3);border-radius:8px;overflow:hidden;position:relative">
          <div style="position:absolute;inset:0;background:linear-gradient(rgba(16,185,129,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(16,185,129,0.03) 1px,transparent 1px);background-size:15px 15px"></div>
          <div style="position:absolute;left:0;right:0;height:1px;background:rgba(16,185,129,0.4);top:50%;animation:scan-line 3s linear infinite"></div>
          <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:8px">
            <div style="font-size:28px">📡</div>
            <div style="font-size:11px;color:var(--success)">LIDAR 点云流 · 实时采集</div>
            <div style="font-size:10px;color:var(--text-muted)">帧率: 20fps · 点密度: 128线</div>
          </div>
        </div>
        <div style="font-size:11px;color:var(--text-muted)">真实硬件 · 传感器数据流</div>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <span class="card-title">📊 虚实数据对比分析</span>
    </div>
    <div id="chart-sim-compare" style="height:200px"></div>
  </div>
  `;

  initChart('chart-sim-compare', {
    backgroundColor:'transparent',
    tooltip:{ trigger:'axis', backgroundColor:'rgba(13,31,53,0.9)', borderColor:'rgba(0,180,255,0.3)', textStyle:{color:'#e2f0ff',fontSize:11} },
    legend:{ top:0, right:0, textStyle:{color:'#7aa0c4',fontSize:10} },
    grid:{ top:28, bottom:25, left:45, right:10 },
    xAxis:{ type:'category', data:Array.from({length:12},(_,i)=>`T${i+1}`), axisLabel:{color:'#4a6580',fontSize:10}, axisLine:{lineStyle:{color:'rgba(0,180,255,0.15)'}} },
    yAxis:{ type:'value', axisLabel:{color:'#4a6580',fontSize:10,formatter:'{value}mm'}, splitLine:{lineStyle:{color:'rgba(0,180,255,0.06)'}} },
    series:[
      { name:'仿真轨迹', type:'line', smooth:true, data:[10,15,12,18,14,20,16,22,18,24,20,19], lineStyle:{color:'#00b4ff',width:2}, itemStyle:{color:'#00b4ff'} },
      { name:'真实轨迹', type:'line', smooth:true, data:[11,14,13,17,15,19,17,21,19,23,21,20], lineStyle:{color:'#10b981',width:2}, itemStyle:{color:'#10b981'} },
      { name:'误差', type:'bar', data:[1,1,1,1,1,1,1,1,1,1,1,1], barWidth:'30%', itemStyle:{color:'rgba(245,158,11,0.4)'} },
    ]
  });
}

function startSimulation() { alert('启动仿真实例...数字孪生同步中'); }

// ============================================================
//  PAGE: 仿真测试管理
// ============================================================
const SIM_TASKS = [
  {
    id: 'ST-001',
    name: '坡道最大速度测试',
    robot: 'RB-04',
    robotName: '特战鹰眼',
    scene: '斜坡地形环境',
    slopeAngle: 15,
    status: 'done',
    result: 'pass',
    maxSpeed: 1.84,
    limitSpeed: 2.0,
    duration: '4分27秒',
    startTime: '2026-04-07 09:12:03',
    endTime: '2026-04-07 09:16:30',
    executor: '张天',
    simEngine: 'Gazebo 11 + ROS2',
    passRate: 96.8,
    tags: ['坡道', '速度', '安全边界'],
  },
];

function renderSimTest(el) {
  const task = SIM_TASKS[0];
  const statusMap = { done:'已完成', running:'执行中', pending:'待执行', failed:'失败' };
  const resultMap  = { pass:'通过', fail:'未通过', running:'进行中', '-':'-' };
  const resultCls  = { pass:'pass', fail:'failed', running:'running', '-':'' };

  el.innerHTML = `
  <div class="page-header">
    <div>
      <div class="page-title"><span class="page-icon">🧬</span> 仿真测试管理</div>
      <div class="page-subtitle">仿真场景测试 · 自动执行 · 数据分析 · 报告归档</div>
    </div>
    <div class="header-actions">
      <button class="btn btn-outline btn-sm" onclick="alert('功能开发中')">⬇ 导出报告</button>
      <button class="btn btn-primary btn-sm" onclick="openSimTaskModal('ST-001')">＋ 新建测试任务</button>
    </div>
  </div>

  <!-- 统计卡片 -->
  <div class="metric-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:16px">
    <div class="metric-card blue">
      <div class="metric-label">测试任务总数</div>
      <div class="metric-value" style="font-size:22px">1<span class="metric-unit"> 条</span></div>
      <div class="metric-change up">今日新增 1</div>
      <div class="metric-bg-icon">🧬</div>
    </div>
    <div class="metric-card green">
      <div class="metric-label">已通过</div>
      <div class="metric-value" style="font-size:22px">1<span class="metric-unit"> 条</span></div>
      <div class="metric-change up">↑ 通过率 100%</div>
      <div class="metric-bg-icon">✅</div>
    </div>
    <div class="metric-card yellow">
      <div class="metric-label">仿真引擎</div>
      <div class="metric-value" style="font-size:16px;margin-top:4px">Gazebo 11</div>
      <div class="metric-change up">ROS2 接入</div>
      <div class="metric-bg-icon">⚙️</div>
    </div>
    <div class="metric-card purple">
      <div class="metric-label">平均测试时长</div>
      <div class="metric-value" style="font-size:22px">4.5<span class="metric-unit"> 分</span></div>
      <div class="metric-change up">↑ 效率提升 23%</div>
      <div class="metric-bg-icon">⏱</div>
    </div>
  </div>

  <!-- 任务列表 -->
  <div class="card" style="margin-bottom:16px">
    <div class="card-header">
      <span class="card-title">📋 测试任务列表</span>
      <div style="display:flex;gap:8px;align-items:center">
        <input type="text" placeholder="搜索任务..." style="background:rgba(0,180,255,0.06);border:1px solid rgba(0,180,255,0.18);border-radius:6px;padding:4px 10px;color:var(--text-primary);font-size:12px;width:140px;outline:none">
        <select style="background:rgba(0,180,255,0.06);border:1px solid rgba(0,180,255,0.18);border-radius:6px;padding:4px 8px;color:var(--text-secondary);font-size:12px;outline:none">
          <option>全部状态</option><option>已完成</option><option>执行中</option><option>待执行</option>
        </select>
      </div>
    </div>
    <table class="data-table">
      <thead>
        <tr>
          <th>任务ID</th>
          <th>任务名称</th>
          <th>测试机器人</th>
          <th>测试场景</th>
          <th>最大速度</th>
          <th>状态</th>
          <th>结果</th>
          <th>执行时长</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        ${SIM_TASKS.map(t => `
        <tr class="sim-task-row" style="cursor:pointer" onclick="openSimTaskDetail('${t.id}')">
          <td><span style="color:var(--accent);font-family:monospace">${t.id}</span></td>
          <td>
            <div style="font-weight:500;color:var(--text-primary)">${t.name}</div>
            <div style="font-size:11px;color:var(--text-muted)">${t.tags.map(g=>`<span style="background:rgba(0,180,255,0.1);color:var(--accent);border-radius:3px;padding:1px 5px;margin-right:3px">${g}</span>`).join('')}</div>
          </td>
          <td>
            <div style="font-size:12px">${t.robot}</div>
            <div style="font-size:11px;color:var(--text-muted)">${t.robotName}</div>
          </td>
          <td>${t.scene}</td>
          <td>
            <span style="color:var(--accent);font-weight:600;font-size:14px">${t.maxSpeed} m/s</span>
            <span style="font-size:10px;color:var(--text-muted);margin-left:4px">/ ${t.limitSpeed} m/s</span>
          </td>
          <td><span class="status-badge ${t.status==='done'?'pass':t.status}">${statusMap[t.status]||t.status}</span></td>
          <td><span class="status-badge ${resultCls[t.result]||''}">${resultMap[t.result]||t.result}</span></td>
          <td style="color:var(--text-secondary)">${t.duration}</td>
          <td>
            <button class="btn btn-outline btn-sm" onclick="event.stopPropagation();openSimTaskDetail('${t.id}')">📊 查看详情</button>
          </td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>

  <!-- 底部说明 -->
  <div style="font-size:11px;color:var(--text-muted);text-align:center;padding:8px 0">
    点击任意任务行可查看速度曲线及详细分析报告
  </div>

  <!-- 详情弹窗 -->
  <div id="simtest-modal" style="display:none;position:fixed;inset:0;z-index:999;background:rgba(0,8,20,0.85);backdrop-filter:blur(6px)">
    <div id="simtest-modal-box" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:min(960px,96vw);max-height:90vh;overflow-y:auto;background:var(--card-bg);border:1px solid rgba(0,180,255,0.22);border-radius:16px;box-shadow:0 0 60px rgba(0,180,255,0.12)">
      <div id="simtest-modal-content"></div>
    </div>
  </div>
  `;
}

function openSimTaskDetail(id) {
  const task = SIM_TASKS.find(t => t.id === id);
  if (!task) return;

  // 销毁旧图表
  ['chart-slope-speed','chart-slope-accel','chart-slope-load'].forEach(cid => {
    const inst = chartInstances[cid];
    if (inst) { try { inst.dispose(); } catch(e){} delete chartInstances[cid]; }
  });

  const modal = document.getElementById('simtest-modal');
  const content = document.getElementById('simtest-modal-content');

  // 生成速度曲线数据（模拟坡道加速→平稳→减速过程）
  const timePoints = Array.from({length:60}, (_,i) => (i*0.1).toFixed(1)+'s');
  function simSpeed(i) {
    if (i < 10) return +(0.2 + i*0.18 + (Math.random()-0.5)*0.04).toFixed(3);
    if (i < 30) return +(1.84 + (Math.random()-0.5)*0.06).toFixed(3);
    if (i < 40) return +(1.84 - (i-30)*0.12 + (Math.random()-0.5)*0.04).toFixed(3);
    return +(0.64 + (Math.random()-0.5)*0.03).toFixed(3);
  }
  const speedData = Array.from({length:60}, (_,i) => simSpeed(i));
  // 加速度
  const accelData = speedData.map((v,i) => i===0 ? 0 : +((v-speedData[i-1])/0.1).toFixed(3));
  // 电机负载
  const loadData = speedData.map(v => +(v/2.0*100 + 5 + (Math.random()-0.5)*4).toFixed(1));

  const passColor = '#10b981';
  const warnColor = '#f59e0b';

  content.innerHTML = `
  <div style="padding:28px 32px">
    <!-- 弹窗标题 -->
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px">
      <div>
        <div style="font-size:18px;font-weight:700;color:var(--text-primary);display:flex;align-items:center;gap:10px">
          <span style="font-size:22px">🧬</span>
          ${task.name}
          <span style="font-size:11px;padding:3px 10px;background:rgba(16,185,129,0.12);color:${passColor};border:1px solid rgba(16,185,129,0.3);border-radius:20px;font-weight:500">✓ 通过</span>
        </div>
        <div style="font-size:12px;color:var(--text-muted);margin-top:4px">任务ID：${task.id} · 执行时间：${task.startTime} — ${task.endTime}</div>
      </div>
      <button onclick="closeSimTaskDetail()" style="background:rgba(0,180,255,0.08);border:1px solid rgba(0,180,255,0.2);color:var(--text-secondary);border-radius:8px;padding:6px 14px;cursor:pointer;font-size:13px">✕ 关闭</button>
    </div>

    <!-- 参数概要 -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:24px">
      ${[
        ['测试机器人', task.robot + ' · ' + task.robotName, '#00b4ff'],
        ['测试场景', task.scene, '#7c3aed'],
        ['坡道角度', task.slopeAngle + '°', '#f59e0b'],
        ['仿真引擎', task.simEngine, '#10b981'],
        ['实测最大速度', task.maxSpeed + ' m/s', '#00b4ff'],
        ['安全限速', task.limitSpeed + ' m/s', '#f59e0b'],
        ['通过率', task.passRate + '%', '#10b981'],
        ['执行时长', task.duration, '#a78bfa'],
      ].map(([l,v,c]) => `
      <div style="background:rgba(0,180,255,0.04);border:1px solid rgba(0,180,255,0.1);border-radius:10px;padding:12px 14px">
        <div style="font-size:10px;color:var(--text-muted);margin-bottom:4px">${l}</div>
        <div style="font-size:13px;font-weight:600;color:${c}">${v}</div>
      </div>`).join('')}
    </div>

    <!-- 速度曲线 -->
    <div style="background:rgba(0,180,255,0.03);border:1px solid rgba(0,180,255,0.1);border-radius:12px;padding:16px 20px;margin-bottom:16px">
      <div style="font-size:13px;font-weight:600;color:var(--text-primary);margin-bottom:12px;display:flex;align-items:center;gap:8px">
        <span>📈</span> 速度时序曲线
        <span style="font-size:10px;color:var(--text-muted);font-weight:400;margin-left:8px">采样频率 10Hz · 共 ${timePoints.length} 个数据点</span>
        <span style="margin-left:auto;font-size:11px;padding:2px 8px;background:rgba(245,158,11,0.1);color:${warnColor};border-radius:4px">峰值 ${task.maxSpeed} m/s @ T=1.8s~3.0s</span>
      </div>
      <div id="chart-slope-speed" style="height:220px"></div>
    </div>

    <!-- 加速度 + 电机负载 -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:20px">
      <div style="background:rgba(0,180,255,0.03);border:1px solid rgba(0,180,255,0.1);border-radius:12px;padding:14px 18px">
        <div style="font-size:12px;font-weight:600;color:var(--text-primary);margin-bottom:10px">⚡ 加速度曲线 (m/s²)</div>
        <div id="chart-slope-accel" style="height:150px"></div>
      </div>
      <div style="background:rgba(0,180,255,0.03);border:1px solid rgba(0,180,255,0.1);border-radius:12px;padding:14px 18px">
        <div style="font-size:12px;font-weight:600;color:var(--text-primary);margin-bottom:10px">🔋 电机负载率 (%)</div>
        <div id="chart-slope-load" style="height:150px"></div>
      </div>
    </div>

    <!-- 测试结论 -->
    <div style="background:rgba(16,185,129,0.05);border:1px solid rgba(16,185,129,0.2);border-radius:12px;padding:16px 20px">
      <div style="font-size:13px;font-weight:600;color:${passColor};margin-bottom:10px">📝 测试结论与建议</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;font-size:12px;color:var(--text-secondary);line-height:1.8">
        <div>
          <div style="color:var(--text-primary);font-weight:500;margin-bottom:4px">✅ 达标项</div>
          <div>· 坡道最大速度 <b style="color:${passColor}">${task.maxSpeed} m/s</b>，低于安全限速 ${task.limitSpeed} m/s</div>
          <div>· 加速阶段平稳，无突变抖动，峰值加速度 ≤ 1.8 m/s²</div>
          <div>· 电机负载率峰值 92.4%，在额定范围内</div>
          <div>· 坡道制动响应正常，制动距离 ≤ 0.35m</div>
        </div>
        <div>
          <div style="color:${warnColor};font-weight:500;margin-bottom:4px">⚠️ 关注项</div>
          <div>· 下坡阶段速度波动略偏高 (±0.08 m/s)，建议调整 PID 参数</div>
          <div>· 高速段 (>1.6 m/s) 电机温度上升约 4.2°C，需长时测试验证</div>
          <div>· 建议在 20° 坡道补充一轮极限测试以扩展数据覆盖</div>
        </div>
      </div>
    </div>

  </div>
  `;

  modal.style.display = 'block';

  // 初始化图表（DOM 已挂载，稍微延迟确保渲染）
  setTimeout(() => {
    // 速度曲线
    chartInstances['chart-slope-speed'] = echarts.init(document.getElementById('chart-slope-speed'));
    chartInstances['chart-slope-speed'].setOption({
      backgroundColor: 'transparent',
      tooltip: { trigger:'axis', backgroundColor:'rgba(13,31,53,0.95)', borderColor:'rgba(0,180,255,0.3)', textStyle:{color:'#e2f0ff',fontSize:11},
        formatter: params => {
          const p = params[0];
          return `<b>${p.name}</b><br>速度：${p.value} m/s`;
        }
      },
      grid: { top:28, bottom:28, left:48, right:20 },
      xAxis: { type:'category', data:timePoints, axisLabel:{color:'#4a6580',fontSize:10,interval:9}, axisLine:{lineStyle:{color:'rgba(0,180,255,0.15)'}} },
      yAxis: { type:'value', min:0, max:2.2, axisLabel:{color:'#4a6580',fontSize:10,formatter:v=>v+'m/s'}, splitLine:{lineStyle:{color:'rgba(0,180,255,0.06)'}} },
      visualMap: { show:false, type:'piecewise', dimension:1,
        pieces:[
          {min:0,   max:task.limitSpeed, color:'#00b4ff'},
          {min:task.limitSpeed, max:2.5,  color:'#ef4444'},
        ]
      },
      series:[
        {
          name:'速度',
          type:'line',
          smooth:true,
          data: speedData,
          lineStyle:{width:2.5},
          areaStyle:{color:{type:'linear',x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:'rgba(0,180,255,0.3)'},{offset:1,color:'rgba(0,180,255,0.01)'}]}},
          markLine:{
            silent:true,
            symbol:'none',
            lineStyle:{color:'#f59e0b',type:'dashed',width:1.5},
            data:[{yAxis:task.limitSpeed, name:'安全限速'}],
            label:{formatter:'安全限速 {c}m/s', color:'#f59e0b', fontSize:10}
          },
          markPoint:{
            symbol:'pin',
            symbolSize:32,
            data:[{type:'max',name:'峰值速度',itemStyle:{color:'#f59e0b'}}],
            label:{color:'#fff',fontSize:10}
          }
        }
      ]
    });

    // 加速度曲线
    chartInstances['chart-slope-accel'] = echarts.init(document.getElementById('chart-slope-accel'));
    chartInstances['chart-slope-accel'].setOption({
      backgroundColor:'transparent',
      tooltip:{trigger:'axis',backgroundColor:'rgba(13,31,53,0.9)',borderColor:'rgba(124,58,237,0.3)',textStyle:{color:'#e2f0ff',fontSize:11}},
      grid:{top:12,bottom:24,left:42,right:12},
      xAxis:{type:'category',data:timePoints,axisLabel:{color:'#4a6580',fontSize:9,interval:14},axisLine:{lineStyle:{color:'rgba(124,58,237,0.15)'}}},
      yAxis:{type:'value',axisLabel:{color:'#4a6580',fontSize:9,formatter:v=>v},splitLine:{lineStyle:{color:'rgba(124,58,237,0.06)'}}},
      series:[{
        type:'bar',
        data:accelData.map(v=>({value:v,itemStyle:{color:Math.abs(v)>1.5?'rgba(239,68,68,0.7)':'rgba(124,58,237,0.6)'}})),
        barWidth:'70%',
      }]
    });

    // 电机负载
    chartInstances['chart-slope-load'] = echarts.init(document.getElementById('chart-slope-load'));
    chartInstances['chart-slope-load'].setOption({
      backgroundColor:'transparent',
      tooltip:{trigger:'axis',backgroundColor:'rgba(13,31,53,0.9)',borderColor:'rgba(16,185,129,0.3)',textStyle:{color:'#e2f0ff',fontSize:11}},
      grid:{top:12,bottom:24,left:42,right:12},
      xAxis:{type:'category',data:timePoints,axisLabel:{color:'#4a6580',fontSize:9,interval:14},axisLine:{lineStyle:{color:'rgba(16,185,129,0.15)'}}},
      yAxis:{type:'value',min:0,max:100,axisLabel:{color:'#4a6580',fontSize:9,formatter:v=>v+'%'},splitLine:{lineStyle:{color:'rgba(16,185,129,0.06)'}}},
      series:[{
        type:'line',
        smooth:true,
        data:loadData,
        lineStyle:{color:'#10b981',width:2},
        areaStyle:{color:{type:'linear',x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:'rgba(16,185,129,0.25)'},{offset:1,color:'rgba(16,185,129,0.02)'}]}},
        itemStyle:{color:'#10b981'},
        markLine:{silent:true,symbol:'none',lineStyle:{color:'#ef4444',type:'dashed',width:1},data:[{yAxis:95,name:'额定上限'}],label:{formatter:'额定上限 {c}%',color:'#ef4444',fontSize:10}}
      }]
    });
  }, 80);
}

function closeSimTaskDetail() {
  const modal = document.getElementById('simtest-modal');
  if (modal) modal.style.display = 'none';
  ['chart-slope-speed','chart-slope-accel','chart-slope-load'].forEach(cid => {
    const inst = chartInstances[cid];
    if (inst) { try { inst.dispose(); } catch(e){} delete chartInstances[cid]; }
  });
}

function openSimTaskModal() { alert('新建测试任务功能开发中...'); }



// ============================================================
//  PAGE: 安全合规校验
// ============================================================
function renderSafety(el) {
  el.innerHTML = `
  <div class="page-header">
    <div>
      <div class="page-title"><span class="page-icon">🛡</span> 安全合规校验</div>
      <div class="page-subtitle">标准合规 · 安全边界检测 · 认证管理</div>
    </div>
    <div class="header-actions">
      <button class="btn btn-outline btn-sm">📥 导入标准</button>
      <button class="btn btn-primary btn-sm" onclick="runSafetyCheck()">🔍 执行全量校验</button>
    </div>
  </div>

  <div class="metric-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:16px">
    ${[
      ['green','合规项','42','通过标准校验'],
      ['warning','待整改','5','需关注'],
      ['red','严重违规','1','立即处理'],
      ['blue','认证到期','3 项','30天内'],
    ].map(([c,l,v,sub])=>`
    <div class="metric-card ${c}">
      <div class="metric-label">${l}</div>
      <div class="metric-value">${v}</div>
      <div class="metric-change">${sub}</div>
    </div>`).join('')}
  </div>

  <div class="grid-2" style="margin-bottom:16px">
    <div class="card">
      <div class="card-header">
        <span class="card-title">📋 合规项检测</span>
      </div>
      ${[
        { icon:'🦺', name:'急停响应时间', desc:'响应时间 ≤ 200ms (实测: 132ms)', score:100, status:'pass' },
        { icon:'⚡', name:'电气绝缘强度', desc:'绝缘电阻 ≥ 1MΩ (实测: 8.5MΩ)', score:100, status:'pass' },
        { icon:'🌡', name:'工作温度范围', desc:'GB/T 38741-2020 要求 -20°C~60°C', score:95, status:'pass' },
        { icon:'📡', name:'电磁兼容(EMC)', desc:'辐射骚扰超标 3dB，需整改', score:62, status:'warn' },
        { icon:'🔒', name:'数据安全加密', desc:'通信未使用TLS1.3，存在风险', score:48, status:'warn' },
        { icon:'⚠', name:'碰撞防护', desc:'WH-07 碰撞检测模块失效，紧急停用', score:0, status:'fail' },
        { icon:'🏷', name:'CE认证', desc:'有效期至2026-06-30', score:100, status:'pass' },
        { icon:'🔧', name:'定期维护记录', desc:'RB-09 超期未维护(112天)', score:71, status:'warn' },
      ].map(item => `
      <div class="compliance-item">
        <span class="compliance-icon">${item.icon}</span>
        <div class="compliance-info">
          <div class="compliance-name">${item.name}</div>
          <div class="compliance-desc">${item.desc}</div>
        </div>
        <div class="compliance-score ${item.status==='pass'?'score-pass':item.status==='warn'?'score-warn':'score-fail'}">
          ${item.status==='pass'?'✓':item.status==='warn'?'!':'✗'}
        </div>
      </div>`).join('')}
    </div>

    <div>
      <div class="card" style="margin-bottom:16px">
        <div class="card-header"><span class="card-title">📊 合规评分</span></div>
        <div id="chart-safety-score" style="height:200px"></div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title">📜 适用标准</span></div>
        <table class="data-table">
          <thead><tr><th>标准编号</th><th>名称</th><th>状态</th></tr></thead>
          <tbody>
            ${[
              ['GB/T 38741','服务机器人安全','有效'],
              ['GB/T 42130','移动机器人性能','有效'],
              ['ISO 10218-1','工业机器人安全','有效'],
              ['IEC 61000-6','电磁兼容','整改中'],
              ['GB 17799.3','EMC辐射骚扰','整改中'],
            ].map(([id,name,status])=>`
            <tr>
              <td><code style="color:var(--accent);font-size:11px">${id}</code></td>
              <td>${name}</td>
              <td><span class="tag ${status==='有效'?'tag-pass':'tag-warning'}">${status}</span></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  `;

  initChart('chart-safety-score', {
    backgroundColor:'transparent',
    tooltip:{ backgroundColor:'rgba(13,31,53,0.9)', borderColor:'rgba(0,180,255,0.3)', textStyle:{color:'#e2f0ff'} },
    series:[{
      type:'gauge',
      startAngle:200, endAngle:-20,
      min:0, max:100,
      radius:'90%',
      progress:{ show:true, width:12, roundCap:true, itemStyle:{color:{type:'linear',x:0,y:0,x2:1,y2:0,colorStops:[{offset:0,color:'#ef4444'},{offset:0.5,color:'#f59e0b'},{offset:1,color:'#10b981'}]}} },
      axisLine:{ lineStyle:{ width:12, color:[[1,'rgba(0,0,0,0.2)']] } },
      splitLine:{ show:false },
      axisTick:{ show:false },
      axisLabel:{ show:false },
      pointer:{ icon:'path://M12.8,0.7l12.9,9.1H0z', length:'12%', width:5, offsetCenter:[0,'0%'], itemStyle:{color:'#00b4ff'} },
      anchor:{ show:true, size:12, itemStyle:{borderColor:'#00b4ff',borderWidth:2} },
      title:{ show:true, offsetCenter:[0,'55%'], color:'#7aa0c4', fontSize:12 },
      detail:{ valueAnimation:true, offsetCenter:[0,'25%'], formatter:'{value}分', color:'#e2f0ff', fontSize:28, fontWeight:'bold' },
      data:[{ value:78, name:'合规综合评分' }]
    }]
  });
}

function runSafetyCheck() { alert('正在执行全量安全合规校验，预计需要3分钟...'); }
function exportDashboard() { alert('正在导出数据快照...'); }

// ============================================================
//  通用图表初始化
// ============================================================
function initChart(id, option) {
  const el = document.getElementById(id);
  if (!el) return null;
  const chart = echarts.init(el, null, { renderer:'canvas' });
  chart.setOption(option);
  chartInstances[id] = chart;
  window.addEventListener('resize', () => { try { chart.resize(); } catch(e){} });
  return chart;
}

// ============================================================
//  启动
// ============================================================
window.addEventListener('load', () => {
  const el = document.querySelector('[data-page="dashboard"]');
  switchPage('dashboard', el);
});
