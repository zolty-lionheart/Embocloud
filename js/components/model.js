(function() {
  var D = window.AppData;
  var U = window.AppUtils;
  window.AppComponents.push({
    name: 'page-model',
    definition: {
      template: `
        <div>
          <div class="page-header"><div class="page-header-inner"><h1>模型库</h1><p>丰富的URDF模型与AI模型资源，加速机器人研发</p></div></div>
          <div class="section-container">
            <el-tabs v-model="modelTab">
              <el-tab-pane label="URDF模型库" name="urdf">
                <div class="model-layout">
                  <div class="model-sidebar">
                    <div style="font-size:13px;font-weight:600;color:var(--dark-gray);padding-bottom:10px;border-bottom:1px solid var(--border-color);margin-bottom:10px;">模型分类</div>
                    <el-tree :data="modelTree" :props="{children:'children',label:'label'}" default-expand-all highlight-current @node-click="handleModelTreeClick"/>
                  </div>
                  <div class="model-content">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
                      <span style="font-size:13px;color:var(--medium-gray);">共 {{ filteredModels.length }} 个模型</span>
                      <el-input v-model="modelSearch" placeholder="搜索模型..." style="width:220px;" prefix-icon="Search"/>
                    </div>
                    <div class="model-grid">
                      <div v-for="m in filteredModels" :key="m.id" class="model-card" @click="openModelDetail(m)">
                        <div class="model-card-img">{{ m.icon }}</div>
                        <div class="model-card-body">
                          <div class="model-card-name">{{ m.name }}</div>
                          <div style="margin:3px 0;display:flex;gap:3px;flex-wrap:wrap;">
                            <el-tag size="small" type="primary">{{ m.category }}</el-tag>
                            <el-tag size="small">{{ m.format }}</el-tag>
                          </div>
                          <div class="model-card-desc">{{ m.desc }}</div>
                          <div style="margin-top:6px;font-size:11px;color:var(--medium-gray);">v{{ m.version }} | ↓{{ m.downloads }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="AI模型库" name="ai">
                <div class="model-grid">
                  <div v-for="m in aiModels" :key="m.id" class="model-card" @click="openModelDetail(m)">
                    <div class="model-card-img">{{ m.icon }}</div>
                    <div class="model-card-body">
                      <div class="model-card-name">{{ m.name }}</div>
                      <div style="margin:3px 0;display:flex;gap:3px;">
                        <el-tag size="small" type="success">{{ m.category }}</el-tag>
                        <el-tag size="small" type="warning">{{ m.framework }}</el-tag>
                      </div>
                      <div class="model-card-desc">{{ m.desc }}</div>
                      <div style="margin-top:6px;font-size:11px;color:var(--medium-gray);">精度:{{ m.accuracy }} | 参数:{{ m.params }}</div>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
            <!-- Model Detail -->
            <el-dialog v-model="modelDetailVisible" :title="selectedModel.name||'模型详情'" width="600px">
              <div v-if="selectedModel.id" style="display:flex;gap:20px;">
                <div style="width:100px;height:100px;background:linear-gradient(135deg,#E3F2FD,#BBDEFB);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:48px;flex-shrink:0;">{{ selectedModel.icon }}</div>
                <div style="flex:1;">
                  <p style="color:var(--medium-gray);font-size:13px;margin-bottom:10px;">{{ selectedModel.desc }}</p>
                  <el-descriptions :column="2" border size="small">
                    <el-descriptions-item label="分类">{{ selectedModel.category }}</el-descriptions-item>
                    <el-descriptions-item label="格式">{{ selectedModel.format||selectedModel.framework }}</el-descriptions-item>
                    <el-descriptions-item label="版本">v{{ selectedModel.version }}</el-descriptions-item>
                    <el-descriptions-item label="下载量">{{ selectedModel.downloads }}</el-descriptions-item>
                    <el-descriptions-item label="文件大小">{{ selectedModel.size||'25.6 MB' }}</el-descriptions-item>
                    <el-descriptions-item label="开源协议">Apache 2.0</el-descriptions-item>
                  </el-descriptions>
                </div>
              </div>
              <template #footer>
                <el-button @click="modelDetailVisible=false">关闭</el-button>
                <el-button type="primary" @click="ElMessage.success('开始下载模型...');modelDetailVisible=false;">下载模型</el-button>
              </template>
            </el-dialog>
          </div>
        </div>
      `,
      setup: function() {
        var ref = Vue.ref;
        var computed = Vue.computed;
        var ElMessage = ElementPlus.ElMessage;

        var modelTab = ref('urdf');
        var modelSearch = ref('');
        var modelDetailVisible = ref(false);
        var selectedModel = ref({});
        var selectedModelCategory = ref('');

        var urdfModels = ref(D.urdfModels.slice());
        var filteredModels = computed(function() {
          return urdfModels.value.filter(function(m) {
            var kwOk = !modelSearch.value || m.name.includes(modelSearch.value) || m.category.includes(modelSearch.value);
            var catOk = !selectedModelCategory.value || m.category.includes(selectedModelCategory.value);
            return kwOk && catOk;
          });
        });
        var handleModelTreeClick = function(node) { selectedModelCategory.value = node.label; };
        var openModelDetail = function(m) { selectedModel.value = m; modelDetailVisible.value = true; };

        return {
          ElMessage: ElMessage,
          modelTab: modelTab,
          modelSearch: modelSearch,
          modelDetailVisible: modelDetailVisible,
          selectedModel: selectedModel,
          modelTree: D.modelTree,
          filteredModels: filteredModels,
          handleModelTreeClick: handleModelTreeClick,
          aiModels: D.aiModels,
          openModelDetail: openModelDetail,
        };
      }
    }
  });
})();
