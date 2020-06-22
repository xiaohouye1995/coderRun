// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
	extends: cc.Component,

	properties: {
		// 主角跳跃高度
		jumpHeight: 0,
		// 主角跳跃持续时间
		jumpDuration: 0,
		// 最大移动速度
		maxMoveSpeed: 0,
		// 加速度
		accel: 0,
	},
	setJumpAction: function() {
		// 跳跃上升
		var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
		// 下落
		var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
		// 不断重复
		return cc.repeatForever(cc.sequence(jumpUp, jumpDown));
	},

	onKeyDown(event) {
		// set a flag when key pressed
		switch (event.keyCode) {
			case cc.macro.KEY.a:
				this.accLeft = true;
				break;
			case cc.macro.KEY.d:
				this.accRight = true;
				break;
		}
	},

	onKeyUp(event) {
		// unset a flag when key released
		switch (event.keyCode) {
			case cc.macro.KEY.a:
				this.accLeft = false;
				break;
			case cc.macro.KEY.d:
				this.accRight = false;
				break;
		}
	},

	onLoad: function() {
		// 初始化跳跃动作
		this.jumpAction = this.setJumpAction();
		this.node.runAction(this.jumpAction);

		// 加速度方向开关
		this.accLeft = false;
		this.accRight = false;
		// 主角当前水平方向速度
		this.xSpeed = 0;

		// 初始化键盘输入监听
		cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
		cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
	},

	onDestroy() {
		// 取消键盘输入监听
		cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
		cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
	},

	start() {

	},

	update: function(dt) {
		// 根据当前加速度方向每帧更新速度
		if (this.accLeft) {
			this.xSpeed -= this.accel * dt;
		} else if (this.accRight) {
			this.xSpeed += this.accel * dt;
		}
		// 限制主角的速度不能超过最大值
		if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
			// if speed reach limit, use max speed with current direction
			this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
		}

		// 根据当前速度更新主角的位置
		this.node.x += this.xSpeed * dt;
	},
});
