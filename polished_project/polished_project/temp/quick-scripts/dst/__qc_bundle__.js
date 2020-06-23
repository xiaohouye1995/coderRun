
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/migration/use_v2.0.x_cc.Toggle_event');
require('./assets/scripts/Game');
require('./assets/scripts/Player');
require('./assets/scripts/ScoreAnim');
require('./assets/scripts/ScoreFX');
require('./assets/scripts/Star');

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
//------QC-SOURCE-SPLIT------

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
cc._RF.push(module, 'c10bbPdGYhDWaLoKLV38bHf', 'Player');
// scripts/Player.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    // 主角跳跃高度
    jumpHeight: 0,
    // 主角跳跃持续时间
    jumpDuration: 0,
    // 辅助形变动作时间
    squashDuration: 0,
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
  // use this for initialization
  onLoad: function onLoad() {
    this.enabled = false; // 加速度方向开关

    this.accLeft = false;
    this.accRight = false; // 主角当前水平方向速度

    this.xSpeed = 0; // screen boundaries

    this.minPosX = -this.node.parent.width / 2;
    this.maxPosX = this.node.parent.width / 2; // 初始化跳跃动作

    this.jumpAction = this.setJumpAction(); // 初始化键盘输入监听

    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    var touchReceiver = cc.Canvas.instance.node;
    touchReceiver.on('touchstart', this.onTouchStart, this);
    touchReceiver.on('touchend', this.onTouchEnd, this);
  },
  onDestroy: function onDestroy() {
    // 取消键盘输入监听
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    var touchReceiver = cc.Canvas.instance.node;
    touchReceiver.off('touchstart', this.onTouchStart, this);
    touchReceiver.off('touchend', this.onTouchEnd, this);
  },
  onKeyDown: function onKeyDown(event) {
    switch (event.keyCode) {
      case cc.macro.KEY.a:
      case cc.macro.KEY.left:
        this.accLeft = true;
        this.accRight = false;
        break;

      case cc.macro.KEY.d:
      case cc.macro.KEY.right:
        this.accLeft = false;
        this.accRight = true;
        break;
    }
  },
  onKeyUp: function onKeyUp(event) {
    switch (event.keyCode) {
      case cc.macro.KEY.a:
      case cc.macro.KEY.left:
        this.accLeft = false;
        break;

      case cc.macro.KEY.d:
      case cc.macro.KEY.right:
        this.accRight = false;
        break;
    }
  },
  onTouchStart: function onTouchStart(event) {
    var touchLoc = event.getLocation();

    if (touchLoc.x >= cc.winSize.width / 2) {
      this.accLeft = false;
      this.accRight = true;
    } else {
      this.accLeft = true;
      this.accRight = false;
    }
  },
  onTouchEnd: function onTouchEnd(event) {
    this.accLeft = false;
    this.accRight = false;
  },
  setJumpAction: function setJumpAction() {
    // 跳跃上升
    var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut()); // 下落

    var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn()); // 形变

    var squash = cc.scaleTo(this.squashDuration, 1, 0.6);
    var stretch = cc.scaleTo(this.squashDuration, 1, 1.2);
    var scaleBack = cc.scaleTo(this.squashDuration, 1, 1); // 添加一个回调函数，用于在动作结束时调用我们定义的其他方法

    var callback = cc.callFunc(this.playJumpSound, this); // 不断重复，而且每次完成落地动作后调用回调来播放声音

    return cc.repeatForever(cc.sequence(squash, stretch, jumpUp, scaleBack, jumpDown, callback));
  },
  playJumpSound: function playJumpSound() {
    // 调用声音引擎播放声音
    cc.audioEngine.playEffect(this.jumpAudio, false);
  },
  getCenterPos: function getCenterPos() {
    var centerPos = cc.v2(this.node.x, this.node.y + this.node.height / 2);
    return centerPos;
  },
  startMoveAt: function startMoveAt(pos) {
    this.enabled = true;
    this.xSpeed = 0;
    this.node.setPosition(pos);
    this.node.runAction(this.setJumpAction());
  },
  stopMove: function stopMove() {
    this.node.stopAllActions();
  },
  // called every frame
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


    this.node.x += this.xSpeed * dt; // limit player position inside screen

    if (this.node.x > this.node.parent.width / 2) {
      this.node.x = this.node.parent.width / 2;
      this.xSpeed = 0;
    } else if (this.node.x < -this.node.parent.width / 2) {
      this.node.x = -this.node.parent.width / 2;
      this.xSpeed = 0;
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcUGxheWVyLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwianVtcEhlaWdodCIsImp1bXBEdXJhdGlvbiIsInNxdWFzaER1cmF0aW9uIiwibWF4TW92ZVNwZWVkIiwiYWNjZWwiLCJqdW1wQXVkaW8iLCJ0eXBlIiwiQXVkaW9DbGlwIiwib25Mb2FkIiwiZW5hYmxlZCIsImFjY0xlZnQiLCJhY2NSaWdodCIsInhTcGVlZCIsIm1pblBvc1giLCJub2RlIiwicGFyZW50Iiwid2lkdGgiLCJtYXhQb3NYIiwianVtcEFjdGlvbiIsInNldEp1bXBBY3Rpb24iLCJzeXN0ZW1FdmVudCIsIm9uIiwiU3lzdGVtRXZlbnQiLCJFdmVudFR5cGUiLCJLRVlfRE9XTiIsIm9uS2V5RG93biIsIktFWV9VUCIsIm9uS2V5VXAiLCJ0b3VjaFJlY2VpdmVyIiwiQ2FudmFzIiwiaW5zdGFuY2UiLCJvblRvdWNoU3RhcnQiLCJvblRvdWNoRW5kIiwib25EZXN0cm95Iiwib2ZmIiwiZXZlbnQiLCJrZXlDb2RlIiwibWFjcm8iLCJLRVkiLCJhIiwibGVmdCIsImQiLCJyaWdodCIsInRvdWNoTG9jIiwiZ2V0TG9jYXRpb24iLCJ4Iiwid2luU2l6ZSIsImp1bXBVcCIsIm1vdmVCeSIsInYyIiwiZWFzaW5nIiwiZWFzZUN1YmljQWN0aW9uT3V0IiwianVtcERvd24iLCJlYXNlQ3ViaWNBY3Rpb25JbiIsInNxdWFzaCIsInNjYWxlVG8iLCJzdHJldGNoIiwic2NhbGVCYWNrIiwiY2FsbGJhY2siLCJjYWxsRnVuYyIsInBsYXlKdW1wU291bmQiLCJyZXBlYXRGb3JldmVyIiwic2VxdWVuY2UiLCJhdWRpb0VuZ2luZSIsInBsYXlFZmZlY3QiLCJnZXRDZW50ZXJQb3MiLCJjZW50ZXJQb3MiLCJ5IiwiaGVpZ2h0Iiwic3RhcnRNb3ZlQXQiLCJwb3MiLCJzZXRQb3NpdGlvbiIsInJ1bkFjdGlvbiIsInN0b3BNb3ZlIiwic3RvcEFsbEFjdGlvbnMiLCJ1cGRhdGUiLCJkdCIsIk1hdGgiLCJhYnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSO0FBQ0FDLElBQUFBLFVBQVUsRUFBRSxDQUZKO0FBR1I7QUFDQUMsSUFBQUEsWUFBWSxFQUFFLENBSk47QUFLUjtBQUNBQyxJQUFBQSxjQUFjLEVBQUUsQ0FOUjtBQU9SO0FBQ0FDLElBQUFBLFlBQVksRUFBRSxDQVJOO0FBU1I7QUFDQUMsSUFBQUEsS0FBSyxFQUFFLENBVkM7QUFXUjtBQUNBQyxJQUFBQSxTQUFTLEVBQUU7QUFDUCxpQkFBUyxJQURGO0FBRVBDLE1BQUFBLElBQUksRUFBRVYsRUFBRSxDQUFDVztBQUZGO0FBWkgsR0FIUDtBQXFCTDtBQUNBQyxFQUFBQSxNQUFNLEVBQUUsa0JBQVk7QUFDaEIsU0FBS0MsT0FBTCxHQUFlLEtBQWYsQ0FEZ0IsQ0FFaEI7O0FBQ0EsU0FBS0MsT0FBTCxHQUFlLEtBQWY7QUFDQSxTQUFLQyxRQUFMLEdBQWdCLEtBQWhCLENBSmdCLENBS2hCOztBQUNBLFNBQUtDLE1BQUwsR0FBYyxDQUFkLENBTmdCLENBT2hCOztBQUNBLFNBQUtDLE9BQUwsR0FBZSxDQUFDLEtBQUtDLElBQUwsQ0FBVUMsTUFBVixDQUFpQkMsS0FBbEIsR0FBd0IsQ0FBdkM7QUFDQSxTQUFLQyxPQUFMLEdBQWUsS0FBS0gsSUFBTCxDQUFVQyxNQUFWLENBQWlCQyxLQUFqQixHQUF1QixDQUF0QyxDQVRnQixDQVdoQjs7QUFDQSxTQUFLRSxVQUFMLEdBQWtCLEtBQUtDLGFBQUwsRUFBbEIsQ0FaZ0IsQ0FjaEI7O0FBQ0F2QixJQUFBQSxFQUFFLENBQUN3QixXQUFILENBQWVDLEVBQWYsQ0FBa0J6QixFQUFFLENBQUMwQixXQUFILENBQWVDLFNBQWYsQ0FBeUJDLFFBQTNDLEVBQXFELEtBQUtDLFNBQTFELEVBQXFFLElBQXJFO0FBQ0E3QixJQUFBQSxFQUFFLENBQUN3QixXQUFILENBQWVDLEVBQWYsQ0FBa0J6QixFQUFFLENBQUMwQixXQUFILENBQWVDLFNBQWYsQ0FBeUJHLE1BQTNDLEVBQW1ELEtBQUtDLE9BQXhELEVBQWlFLElBQWpFO0FBRUEsUUFBSUMsYUFBYSxHQUFHaEMsRUFBRSxDQUFDaUMsTUFBSCxDQUFVQyxRQUFWLENBQW1CaEIsSUFBdkM7QUFDQWMsSUFBQUEsYUFBYSxDQUFDUCxFQUFkLENBQWlCLFlBQWpCLEVBQStCLEtBQUtVLFlBQXBDLEVBQWtELElBQWxEO0FBQ0FILElBQUFBLGFBQWEsQ0FBQ1AsRUFBZCxDQUFpQixVQUFqQixFQUE2QixLQUFLVyxVQUFsQyxFQUE4QyxJQUE5QztBQUNILEdBM0NJO0FBNkNMQyxFQUFBQSxTQTdDSyx1QkE2Q1E7QUFDVDtBQUNBckMsSUFBQUEsRUFBRSxDQUFDd0IsV0FBSCxDQUFlYyxHQUFmLENBQW1CdEMsRUFBRSxDQUFDMEIsV0FBSCxDQUFlQyxTQUFmLENBQXlCQyxRQUE1QyxFQUFzRCxLQUFLQyxTQUEzRCxFQUFzRSxJQUF0RTtBQUNBN0IsSUFBQUEsRUFBRSxDQUFDd0IsV0FBSCxDQUFlYyxHQUFmLENBQW1CdEMsRUFBRSxDQUFDMEIsV0FBSCxDQUFlQyxTQUFmLENBQXlCRyxNQUE1QyxFQUFvRCxLQUFLQyxPQUF6RCxFQUFrRSxJQUFsRTtBQUVBLFFBQUlDLGFBQWEsR0FBR2hDLEVBQUUsQ0FBQ2lDLE1BQUgsQ0FBVUMsUUFBVixDQUFtQmhCLElBQXZDO0FBQ0FjLElBQUFBLGFBQWEsQ0FBQ00sR0FBZCxDQUFrQixZQUFsQixFQUFnQyxLQUFLSCxZQUFyQyxFQUFtRCxJQUFuRDtBQUNBSCxJQUFBQSxhQUFhLENBQUNNLEdBQWQsQ0FBa0IsVUFBbEIsRUFBOEIsS0FBS0YsVUFBbkMsRUFBK0MsSUFBL0M7QUFDSCxHQXJESTtBQXVETFAsRUFBQUEsU0F2REsscUJBdURNVSxLQXZETixFQXVEYTtBQUNkLFlBQU9BLEtBQUssQ0FBQ0MsT0FBYjtBQUNJLFdBQUt4QyxFQUFFLENBQUN5QyxLQUFILENBQVNDLEdBQVQsQ0FBYUMsQ0FBbEI7QUFDQSxXQUFLM0MsRUFBRSxDQUFDeUMsS0FBSCxDQUFTQyxHQUFULENBQWFFLElBQWxCO0FBQ0ksYUFBSzlCLE9BQUwsR0FBZSxJQUFmO0FBQ0EsYUFBS0MsUUFBTCxHQUFnQixLQUFoQjtBQUNBOztBQUNKLFdBQUtmLEVBQUUsQ0FBQ3lDLEtBQUgsQ0FBU0MsR0FBVCxDQUFhRyxDQUFsQjtBQUNBLFdBQUs3QyxFQUFFLENBQUN5QyxLQUFILENBQVNDLEdBQVQsQ0FBYUksS0FBbEI7QUFDSSxhQUFLaEMsT0FBTCxHQUFlLEtBQWY7QUFDQSxhQUFLQyxRQUFMLEdBQWdCLElBQWhCO0FBQ0E7QUFWUjtBQVlILEdBcEVJO0FBc0VMZ0IsRUFBQUEsT0F0RUssbUJBc0VJUSxLQXRFSixFQXNFVztBQUNaLFlBQU9BLEtBQUssQ0FBQ0MsT0FBYjtBQUNJLFdBQUt4QyxFQUFFLENBQUN5QyxLQUFILENBQVNDLEdBQVQsQ0FBYUMsQ0FBbEI7QUFDQSxXQUFLM0MsRUFBRSxDQUFDeUMsS0FBSCxDQUFTQyxHQUFULENBQWFFLElBQWxCO0FBQ0ksYUFBSzlCLE9BQUwsR0FBZSxLQUFmO0FBQ0E7O0FBQ0osV0FBS2QsRUFBRSxDQUFDeUMsS0FBSCxDQUFTQyxHQUFULENBQWFHLENBQWxCO0FBQ0EsV0FBSzdDLEVBQUUsQ0FBQ3lDLEtBQUgsQ0FBU0MsR0FBVCxDQUFhSSxLQUFsQjtBQUNJLGFBQUsvQixRQUFMLEdBQWdCLEtBQWhCO0FBQ0E7QUFSUjtBQVVILEdBakZJO0FBbUZMb0IsRUFBQUEsWUFuRkssd0JBbUZTSSxLQW5GVCxFQW1GZ0I7QUFDakIsUUFBSVEsUUFBUSxHQUFHUixLQUFLLENBQUNTLFdBQU4sRUFBZjs7QUFDQSxRQUFJRCxRQUFRLENBQUNFLENBQVQsSUFBY2pELEVBQUUsQ0FBQ2tELE9BQUgsQ0FBVzlCLEtBQVgsR0FBaUIsQ0FBbkMsRUFBc0M7QUFDbEMsV0FBS04sT0FBTCxHQUFlLEtBQWY7QUFDQSxXQUFLQyxRQUFMLEdBQWdCLElBQWhCO0FBQ0gsS0FIRCxNQUdPO0FBQ0gsV0FBS0QsT0FBTCxHQUFlLElBQWY7QUFDQSxXQUFLQyxRQUFMLEdBQWdCLEtBQWhCO0FBQ0g7QUFDSixHQTVGSTtBQThGTHFCLEVBQUFBLFVBOUZLLHNCQThGT0csS0E5RlAsRUE4RmM7QUFDZixTQUFLekIsT0FBTCxHQUFlLEtBQWY7QUFDQSxTQUFLQyxRQUFMLEdBQWdCLEtBQWhCO0FBQ0gsR0FqR0k7QUFtR0xRLEVBQUFBLGFBQWEsRUFBRSx5QkFBWTtBQUN2QjtBQUNBLFFBQUk0QixNQUFNLEdBQUduRCxFQUFFLENBQUNvRCxNQUFILENBQVUsS0FBSy9DLFlBQWYsRUFBNkJMLEVBQUUsQ0FBQ3FELEVBQUgsQ0FBTSxDQUFOLEVBQVMsS0FBS2pELFVBQWQsQ0FBN0IsRUFBd0RrRCxNQUF4RCxDQUErRHRELEVBQUUsQ0FBQ3VELGtCQUFILEVBQS9ELENBQWIsQ0FGdUIsQ0FHdkI7O0FBQ0EsUUFBSUMsUUFBUSxHQUFHeEQsRUFBRSxDQUFDb0QsTUFBSCxDQUFVLEtBQUsvQyxZQUFmLEVBQTZCTCxFQUFFLENBQUNxRCxFQUFILENBQU0sQ0FBTixFQUFTLENBQUMsS0FBS2pELFVBQWYsQ0FBN0IsRUFBeURrRCxNQUF6RCxDQUFnRXRELEVBQUUsQ0FBQ3lELGlCQUFILEVBQWhFLENBQWYsQ0FKdUIsQ0FLdkI7O0FBQ0EsUUFBSUMsTUFBTSxHQUFHMUQsRUFBRSxDQUFDMkQsT0FBSCxDQUFXLEtBQUtyRCxjQUFoQixFQUFnQyxDQUFoQyxFQUFtQyxHQUFuQyxDQUFiO0FBQ0EsUUFBSXNELE9BQU8sR0FBRzVELEVBQUUsQ0FBQzJELE9BQUgsQ0FBVyxLQUFLckQsY0FBaEIsRUFBZ0MsQ0FBaEMsRUFBbUMsR0FBbkMsQ0FBZDtBQUNBLFFBQUl1RCxTQUFTLEdBQUc3RCxFQUFFLENBQUMyRCxPQUFILENBQVcsS0FBS3JELGNBQWhCLEVBQWdDLENBQWhDLEVBQW1DLENBQW5DLENBQWhCLENBUnVCLENBU3ZCOztBQUNBLFFBQUl3RCxRQUFRLEdBQUc5RCxFQUFFLENBQUMrRCxRQUFILENBQVksS0FBS0MsYUFBakIsRUFBZ0MsSUFBaEMsQ0FBZixDQVZ1QixDQVd2Qjs7QUFDQSxXQUFPaEUsRUFBRSxDQUFDaUUsYUFBSCxDQUFpQmpFLEVBQUUsQ0FBQ2tFLFFBQUgsQ0FBWVIsTUFBWixFQUFvQkUsT0FBcEIsRUFBNkJULE1BQTdCLEVBQXFDVSxTQUFyQyxFQUFnREwsUUFBaEQsRUFBMERNLFFBQTFELENBQWpCLENBQVA7QUFDSCxHQWhISTtBQWtITEUsRUFBQUEsYUFBYSxFQUFFLHlCQUFZO0FBQ3ZCO0FBQ0FoRSxJQUFBQSxFQUFFLENBQUNtRSxXQUFILENBQWVDLFVBQWYsQ0FBMEIsS0FBSzNELFNBQS9CLEVBQTBDLEtBQTFDO0FBQ0gsR0FySEk7QUF1SEw0RCxFQUFBQSxZQUFZLEVBQUUsd0JBQVk7QUFDdEIsUUFBSUMsU0FBUyxHQUFHdEUsRUFBRSxDQUFDcUQsRUFBSCxDQUFNLEtBQUtuQyxJQUFMLENBQVUrQixDQUFoQixFQUFtQixLQUFLL0IsSUFBTCxDQUFVcUQsQ0FBVixHQUFjLEtBQUtyRCxJQUFMLENBQVVzRCxNQUFWLEdBQWlCLENBQWxELENBQWhCO0FBQ0EsV0FBT0YsU0FBUDtBQUNILEdBMUhJO0FBNEhMRyxFQUFBQSxXQUFXLEVBQUUscUJBQVVDLEdBQVYsRUFBZTtBQUN4QixTQUFLN0QsT0FBTCxHQUFlLElBQWY7QUFDQSxTQUFLRyxNQUFMLEdBQWMsQ0FBZDtBQUNBLFNBQUtFLElBQUwsQ0FBVXlELFdBQVYsQ0FBc0JELEdBQXRCO0FBQ0EsU0FBS3hELElBQUwsQ0FBVTBELFNBQVYsQ0FBb0IsS0FBS3JELGFBQUwsRUFBcEI7QUFDSCxHQWpJSTtBQW1JTHNELEVBQUFBLFFBQVEsRUFBRSxvQkFBWTtBQUNsQixTQUFLM0QsSUFBTCxDQUFVNEQsY0FBVjtBQUNILEdBcklJO0FBdUlMO0FBQ0FDLEVBQUFBLE1BQU0sRUFBRSxnQkFBVUMsRUFBVixFQUFjO0FBQ2xCO0FBQ0EsUUFBSSxLQUFLbEUsT0FBVCxFQUFrQjtBQUNkLFdBQUtFLE1BQUwsSUFBZSxLQUFLUixLQUFMLEdBQWF3RSxFQUE1QjtBQUNILEtBRkQsTUFFTyxJQUFJLEtBQUtqRSxRQUFULEVBQW1CO0FBQ3RCLFdBQUtDLE1BQUwsSUFBZSxLQUFLUixLQUFMLEdBQWF3RSxFQUE1QjtBQUNILEtBTmlCLENBT2xCOzs7QUFDQSxRQUFLQyxJQUFJLENBQUNDLEdBQUwsQ0FBUyxLQUFLbEUsTUFBZCxJQUF3QixLQUFLVCxZQUFsQyxFQUFpRDtBQUM3QztBQUNBLFdBQUtTLE1BQUwsR0FBYyxLQUFLVCxZQUFMLEdBQW9CLEtBQUtTLE1BQXpCLEdBQWtDaUUsSUFBSSxDQUFDQyxHQUFMLENBQVMsS0FBS2xFLE1BQWQsQ0FBaEQ7QUFDSCxLQVhpQixDQWFsQjs7O0FBQ0EsU0FBS0UsSUFBTCxDQUFVK0IsQ0FBVixJQUFlLEtBQUtqQyxNQUFMLEdBQWNnRSxFQUE3QixDQWRrQixDQWdCbEI7O0FBQ0EsUUFBSyxLQUFLOUQsSUFBTCxDQUFVK0IsQ0FBVixHQUFjLEtBQUsvQixJQUFMLENBQVVDLE1BQVYsQ0FBaUJDLEtBQWpCLEdBQXVCLENBQTFDLEVBQTZDO0FBQ3pDLFdBQUtGLElBQUwsQ0FBVStCLENBQVYsR0FBYyxLQUFLL0IsSUFBTCxDQUFVQyxNQUFWLENBQWlCQyxLQUFqQixHQUF1QixDQUFyQztBQUNBLFdBQUtKLE1BQUwsR0FBYyxDQUFkO0FBQ0gsS0FIRCxNQUdPLElBQUksS0FBS0UsSUFBTCxDQUFVK0IsQ0FBVixHQUFjLENBQUMsS0FBSy9CLElBQUwsQ0FBVUMsTUFBVixDQUFpQkMsS0FBbEIsR0FBd0IsQ0FBMUMsRUFBNkM7QUFDaEQsV0FBS0YsSUFBTCxDQUFVK0IsQ0FBVixHQUFjLENBQUMsS0FBSy9CLElBQUwsQ0FBVUMsTUFBVixDQUFpQkMsS0FBbEIsR0FBd0IsQ0FBdEM7QUFDQSxXQUFLSixNQUFMLEdBQWMsQ0FBZDtBQUNIO0FBQ0o7QUFoS0ksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8g5Li76KeS6Lez6LeD6auY5bqmXG4gICAgICAgIGp1bXBIZWlnaHQ6IDAsXG4gICAgICAgIC8vIOS4u+inkui3s+i3g+aMgee7reaXtumXtFxuICAgICAgICBqdW1wRHVyYXRpb246IDAsXG4gICAgICAgIC8vIOi+heWKqeW9ouWPmOWKqOS9nOaXtumXtFxuICAgICAgICBzcXVhc2hEdXJhdGlvbjogMCxcbiAgICAgICAgLy8g5pyA5aSn56e75Yqo6YCf5bqmXG4gICAgICAgIG1heE1vdmVTcGVlZDogMCxcbiAgICAgICAgLy8g5Yqg6YCf5bqmXG4gICAgICAgIGFjY2VsOiAwLFxuICAgICAgICAvLyDot7Pot4Ppn7PmlYjotYTmupBcbiAgICAgICAganVtcEF1ZGlvOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwXG4gICAgICAgIH0sXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgLy8g5Yqg6YCf5bqm5pa55ZCR5byA5YWzXG4gICAgICAgIHRoaXMuYWNjTGVmdCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmFjY1JpZ2h0ID0gZmFsc2U7XG4gICAgICAgIC8vIOS4u+inkuW9k+WJjeawtOW5s+aWueWQkemAn+W6plxuICAgICAgICB0aGlzLnhTcGVlZCA9IDA7XG4gICAgICAgIC8vIHNjcmVlbiBib3VuZGFyaWVzXG4gICAgICAgIHRoaXMubWluUG9zWCA9IC10aGlzLm5vZGUucGFyZW50LndpZHRoLzI7XG4gICAgICAgIHRoaXMubWF4UG9zWCA9IHRoaXMubm9kZS5wYXJlbnQud2lkdGgvMjtcblxuICAgICAgICAvLyDliJ3lp4vljJbot7Pot4PliqjkvZxcbiAgICAgICAgdGhpcy5qdW1wQWN0aW9uID0gdGhpcy5zZXRKdW1wQWN0aW9uKCk7XG5cbiAgICAgICAgLy8g5Yid5aeL5YyW6ZSu55uY6L6T5YWl55uR5ZCsXG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9uKGNjLlN5c3RlbUV2ZW50LkV2ZW50VHlwZS5LRVlfRE9XTiwgdGhpcy5vbktleURvd24sIHRoaXMpO1xuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vbihjYy5TeXN0ZW1FdmVudC5FdmVudFR5cGUuS0VZX1VQLCB0aGlzLm9uS2V5VXAsIHRoaXMpO1xuICAgICAgICBcbiAgICAgICAgdmFyIHRvdWNoUmVjZWl2ZXIgPSBjYy5DYW52YXMuaW5zdGFuY2Uubm9kZTtcbiAgICAgICAgdG91Y2hSZWNlaXZlci5vbigndG91Y2hzdGFydCcsIHRoaXMub25Ub3VjaFN0YXJ0LCB0aGlzKTtcbiAgICAgICAgdG91Y2hSZWNlaXZlci5vbigndG91Y2hlbmQnLCB0aGlzLm9uVG91Y2hFbmQsIHRoaXMpO1xuICAgIH0sXG5cbiAgICBvbkRlc3Ryb3kgKCkge1xuICAgICAgICAvLyDlj5bmtojplK7nm5jovpPlhaXnm5HlkKxcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub2ZmKGNjLlN5c3RlbUV2ZW50LkV2ZW50VHlwZS5LRVlfRE9XTiwgdGhpcy5vbktleURvd24sIHRoaXMpO1xuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vZmYoY2MuU3lzdGVtRXZlbnQuRXZlbnRUeXBlLktFWV9VUCwgdGhpcy5vbktleVVwLCB0aGlzKTtcbiAgICAgICAgXG4gICAgICAgIHZhciB0b3VjaFJlY2VpdmVyID0gY2MuQ2FudmFzLmluc3RhbmNlLm5vZGU7XG4gICAgICAgIHRvdWNoUmVjZWl2ZXIub2ZmKCd0b3VjaHN0YXJ0JywgdGhpcy5vblRvdWNoU3RhcnQsIHRoaXMpO1xuICAgICAgICB0b3VjaFJlY2VpdmVyLm9mZigndG91Y2hlbmQnLCB0aGlzLm9uVG91Y2hFbmQsIHRoaXMpO1xuICAgIH0sXG5cbiAgICBvbktleURvd24gKGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaChldmVudC5rZXlDb2RlKSB7XG4gICAgICAgICAgICBjYXNlIGNjLm1hY3JvLktFWS5hOlxuICAgICAgICAgICAgY2FzZSBjYy5tYWNyby5LRVkubGVmdDpcbiAgICAgICAgICAgICAgICB0aGlzLmFjY0xlZnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuYWNjUmlnaHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLmQ6XG4gICAgICAgICAgICBjYXNlIGNjLm1hY3JvLktFWS5yaWdodDpcbiAgICAgICAgICAgICAgICB0aGlzLmFjY0xlZnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmFjY1JpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbktleVVwIChldmVudCkge1xuICAgICAgICBzd2l0Y2goZXZlbnQua2V5Q29kZSkge1xuICAgICAgICAgICAgY2FzZSBjYy5tYWNyby5LRVkuYTpcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLmxlZnQ6XG4gICAgICAgICAgICAgICAgdGhpcy5hY2NMZWZ0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNjLm1hY3JvLktFWS5kOlxuICAgICAgICAgICAgY2FzZSBjYy5tYWNyby5LRVkucmlnaHQ6XG4gICAgICAgICAgICAgICAgdGhpcy5hY2NSaWdodCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uVG91Y2hTdGFydCAoZXZlbnQpIHtcbiAgICAgICAgdmFyIHRvdWNoTG9jID0gZXZlbnQuZ2V0TG9jYXRpb24oKTtcbiAgICAgICAgaWYgKHRvdWNoTG9jLnggPj0gY2Mud2luU2l6ZS53aWR0aC8yKSB7XG4gICAgICAgICAgICB0aGlzLmFjY0xlZnQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuYWNjUmlnaHQgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hY2NMZWZ0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuYWNjUmlnaHQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvblRvdWNoRW5kIChldmVudCkge1xuICAgICAgICB0aGlzLmFjY0xlZnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5hY2NSaWdodCA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICBzZXRKdW1wQWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIOi3s+i3g+S4iuWNh1xuICAgICAgICB2YXIganVtcFVwID0gY2MubW92ZUJ5KHRoaXMuanVtcER1cmF0aW9uLCBjYy52MigwLCB0aGlzLmp1bXBIZWlnaHQpKS5lYXNpbmcoY2MuZWFzZUN1YmljQWN0aW9uT3V0KCkpO1xuICAgICAgICAvLyDkuIvokL1cbiAgICAgICAgdmFyIGp1bXBEb3duID0gY2MubW92ZUJ5KHRoaXMuanVtcER1cmF0aW9uLCBjYy52MigwLCAtdGhpcy5qdW1wSGVpZ2h0KSkuZWFzaW5nKGNjLmVhc2VDdWJpY0FjdGlvbkluKCkpO1xuICAgICAgICAvLyDlvaLlj5hcbiAgICAgICAgdmFyIHNxdWFzaCA9IGNjLnNjYWxlVG8odGhpcy5zcXVhc2hEdXJhdGlvbiwgMSwgMC42KTtcbiAgICAgICAgdmFyIHN0cmV0Y2ggPSBjYy5zY2FsZVRvKHRoaXMuc3F1YXNoRHVyYXRpb24sIDEsIDEuMik7XG4gICAgICAgIHZhciBzY2FsZUJhY2sgPSBjYy5zY2FsZVRvKHRoaXMuc3F1YXNoRHVyYXRpb24sIDEsIDEpO1xuICAgICAgICAvLyDmt7vliqDkuIDkuKrlm57osIPlh73mlbDvvIznlKjkuo7lnKjliqjkvZznu5PmnZ/ml7bosIPnlKjmiJHku6zlrprkuYnnmoTlhbbku5bmlrnms5VcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gY2MuY2FsbEZ1bmModGhpcy5wbGF5SnVtcFNvdW5kLCB0aGlzKTtcbiAgICAgICAgLy8g5LiN5pat6YeN5aSN77yM6ICM5LiU5q+P5qyh5a6M5oiQ6JC95Zyw5Yqo5L2c5ZCO6LCD55So5Zue6LCD5p2l5pKt5pS+5aOw6Z+zXG4gICAgICAgIHJldHVybiBjYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKHNxdWFzaCwgc3RyZXRjaCwganVtcFVwLCBzY2FsZUJhY2ssIGp1bXBEb3duLCBjYWxsYmFjaykpO1xuICAgIH0sXG5cbiAgICBwbGF5SnVtcFNvdW5kOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIOiwg+eUqOWjsOmfs+W8leaTjuaSreaUvuWjsOmfs1xuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuanVtcEF1ZGlvLCBmYWxzZSk7XG4gICAgfSxcblxuICAgIGdldENlbnRlclBvczogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2VudGVyUG9zID0gY2MudjIodGhpcy5ub2RlLngsIHRoaXMubm9kZS55ICsgdGhpcy5ub2RlLmhlaWdodC8yKTtcbiAgICAgICAgcmV0dXJuIGNlbnRlclBvcztcbiAgICB9LFxuXG4gICAgc3RhcnRNb3ZlQXQ6IGZ1bmN0aW9uIChwb3MpIHtcbiAgICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy54U3BlZWQgPSAwO1xuICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24ocG9zKTtcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbih0aGlzLnNldEp1bXBBY3Rpb24oKSk7XG4gICAgfSxcblxuICAgIHN0b3BNb3ZlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubm9kZS5zdG9wQWxsQWN0aW9ucygpO1xuICAgIH0sXG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWVcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuICAgICAgICAvLyDmoLnmja7lvZPliY3liqDpgJ/luqbmlrnlkJHmr4/luKfmm7TmlrDpgJ/luqZcbiAgICAgICAgaWYgKHRoaXMuYWNjTGVmdCkge1xuICAgICAgICAgICAgdGhpcy54U3BlZWQgLT0gdGhpcy5hY2NlbCAqIGR0O1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYWNjUmlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMueFNwZWVkICs9IHRoaXMuYWNjZWwgKiBkdDtcbiAgICAgICAgfVxuICAgICAgICAvLyDpmZDliLbkuLvop5LnmoTpgJ/luqbkuI3og73otoXov4fmnIDlpKflgLxcbiAgICAgICAgaWYgKCBNYXRoLmFicyh0aGlzLnhTcGVlZCkgPiB0aGlzLm1heE1vdmVTcGVlZCApIHtcbiAgICAgICAgICAgIC8vIGlmIHNwZWVkIHJlYWNoIGxpbWl0LCB1c2UgbWF4IHNwZWVkIHdpdGggY3VycmVudCBkaXJlY3Rpb25cbiAgICAgICAgICAgIHRoaXMueFNwZWVkID0gdGhpcy5tYXhNb3ZlU3BlZWQgKiB0aGlzLnhTcGVlZCAvIE1hdGguYWJzKHRoaXMueFNwZWVkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOagueaNruW9k+WJjemAn+W6puabtOaWsOS4u+inkueahOS9jee9rlxuICAgICAgICB0aGlzLm5vZGUueCArPSB0aGlzLnhTcGVlZCAqIGR0O1xuXG4gICAgICAgIC8vIGxpbWl0IHBsYXllciBwb3NpdGlvbiBpbnNpZGUgc2NyZWVuXG4gICAgICAgIGlmICggdGhpcy5ub2RlLnggPiB0aGlzLm5vZGUucGFyZW50LndpZHRoLzIpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS54ID0gdGhpcy5ub2RlLnBhcmVudC53aWR0aC8yO1xuICAgICAgICAgICAgdGhpcy54U3BlZWQgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubm9kZS54IDwgLXRoaXMubm9kZS5wYXJlbnQud2lkdGgvMikge1xuICAgICAgICAgICAgdGhpcy5ub2RlLnggPSAtdGhpcy5ub2RlLnBhcmVudC53aWR0aC8yO1xuICAgICAgICAgICAgdGhpcy54U3BlZWQgPSAwO1xuICAgICAgICB9XG4gICAgfSxcbn0pO1xuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/ScoreFX.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'dd18c67pr9OM5wJb/yY6Onf', 'ScoreFX');
// scripts/ScoreFX.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    anim: {
      "default": null,
      type: cc.Animation
    }
  },
  init: function init(game) {
    this.game = game;
    this.anim.getComponent('ScoreAnim').init(this);
  },
  despawn: function despawn() {
    this.game.despawnScoreFX(this.node);
  },
  play: function play() {
    this.anim.play('score_pop');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcU2NvcmVGWC5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImFuaW0iLCJ0eXBlIiwiQW5pbWF0aW9uIiwiaW5pdCIsImdhbWUiLCJnZXRDb21wb25lbnQiLCJkZXNwYXduIiwiZGVzcGF3blNjb3JlRlgiLCJub2RlIiwicGxheSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLElBQUksRUFBRTtBQUNGLGlCQUFTLElBRFA7QUFFRkMsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNO0FBRlA7QUFERSxHQUhQO0FBVUxDLEVBQUFBLElBVkssZ0JBVUNDLElBVkQsRUFVTztBQUNSLFNBQUtBLElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtKLElBQUwsQ0FBVUssWUFBVixDQUF1QixXQUF2QixFQUFvQ0YsSUFBcEMsQ0FBeUMsSUFBekM7QUFDSCxHQWJJO0FBZUxHLEVBQUFBLE9BZksscUJBZU07QUFDUCxTQUFLRixJQUFMLENBQVVHLGNBQVYsQ0FBeUIsS0FBS0MsSUFBOUI7QUFDSCxHQWpCSTtBQW1CTEMsRUFBQUEsSUFBSSxFQUFFLGdCQUFZO0FBQ2QsU0FBS1QsSUFBTCxDQUFVUyxJQUFWLENBQWUsV0FBZjtBQUNIO0FBckJJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGFuaW06IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5BbmltYXRpb25cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBpbml0IChnYW1lKSB7XG4gICAgICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgICAgIHRoaXMuYW5pbS5nZXRDb21wb25lbnQoJ1Njb3JlQW5pbScpLmluaXQodGhpcyk7XG4gICAgfSxcblxuICAgIGRlc3Bhd24gKCkge1xuICAgICAgICB0aGlzLmdhbWUuZGVzcGF3blNjb3JlRlgodGhpcy5ub2RlKTtcbiAgICB9LFxuXG4gICAgcGxheTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmFuaW0ucGxheSgnc2NvcmVfcG9wJyk7XG4gICAgfVxufSk7XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/migration/use_v2.0.x_cc.Toggle_event.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2ea322G14lCnKYeISDHwj3U', 'use_v2.0.x_cc.Toggle_event');
// migration/use_v2.0.x_cc.Toggle_event.js

"use strict";

/*
 * This script is automatically generated by Cocos Creator and is only compatible with projects prior to v2.1.0.
 * You do not need to manually add this script in any other project.
 * If you don't use cc.Toggle in your project, you can delete this script directly.
 * If your project is hosted in VCS such as git, submit this script together.
 *
 * 此脚本由 Cocos Creator 自动生成，仅用于兼容 v2.1.0 之前版本的工程，
 * 你无需在任何其它项目中手动添加此脚本。
 * 如果你的项目中没用到 Toggle，可直接删除该脚本。
 * 如果你的项目有托管于 git 等版本库，请将此脚本一并上传。
 */
if (cc.Toggle) {
  // Whether the 'toggle' and 'checkEvents' events are fired when 'toggle.check() / toggle.uncheck()' is called in the code
  // 在代码中调用 'toggle.check() / toggle.uncheck()' 时是否触发 'toggle' 与 'checkEvents' 事件
  cc.Toggle._triggerEventInScript_check = true;
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbWlncmF0aW9uXFx1c2VfdjIuMC54X2NjLlRvZ2dsZV9ldmVudC5qcyJdLCJuYW1lcyI6WyJjYyIsIlRvZ2dsZSIsIl90cmlnZ2VyRXZlbnRJblNjcmlwdF9jaGVjayJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7QUFZQSxJQUFJQSxFQUFFLENBQUNDLE1BQVAsRUFBZTtBQUNYO0FBQ0E7QUFDQUQsRUFBQUEsRUFBRSxDQUFDQyxNQUFILENBQVVDLDJCQUFWLEdBQXdDLElBQXhDO0FBQ0giLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIFRoaXMgc2NyaXB0IGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGJ5IENvY29zIENyZWF0b3IgYW5kIGlzIG9ubHkgY29tcGF0aWJsZSB3aXRoIHByb2plY3RzIHByaW9yIHRvIHYyLjEuMC5cclxuICogWW91IGRvIG5vdCBuZWVkIHRvIG1hbnVhbGx5IGFkZCB0aGlzIHNjcmlwdCBpbiBhbnkgb3RoZXIgcHJvamVjdC5cclxuICogSWYgeW91IGRvbid0IHVzZSBjYy5Ub2dnbGUgaW4geW91ciBwcm9qZWN0LCB5b3UgY2FuIGRlbGV0ZSB0aGlzIHNjcmlwdCBkaXJlY3RseS5cclxuICogSWYgeW91ciBwcm9qZWN0IGlzIGhvc3RlZCBpbiBWQ1Mgc3VjaCBhcyBnaXQsIHN1Ym1pdCB0aGlzIHNjcmlwdCB0b2dldGhlci5cclxuICpcclxuICog5q2k6ISa5pys55SxIENvY29zIENyZWF0b3Ig6Ieq5Yqo55Sf5oiQ77yM5LuF55So5LqO5YW85a65IHYyLjEuMCDkuYvliY3niYjmnKznmoTlt6XnqIvvvIxcclxuICog5L2g5peg6ZyA5Zyo5Lu75L2V5YW25a6D6aG555uu5Lit5omL5Yqo5re75Yqg5q2k6ISa5pys44CCXHJcbiAqIOWmguaenOS9oOeahOmhueebruS4reayoeeUqOWIsCBUb2dnbGXvvIzlj6/nm7TmjqXliKDpmaTor6XohJrmnKzjgIJcclxuICog5aaC5p6c5L2g55qE6aG555uu5pyJ5omY566h5LqOIGdpdCDnrYnniYjmnKzlupPvvIzor7flsIbmraTohJrmnKzkuIDlubbkuIrkvKDjgIJcclxuICovXHJcblxyXG5pZiAoY2MuVG9nZ2xlKSB7XHJcbiAgICAvLyBXaGV0aGVyIHRoZSAndG9nZ2xlJyBhbmQgJ2NoZWNrRXZlbnRzJyBldmVudHMgYXJlIGZpcmVkIHdoZW4gJ3RvZ2dsZS5jaGVjaygpIC8gdG9nZ2xlLnVuY2hlY2soKScgaXMgY2FsbGVkIGluIHRoZSBjb2RlXHJcbiAgICAvLyDlnKjku6PnoIHkuK3osIPnlKggJ3RvZ2dsZS5jaGVjaygpIC8gdG9nZ2xlLnVuY2hlY2soKScg5pe25piv5ZCm6Kem5Y+RICd0b2dnbGUnIOS4jiAnY2hlY2tFdmVudHMnIOS6i+S7tlxyXG4gICAgY2MuVG9nZ2xlLl90cmlnZ2VyRXZlbnRJblNjcmlwdF9jaGVjayA9IHRydWU7XHJcbn1cclxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/ScoreAnim.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b1f9e88YHdGr7qD17shtr2w', 'ScoreAnim');
// scripts/ScoreAnim.js

"use strict";

cc.Class({
  "extends": cc.Component,
  init: function init(scoreFX) {
    this.scoreFX = scoreFX;
  },
  hideFX: function hideFX() {
    this.scoreFX.despawn();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcU2NvcmVBbmltLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJpbml0Iiwic2NvcmVGWCIsImhpZGVGWCIsImRlc3Bhd24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLElBSEssZ0JBR0NDLE9BSEQsRUFHVTtBQUNYLFNBQUtBLE9BQUwsR0FBZUEsT0FBZjtBQUNILEdBTEk7QUFPTEMsRUFBQUEsTUFBTSxFQUFFLGtCQUFZO0FBQ2hCLFNBQUtELE9BQUwsQ0FBYUUsT0FBYjtBQUNIO0FBVEksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIGluaXQgKHNjb3JlRlgpIHtcbiAgICAgICAgdGhpcy5zY29yZUZYID0gc2NvcmVGWDtcbiAgICB9LFxuXG4gICAgaGlkZUZYOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc2NvcmVGWC5kZXNwYXduKCk7XG4gICAgfSxcbn0pOyJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Game.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0486fOqHrJN+6c5PQg5FHh9', 'Game');
// scripts/Game.js

"use strict";

var Player = require('Player');

var ScoreFX = require('ScoreFX');

var Star = require('Star');

var Game = cc.Class({
  "extends": cc.Component,
  properties: {
    // 这个属性引用了星星预制资源
    starPrefab: {
      "default": null,
      type: cc.Prefab
    },
    scoreFXPrefab: {
      "default": null,
      type: cc.Prefab
    },
    // 星星产生后消失时间的随机范围
    maxStarDuration: 0,
    minStarDuration: 0,
    // 地面节点，用于确定星星生成的高度
    ground: {
      "default": null,
      type: cc.Node
    },
    // player 节点，用于获取主角弹跳的高度，和控制主角行动开关
    player: {
      "default": null,
      type: Player
    },
    // score label 的引用
    scoreDisplay: {
      "default": null,
      type: cc.Label
    },
    // 得分音效资源
    scoreAudio: {
      "default": null,
      type: cc.AudioClip
    },
    btnNode: {
      "default": null,
      type: cc.Node
    },
    gameOverNode: {
      "default": null,
      type: cc.Node
    },
    controlHintLabel: {
      "default": null,
      type: cc.Label
    },
    keyboardHint: {
      "default": '',
      multiline: true
    },
    touchHint: {
      "default": '',
      multiline: true
    }
  },
  // use this for initialization
  onLoad: function onLoad() {
    // 获取地平面的 y 轴坐标
    this.groundY = this.ground.y + this.ground.height / 2; // store last star's x position

    this.currentStar = null;
    this.currentStarX = 0; // 初始化计时器

    this.timer = 0;
    this.starDuration = 0; // is showing menu or running game

    this.enabled = false; // initialize control hint

    var hintText = cc.sys.isMobile ? this.touchHint : this.keyboardHint;
    this.controlHintLabel.string = hintText; // initialize star and score pool

    this.starPool = new cc.NodePool('Star');
    this.scorePool = new cc.NodePool('ScoreFX');
  },
  onStartGame: function onStartGame() {
    // 初始化计分
    this.resetScore(); // set game state to running

    this.enabled = true; // set button and gameover text out of screen

    this.btnNode.x = 3000;
    this.gameOverNode.active = false; // reset player position and move speed

    this.player.startMoveAt(cc.v2(0, this.groundY)); // spawn star

    this.spawnNewStar();
  },
  spawnNewStar: function spawnNewStar() {
    var newStar = null; // 使用给定的模板在场景中生成一个新节点

    if (this.starPool.size() > 0) {
      newStar = this.starPool.get(this); // this will be passed to Star's reuse method
    } else {
      newStar = cc.instantiate(this.starPrefab);
    } // 将新增的节点添加到 Canvas 节点下面


    this.node.addChild(newStar); // 为星星设置一个随机位置

    newStar.setPosition(this.getNewStarPosition()); // pass Game instance to star

    newStar.getComponent('Star').init(this); // start star timer and store star reference

    this.startTimer();
    this.currentStar = newStar;
  },
  despawnStar: function despawnStar(star) {
    this.starPool.put(star);
    this.spawnNewStar();
  },
  startTimer: function startTimer() {
    // get a life duration for next star
    this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
    this.timer = 0;
  },
  getNewStarPosition: function getNewStarPosition() {
    // if there's no star, set a random x pos
    if (!this.currentStar) {
      this.currentStarX = (Math.random() - 0.5) * 2 * this.node.width / 2;
    }

    var randX = 0; // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标

    var randY = this.groundY + Math.random() * this.player.jumpHeight + 50; // 根据屏幕宽度和上一个星星的 x 坐标，随机得到一个新生成星星 x 坐标

    var maxX = this.node.width / 2;

    if (this.currentStarX >= 0) {
      randX = -Math.random() * maxX;
    } else {
      randX = Math.random() * maxX;
    }

    this.currentStarX = randX; // 返回星星坐标

    return cc.v2(randX, randY);
  },
  gainScore: function gainScore(pos) {
    this.score += 1; // 更新 scoreDisplay Label 的文字

    this.scoreDisplay.string = 'Score: ' + this.score.toString(); // 播放特效

    var fx = this.spawnScoreFX();
    this.node.addChild(fx.node);
    fx.node.setPosition(pos);
    fx.play(); // 播放得分音效

    cc.audioEngine.playEffect(this.scoreAudio, false);
  },
  resetScore: function resetScore() {
    this.score = 0;
    this.scoreDisplay.string = 'Score: ' + this.score.toString();
  },
  spawnScoreFX: function spawnScoreFX() {
    var fx;

    if (this.scorePool.size() > 0) {
      fx = this.scorePool.get();
      return fx.getComponent('ScoreFX');
    } else {
      fx = cc.instantiate(this.scoreFXPrefab).getComponent('ScoreFX');
      fx.init(this);
      return fx;
    }
  },
  despawnScoreFX: function despawnScoreFX(scoreFX) {
    this.scorePool.put(scoreFX);
  },
  // called every frame
  update: function update(dt) {
    // 每帧更新计时器，超过限度还没有生成新的星星
    // 就会调用游戏失败逻辑
    if (this.timer > this.starDuration) {
      this.gameOver();
      this.enabled = false; // disable this to avoid gameOver() repeatedly

      return;
    }

    this.timer += dt;
  },
  gameOver: function gameOver() {
    this.gameOverNode.active = true;
    this.player.enabled = false;
    this.player.stopMove();
    this.currentStar.destroy();
    this.btnNode.x = 0;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcR2FtZS5qcyJdLCJuYW1lcyI6WyJQbGF5ZXIiLCJyZXF1aXJlIiwiU2NvcmVGWCIsIlN0YXIiLCJHYW1lIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzdGFyUHJlZmFiIiwidHlwZSIsIlByZWZhYiIsInNjb3JlRlhQcmVmYWIiLCJtYXhTdGFyRHVyYXRpb24iLCJtaW5TdGFyRHVyYXRpb24iLCJncm91bmQiLCJOb2RlIiwicGxheWVyIiwic2NvcmVEaXNwbGF5IiwiTGFiZWwiLCJzY29yZUF1ZGlvIiwiQXVkaW9DbGlwIiwiYnRuTm9kZSIsImdhbWVPdmVyTm9kZSIsImNvbnRyb2xIaW50TGFiZWwiLCJrZXlib2FyZEhpbnQiLCJtdWx0aWxpbmUiLCJ0b3VjaEhpbnQiLCJvbkxvYWQiLCJncm91bmRZIiwieSIsImhlaWdodCIsImN1cnJlbnRTdGFyIiwiY3VycmVudFN0YXJYIiwidGltZXIiLCJzdGFyRHVyYXRpb24iLCJlbmFibGVkIiwiaGludFRleHQiLCJzeXMiLCJpc01vYmlsZSIsInN0cmluZyIsInN0YXJQb29sIiwiTm9kZVBvb2wiLCJzY29yZVBvb2wiLCJvblN0YXJ0R2FtZSIsInJlc2V0U2NvcmUiLCJ4IiwiYWN0aXZlIiwic3RhcnRNb3ZlQXQiLCJ2MiIsInNwYXduTmV3U3RhciIsIm5ld1N0YXIiLCJzaXplIiwiZ2V0IiwiaW5zdGFudGlhdGUiLCJub2RlIiwiYWRkQ2hpbGQiLCJzZXRQb3NpdGlvbiIsImdldE5ld1N0YXJQb3NpdGlvbiIsImdldENvbXBvbmVudCIsImluaXQiLCJzdGFydFRpbWVyIiwiZGVzcGF3blN0YXIiLCJzdGFyIiwicHV0IiwiTWF0aCIsInJhbmRvbSIsIndpZHRoIiwicmFuZFgiLCJyYW5kWSIsImp1bXBIZWlnaHQiLCJtYXhYIiwiZ2FpblNjb3JlIiwicG9zIiwic2NvcmUiLCJ0b1N0cmluZyIsImZ4Iiwic3Bhd25TY29yZUZYIiwicGxheSIsImF1ZGlvRW5naW5lIiwicGxheUVmZmVjdCIsImRlc3Bhd25TY29yZUZYIiwic2NvcmVGWCIsInVwZGF0ZSIsImR0IiwiZ2FtZU92ZXIiLCJzdG9wTW92ZSIsImRlc3Ryb3kiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsTUFBTSxHQUFHQyxPQUFPLENBQUMsUUFBRCxDQUF0Qjs7QUFDQSxJQUFNQyxPQUFPLEdBQUdELE9BQU8sQ0FBQyxTQUFELENBQXZCOztBQUNBLElBQU1FLElBQUksR0FBR0YsT0FBTyxDQUFDLE1BQUQsQ0FBcEI7O0FBRUEsSUFBSUcsSUFBSSxHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNoQixhQUFTRCxFQUFFLENBQUNFLFNBREk7QUFHaEJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSO0FBQ0FDLElBQUFBLFVBQVUsRUFBRTtBQUNSLGlCQUFTLElBREQ7QUFFUkMsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNO0FBRkQsS0FGSjtBQU1SQyxJQUFBQSxhQUFhLEVBQUU7QUFDWCxpQkFBUyxJQURFO0FBRVhGLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTTtBQUZFLEtBTlA7QUFVUjtBQUNBRSxJQUFBQSxlQUFlLEVBQUUsQ0FYVDtBQVlSQyxJQUFBQSxlQUFlLEVBQUUsQ0FaVDtBQWFSO0FBQ0FDLElBQUFBLE1BQU0sRUFBRTtBQUNKLGlCQUFTLElBREw7QUFFSkwsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNXO0FBRkwsS0FkQTtBQWtCUjtBQUNBQyxJQUFBQSxNQUFNLEVBQUU7QUFDSixpQkFBUyxJQURMO0FBRUpQLE1BQUFBLElBQUksRUFBRVY7QUFGRixLQW5CQTtBQXVCUjtBQUNBa0IsSUFBQUEsWUFBWSxFQUFFO0FBQ1YsaUJBQVMsSUFEQztBQUVWUixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ2M7QUFGQyxLQXhCTjtBQTRCUjtBQUNBQyxJQUFBQSxVQUFVLEVBQUU7QUFDUixpQkFBUyxJQUREO0FBRVJWLE1BQUFBLElBQUksRUFBRUws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Q0EsYUFBT3VCLEVBQUUsQ0FBQ2pCLFlBQUgsQ0FBZ0IsU0FBaEIsQ0FBUDtBQUNILEtBSEQsTUFHTztBQUNIaUIsTUFBQUEsRUFBRSxHQUFHdkUsRUFBRSxDQUFDaUQsV0FBSCxDQUFlLEtBQUsxQyxhQUFwQixFQUFtQytDLFlBQW5DLENBQWdELFNBQWhELENBQUw7QUFDQWlCLE1BQUFBLEVBQUUsQ0FBQ2hCLElBQUgsQ0FBUSxJQUFSO0FBQ0EsYUFBT2dCLEVBQVA7QUFDSDtBQUNKLEdBL0tlO0FBaUxoQkssRUFBQUEsY0FqTGdCLDBCQWlMQUMsT0FqTEEsRUFpTFM7QUFDckIsU0FBS3ZDLFNBQUwsQ0FBZXFCLEdBQWYsQ0FBbUJrQixPQUFuQjtBQUNILEdBbkxlO0FBcUxoQjtBQUNBQyxFQUFBQSxNQUFNLEVBQUUsZ0JBQVVDLEVBQVYsRUFBYztBQUNsQjtBQUNBO0FBQ0EsUUFBSSxLQUFLbEQsS0FBTCxHQUFhLEtBQUtDLFlBQXRCLEVBQW9DO0FBQ2hDLFdBQUtrRCxRQUFMO0FBQ0EsV0FBS2pELE9BQUwsR0FBZSxLQUFmLENBRmdDLENBRVI7O0FBQ3hCO0FBQ0g7O0FBQ0QsU0FBS0YsS0FBTCxJQUFja0QsRUFBZDtBQUNILEdBL0xlO0FBaU1oQkMsRUFBQUEsUUFBUSxFQUFFLG9CQUFZO0FBQ2xCLFNBQUs5RCxZQUFMLENBQWtCd0IsTUFBbEIsR0FBMkIsSUFBM0I7QUFDQSxTQUFLOUIsTUFBTCxDQUFZbUIsT0FBWixHQUFzQixLQUF0QjtBQUNBLFNBQUtuQixNQUFMLENBQVlxRSxRQUFaO0FBQ0EsU0FBS3RELFdBQUwsQ0FBaUJ1RCxPQUFqQjtBQUNBLFNBQUtqRSxPQUFMLENBQWF3QixDQUFiLEdBQWlCLENBQWpCO0FBQ0g7QUF2TWUsQ0FBVCxDQUFYIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBQbGF5ZXIgPSByZXF1aXJlKCdQbGF5ZXInKTtcbmNvbnN0IFNjb3JlRlggPSByZXF1aXJlKCdTY29yZUZYJyk7XG5jb25zdCBTdGFyID0gcmVxdWlyZSgnU3RhcicpO1xuXG52YXIgR2FtZSA9IGNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIOi/meS4quWxnuaAp+W8leeUqOS6huaYn+aYn+mihOWItui1hOa6kFxuICAgICAgICBzdGFyUHJlZmFiOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiXG4gICAgICAgIH0sXG4gICAgICAgIHNjb3JlRlhQcmVmYWI6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWJcbiAgICAgICAgfSxcbiAgICAgICAgLy8g5pif5pif5Lqn55Sf5ZCO5raI5aSx5pe26Ze055qE6ZqP5py66IyD5Zu0XG4gICAgICAgIG1heFN0YXJEdXJhdGlvbjogMCxcbiAgICAgICAgbWluU3RhckR1cmF0aW9uOiAwLFxuICAgICAgICAvLyDlnLDpnaLoioLngrnvvIznlKjkuo7noa7lrprmmJ/mmJ/nlJ/miJDnmoTpq5jluqZcbiAgICAgICAgZ3JvdW5kOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICAvLyBwbGF5ZXIg6IqC54K577yM55So5LqO6I635Y+W5Li76KeS5by56Lez55qE6auY5bqm77yM5ZKM5o6n5Yi25Li76KeS6KGM5Yqo5byA5YWzXG4gICAgICAgIHBsYXllcjoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IFBsYXllclxuICAgICAgICB9LFxuICAgICAgICAvLyBzY29yZSBsYWJlbCDnmoTlvJXnlKhcbiAgICAgICAgc2NvcmVEaXNwbGF5OiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgLy8g5b6X5YiG6Z+z5pWI6LWE5rqQXG4gICAgICAgIHNjb3JlQXVkaW86IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXBcbiAgICAgICAgfSxcbiAgICAgICAgYnRuTm9kZToge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgZ2FtZU92ZXJOb2RlOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICBjb250cm9sSGludExhYmVsOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAga2V5Ym9hcmRIaW50OiB7XG4gICAgICAgICAgICBkZWZhdWx0OiAnJyxcbiAgICAgICAgICAgIG11bHRpbGluZTogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICB0b3VjaEhpbnQ6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6ICcnLFxuICAgICAgICAgICAgbXVsdGlsaW5lOiB0cnVlXG4gICAgICAgIH0sXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyDojrflj5blnLDlubPpnaLnmoQgeSDovbTlnZDmoIdcbiAgICAgICAgdGhpcy5ncm91bmRZID0gdGhpcy5ncm91bmQueSArIHRoaXMuZ3JvdW5kLmhlaWdodC8yO1xuXG4gICAgICAgIC8vIHN0b3JlIGxhc3Qgc3RhcidzIHggcG9zaXRpb25cbiAgICAgICAgdGhpcy5jdXJyZW50U3RhciA9IG51bGw7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXJYID0gMDtcblxuICAgICAgICAvLyDliJ3lp4vljJborqHml7blmahcbiAgICAgICAgdGhpcy50aW1lciA9IDA7XG4gICAgICAgIHRoaXMuc3RhckR1cmF0aW9uID0gMDtcblxuICAgICAgICAvLyBpcyBzaG93aW5nIG1lbnUgb3IgcnVubmluZyBnYW1lXG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgICAgIC8vIGluaXRpYWxpemUgY29udHJvbCBoaW50XG4gICAgICAgIHZhciBoaW50VGV4dCA9IGNjLnN5cy5pc01vYmlsZSA/IHRoaXMudG91Y2hIaW50IDogdGhpcy5rZXlib2FyZEhpbnQ7XG4gICAgICAgIHRoaXMuY29udHJvbEhpbnRMYWJlbC5zdHJpbmcgPSBoaW50VGV4dDtcblxuICAgICAgICAvLyBpbml0aWFsaXplIHN0YXIgYW5kIHNjb3JlIHBvb2xcbiAgICAgICAgdGhpcy5zdGFyUG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgnU3RhcicpO1xuICAgICAgICB0aGlzLnNjb3JlUG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgnU2NvcmVGWCcpO1xuICAgIH0sXG5cbiAgICBvblN0YXJ0R2FtZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyDliJ3lp4vljJborqHliIZcbiAgICAgICAgdGhpcy5yZXNldFNjb3JlKCk7XG4gICAgICAgIC8vIHNldCBnYW1lIHN0YXRlIHRvIHJ1bm5pbmdcbiAgICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgLy8gc2V0IGJ1dHRvbiBhbmQgZ2FtZW92ZXIgdGV4dCBvdXQgb2Ygc2NyZWVuXG4gICAgICAgIHRoaXMuYnRuTm9kZS54ID0gMzAwMDtcbiAgICAgICAgdGhpcy5nYW1lT3Zlck5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIC8vIHJlc2V0IHBsYXllciBwb3NpdGlvbiBhbmQgbW92ZSBzcGVlZFxuICAgICAgICB0aGlzLnBsYXllci5zdGFydE1vdmVBdChjYy52MigwLCB0aGlzLmdyb3VuZFkpKTtcbiAgICAgICAgLy8gc3Bhd24gc3RhclxuICAgICAgICB0aGlzLnNwYXduTmV3U3RhcigpO1xuICAgIH0sXG5cbiAgICBzcGF3bk5ld1N0YXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbmV3U3RhciA9IG51bGw7XG4gICAgICAgIC8vIOS9v+eUqOe7meWumueahOaooeadv+WcqOWcuuaZr+S4reeUn+aIkOS4gOS4quaWsOiKgueCuVxuICAgICAgICBpZiAodGhpcy5zdGFyUG9vbC5zaXplKCkgPiAwKSB7XG4gICAgICAgICAgICBuZXdTdGFyID0gdGhpcy5zdGFyUG9vbC5nZXQodGhpcyk7IC8vIHRoaXMgd2lsbCBiZSBwYXNzZWQgdG8gU3RhcidzIHJldXNlIG1ldGhvZFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3U3RhciA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc3RhclByZWZhYik7XG4gICAgICAgIH1cbiAgICAgICAgLy8g5bCG5paw5aKe55qE6IqC54K55re75Yqg5YiwIENhbnZhcyDoioLngrnkuIvpnaJcbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5ld1N0YXIpO1xuICAgICAgICAvLyDkuLrmmJ/mmJ/orr7nva7kuIDkuKrpmo/mnLrkvY3nva5cbiAgICAgICAgbmV3U3Rhci5zZXRQb3NpdGlvbih0aGlzLmdldE5ld1N0YXJQb3NpdGlvbigpKTtcbiAgICAgICAgLy8gcGFzcyBHYW1lIGluc3RhbmNlIHRvIHN0YXJcbiAgICAgICAgbmV3U3Rhci5nZXRDb21wb25lbnQoJ1N0YXInKS5pbml0KHRoaXMpO1xuICAgICAgICAvLyBzdGFydCBzdGFyIHRpbWVyIGFuZCBzdG9yZSBzdGFyIHJlZmVyZW5jZVxuICAgICAgICB0aGlzLnN0YXJ0VGltZXIoKTtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhciA9IG5ld1N0YXI7XG4gICAgfSxcblxuICAgIGRlc3Bhd25TdGFyIChzdGFyKSB7XG4gICAgICAgIHRoaXMuc3RhclBvb2wucHV0KHN0YXIpO1xuICAgICAgICB0aGlzLnNwYXduTmV3U3RhcigpO1xuICAgIH0sXG5cbiAgICBzdGFydFRpbWVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIGdldCBhIGxpZmUgZHVyYXRpb24gZm9yIG5leHQgc3RhclxuICAgICAgICB0aGlzLnN0YXJEdXJhdGlvbiA9IHRoaXMubWluU3RhckR1cmF0aW9uICsgTWF0aC5yYW5kb20oKSAqICh0aGlzLm1heFN0YXJEdXJhdGlvbiAtIHRoaXMubWluU3RhckR1cmF0aW9uKTtcbiAgICAgICAgdGhpcy50aW1lciA9IDA7XG4gICAgfSxcblxuICAgIGdldE5ld1N0YXJQb3NpdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBpZiB0aGVyZSdzIG5vIHN0YXIsIHNldCBhIHJhbmRvbSB4IHBvc1xuICAgICAgICBpZiAoIXRoaXMuY3VycmVudFN0YXIpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXJYID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMiAqIHRoaXMubm9kZS53aWR0aC8yO1xuICAgICAgICB9XG4gICAgICAgIHZhciByYW5kWCA9IDA7XG4gICAgICAgIC8vIOagueaNruWcsOW5s+mdouS9jee9ruWSjOS4u+inkui3s+i3g+mrmOW6pu+8jOmaj+acuuW+l+WIsOS4gOS4quaYn+aYn+eahCB5IOWdkOagh1xuICAgICAgICB2YXIgcmFuZFkgPSB0aGlzLmdyb3VuZFkgKyBNYXRoLnJhbmRvbSgpICogdGhpcy5wbGF5ZXIuanVtcEhlaWdodCArIDUwO1xuICAgICAgICAvLyDmoLnmja7lsY/luZXlrr3luqblkozkuIrkuIDkuKrmmJ/mmJ/nmoQgeCDlnZDmoIfvvIzpmo/mnLrlvpfliLDkuIDkuKrmlrDnlJ/miJDmmJ/mmJ8geCDlnZDmoIdcbiAgICAgICAgdmFyIG1heFggPSB0aGlzLm5vZGUud2lkdGgvMjtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFN0YXJYID49IDApIHtcbiAgICAgICAgICAgIHJhbmRYID0gLU1hdGgucmFuZG9tKCkgKiBtYXhYO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmFuZFggPSBNYXRoLnJhbmRvbSgpICogbWF4WDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1cnJlbnRTdGFyWCA9IHJhbmRYO1xuICAgICAgICAvLyDov5Tlm57mmJ/mmJ/lnZDmoIdcbiAgICAgICAgcmV0dXJuIGNjLnYyKHJhbmRYLCByYW5kWSk7XG4gICAgfSxcblxuICAgIGdhaW5TY29yZTogZnVuY3Rpb24gKHBvcykge1xuICAgICAgICB0aGlzLnNjb3JlICs9IDE7XG4gICAgICAgIC8vIOabtOaWsCBzY29yZURpc3BsYXkgTGFiZWwg55qE5paH5a2XXG4gICAgICAgIHRoaXMuc2NvcmVEaXNwbGF5LnN0cmluZyA9ICdTY29yZTogJyArIHRoaXMuc2NvcmUudG9TdHJpbmcoKTtcbiAgICAgICAgLy8g5pKt5pS+54m55pWIXG4gICAgICAgIHZhciBmeCA9IHRoaXMuc3Bhd25TY29yZUZYKCk7XG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChmeC5ub2RlKTtcbiAgICAgICAgZngubm9kZS5zZXRQb3NpdGlvbihwb3MpO1xuICAgICAgICBmeC5wbGF5KCk7XG4gICAgICAgIC8vIOaSreaUvuW+l+WIhumfs+aViFxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuc2NvcmVBdWRpbywgZmFsc2UpO1xuICAgIH0sXG5cbiAgICByZXNldFNjb3JlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc2NvcmUgPSAwO1xuICAgICAgICB0aGlzLnNjb3JlRGlzcGxheS5zdHJpbmcgPSAnU2NvcmU6ICcgKyB0aGlzLnNjb3JlLnRvU3RyaW5nKCk7XG4gICAgfSxcblxuICAgIHNwYXduU2NvcmVGWDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZng7XG4gICAgICAgIGlmICh0aGlzLnNjb3JlUG9vbC5zaXplKCkgPiAwKSB7XG4gICAgICAgICAgICBmeCA9IHRoaXMuc2NvcmVQb29sLmdldCgpO1xuICAgICAgICAgICAgcmV0dXJuIGZ4LmdldENvbXBvbmVudCgnU2NvcmVGWCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZnggPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnNjb3JlRlhQcmVmYWIpLmdldENvbXBvbmVudCgnU2NvcmVGWCcpO1xuICAgICAgICAgICAgZnguaW5pdCh0aGlzKTtcbiAgICAgICAgICAgIHJldHVybiBmeDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBkZXNwYXduU2NvcmVGWCAoc2NvcmVGWCkge1xuICAgICAgICB0aGlzLnNjb3JlUG9vbC5wdXQoc2NvcmVGWCk7XG4gICAgfSxcblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZVxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG4gICAgICAgIC8vIOavj+W4p+abtOaWsOiuoeaXtuWZqO+8jOi2hei/h+mZkOW6pui/mOayoeacieeUn+aIkOaWsOeahOaYn+aYn1xuICAgICAgICAvLyDlsLHkvJrosIPnlKjmuLjmiI/lpLHotKXpgLvovpFcbiAgICAgICAgaWYgKHRoaXMudGltZXIgPiB0aGlzLnN0YXJEdXJhdGlvbikge1xuICAgICAgICAgICAgdGhpcy5nYW1lT3ZlcigpO1xuICAgICAgICAgICAgdGhpcy5lbmFibGVkID0gZmFsc2U7ICAgLy8gZGlzYWJsZSB0aGlzIHRvIGF2b2lkIGdhbWVPdmVyKCkgcmVwZWF0ZWRseVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGltZXIgKz0gZHQ7XG4gICAgfSxcblxuICAgIGdhbWVPdmVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZ2FtZU92ZXJOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMucGxheWVyLmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wbGF5ZXIuc3RvcE1vdmUoKTtcbiAgICAgICAgdGhpcy5jdXJyZW50U3Rhci5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuYnRuTm9kZS54ID0gMDtcbiAgICB9XG59KTtcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Star.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '21890Xr4RBJlqTJhmXJ/f5s', 'Star');
// scripts/Star.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    // 星星和主角之间的距离小于这个数值时，就会完成收集
    pickRadius: 0
  },
  onLoad: function onLoad() {
    this.enabled = false;
  },
  // use this for initialization
  init: function init(game) {
    this.game = game;
    this.enabled = true;
    this.node.opacity = 255;
  },
  reuse: function reuse(game) {
    this.init(game);
  },
  getPlayerDistance: function getPlayerDistance() {
    // 根据 player 节点位置判断距离
    var playerPos = this.game.player.getCenterPos(); // 根据两点位置计算两点之间距离

    var dist = this.node.position.sub(playerPos).mag();
    return dist;
  },
  onPicked: function onPicked() {
    var pos = this.node.getPosition(); // 调用 Game 脚本的得分方法

    this.game.gainScore(pos); // 当星星被收集时，调用 Game 脚本中的接口，销毁当前星星节点，生成一个新的星星

    this.game.despawnStar(this.node);
  },
  // called every frame
  update: function update(dt) {
    // 每帧判断和主角之间的距离是否小于收集距离
    if (this.getPlayerDistance() < this.pickRadius) {
      // 调用收集行为
      this.onPicked();
      return;
    } // 根据 Game 脚本中的计时器更新星星的透明度


    var opacityRatio = 1 - this.game.timer / this.game.starDuration;
    var minOpacity = 50;
    this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcU3Rhci5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInBpY2tSYWRpdXMiLCJvbkxvYWQiLCJlbmFibGVkIiwiaW5pdCIsImdhbWUiLCJub2RlIiwib3BhY2l0eSIsInJldXNlIiwiZ2V0UGxheWVyRGlzdGFuY2UiLCJwbGF5ZXJQb3MiLCJwbGF5ZXIiLCJnZXRDZW50ZXJQb3MiLCJkaXN0IiwicG9zaXRpb24iLCJzdWIiLCJtYWciLCJvblBpY2tlZCIsInBvcyIsImdldFBvc2l0aW9uIiwiZ2FpblNjb3JlIiwiZGVzcGF3blN0YXIiLCJ1cGRhdGUiLCJkdCIsIm9wYWNpdHlSYXRpbyIsInRpbWVyIiwic3RhckR1cmF0aW9uIiwibWluT3BhY2l0eSIsIk1hdGgiLCJmbG9vciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1I7QUFDQUMsSUFBQUEsVUFBVSxFQUFFO0FBRkosR0FIUDtBQVFMQyxFQUFBQSxNQUFNLEVBQUUsa0JBQVk7QUFDaEIsU0FBS0MsT0FBTCxHQUFlLEtBQWY7QUFDSCxHQVZJO0FBWUw7QUFDQUMsRUFBQUEsSUFBSSxFQUFFLGNBQVVDLElBQVYsRUFBZ0I7QUFDbEIsU0FBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0YsT0FBTCxHQUFlLElBQWY7QUFDQSxTQUFLRyxJQUFMLENBQVVDLE9BQVYsR0FBb0IsR0FBcEI7QUFDSCxHQWpCSTtBQW1CTEMsRUFBQUEsS0FuQkssaUJBbUJFSCxJQW5CRixFQW1CUTtBQUNULFNBQUtELElBQUwsQ0FBVUMsSUFBVjtBQUNILEdBckJJO0FBdUJMSSxFQUFBQSxpQkFBaUIsRUFBRSw2QkFBWTtBQUMzQjtBQUNBLFFBQUlDLFNBQVMsR0FBRyxLQUFLTCxJQUFMLENBQVVNLE1BQVYsQ0FBaUJDLFlBQWpCLEVBQWhCLENBRjJCLENBRzNCOztBQUNBLFFBQUlDLElBQUksR0FBRyxLQUFLUCxJQUFMLENBQVVRLFFBQVYsQ0FBbUJDLEdBQW5CLENBQXVCTCxTQUF2QixFQUFrQ00sR0FBbEMsRUFBWDtBQUNBLFdBQU9ILElBQVA7QUFDSCxHQTdCSTtBQStCTEksRUFBQUEsUUFBUSxFQUFFLG9CQUFXO0FBQ2pCLFFBQUlDLEdBQUcsR0FBRyxLQUFLWixJQUFMLENBQVVhLFdBQVYsRUFBVixDQURpQixDQUVqQjs7QUFDQSxTQUFLZCxJQUFMLENBQVVlLFNBQVYsQ0FBb0JGLEdBQXBCLEVBSGlCLENBSWpCOztBQUNBLFNBQUtiLElBQUwsQ0FBVWdCLFdBQVYsQ0FBc0IsS0FBS2YsSUFBM0I7QUFDSCxHQXJDSTtBQXVDTDtBQUNBZ0IsRUFBQUEsTUFBTSxFQUFFLGdCQUFVQyxFQUFWLEVBQWM7QUFDbEI7QUFDQSxRQUFJLEtBQUtkLGlCQUFMLEtBQTJCLEtBQUtSLFVBQXBDLEVBQWdEO0FBQzVDO0FBQ0EsV0FBS2dCLFFBQUw7QUFDQTtBQUNILEtBTmlCLENBT2xCOzs7QUFDQSxRQUFJTyxZQUFZLEdBQUcsSUFBSSxLQUFLbkIsSUFBTCxDQUFVb0IsS0FBVixHQUFnQixLQUFLcEIsSUFBTCxDQUFVcUIsWUFBakQ7QUFDQSxRQUFJQyxVQUFVLEdBQUcsRUFBakI7QUFDQSxTQUFLckIsSUFBTCxDQUFVQyxPQUFWLEdBQW9Cb0IsVUFBVSxHQUFHQyxJQUFJLENBQUNDLEtBQUwsQ0FBV0wsWUFBWSxJQUFJLE1BQU1HLFVBQVYsQ0FBdkIsQ0FBakM7QUFDSDtBQW5ESSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyDmmJ/mmJ/lkozkuLvop5LkuYvpl7TnmoTot53nprvlsI/kuo7ov5nkuKrmlbDlgLzml7bvvIzlsLHkvJrlrozmiJDmlLbpm4ZcbiAgICAgICAgcGlja1JhZGl1czogMCxcbiAgICB9LFxuXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBpbml0OiBmdW5jdGlvbiAoZ2FtZSkge1xuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgICAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDI1NTtcbiAgICB9LFxuXG4gICAgcmV1c2UgKGdhbWUpIHtcbiAgICAgICAgdGhpcy5pbml0KGdhbWUpO1xuICAgIH0sXG5cbiAgICBnZXRQbGF5ZXJEaXN0YW5jZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyDmoLnmja4gcGxheWVyIOiKgueCueS9jee9ruWIpOaWrei3neemu1xuICAgICAgICB2YXIgcGxheWVyUG9zID0gdGhpcy5nYW1lLnBsYXllci5nZXRDZW50ZXJQb3MoKTtcbiAgICAgICAgLy8g5qC55o2u5Lik54K55L2N572u6K6h566X5Lik54K55LmL6Ze06Led56a7XG4gICAgICAgIHZhciBkaXN0ID0gdGhpcy5ub2RlLnBvc2l0aW9uLnN1YihwbGF5ZXJQb3MpLm1hZygpO1xuICAgICAgICByZXR1cm4gZGlzdDtcbiAgICB9LFxuXG4gICAgb25QaWNrZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcG9zID0gdGhpcy5ub2RlLmdldFBvc2l0aW9uKCk7XG4gICAgICAgIC8vIOiwg+eUqCBHYW1lIOiEmuacrOeahOW+l+WIhuaWueazlVxuICAgICAgICB0aGlzLmdhbWUuZ2FpblNjb3JlKHBvcyk7XG4gICAgICAgIC8vIOW9k+aYn+aYn+iiq+aUtumbhuaXtu+8jOiwg+eUqCBHYW1lIOiEmuacrOS4reeahOaOpeWPo++8jOmUgOavgeW9k+WJjeaYn+aYn+iKgueCue+8jOeUn+aIkOS4gOS4quaWsOeahOaYn+aYn1xuICAgICAgICB0aGlzLmdhbWUuZGVzcGF3blN0YXIodGhpcy5ub2RlKTtcbiAgICB9LFxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcbiAgICAgICAgLy8g5q+P5bin5Yik5pat5ZKM5Li76KeS5LmL6Ze055qE6Led56a75piv5ZCm5bCP5LqO5pS26ZuG6Led56a7XG4gICAgICAgIGlmICh0aGlzLmdldFBsYXllckRpc3RhbmNlKCkgPCB0aGlzLnBpY2tSYWRpdXMpIHtcbiAgICAgICAgICAgIC8vIOiwg+eUqOaUtumbhuihjOS4ulxuICAgICAgICAgICAgdGhpcy5vblBpY2tlZCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIOagueaNriBHYW1lIOiEmuacrOS4reeahOiuoeaXtuWZqOabtOaWsOaYn+aYn+eahOmAj+aYjuW6plxuICAgICAgICB2YXIgb3BhY2l0eVJhdGlvID0gMSAtIHRoaXMuZ2FtZS50aW1lci90aGlzLmdhbWUuc3RhckR1cmF0aW9uO1xuICAgICAgICB2YXIgbWluT3BhY2l0eSA9IDUwO1xuICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IG1pbk9wYWNpdHkgKyBNYXRoLmZsb29yKG9wYWNpdHlSYXRpbyAqICgyNTUgLSBtaW5PcGFjaXR5KSk7XG4gICAgfSxcbn0pO1xuIl19
//------QC-SOURCE-SPLIT------
