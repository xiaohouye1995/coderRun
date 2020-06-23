
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