# Move.js
处理浏览器 鼠标拖拽移动，触摸移动（多手指兼容）简单好用的类

# example
```
  <script src="./move.js"></script>
  <script> 
  new Move({
      element:document.getElementById('ID'),
      touchMove(e){             //  触摸移动事件
          console.log(e)
          //  const element = e[0]        //  手指标示符为 0 的手指
          //  element.live_x              //  实时 X 轴移动距离
          //  element.live_y              //  实时 Y 轴移动距离
          //  element.touch_move_displacement_x       //  累加 X轴移动距离
          //  element.touch_move_displacement_y       //  累加 Y轴移动距离
      },
      mouseMove(e){             //  鼠标拖拽移动事件
          console.log(e)
          //  e.live_x          //  实时 X 轴移动距离
          //  e.live_y          //  实时 Y 轴移动距离
          //  e.move_displacement_x       //  累加 X轴移动距离
          //  e.move_displacement_y       //  累加 Y轴移动距离
      }
  })
  </script>
```

## 更多详见 `move.js-demo.html` 和 `cubeRotate.html`
