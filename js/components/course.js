(function() {
  var D = window.AppData;
  window.AppComponents.push({
    name: 'page-course',
    definition: {
      template: `
        <div>
          <div class="page-header"><div class="page-header-inner"><h1>课程中心</h1><p>精选哔哩哔哩真实机器人课程，点击直达B站学习</p></div></div>
          <div class="section-container">
            <!-- 分类筛选 -->
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;flex-wrap:wrap;gap:12px;">
              <div style="display:flex;gap:8px;flex-wrap:wrap;">
                <el-button v-for="cat in courseCategories" :key="cat" :type="activeCourseCategory===cat?'primary':''" size="small" round @click="activeCourseCategory=cat">{{ cat }}</el-button>
              </div>
              <el-input v-model="courseSearch" placeholder="搜索课程或UP主..." prefix-icon="Search" style="width:240px;" clearable />
            </div>
            <!-- 课程 Grid -->
            <div class="course-grid">
              <a v-for="(c, idx) in filteredCourses" :key="c.id" :href="c.url" target="_blank" rel="noopener" style="text-decoration:none;" class="course-link">
                <div class="course-card">
                  <div class="course-cover-wrap">
                    <img :src="c.cover" :alt="c.title" class="course-cover" loading="lazy" @error="handleImgError($event, c.id)"/>
                    <div v-if="idx < 3" class="course-rank-badge">TOP{{ idx + 1 }}</div>
                    <div class="course-cover-overlay">
                      <svg viewBox="0 0 24 24" width="48" height="48" fill="white" opacity="0.9"><polygon points="10,6 20,12 10,18"/></svg>
                    </div>
                  </div>
                  <div class="course-body">
                    <div class="course-title">{{ c.title }}</div>
                    <div class="course-up-row">
                      <div class="course-avatar" :style="{ background: avatarColor(c.uploader) }">{{ c.uploader.charAt(0) }}</div>
                      <span class="course-up">{{ c.uploader }}</span>
                      <el-tag size="small" :type="c.levelType" effect="light" round>{{ c.level }}</el-tag>
                    </div>
                    <div class="course-stats-row">
                      <span class="course-stat"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5,3 19,12 5,21"/></svg> {{ c.views }}</span>
                      <span class="course-stat"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg> {{ c.category }}</span>
                    </div>
                    <div class="course-desc">{{ c.desc }}</div>
                  </div>
                </div>
              </a>
            </div>
            <!-- 空状态 -->
            <div v-if="filteredCourses.length === 0" style="text-align:center;padding:60px 0;">
              <el-empty description="没有找到匹配的课程" />
            </div>
          </div>
        </div>
      `,
      setup: function() {
        var ref = Vue.ref;
        var computed = Vue.computed;

        var activeCourseCategory = ref('全部');
        var courseSearch = ref('');
        var courses = ref(D.courses.slice());

        var filteredCourses = computed(function() {
          return courses.value.filter(function(c) {
            var catOk = activeCourseCategory.value === '全部' || c.category === activeCourseCategory.value;
            var kwOk = !courseSearch.value || c.title.includes(courseSearch.value) || c.uploader.includes(courseSearch.value) || c.desc.includes(courseSearch.value);
            return catOk && kwOk;
          });
        });

        var handleImgError = function(e, id) {
          e.target.src = 'https://picsum.photos/400/225?random=' + id;
        };

        var avatarColors = ['#1565C0','#6A1B9A','#00695C','#E65100','#0D47A1','#BF360C','#1B5E20','#4527A0','#0277BD','#4E342E'];
        var avatarColor = function(name) {
          var hash = 0;
          for (var i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
          return avatarColors[Math.abs(hash) % avatarColors.length];
        };

        return {
          activeCourseCategory: activeCourseCategory,
          courseSearch: courseSearch,
          courseCategories: D.courseCategories,
          filteredCourses: filteredCourses,
          handleImgError: handleImgError,
          avatarColor: avatarColor,
        };
      }
    }
  });
})();
