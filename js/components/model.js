(function() {
  var D = window.AppData;
  var U = window.AppUtils;

  // 从 urdfModels 提取去重分类列表
  var _catSet = {};
  var _catIconMap = {
    '四足机器人': '🐕',
    '人形机器人': '🤖',
    '工业/协作机械臂': '🦾',
    '灵巧手/末端执行器': '✋',
    '移动操作机器人': '🚗',
    '教育/开源': '📚',
  };
  D.urdfModels.forEach(function(m) {
    if (m.category && !_catSet[m.category]) {
      _catSet[m.category] = { label: m.category, icon: _catIconMap[m.category] || '📦' };
    }
  });
  var modelCategories = Object.values(_catSet);

  window.AppComponents.push({
    name: 'page-model',
    definition: {
      template: '\
        <div>\
          <div class="page-header">\
            <div class="page-header-inner">\
              <h1>模型库</h1>\
              <p>丰富的 URDF 模型与 AI 模型资源，加速机器人研发</p>\
            </div>\
          </div>\
          <div class="section-container">\
            <el-tabs v-model="modelTab" @tab-change="onTabChange">\
              <el-tab-pane label="URDF 模型库" name="urdf">\
                <div class="model-search-area">\
                  <div class="model-search-row">\
                    <el-select v-model="filterCategory" placeholder="全部分类" clearable style="width:180px;">\
                      <el-option v-for="c in categoryOptions" :key="c.label" :label="c.label" :value="c.label">\
                        <span style="display:flex;align-items:center;gap:6px;">\
                          <span style="font-size:14px;">{{ c.icon }}</span>\
                          <span>{{ c.label }}</span>\
                        </span>\
                      </el-option>\
                    </el-select>\
                    <el-select v-model="filterFormat" placeholder="全部格式" clearable style="width:130px;">\
                      <el-option label="URDF" value="URDF"/>\
                    </el-select>\
                    <el-input v-model="modelSearch" placeholder="搜索模型名称、关键词..." clearable prefix-icon="Search" class="model-search-input"/>\
                  </div>\
                  <div class="model-quick-tags">\
                    <span class="model-quick-label">快捷筛选：</span>\
                    <span\
                      v-for="c in categoryOptions"\
                      :key="c.label"\
                      class="model-quick-tag"\
                      :class="{ active: filterCategory === c.label }"\
                      @click="toggleCategory(c.label)"\
                    >{{ c.icon }} {{ c.label }}</span>\
                    <span\
                      class="model-quick-tag"\
                      :class="{ active: !filterCategory }"\
                      @click="filterCategory = \'\'"\
                    >📋 全部</span>\
                  </div>\
                </div>\
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">\
                  <span style="font-size:13px;color:var(--medium-gray);">共 <b style="color:var(--primary-blue);">{{ filteredModels.length }}</b> 个模型</span>\
                </div>\
                <div class="model-grid model-grid--4">\
                  <div v-for="m in filteredModels" :key="m.id" class="model-card">\
                    <div class="model-card-img" style="font-size:36px;">{{ m.icon }}</div>\
                    <div class="model-card-body">\
                      <div class="model-card-name">{{ m.name }}</div>\
                      <div style="margin:4px 0 6px;display:flex;gap:4px;flex-wrap:wrap;">\
                        <el-tag size="small" type="primary">{{ m.category }}</el-tag>\
                        <el-tag size="small">{{ m.format }}</el-tag>\
                        <el-tag size="small" type="success" v-if="m.file">可下载</el-tag>\
                      </div>\
                      <div class="model-card-desc" style="font-size:11px;color:var(--medium-gray);margin-bottom:6px;">{{ m.desc }}</div>\
                      <div style="display:flex;justify-content:space-between;align-items:center;">\
                        <span style="font-size:11px;color:var(--light-gray);">v{{ m.version }} | ↓{{ m.downloads }}</span>\
                        <div style="display:flex;gap:4px;">\
                          <el-button size="small" type="primary" text bg @click.stop="doPreview(m)">预览</el-button>\
                          <el-button size="small" type="primary" @click.stop="doDownload(m)">下载</el-button>\
                        </div>\
                      </div>\
                    </div>\
                  </div>\
                </div>\
              </el-tab-pane>\
              <el-tab-pane label="AI 模型库" name="ai">\
                <div class="model-grid model-grid--4">\
                  <div v-for="m in aiModels" :key="m.id" class="model-card" @click="openDetail(m)">\
                    <div class="model-card-img" style="font-size:36px;">{{ m.icon }}</div>\
                    <div class="model-card-body">\
                      <div class="model-card-name">{{ m.name }}</div>\
                      <div style="margin:3px 0;display:flex;gap:3px;">\
                        <el-tag size="small" type="success">{{ m.category }}</el-tag>\
                        <el-tag size="small" type="warning">{{ m.framework }}</el-tag>\
                      </div>\
                      <div class="model-card-desc">{{ m.desc }}</div>\
                      <div style="margin-top:6px;font-size:11px;color:var(--medium-gray);">精度:{{ m.accuracy }} | 参数:{{ m.params }}</div>\
                    </div>\
                  </div>\
                </div>\
              </el-tab-pane>\
            </el-tabs>\
            <!-- URDF 3D 预览弹窗（iframe 嵌入 Attic Viewer） -->\
            <el-dialog\
              v-model="previewVisible"\
              :title="previewName + \' — 3D 预览\'"\
              width="900px"\
              top="2vh"\
              :append-to-body="true"\
              @closed="onPreviewClosed"\
              :fullscreen="previewFullscreen"\
            >\
              <div style="position:relative;">\
                <!-- 顶部操作栏 -->\
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">\
                  <div style="display:flex;gap:6px;align-items:center;">\
                    <el-button size="small" type="primary" @click="doDownload(previewModel)">📥 先下载 URDF 文件</el-button>\
                    <el-button size="small" @click="toggleFullscreen">{{ previewFullscreen ? \'⬜ 退出全屏\' : \'⬛ 全屏预览\' }}</el-button>\
                  </div>\
                  <span style="font-size:12px;color:var(--light-gray);">🔭 使用 Attic Viewer 渲染引擎</span>\
                </div>\
                <!-- 使用提示 -->\
                <div style="background:linear-gradient(135deg,#E3F2FD,#E8F5E9);border:1px solid #BBDEFB;border-radius:8px;padding:12px 16px;margin-bottom:8px;display:flex;align-items:flex-start;gap:10px;">\
                  <span style="font-size:20px;line-height:1.4;">💡</span>\
                  <div style="flex:1;">\
                    <div style="font-size:13px;font-weight:600;color:#1565C0;margin-bottom:4px;">如何预览模型？</div>\
                    <div style="font-size:12px;color:#424242;line-height:1.8;">\
                      <span style="display:inline-block;background:#1565C0;color:#fff;border-radius:4px;padding:1px 6px;margin-right:2px;font-weight:600;">1</span> 点击上方 <b>📥 先下载 URDF 文件</b> 按钮，将 <b>{{ previewName }}</b> 的 URDF 文件保存到本地<br/>\
                      <span style="display:inline-block;background:#2E7D32;color:#fff;border-radius:4px;padding:1px 6px;margin-right:2px;font-weight:600;">2</span> 将下载的文件 <b>直接拖拽</b> 到下方预览窗口中，即可查看完整 3D 模型\
                    </div>\
                  </div>\
                </div>\
                <!-- iframe 预览窗口 -->\
                <div :style="{position:\'relative\',width:\'100%\',height:previewFullscreen?\'calc(100vh - 200px)\':\'560px\',borderRadius:\'8px\',overflow:\'hidden\',background:\'#1a1a2e\',border:\'2px dashed #30363d\',transition:\'height 0.3s\'}">\
                  <iframe\
                    src="https://viewer.osaerialrobot.top/"\
                    style="width:100%;height:100%;border:none;"\
                    title="URDF 3D 预览器 — Attic Viewer"\
                    allow="fullscreen"\
                  ></iframe>\
                </div>\
              </div>\
              <template #footer>\
                <div style="display:flex;justify-content:space-between;align-items:center;width:100%;">\
                  <span style="font-size:12px;color:var(--light-gray);">💡 下载文件 → 拖入下方窗口 → 查看 3D 模型</span>\
                  <div style="display:flex;gap:6px;">\
                    <el-button @click="previewVisible=false">关闭</el-button>\
                    <el-button type="primary" @click="doDownload(previewModel)">📥 下载 URDF</el-button>\
                  </div>\
                </div>\
              </template>\
            </el-dialog>\
            <!-- 模型详情弹窗 -->\
            <el-dialog v-model="detailVisible" :title="detailModel.name||\'模型详情\'" width="600px">\
              <div v-if="detailModel.id" style="display:flex;gap:20px;">\
                <div style="width:100px;height:100px;background:linear-gradient(135deg,#E3F2FD,#BBDEFB);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:48px;flex-shrink:0;">{{ detailModel.icon }}</div>\
                <div style="flex:1;">\
                  <p style="color:var(--medium-gray);font-size:13px;margin-bottom:10px;">{{ detailModel.desc }}</p>\
                  <el-descriptions :column="2" border size="small">\
                    <el-descriptions-item label="分类">{{ detailModel.category }}</el-descriptions-item>\
                    <el-descriptions-item label="格式">{{ detailModel.format||detailModel.framework }}</el-descriptions-item>\
                    <el-descriptions-item label="版本">v{{ detailModel.version }}</el-descriptions-item>\
                    <el-descriptions-item label="下载量">{{ detailModel.downloads }}</el-descriptions-item>\
                    <el-descriptions-item label="文件大小">{{ detailModel.size||\'—\' }}</el-descriptions-item>\
                    <el-descriptions-item label="开源协议">Apache 2.0</el-descriptions-item>\
                  </el-descriptions>\
                </div>\
              </div>\
              <template #footer>\
                <el-button @click="detailVisible=false">关闭</el-button>\
                <el-button type="primary" @click="doDownload(detailModel);detailVisible=false;">下载模型</el-button>\
              </template>\
            </el-dialog>\
          </div>\
        </div>',
      setup: function() {
        var ref = Vue.ref;
        var computed = Vue.computed;
        var ElMessage = ElementPlus.ElMessage;

        var modelTab = ref('urdf');
        var modelSearch = ref('');
        var filterCategory = ref('');
        var filterFormat = ref('');
        var previewVisible = ref(false);
        var previewName = ref('');
        var previewModel = ref(null);
        var previewFullscreen = ref(false);
        var detailVisible = ref(false);
        var detailModel = ref({});

        // 只显示有 file 字段的真实模型
        var urdfModels = ref(D.urdfModels.filter(function(m) { return !!m.file; }));
        var categoryOptions = ref(modelCategories);

        var filteredModels = computed(function() {
          return urdfModels.value.filter(function(m) {
            var kw = (modelSearch.value || '').trim().toLowerCase();
            var kwOk = !kw || m.name.toLowerCase().indexOf(kw) >= 0 || m.category.toLowerCase().indexOf(kw) >= 0 || (m.desc || '').toLowerCase().indexOf(kw) >= 0;
            var catOk = !filterCategory.value || m.category === filterCategory.value;
            var fmtOk = !filterFormat.value || m.format === filterFormat.value;
            return kwOk && catOk && fmtOk;
          });
        });

        var toggleCategory = function(label) {
          filterCategory.value = filterCategory.value === label ? '' : label;
        };

        var onTabChange = function() {
          filterCategory.value = '';
          filterFormat.value = '';
          modelSearch.value = '';
        };

        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        //  预览：弹窗打开 → iframe 嵌入 Attic Viewer
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        var doPreview = function(m) {
          if (!m || !m.file) { ElMessage.warning('该模型暂无预览文件'); return; }
          previewModel.value = m;
          previewName.value = m.name;
          previewFullscreen.value = false;
          previewVisible.value = true;
        };

        var toggleFullscreen = function() {
          previewFullscreen.value = !previewFullscreen.value;
        };

        var onPreviewClosed = function() {
          previewFullscreen.value = false;
        };

        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        //  下载（嵌入内容优先 + XHR 兜底）
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        var doDownload = function(m) {
          if (!m || !m.file) { ElMessage.warning('该模型暂无下载文件'); return; }

          // 确保嵌入内容已加载
          var doBlob = function() {
            if (window.URDF_CONTENTS && window.URDF_CONTENTS[m.file]) {
              var blob = new Blob([window.URDF_CONTENTS[m.file]], { type: 'application/xml' });
              var objUrl = URL.createObjectURL(blob);
              var a = document.createElement('a');
              a.href = objUrl;
              a.download = m.file.split('/').pop();
              a.style.display = 'none';
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              setTimeout(function() { URL.revokeObjectURL(objUrl); }, 10000);
              ElMessage.success('✅ ' + m.name + ' 下载完成');
              return;
            }
            // 兜底 XHR
            var base = window.location.pathname.replace(/[^\/]*$/, '');
            var url = (window.location.origin || '') + base + m.file;
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'blob';
            xhr.onload = function() {
              if (xhr.status >= 200 && xhr.status < 300) {
                var b = xhr.response;
                var o = URL.createObjectURL(b);
                var a2 = document.createElement('a');
                a2.href = o; a2.download = m.file.split('/').pop(); a2.style.display = 'none';
                document.body.appendChild(a2); a2.click(); document.body.removeChild(a2);
                setTimeout(function() { URL.revokeObjectURL(o); }, 10000);
                ElMessage.success('✅ ' + m.name + ' 下载完成');
              } else {
                fallbackOpen(url, m.file.split('/').pop());
              }
            };
            xhr.onerror = function() { fallbackOpen(url, m.file.split('/').pop()); };
            xhr.send();
          };

          // 按需加载 URDF 嵌入内容
          if (!window.URDF_CONTENTS) {
            var s = document.createElement('script');
            s.src = 'js/urdf-content.js';
            s.onload = function() { doBlob(); };
            s.onerror = function() { doBlob(); }; // 加载失败也走 XHR 兜底
            document.head.appendChild(s);
          } else {
            doBlob();
          }
        };

        var fallbackOpen = function(url, filename) {
          var a = document.createElement('a');
          a.href = url; a.download = filename; a.target = '_blank';
          a.style.display = 'none';
          document.body.appendChild(a); a.click(); document.body.removeChild(a);
          ElMessage({ message: '🔗 请右键另存为下载文件', type: 'warning', duration: 4000 });
        };

        // ── 详情 ──
        var openDetail = function(m) { detailModel.value = m; detailVisible.value = true; };

        return {
          modelTab: modelTab,
          modelSearch: modelSearch,
          filterCategory: filterCategory,
          filterFormat: filterFormat,
          categoryOptions: categoryOptions,
          previewVisible: previewVisible,
          previewName: previewName,
          previewModel: previewModel,
          previewFullscreen: previewFullscreen,
          detailVisible: detailVisible,
          detailModel: detailModel,
          filteredModels: filteredModels,
          aiModels: D.aiModels,
          toggleCategory: toggleCategory,
          onTabChange: onTabChange,
          doPreview: doPreview,
          onPreviewClosed: onPreviewClosed,
          toggleFullscreen: toggleFullscreen,
          doDownload: doDownload,
          openDetail: openDetail,
        };
      }
    }
  });
})();
