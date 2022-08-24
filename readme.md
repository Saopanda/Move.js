封装原生 `Touch events`、`MouseEvent` 事件

### 使用简单
传入要监听的对象即可

```javascript
new Move({
  element: this.$refs.app, // 要监听的 DOM 对象
  TouchMove: (e) => {
    console.log(e)      //  触摸回调函数
  },
  MouseMove: (e) => {
    console.log(e)      //  鼠标拖拽回调函数
  },
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
    "total_y": 0
}
```

| 字段         | 含义      | 备注                    |
|------------|---------|-----------------------|
| type       | 移动类型    | touch / mouse         |   
| event      | 事件类型    | start / moving / stop |
| identifier | 触摸手指标识  | 数字标识，mouse类型无此字段      |
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