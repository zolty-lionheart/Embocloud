/**
 * 测试场地预约页面组件
 */
(function() {
  var D = window.AppData;

  window.AppComponents.push({
    name: 'page-testfield',
    definition: {
      template: '\
        <div>\
          <div class="page-header">\
            <div class="page-header-inner">\
              <h1>测试场地预约</h1>\
              <p>专业机器人测试场地，覆盖基础到极限全场景，电话预约即用</p>\
            </div>\
          </div>\
          <div class="section-container">\
            <div class="testfield-grid">\
              <div v-for="f in fields" :key="f.id" class="testfield-card">\
                <div class="testfield-card-head">\
                  <span class="testfield-icon">{{ f.icon }}</span>\
                  <div>\
                    <h3 class="testfield-name">{{ f.name }}</h3>\
                    <div class="testfield-tags">\
                      <el-tag v-for="t in f.tags" :key="t" size="small" effect="plain">{{ t }}</el-tag>\
                    </div>\
                  </div>\
                </div>\
                <p class="testfield-desc">{{ f.desc }}</p>\
                <div class="testfield-features">\
                  <div v-for="(feat, i) in f.features" :key="i" class="testfield-feature-item">\
                    <span class="testfield-feature-dot"></span>\
                    <span>{{ feat }}</span>\
                  </div>\
                </div>\
                <div class="testfield-footer">\
                  <div class="testfield-info">\
                    <span class="testfield-location">📍 {{ f.location }}</span>\
                    <span class="testfield-price">💰 {{ f.price }}</span>\
                  </div>\
                  <a :href="\'tel:\' + f.phone" class="testfield-phone-btn">\
                    📞 {{ f.phone }}\
                  </a>\
                </div>\
              </div>\
            </div>\
            <!-- 底部预约提示 -->\
            <div class="testfield-notice">\
              <span style="font-size:24px;">📞</span>\
              <div>\
                <h4>预约须知</h4>\
                <p>请提前 3 个工作日致电预约，测试当天需携带企业营业执照或个人身份证件。部分场地需技术对接，预约时请说明测试需求与设备型号。</p>\
              </div>\
            </div>\
          </div>\
        </div>',
      setup: function() {
        var ref = Vue.ref;
        var fields = ref(D.testFields);
        return { fields: fields };
      }
    }
  });
})();
