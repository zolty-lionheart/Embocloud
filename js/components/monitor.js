(function() {
  var D = window.AppData;
  window.AppComponents.push({
    name: 'page-monitor',
    definition: {
      template: `
        <div>
          <div class="page-header"><div class="page-header-inner"><h1>共享云监控平台</h1><p>实时监控设备状态，智能预警，保障研发安全</p></div></div>
          <div class="section-container">
            <div class="monitor-stats">
              <div class="monitor-stat-card" v-for="s in monitorStats" :key="s.label">
                <div class="monitor-stat-icon" :style="{background:s.bg}">{{ s.icon }}</div>
                <div>
                  <div class="monitor-stat-value" :style="{color:s.color}">{{ s.value }}</div>
                  <div class="monitor-stat-label">{{ s.label }}</div>
                </div>
              </div>
            </div>
            <el-alert v-if="unresAlerts>0" :title="'⚠️ 共 ' + unresAlerts + ' 条未处理异常报警，请及时处理'" type="error" show-icon style="margin-bottom:14px;"/>
            <div class="monitor-charts">
              <div class="chart-card">
                <div class="chart-title">实时运行数据（最近30分钟）</div>
                <div ref="realtimeChartRef" style="width:100%;height:240px;"></div>
              </div>
              <div class="chart-card">
                <div class="chart-title">设备状态仪表盘</div>
                <div ref="gaugeChartRef" style="width:100%;height:240px;"></div>
              </div>
            </div>
            <el-tabs v-model="monitorTab">
              <el-tab-pane label="设备管理" name="devices">
                <div style="margin-bottom:12px;display:flex;justify-content:space-between;">
                  <el-input v-model="deviceSearch" placeholder="搜索设备..." prefix-icon="Search" style="width:220px;"/>
                  <el-button type="primary" @click="ElMessage.success('设备状态已刷新')">刷新</el-button>
                </div>
                <el-table :data="filteredDevices" border stripe>
                  <el-table-column prop="id" label="设备ID" width="90"/>
                  <el-table-column prop="name" label="设备名称" width="160"/>
                  <el-table-column prop="type" label="类型" width="120"/>
                  <el-table-column prop="location" label="位置" width="110"/>
                  <el-table-column label="状态" width="80">
                    <template #default="{row}">
                      <el-tag :type="row.online?'success':'danger'" size="small">{{ row.online?'在线':'离线' }}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop="cpu" label="CPU" width="70"/>
                  <el-table-column prop="memory" label="内存" width="70"/>
                  <el-table-column prop="uptime" label="运行时长" width="110"/>
                  <el-table-column label="操作" width="110">
                    <template #default="{row}">
                      <el-button link type="primary" size="small" @click="ElMessage.info('连接 ' + row.name)">连接</el-button>
                      <el-button link type="warning" size="small" @click="ElMessage.warning('重启 ' + row.name)">重启</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="异常报警" name="alerts">
                <el-table :data="monitorAlerts" border stripe>
                  <el-table-column prop="time" label="时间" width="150"/>
                  <el-table-column prop="device" label="设备" width="140"/>
                  <el-table-column prop="type" label="报警类型" width="120"/>
                  <el-table-column prop="message" label="报警信息"/>
                  <el-table-column label="级别" width="80">
                    <template #default="{row}">
                      <el-tag :type="row.level==='严重'?'danger':row.level==='警告'?'warning':'info'" size="small">{{ row.level }}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column label="状态" width="80">
                    <template #default="{row}">
                      <el-tag :type="row.resolved?'success':'danger'" size="small">{{ row.resolved?'已处理':'未处理' }}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="70">
                    <template #default="{row}">
                      <el-button link type="primary" size="small" @click="resolveAlert(row)">处理</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="历史数据" name="history">
                <div style="display:flex;gap:12px;margin-bottom:14px;align-items:center;">
                  <el-date-picker v-model="historyDateRange" type="daterange" range-separator="至" start-placeholder="开始" end-placeholder="结束"/>
                  <el-button type="primary" @click="ElMessage.success('历史数据已加载')">查询</el-button>
                  <el-button @click="ElMessage.success('数据已导出')">导出CSV</el-button>
                </div>
                <el-table :data="historyData" border stripe>
                  <el-table-column prop="time" label="时间" width="150"/>
                  <el-table-column prop="device" label="设备" width="140"/>
                  <el-table-column prop="metric" label="指标" width="120"/>
                  <el-table-column prop="value" label="数值" width="90"/>
                  <el-table-column prop="unit" label="单位" width="70"/>
                  <el-table-column label="状态" width="80">
                    <template #default="{row}">
                      <el-tag :type="row.status==='正常'?'success':'warning'" size="small">{{ row.status }}</el-tag>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      `,
      setup: function() {
        var ref = Vue.ref;
        var computed = Vue.computed;
        var onMounted = Vue.onMounted;
        var nextTick = Vue.nextTick;
        var ElMessage = ElementPlus.ElMessage;

        var monitorTab = ref('devices');
        var deviceSearch = ref('');
        var historyDateRange = ref([]);
        var realtimeChartRef = ref(null);
        var gaugeChartRef = ref(null);
        var realtimeChart = null;
        var gaugeChart = null;

        var monitorStats = ref(D.monitorStats.slice());
        var devices = ref(D.devices.slice());
        var filteredDevices = computed(function() {
          if (!deviceSearch.value) return devices.value;
          return devices.value.filter(function(d) {
            return d.name.includes(deviceSearch.value) || d.type.includes(deviceSearch.value) || d.location.includes(deviceSearch.value);
          });
        });
        var monitorAlerts = ref(D.monitorAlerts.slice());
        var unresAlerts = computed(function() {
          return monitorAlerts.value.filter(function(a) { return !a.resolved; }).length;
        });
        var resolveAlert = function(alert) { alert.resolved = true; ElMessage.success('报警已处理'); };
        var historyData = ref(D.historyData.slice());

        var initRealtimeChart = function() {
          if (!realtimeChartRef.value) return;
          if (realtimeChart) realtimeChart.dispose();
          realtimeChart = echarts.init(realtimeChartRef.value);
          var times = Array.from({ length: 30 }, function(_, i) { return (30 - i) + '分前'; }).reverse();
          realtimeChart.setOption({
            tooltip: { trigger: 'axis' },
            legend: { data: ['CPU%', '内存GB', '网络MB/s'], textStyle: { fontSize: 11 } },
            grid: { left: 40, right: 20, top: 35, bottom: 25 },
            xAxis: { type: 'category', data: times, axisLabel: { fontSize: 9, rotate: 45 } },
            yAxis: { type: 'value', axisLabel: { fontSize: 10 } },
            series: [
              { name: 'CPU%', type: 'line', data: Array.from({ length: 30 }, function() { return +(30 + Math.random() * 50).toFixed(0); }), smooth: true, lineStyle: { color: '#1565C0' }, symbol: 'none' },
              { name: '内存GB', type: 'line', data: Array.from({ length: 30 }, function() { return +(2 + Math.random() * 6).toFixed(1); }), smooth: true, lineStyle: { color: '#43A047' }, symbol: 'none' },
              { name: '网络MB/s', type: 'line', data: Array.from({ length: 30 }, function() { return +(5 + Math.random() * 30).toFixed(0); }), smooth: true, lineStyle: { color: '#FFA726' }, symbol: 'none' },
            ]
          });
        };

        var initGaugeChart = function() {
          if (!gaugeChartRef.value) return;
          if (gaugeChart) gaugeChart.dispose();
          gaugeChart = echarts.init(gaugeChartRef.value);
          gaugeChart.setOption({
            series: [{
              type: 'gauge',
              startAngle: 200, endAngle: -20,
              min: 0, max: 100,
              splitNumber: 5,
              axisLine: { lineStyle: { width: 15, color: [[0.3, '#43A047'], [0.7, '#FFA726'], [1, '#E53935']] } },
              pointer: { icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z', length: '12%', width: 20, offsetCenter: [0, '-60%'], itemStyle: { color: 'auto' } },
              axisTick: { length: 12, lineStyle: { color: 'auto', width: 2 } },
              splitLine: { length: 20, lineStyle: { color: 'auto', width: 5 } },
              axisLabel: { color: 'auto', fontSize: 12, distance: -60 },
              detail: { valueAnimation: true, formatter: '{value}%', color: 'auto', fontSize: 20, offsetCenter: [0, '40%'] },
              title: { offsetCenter: [0, '70%'], fontSize: 13, color: '#546E7A' },
              data: [{ value: 72, name: '设备在线率' }]
            }]
          });
        };

        onMounted(function() {
          nextTick(function() {
            initRealtimeChart();
            initGaugeChart();
          });
        });

        return {
          ElMessage: ElMessage,
          monitorTab: monitorTab,
          deviceSearch: deviceSearch,
          historyDateRange: historyDateRange,
          realtimeChartRef: realtimeChartRef,
          gaugeChartRef: gaugeChartRef,
          monitorStats: monitorStats,
          filteredDevices: filteredDevices,
          monitorAlerts: monitorAlerts,
          unresAlerts: unresAlerts,
          resolveAlert: resolveAlert,
          historyData: historyData,
        };
      }
    }
  });
})();
