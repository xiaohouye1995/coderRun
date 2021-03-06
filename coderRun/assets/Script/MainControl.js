// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
export const GameStatus = {
	Game_Ready: 0,
	Game_playing: 1,
	Game_over: 2
}
import AudioSourceControl from "./AudioSourceControl"
import {
	SoundType
} from "./AudioSourceControl"
cc.Class({
	extends: cc.Component,

	properties: {
		labelScore: {
			default: null,
			type: cc.Label
		},
		signName: {
			default: null,
			type: cc.Label
		},
		signBackground: {
			default: null,
			type: cc.Sprite
		},
		cityBack1: {
			default: null,
			type: cc.Sprite
		},
		cityBack2: {
			default: null,
			type: cc.Sprite
		},
		SpBg: {
			default: [],
			type: [cc.Sprite]
		},
		SpCity: {
			default: [],
			type: [cc.SpriteFrame]
		},
		stonePrefab: {
			default: null,
			type: cc.Prefab
		},
		stone: {
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
		gameStatus: 0,
		gameScore: 0,
		audioControl: {
			default: null,
			type: AudioSourceControl
		},
		num: 1
	},

	onLoad() {
		// 开启碰撞检测
		let collisionManager = cc.director.getCollisionManager();
		collisionManager.enabled = true;
		// 开启碰撞形状绘制
		// collisionManager.enabledDebugDraw = true;
		// 获得游戏结束的精灵
		this.spGameOver = this.node.getChildByName("GameOver").getComponent(cc.Sprite);
		// 游戏开始阶段隐藏起来
		this.spGameOver.node.active = false;
		// 获取开始按钮
		this.btnStart = this.node.getChildByName("BtnStart").getComponent(cc.Button);
		// 给开始按钮添加响应
		this.btnStart.node.on(cc.Node.EventType.TOUCH_END, this.touchStartBtn, this);
		// 获取音频模块
		this.audioControl = this.node.getChildByName("AudioSource").getComponent("AudioSourceControl");
		// 加载分包
		this.loadCityMaps()
	},

	start() {
		// 生成障碍物
		for (let i = 0; i < this.stone.length; i++) {
			this.stone[i] = cc.instantiate(this.stonePrefab);
			this.node.getChildByName("Stone").addChild(this.stone[i]);
			this.stone[i].x = 170 + 800 * i;
			// let minY = -120;
			// let maxY = 120;
			// this.stone[i].y = minY + Math.random() * (maxY - minY);
		}
	},

	update(dt) {
		// 游戏状态不等于Game_playing时直接返回
		if (this.gameStatus !== GameStatus.Game_playing) {
			return
		}

		// 移动背景图
		for (let i = 0; i < 4; i++) {
			this.SpBg[i].node.x -= 12;
			if (this.SpBg[i].node.x <= -2400) {
				this.SpBg[i].node.x = 2400;
			}
		}
		
		// 移动城市
		this.cityBack1.node.x -= 12;
		if (this.cityBack1.node.x <= -2400) {
			this.cityBack1.node.x = 2400;
			this.num = this.num === 33 ? 0 : this.num + 1;
			this.cityBack1.spriteFrame = this.SpCity[this.num];
			console.log('cityBack1', this.cityBack1.spriteFrame)
		}
		this.cityBack2.node.x -= 12.0;
		if (this.cityBack2.node.x <= -2400) {
			this.cityBack2.node.x = 2400;
			this.num = this.num === 33 ? 0 : this.num + 1;
			this.cityBack2.spriteFrame = this.SpCity[this.num];
			console.log('cityBack2', this.cityBack2.spriteFrame)
		}

		// 移动标牌
		let cityName = ['杭州', '香港', '越南', '柬埔寨', '泰国', '缅甸', '印度', '迪拜', '土耳其', '俄罗斯', '冰岛', '英国', '荷兰', '巴黎', '罗马', '希腊',
			'埃及', '非洲', '马来西亚', '澳大利亚', '南极洲', '巴西', '墨西哥', '华盛顿', '纽约', '加拿大', '北极', '夏威夷', '日本', '韩国', '北京', '西安', '南京',
			'上海'
		];
		this.signName.node.x -= 12;
		this.signBackground.node.x -= 12;
		if (this.signName.node.x <= -1200) {
			this.signName.node.x = 1200;
			this.signBackground.node.x = 1200;
			// 标牌名称改变
			this.signName.string = cityName[this.num];
			// 播放加分音效
			this.audioControl.playSound(SoundType.E_Sound_Score);
		}
		
		// 里程数
		this.gameScore += 4;
		this.labelScore.string = this.gameScore.toString() + ' km';

		// 移动障碍物
		for (let i = 0; i < this.stone.length; i++) {
			this.stone[i].x -= 12;
			if (this.stone[i].x <= -2400) {
				this.stone[i].x = 2400;
				// let minY = -120;
				// let maxY = 120;
				// this.stone[i].y = minY + Math.random() * (maxY - minY);
			}
		}
	},

	touchStartBtn() {
		// 隐藏开始按钮
		this.btnStart.node.active = false;
		// 游戏状态标记为Game_playing
		this.gameStatus = GameStatus.Game_playing;
		// 再来一局时，隐藏gameover图片
		this.spGameOver.node.active = false;
		// 再来一局时，障碍物重置位置
		for (let i = 0; i < this.stone.length; i++) {
			this.stone[i].x = 170 + 800 * i;
			// let minY = -120;
			// let maxY = 120;
			// this.stone[i].y = minY + Math.random() * (maxY - minY);
		}
		// 再来一局时，还原主角位置和角度
		let bird = this.node.getChildByName("Bird");
		bird.y = -145;
		// bird.rotation = 0;
		// 分数清零
		this.gameScore = 0;
		this.labelScore.string = this.gameScore.toString();
	},
	
	loadCityMaps() {
		let citys = ['hangzhou', 'hongkong', 'vietnam', 'cambodia', 'thai', 'myanmar', 'india', 'Dubai', 'Turkey', 'Russia', 'iceland', 'london', 'holland', 'paris', 'rome', 'greece',
			'egypt', 'africa', 'Malaysia', 'australia', 'antarctica', 'brazil', 'mexico', 'Washington', 'newYork', 'canada', 'arctic', 'hawaii', 'japan', 'korea', 'beijing', 'xiAn', 'nanjing',
			'shanghai'
		];
		cc.assetManager.loadBundle('maps', (err, bundle) => {
			bundle.loadDir('/', cc.SpriteFrame, (err, spriteFrames) => {
				for (let name of citys) {
					for (let item of spriteFrames) {
						if (name === item.name) {
							this.SpCity.push(item)
						}
					}
				}
			});
		});
	},

	gameOver() {
		// 游戏结束时，显示gameover
		this.spGameOver.node.active = true;
		// 游戏结束时，显示开始按钮
		this.btnStart.node.active = true;
		// 游戏状态标记为Game_over
		this.gameStatus = GameStatus.Game_over;
		// 播放结束音效
		this.audioControl.playSound(SoundType.E_Sound_Die);
	}
});
