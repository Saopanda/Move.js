class Move {
    //  鼠标拖拽
    mouse_down = false
    //  鼠标历史坐标点
    last_point = {x:0,y:0};
    //  鼠标 XY 的累加位移
    move_displacement = {x:0,y:0};
    //  触摸历史坐标点
    touch_last_point = {0:{x:0,y:0}};
    //  触摸 XY 的累加位移
    touch_move_displacement = {0:{x:0,y:0}};

    /**
     * 添加监听事件
     * @param {
     *  element:    "监听对象",
     *  touchMove:  "触摸移动事件",
     *  mouseMove:  "鼠标拖拽事件"
     * } Object 初始化对象
     */
    constructor(Object) {
        this.element = Object.element;
        this.element.addEventListener("touchstart", e => {
            this.touchStart(e);
        });
        this.element.addEventListener("touchmove", e => {
            this.touchMove(e);
        });
        this.element.addEventListener("touchend", e => {
            e.preventDefault();
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
        this.returnTouchMove = Object.touchMove;
        this.returnMouseMove = Object.mouseMove;
    }
    /**
     * 获取鼠标移动事件的坐标点
     * @param {*} e 
     * @returns 
     */
    getMouseXY(e) {
        return {
            x:e.x,
            y:e.y
        }
    }
    /**
     * 获取触摸移动事件的坐标点
     * 几个手指数组内几个对象，对象中的identifier为手指识别符
     * @param {*} e 
     * @returns
     */
    getTouchXY(e){
        var res = []
        for (let index = 0; index < e.touches.length; index++) {
            const element = e.touches[index];
            res.push({
                identifier:element.identifier,
                x:element.clientX,
                y:element.clientY,
            })
        }
        return res
    }

    /**
     * 触摸开始事件
     * @param {*} e 
     */
    touchStart(e){
        const last_point = this.getTouchXY(e)
        for (let index = 0; index < last_point.length; index++) {
            const element = last_point[index];
            console.log("手指 "+element.identifier+" 开始移动")
            //  该手指的历史坐标点设置
            this.touch_last_point[element.identifier] = {
                x:element.x,
                y:element.y,
            }
            //  该手指的累加位移量清空
            this.touch_move_displacement[element.identifier] = {
                x:0,
                y:0,
            }
        }
    }
    /**
     * 触摸移动事件
     * @param {*} e 
     */
    touchMove(e){
        const new_poit = this.getTouchXY(e)
        var res = {}
        for (let index = 0; index < new_poit.length; index++) {
            const element = new_poit[index];
            //  该手指实时位移量
            const live_x = element.x - this.touch_last_point[element.identifier].x
            const live_y = element.y - this.touch_last_point[element.identifier].y
            //  该手指累加位移量
            const add_displacement_x = this.touch_move_displacement[element.identifier].x + live_x
            const add_displacement_y = this.touch_move_displacement[element.identifier].y + live_y
            
            this.touch_last_point[element.identifier] = {
                x:element.x,
                y:element.y,
            }
            this.touch_move_displacement[element.identifier] = {
                x:add_displacement_x,
                y:add_displacement_y,
            }
            res[element.identifier] = {
                live_x:live_x,
                live_y:live_y,
                touch_move_displacement_x:add_displacement_x,
                touch_move_displacement_y:add_displacement_y
            }
        }
        this.returnTouchMove(res);
    }
    /**
     * 鼠标开始移动事件
     * @param {*} e 
     */
    mouseStart(e){
        // 累加位移量清空
        this.move_displacement.x = this.move_displacement.y = 0
        this.last_point = this.getMouseXY(e)
        this.mouse_down = true
    }
    /**
     * 鼠标移动事件
     * @param {*} e 
     */
    mouseMove(e){
        if (!this.mouse_down) return
        const new_poit = this.getMouseXY(e)
        //  实时位移量
        const live_x = new_poit.x - this.last_point.x
        const live_y = new_poit.y - this.last_point.y
        //  累加位移量
        this.move_displacement.x += live_x
        this.move_displacement.y += live_y
        this.last_point = new_poit
        this.returnMouseMove({
            live_x:live_x,
            live_y:live_y,
            move_displacement_x:this.move_displacement.x,
            move_displacement_y:this.move_displacement.y
        });
    }
    /**
     * 鼠标结束移动事件
     * @param {*} e 
     */
    mouseStop(e){
        this.mouse_down = false
    }
}