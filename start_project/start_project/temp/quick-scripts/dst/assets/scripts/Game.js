
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