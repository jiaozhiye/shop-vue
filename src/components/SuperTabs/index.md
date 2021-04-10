## API

### SuperTabs

| 参数             | 说明                           | 类型                      | 默认值 |
| ---------------- | ------------------------------ | ------------------------- | ------ |
| v-model          | 选中面板(TabPanel)的 key       | string                    | -      |
| initialValue     | 初始化选中面板(TabPanel)的 key | string                    | -      |
| tabType          | 风格类型                       | card \| border-card       | -      |
| tabPosition      | 选项卡所在位置                 | top \| left               | top    |
| size             | 尺寸                           | small \| default \| large | -      |
| animated         | 是否开启选项卡切换时动画       | boolean                   | false  |
| lazyLoad         | 是否延迟加载选项卡组件         | boolean                   | true   |
| tabNavOffsetLeft | 选项卡导航的左边距             | number \| string          | 0      |
| containerStyle   | 组件最外层容器的 css 样式      | object                    | -      |

### 事件

| 事件名称 | 说明             | 回调参数                   |
| -------- | ---------------- | -------------------------- |
| change   | 选项卡切换时触发 | Function(activeKey:string) |

### TabPanel

| 参数     | 说明               | 类型    | 默认值 |
| -------- | ------------------ | ------- | ------ |
| key      | 对应 activeKey     | string  | -      |
| label    | 选项卡头显示文字   | string  | -      |
| disabled | 是否禁用当前选项卡 | boolean | false  |

### 插槽

| 插槽名称     | 说明                   |
| ------------ | ---------------------- |
| extraContent | 对选项卡顶部区域的扩展 |

### 示例

```bash
# template
<template>
  <super-tabs :initial-value="defaultTabLabel">
    <div slot="extraContent">
      <el-radio-group v-model="fetchParams.radioValue" size="small" @change="changeHandle">
        <el-radio-button label="1001">今日</el-radio-button>
        <el-radio-button label="1002">本周</el-radio-button>
        <el-radio-button label="1003">本月</el-radio-button>
        <el-radio-button label="1004">本年</el-radio-button>
      </el-radio-group>
    </div>
    <tab-panel key="1" label="选项卡1">
      <Chart1 :fetchapi="() => {}" :params="fetchParams" />
    </tab-panel>
    <tab-panel key="2" label="选项卡2">
      <Chart2 :fetchapi="() => {}" :params="fetchParams" />
    </tab-panel>
  </super-tabs>
</template>

# js
import Chart1 from '@/charts/dashboard/chart1';
import Chart2 from '@/charts/dashboard/chart2';

export default {
  components: {
    Chart1,
    Chart2
  },
  data() {
    return {
      defaultTabLabel: '1',
      fetchParams: {
        radioValue: '1001'
      }
    };
  }
};
```
