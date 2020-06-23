
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
    accel: 0,
    // 跳跃音效资源
    jumpAudio: {
      "default": null,
      type: cc.AudioClip
    }
  },
  setJumpAction: function setJumpAction() {
    // 跳跃上升
    var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut()); // 下落

    var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn()); // 添加一个回调函数，用于在动作结束时调用我们定义的其他方法

    var callback = cc.callFunc(this.playJumpSound, this); // 不断重复，而且每次完成落地动作后调用回调来播放声音

    return cc.repeatForever(cc.sequence(jumpUp, jumpDown, callback));
  },
  playJumpSound: function playJumpSound() {
    // 调用声音引擎播放声音
    cc.audioEngine.playEffect(this.jumpAudio, false);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcUGxheWVyLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwianVtcEhlaWdodCIsImp1bXBEdXJhdGlvbiIsIm1heE1vdmVTcGVlZCIsImFjY2VsIiwianVtcEF1ZGlvIiwidHlwZSIsIkF1ZGlvQ2xpcCIsInNldEp1bXBBY3Rpb24iLCJqdW1wVXAiLCJtb3ZlQnkiLCJ2MiIsImVhc2luZyIsImVhc2VDdWJpY0FjdGlvbk91dCIsImp1bXBEb3duIiwiZWFzZUN1YmljQWN0aW9uSW4iLCJjYWxsYmFjayIsImNhbGxGdW5jIiwicGxheUp1bXBTb3VuZCIsInJlcGVhdEZvcmV2ZXIiLCJzZXF1ZW5jZSIsImF1ZGlvRW5naW5lIiwicGxheUVmZmVjdCIsIm9uS2V5RG93biIsImV2ZW50Iiwia2V5Q29kZSIsIm1hY3JvIiwiS0VZIiwiYSIsImFjY0xlZnQiLCJkIiwiYWNjUmlnaHQiLCJvbktleVVwIiwib25Mb2FkIiwianVtcEFjdGlvbiIsIm5vZGUiLCJydW5BY3Rpb24iLCJ4U3BlZWQiLCJzeXN0ZW1FdmVudCIsIm9uIiwiU3lzdGVtRXZlbnQiLCJFdmVudFR5cGUiLCJLRVlfRE9XTiIsIktFWV9VUCIsIm9uRGVzdHJveSIsIm9mZiIsInN0YXJ0IiwidXBkYXRlIiwiZHQiLCJNYXRoIiwiYWJzIiwieCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDUixhQUFTRCxFQUFFLENBQUNFLFNBREo7QUFHUkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1g7QUFDQUMsSUFBQUEsVUFBVSxFQUFFLENBRkQ7QUFHWDtBQUNBQyxJQUFBQSxZQUFZLEVBQUUsQ0FKSDtBQUtYO0FBQ0FDLElBQUFBLFlBQVksRUFBRSxDQU5IO0FBT1g7QUFDQUMsSUFBQUEsS0FBSyxFQUFFLENBUkk7QUFTWDtB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RUFBQUEsU0ExRVEsdUJBMEVJO0FBQ1g7QUFDQS9DLElBQUFBLEVBQUUsQ0FBQ3lDLFdBQUgsQ0FBZU8sR0FBZixDQUFtQmhELEVBQUUsQ0FBQzJDLFdBQUgsQ0FBZUMsU0FBZixDQUF5QkMsUUFBNUMsRUFBc0QsS0FBS25CLFNBQTNELEVBQXNFLElBQXRFO0FBQ0ExQixJQUFBQSxFQUFFLENBQUN5QyxXQUFILENBQWVPLEdBQWYsQ0FBbUJoRCxFQUFFLENBQUMyQyxXQUFILENBQWVDLFNBQWYsQ0FBeUJFLE1BQTVDLEVBQW9ELEtBQUtYLE9BQXpELEVBQWtFLElBQWxFO0FBQ0EsR0E5RU87QUFnRlJjLEVBQUFBLEtBaEZRLG1CQWdGQSxDQUVQLENBbEZPO0FBb0ZSQyxFQUFBQSxNQUFNLEVBQUUsZ0JBQVNDLEVBQVQsRUFBYTtBQUNwQjtBQUNBLFFBQUksS0FBS25CLE9BQVQsRUFBa0I7QUFDakIsV0FBS1EsTUFBTCxJQUFlLEtBQUtqQyxLQUFMLEdBQWE0QyxFQUE1QjtBQUNBLEtBRkQsTUFFTyxJQUFJLEtBQUtqQixRQUFULEVBQW1CO0FBQ3pCLFdBQUtNLE1BQUwsSUFBZSxLQUFLakMsS0FBTCxHQUFhNEMsRUFBNUI7QUFDQSxLQU5tQixDQU9wQjs7O0FBQ0EsUUFBSUMsSUFBSSxDQUFDQyxHQUFMLENBQVMsS0FBS2IsTUFBZCxJQUF3QixLQUFLbEMsWUFBakMsRUFBK0M7QUFDOUM7QUFDQSxXQUFLa0MsTUFBTCxHQUFjLEtBQUtsQyxZQUFMLEdBQW9CLEtBQUtrQyxNQUF6QixHQUFrQ1ksSUFBSSxDQUFDQyxHQUFMLENBQVMsS0FBS2IsTUFBZCxDQUFoRDtBQUNBLEtBWG1CLENBYXBCOzs7QUFDQSxTQUFLRixJQUFMLENBQVVnQixDQUFWLElBQWUsS0FBS2QsTUFBTCxHQUFjVyxFQUE3QjtBQUNBO0FBbkdPLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuY2MuQ2xhc3Moe1xyXG5cdGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcblx0cHJvcGVydGllczoge1xyXG5cdFx0Ly8g5Li76KeS6Lez6LeD6auY5bqmXHJcblx0XHRqdW1wSGVpZ2h0OiAwLFxyXG5cdFx0Ly8g5Li76KeS6Lez6LeD5oyB57ut5pe26Ze0XHJcblx0XHRqdW1wRHVyYXRpb246IDAsXHJcblx0XHQvLyDmnIDlpKfnp7vliqjpgJ/luqZcclxuXHRcdG1heE1vdmVTcGVlZDogMCxcclxuXHRcdC8vIOWKoOmAn+W6plxyXG5cdFx0YWNjZWw6IDAsXHJcblx0XHQvLyDot7Pot4Ppn7PmlYjotYTmupBcclxuXHRcdGp1bXBBdWRpbzoge1xyXG5cdFx0XHRkZWZhdWx0OiBudWxsLFxyXG5cdFx0XHR0eXBlOiBjYy5BdWRpb0NsaXBcclxuXHRcdH0sXHJcblx0fSxcclxuXHRzZXRKdW1wQWN0aW9uOiBmdW5jdGlvbigpIHtcclxuXHRcdC8vIOi3s+i3g+S4iuWNh1xyXG5cdFx0dmFyIGp1bXBVcCA9IGNjLm1vdmVCeSh0aGlzLmp1bXBEdXJhdGlvbiwgY2MudjIoMCwgdGhpcy5qdW1wSGVpZ2h0KSkuZWFzaW5nKGNjLmVhc2VDdWJpY0FjdGlvbk91dCgpKTtcclxuXHRcdC8vIOS4i+iQvVxyXG5cdFx0dmFyIGp1bXBEb3duID0gY2MubW92ZUJ5KHRoaXMuanVtcER1cmF0aW9uLCBjYy52MigwLCAtdGhpcy5qdW1wSGVpZ2h0KSkuZWFzaW5nKGNjLmVhc2VDdWJpY0FjdGlvbkluKCkpO1xyXG5cdFx0Ly8g5re75Yqg5LiA5Liq5Zue6LCD5Ye95pWw77yM55So5LqO5Zyo5Yqo5L2c57uT5p2f5pe26LCD55So5oiR5Lus5a6a5LmJ55qE5YW25LuW5pa55rOVXHJcblx0XHR2YXIgY2FsbGJhY2sgPSBjYy5jYWxsRnVuYyh0aGlzLnBsYXlKdW1wU291bmQsIHRoaXMpO1xyXG5cdFx0Ly8g5LiN5pat6YeN5aSN77yM6ICM5LiU5q+P5qyh5a6M5oiQ6JC95Zyw5Yqo5L2c5ZCO6LCD55So5Zue6LCD5p2l5pKt5pS+5aOw6Z+zXHJcblx0XHRyZXR1cm4gY2MucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShqdW1wVXAsIGp1bXBEb3duLCBjYWxsYmFjaykpO1xyXG5cdH0sXHJcblxyXG5cdHBsYXlKdW1wU291bmQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0Ly8g6LCD55So5aOw6Z+z5byV5pOO5pKt5pS+5aOw6Z+zXHJcblx0XHRjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuanVtcEF1ZGlvLCBmYWxzZSk7XHJcblx0fSxcclxuXHJcblx0b25LZXlEb3duKGV2ZW50KSB7XHJcblx0XHQvLyBzZXQgYSBmbGFnIHdoZW4ga2V5IHByZXNzZWRcclxuXHRcdHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xyXG5cdFx0XHRjYXNlIGNjLm1hY3JvLktFWS5hOlxyXG5cdFx0XHRcdHRoaXMuYWNjTGVmdCA9IHRydWU7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgY2MubWFjcm8uS0VZLmQ6XHJcblx0XHRcdFx0dGhpcy5hY2NSaWdodCA9IHRydWU7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0b25LZXlVcChldmVudCkge1xyXG5cdFx0Ly8gdW5zZXQgYSBmbGFnIHdoZW4ga2V5IHJlbGVhc2VkXHJcblx0XHRzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcclxuXHRcdFx0Y2FzZSBjYy5tYWNyby5LRVkuYTpcclxuXHRcdFx0XHR0aGlzLmFjY0xlZnQgPSBmYWxzZTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBjYy5tYWNyby5LRVkuZDpcclxuXHRcdFx0XHR0aGlzLmFjY1JpZ2h0ID0gZmFsc2U7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0b25Mb2FkOiBmdW5jdGlvbigpIHtcclxuXHRcdC8vIOWIneWni+WMlui3s+i3g+WKqOS9nFxyXG5cdFx0dGhpcy5qdW1wQWN0aW9uID0gdGhpcy5zZXRKdW1wQWN0aW9uKCk7XHJcblx0XHR0aGlzLm5vZGUucnVuQWN0aW9uKHRoaXMuanVtcEFjdGlvbik7XHJcblxyXG5cdFx0Ly8g5Yqg6YCf5bqm5pa55ZCR5byA5YWzXHJcblx0XHR0aGlzLmFjY0xlZnQgPSBmYWxzZTtcclxuXHRcdHRoaXMuYWNjUmlnaHQgPSBmYWxzZTtcclxuXHRcdC8vIOS4u+inkuW9k+WJjeawtOW5s+aWueWQkemAn+W6plxyXG5cdFx0dGhpcy54U3BlZWQgPSAwO1xyXG5cclxuXHRcdC8vIOWIneWni+WMlumUruebmOi+k+WFpeebkeWQrFxyXG5cdFx0Y2Muc3lzdGVtRXZlbnQub24oY2MuU3lzdGVtRXZlbnQuRXZlbnRUeXBlLktFWV9ET1dOLCB0aGlzLm9uS2V5RG93biwgdGhpcyk7XHJcblx0XHRjYy5zeXN0ZW1FdmVudC5vbihjYy5TeXN0ZW1FdmVudC5FdmVudFR5cGUuS0VZX1VQLCB0aGlzLm9uS2V5VXAsIHRoaXMpO1xyXG5cdH0sXHJcblxyXG5cdG9uRGVzdHJveSgpIHtcclxuXHRcdC8vIOWPlua2iOmUruebmOi+k+WFpeebkeWQrFxyXG5cdFx0Y2Muc3lzdGVtRXZlbnQub2ZmKGNjLlN5c3RlbUV2ZW50LkV2ZW50VHlwZS5LRVlfRE9XTiwgdGhpcy5vbktleURvd24sIHRoaXMpO1xyXG5cdFx0Y2Muc3lzdGVtRXZlbnQub2ZmKGNjLlN5c3RlbUV2ZW50LkV2ZW50VHlwZS5LRVlfVVAsIHRoaXMub25LZXlVcCwgdGhpcyk7XHJcblx0fSxcclxuXHJcblx0c3RhcnQoKSB7XHJcblxyXG5cdH0sXHJcblxyXG5cdHVwZGF0ZTogZnVuY3Rpb24oZHQpIHtcclxuXHRcdC8vIOagueaNruW9k+WJjeWKoOmAn+W6puaWueWQkeavj+W4p+abtOaWsOmAn+W6plxyXG5cdFx0aWYgKHRoaXMuYWNjTGVmdCkge1xyXG5cdFx0XHR0aGlzLnhTcGVlZCAtPSB0aGlzLmFjY2VsICogZHQ7XHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuYWNjUmlnaHQpIHtcclxuXHRcdFx0dGhpcy54U3BlZWQgKz0gdGhpcy5hY2NlbCAqIGR0O1xyXG5cdFx0fVxyXG5cdFx0Ly8g6ZmQ5Yi25Li76KeS55qE6YCf5bqm5LiN6IO96LaF6L+H5pyA5aSn5YC8XHJcblx0XHRpZiAoTWF0aC5hYnModGhpcy54U3BlZWQpID4gdGhpcy5tYXhNb3ZlU3BlZWQpIHtcclxuXHRcdFx0Ly8gaWYgc3BlZWQgcmVhY2ggbGltaXQsIHVzZSBtYXggc3BlZWQgd2l0aCBjdXJyZW50IGRpcmVjdGlvblxyXG5cdFx0XHR0aGlzLnhTcGVlZCA9IHRoaXMubWF4TW92ZVNwZWVkICogdGhpcy54U3BlZWQgLyBNYXRoLmFicyh0aGlzLnhTcGVlZCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8g5qC55o2u5b2T5YmN6YCf5bqm5pu05paw5Li76KeS55qE5L2N572uXHJcblx0XHR0aGlzLm5vZGUueCArPSB0aGlzLnhTcGVlZCAqIGR0O1xyXG5cdH0sXHJcbn0pO1xuIl19