(function() {
  var D = window.AppData;
  var U = window.AppUtils;
  window.AppComponents.push({
    name: 'page-dataset',
    definition: {
      template: `
        <div>
          <div class="page-header"><div class="page-header-inner"><h1>数据集中心</h1><p>收录全球主流具身智能数据集，点击卡片直达官方下载页</p></div></div>
          <div class="section-container">
            <!-- 分类筛选 -->
            <div class="filter-bar">
              <el-select v-model="activeCategory" placeholder="数据集分类" clearable style="width:200px;">
                <el-option v-for="cat in datasetCategories" :key="cat" :label="cat" :value="cat"/>
              </el-select>
              <el-input v-model="searchKeyword" placeholder="搜索数据集名称/来源..." prefix-icon="Search" style="width:280px;" clearable />
              <el-button @click="compareVisible=true" :disabled="compareList.length===0" style="margin-left:auto;">
                对比 ({{ compareList.length }})
              </el-button>
              <el-button type="primary" @click="datasetUploadVisible=true">+ 提交数据集</el-button>
            </div>
            <!-- 统计栏 -->
            <div class="ds-stats-bar">
              <div class="ds-stat-item"><div class="ds-stat-num">{{ filteredDatasets.length }}</div><div class="ds-stat-label">数据集</div></div>
              <div class="ds-stat-item"><div class="ds-stat-num">{{ totalTrajectories }}</div><div class="ds-stat-label">覆盖轨迹</div></div>
              <div class="ds-stat-item"><div class="ds-stat-num">{{ uniqueSources }}</div><div class="ds-stat-label">数据来源</div></div>
              <div class="ds-stat-item"><div class="ds-stat-num">7</div><div class="ds-stat-label">分类方向</div></div>
            </div>
            <!-- 数据集 Grid -->
            <div class="dataset-grid">
              <a v-for="ds in filteredDatasets" :key="ds.id" :href="ds.url" target="_blank" rel="noopener" class="ds-link">
                <div class="dataset-card">
                  <div class="ds-card-header">
                    <div class="ds-category-badge" :style="{ background: getCategoryColor(ds.category) }">
                      {{ getCategoryIcon(ds.category) }} {{ ds.category }}
                    </div>
                    <div class="ds-ext-link" title="跳转官方页面">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    </div>
                  </div>
                  <div class="ds-name">{{ ds.name }}</div>
                  <div class="ds-count">{{ ds.count }}</div>
                  <div class="ds-desc">{{ ds.desc }}</div>
                  <div class="ds-footer">
                    <div class="ds-source">{{ ds.source }}</div>
                    <div class="ds-tags">
                      <el-tag v-for="tag in ds.tags" :key="tag" size="small" effect="plain" round>{{ tag }}</el-tag>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div v-if="filteredDatasets.length === 0" style="text-align:center;padding:60px 0;">
              <el-empty description="没有找到匹配的数据集" />
            </div>
            <!-- Compare Dialog -->
            <el-dialog v-model="compareVisible" title="数据集对比" width="900px">
              <el-empty v-if="compareList.length===0" description="请先添加数据集到对比列表"/>
              <el-table v-else :data="compareList" border stripe>
                <el-table-column prop="name" label="名称" min-width="140"/>
                <el-table-column prop="category" label="分类" width="140"/>
                <el-table-column prop="count" label="数据规模" width="140"/>
                <el-table-column prop="source" label="来源" width="110"/>
                <el-table-column label="标签" min-width="180">
                  <template #default="{row}">
                    <el-tag v-for="t in row.tags" :key="t" size="small" effect="plain" round style="margin:2px 4px 2px 0;">{{ t }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="链接" width="70" align="center">
                  <template #default="{row}">
                    <el-button link type="primary" @click="window.open(row.url,'_blank')">访问</el-button>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="60" align="center">
                  <template #default="{row}">
                    <el-button link type="danger" @click="removeFromCompare(row)">移除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <template #footer><el-button @click="compareVisible=false">关闭</el-button></template>
            </el-dialog>
            <!-- Upload Dialog -->
            <el-dialog v-model="datasetUploadVisible" title="提交数据集" width="580px">
              <el-form :model="uploadForm" :rules="uploadRules" ref="uploadFormRef" label-width="90px">
                <el-form-item label="数据集名称" prop="name"><el-input v-model="uploadForm.name" placeholder="请输入名称"/></el-form-item>
                <el-form-item label="分类方向" prop="category">
                  <el-select v-model="uploadForm.category" placeholder="请选择" style="width:100%;">
                    <el-option v-for="c in datasetCategories.slice(1)" :key="c" :label="c" :value="c"/>
                  </el-select>
                </el-form-item>
                <el-form-item label="官方链接" prop="url"><el-input v-model="uploadForm.url" placeholder="https://"/></el-form-item>
                <el-form-item label="数据描述" prop="desc">
                  <el-input v-model="uploadForm.desc" type="textarea" :rows="3" placeholder="请描述数据集内容、规模、特点"/>
                </el-form-item>
                <el-form-item label="上传文件">
                  <el-upload drag action="#" :auto-upload="false" accept=".zip,.tar,.gz,.json,.csv">
                    <div style="padding:20px;text-align:center;color:var(--medium-gray);">
                      <div style="font-size:32px;margin-bottom:8px;">📁</div>
                      <div>拖拽文件到此处或 <em style="color:var(--primary-blue);">点击上传</em></div>
                      <div style="font-size:11px;margin-top:4px;">支持 .zip .tar .gz .json .csv，文件不超过 2GB</div>
                    </div>
                  </el-upload>
                </el-form-item>
              </el-form>
              <template #footer>
                <el-button @click="datasetUploadVisible=false">取消</el-button>
                <el-button type="primary" @click="submitUpload">提交审核</el-button>
              </template>
            </el-dialog>
          </div>
        </div>
      `,
      setup: function() {
        var ref = Vue.ref;
        var reactive = Vue.reactive;
        var computed = Vue.computed;
        var ElMessage = ElementPlus.ElMessage;

        var activeCategory = ref('');
        var searchKeyword = ref('');
        var datasetUploadVisible = ref(false);
        var compareVisible = ref(false);
        var compareList = ref([]);
        var datasets = ref(D.datasets.slice());

        var filteredDatasets = computed(function() {
          return datasets.value.filter(function(d) {
            var catOk = !activeCategory.value || d.category === activeCategory.value;
            var kwOk = !searchKeyword.value || d.name.toLowerCase().includes(searchKeyword.value.toLowerCase()) || d.source.toLowerCase().includes(searchKeyword.value.toLowerCase()) || d.desc.includes(searchKeyword.value);
            return catOk && kwOk;
          });
        });

        var totalTrajectories = computed(function() { return filteredDatasets.value.length; });
        var uniqueSources = computed(function() {
          var set = {};
          filteredDatasets.value.forEach(function(d) { set[d.source] = true; });
          return Object.keys(set).length;
        });

        var getCategoryColor = function(cat) {
          var info = D.datasetCategoryMap[cat];
          return info ? info.color : '#1565C0';
        };
        var getCategoryIcon = function(cat) {
          var info = D.datasetCategoryMap[cat];
          return info ? info.icon : '📊';
        };

        var addToCompare = function(ds) {
          if (compareList.value.find(function(d) { return d.id === ds.id; })) { ElMessage.warning('已在对比列表中'); return; }
          if (compareList.value.length >= 4) { ElMessage.warning('最多对比4个数据集'); return; }
          compareList.value.push(ds);
          ElMessage.success('已添加到对比列表');
        };
        var removeFromCompare = function(ds) {
          compareList.value = compareList.value.filter(function(d) { return d.id !== ds.id; });
        };

        var uploadForm = reactive({ name: '', category: '', url: '', desc: '' });
        var uploadRules = {
          name: [{ required: true, message: '请输入数据集名称', trigger: 'blur' }],
          category: [{ required: true, message: '请选择分类方向', trigger: 'change' }],
          url: [{ required: true, message: '请输入官方链接', trigger: 'blur' }],
          desc: [{ required: true, message: '请输入数据描述', trigger: 'blur' }],
        };
        var uploadFormRef = ref(null);
        var submitUpload = function() {
          if (!uploadFormRef.value) return;
          uploadFormRef.value.validate(function(valid) {
            if (valid) {
              ElMessage.success('数据集已提交，等待审核');
              datasetUploadVisible.value = false;
              uploadForm.name = ''; uploadForm.category = ''; uploadForm.url = ''; uploadForm.desc = '';
            }
          });
        };

        return {
          ElMessage: ElMessage,
          window: window,
          activeCategory: activeCategory,
          searchKeyword: searchKeyword,
          datasetUploadVisible: datasetUploadVisible,
          compareVisible: compareVisible,
          compareList: compareList,
          datasetCategories: D.datasetCategories,
          filteredDatasets: filteredDatasets,
          totalTrajectories: totalTrajectories,
          uniqueSources: uniqueSources,
          getCategoryColor: getCategoryColor,
          getCategoryIcon: getCategoryIcon,
          addToCompare: addToCompare,
          removeFromCompare: removeFromCompare,
          uploadForm: uploadForm,
          uploadRules: uploadRules,
          uploadFormRef: uploadFormRef,
          submitUpload: submitUpload,
        };
      }
    }
  });
})();
