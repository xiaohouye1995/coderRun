
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