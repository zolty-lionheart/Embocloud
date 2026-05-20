(function() {
  var D = window.AppData;
  window.AppComponents.push({
    name: 'page-simulation',
    definition: {
      template: `
        <div>
          <div class="page-header"><div class="page-header-inner"><h1>云仿真平台</h1><p>弹性算力，高精度物理仿真，加速机器人验证迭代</p></div></div>
          <div class="section-container">
            <div class="sim-layout">
              <div class="panel-card">
                <h3 style="font-size:15px;font-weight:600;color:var(--dark-gray);margin-bottom:18px;">仿真参数设置</h3>
                <el-form :model="simForm" :rules="simRules" ref="simFormRef" label-width="80px">
                  <el-form-item label="仿真场景" prop="scene">
                    <el-select v-model="simForm.scene" placeholder="请选择场景" style="width:100%;">
                      <el-option v-for="s in simScenes" :key="s" :label="s" :value="s"/>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="机器人型号" prop="robot">
                    <el-select v-model="simForm.robot" placeholder="请选择型号" style="width:100%;">
                      <el-option v-for="r in robotModels" :key="r" :label="r" :value="r"/>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="仿真时长" prop="duration">
                    <el-input-number v-model="simForm.duration" :min="1" :max="3600" style="width:100%;"/>
                    <span style="font-size:11px;color:var(--medium-gray);">秒</span>
                  </el-form-item>
                  <el-form-item label="物理引擎" prop="engine">
                    <el-select v-model="simForm.engine" style="width:100%;">
                      <el-option label="MuJoCo" value="mujoco"/>
                      <el-option label="PyBullet" value="pybullet"/>
                      <el-option label="Isaac Sim" value="isaac"/>
                      <el-option label="Gazebo" value="gazebo"/>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="随机种子">
                    <el-input-number v-model="simForm.seed" :min="0" :max="99999" style="width:100%;"/>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="startSimulation" style="width:100%;" :loading="simRunning">{{ simRunning?'仿真中...':'启动仿真' }}</el-button>
                  </el-form-item>
                </el-form>
              </div>
              <div class="panel-card">
                <el-tabs v-model="simActiveTab">
                  <el-tab-pane label="运动仿真" name="motion">
                    <div style="margin-bottom:10px;"><el-tag :type="simRunning?'success':'info'" effect="plain">{{ simRunning?'⏳ 仿真运行中...':'📊 仿真结果' }}</el-tag></div>
                    <div ref="motionChartRef" class="chart-container"></div>
                  </el-tab-pane>
                  <el-tab-pane label="碰撞检测" name="collision">
                    <div ref="collisionChartRef" class="chart-container"></div>
                    <el-alert v-if="collisionDetected" title="检测到 3 处碰撞风险点，建议调整关节限位参数" type="warning" show-icon style="margin-top:14px;"/>
                  </el-tab-pane>
                  <el-tab-pane label="数字孪生实训" name="twin">
                    <div style="height:280px;background:linear-gradient(135deg,#0D47A1,#1565C0);border-radius:8px;display:flex;align-items:center;justify-content:center;color:#fff;flex-direction:column;gap:12px;">
                      <div style="font-size:44px;">🤖</div>
                      <div style="font-size:17px;font-weight:600;">数字孪生实训场景</div>
                      <div style="font-size:13px;opacity:0.8;">虚实融合 · 实时同步 · 安全试错</div>
                      <el-button @click="ElMessage.success('数字孪生实训已启动！')" style="background:rgba(255,255,255,0.2);border-color:rgba(255,255,255,0.5);color:#fff;">进入实训环境</el-button>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </div>
            <!-- Compute Packages -->
            <div style="margin-top:24px;">
              <h3 style="font-size:15px;font-weight:600;color:var(--dark-gray);margin-bottom:14px;">算力套餐</h3>
              <div class="compute-packages">
                <div v-for="pkg in computePackages" :key="pkg.id" class="compute-package-card" :class="{selected:selectedPackage===pkg.id}" @click="selectedPackage=pkg.id">
                  <div class="package-name">{{ pkg.name }}</div>
                  <div class="package-price">{{ pkg.price }}</div>
                  <div class="package-desc">{{ pkg.desc }}</div>
                  <el-button type="primary" size="small" style="margin-top:10px;" :plain="selectedPackage!==pkg.id" @click.stop="handlePackageSelect(pkg)">
                    {{ selectedPackage===pkg.id?'已选择':'选择套餐' }}
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
      setup: function() {
        var ref = Vue.ref;
        var reactive = Vue.reactive;
        var onMounted = Vue.onMounted;
        var nextTick = Vue.nextTick;
        var watch = Vue.watch;
        var ElMessage = ElementPlus.ElMessage;

        var simRunning = ref(false);
        var simActiveTab = ref('motion');
        var collisionDetected = ref(false);
        var selectedPackage = ref('');
        var motionChartRef = ref(null);
        var collisionChartRef = ref(null);
        var motionChart = null;
        var collisionChart = null;

        var simForm = reactive({ scene: '工厂装配线', robot: 'UR5e 协作臂', duration: 60, engine: 'mujoco', seed: 42 });
        var simRules = {
          scene: [{ required: true, message: '请选择仿真场景', trigger: 'change' }],
          robot: [{ required: true, message: '请选择机器人型号', trigger: 'change' }],
          duration: [{ required: true, message: '请输入仿真时长', trigger: 'blur' }],
        };
        var simFormRef = ref(null);

        var initMotionChart = function() {
          if (!motionChartRef.value) return;
          if (motionChart) motionChart.dispose();
          motionChart = echarts.init(motionChartRef.value);
          var times = Array.from({ length: 60 }, function(_, i) { return i + 's'; });
          var genData = function(base, amp) {
            return Array.from({ length: 60 }, function() { return +(base + (Math.random() - 0.5) * amp).toFixed(3); });
          };
          motionChart.setOption({
            tooltip: { trigger: 'axis' },
            legend: { data: ['关节1', '关节2', '关节3', '末端X', '末端Y'], textStyle: { fontSize: 12 } },
            grid: { left: 40, right: 20, top: 40, bottom: 30 },
            xAxis: { type: 'category', data: times, axisLabel: { fontSize: 10 } },
            yAxis: { type: 'value', name: '角度(rad)', nameTextStyle: { fontSize: 10 }, axisLabel: { fontSize: 10 } },
            series: [
              { name: '关节1', type: 'line', data: genData(0.5, 0.8), smooth: true, lineStyle: { color: '#1565C0' }, symbol: 'none' },
              { name: '关节2', type: 'line', data: genData(-0.3, 0.6), smooth: true, lineStyle: { color: '#42A5F5' }, symbol: 'none' },
              { name: '关节3', type: 'line', data: genData(1.2, 0.4), smooth: true, lineStyle: { color: '#26C6DA' }, symbol: 'none' },
              { name: '末端X', type: 'line', data: genData(0.2, 0.3), smooth: true, lineStyle: { color: '#66BB6A', type: 'dashed' }, symbol: 'none' },
              { name: '末端Y', type: 'line', data: genData(0.1, 0.25), smooth: true, lineStyle: { color: '#FFA726', type: 'dashed' }, symbol: 'none' },
            ]
          });
        };

        var initCollisionChart = function() {
          if (!collisionChartRef.value) return;
          if (collisionChart) collisionChart.dispose();
          collisionChart = echarts.init(collisionChartRef.value);
          collisionChart.setOption({
            tooltip: { trigger: 'axis' },
            legend: { data: ['碰撞力(N)', '安全距离(mm)'], textStyle: { fontSize: 12 } },
            grid: { left: 50, right: 20, top: 40, bottom: 30 },
            xAxis: { type: 'category', data: Array.from({ length: 40 }, function(_, i) { return i * 1.5 + 's'; }), axisLabel: { fontSize: 10 } },
            yAxis: [
              { type: 'value', name: '力(N)', nameTextStyle: { fontSize: 10 }, axisLabel: { fontSize: 10 } },
              { type: 'value', name: '距离(mm)', nameTextStyle: { fontSize: 10 }, axisLabel: { fontSize: 10 } }
            ],
            series: [
              { name: '碰撞力(N)', type: 'line', data: Array.from({ length: 40 }, function() { return +(Math.random() * 15).toFixed(1); }), smooth: true, lineStyle: { color: '#E53935' }, areaStyle: { color: 'rgba(229,57,53,0.1)' }, symbol: 'none' },
              { name: '安全距离(mm)', type: 'line', yAxisIndex: 1, data: Array.from({ length: 40 }, function() { return +(20 + Math.random() * 30).toFixed(1); }), smooth: true, lineStyle: { color: '#43A047' }, symbol: 'none' },
            ]
          });
        };

        var startSimulation = function() {
          if (!simFormRef.value) return;
          simFormRef.value.validate(function(valid) {
            if (valid) {
              simRunning.value = true;
              collisionDetected.value = false;
              ElMessage.success('仿真任务已提交，正在运行...');
              setTimeout(function() {
                simRunning.value = false;
                collisionDetected.value = true;
                ElMessage.success('仿真完成！');
                nextTick(function() { initMotionChart(); initCollisionChart(); });
              }, 2500);
            }
          });
        };

        var handlePackageSelect = function(pkg) {
          selectedPackage.value = pkg.id;
          ElMessage.success('已选择「' + pkg.name + '」套餐');
        };

        onMounted(function() {
          nextTick(function() {
            initMotionChart();
            initCollisionChart();
          });
        });

        watch(simActiveTab, function(val) {
          nextTick(function() {
            if (val === 'motion') setTimeout(initMotionChart, 100);
            if (val === 'collision') setTimeout(initCollisionChart, 100);
          });
        });

        return {
          ElMessage: ElMessage,
          simRunning: simRunning,
          simActiveTab: simActiveTab,
          collisionDetected: collisionDetected,
          selectedPackage: selectedPackage,
          motionChartRef: motionChartRef,
          collisionChartRef: collisionChartRef,
          simScenes: D.simScenes,
          robotModels: D.robotModels,
          simForm: simForm,
          simRules: simRules,
          simFormRef: simFormRef,
          computePackages: D.computePackages,
          startSimulation: startSimulation,
          handlePackageSelect: handlePackageSelect,
        };
      }
    }
  });
})();
