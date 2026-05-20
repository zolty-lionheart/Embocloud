(function() {
  var D = window.AppData;
  var U = window.AppUtils;
  window.AppComponents.push({
    name: 'page-community',
    definition: {
      template: `
        <div>
          <div class="page-header"><div class="page-header-inner"><h1>众创社区</h1><p>汇聚具身智能开发者，共享知识与灵感</p></div></div>
          <div class="section-container">
            <div class="community-layout">
              <div>
                <el-tabs v-model="communityTab">
                  <el-tab-pane label="帖子列表" name="posts">
                    <div style="margin-bottom:14px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
                      <div style="display:flex;gap:6px;flex-wrap:wrap;">
                        <el-tag v-for="cat in postCategories" :key="cat" :effect="activePostCategory===cat?'dark':'plain'" style="cursor:pointer;" @click="activePostCategory=cat">{{ cat }}</el-tag>
                      </div>
                      <el-button type="primary" @click="postDialogVisible=true">+ 发帖</el-button>
                    </div>
                    <div v-for="post in filteredPosts" :key="post.id" class="post-item">
                      <div style="display:flex;justify-content:space-between;align-items:flex-start;">
                        <div style="flex:1;">
                          <div class="post-title">{{ post.title }}</div>
                          <div class="post-excerpt">{{ post.excerpt }}</div>
                          <div class="post-meta">
                            <span>👤 {{ post.author }}</span>
                            <span>📅 {{ post.date }}</span>
                            <span>👁 {{ post.views }}</span>
                            <span>💬 {{ post.replies }}</span>
                            <el-tag size="small" :type="post.categoryType">{{ post.category }}</el-tag>
                          </div>
                        </div>
                        <el-button link type="primary" @click="ElMessage.info('查看: ' + post.title)">阅读</el-button>
                      </div>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="问答专区" name="qa">
                    <div v-for="qa in qaList" :key="qa.id" class="post-item">
                      <div style="display:flex;gap:14px;">
                        <div style="text-align:center;min-width:44px;">
                          <div style="font-size:18px;font-weight:700;color:var(--primary-blue);">{{ qa.votes }}</div>
                          <div style="font-size:10px;color:var(--medium-gray);">投票</div>
                          <div style="font-size:16px;font-weight:700;color:var(--dark-gray);margin-top:3px;">{{ qa.answers }}</div>
                          <div style="font-size:10px;color:var(--medium-gray);">回答</div>
                        </div>
                        <div style="flex:1;">
                          <div class="post-title">{{ qa.question }}</div>
                          <div class="post-meta" style="margin-top:6px;">
                            <el-tag v-for="t in qa.tags" :key="t" size="small" style="margin-right:3px;">{{ t }}</el-tag>
                            <span>👤 {{ qa.asker }}</span>
                            <span>📅 {{ qa.date }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="项目展示" name="projects">
                    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:14px;">
                      <el-card v-for="proj in communityProjects" :key="proj.id" shadow="hover" style="cursor:pointer;" @click="ElMessage.info('查看项目: ' + proj.name)">
                        <div style="display:flex;gap:14px;">
                          <div style="font-size:40px;flex-shrink:0;">{{ proj.icon }}</div>
                          <div style="flex:1;">
                            <div style="font-size:14px;font-weight:600;color:var(--dark-gray);margin-bottom:5px;">{{ proj.name }}</div>
                            <div style="font-size:12px;color:var(--medium-gray);margin-bottom:7px;">{{ proj.desc }}</div>
                            <div style="display:flex;gap:4px;flex-wrap:wrap;">
                              <el-tag v-for="tag in proj.tags" :key="tag" size="small" :type="tagTypeMap(tag)">{{ tag }}</el-tag>
                            </div>
                            <div style="margin-top:6px;display:flex;gap:10px;font-size:11px;color:var(--medium-gray);">
                              <span>⭐ {{ proj.stars }}</span><span>🍴 {{ proj.forks }}</span><span>👤 {{ proj.author }}</span>
                            </div>
                          </div>
                        </div>
                      </el-card>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="赛事活动" name="events">
                    <div v-for="evt in communityEvents" :key="evt.id" class="post-item">
                      <div style="display:flex;justify-content:space-between;align-items:flex-start;">
                        <div>
                          <div style="display:flex;align-items:center;gap:8px;margin-bottom:7px;">
                            <span class="post-title" style="margin-bottom:0;">{{ evt.name }}</span>
                            <el-tag :type="evt.statusType" size="small">{{ evt.status }}</el-tag>
                          </div>
                          <div style="font-size:12px;color:var(--medium-gray);margin-bottom:7px;">{{ evt.desc }}</div>
                          <div style="font-size:11px;color:var(--light-gray);">📅 {{ evt.startDate }} — {{ evt.endDate }} | 奖金：{{ evt.prize }} | 参赛：{{ evt.participants }}人</div>
                        </div>
                        <el-button type="primary" size="small" @click="ElMessage.success('已报名: ' + evt.name)">
                          {{ evt.status==='报名中'?'立即报名':'查看详情' }}
                        </el-button>
                      </div>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </div>
              <div>
                <div class="sidebar-widget">
                  <div class="widget-title">热门话题</div>
                  <div class="tag-cloud">
                    <el-tag v-for="t in hotTopics" :key="t" style="cursor:pointer;margin-bottom:5px;" @click="ElMessage.info('话题: ' + t)">{{ t }}</el-tag>
                  </div>
                </div>
                <div class="sidebar-widget">
                  <div class="widget-title">社区达人</div>
                  <div v-for="u in topUsers" :key="u.name" style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
                    <el-avatar :size="32" style="background:var(--primary-blue);flex-shrink:0;">{{ u.name[0] }}</el-avatar>
                    <div style="flex:1;">
                      <div style="font-size:13px;font-weight:600;color:var(--dark-gray);">{{ u.name }}</div>
                      <div style="font-size:11px;color:var(--medium-gray);">{{ u.desc }}</div>
                    </div>
                    <el-tag size="small">Lv.{{ u.level }}</el-tag>
                  </div>
                </div>
              </div>
            </div>
            <!-- Post Dialog -->
            <el-dialog v-model="postDialogVisible" title="发布帖子" width="580px">
              <el-form :model="newPost" :rules="postRules" ref="postFormRef" label-width="70px">
                <el-form-item label="标题" prop="title"><el-input v-model="newPost.title" placeholder="请输入帖子标题"/></el-form-item>
                <el-form-item label="分类" prop="category">
                  <el-select v-model="newPost.category" placeholder="请选择分类" style="width:100%;">
                    <el-option v-for="c in postCategories" :key="c" :label="c" :value="c"/>
                  </el-select>
                </el-form-item>
                <el-form-item label="内容" prop="content"><el-input v-model="newPost.content" type="textarea" :rows="5" placeholder="请输入帖子内容..."/></el-form-item>
              </el-form>
              <template #footer>
                <el-button @click="postDialogVisible=false">取消</el-button>
                <el-button type="primary" @click="submitPost">发布</el-button>
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
        var appState = Vue.inject('appState');

        var communityTab = ref('posts');
        var activePostCategory = ref('全部');
        var postDialogVisible = ref(false);
        var newPost = reactive({ title: '', category: '', content: '' });
        var postRules = {
          title: [{ required: true, message: '请输入标题', trigger: 'blur' }, { min: 5, message: '标题至少5个字', trigger: 'blur' }],
          category: [{ required: true, message: '请选择分类', trigger: 'change' }],
          content: [{ required: true, message: '请输入内容', trigger: 'blur' }, { min: 20, message: '内容至少20个字', trigger: 'blur' }],
        };
        var postFormRef = ref(null);
        var posts = ref(D.posts.slice());

        var filteredPosts = computed(function() {
          if (activePostCategory.value === '全部') return posts.value;
          return posts.value.filter(function(p) { return p.category === activePostCategory.value; });
        });

        var submitPost = function() {
          if (!postFormRef.value) return;
          postFormRef.value.validate(function(valid) {
            if (valid) {
              posts.value.unshift({
                id: Date.now(),
                title: newPost.title,
                excerpt: newPost.content.slice(0, 60) + '...',
                author: appState.userName,
                date: new Date().toISOString().slice(0, 10),
                views: '1',
                replies: 0,
                category: newPost.category,
                categoryType: 'primary'
              });
              ElMessage.success('帖子发布成功！');
              postDialogVisible.value = false;
              newPost.title = ''; newPost.category = ''; newPost.content = '';
            }
          });
        };

        return {
          ElMessage: ElMessage,
          tagTypeMap: U.tagTypeMap,
          communityTab: communityTab,
          activePostCategory: activePostCategory,
          postDialogVisible: postDialogVisible,
          postCategories: D.postCategories,
          newPost: newPost,
          postRules: postRules,
          postFormRef: postFormRef,
          filteredPosts: filteredPosts,
          qaList: D.qaList,
          communityProjects: D.communityProjects,
          communityEvents: D.communityEvents,
          hotTopics: D.hotTopics,
          topUsers: D.topUsers,
          submitPost: submitPost,
        };
      }
    }
  });
})();
