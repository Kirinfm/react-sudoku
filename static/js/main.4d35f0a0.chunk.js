(this["webpackJsonpnumber-game"]=this["webpackJsonpnumber-game"]||[]).push([[0],{10:function(e,r,a){"use strict";a.r(r);var t=a(1),n=a(2),u=a(4),s=a(3),c=a(5),l=a(8),i=a(0),m=a.n(i),o=a(7),d=a.n(o);a(15);function b(e){return m.a.createElement("button",{className:"square",onClick:e.onClick},e.value)}function h(e){for(var r=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],a=0;a<r.length;a++){var t=Object(l.a)(r[a],3),n=t[0],u=t[1],s=t[2];if(e[n]&&e[n]===e[u]&&e[n]===e[s])return e[n]}return null}var v=function(e){function r(e){var a;return Object(t.a)(this,r),(a=Object(u.a)(this,Object(s.a)(r).call(this,e))).state={squares:Array(9).fill(null),xIsNext:!0},a}return Object(c.a)(r,e),Object(n.a)(r,[{key:"renderSquare",value:function(e){var r=this;return m.a.createElement(b,{value:this.props.squares[e],onClick:function(){return r.props.onClick(e)}})}},{key:"render",value:function(){return m.a.createElement("div",null,m.a.createElement("div",{className:"board-row"},this.renderSquare(0),this.renderSquare(1),this.renderSquare(2)),m.a.createElement("div",{className:"board-row"},this.renderSquare(3),this.renderSquare(4),this.renderSquare(5)),m.a.createElement("div",{className:"board-row"},this.renderSquare(6),this.renderSquare(7),this.renderSquare(8)))}}]),r}(m.a.Component);m.a.Component;function N(e){return m.a.createElement("button",{className:e.className?e.className:"square"},e.value)}var f=function(e){function r(){return Object(t.a)(this,r),Object(u.a)(this,Object(s.a)(r).apply(this,arguments))}return Object(c.a)(r,e),Object(n.a)(r,[{key:"renderNumber",value:function(e,r){return m.a.createElement(N,{value:e,className:r})}},{key:"render",value:function(){for(var e=Array(9),r=0;r<9;r++){e[r]=Array(9);var a=!1;r/3%2>=1&&(a=!0);for(var t=0;t<9;t++)t%3===0&&(a=!a),e[r].push(this.renderNumber("",a?"square":"squareGrey"))}return m.a.createElement("div",null,e.map((function(r,a){return a!==e.length-1?m.a.createElement("div",{className:"board-row"},r):m.a.createElement("div",{className:"board-board"},r)})),m.a.createElement("div",{className:"board-row"},this.renderNumber(1),this.renderNumber(2),this.renderNumber(3),this.renderNumber(4),this.renderNumber(5),this.renderNumber(6),this.renderNumber(7),this.renderNumber(8),this.renderNumber(9)))}}]),r}(m.a.Component),E=function(e){function r(){return Object(t.a)(this,r),Object(u.a)(this,Object(s.a)(r).apply(this,arguments))}return Object(c.a)(r,e),Object(n.a)(r,[{key:"render",value:function(){return m.a.createElement("div",{className:"game"},m.a.createElement("div",{className:"game-board"},m.a.createElement(f,null)),m.a.createElement("div",{className:"game-info"},m.a.createElement("div",null),m.a.createElement("ol",null)))}}]),r}(m.a.Component),p=m.a.createElement("div",null,m.a.createElement(E,null));d.a.render(p,document.getElementById("root"))},15:function(e,r,a){},9:function(e,r,a){e.exports=a(10)}},[[9,1,2]]]);
//# sourceMappingURL=main.4d35f0a0.chunk.js.map