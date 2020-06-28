// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
	extends: cc.Component,

	properties: {
		// foo: {
		//     // ATTRIBUTES:
		//     default: null,        // The default value will be used only when the component attaching
		//                           // to a node for the first time
		//     type: cc.SpriteFrame, // optional, default is typeof default
		//     serializable: true,   // optional, default is true
		// },
		// bar: {
		//     get () {
		//         return this._bar;
		//     },
		//     set (value) {
		//         this._bar = value;
		//     }
		// },
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
	},

	start() {
		// 生成障碍物
		for (let i = 0; i < this.pipe.length; i++) {
			this.pipe[i] = cc.instantiate(this.pipePrefab);
			this.node.addChild(this.pipe[i]);

			this.pipe[i].x = 170 + 200 * i;
			let minY = -120;
			let maxY = 120;
			this.pipe[i].y = minY + Math.random() * (maxY - minY);
		}
	},

	update(dt) {
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

	gameOver() {
		console.log(2222)
		this.spGameOver.node.active = true;
	}
});
