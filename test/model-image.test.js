/**
 * QA 测试：模型库卡片图片显示功能
 * 测试工程师改动：将 URDF 模型库卡片的 emoji 图标替换为图片显示
 *
 * 运行：node test/model-image.test.js
 */
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT = path.resolve(__dirname, '..');
let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log('  ✓ ' + name);
  } catch (e) {
    failed++;
    console.log('  ✗ ' + name);
    console.log('      ' + e.message);
  }
}

// ── 模拟浏览器环境，加载 data.js ──
global.window = {};
require(path.join(ROOT, 'js/data.js'));
const D = global.window.AppData;

console.log('\n========== 模型库卡片图片显示功能 — QA 测试 ==========\n');

// ═══════════════════════════════════════════════════════
//  1. data.js 数据完整性
// ═══════════════════════════════════════════════════════
console.log('[1] data.js 数据完整性');

test('Unitree Go1 (id:1) 拥有 image 字段', () => {
  const go1 = D.urdfModels.find(m => m.id === 1);
  assert.ok(go1, 'Unitree Go1 模型不存在');
  assert.ok(go1.image, 'Unitree Go1 缺少 image 字段');
});

test('Unitree Go1 image 路径正确', () => {
  const go1 = D.urdfModels.find(m => m.id === 1);
  assert.strictEqual(go1.image, 'models/images/quadruped/unitree_go1.png');
});

test('Unitree Go1 icon 字段未被删除（保留 emoji 回退）', () => {
  const go1 = D.urdfModels.find(m => m.id === 1);
  assert.strictEqual(go1.icon, '🐕');
});

test('其他 URDF 模型没有 image 字段（保留 emoji 回退）', () => {
  const others = D.urdfModels.filter(m => m.id !== 1);
  others.forEach(m => {
    assert.ok(m.image === undefined, `模型 ${m.name} (id:${m.id}) 不应有 image 字段`);
  });
});

test('所有 URDF 模型都有 icon 字段', () => {
  D.urdfModels.forEach(m => {
    assert.ok(m.icon, `模型 ${m.name} (id:${m.id}) 缺少 icon 字段`);
  });
});

test('所有 URDF 模型都有 file 字段（用于下载/预览）', () => {
  D.urdfModels.forEach(m => {
    assert.ok(m.file, `模型 ${m.name} (id:${m.id}) 缺少 file 字段`);
  });
});

test('AI 模型没有 image 字段（仍用 emoji）', () => {
  D.aiModels.forEach(m => {
    assert.ok(m.image === undefined, `AI 模型 ${m.name} 不应有 image 字段`);
  });
});

test('AI 模型都有 icon 字段', () => {
  D.aiModels.forEach(m => {
    assert.ok(m.icon, `AI 模型 ${m.name} 缺少 icon 字段`);
  });
});

// ═══════════════════════════════════════════════════════
//  2. model.js 模板正确性
// ═══════════════════════════════════════════════════════
console.log('\n[2] model.js 模板正确性');

const modelJs = fs.readFileSync(path.join(ROOT, 'js/components/model.js'), 'utf8');

test('URDF 卡片使用 v-if="m.image" 条件渲染图片', () => {
  assert.ok(modelJs.indexOf('v-if="m.image"') >= 0, '未找到 v-if="m.image"');
});

test('URDF 卡片图片使用 :src="m.image" 绑定', () => {
  assert.ok(modelJs.indexOf(':src="m.image"') >= 0, '未找到 :src="m.image"');
});

test('URDF 卡片图片使用 :alt="m.name" 设置 alt', () => {
  assert.ok(modelJs.indexOf(':alt="m.name"') >= 0, '未找到 :alt="m.name"');
});

test('URDF 卡片图片使用 model-card-photo 样式类', () => {
  assert.ok(modelJs.indexOf('class="model-card-photo"') >= 0, '未找到 class="model-card-photo"');
});

test('URDF 卡片 v-else 回退到 emoji {{ m.icon }}', () => {
  const idx = modelJs.indexOf('v-if="m.image"');
  const after = modelJs.slice(idx, idx + 300);
  assert.ok(after.indexOf('v-else') >= 0, '未找到 v-else 回退');
  assert.ok(after.indexOf('{{ m.icon }}') >= 0, 'v-else 未回退到 {{ m.icon }}');
});

test('详情弹窗使用 v-if="detailModel.image" 条件渲染', () => {
  assert.ok(modelJs.indexOf('v-if="detailModel.image"') >= 0, '未找到 v-if="detailModel.image"');
});

test('详情弹窗图片使用 :src="detailModel.image" 绑定', () => {
  assert.ok(modelJs.indexOf(':src="detailModel.image"') >= 0, '未找到 :src="detailModel.image"');
});

test('详情弹窗 v-else 回退到 emoji {{ detailModel.icon }}', () => {
  const idx = modelJs.indexOf('v-if="detailModel.image"');
  const after = modelJs.slice(idx, idx + 300);
  assert.ok(after.indexOf('v-else') >= 0, '详情弹窗未找到 v-else 回退');
  assert.ok(after.indexOf('{{ detailModel.icon }}') >= 0, '详情弹窗 v-else 未回退到 {{ detailModel.icon }}');
});

test('AI 模型卡片未被修改（仍用 emoji {{ m.icon }}）', () => {
  // AI 模型卡片在 aiModels 的 v-for 中，使用 model-card-img 但不使用 image 条件
  // 定位 aiModels 的 v-for 区块
  const aiBlockIdx = modelJs.indexOf('v-for="m in aiModels"');
  assert.ok(aiBlockIdx >= 0, '未找到 AI 模型 v-for');
  const aiBlock = modelJs.slice(aiBlockIdx, aiBlockIdx + 400);
  assert.ok(aiBlock.indexOf('{{ m.icon }}') >= 0, 'AI 模型卡片未使用 {{ m.icon }}');
  assert.ok(aiBlock.indexOf('v-if="m.image"') === -1, 'AI 模型卡片不应有 v-if="m.image"');
});

test('v-if/v-else 在 URDF 卡片中成对出现（adjacent siblings）', () => {
  // URDF 卡片的 v-if 在 aiModels 之前
  const urdfIfIdx = modelJs.indexOf('v-if="m.image"');
  assert.ok(urdfIfIdx >= 0);
  const segment = modelJs.slice(urdfIfIdx, urdfIfIdx + 200);
  // v-if 元素后应紧接 v-else 元素
  const ifClose = segment.indexOf('/>');
  const afterClose = segment.slice(ifClose);
  assert.ok(afterClose.indexOf('v-else') >= 0, 'v-if 后未紧接 v-else');
});

// ═══════════════════════════════════════════════════════
//  3. Vue 模板字符串转义格式检查（反斜杠续行）
// ═══════════════════════════════════════════════════════
console.log('\n[3] Vue 模板字符串转义格式');

test('模板字符串以反斜杠续行（无断行错误）', () => {
  // model.js 已通过 node --check 语法校验，此处再确认 template 字符串可正常解析
  // 模拟执行 model.js 提取 template
  global.window.AppComponents = [];
  global.window.AppData = D;
  global.window.AppUtils = global.window.AppUtils || {};
  global.ElementPlus = { ElMessage: function() {} };
  global.Vue = { ref: () => ({value:null}), computed: fn => ({value: fn()}) };
  require(path.join(ROOT, 'js/components/model.js'));
  const comp = global.window.AppComponents.find(c => c.name === 'page-model');
  assert.ok(comp, 'page-model 组件未注册');
  assert.ok(typeof comp.definition.template === 'string', 'template 不是字符串');
  assert.ok(comp.definition.template.length > 100, 'template 内容过短');
});

test('template 中 image 条件渲染标签闭合正确', () => {
  const comp = global.window.AppComponents.find(c => c.name === 'page-model');
  const tpl = comp.definition.template;
  // 验证 <img ... /> 自闭合
  const imgMatches = tpl.match(/<img[^>]*\/>/g) || [];
  assert.ok(imgMatches.length >= 2, '应至少有 2 个 <img /> 自闭合标签（卡片+详情）');
  imgMatches.forEach((m, i) => {
    assert.ok(m.endsWith('/>'), `第 ${i+1} 个 img 标签未正确自闭合`);
  });
});

// ═══════════════════════════════════════════════════════
//  4. style.css 样式正确性
// ═══════════════════════════════════════════════════════
console.log('\n[4] style.css 样式正确性');

const css = fs.readFileSync(path.join(ROOT, 'css/style.css'), 'utf8');

test('.model-card-photo 样式已定义', () => {
  assert.ok(css.indexOf('.model-card-photo') >= 0, '未找到 .model-card-photo 样式');
});

test('.model-card-photo 使用 object-fit:cover', () => {
  const ruleMatch = css.match(/\.model-card-img\s+\.model-card-photo\s*\{([^}]*)\}/);
  assert.ok(ruleMatch, '未找到 .model-card-img .model-card-photo 规则');
  const rule = ruleMatch[1];
  assert.ok(rule.indexOf('width:100%') >= 0, '缺少 width:100%');
  assert.ok(rule.indexOf('height:100%') >= 0, '缺少 height:100%');
  assert.ok(rule.indexOf('object-fit:cover') >= 0, '缺少 object-fit:cover');
  assert.ok(rule.indexOf('display:block') >= 0, '缺少 display:block');
});

test('.model-card-photo 规则正确嵌套在 .model-card-img 下（不影响现有样式）', () => {
  // 验证是后代选择器 .model-card-img .model-card-photo
  assert.ok(css.indexOf('.model-card-img .model-card-photo') >= 0,
    '应为后代选择器 .model-card-img .model-card-photo');
});

test('现有 .model-card-img 基础样式未被破坏', () => {
  const baseMatch = css.match(/\.model-card-img\s*\{([^}]*)\}/);
  assert.ok(baseMatch, '未找到 .model-card-img 基础样式');
  const base = baseMatch[1];
  assert.ok(base.indexOf('height:120px') >= 0, '.model-card-img 基础 height:120px 丢失');
  assert.ok(base.indexOf('display:flex') >= 0, '.model-card-img 基础 display:flex 丢失');
});

test('CSS 语法：花括号配平', () => {
  const opens = (css.match(/{/g) || []).length;
  const closes = (css.match(/}/g) || []).length;
  assert.strictEqual(opens, closes, `CSS 花括号不配平：{ ${opens} 个 vs } ${closes} 个`);
});

// ═══════════════════════════════════════════════════════
//  5. 图片文件存在性
// ═══════════════════════════════════════════════════════
console.log('\n[5] 图片文件存在性');

test('models/images/quadruped/unitree_go1.png 文件存在', () => {
  const imgPath = path.join(ROOT, 'models/images/quadruped/unitree_go1.png');
  assert.ok(fs.existsSync(imgPath), '图片文件不存在: ' + imgPath);
});

test('图片文件非空且为有效 PNG', () => {
  const imgPath = path.join(ROOT, 'models/images/quadruped/unitree_go1.png');
  const stat = fs.statSync(imgPath);
  assert.ok(stat.size > 0, '图片文件为空');
  // PNG 文件头魔数：89 50 4E 47
  const buf = fs.readFileSync(imgPath);
  assert.strictEqual(buf[0], 0x89, 'PNG 文件头第1字节不正确');
  assert.strictEqual(buf[1], 0x50, 'PNG 文件头第2字节不正确 (P)');
  assert.strictEqual(buf[2], 0x4E, 'PNG 文件头第3字节不正确 (N)');
  assert.strictEqual(buf[3], 0x47, 'PNG 文件头第4字节不正确 (G)');
});

// ═══════════════════════════════════════════════════════
//  6. JS 语法检查（已通过 node --check，此处补充运行时验证）
// ═══════════════════════════════════════════════════════
console.log('\n[6] JS 语法与运行时验证');

test('data.js 可正常加载并暴露 AppData', () => {
  assert.ok(D, 'AppData 未暴露');
  assert.ok(Array.isArray(D.urdfModels), 'urdfModels 不是数组');
  assert.ok(Array.isArray(D.aiModels), 'aiModels 不是数组');
});

test('model.js 可正常加载并注册 page-model 组件', () => {
  const comp = global.window.AppComponents.find(c => c.name === 'page-model');
  assert.ok(comp, 'page-model 组件未注册');
  assert.ok(typeof comp.definition.setup === 'function', 'setup 不是函数');
});

// ═══════════════════════════════════════════════════════
//  7. 逻辑行为模拟（条件渲染决策）
// ═══════════════════════════════════════════════════════
console.log('\n[7] 条件渲染逻辑行为模拟');

test('Unitree Go1 → 有 image → 应渲染 <img>', () => {
  const go1 = D.urdfModels.find(m => m.id === 1);
  // 模拟 v-if="m.image" 判断
  const shouldShowImg = !!go1.image;
  assert.strictEqual(shouldShowImg, true, 'Go1 应显示图片');
});

test('Unitree Go2 (无 image) → 应回退到 emoji', () => {
  const go2 = D.urdfModels.find(m => m.id === 2);
  const shouldShowImg = !!go2.image;
  assert.strictEqual(shouldShowImg, false, 'Go2 不应显示图片');
  assert.ok(go2.icon, 'Go2 应有 icon 用于回退');
});

test('AI 模型 → 无 image → 应显示 emoji', () => {
  D.aiModels.forEach(m => {
    const shouldShowImg = !!m.image;
    assert.strictEqual(shouldShowImg, false, `AI 模型 ${m.name} 不应显示图片`);
    assert.ok(m.icon, `AI 模型 ${m.name} 应有 icon`);
  });
});

test('详情弹窗：Go1 (有 image) → 应渲染 <img>', () => {
  const go1 = D.urdfModels.find(m => m.id === 1);
  const shouldShowImg = !!go1.image;
  assert.strictEqual(shouldShowImg, true);
});

test('详情弹窗：AI 模型 (无 image) → 应回退 emoji', () => {
  const ai = D.aiModels[0];
  const shouldShowImg = !!ai.image;
  assert.strictEqual(shouldShowImg, false);
  assert.ok(ai.icon);
});

// ═══════════════════════════════════════════════════════
//  汇总
// ═══════════════════════════════════════════════════════
console.log('\n══════════════════════════════════════════════════════');
console.log(`  汇总: ${passed} 通过 / ${failed} 失败 / 共 ${passed + failed} 项`);
console.log('══════════════════════════════════════════════════════\n');

if (failed > 0) {
  console.log('❌ 测试未全部通过');
  process.exit(1);
} else {
  console.log('✅ 全部测试通过');
  process.exit(0);
}
