export default class Move {
  //  鼠标拖拽
  mouse_down = false
  //  鼠标历史坐标点
  last_point = {x:0,y:0};
  //  鼠标 XY 的累加位移
  total = {x:0,y:0};
  //  触摸历史坐标点
  touch_last_point = {0:{x:0,y:0}};
  //  触摸 XY 的累加位移
  touch_total = {0:{x:0,y:0}};

  /**
   *
   * @param element
   * @param TouchMove
   * @param MouseMove
   */
  constructor({
                element,
                TouchMove,
                MouseMove
              }) {
    this.element = element;
    this.MouseMove = MouseMove;
    this.TouchMove = TouchMove;

    this.element.addEventListener("touchstart", e => {
      this.touchStart(e);
    });
    this.element.addEventListener("touchmove", e => {
      this.touchMove(e);
    });
    this.element.addEventListener("touchend", e => {
      this.touchEnd(e);
    });
    this.element.addEventListener("mousedown", e => {
      this.mouseStart(e);
    });
    this.element.addEventListener('mousemove', e => {
      this.mouseMove(e)
    });
    this.element.addEventListener("mouseup", e => {
      this.mouseStop(e);
    });

  }
  /**
   * 触摸开始事件
   * @param {*} e
   */
  touchStart(e){
    for (let index = 0; index < e.changedTouches.length; index++) {
      const element =  e.changedTouches[index];
      const identifier = element.identifier;
      //  初始化该手指的历史坐标对象
      this.touch_last_point[identifier] = {
        x:element.clientX,
        y:element.clientY,
      }
      //  初始化该手指的总位移对象
      this.touch_total[identifier] = {
        x:0,
        y:0,
      }
      let res = {
        type    : 'touch',
        event   : 'start',
        identifier,
        x : element.clientX,
        y : element.clientY,
        moving_x  : 0,
        moving_y  : 0,
        total_x : 0,
        total_y : 0,
      }
      this.TouchMove(res);
    }
  }
  /**
   * 触摸移动事件
   * @param {*} e
   */
  touchMove(e){
    for (let index = 0; index < e.changedTouches.length; index++) {
      const element = e.changedTouches[index];
      const identifier = element.identifier
      //  该手指实时位移量
      const moving_x = element.clientX - this.touch_last_point[identifier].x
      const moving_y = element.clientY - this.touch_last_point[identifier].y
      //  该手指累加位移量
      const total_x = this.touch_total[identifier].x + moving_x
      const total_y = this.touch_total[identifier].y + moving_y
      //  更新历史位置
      this.touch_last_point[identifier].x = element.clientX
      this.touch_last_point[identifier].y = element.clientY
      //  更新总位移
      this.touch_total[identifier].x = total_x
      this.touch_total[identifier].y = total_y

      // res[identifier] = {
      //   moving_x  : moving_x,
      //   moving_y  : moving_y,
      //   total_x : total_x,
      //   total_y : total_y
      // }
      let res = {
        type    : 'touch',
        event   : 'moving',
        identifier,
        x : element.clientX,
        y : element.clientY,
        moving_x,
        moving_y,
        total_x,
        total_y,
      }
      this.TouchMove(res);
    }
  }

  /**
   * 触摸结束事件
   * @param e
   */
  touchEnd(e){
    for (let index = 0; index < e.changedTouches.length; index++) {
      const element = e.changedTouches[index];
      const identifier = element.identifier
      let res = {
        type    : 'touch',
        event   : 'stop',
        identifier,
        x : element.clientX,
        y : element.clientY,
        moving_x  : 0,
        moving_y  : 0,
        total_x : this.touch_total[identifier].x,
        total_y : this.touch_total[identifier].y,
      }
      this.TouchMove(res);
    }
  }
  /**
   * 鼠标开始移动事件
   * @param {*} e
   */
  mouseStart(e){
    // 累加位移量清空
    this.total.x = this.total.y = 0
    this.last_point = {x:e.x, y:e.y}
    this.mouse_down = true
    this.MouseMove({
      type    : 'mouse',
      event  :   'start',
      x : e.x,
      y : e.y,
      moving_x  : 0,
      moving_y  : 0,
      total_x : this.total.x,
      total_y : this.total.y
    });
  }
  /**
   * 鼠标移动事件
   * @param {*} e
   */
  mouseMove(e){
    if (!this.mouse_down) return
    const new_poit = {x:e.x, y:e.y}
    //  实时位移量
    const moving_x = new_poit.x - this.last_point.x
    const moving_y = new_poit.y - this.last_point.y
    //  累加位移量
    this.total.x += moving_x
    this.total.y += moving_y
    this.last_point = new_poit
    this.MouseMove({
      type    : 'mouse',
      event   : 'moving',
      x : e.x,
      y : e.y,
      moving_x,
      moving_y,
      total_x : this.total.x,
      total_y : this.total.y
    });
  }
  /**
   * 鼠标结束移动事件
   * @param {*} e
   */
  mouseStop(e){
    this.mouse_down = false
    this.MouseMove({
      type    : 'mouse',
      event   : 'stop',
      x : e.x,
      y : e.y,
      moving_x  : 0,
      moving_y  : 0,
      total_x : this.total.x,
      total_y : this.total.y
    });
  }
}