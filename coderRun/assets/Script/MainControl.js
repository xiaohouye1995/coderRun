// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

export enum GameStatus {
	Game_Ready = 0,
	Game_playing,
	Game_over
}
cc.Class({
	extends: cc.Component,

	properties: {
		SpBg: {
			default: [],
			type: [cc.Sprite]
		},
		pipePrefab: {
			default: null,
			type: cc.Prefab
		},
		pipe: {
			default: [],
			type: [cc.Node]
		},
		spGameOver: {
			default: null,
			type: cc.Sprite
		},
		btnStart: {
			default: null,
			type: cc.Button
		},
		gameStatus: {
			default: GameStatus.Game_Ready,
			type: GameStatus
		},
	},

	// LIFE-CYCLE CALLBACKS:

	onLoad() {
		// 开启碰撞检测
		let collisionManager = cc.director.getCollisionManager();
		collisionManager.enabled = true;
		// 开启碰撞形状绘制
		collisionManager.enabledDebugDraw = true;
		// 获得游戏结束的精灵
		this.spGameOver = this.node.getChildByName("GameOver").getComponent(cc.Sprite);
		// 游戏开始阶段隐藏起来
		this.spGameOver.node.active = false;
		// 获取开始按钮
		this.btnStart = this.node.getChildByName("BtnStart").getComponent(cc.Button);
		// 给开始按钮添加响应
		this.btnStart.node.on(cc.Node.EventType.Touch_END, this.touchStartBtn, this);
	},

	start() {
		// 生成障碍物
		for (let i = 0; i < this.pipe.length; i++) {
			this.pipe[i] = cc.instantiate(this.pipePrefab);
			this.node.getChildByName("Pipe").addChild(this.pipe[i]);

			this.pipe[i].x = 170 + 200 * i;
			let minY = -120;
			let maxY = 120;
			this.pipe[i].y = minY + Math.random() * (maxY - minY);
		}
	},

	update(dt) {
		// 游戏状态不等于Game_playing时直接返回
		if (this.gameStatus !== GameStatus.Game_playing) {
			return
		}
		// 移动背景图
		for (let i = 0; i < 2; i++) {
			this.SpBg[i].node.x -= 1.0;
			if (this.SpBg[i].node.x <= -288) {
				this.SpBg[i].node.x = 288
			}
		}
		// 移动障碍物
		for (let i = 0; i < this.pipe.length; i++) {
			this.pipe[i].x -= 1.0;
			if (this.pipe[i].x <= -170) {
				this.pipe[i].x = 430;

				let minY = -120;
				let maxY = 120;
				this.pipe[i].y = minY + Math.random() * (maxY - minY);
			}
		}
	},
	
	touchStartBtn () {
		// 隐藏开始按钮
		this.btnStart.node.active = false;
		// 游戏状态标记为Game_playing
		this.gameStatus = GameStatus.Game_playing;
		// 再来一局时，隐藏gameover图片
		this.spGameOver.node.active = false;
		// 再来一局时，管子重置位置
		for (let i = 0; i < this.pipe.length; i++) {
			this.pipe[i].x = 170 + 200 * i;
			let minY = -120;
			let maxY = 120;
			this.pipe[i].y = minY + Math.random() * (maxY - minY);
		}
		// 再来一局时，还原小鸟位置和角度
		let bird = this.node.getChildByName("Bird");
		bird.y = 0;
		bird.rotation = 0;
	},
	
	gameOver() {
		// 游戏结束时，显示gameover
		this.spGameOver.node.active = true;
		// 游戏结束时，显示开始按钮
		this.btnStart.node.active = true;
		// 游戏状态标记为Game_over
		this.gameStatus = GameStatus.Game_over;
	}
});