// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
	extends: cc.Component,

	properties: {
		// 这个属性引用了星星预制资源
		starPrefab: {
			default: null,
			type: cc.Prefab
		},
		// 星星产生后消失时间的随机范围
		maxStarDuration: 0,
		minStarDuration: 0,
		// 地面节点，用于确定星星生成的高度
		ground: {
			default: null,
			type: cc.Node
		},
		// player 节点，用于获取主角弹跳的高度，和控制主角行动开关
		player: {
			default: null,
			type: cc.Node
		}
	},

	// LIFE-CYCLE CALLBACKS:

	// onLoad () {},

	start() {

	},

	// update (dt) {},
});
