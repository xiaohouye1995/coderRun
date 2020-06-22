
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Player.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2d2d1+y1eJByr2lPDDlb/ae', 'Player');
// scripts/Player.js

"use strict";

// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
cc.Class({
  "extends": cc.Component,
  properties: {
    // 主角跳跃高度
    jumpHeight: 0,
    // 主角跳跃持续时间
    jumpDuration: 0,
    // 最大移动速度
    maxMoveSpeed: 0,
    // 加速度
    accel: 0
  },
  setJumpAction: function setJumpAction() {
    // 跳跃上升
    var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut()); // 下落

    var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn()); // 不断重复

    return cc.repeatForever(cc.sequence(jumpUp, jumpDown));
  },
  onKeyDown: function onKeyDown(event) {
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
  onKeyUp: function onKeyUp(event) {
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
  onLoad: function onLoad() {
    // 初始化跳跃动作
    this.jumpAction = this.setJumpAction();
    this.node.runAction(this.jumpAction); // 加速度方向开关

    this.accLeft = false;
    this.accRight = false; // 主角当前水平方向速度

    this.xSpeed = 0; // 初始化键盘输入监听

    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
  },
  onDestroy: function onDestroy() {
    // 取消键盘输入监听
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
  },
  start: function start() {},
  update: function update(dt) {
    // 根据当前加速度方向每帧更新速度
    if (this.accLeft) {
      this.xSpeed -= this.accel * dt;
    } else if (this.accRight) {
      this.xSpeed += this.accel * dt;
    } // 限制主角的速度不能超过最大值


    if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
      // if speed reach limit, use max speed with current direction
      this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
    } // 根据当前速度更新主角的位置


    this.node.x += this.xSpeed * dt;
  }
});

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcUGxheWVyLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwianVtcEhlaWdodCIsImp1bXBEdXJhdGlvbiIsIm1heE1vdmVTcGVlZCIsImFjY2VsIiwic2V0SnVtcEFjdGlvbiIsImp1bXBVcCIsIm1vdmVCeSIsInYyIiwiZWFzaW5nIiwiZWFzZUN1YmljQWN0aW9uT3V0IiwianVtcERvd24iLCJlYXNlQ3ViaWNBY3Rpb25JbiIsInJlcGVhdEZvcmV2ZXIiLCJzZXF1ZW5jZSIsIm9uS2V5RG93biIsImV2ZW50Iiwia2V5Q29kZSIsIm1hY3JvIiwiS0VZIiwiYSIsImFjY0xlZnQiLCJkIiwiYWNjUmlnaHQiLCJvbktleVVwIiwib25Mb2FkIiwianVtcEFjdGlvbiIsIm5vZGUiLCJydW5BY3Rpb24iLCJ4U3BlZWQiLCJzeXN0ZW1FdmVudCIsIm9uIiwiU3lzdGVtRXZlbnQiLCJFdmVudFR5cGUiLCJLRVlfRE9XTiIsIktFWV9VUCIsIm9uRGVzdHJveSIsIm9mZiIsInN0YXJ0IiwidXBkYXRlIiwiZHQiLCJNYXRoIiwiYWJzIiwieCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDUixhQUFTRCxFQUFFLENBQUNFLFNBREo7QUFHUkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1g7QUFDQUMsSUFBQUEsVUFBVSxFQUFFLENBRkQ7QUFHWDtBQUNBQyxJQUFBQSxZQUFZLEVBQUUsQ0FKSDtBQUtYO0FBQ0FDLElBQUFBLFlBQVksRUFBRSxDQU5IO0FBT1g7QUFDQUMsSUFBQUEsS0FBSyxFQUFFO0FBUkksR0FISjtBQWFSQyxFQUFBQSxhQUFhLEVBQUUseUJBQVc7QUFDekI7QUFDQSxRQUFJQyxNQUFNLEdBQUdULEVBQUUsQ0FBQ1UsTUFBSCxDQUFVLEtBQUtMLFlBQWYsRUFBNkJMLEVB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ZSxLQUFLekIsS0FBTCxHQUFhb0MsRUFBNUI7QUFDQSxLQUZELE1BRU8sSUFBSSxLQUFLakIsUUFBVCxFQUFtQjtBQUN6QixXQUFLTSxNQUFMLElBQWUsS0FBS3pCLEtBQUwsR0FBYW9DLEVBQTVCO0FBQ0EsS0FObUIsQ0FPcEI7OztBQUNBLFFBQUlDLElBQUksQ0FBQ0MsR0FBTCxDQUFTLEtBQUtiLE1BQWQsSUFBd0IsS0FBSzFCLFlBQWpDLEVBQStDO0FBQzlDO0FBQ0EsV0FBSzBCLE1BQUwsR0FBYyxLQUFLMUIsWUFBTCxHQUFvQixLQUFLMEIsTUFBekIsR0FBa0NZLElBQUksQ0FBQ0MsR0FBTCxDQUFTLEtBQUtiLE1BQWQsQ0FBaEQ7QUFDQSxLQVhtQixDQWFwQjs7O0FBQ0EsU0FBS0YsSUFBTCxDQUFVZ0IsQ0FBVixJQUFlLEtBQUtkLE1BQUwsR0FBY1csRUFBN0I7QUFDQTtBQXZGTyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmNjLkNsYXNzKHtcclxuXHRleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG5cdHByb3BlcnRpZXM6IHtcclxuXHRcdC8vIOS4u+inkui3s+i3g+mrmOW6plxyXG5cdFx0anVtcEhlaWdodDogMCxcclxuXHRcdC8vIOS4u+inkui3s+i3g+aMgee7reaXtumXtFxyXG5cdFx0anVtcER1cmF0aW9uOiAwLFxyXG5cdFx0Ly8g5pyA5aSn56e75Yqo6YCf5bqmXHJcblx0XHRtYXhNb3ZlU3BlZWQ6IDAsXHJcblx0XHQvLyDliqDpgJ/luqZcclxuXHRcdGFjY2VsOiAwLFxyXG5cdH0sXHJcblx0c2V0SnVtcEFjdGlvbjogZnVuY3Rpb24oKSB7XHJcblx0XHQvLyDot7Pot4PkuIrljYdcclxuXHRcdHZhciBqdW1wVXAgPSBjYy5tb3ZlQnkodGhpcy5qdW1wRHVyYXRpb24sIGNjLnYyKDAsIHRoaXMuanVtcEhlaWdodCkpLmVhc2luZyhjYy5lYXNlQ3ViaWNBY3Rpb25PdXQoKSk7XHJcblx0XHQvLyDkuIvokL1cclxuXHRcdHZhciBqdW1wRG93biA9IGNjLm1vdmVCeSh0aGlzLmp1bXBEdXJhdGlvbiwgY2MudjIoMCwgLXRoaXMuanVtcEhlaWdodCkpLmVhc2luZyhjYy5lYXNlQ3ViaWNBY3Rpb25JbigpKTtcclxuXHRcdC8vIOS4jeaWremHjeWkjVxyXG5cdFx0cmV0dXJuIGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoanVtcFVwLCBqdW1wRG93bikpO1xyXG5cdH0sXHJcblxyXG5cdG9uS2V5RG93bihldmVudCkge1xyXG5cdFx0Ly8gc2V0IGEgZmxhZyB3aGVuIGtleSBwcmVzc2VkXHJcblx0XHRzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcclxuXHRcdFx0Y2FzZSBjYy5tYWNyby5LRVkuYTpcclxuXHRcdFx0XHR0aGlzLmFjY0xlZnQgPSB0cnVlO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIGNjLm1hY3JvLktFWS5kOlxyXG5cdFx0XHRcdHRoaXMuYWNjUmlnaHQgPSB0cnVlO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdG9uS2V5VXAoZXZlbnQpIHtcclxuXHRcdC8vIHVuc2V0IGEgZmxhZyB3aGVuIGtleSByZWxlYXNlZFxyXG5cdFx0c3dpdGNoIChldmVudC5rZXlDb2RlKSB7XHJcblx0XHRcdGNhc2UgY2MubWFjcm8uS0VZLmE6XHJcblx0XHRcdFx0dGhpcy5hY2NMZWZ0ID0gZmFsc2U7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgY2MubWFjcm8uS0VZLmQ6XHJcblx0XHRcdFx0dGhpcy5hY2NSaWdodCA9IGZhbHNlO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdG9uTG9hZDogZnVuY3Rpb24oKSB7XHJcblx0XHQvLyDliJ3lp4vljJbot7Pot4PliqjkvZxcclxuXHRcdHRoaXMuanVtcEFjdGlvbiA9IHRoaXMuc2V0SnVtcEFjdGlvbigpO1xyXG5cdFx0dGhpcy5ub2RlLnJ1bkFjdGlvbih0aGlzLmp1bXBBY3Rpb24pO1xyXG5cclxuXHRcdC8vIOWKoOmAn+W6puaWueWQkeW8gOWFs1xyXG5cdFx0dGhpcy5hY2NMZWZ0ID0gZmFsc2U7XHJcblx0XHR0aGlzLmFjY1JpZ2h0ID0gZmFsc2U7XHJcblx0XHQvLyDkuLvop5LlvZPliY3msLTlubPmlrnlkJHpgJ/luqZcclxuXHRcdHRoaXMueFNwZWVkID0gMDtcclxuXHJcblx0XHQvLyDliJ3lp4vljJbplK7nm5jovpPlhaXnm5HlkKxcclxuXHRcdGNjLnN5c3RlbUV2ZW50Lm9uKGNjLlN5c3RlbUV2ZW50LkV2ZW50VHlwZS5LRVlfRE9XTiwgdGhpcy5vbktleURvd24sIHRoaXMpO1xyXG5cdFx0Y2Muc3lzdGVtRXZlbnQub24oY2MuU3lzdGVtRXZlbnQuRXZlbnRUeXBlLktFWV9VUCwgdGhpcy5vbktleVVwLCB0aGlzKTtcclxuXHR9LFxyXG5cclxuXHRvbkRlc3Ryb3koKSB7XHJcblx0XHQvLyDlj5bmtojplK7nm5jovpPlhaXnm5HlkKxcclxuXHRcdGNjLnN5c3RlbUV2ZW50Lm9mZihjYy5TeXN0ZW1FdmVudC5FdmVudFR5cGUuS0VZX0RPV04sIHRoaXMub25LZXlEb3duLCB0aGlzKTtcclxuXHRcdGNjLnN5c3RlbUV2ZW50Lm9mZihjYy5TeXN0ZW1FdmVudC5FdmVudFR5cGUuS0VZX1VQLCB0aGlzLm9uS2V5VXAsIHRoaXMpO1xyXG5cdH0sXHJcblxyXG5cdHN0YXJ0KCkge1xyXG5cclxuXHR9LFxyXG5cclxuXHR1cGRhdGU6IGZ1bmN0aW9uKGR0KSB7XHJcblx0XHQvLyDmoLnmja7lvZPliY3liqDpgJ/luqbmlrnlkJHmr4/luKfmm7TmlrDpgJ/luqZcclxuXHRcdGlmICh0aGlzLmFjY0xlZnQpIHtcclxuXHRcdFx0dGhpcy54U3BlZWQgLT0gdGhpcy5hY2NlbCAqIGR0O1xyXG5cdFx0fSBlbHNlIGlmICh0aGlzLmFjY1JpZ2h0KSB7XHJcblx0XHRcdHRoaXMueFNwZWVkICs9IHRoaXMuYWNjZWwgKiBkdDtcclxuXHRcdH1cclxuXHRcdC8vIOmZkOWItuS4u+inkueahOmAn+W6puS4jeiDvei2hei/h+acgOWkp+WAvFxyXG5cdFx0aWYgKE1hdGguYWJzKHRoaXMueFNwZWVkKSA+IHRoaXMubWF4TW92ZVNwZWVkKSB7XHJcblx0XHRcdC8vIGlmIHNwZWVkIHJlYWNoIGxpbWl0LCB1c2UgbWF4IHNwZWVkIHdpdGggY3VycmVudCBkaXJlY3Rpb25cclxuXHRcdFx0dGhpcy54U3BlZWQgPSB0aGlzLm1heE1vdmVTcGVlZCAqIHRoaXMueFNwZWVkIC8gTWF0aC5hYnModGhpcy54U3BlZWQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIOagueaNruW9k+WJjemAn+W6puabtOaWsOS4u+inkueahOS9jee9rlxyXG5cdFx0dGhpcy5ub2RlLnggKz0gdGhpcy54U3BlZWQgKiBkdDtcclxuXHR9LFxyXG59KTtcbiJdfQ==