(function() {
  var D = window.AppData;
  var U = window.AppUtils;
  window.AppComponents.push({
    name: 'page-standard',
    definition: {
      template: `
        <div>
          <div class="page-header"><div class="page-header-inner"><h1>标准认证</h1><p>机器人安全与测试标准文档库 — 覆盖 13 大类 86 项国内外标准</p></div></div>
          <div class="section-container">

            <!-- Stats Bar -->
            <div class="ds-stats-bar">
              <div class="ds-stat-item">
                <div class="ds-stat-num">{{ allStandards.length }}</div>
                <div class="ds-stat-label">标准总数</div>
              </div>
              <div class="ds-stat-item">
                <div class="ds-stat-num">{{ categoryCount }}</div>
                <div class="ds-stat-label">标准分类</div>
              </div>
              <div class="ds-stat-item">
                <div class="ds-stat-num">{{ gbCount }}</div>
                <div class="ds-stat-label">国家标准</div>
              </div>
              <div class="ds-stat-item">
                <div class="ds-stat-num">{{ intlCount }}</div>
                <div class="ds-stat-label">国际标准</div>
              </div>
              <div class="ds-stat-item">
                <div class="ds-stat-num">{{ otherCount }}</div>
                <div class="ds-stat-label">行标/团标/地标</div>
              </div>
            </div>

            <!-- Search -->
            <div style="display:flex;gap:12px;margin-bottom:20px;">
              <el-input v-model="searchKey" placeholder="搜索标准编号或名称..." prefix-icon="Search" style="flex:1;" clearable @clear="searchKey=''"/>
              <el-button type="primary" @click="onSearch">检索</el-button>
            </div>

            <!-- Layout: Sidebar + Content -->
            <div class="standard-layout">
              <div class="standard-sidebar">
                <div class="std-sidebar-title">标准分类</div>
                <el-tree
                  :data="standardTree"
                  :props="{label:'label'}"
                  :highlight-current="true"
                  default-expand-all
                  @node-click="onTreeClick"
                >
                  <template #default="{ node, data }">
                    <span class="std-tree-node">
                      <span class="std-tree-dot" :style="{background: getCategoryColor(data.label)}"></span>
                      <span class="std-tree-label">{{ data.label }}</span>
                      <span v-if="getCategoryCount(data.label) > 0" class="std-tree-count">{{ getCategoryCount(data.label) }}</span>
                    </span>
                  </template>
                </el-tree>
              </div>
              <div class="standard-content">
                <!-- Current Category Header -->
                <div v-if="activeCategory && activeCategory !== '全部标准'" class="std-category-header" :style="{borderLeftColor: getCategoryColor(activeCategory)}">
                  <span class="std-category-dot" :style="{background: getCategoryColor(activeCategory)}"></span>
                  <span class="std-category-name">{{ activeCategory }}</span>
                  <span class="std-category-count">{{ filteredStandards.length }} 项标准</span>
                </div>

                <el-tabs v-model="activeTab" class="std-tabs">
                  <el-tab-pane label="标准列表" name="list">
                    <el-table :data="paginatedStandards" border stripe row-class-name="std-table-row" :row-style="{cursor:'pointer'}">
                      <el-table-column prop="code" label="标准编号" width="190" show-overflow-tooltip>
                        <template #default="{row}">
                          <span class="std-code">{{ row.code }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="name" label="标准名称" min-width="280" show-overflow-tooltip/>
                      <el-table-column label="分类" width="130">
                        <template #default="{row}">
                          <span class="std-cat-badge" :style="{background: getCategoryColor(row.category)+'18', color: getCategoryColor(row.category), border: '1px solid ' + getCategoryColor(row.category)+'40'}">
                            {{ row.category }}
                          </span>
                        </template>
                      </el-table-column>
                      <el-table-column label="类型" width="80" align="center">
                        <template #default="{row}">
                          <el-tag :type="typeTagMap[row.type] || 'info'" size="small" effect="light">{{ row.type }}</el-tag>
                        </template>
                      </el-table-column>
                      <el-table-column label="状态" width="80" align="center">
                        <template #default="{row}">
                          <el-tag :type="row.status==='现行'?'success':'warning'" size="small" effect="light">{{ row.status }}</el-tag>
                        </template>
                      </el-table-column>
                    </el-table>
                    <!-- Pagination -->
                    <div class="std-pagination" v-if="filteredStandards.length > pageSize">
                      <el-pagination
                        v-model:current-page="currentPage"
                        :page-size="pageSize"
                        :total="filteredStandards.length"
                        layout="total, prev, pager, next"
                        small
                        background
                      />
                    </div>
                  </el-tab-pane>

                  <el-tab-pane label="认证路径查询" name="cert">
                    <div class="std-cert-intro">
                      <div class="std-cert-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:32px;height:32px;color:#1565C0"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
                      </div>
                      <div>
                        <div style="font-size:15px;font-weight:700;color:var(--dark-gray);margin-bottom:4px;">一站式认证路径规划</div>
                        <div style="font-size:13px;color:var(--medium-gray);">根据产品类型和目标市场，为您推荐最优认证路径与合规方案</div>
                      </div>
                    </div>
                    <el-form :model="certForm" label-width="90px" style="max-width:480px;margin-bottom:20px;">
                      <el-form-item label="产品类型">
                        <el-select v-model="certForm.product" placeholder="选择产品类型" style="width:100%;">
                          <el-option label="工业机械臂" value="industrial_arm"/>
                          <el-option label="协作机器人" value="cobot"/>
                          <el-option label="移动机器人AMR" value="amr"/>
                          <el-option label="人形机器人" value="humanoid"/>
                          <el-option label="服务机器人" value="service"/>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="目标市场">
                        <el-select v-model="certForm.market" placeholder="选择目标市场" style="width:100%;">
                          <el-option label="中国大陆" value="china"/>
                          <el-option label="欧盟（CE）" value="eu"/>
                          <el-option label="北美（UL/CSA）" value="na"/>
                          <el-option label="全球通用" value="global"/>
                        </el-select>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="queryCertPath">查询认证路径</el-button>
                      </el-form-item>
                    </el-form>
                    <el-table v-if="certPaths.length" :data="certPaths" border stripe>
                      <el-table-column prop="step" label="步骤" width="55" align="center"/>
                      <el-table-column prop="name" label="认证项目" width="180"/>
                      <el-table-column prop="body" label="认证机构" width="140"/>
                      <el-table-column prop="duration" label="周期" width="90"/>
                      <el-table-column prop="cost" label="参考费用" width="110"/>
                      <el-table-column prop="remark" label="备注"/>
                    </el-table>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </div>
          </div>
        </div>
      `,
      setup: function() {
        var ref = Vue.ref;
        var reactive = Vue.reactive;
        var computed = Vue.computed;
        var ElMessage = ElementPlus.ElMessage;

        var allStandards = ref(D.standards.slice());
        var standardTree = D.standardTree;
        var searchKey = ref('');
        var activeCategory = ref('全部标准');
        var activeTab = ref('list');
        var currentPage = ref(1);
        var pageSize = 20;
        var certForm = reactive({ product: '', market: '' });
        var certPaths = ref([]);

        var typeTagMap = { '国标': 'primary', '国际': 'success', '行标': 'warning', '团标': '', '地标': 'info', '其他': 'info' };

        // Stats
        var categoryCount = computed(function() {
          var cats = {};
          allStandards.value.forEach(function(s) { cats[s.category] = true; });
          return Object.keys(cats).length;
        });
        var gbCount = computed(function() {
          return allStandards.value.filter(function(s) { return s.type === '国标'; }).length;
        });
        var intlCount = computed(function() {
          return allStandards.value.filter(function(s) { return s.type === '国际'; }).length;
        });
        var otherCount = computed(function() {
          return allStandards.value.filter(function(s) { return s.type !== '国标' && s.type !== '国际'; }).length;
        });

        // Category color
        var getCategoryColor = function(cat) {
          return D.standardCategoryColors[cat] || '#90A4AE';
        };

        // Category count for tree
        var getCategoryCount = function(cat) {
          if (cat === '全部标准') return allStandards.value.length;
          return allStandards.value.filter(function(s) { return s.category === cat; }).length;
        };

        // Filtered standards
        var filteredStandards = computed(function() {
          var list = allStandards.value;
          if (activeCategory.value && activeCategory.value !== '全部标准') {
            list = list.filter(function(s) { return s.category === activeCategory.value; });
          }
          if (searchKey.value) {
            var key = searchKey.value.toLowerCase();
            list = list.filter(function(s) {
              return s.code.toLowerCase().includes(key) || s.name.toLowerCase().includes(key) || s.category.toLowerCase().includes(key);
            });
          }
          return list;
        });

        var paginatedStandards = computed(function() {
          var start = (currentPage.value - 1) * pageSize;
          return filteredStandards.value.slice(start, start + pageSize);
        });

        // Tree click
        var onTreeClick = function(node) {
          activeCategory.value = node.label;
          currentPage.value = 1;
          if (activeTab.value === 'cert') activeTab.value = 'list';
        };

        var onSearch = function() {
          if (!searchKey.value) { ElMessage.info('请输入搜索关键词'); return; }
          var count = filteredStandards.value.length;
          ElMessage.success('找到 ' + count + ' 条匹配标准');
        };

        // Cert path
        var queryCertPath = function() {
          if (!certForm.product || !certForm.market) { ElMessage.warning('请选择产品类型和目标市场'); return; }
          var key = certForm.product + '_' + certForm.market;
          certPaths.value = D.certPathData[key] || [
            { step: 1, name: '技术文件准备', body: '企业自行', duration: '2-4周', cost: '¥1-3万', remark: '整理技术规格书、电路图、风险评估' },
            { step: 2, name: '功能安全测试', body: '认证机构', duration: '4-8周', cost: '¥10-25万', remark: '根据产品类型选择适用标准' },
            { step: 3, name: '型式试验', body: '授权测试机构', duration: '3-6周', cost: '¥8-20万', remark: '包含机械、电气、软件测试' },
            { step: 4, name: '认证证书颁发', body: '认证机构', duration: '2-4周', cost: '¥2-5万', remark: '年度监督审查' },
          ];
          activeTab.value = 'cert';
          ElMessage.success('认证路径查询完成');
        };

        return {
          allStandards: allStandards,
          standardTree: standardTree,
          searchKey: searchKey,
          activeCategory: activeCategory,
          activeTab: activeTab,
          currentPage: currentPage,
          pageSize: pageSize,
          certForm: certForm,
          certPaths: certPaths,
          typeTagMap: typeTagMap,
          categoryCount: categoryCount,
          gbCount: gbCount,
          intlCount: intlCount,
          otherCount: otherCount,
          getCategoryColor: getCategoryColor,
          getCategoryCount: getCategoryCount,
          filteredStandards: filteredStandards,
          paginatedStandards: paginatedStandards,
          onTreeClick: onTreeClick,
          onSearch: onSearch,
          queryCertPath: queryCertPath,
        };
      }
    }
  });
})();
