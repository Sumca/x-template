# gl-table 请求分页表格

### 组件说明

基本表格，集成了分页功能，可以传入接口 API 实现请求。

### 使用场景

页面需要展示表格，且需要分页

### Table Attributes

除了继承 el-table 的属性，还支持以下属性：

| 参数              | 说明                                     | 类型     | 可选值     | 默认值 |
| ----------------- | ---------------------------------------- | -------- | ---------- | ------ |
| columns           | 列配置数组，每条数据对应一个 TableColumn | array    | —          | []     |
| data              | 列表数据源, 对应的是 data 属性           | array    | —          | []     |
| pageConfig        | 分页配置                                 | object   | {}         | {}     |
| showSlider        | 是否侧边栏                               | Boolean  | true/false | false  |
| httpRequest       | 请求 API                                 | Function | -          | null   |
| httpRequestParams | 请求除去分页之外的额外参数               | object   | -          | {}     |
| httpImmediate     | 是否默认加载一次请求                     | Boolean  | true/false | false  |

### Table Methods

| 方法名 | 说明 | 参数 |
| ------ | ---- | ---- |

完全继承了 el-table 的 Methods

### Table Events

完全继承了 el-table 的 Events

### Column Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --------- | -------------------------------------------------------------------------------------- | ------------ | — | {} |
