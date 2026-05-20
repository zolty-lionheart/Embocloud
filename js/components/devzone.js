(function() {
  var D = window.AppData;
  var U = window.AppUtils;
  window.AppComponents.push({
    name: 'page-devzone',
    definition: {
      template: `
        <div>
          <div class="page-header"><div class="page-header-inner"><h1>二次开发专区</h1><p>完整开发工具链，快速构建个性化机器人应用</p></div></div>
          <div class="section-container">
            <h3 style="font-size:15px;font-weight:600;color:var(--dark-gray);margin-bottom:14px;">本体选型</h3>
            <div class="devzone-grid">
              <div v-for="rb in robotBodies" :key="rb.id" class="devzone-card" :class="{active:selectedRobotBody===rb.id}" @click="selectedRobotBody=rb.id">
                <div style="font-size:32px;margin-bottom:10px;">{{ rb.icon }}</div>
                <div style="font-size:14px;font-weight:600;color:var(--dark-gray);margin-bottom:4px;">{{ rb.name }}</div>
                <div style="font-size:12px;color:var(--medium-gray);margin-bottom:10px;">{{ rb.desc }}</div>
                <div style="display:flex;flex-wrap:wrap;gap:5px;">
                  <el-tag v-for="tag in rb.tags" :key="tag" size="small" :type="tagTypeMap(tag)">{{ tag }}</el-tag>
                </div>
              </div>
            </div>
            <div style="margin-bottom:20px;display:flex;align-items:center;gap:14px;">
              <span style="font-size:14px;font-weight:600;color:var(--dark-gray);white-space:nowrap;">场景选择：</span>
              <el-select v-model="selectedDevScene" placeholder="请选择开发场景" style="width:260px;">
                <el-option v-for="s in devScenes" :key="s.value" :label="s.label" :value="s.value"/>
              </el-select>
            </div>
            <div v-if="selectedDevScene" style="margin-bottom:28px;">
              <h3 style="font-size:15px;font-weight:600;color:var(--dark-gray);margin-bottom:14px;">对应开发套件 — {{ currentSceneLabel }}</h3>
              <div class="devzone-grid">
                <div v-for="kit in currentDevKits" :key="kit.id" class="devzone-card" style="border-color:var(--border-color);">
                  <div style="font-size:26px;margin-bottom:8px;">{{ kit.icon }}</div>
                  <div style="font-size:13px;font-weight:600;color:var(--dark-gray);margin-bottom:4px;">{{ kit.name }}</div>
                  <div style="font-size:12px;color:var(--medium-gray);margin-bottom:10px;">{{ kit.desc }}</div>
                  <el-button type="primary" size="small" plain @click="ElMessage.success(kit.name + ' 已加入开发环境')">添加到项目</el-button>
                </div>
              </div>
            </div>
            <h3 style="font-size:15px;font-weight:600;color:var(--dark-gray);margin-bottom:14px;">优秀案例</h3>
            <div class="case-grid">
              <div v-for="c in devCases" :key="c.id" class="case-card">
                <div class="case-img">{{ c.icon }}</div>
                <div class="case-body">
                  <div style="font-size:13px;font-weight:600;color:var(--dark-gray);margin-bottom:5px;">{{ c.name }}</div>
                  <div style="font-size:12px;color:var(--medium-gray);margin-bottom:8px;">{{ c.desc }}</div>
                  <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px;">
                    <el-tag v-for="tag in c.tags" :key="tag" size="small" :type="tagTypeMap(tag)">{{ tag }}</el-tag>
                  </div>
                  <div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;color:var(--medium-gray);">
                    <span>⭐ {{ c.stars }}</span>
                    <el-button link type="primary" size="small" @click="ElMessage.info('查看: ' + c.name)">查看详情</el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
      setup: function() {
        var ref = Vue.ref;
        var computed = Vue.computed;
        var ElMessage = ElementPlus.ElMessage;

        var selectedRobotBody = ref('');
        var selectedDevScene = ref('');

        var currentDevKits = computed(function() {
          return D.devKitsMap[selectedDevScene.value] || [];
        });
        var currentSceneLabel = computed(function() {
          var found = D.devScenes.find(function(s) { return s.value === selectedDevScene.value; });
          return found ? found.label : '';
        });

        return {
          ElMessage: ElMessage,
          tagTypeMap: U.tagTypeMap,
          selectedRobotBody: selectedRobotBody,
          selectedDevScene: selectedDevScene,
          robotBodies: D.robotBodies,
          devScenes: D.devScenes,
          currentDevKits: currentDevKits,
          currentSceneLabel: currentSceneLabel,
          devCases: D.devCases,
        };
      }
    }
  });
})();
