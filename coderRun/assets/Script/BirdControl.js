// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import MainControl from "./MainControl"
// import {GameStatus} from "./MainControl"
cc.Class({
    extends: cc.Component,

    properties: {
		// 小鸟速度
		speed: 0,
		// mainControl: null,
		mainControl: {
			default: null,
			type: MainControl
		},
    },

    onLoad () {
		cc.Canvas.instance.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
		// 初始化mainControl
		this.mainControl = cc.Canvas.instance.node.getComponent("MainControl");
	},

    start () {

    },

    update (dt) {
		// 游戏状态不等于Game_playing时直接返回
		// if (this.gameStatus !== GameStatus.Game_playing) {
		// 	return
		// }
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
		// 游戏状态不等于Game_playing时直接返回
		// if (this.gameStatus !== GameStatus.Game_playing) {
		// 	return
		// }
		this.speed = 2;
	},
	
	onCollisionEnter() {
		// 游戏结束
		cc.log("gameover");
		this.mainControl.gameOver();
		this.speed = 0;
	}
	
});
