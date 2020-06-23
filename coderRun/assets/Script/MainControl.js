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
		}
	},

	// LIFE-CYCLE CALLBACKS:

	// onLoad () {},

	start() {

	},

	update (dt) {
		// 移动背景图
		for (let i = 0; i < 2; i++) {
			this.SpBg[i].node.x -= 1.0;
			if (this.SpBg[i].node.x <= -288) {
				this.SpBg[i].node.x = 288
			}
		}
	}
});
