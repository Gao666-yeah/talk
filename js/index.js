function main() {
  // 绘制棋盘
  initChessBoard();
  // 绑定事件
  bindEvent();
}

function $(selector) {
  return document.querySelector(selector);
}
var chessBoardDOM = $(".chessBoard");
// 游戏是否结束
var isGameOver = false;
// 棋子颜色
var chessColor = "white";
// 已经有的棋子
var chessArr = [];
function initChessBoard() {
  var tableContent = "";
  // 绘制表格
  for (var i = 0; i < 14; i++) {
    var row = `<tr>`;
    for (var j = 0; j < 14; j++) {
      row += `<td data-row='${i}' data-line='${j}'></td>`;
    }
    row += "</tr>";
    tableContent += row;
  }
  chessBoardDOM.innerHTML = tableContent;
}

function bindEvent() {
  chessBoardDOM.onclick = function (e) {
    if (!isGameOver) {
      var chessTemp = Object.assign({}, e.target.dataset);
      if (e.target.tagName === "TD") {
        // 判断棋子落下的位置  左上 左下 右上 右下
        var tdW = (chessBoardDOM.clientWidth * 0.92) / 14;
        var positionX = e.offsetX > tdW / 2;
        var positionY = e.offsetY > tdW / 2;
        var chessPoint = {
          x: positionX
            ? parseInt(chessTemp.line) + 1
            : parseInt(chessTemp.line),
          y: positionY ? parseInt(chessTemp.row) + 1 : parseInt(chessTemp.row),
          c: chessColor,
        };

        // 绘制棋子
        paintChess(chessPoint);
      }
    } else {
      // 游戏已经结束
      if (window.confirm("是否要重新开一局？")) {
        initChessBoard();
        isGameOver = false;
        chessArr = [];
      }
    }
  };
}

function paintChess(chessPoint) {
  // 绘制之前先判断，有没有棋子
  if (existChess(chessPoint) && !isGameOver) {
    // 此位置还没绘制棋子且游戏没结束
    var newChess = `<div class='chess ${chessPoint.c}' data-row='${chessPoint.y}' data-line='${chessPoint.x}'></div>`;

    // 根据不同的位置调整棋子，情况：最后一列的棋子（最右下角容纳四个棋子）/ 最后一行棋子 / 最右下角的棋子

    // 中间的棋子
    if (chessPoint.x < 14 && chessPoint.y < 14) {
      var td = $(`td[data-row='${chessPoint.y}'][data-line='${chessPoint.x}']`);
      td.innerHTML += newChess;
    }
    // 最后一列的棋子
    if (chessPoint.x === 14 && chessPoint.y < 14) {
      var td = $(`td[data-row='${chessPoint.y}'][data-line='13']`);
      td.innerHTML += newChess;
      td.lastChild.style.left = "50%";
    }
    // 最后一行的棋子
    if (chessPoint.x < 14 && chessPoint.y === 14) {
      var td = $(`td[data-row='13'][data-line='${chessPoint.x}']`);
      td.innerHTML += newChess;
      td.lastChild.style.top = "50%";
    }
    // 最右下角 有4个棋子
    if (chessPoint.x === 14 && chessPoint.y === 14) {
      var td = $(`td[data-row='13'][data-line='13']`);
      td.innerHTML += newChess;
      td.lastChild.style.top = "50%";
      td.lastChild.style.left = "50%";
    }

    chessArr.push(chessPoint);
    chessColor = chessColor === "white" ? "black" : "white";
    // 每下一颗棋子就要判断赢了吗
    checkWin();
  }
}
function existChess(chessPoint) {
  var result = chessArr.find(function (item) {
    return chessPoint.x === item.x && chessPoint.y === item.y;
  });
  return result === undefined ? true : false;
}

function checkWin() {
  console.log("win");
  // 4种情况：横着5个 / 竖着5个 / 正斜5个 / 反斜5个

  // 1. 横着5个
  for (var i = 0; i < chessArr.length; i++) {
    var curChess = chessArr[i];
    var chess2, chess3, chess4, chess5;
    chess2 = chessArr.find(function (item) {
      return (
        curChess.x === item.x + 1 &&
        curChess.y === item.y &&
        curChess.c === item.c
      );
    });
    chess3 = chessArr.find(function (item) {
      return (
        curChess.x === item.x + 2 &&
        curChess.y === item.y &&
        curChess.c === item.c
      );
    });
    chess4 = chessArr.find(function (item) {
      return (
        curChess.x === item.x + 3 &&
        curChess.y === item.y &&
        curChess.c === item.c
      );
    });
    chess5 = chessArr.find(function (item) {
      return (
        curChess.x === item.x + 4 &&
        curChess.y === item.y &&
        curChess.c === item.c
      );
    });

    if (chess2 && chess3 && chess4 && chess5) {
      console.log("横着");
      return end(curChess, chess2, chess3, chess4, chess5);
    }
  }
  // 2. 竖着5个
  for (var i = 0; i < chessArr.length; i++) {
    var curChess = chessArr[i];
    var chess2, chess3, chess4, chess5;
    chess2 = chessArr.find(function (item) {
      return (
        curChess.x === item.x &&
        curChess.y === item.y + 1 &&
        curChess.c === item.c
      );
    });
    chess3 = chessArr.find(function (item) {
      return (
        curChess.x === item.x &&
        curChess.y === item.y + 2 &&
        curChess.c === item.c
      );
    });
    chess4 = chessArr.find(function (item) {
      return (
        curChess.x === item.x &&
        curChess.y === item.y + 3 &&
        curChess.c === item.c
      );
    });
    chess5 = chessArr.find(function (item) {
      return (
        curChess.x === item.x &&
        curChess.y === item.y + 4 &&
        curChess.c === item.c
      );
    });
    // console.log(chessArr);
    // console.log(chess2, chess3, chess5);
    if (chess2 && chess3 && chess4 && chess5) {
      console.log("竖着");
      return end(curChess, chess2, chess3, chess4, chess5);
    }
  }
  // 正斜5个
  for (var i = 0; i < chessArr.length; i++) {
    var curChess = chessArr[i];
    var chess2, chess3, chess4, chess5;
    chess2 = chessArr.find(function (item) {
      return (
        curChess.x === item.x + 1 &&
        curChess.y === item.y - 1 &&
        curChess.c === item.c
      );
    });
    chess3 = chessArr.find(function (item) {
      return (
        curChess.x === item.x + 2 &&
        curChess.y === item.y - 2 &&
        curChess.c === item.c
      );
    });
    chess4 = chessArr.find(function (item) {
      return (
        curChess.x === item.x + 3 &&
        curChess.y === item.y - 3 &&
        curChess.c === item.c
      );
    });
    chess5 = chessArr.find(function (item) {
      return (
        curChess.x === item.x + 4 &&
        curChess.y === item.y - 4 &&
        curChess.c === item.c
      );
    });

    if (chess2 && chess3 && chess4 && chess5) {
      console.log("正斜");
      return end(curChess, chess2, chess3, chess4, chess5);
    }
  }
  // 反斜5个
  for (var i = 0; i < chessArr.length; i++) {
    var curChess = chessArr[i];
    var chess2, chess3, chess4, chess5;
    chess2 = chessArr.find(function (item) {
      return (
        curChess.x === item.x - 1 &&
        curChess.y === item.y - 1 &&
        curChess.c === item.c
      );
    });
    chess3 = chessArr.find(function (item) {
      return (
        curChess.x === item.x - 2 &&
        curChess.y === item.y - 2 &&
        curChess.c === item.c
      );
    });
    chess4 = chessArr.find(function (item) {
      return (
        curChess.x === item.x - 3 &&
        curChess.y === item.y - 3 &&
        curChess.c === item.c
      );
    });
    chess5 = chessArr.find(function (item) {
      return (
        curChess.x === item.x - 4 &&
        curChess.y === item.y - 4 &&
        curChess.c === item.c
      );
    });

    if (chess2 && chess3 && chess4 && chess5) {
      console.log("反斜");
      return end(curChess, chess2, chess3, chess4, chess5);
    }
  }
}
function end() {
  if (!isGameOver) {
    isGameOver = true;
    // 给所有棋子标上序号
    for (var i = 0; i < chessArr.length; i++) {
      var chessItem = chessArr[i];
      $(
        `div[data-row='${chessItem.y}'][data-line='${chessItem.x}']`
      ).innerHTML = i + 1;
    }
    // 给连续的5个棋子加上边框
    for (var i = 0; i < arguments.length; i++) {
      var chessWin = arguments[i];
      $(
        `div[data-row='${chessWin.y}'][data-line='${chessWin.x}']`
      ).classList.add("win");
    }
  }
}
main();
