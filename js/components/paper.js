/**
 * 论文解读页面组件
 */
(function() {
  var D = window.AppData;

  window.AppComponents.push({
    name: 'page-paper',
    definition: {
      template: '\
        <div>\
          <div class="page-header">\
            <div class="page-header-inner">\
              <h1>论文解读</h1>\
              <p>精选具身智能前沿论文，深度解读核心方法与贡献</p>\
            </div>\
          </div>\
          <div class="section-container">\
            <div class="paper-list">\
              <div v-for="p in papers" :key="p.id" class="paper-card" @click="openDetail(p)">\
                <div class="paper-card-header">\
                  <span class="paper-card-icon">{{ p.icon }}</span>\
                  <div class="paper-card-meta">\
                    <div class="paper-card-venue">{{ p.venue }}</div>\
                    <div class="paper-card-org">{{ p.org }} · {{ p.year }}</div>\
                  </div>\
                </div>\
                <h3 class="paper-card-title">{{ p.titleCn }}</h3>\
                <p class="paper-card-title-en">{{ p.title }}</p>\
                <p class="paper-card-authors">{{ p.authors }}</p>\
                <div class="paper-card-tags">\
                  <el-tag v-for="t in p.tags" :key="t" size="small" type="primary" effect="plain">{{ t }}</el-tag>\
                </div>\
                <p class="paper-card-excerpt">{{ p.abstract.slice(0, 100) }}...</p>\
              </div>\
            </div>\
            <!-- 论文详情弹窗 -->\
            <el-dialog v-model="detailVisible" :title="detailPaper.titleCn" width="720px" top="3vh" :append-to-body="true">\
              <div v-if="detailPaper.id" class="paper-detail">\
                <div class="paper-detail-top">\
                  <span style="font-size:48px;">{{ detailPaper.icon }}</span>\
                  <div class="paper-detail-meta">\
                    <h2 style="margin:0 0 4px;font-size:18px;">{{ detailPaper.titleCn }}</h2>\
                    <p style="margin:0 0 2px;font-size:13px;color:var(--medium-gray);">{{ detailPaper.title }}</p>\
                    <p style="margin:0 0 6px;font-size:13px;color:var(--light-gray);">{{ detailPaper.authors }} · {{ detailPaper.org }}</p>\
                    <div style="display:flex;gap:6px;flex-wrap:wrap;">\
                      <el-tag size="small" type="primary">{{ detailPaper.venue }}</el-tag>\
                      <el-tag size="small" type="info">{{ detailPaper.year }}</el-tag>\
                      <el-tag v-for="t in detailPaper.tags" :key="t" size="small" effect="plain">{{ t }}</el-tag>\
                    </div>\
                  </div>\
                </div>\
                <div class="paper-detail-section">\
                  <h4>📄 论文摘要</h4>\
                  <p>{{ detailPaper.abstract }}</p>\
                </div>\
                <div class="paper-detail-section">\
                  <h4>🔑 核心解读</h4>\
                  <ul>\
                    <li v-for="(ins, i) in detailPaper.keyInsights" :key="i">{{ ins }}</li>\
                  </ul>\
                </div>\
                <div class="paper-detail-section">\
                  <h4>💡 影响与启示</h4>\
                  <p>{{ detailPaper.impact }}</p>\
                </div>\
                <div style="text-align:center;margin-top:16px;">\
                  <el-button type="primary" @click="goLink(detailPaper.link)">🔗 查看原论文</el-button>\
                </div>\
              </div>\
              <template #footer>\
                <el-button @click="detailVisible=false">关闭</el-button>\
              </template>\
            </el-dialog>\
          </div>\
        </div>',
      setup: function() {
        var ref = Vue.ref;
        var papers = ref(D.papers);
        var detailVisible = ref(false);
        var detailPaper = ref({});

        var openDetail = function(p) {
          detailPaper.value = p;
          detailVisible.value = true;
        };

        var goLink = function(url) {
          if (url) window.open(url, '_blank');
        };

        return {
          papers: papers,
          detailVisible: detailVisible,
          detailPaper: detailPaper,
          openDetail: openDetail,
          goLink: goLink,
        };
      }
    }
  });
})();
