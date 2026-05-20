(function() {
  var D = window.AppData;
  window.AppComponents.push({
    name: 'page-home',
    definition: {
      template: `
        <div>
          <!-- ===== Hero ===== -->
          <div class="hero-section">
            <div class="hero-grid-bg"></div>
            <div class="hero-particles">
              <span v-for="n in 20" :key="n" class="hero-dot" :style="{left: Math.random()*100+'%', top: Math.random()*100+'%', animationDelay: (Math.random()*6)+'s', animationDuration: (4+Math.random()*4)+'s', width: (2+Math.random()*4)+'px', height: (2+Math.random()*4)+'px'}"></span>
            </div>
            <div class="hero-float hero-float-1"></div>
            <div class="hero-float hero-float-2"></div>
            <div class="hero-float hero-float-3"></div>
            <div style="position:relative;z-index:2;max-width:780px;text-align:center;">
              <div class="hero-badge">国内领先的具身智能研发平台</div>
              <h1 class="hero-title">具身智能，赋能<span>未来</span>机器人研发</h1>
              <p class="hero-subtitle">提供完整的具身智能研发生态链 — 数据集、模型库、云仿真、供应链一站式解决方案</p>
              <div class="hero-buttons">
                <el-button type="primary" size="large" @click="navigate('page-dataset')" class="hero-btn-primary">立即开始</el-button>
                <el-button size="large" @click="navigate('page-course')" class="hero-btn-ghost">了解更多</el-button>
              </div>
              <div class="hero-trust">
                <span class="hero-trust-avatars">
                  <span v-for="(u,i) in 4" :key="i" class="hero-trust-avatar" :style="{background: trustColors[i], left: i*22+'px', zIndex:4-i}">{{ trustNames[i] }}</span>
                </span>
                <span class="hero-trust-text">已有 <strong>5,000+</strong> 开发者加入</span>
              </div>
            </div>
          </div>

          <!-- ===== Stats ===== -->
          <div class="stats-section">
            <div class="stats-row">
              <div class="stat-item" v-for="s in homeStats" :key="s.label">
                <div class="stat-number">{{ s.value }}</div>
                <div class="stat-label">{{ s.label }}</div>
              </div>
            </div>
          </div>

          <!-- ===== 核心功能模块 ===== -->
          <div class="modules-section">
            <div style="max-width:1280px;margin:0 auto;padding:0 24px;">
              <div style="text-align:center;margin-bottom:32px;">
                <span class="section-tag">核心功能</span>
                <h2 class="section-title" style="margin-top:10px;">一站式具身智能研发平台</h2>
                <p class="section-subtitle">覆盖研发全链路，从数据到部署，10 大核心模块助力机器人技术创新</p>
              </div>
              <div class="modules-grid">
                <div v-for="m in coreModules" :key="m.id" class="module-card" @click="navigate('page-' + m.id)">
                  <div class="module-icon" :class="'module-icon--' + m.icon" v-html="getIcon(m.icon)"></div>
                  <div class="module-name">{{ m.name }}</div>
                  <div class="module-desc">{{ m.desc }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- ===== 平台优势 ===== -->
          <div class="advantages-section">
            <div style="max-width:1280px;margin:0 auto;padding:0 24px;">
              <div style="text-align:center;margin-bottom:32px;">
                <span class="section-tag">为什么选择我们</span>
                <h2 class="section-title" style="margin-top:10px;">四大核心优势</h2>
                <p class="section-subtitle">深耕具身智能领域，打造专业、高效、开放的研发基础设施</p>
              </div>
              <div class="advantages-grid">
                <div v-for="(a,i) in advantages" :key="i" class="advantage-card">
                  <div class="advantage-icon-wrap" :class="'advantage-icon--' + a.icon">
                    <span class="advantage-icon-inner" v-html="getIcon(a.icon)"></span>
                  </div>
                  <h3 class="advantage-title">{{ a.title }}</h3>
                  <p class="advantage-desc">{{ a.desc }}</p>
                  <div class="advantage-num">0{{ i+1 }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- ===== 热门数据集 ===== -->
          <div class="featured-section">
            <div style="max-width:1280px;margin:0 auto;padding:0 24px;">
              <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:28px;">
                <div>
                  <span class="section-tag">精选推荐</span>
                  <h2 class="section-title" style="margin-top:10px;">热门数据集</h2>
                  <p class="section-subtitle">平台最受欢迎的训练数据集，支持云端训练与本地部署</p>
                </div>
                <el-button type="primary" plain @click="navigate('page-dataset')">查看全部 &rarr;</el-button>
              </div>
              <div class="featured-grid">
                <div v-for="ds in featuredDatasets" :key="ds.name" class="featured-card">
                  <div class="featured-img">
                    <img :src="ds.img" :alt="ds.name" @error="$event.target.style.display='none'" />
                    <div class="featured-img-overlay">
                      <span class="featured-count">{{ ds.count }}</span>
                    </div>
                  </div>
                  <div class="featured-body">
                    <h4 class="featured-name">{{ ds.name }}</h4>
                    <div class="featured-meta">
                      <span>{{ ds.source }}</span>
                      <span>{{ ds.scene }}</span>
                    </div>
                    <div class="dataset-tags" style="margin-top:8px;">
                      <el-tag v-for="t in ds.tags" :key="t" :type="t==='热门'?'danger':'success'" size="small" effect="plain">{{ t }}</el-tag>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ===== 技术生态 ===== -->
          <div class="tech-section">
            <div style="max-width:1280px;margin:0 auto;padding:0 24px;">
              <div style="text-align:center;margin-bottom:28px;">
                <span class="section-tag">技术生态</span>
                <h2 class="section-title" style="margin-top:10px;">兼容主流技术栈</h2>
                <p class="section-subtitle">无缝对接行业主流框架、工具与平台，降低迁移成本</p>
              </div>
              <div class="tech-grid">
                <div v-for="t in techEcosystem" :key="t.name" class="tech-badge">
                  <span class="tech-badge-dot"></span>
                  {{ t.name }}
                  <span class="tech-badge-type">{{ t.type }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- ===== 用户评价 ===== -->
          <div class="testimonials-section">
            <div style="max-width:1280px;margin:0 auto;padding:0 24px;">
              <div style="text-align:center;margin-bottom:32px;">
                <span class="section-tag">用户好评</span>
                <h2 class="section-title" style="margin-top:10px;">来自一线的声音</h2>
              </div>
              <div class="testimonials-grid">
                <div v-for="(t,i) in testimonials" :key="i" class="testimonial-card">
                  <div class="testimonial-quote">&ldquo;</div>
                  <p class="testimonial-content">{{ t.content }}</p>
                  <div class="testimonial-stars">
                    <span v-for="s in t.rating" :key="s" style="color:#FFC107;">&#9733;</span>
                  </div>
                  <div style="display:flex;align-items:center;gap:12px;margin-top:14px;">
                    <div class="testimonial-avatar">{{ t.avatar }}</div>
                    <div>
                      <div class="testimonial-name">{{ t.name }}</div>
                      <div class="testimonial-role">{{ t.role }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ===== 最新动态 ===== -->
          <div class="news-section">
            <div style="max-width:1280px;margin:0 auto;padding:0 24px;">
              <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:28px;">
                <div>
                  <span class="section-tag">平台资讯</span>
                  <h2 class="section-title" style="margin-top:10px;">最新动态</h2>
                  <p class="section-subtitle">平台最新资讯与行业动向</p>
                </div>
                <el-button type="primary" plain @click="navigate('page-community')">更多动态 &rarr;</el-button>
              </div>
              <div class="news-grid">
                <div v-for="n in latestNews" :key="n.id" class="news-card">
                  <div class="news-date-box">
                    <div class="news-date-day">{{ n.date.split('-')[2] }}</div>
                    <div class="news-date-month">{{ n.date.split('-')[1] }}月</div>
                  </div>
                  <div class="news-body">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;">
                      <h4 class="news-title">{{ n.title }}</h4>
                      <el-tag :type="n.tagType" size="small" style="flex-shrink:0;margin-left:12px;">{{ n.tag }}</el-tag>
                    </div>
                    <p class="news-excerpt">{{ n.excerpt }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ===== CTA ===== -->
          <div class="cta-section">
            <div class="cta-inner">
              <h2 class="cta-title">准备好开启具身智能之旅了吗？</h2>
              <p class="cta-desc">免费注册，立即获取 1200+ 数据集、350+ 模型资源，以及 10 小时免费云仿真算力</p>
              <div class="hero-buttons" style="justify-content:center;">
                <el-button type="primary" size="large" @click="handleLogin" class="hero-btn-primary" style="background:#fff;color:var(--primary-blue);border:none;">免费注册</el-button>
                <el-button size="large" @click="navigate('page-course')" class="hero-btn-ghost">观看教程</el-button>
              </div>
            </div>
          </div>

          <!-- ===== 合作伙伴 ===== -->
          <div class="partners-section">
            <div style="max-width:1280px;margin:0 auto;padding:0 24px;">
              <div style="text-align:center;margin-bottom:28px;">
                <span class="section-tag">生态共建</span>
                <h2 class="section-title" style="margin-top:10px;">合作伙伴</h2>
                <p class="section-subtitle">携手行业领军企业，共建具身智能生态</p>
              </div>
              <div class="partners-grid">
                <div class="partner-logo" v-for="p in partners" :key="p">{{ p }}</div>
              </div>
            </div>
          </div>
        </div>
      `,
      setup: function() {
        var navigate = Vue.inject('navigate');
        var appState = Vue.inject('appState');
        var ElMessage = ElementPlus.ElMessage;
        var getIcon = function(key) { return window.AppIcons[key] || ''; };
        var handleLogin = function() {
          appState.isLoggedIn = true;
          ElMessage.success('欢迎加入具身智能众创云空间！');
        };
        return {
          navigate: navigate,
          getIcon: getIcon,
          handleLogin: handleLogin,
          homeStats: D.homeStats,
          coreModules: D.coreModules,
          latestNews: D.latestNews,
          partners: D.partners,
          advantages: D.advantages,
          featuredDatasets: D.featuredDatasets,
          techEcosystem: D.techEcosystem,
          testimonials: D.testimonials,
          trustColors: ['#1565C0','#6A1B9A','#00695C','#E65100'],
          trustNames: ['张','李','王','赵'],
        };
      }
    }
  });
})();
