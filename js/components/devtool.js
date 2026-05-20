(function() {
  var D = window.AppData;
  window.AppComponents.push({
    name: 'page-devtool',
    definition: {
      template: `
        <div>
          <div class="page-header"><div class="page-header-inner"><h1>研发工具</h1><p>智能选型引导，快速找到最适合您的机器人方案</p></div></div>
          <div class="section-container">
            <div class="devtool-layout">
              <div class="panel-card">
                <h3 style="font-size:15px;font-weight:600;color:var(--dark-gray);margin-bottom:18px;">🔧 需求智能选型</h3>
                <el-form :model="devtoolForm" :rules="devtoolRules" ref="devtoolFormRef" label-width="75px">
                  <el-form-item label="应用场景" prop="scene">
                    <el-select v-model="devtoolForm.scene" placeholder="请选择" style="width:100%;">
                      <el-option v-for="o in sceneOptions" :key="o.value" :label="o.label" :value="o.value"/>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="负载(kg)" prop="payload">
                    <el-input-number v-model="devtoolForm.payload" :min="0" :max="500" style="width:100%;"/>
                  </el-form-item>
                  <el-form-item label="自由度" prop="dof">
                    <el-select v-model="devtoolForm.dof" placeholder="请选择" style="width:100%;">
                      <el-option v-for="o in dofOptions" :key="o.value" :label="o.label" :value="o.value"/>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="精度要求" prop="precision">
                    <el-select v-model="devtoolForm.precision" placeholder="重复定位精度" style="width:100%;">
                      <el-option v-for="o in precisionOptions" :key="o.value" :label="o.label" :value="o.value"/>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="预算范围" prop="budget">
                    <el-select v-model="devtoolForm.budget" placeholder="请选择" style="width:100%;">
                      <el-option v-for="o in budgetOptions" :key="o.value" :label="o.label" :value="o.value"/>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="备注">
                    <el-input v-model="devtoolForm.remark" type="textarea" :rows="2" placeholder="其他特殊需求..."/>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="runIntelligentSelection" style="width:100%;">🤖 AI 智能选型</el-button>
                  </el-form-item>
                </el-form>
                <el-divider>线下测试预约</el-divider>
                <el-form :model="appointForm" label-width="75px">
                  <el-form-item label="预约日期">
                    <el-date-picker v-model="appointForm.date" type="date" placeholder="选择日期" style="width:100%;" :disabled-date="d=>d<new Date()"/>
                  </el-form-item>
                  <el-form-item label="测试中心">
                    <el-select v-model="appointForm.location" placeholder="选择地点" style="width:100%;">
                      <el-option v-for="o in locationOptions" :key="o.value" :label="o.label" :value="o.value"/>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="submitAppointment" style="width:100%;">提交预约</el-button>
                  </el-form-item>
                </el-form>
              </div>
              <div class="panel-card">
                <h3 style="font-size:15px;font-weight:600;color:var(--dark-gray);margin-bottom:18px;">📋 选型结果</h3>
                <div v-if="!selectionResults.length" class="result-placeholder">
                  <div style="font-size:44px;margin-bottom:10px;">🔍</div>
                  <div>填写需求后，点击「AI 智能选型」</div>
                  <div style="font-size:12px;color:var(--light-gray);margin-top:4px;">系统将为您推荐最优方案</div>
                </div>
                <div v-else>
                  <el-alert title="已为您推荐以下方案，综合评分从高到低排列" type="success" show-icon style="margin-bottom:14px;"/>
                  <div style="display:flex;flex-direction:column;gap:14px;">
                    <el-card v-for="r in selectionResults" :key="r.id" shadow="hover">
                      <div style="display:flex;justify-content:space-between;align-items:flex-start;">
                        <div style="flex:1;">
                          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
                            <span style="font-size:15px;font-weight:700;color:var(--dark-gray);">{{ r.name }}</span>
                            <el-tag type="success" size="small">推荐指数 {{ r.score }}</el-tag>
                          </div>
                          <el-descriptions :column="2" size="small">
                            <el-descriptions-item label="负载">{{ r.payload }}</el-descriptions-item>
                            <el-descriptions-item label="自由度">{{ r.dof }}</el-descriptions-item>
                            <el-descriptions-item label="精度">{{ r.precision }}</el-descriptions-item>
                            <el-descriptions-item label="参考价格">{{ r.price }}</el-descriptions-item>
                          </el-descriptions>
                          <div style="margin-top:6px;font-size:12px;color:var(--medium-gray);">{{ r.reason }}</div>
                        </div>
                        <div style="margin-left:14px;display:flex;flex-direction:column;gap:6px;">
                          <el-button type="primary" size="small" @click="navigate('page-simulation')">仿真验证</el-button>
                          <el-button size="small" @click="navigate('page-mall')">商城采购</el-button>
                        </div>
                      </div>
                    </el-card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
      setup: function() {
        var ref = Vue.ref;
        var reactive = Vue.reactive;
        var ElMessage = ElementPlus.ElMessage;
        var navigate = Vue.inject('navigate');

        var selectionResults = ref([]);
        var devtoolForm = reactive({ scene: '', payload: 5, dof: '6', precision: '0.1mm', budget: '10-50', remark: '' });
        var devtoolRules = {
          scene: [{ required: true, message: '请选择应用场景', trigger: 'change' }],
          dof: [{ required: true, message: '请选择自由度', trigger: 'change' }],
          precision: [{ required: true, message: '请选择精度要求', trigger: 'change' }],
          budget: [{ required: true, message: '请选择预算范围', trigger: 'change' }],
        };
        var devtoolFormRef = ref(null);
        var appointForm = reactive({ date: null, location: '' });

        var runIntelligentSelection = function() {
          if (!devtoolFormRef.value) return;
          devtoolFormRef.value.validate(function(valid) {
            if (valid) {
              selectionResults.value = [
                { id: 1, name: 'UR10e 协作机械臂', score: '★★★★★ 98分', payload: '12.5kg', dof: '6 DOF', precision: '±0.05mm', price: '¥28-35万', reason: '负载能力强，精度满足要求，配套生态完善，ROS2支持出色，推荐首选。' },
                { id: 2, name: 'ABB CRB 15000', score: '★★★★☆ 91分', payload: '10kg', dof: '6 DOF', precision: '±0.05mm', price: '¥32-40万', reason: '新一代协作机器人，安全性出色，适合与人协作的工业场景，到货周期短。' },
                { id: 3, name: 'KUKA LBR iisy 11', score: '★★★★☆ 87分', payload: '11kg', dof: '7 DOF', precision: '±0.06mm', price: '¥35-45万', reason: '7自由度冗余设计，适合复杂工位，操作灵活性高，但价格略高于预算上限。' },
              ];
              ElMessage.success('AI 选型完成，已为您推荐 3 款方案');
            }
          });
        };

        var submitAppointment = function() {
          if (!appointForm.date || !appointForm.location) { ElMessage.warning('请填写预约日期和测试地点'); return; }
          ElMessage.success('预约成功！工作人员将在24小时内联系您确认。');
          appointForm.date = null; appointForm.location = '';
        };

        return {
          navigate: navigate,
          ElMessage: ElMessage,
          selectionResults: selectionResults,
          devtoolForm: devtoolForm,
          devtoolRules: devtoolRules,
          devtoolFormRef: devtoolFormRef,
          appointForm: appointForm,
          sceneOptions: D.devtoolSceneOptions,
          dofOptions: D.devtoolDofOptions,
          precisionOptions: D.devtoolPrecisionOptions,
          budgetOptions: D.devtoolBudgetOptions,
          locationOptions: D.devtoolLocationOptions,
          runIntelligentSelection: runIntelligentSelection,
          submitAppointment: submitAppointment,
        };
      }
    }
  });
})();
