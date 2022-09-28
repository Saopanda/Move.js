封装原生 `Touch events`、`MouseEvent` 事件

* 使回调数据结构只有一维，多手指触摸单独回调处理更方便
* 提供了坐标、实时位移量、累计位移量

### 安装
```shell
npm install sao_move
```

### 使用简单
传入要监听的对象即可

```javascript
const elecomnt = this.$refs.app

new SaoMove(elecomnt, (e) => {
    console.log(e)
})
```
### 回调参数内容
```json
{
    "type": "touch",
    "event": "start",
    "identifier": 0,
    "x": 204.41114807128906,
    "y": 376.5450744628906,
    "moving_x": 0,
    "moving_y": 0,
    "total_x": 0,
    "total_y": 0,
    "e": "原生事件"
}
```

| 字段         | 含义      | 备注                    |
|------------|---------|-----------------------|
| type       | 移动类型    | touch / mouse         |   
| event      | 事件类型    | start / moving / stop |
| identifier | 触摸手指标识  | 数字标识，鼠标类型为0           |
| x          | 实时`x`坐标 |                       |
| y          | 实时`y`坐标 |                       |
| moving_x   | 实时`x`位移 |                       |
| moving_y   | 实时`y`位移 |                       |
| total_x    | 累计`x`位移 |                       |
| total_y    | 累计`y`位移 |                       |

### 其他
* `total_x`,`total_y`

是指从此次动作开始，到当前坐标的位移
* `moving_x`，`moving_x`

是指从上个坐标到当前坐标的实时位移
* `identifier`

通过`identifier`来区分每个手指单独的 start、moving、stop，多手指互不干扰


### 更新
* 2.1 新增返回原生事件
