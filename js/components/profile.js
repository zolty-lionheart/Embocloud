(function() {
  var D = window.AppData;
  var U = window.AppUtils;
  window.AppComponents.push({
    name: 'page-profile',
    definition: {
      template: `
        <div>
          <div class="section-container">
            <div class="profile-header">
              <div class="profile-avatar">{{ appState.userName[0] }}</div>
              <div style="flex:1;">
                <h2 style="font-size:20px;font-weight:700;color:#fff;">{{ appState.userName }}</h2>
                <p style="font-size:13px;color:rgba(255,255,255,0.8);margin-top:3px;">{{ appState.userEmail }} | 认证企业用户 | 账户余额：¥12,580</p>
                <div style="margin-top:10px;display:flex;gap:12px;flex-wrap:wrap;">
                  <el-tag effect="plain" style="color:rgba(255,255,255,0.9);border-color:rgba(255,255,255,0.4);background:transparent;">数据集 23 个</el-tag>
                  <el-tag effect="plain" style="color:rgba(255,255,255,0.9);border-color:rgba(255,255,255,0.4);background:transparent;">模型 8 个</el-tag>
                  <el-tag effect="plain" style="color:rgba(255,255,255,0.9);border-color:rgba(255,255,255,0.4);background:transparent;">订单 15 笔</el-tag>
                </div>
              </div>
            </div>
            <el-tabs v-model="profileTab">
              <el-tab-pane label="个人信息" name="info">
                <el-form :model="profileForm" :rules="profileRules" ref="profileFormRef" label-width="90px" style="max-width:560px;">
                  <el-form-item label="用户名" prop="username"><el-input v-model="profileForm.username"/></el-form-item>
                  <el-form-item label="真实姓名" prop="realName"><el-input v-model="profileForm.realName"/></el-form-item>
                  <el-form-item label="邮箱" prop="email"><el-input v-model="profileForm.email"/></el-form-item>
                  <el-form-item label="手机号" prop="phone"><el-input v-model="profileForm.phone"/></el-form-item>
                  <el-form-item label="所属机构"><el-input v-model="profileForm.org"/></el-form-item>
                  <el-form-item label="研究方向">
                    <el-select v-model="profileForm.research" multiple placeholder="请选择" style="width:100%;">
                      <el-option label="运动规划" value="motion"/>
                      <el-option label="视觉感知" value="vision"/>
                      <el-option label="强化学习" value="rl"/>
                      <el-option label="人机交互" value="hri"/>
                      <el-option label="灵巧手操作" value="dex"/>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="saveProfile">保存修改</el-button>
                    <el-button @click="resetProfile">重置</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="资源管理" name="resources">
                <el-table :data="myResources" border stripe>
                  <el-table-column prop="name" label="资源名称"/>
                  <el-table-column label="类型" width="90"><template #default="{row}"><el-tag :type="row.type==='数据集'?'primary':'success'" size="small">{{ row.type }}</el-tag></template></el-table-column>
                  <el-table-column prop="size" label="大小" width="90"/>
                  <el-table-column prop="uploadDate" label="上传时间" width="130"/>
                  <el-table-column prop="downloads" label="下载量" width="80"/>
                  <el-table-column label="状态" width="90"><template #default="{row}"><el-tag :type="row.approved?'success':'warning'" size="small">{{ row.approved?'已审核':'审核中' }}</el-tag></template></el-table-column>
                  <el-table-column label="操作" width="110">
                    <template #default="{row}">
                      <el-button link type="primary" size="small" @click="ElMessage.info('编辑: ' + row.name)">编辑</el-button>
                      <el-button link type="danger" size="small" @click="ElMessage.warning('删除: ' + row.name)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="订单管理" name="orders">
                <el-table :data="orders" border stripe>
                  <el-table-column prop="id" label="订单号" width="140"/>
                  <el-table-column prop="product" label="商品"/>
                  <el-table-column label="金额" width="110"><template #default="{row}">¥{{ row.amount.toLocaleString() }}</template></el-table-column>
                  <el-table-column prop="date" label="下单时间" width="140"/>
                  <el-table-column label="状态" width="90"><template #default="{row}"><el-tag :type="orderStatusType(row.status)" size="small">{{ row.status }}</el-tag></template></el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="权限设置" name="permissions">
                <el-table :data="permissions" border stripe>
                  <el-table-column prop="module" label="功能模块" width="150"/>
                  <el-table-column label="权限等级" width="110"><template #default="{row}"><el-tag :type="row.permType" size="small">{{ row.permission }}</el-tag></template></el-table-column>
                  <el-table-column prop="expire" label="有效期" width="130"/>
                  <el-table-column prop="remark" label="说明"/>
                  <el-table-column label="操作" width="90">
                    <template #default="{row}">
                      <el-button link type="primary" size="small" @click="ElMessage.info('申请升级: ' + row.module)">申请升级</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      `,
      setup: function() {
        var ref = Vue.ref;
        var reactive = Vue.reactive;
        var computed = Vue.computed;
        var ElMessage = ElementPlus.ElMessage;
        var appState = Vue.inject('appState');

        var profileTab = ref('info');
        var profileForm = reactive({
          username: appState.userName,
          realName: '张某某',
          email: appState.userEmail,
          phone: '13812345678',
          org: '具身智能研究院',
          research: ['motion', 'vision']
        });
        var profileRules = {
          username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
          email: [{ required: true, type: 'email', message: '请输入有效邮箱', trigger: 'blur' }],
          phone: [{ pattern: /^1[3-9]\d{9}$/, message: '请输入有效手机号', trigger: 'blur' }],
        };
        var profileFormRef = ref(null);
        var saveProfile = function() {
          if (!profileFormRef.value) return;
          profileFormRef.value.validate(function(v) {
            if (v) {
              appState.userName = profileForm.username;
              appState.userEmail = profileForm.email;
              ElMessage.success('个人信息已保存');
            }
          });
        };
        var resetProfile = function() {
          if (profileFormRef.value) profileFormRef.value.resetFields();
        };

        var myResources = ref([
          { name: '工厂装配操作数据集', type: '数据集', size: '2.3 GB', uploadDate: '2025-05-10', downloads: 234, approved: true },
          { name: 'UR5e精调模型权重', type: '模型', size: '186 MB', uploadDate: '2025-04-20', downloads: 89, approved: true },
          { name: '双臂协作轨迹数据', type: '数据集', size: '8.6 GB', uploadDate: '2025-05-18', downloads: 12, approved: false },
          { name: '灵巧手抓取策略', type: '模型', size: '92 MB', uploadDate: '2025-05-05', downloads: 56, approved: true },
        ]);

        return {
          ElMessage: ElMessage,
          orderStatusType: U.orderStatusType,
          appState: appState,
          profileTab: profileTab,
          profileForm: profileForm,
          profileRules: profileRules,
          profileFormRef: profileFormRef,
          saveProfile: saveProfile,
          resetProfile: resetProfile,
          myResources: myResources,
          orders: computed(function() { return appState.orders; }),
          permissions: D.permissions,
        };
      }
    }
  });
})();
