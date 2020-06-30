// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import MainControl from "./MainControl"
import {GameStatus} from "./MainControl"
import {SoundType} from "./AudioSourceControl"
cc.Class({
    extends: cc.Component,

    properties: {
		// 小鸟速度
		speed: 0,
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
		console.log(22, this.mainControl.gameStatus, GameStatus.Game_playing)
		// 游戏状态不等于Game_playing时直接返回
		if (this.mainControl.gameStatus !== GameStatus.Game_playing) {
			return
		}
		this.speed -= 0.05;
		this.node.y += this.speed;
		
		// 小鸟飞行倾斜角度
		let angle = -(this.speed/2)*30;
		if (angle >= 30) {
			angle = 30;
		}
		this.node.rotation = angle;
		
		// 当小鸟超出屏幕，游戏结束
		if (this.node.y >= 256 || this.node.y <= -256) {
			this.mainControl.gameOver();
			this.speed = 0;
		}
	},
	
	onTouchStart () {
		// 游戏状态不等于Game_playing时直接返回
		if (this.mainControl.gameStatus !== GameStatus.Game_playing) {
			return
		}
		this.speed = 2;
		// 播放飞翔音效
		this.mainControl.audioControl.playSound(SoundType.E_Sound_Fly)
	},
	
	onCollisionEnter() {
		// 游戏结束
		cc.log("gameover");
		this.mainControl.gameOver();
		this.speed = 0;
	}
	
});
