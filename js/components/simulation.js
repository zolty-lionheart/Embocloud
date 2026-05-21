(function() {
  window.AppComponents.push({
    name: 'page-simulation',
    definition: {
      template: `
        <div class="sim-embed-wrapper">
          <!-- Sub-navigation bar -->
          <div class="sim-subnav">
            <div class="sim-subnav-inner">
              <div class="sim-subnav-brand">
                <span class="sim-subnav-icon">🤖</span>
                <span class="sim-subnav-title">机器人仿真测试平台</span>
              </div>
              <div class="sim-subnav-tabs">
                <div
                  v-for="tab in subTabs"
                  :key="tab.key"
                  class="sim-subnav-tab"
                  :class="{active: activeTab === tab.key}"
                  @click="switchTab(tab.key)"
                >
                  <span class="sim-tab-icon">{{ tab.icon }}</span>
                  <span>{{ tab.label }}</span>
                  <span v-if="tab.badge" class="sim-tab-badge" :class="tab.badgeClass">{{ tab.badge }}</span>
                </div>
              </div>
              <div class="sim-subnav-actions">
                <a :href="currentSrc" target="_blank" class="sim-action-btn" title="新窗口打开">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  新窗口
                </a>
              </div>
            </div>
          </div>
          <!-- Iframe container -->
          <div class="sim-iframe-container">
            <iframe
              ref="simIframe"
              :src="currentSrc"
              class="sim-iframe"
              frameborder="0"
              allowfullscreen
              @load="onIframeLoad"
            ></iframe>
            <div v-if="loading" class="sim-loading-overlay">
              <div class="sim-loading-spinner"></div>
              <div class="sim-loading-text">加载仿真平台中...</div>
            </div>
          </div>
        </div>
      `,
      setup: function() {
        var ref = Vue.ref;
        var onMounted = Vue.onMounted;

        var subTabs = [
          { key: 'dashboard', label: '控制台总览', icon: '🏠', src: 'simulation/index.html', badge: null, badgeClass: '' },
          { key: 'scene', label: '测试场景库', icon: '🗂️', src: 'simulation/scene-library.html', badge: '48', badgeClass: 'green' },
          { key: 'task', label: '任务管理', icon: '📋', src: 'simulation/task-manager.html', badge: '3', badgeClass: 'yellow' },
          { key: 'monitor', label: '实时监控', icon: '📡', src: 'simulation/monitor.html', badge: 'LIVE', badgeClass: 'red' },
          { key: 'dataset', label: '数据集管理', icon: '🗃️', src: 'simulation/dataset-manager.html', badge: 'New', badgeClass: 'purple' },
        ];

        var activeTab = ref('dashboard');
        var loading = ref(true);
        var simIframe = ref(null);

        var currentSrc = Vue.computed(function() {
          var tab = subTabs.find(function(t) { return t.key === activeTab.value; });
          return tab ? tab.src : 'simulation/index.html';
        });

        var switchTab = function(key) {
          if (key === activeTab.value) return;
          loading.value = true;
          activeTab.value = key;
        };

        var onIframeLoad = function() {
          loading.value = false;
        };

        onMounted(function() {
          // Listen for messages from iframe (for cross-page navigation)
          window.addEventListener('message', function(e) {
            if (e.data && e.data.type === 'sim-navigate') {
              var target = e.data.target; // e.g. 'scene-library.html' or 'scene'
              var tab = subTabs.find(function(t) {
                return t.key === target || t.src === target || t.src.endsWith(target);
              });
              if (tab) {
                switchTab(tab.key);
              }
            }
          });
        });

        return {
          subTabs: subTabs,
          activeTab: activeTab,
          currentSrc: currentSrc,
          loading: loading,
          simIframe: simIframe,
          switchTab: switchTab,
          onIframeLoad: onIframeLoad,
        };
      }
    }
  });
})();
