/**
 * 具身智能众创云空间 — 应用入口
 * 创建 Vue 应用，注册所有组件，挂载到 DOM
 */
(function() {
  var createApp = Vue.createApp;
  var ref = Vue.ref;
  var reactive = Vue.reactive;
  var provide = Vue.provide;
  var computed = Vue.computed;
  var watch = Vue.watch;
  var nextTick = Vue.nextTick;
  var ElMessage = ElementPlus.ElMessage;

  // 共享响应式状态
  var appState = reactive({
    isLoggedIn: false,
    userName: '张工程师',
    userEmail: 'zhang@embodied.ai',
    cart: [],
    orders: window.AppData.initialOrders.map(function(o) {
      return Object.assign({}, o);
    }),
  });

  // 工具函数
  var tagTypeMap = window.AppUtils.tagTypeMap;
  var orderStatusType = window.AppUtils.orderStatusType;

  // 导航菜单项映射
  var menuItems = [
    { index: 'home', label: '首页' },
    { index: 'dataset', label: '数据集中心' },
    { index: 'model', label: '模型库' },
    { index: 'course', label: '课程中心' },
    { index: 'simulation', label: '云仿真平台' },
    { index: 'devtool', label: '研发工具' },
    { index: 'monitor', label: '云监控平台' },
    { index: 'devzone', label: '二次开发' },
    { index: 'standard', label: '标准认证' },
    { index: 'mall', label: '供应链商城' },
    { index: 'community', label: '众创社区' },
  ];

  // 创建应用
  var app = createApp({
    template: '\
      <div>\
        <!-- Navbar -->\
        <header class="top-navbar">\
          <div class="navbar-logo" @click="navigate(\'page-home\')">\
            <div class="logo-icon" v-html="logoSvg"></div>\
            <span class="logo-text">具身智能<span class="logo-accent">众创云空间</span></span>\
          </div>\
          <el-menu\
            class="navbar-menu"\
            mode="horizontal"\
            :default-active="activeMenu"\
            background-color="transparent"\
            text-color="#263238"\
            active-text-color="#1565C0"\
            @select="handleMenuSelect"\
          >\
            <el-menu-item v-for="item in menuItems" :key="item.index" :index="item.index">{{ item.label }}</el-menu-item>\
          </el-menu>\
          <div class="navbar-actions">\
            <el-button v-if="!appState.isLoggedIn" type="primary" size="small" @click="handleLogin">登录</el-button>\
            <el-dropdown v-else @command="handleUserCommand">\
              <span style="cursor:pointer;display:flex;align-items:center;gap:6px;color:var(--dark-gray);font-size:13px;">\
                <el-avatar :size="28" style="background:var(--primary-blue);">{{ appState.userName[0] }}</el-avatar>\
                {{ appState.userName }}\
              </span>\
              <template #dropdown>\
                <el-dropdown-menu>\
                  <el-dropdown-item command="profile">个人中心</el-dropdown-item>\
                  <el-dropdown-item command="orders">我的订单</el-dropdown-item>\
                  <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>\
                </el-dropdown-menu>\
              </template>\
            </el-dropdown>\
          </div>\
        </header>\
        <!-- Main -->\
        <main class="main-content">\
          <component :is="currentPage"></component>\
        </main>\
        <!-- Footer -->\
        <footer class="site-footer">\
          <div class="footer-inner">\
            <div class="footer-grid">\
              <div class="footer-brand">\
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">\
                  <div style="width:32px;height:32px;flex-shrink:0;" v-html="logoSvg"></div>\
                  <span style="font-size:17px;font-weight:700;color:#fff;">具身智能众创云空间</span>\
                </div>\
                <p>面向具身智能领域的全栈研发平台，提供数据集、模型库、云仿真、供应链等全链路服务，助力机器人技术创新与产业化落地。</p>\
                <div style="margin-top:14px;display:flex;gap:10px;">\
                  <el-button size="small" style="background:rgba(255,255,255,0.1);border-color:rgba(255,255,255,0.2);color:rgba(255,255,255,0.8);">GitHub</el-button>\
                  <el-button size="small" style="background:rgba(255,255,255,0.1);border-color:rgba(255,255,255,0.2);color:rgba(255,255,255,0.8);">微信公众号</el-button>\
                  <el-button size="small" style="background:rgba(255,255,255,0.1);border-color:rgba(255,255,255,0.2);color:rgba(255,255,255,0.8);">B站</el-button>\
                </div>\
              </div>\
              <div class="footer-col">\
                <h4>核心功能</h4>\
                <ul>\
                  <li><a href="#" @click.prevent="navigate(\'page-dataset\')">数据集中心</a></li>\
                  <li><a href="#" @click.prevent="navigate(\'page-model\')">模型库</a></li>\
                  <li><a href="#" @click.prevent="navigate(\'page-simulation\')">云仿真平台</a></li>\
                  <li><a href="#" @click.prevent="navigate(\'page-monitor\')">云监控平台</a></li>\
                </ul>\
              </div>\
              <div class="footer-col">\
                <h4>开发者</h4>\
                <ul>\
                  <li><a href="#">API文档</a></li>\
                  <li><a href="#">SDK下载</a></li>\
                  <li><a href="#">开发指南</a></li>\
                  <li><a href="#" @click.prevent="navigate(\'page-devzone\')">二次开发</a></li>\
                </ul>\
              </div>\
              <div class="footer-col">\
                <h4>关于我们</h4>\
                <ul>\
                  <li><a href="#">平台简介</a></li>\
                  <li><a href="#" @click.prevent="navigate(\'page-standard\')">标准认证</a></li>\
                  <li><a href="#" @click.prevent="navigate(\'page-community\')">众创社区</a></li>\
                  <li><a href="#">联系我们</a></li>\
                </ul>\
              </div>\
            </div>\
            <div class="footer-bottom">&copy; 2025 具身智能众创云空间 All rights reserved. | 粤ICP备XXXXXXXXX号</div>\
          </div>\
        </footer>\
      </div>',
    setup: function() {
      var currentPage = ref('page-home');

      var activeMenu = computed(function() {
        var page = currentPage.value;
        if (page.startsWith('page-')) return page.replace('page-', '');
        return 'home';
      });

      var navigate = function(page) {
        currentPage.value = page;
        window.scrollTo(0, 0);
      };

      var handleMenuSelect = function(key) {
        navigate('page-' + key);
      };

      var handleLogin = function() {
        appState.isLoggedIn = true;
        ElMessage.success('登录成功，欢迎回来！');
      };

      var handleUserCommand = function(cmd) {
        if (cmd === 'logout') {
          appState.isLoggedIn = false;
          ElMessage.info('已退出登录');
        } else if (cmd === 'profile') {
          navigate('page-profile');
        } else if (cmd === 'orders') {
          navigate('page-mall');
        }
      };

      // 向所有子组件提供共享数据
      provide('navigate', navigate);
      provide('currentPage', currentPage);
      provide('appState', appState);
      provide('tagTypeMap', tagTypeMap);
      provide('orderStatusType', orderStatusType);

      return {
        currentPage: currentPage,
        activeMenu: activeMenu,
        navigate: navigate,
        handleMenuSelect: handleMenuSelect,
        handleLogin: handleLogin,
        handleUserCommand: handleUserCommand,
        appState: appState,
        menuItems: menuItems,
        logoSvg: '<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="36" height="36" rx="8" fill="url(#lg)"/><defs><linearGradient id="lg" x1="0" y1="0" x2="36" y2="36"><stop stop-color="#1565C0"/><stop offset="1" stop-color="#42A5F5"/></linearGradient></defs><path d="M10 16a8 8 0 0116 0" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/><rect x="9" y="16" width="18" height="11" rx="3" stroke="#fff" stroke-width="1.8"/><circle cx="14" cy="21.5" r="1.5" fill="#fff"/><circle cx="22" cy="21.5" r="1.5" fill="#fff"/><path d="M16 25h4" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/><line x1="6" y1="19" x2="9" y2="19" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/><line x1="27" y1="19" x2="30" y2="19" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/><path d="M22 12c1.2-3 4.2-4.2 6.6-3 2.4 1.2 3 4.2 1.8 6.6" stroke="rgba(255,255,255,0.5)" stroke-width="1.5" stroke-linecap="round"/></svg>',
      };
    }
  });

  // 注册所有组件
  (window.AppComponents || []).forEach(function(c) {
    app.component(c.name, c.definition);
  });

  // 使用 Element Plus
  app.use(ElementPlus);

  // 挂载
  app.mount('#app');
})();
