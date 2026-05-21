(function() {
  window.AppComponents.push({
    name: 'page-monitor',
    definition: {
      template: `
        <div class="monitor-embed-wrapper">
          <!-- Sub-navigation bar -->
          <div class="monitor-subnav">
            <div class="monitor-subnav-inner">
              <div class="monitor-subnav-brand">
                <span class="monitor-subnav-icon">⬡</span>
                <span class="monitor-subnav-title">RoboCloud 全域测试管控中枢</span>
              </div>
              <div class="monitor-subnav-tabs">
                <div
                  v-for="tab in subTabs"
                  :key="tab.key"
                  class="monitor-subnav-tab"
                  :class="{active: activeTab === tab.key}"
                  @click="switchTab(tab.key)"
                >
                  <span class="monitor-tab-icon">{{ tab.icon }}</span>
                  <span>{{ tab.label }}</span>
                  <span v-if="tab.badge" class="monitor-tab-badge" :class="tab.badgeClass">{{ tab.badge }}</span>
                </div>
              </div>
              <div class="monitor-subnav-actions">
                <a :href="currentSrc" target="_blank" class="monitor-action-btn" title="新窗口打开">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  新窗口
                </a>
              </div>
            </div>
          </div>
          <!-- Iframe container -->
          <div class="monitor-iframe-container">
            <iframe
              ref="monitorIframe"
              :src="currentSrc"
              class="monitor-iframe"
              frameborder="0"
              allowfullscreen
              @load="onIframeLoad"
            ></iframe>
            <div v-if="loading" class="monitor-loading-overlay">
              <div class="monitor-loading-spinner"></div>
              <div class="monitor-loading-text">加载管控中枢中...</div>
            </div>
          </div>
        </div>
      `,
      setup: function() {
        var ref = Vue.ref;
        var onMounted = Vue.onMounted;

        var subTabs = [
          { key: 'dashboard',  label: '总览大屏',     icon: '📊', src: 'robc/index.html', engine: 'robc' },
          { key: 'monitor',    label: '实时监控',     icon: '📡', src: 'robotcloud/index.html', engine: 'robotcloud', page: 'monitor', badge: '12', badgeClass: 'green' },
          { key: 'tasks',      label: '场景任务编排', icon: '🗂', src: 'robotcloud/index.html', engine: 'robotcloud', page: 'tasks' },
          { key: 'testing',    label: '自动化测试',   icon: '🧪', src: 'robotcloud/index.html', engine: 'robotcloud', page: 'testing', badge: '2', badgeClass: 'yellow' },
          { key: 'robots',     label: '机器人管理',   icon: '🤖', src: 'robotcloud/index.html', engine: 'robotcloud', page: 'robots' },
          { key: 'dispatch',   label: '多机协同调度', icon: '🗺', src: 'robotcloud/index.html', engine: 'robotcloud', page: 'dispatch' },
          { key: 'analytics',  label: '数据采集分析', icon: '📈', src: 'robotcloud/index.html', engine: 'robotcloud', page: 'analytics' },
          { key: 'reports',    label: '测试报告',     icon: '📋', src: 'robotcloud/index.html', engine: 'robotcloud', page: 'reports' },
          { key: 'simulation', label: '仿真虚实联动', icon: '🌐', src: 'robotcloud/index.html', engine: 'robotcloud', page: 'simulation' },
          { key: 'simtest',    label: '仿真测试管理', icon: '🧬', src: 'robotcloud/index.html', engine: 'robotcloud', page: 'simtest', badge: '1', badgeClass: 'yellow' },
          { key: 'safety',     label: '安全合规校验', icon: '🛡', src: 'robotcloud/index.html', engine: 'robotcloud', page: 'safety' },
        ];

        var activeTab = ref('dashboard');
        var loading = ref(true);
        var monitorIframe = ref(null);
        var iframeReady = ref(false);
        var lastEngine = ref('robc');

        var currentSrc = Vue.computed(function() {
          var tab = subTabs.find(function(t) { return t.key === activeTab.value; });
          return tab ? tab.src : 'robc/index.html';
        });

        var currentTab = Vue.computed(function() {
          return subTabs.find(function(t) { return t.key === activeTab.value; });
        });

        // Send page switch command to robotcloud iframe
        var sendRobotcloudSwitch = function(page) {
          if (!monitorIframe.value || !iframeReady.value) return;
          try {
            monitorIframe.value.contentWindow.postMessage({
              type: 'robotcloud-switch',
              target: page
            }, '*');
          } catch(e) {}
        };

        var switchTab = function(key) {
          if (key === activeTab.value) return;
          var newTab = subTabs.find(function(t) { return t.key === key; });
          var oldTab = subTabs.find(function(t) { return t.key === activeTab.value; });

          // If switching between different engines, reload iframe
          if (newTab.engine !== oldTab.engine) {
            loading.value = true;
            iframeReady.value = false;
            activeTab.value = key;
            lastEngine.value = newTab.engine;
            return;
          }

          // Same engine - use postMessage for robotcloud
          activeTab.value = key;
          if (newTab.engine === 'robotcloud' && newTab.page) {
            sendRobotcloudSwitch(newTab.page);
          }
        };

        var onIframeLoad = function() {
          loading.value = false;
          iframeReady.value = true;

          var tab = currentTab.value;
          if (!tab) return;

          if (tab.engine === 'robotcloud' && tab.page) {
            // Small delay to let iframe fully initialize
            setTimeout(function() { sendRobotcloudSwitch(tab.page); }, 300);
          }
        };

        onMounted(function() {
          // Listen for messages from iframe
          window.addEventListener('message', function(e) {
            if (e.data && e.data.type === 'robotcloud-navigate') {
              var target = e.data.target;
              var tab = subTabs.find(function(t) {
                return t.page === target || t.key === target;
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
          monitorIframe: monitorIframe,
          switchTab: switchTab,
          onIframeLoad: onIframeLoad,
        };
      }
    }
  });
})();
