
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
                    var __filename = 'preview-scripts/assets/migration/use_v2.0.x_cc.Toggle_event.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '51809FkHbVGco+/Y8pzhY2I', 'use_v2.0.x_cc.Toggle_event');
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
                    var __filename = 'preview-scripts/assets/scripts/Star.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f83bdJ0gMFGY6e+W017Mamd', 'Star');
// scripts/Star.js

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
    // 星星和主角之间的距离小于这个数值时，就会完成收集
    pickRadius: 0
  },
  // LIFE-CYCLE CALLBACKS:
  getPlayerDistance: function getPlayerDistance() {
    // 根据 player 节点位置判断距离
    var playerPos = this.game.player.getPosition(); // 根据两点位置计算两点之间距离

    var dist = this.node.position.sub(playerPos).mag();
    return dist;
  },
  onPicked: function onPicked() {
    // 当星星被收集时，调用 Game 脚本中的接口，生成一个新的星星
    this.game.spawnNewStar(); // 调用 Game 脚本的得分方法

    this.game.gainScore(); // 然后销毁当前星星节点

    this.node.destroy();
  },
  // onLoad () {},
  start: function start() {},
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcU3Rhci5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInBpY2tSYWRpdXMiLCJnZXRQbGF5ZXJEaXN0YW5jZSIsInBsYXllclBvcyIsImdhbWUiLCJwbGF5ZXIiLCJnZXRQb3NpdGlvbiIsImRpc3QiLCJub2RlIiwicG9zaXRpb24iLCJzdWIiLCJtYWciLCJvblBpY2tlZCIsInNwYXduTmV3U3RhciIsImdhaW5TY29yZSIsImRlc3Ryb3kiLCJzdGFydCIsInVwZGF0ZSIsImR0Iiwib3BhY2l0eVJhdGlvIiwidGltZXIiLCJzdGFyRHVyYXRpb24iLCJtaW5PcGFjaXR5Iiwib3BhY2l0eSIsIk1hdGgiLCJmbG9vciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDUixhQUFTRCxFQUFFLENBQUNFLFNBREo7QUFHUkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1g7QUFDQUMsSUFBQUEsVUFBVSxFQUFFO0FBRkQsR0FISjtBQVFSO0FBQ0FDLEVBQUFBLGlCQUFpQixFQUFFLDZCQUFXO0FBQzdCO0FBQ0EsUUFBSUMsU0FBUyxHQUFHLEtBQUtDLElBQUwsQ0FBVUMsTUFBVixDQUFpQkMsV0FBakIsRUFBaEIsQ0FGNkIsQ0FHN0I7O0FBQ0EsUUFBSUMsSUFBSSxHQUFHLEtBQUtDLElBQUwsQ0FBVUMsUUFBVixDQUFtQkMsR0FBbkIsQ0FBdUJQLFNBQXZCLEVBQWtDUSxHQUFsQyxFQUFYO0FBQ0EsV0FBT0osSUFBUDtBQUNBLEdBZk87QUFpQlJLLEVBQUFBLFFBQVEsRUFBRSxvQkFBVztBQUNwQjtBQUNBLFNBQUtSLElBQUwsQ0FBVVMsWUFBVixHQUZvQixDQUdwQjs7QUFDQSxTQUFLVCxJQUFMLENBQVVVLFNBQVYsR0FKb0IsQ0FLcEI7O0FBQ0EsU0FBS04sSUFBTCxDQUFVTyxPQUFWO0FBQ0EsR0F4Qk87QUF5QlI7QUFFQUMsRUFBQUEsS0EzQlEsbUJBMkJBLENBRVAsQ0E3Qk87QUErQlJDLEVBQUFBLE1BQU0sRUFBRSxnQkFBU0MsRUFBVCxFQUFhO0FBQ3BCO0FBQ0EsUUFBSSxLQUFLaEIsaUJBQUwsS0FBMkIsS0FBS0QsVUFBcEMsRUFBZ0Q7QUFDL0M7QUFDQSxXQUFLVyxRQUFMO0FBQ0E7QUFDQSxLQU5tQixDQU9wQjs7O0FBQ0EsUUFBSU8sWUFBWSxHQUFHLElBQUksS0FBS2YsSUFBTCxDQUFVZ0IsS0FBVixHQUFrQixLQUFLaEIsSUFBTCxDQUFVaUIsWUFBbkQ7QUFDQSxRQUFJQyxVQUFVLEdBQUcsRUFBakI7QUFDQSxTQUFLZCxJQUFMLENBQVVlLE9BQVYsR0FBb0JELFVBQVUsR0FBR0UsSUFBSSxDQUFDQyxLQUFMLENBQVdOLFlBQVksSUFBSSxNQUFNRyxVQUFWLENBQXZCLENBQWpDO0FBQ0E7QUExQ08sQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5jYy5DbGFzcyh7XHJcblx0ZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuXHRwcm9wZXJ0aWVzOiB7XHJcblx0XHQvLyDmmJ/mmJ/lkozkuLvop5LkuYvpl7TnmoTot53nprvlsI/kuo7ov5nkuKrmlbDlgLzml7bvvIzlsLHkvJrlrozmiJDmlLbpm4ZcclxuXHRcdHBpY2tSYWRpdXM6IDAsXHJcblx0fSxcclxuXHJcblx0Ly8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblx0Z2V0UGxheWVyRGlzdGFuY2U6IGZ1bmN0aW9uKCkge1xyXG5cdFx0Ly8g5qC55o2uIHBsYXllciDoioLngrnkvY3nva7liKTmlq3ot53nprtcclxuXHRcdHZhciBwbGF5ZXJQb3MgPSB0aGlzLmdhbWUucGxheWVyLmdldFBvc2l0aW9uKCk7XHJcblx0XHQvLyDmoLnmja7kuKTngrnkvY3nva7orqHnrpfkuKTngrnkuYvpl7Tot53nprtcclxuXHRcdHZhciBkaXN0ID0gdGhpcy5ub2RlLnBvc2l0aW9uLnN1YihwbGF5ZXJQb3MpLm1hZygpO1xyXG5cdFx0cmV0dXJuIGRpc3Q7XHJcblx0fSxcclxuXHJcblx0b25QaWNrZWQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0Ly8g5b2T5pif5pif6KKr5pS26ZuG5pe277yM6LCD55SoIEdhbWUg6ISa5pys5Lit55qE5o6l5Y+j77yM55Sf5oiQ5LiA5Liq5paw55qE5pif5pifXHJcblx0XHR0aGlzLmdhbWUuc3Bhd25OZXdTdGFyKCk7XHJcblx0XHQvLyDosIPnlKggR2FtZSDohJrmnKznmoTlvpfliIbmlrnms5VcclxuXHRcdHRoaXMuZ2FtZS5nYWluU2NvcmUoKTtcclxuXHRcdC8vIOeEtuWQjumUgOavgeW9k+WJjeaYn+aYn+iKgueCuVxyXG5cdFx0dGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuXHR9LFxyXG5cdC8vIG9uTG9hZCAoKSB7fSxcclxuXHJcblx0c3RhcnQoKSB7XHJcblxyXG5cdH0sXHJcblxyXG5cdHVwZGF0ZTogZnVuY3Rpb24oZHQpIHtcclxuXHRcdC8vIOavj+W4p+WIpOaWreWSjOS4u+inkuS5i+mXtOeahOi3neemu+aYr+WQpuWwj+S6juaUtumbhui3neemu1xyXG5cdFx0aWYgKHRoaXMuZ2V0UGxheWVyRGlzdGFuY2UoKSA8IHRoaXMucGlja1JhZGl1cykge1xyXG5cdFx0XHQvLyDosIPnlKjmlLbpm4booYzkuLpcclxuXHRcdFx0dGhpcy5vblBpY2tlZCgpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHQvLyDmoLnmja4gR2FtZSDohJrmnKzkuK3nmoTorqHml7blmajmm7TmlrDmmJ/mmJ/nmoTpgI/mmI7luqZcclxuXHRcdHZhciBvcGFjaXR5UmF0aW8gPSAxIC0gdGhpcy5nYW1lLnRpbWVyIC8gdGhpcy5nYW1lLnN0YXJEdXJhdGlvbjtcclxuXHRcdHZhciBtaW5PcGFjaXR5ID0gNTA7XHJcblx0XHR0aGlzLm5vZGUub3BhY2l0eSA9IG1pbk9wYWNpdHkgKyBNYXRoLmZsb29yKG9wYWNpdHlSYXRpbyAqICgyNTUgLSBtaW5PcGFjaXR5KSk7XHJcblx0fSxcclxufSk7XG4iXX0=
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
cc._RF.push(module, 'f9fabpNpy9OzLmiRMIC8eK3', 'Game');
// scripts/Game.js

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
    // 这个属性引用了星星预制资源
    starPrefab: {
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
      type: cc.Node
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
    }
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    // 获取地平面的 y 轴坐标
    this.groundY = this.ground.y + this.ground.height / 2; // 初始化计时器

    this.timer = 0;
    this.starDuration = 0; // 生成一个新的星星

    this.spawnNewStar(); // 初始化计分

    this.score = 0;
  },
  spawnNewStar: function spawnNewStar() {
    // 使用给定的模板在场景中生成一个新节点
    var newStar = cc.instantiate(this.starPrefab); // 将新增的节点添加到 Canvas 节点下面

    this.node.addChild(newStar); // 为星星设置一个随机位置

    newStar.setPosition(this.getNewStarPosition()); // 在星星组件上暂存 Game 对象的引用

    newStar.getComponent('Star').game = this; // 重置计时器，根据消失时间范围随机取一个值

    this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
    this.timer = 0;
  },
  getNewStarPosition: function getNewStarPosition() {
    var randX = 0; // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标

    var randY = this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight + 50; // 根据屏幕宽度，随机得到一个星星 x 坐标

    var maxX = this.node.width / 2;
    randX = (Math.random() - 0.5) * 2 * maxX; // 返回星星坐标

    return cc.v2(randX, randY);
  },
  start: function start() {},
  update: function update(dt) {
    // 每帧更新计时器，超过限度还没有生成新的星星
    // 就会调用游戏失败逻辑
    if (this.timer > this.starDuration) {
      this.gameOver();
      return;
    }

    this.timer += dt;
  },
  gainScore: function gainScore() {
    this.score += 1; // 更新 scoreDisplay Label 的文字

    this.scoreDisplay.string = 'Score: ' + this.score; // 播放得分音效

    cc.audioEngine.playEffect(this.scoreAudio, false);
  },
  gameOver: function gameOver() {
    this.player.stopAllActions(); //停止 player 节点的跳跃动作

    cc.director.loadScene('game');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcR2FtZS5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInN0YXJQcmVmYWIiLCJ0eXBlIiwiUHJlZmFiIiwibWF4U3RhckR1cmF0aW9uIiwibWluU3RhckR1cmF0aW9uIiwiZ3JvdW5kIiwiTm9kZSIsInBsYXllciIsInNjb3JlRGlzcGxheSIsIkxhYmVsIiwic2NvcmVBdWRpbyIsIkF1ZGlvQ2xpcCIsIm9uTG9hZCIsImdyb3VuZFkiLCJ5IiwiaGVpZ2h0IiwidGltZXIiLCJzdGFyRHVyYXRpb24iLCJzcGF3bk5ld1N0YXIiLCJzY29yZSIsIm5ld1N0YXIiLCJpbnN0YW50aWF0ZSIsIm5vZGUiLCJhZGRDaGlsZCIsInNldFBvc2l0aW9uIiwiZ2V0TmV3U3RhclBvc2l0aW9uIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZSIsIk1hdGgiLCJyYW5kb20iLCJyYW5kWCIsInJhbmRZIiwianVtcEhlaWdodCIsIm1heFgiLCJ3aWR0aCIsInYyIiwic3RhcnQiLCJ1cGRhdGUiLCJkdCIsImdhbWVPdmVyIiwiZ2FpblNjb3JlIiwic3RyaW5nIiwiYXVkaW9FbmdpbmUiLCJwbGF5RWZmZWN0Iiwic3RvcEFsbEFjdGlvbnMiLCJkaXJlY3RvciIsImxvYWRTY2VuZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDUixhQUFTRCxFQUFFLENBQUNFLFNBREo7QUFHUkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1g7QUFDQUMsSUFBQUEsVUFBVSxFQUFFO0FBQ1gsaUJBQVMsSUFERTtBQUVYQyxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ007QUFGRSxLQUZEO0FBTVg7QUFDQUMsSUFBQUEsZUFBZSxFQUFFLENBUE47QUFRWEMsSUFBQUEsZUFBZSxFQUFFLENBUk47QUFTWDtBQUNBQyxJQUFBQSxN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Q0FIcUIsQ0FJckI7O0FBQ0F2QixJQUFBQSxFQUFFLENBQUM4QyxXQUFILENBQWVDLFVBQWYsQ0FBMEIsS0FBS2pDLFVBQS9CLEVBQTJDLEtBQTNDO0FBQ0EsR0EzRk87QUE0RlI2QixFQUFBQSxRQUFRLEVBQUUsb0JBQVc7QUFDcEIsU0FBS2hDLE1BQUwsQ0FBWXFDLGNBQVosR0FEb0IsQ0FDVTs7QUFDOUJoRCxJQUFBQSxFQUFFLENBQUNpRCxRQUFILENBQVlDLFNBQVosQ0FBc0IsTUFBdEI7QUFDQTtBQS9GTyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmNjLkNsYXNzKHtcclxuXHRleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG5cdHByb3BlcnRpZXM6IHtcclxuXHRcdC8vIOi/meS4quWxnuaAp+W8leeUqOS6huaYn+aYn+mihOWItui1hOa6kFxyXG5cdFx0c3RhclByZWZhYjoge1xyXG5cdFx0XHRkZWZhdWx0OiBudWxsLFxyXG5cdFx0XHR0eXBlOiBjYy5QcmVmYWJcclxuXHRcdH0sXHJcblx0XHQvLyDmmJ/mmJ/kuqfnlJ/lkI7mtojlpLHml7bpl7TnmoTpmo/mnLrojIPlm7RcclxuXHRcdG1heFN0YXJEdXJhdGlvbjogMCxcclxuXHRcdG1pblN0YXJEdXJhdGlvbjogMCxcclxuXHRcdC8vIOWcsOmdouiKgueCue+8jOeUqOS6juehruWumuaYn+aYn+eUn+aIkOeahOmrmOW6plxyXG5cdFx0Z3JvdW5kOiB7XHJcblx0XHRcdGRlZmF1bHQ6IG51bGwsXHJcblx0XHRcdHR5cGU6IGNjLk5vZGVcclxuXHRcdH0sXHJcblx0XHQvLyBwbGF5ZXIg6IqC54K577yM55So5LqO6I635Y+W5Li76KeS5by56Lez55qE6auY5bqm77yM5ZKM5o6n5Yi25Li76KeS6KGM5Yqo5byA5YWzXHJcblx0XHRwbGF5ZXI6IHtcclxuXHRcdFx0ZGVmYXVsdDogbnVsbCxcclxuXHRcdFx0dHlwZTogY2MuTm9kZVxyXG5cdFx0fSxcclxuXHRcdC8vIHNjb3JlIGxhYmVsIOeahOW8leeUqFxyXG5cdFx0c2NvcmVEaXNwbGF5OiB7XHJcblx0XHRcdGRlZmF1bHQ6IG51bGwsXHJcblx0XHRcdHR5cGU6IGNjLkxhYmVsXHJcblx0XHR9LFxyXG5cdFx0Ly8g5b6X5YiG6Z+z5pWI6LWE5rqQXHJcblx0XHRzY29yZUF1ZGlvOiB7XHJcblx0XHRcdGRlZmF1bHQ6IG51bGwsXHJcblx0XHRcdHR5cGU6IGNjLkF1ZGlvQ2xpcFxyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuXHRvbkxvYWQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0Ly8g6I635Y+W5Zyw5bmz6Z2i55qEIHkg6L205Z2Q5qCHXHJcblx0XHR0aGlzLmdyb3VuZFkgPSB0aGlzLmdyb3VuZC55ICsgdGhpcy5ncm91bmQuaGVpZ2h0IC8gMjtcclxuXHRcdC8vIOWIneWni+WMluiuoeaXtuWZqFxyXG5cdFx0dGhpcy50aW1lciA9IDA7XHJcblx0XHR0aGlzLnN0YXJEdXJhdGlvbiA9IDA7XHJcblx0XHQvLyDnlJ/miJDkuIDkuKrmlrDnmoTmmJ/mmJ9cclxuXHRcdHRoaXMuc3Bhd25OZXdTdGFyKCk7XHJcblx0XHQvLyDliJ3lp4vljJborqHliIZcclxuXHRcdHRoaXMuc2NvcmUgPSAwO1xyXG5cdH0sXHJcblxyXG5cdHNwYXduTmV3U3RhcjogZnVuY3Rpb24oKSB7XHJcblx0XHQvLyDkvb/nlKjnu5nlrprnmoTmqKHmnb/lnKjlnLrmma/kuK3nlJ/miJDkuIDkuKrmlrDoioLngrlcclxuXHRcdHZhciBuZXdTdGFyID0gY2MuaW5zdGFudGlhdGUodGhpcy5zdGFyUHJlZmFiKTtcclxuXHRcdC8vIOWwhuaWsOWinueahOiKgueCuea3u+WKoOWIsCBDYW52YXMg6IqC54K55LiL6Z2iXHJcblx0XHR0aGlzLm5vZGUuYWRkQ2hpbGQobmV3U3Rhcik7XHJcblx0XHQvLyDkuLrmmJ/mmJ/orr7nva7kuIDkuKrpmo/mnLrkvY3nva5cclxuXHRcdG5ld1N0YXIuc2V0UG9zaXRpb24odGhpcy5nZXROZXdTdGFyUG9zaXRpb24oKSk7XHJcblx0XHQvLyDlnKjmmJ/mmJ/nu4Tku7bkuIrmmoLlrZggR2FtZSDlr7nosaHnmoTlvJXnlKhcclxuXHRcdG5ld1N0YXIuZ2V0Q29tcG9uZW50KCdTdGFyJykuZ2FtZSA9IHRoaXM7XHJcblx0XHQvLyDph43nva7orqHml7blmajvvIzmoLnmja7mtojlpLHml7bpl7TojIPlm7Tpmo/mnLrlj5bkuIDkuKrlgLxcclxuXHRcdHRoaXMuc3RhckR1cmF0aW9uID0gdGhpcy5taW5TdGFyRHVyYXRpb24gKyBNYXRoLnJhbmRvbSgpICogKHRoaXMubWF4U3RhckR1cmF0aW9uIC0gdGhpcy5taW5TdGFyRHVyYXRpb24pO1xyXG5cdFx0dGhpcy50aW1lciA9IDA7XHJcblx0fSxcclxuXHJcblx0Z2V0TmV3U3RhclBvc2l0aW9uOiBmdW5jdGlvbigpIHtcclxuXHRcdHZhciByYW5kWCA9IDA7XHJcblx0XHQvLyDmoLnmja7lnLDlubPpnaLkvY3nva7lkozkuLvop5Lot7Pot4Ppq5jluqbvvIzpmo/mnLrlvpfliLDkuIDkuKrmmJ/mmJ/nmoQgeSDlnZDmoIdcclxuXHRcdHZhciByYW5kWSA9IHRoaXMuZ3JvdW5kWSArIE1hdGgucmFuZG9tKCkgKiB0aGlzLnBsYXllci5nZXRDb21wb25lbnQoJ1BsYXllcicpLmp1bXBIZWlnaHQgKyA1MDtcclxuXHRcdC8vIOagueaNruWxj+W5leWuveW6pu+8jOmaj+acuuW+l+WIsOS4gOS4quaYn+aYnyB4IOWdkOagh1xyXG5cdFx0dmFyIG1heFggPSB0aGlzLm5vZGUud2lkdGggLyAyO1xyXG5cdFx0cmFuZFggPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAyICogbWF4WDtcclxuXHRcdC8vIOi/lOWbnuaYn+aYn+WdkOagh1xyXG5cdFx0cmV0dXJuIGNjLnYyKHJhbmRYLCByYW5kWSk7XHJcblx0fSxcclxuXHJcblx0c3RhcnQoKSB7XHJcblxyXG5cdH0sXHJcblx0dXBkYXRlOiBmdW5jdGlvbihkdCkge1xyXG5cdFx0Ly8g5q+P5bin5pu05paw6K6h5pe25Zmo77yM6LaF6L+H6ZmQ5bqm6L+Y5rKh5pyJ55Sf5oiQ5paw55qE5pif5pifXHJcblx0XHQvLyDlsLHkvJrosIPnlKjmuLjmiI/lpLHotKXpgLvovpFcclxuXHRcdGlmICh0aGlzLnRpbWVyID4gdGhpcy5zdGFyRHVyYXRpb24pIHtcclxuXHRcdFx0dGhpcy5nYW1lT3ZlcigpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHR0aGlzLnRpbWVyICs9IGR0O1xyXG5cdH0sXHJcblx0Z2FpblNjb3JlOiBmdW5jdGlvbigpIHtcclxuXHRcdHRoaXMuc2NvcmUgKz0gMTtcclxuXHRcdC8vIOabtOaWsCBzY29yZURpc3BsYXkgTGFiZWwg55qE5paH5a2XXHJcblx0XHR0aGlzLnNjb3JlRGlzcGxheS5zdHJpbmcgPSAnU2NvcmU6ICcgKyB0aGlzLnNjb3JlO1xyXG5cdFx0Ly8g5pKt5pS+5b6X5YiG6Z+z5pWIXHJcblx0XHRjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuc2NvcmVBdWRpbywgZmFsc2UpO1xyXG5cdH0sXHJcblx0Z2FtZU92ZXI6IGZ1bmN0aW9uKCkge1xyXG5cdFx0dGhpcy5wbGF5ZXIuc3RvcEFsbEFjdGlvbnMoKTsgLy/lgZzmraIgcGxheWVyIOiKgueCueeahOi3s+i3g+WKqOS9nFxyXG5cdFx0Y2MuZGlyZWN0b3IubG9hZFNjZW5lKCdnYW1lJyk7XHJcblx0fVxyXG59KTtcbiJdfQ==
//------QC-SOURCE-SPLIT------