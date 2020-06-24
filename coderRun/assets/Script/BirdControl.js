// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
		// 小鸟速度
		speed: 0
    },

    onLoad () {
		cc.Canvas.instance.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
	},

    start () {

    },

    update (dt) {
		this.speed -= 0.05;
		this.node.y += this.speed;
		
		// 小鸟飞行倾斜角度
		let angle = -(this.speed/2)*30;
		if (angle >= 30) {
			angle = 30;
		}
		this.node.rotation = angle;
	},
	
	onTouchStart () {
		this.speed = 2;
	}
	
});
