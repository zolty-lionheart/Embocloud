(function() {
  var D = window.AppData;
  var U = window.AppUtils;
  window.AppComponents.push({
    name: 'page-mall',
    definition: {
      template: `
        <div>
          <div class="page-header"><div class="page-header-inner"><h1>供应链商城</h1><p>精选优质机器人零部件与整机 — 真实产品，官方正品</p></div></div>
          <div class="section-container">

            <!-- Stats -->
            <div class="ds-stats-bar" style="margin-bottom:20px;">
              <div class="ds-stat-item">
                <div class="ds-stat-num">{{ mallProducts.length }}</div>
                <div class="ds-stat-label">在售商品</div>
              </div>
              <div class="ds-stat-item">
                <div class="ds-stat-num">5</div>
                <div class="ds-stat-label">商品分类</div>
              </div>
              <div class="ds-stat-item">
                <div class="ds-stat-num">12</div>
                <div class="ds-stat-label">合作品牌</div>
              </div>
              <div class="ds-stat-item">
                <div class="ds-stat-num">99.2%</div>
                <div class="ds-stat-label">好评率</div>
              </div>
            </div>

            <div class="mall-layout">
              <div class="mall-sidebar">
                <div style="font-size:13px;font-weight:600;color:var(--dark-gray);padding-bottom:10px;border-bottom:2px solid var(--border-color);margin-bottom:10px;">商品分类</div>
                <el-tree :data="mallCategoryTree" :props="{children:'children',label:'label'}" default-expand-all @node-click="handleCategoryClick"/>
              </div>
              <div>
                <div style="background:#fff;border-radius:var(--radius);padding:14px;box-shadow:var(--shadow);margin-bottom:14px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
                  <div style="display:flex;gap:10px;align-items:center;">
                    <el-input v-model="mallSearch" placeholder="搜索商品名称/品牌/规格..." prefix-icon="Search" style="width:280px;" clearable @clear="mallSearch=''"/>
                    <el-select v-model="mallSort" style="width:130px;">
                      <el-option label="综合排序" value="default"/>
                      <el-option label="价格升序" value="price_asc"/>
                      <el-option label="价格降序" value="price_desc"/>
                      <el-option label="销量最高" value="sales"/>
                    </el-select>
                  </div>
                  <el-badge :value="cart.length" :hidden="!cart.length">
                    <el-button type="primary" plain @click="cartVisible=true">🛒 购物车</el-button>
                  </el-badge>
                </div>
                <div class="mall-grid">
                  <div v-for="p in sortedProducts" :key="p.id" class="mall-card">
                    <div class="mall-card-img">
                      <img :src="p.img" :alt="p.name" loading="lazy" @error="handleImgError"/>
                      <div class="mall-card-brand">{{ p.brand }}</div>
                    </div>
                    <div class="mall-card-body">
                      <div class="mall-card-name">{{ p.name }}</div>
                      <div class="mall-card-spec">{{ p.spec }}</div>
                      <div class="mall-card-price-row">
                        <div class="mall-card-price">¥{{ p.price.toLocaleString() }}</div>
                        <span class="mall-card-orig">¥{{ p.originalPrice.toLocaleString() }}</span>
                        <span class="mall-card-discount" v-if="Math.round((1 - p.price/p.originalPrice)*100) >= 5">-{{ Math.round((1 - p.price/p.originalPrice)*100) }}%</span>
                      </div>
                      <div class="mall-card-meta">
                        <span>已售 {{ p.sales }}</span>
                        <span>⭐ {{ p.rating }}</span>
                      </div>
                      <el-button type="primary" size="small" @click="addToCart(p)" style="width:100%;margin-top:8px;">加入购物车</el-button>
                    </div>
                  </div>
                </div>
                <div style="margin-top:20px;display:flex;justify-content:center;">
                  <el-pagination v-model:current-page="mallPage" :page-size="12" :total="filteredProducts.length" layout="prev,pager,next" background/>
                </div>
              </div>
            </div>
            <!-- Cart Drawer -->
            <el-drawer v-model="cartVisible" title="🛒 购物车" direction="rtl" size="480px">
              <div v-if="!cart.length" style="text-align:center;padding:60px 0;color:var(--light-gray);">
                <div style="font-size:44px;margin-bottom:10px;">🛒</div>
                <div>购物车空空如也</div>
              </div>
              <div v-else>
                <el-table :data="cart" border>
                  <el-table-column prop="name" label="商品" width="150"/>
                  <el-table-column label="单价" width="100"><template #default="{row}">¥{{ row.price.toLocaleString() }}</template></el-table-column>
                  <el-table-column label="数量" width="110"><template #default="{row}"><el-input-number v-model="row.qty" :min="1" size="small"/></template></el-table-column>
                  <el-table-column label="操作" width="60"><template #default="{row}"><el-button link type="danger" size="small" @click="removeFromCart(row)">删</el-button></template></el-table-column>
                </el-table>
                <div style="text-align:right;padding:14px 0;font-size:15px;font-weight:700;color:var(--primary-blue);">合计：¥{{ cartTotal.toLocaleString() }}</div>
                <el-button type="primary" @click="checkout" style="width:100%;height:42px;font-size:15px;">结算下单</el-button>
              </div>
            </el-drawer>
            <!-- Orders -->
            <div style="margin-top:28px;background:#fff;border-radius:var(--radius);padding:20px;box-shadow:var(--shadow);">
              <h3 style="font-size:15px;font-weight:600;color:var(--dark-gray);margin-bottom:14px;">订单管理</h3>
              <el-table :data="orders" border stripe>
                <el-table-column prop="id" label="订单号" width="140"/>
                <el-table-column prop="product" label="商品"/>
                <el-table-column label="金额" width="110"><template #default="{row}">¥{{ row.amount.toLocaleString() }}</template></el-table-column>
                <el-table-column prop="date" label="下单时间" width="140"/>
                <el-table-column label="状态" width="90"><template #default="{row}"><el-tag :type="orderStatusType(row.status)" size="small">{{ row.status }}</el-tag></template></el-table-column>
                <el-table-column label="操作" width="110">
                  <template #default="{row}">
                    <el-button link type="primary" size="small" @click="ElMessage.info('订单: ' + row.id)">详情</el-button>
                    <el-button v-if="row.status==='待支付'" link type="success" size="small" @click="payOrder(row)">支付</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      `,
      setup: function() {
        var ref = Vue.ref;
        var computed = Vue.computed;
        var ElMessage = ElementPlus.ElMessage;
        var appState = Vue.inject('appState');

        var mallSearch = ref('');
        var mallSort = ref('default');
        var mallPage = ref(1);
        var cartVisible = ref(false);

        var handleImgError = function(e) {
          e.target.src = 'https://placehold.co/400x300/e8ecf1/8896a7?text=' + encodeURIComponent(e.target.alt || '暂无图片');
        };

        var filteredProducts = computed(function() {
          var list = D.mallProducts;
          if (mallSearch.value) {
            var key = mallSearch.value.toLowerCase();
            list = list.filter(function(p) {
              return p.name.toLowerCase().includes(key) || (p.brand && p.brand.toLowerCase().includes(key)) || p.spec.toLowerCase().includes(key);
            });
          }
          return list;
        });

        var sortedProducts = computed(function() {
          var list = filteredProducts.value.slice();
          if (mallSort.value === 'price_asc') list.sort(function(a, b) { return a.price - b.price; });
          else if (mallSort.value === 'price_desc') list.sort(function(a, b) { return b.price - a.price; });
          else if (mallSort.value === 'sales') list.sort(function(a, b) { return parseFloat(b.sales) - parseFloat(a.sales); });
          var start = (mallPage.value - 1) * 12;
          return list.slice(start, start + 12);
        });

        var cartTotal = computed(function() {
          return appState.cart.reduce(function(s, i) { return s + i.price * i.qty; }, 0);
        });

        var addToCart = function(p) {
          var exist = appState.cart.find(function(i) { return i.id === p.id; });
          if (exist) { exist.qty++; ElMessage.success('已增加数量，当前' + exist.qty + '件'); return; }
          appState.cart.push(Object.assign({}, p, { qty: 1 }));
          ElMessage.success('已加入购物车');
        };

        var removeFromCart = function(item) {
          appState.cart = appState.cart.filter(function(i) { return i.id !== item.id; });
        };

        var checkout = function() {
          ElMessage.success('订单提交成功！将在3个工作日内发货。');
          appState.orders.unshift({ id: 'ORD-2025' + Date.now().toString().slice(-6), product: '商城采购订单', amount: cartTotal.value, date: new Date().toLocaleDateString(), status: '待支付' });
          appState.cart = [];
          cartVisible.value = false;
        };

        var payOrder = function(order) { order.status = '配送中'; ElMessage.success('订单 ' + order.id + ' 支付成功'); };

        var handleCategoryClick = function(n) {
          if (n.isLeaf) mallSearch.value = n.label;
          else mallSearch.value = '';
        };

        return {
          ElMessage: ElMessage,
          orderStatusType: U.orderStatusType,
          mallProducts: D.mallProducts,
          mallSearch: mallSearch,
          mallSort: mallSort,
          mallPage: mallPage,
          cartVisible: cartVisible,
          cart: computed(function() { return appState.cart; }),
          orders: computed(function() { return appState.orders; }),
          mallCategoryTree: D.mallCategoryTree,
          filteredProducts: filteredProducts,
          sortedProducts: sortedProducts,
          cartTotal: cartTotal,
          addToCart: addToCart,
          removeFromCart: removeFromCart,
          checkout: checkout,
          payOrder: payOrder,
          handleCategoryClick: handleCategoryClick,
          handleImgError: handleImgError,
        };
      }
    }
  });
})();
