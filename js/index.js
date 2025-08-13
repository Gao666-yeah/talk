// 准备数据
function $(selector) {
  return document.querySelector(selector);
}
var doms = {
  changeImg: $(".changeImg"),
  title: $(".title"),
  imageBox: $(".imageBox"),
  imageBlock: $(".imageBlock"),
  imageGap: $(".imageGap"),
  slider: $(".slider"),
  sliderText: $(".sliderText"),
  sliderBtn: $(".sliderBtn"),
  sliderBtnShadow: $(".btn-shadow"),
};
var imgArr = [
  "./images/0.png",
  "./images/1.png",
  "./images/2.png",
  "./images/3.png",
  "./images/4.png",
  "./images/5.png",
  "./images/6.png",
];
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function initEvent() {
  doms.imageBlock.style.opacity = 0;
  doms.sliderBtn.style = "-2px";
  doms.sliderBtnShadow.style = "-1px";
  doms.title.innerHTML = "请完成图片验证";
  doms.title.style.color = "#000";
  doms.imageBlock.style.transition = "";
  doms.sliderBtn.style.transition = "";
  doms.sliderBtnShadow.style.transition = "";

  // 刷新背景图片随机切换
  var randomImg = getRandom(0, imgArr.length - 1);
  doms.imageBox.style.backgroundImage = `url(${imgArr[randomImg]})`;
  doms.imageBlock.style.backgroundImage = `url(${imgArr[randomImg]})`;
  // 空缺色块的位置出现在后半部分
  var maxTop = doms.imageBox.offsetHeight - doms.imageGap.offsetHeight;
  var maxLeft = doms.imageBox.offsetWidth / 2 - doms.imageGap.offsetWidth;
  var left = getRandom(0, maxLeft) + doms.imageBox.offsetWidth / 2;
  var top = getRandom(0, maxTop);
  doms.imageGap.style.top = top + "px";
  doms.imageGap.style.left = left - 1 + "px";

  // 让移动色块的背景与缺块相吻合
  doms.imageBlock.style.backgroundPosition = `-${left - 1}px -${top + 2}px`;
  // 移动色块的位置
  doms.imageBlock.style.top = top + "px";
  doms.imageBlock.style.left = "0px";

  // 绑定事件
  doms.sliderBtn.onmousedown = function (e) {
    doms.imageBlock.style.transition = "";
    doms.sliderBtn.style.transition = "";
    doms.sliderBtnShadow.style.transition = "";
    console.log("mousedown");
    doms.imageBlock.style.opacity = 1;
    doms.slider.onmousemove = function (ev) {
      console.log("mousemove");
      var left = ev.clientX - doms.imageBox.offsetLeft - e.offsetX;
      var maxLeft = doms.slider.offsetWidth - doms.imageBlock.offsetWidth;
      if (left < -2) {
        left = -2;
      }
      if (left > maxLeft) {
        left = maxLeft;
      }
      doms.sliderBtn.style.left = left + "px";
      doms.sliderBtnShadow.style.left = left + "px";
      doms.sliderText.style.opacity = 0;
      doms.imageBlock.style.left = left + "px";
      // 监听鼠标松开
      document.onmouseup = function () {
        console.log("mouseup");
        // 判断移动色块和空白色块的left差值，设置成功或者失败
        var disX = doms.imageGap.offsetLeft - doms.imageBlock.offsetLeft;
        if (disX < -5 || disX > 5) {
          // 验证失败，色块回弹
          doms.imageBlock.style.left = "0px";
          doms.imageBlock.style.transition = "all .5s";
          doms.sliderBtn.style.left = "-2px";
          doms.sliderBtnShadow.style.left = "-1px";
          doms.sliderBtn.style.transition = "all .5s";
          doms.sliderBtnShadow.style.transition = "all .5s";
          doms.sliderText.style.opacity = 1;
          doms.slider.onmousemove = document.onmouseup = null;
          // 设置验证失败文字
          doms.title.innerHTML = "验证失败";
          doms.title.style.color = "green";
        } else {
          // 差值在范围内，验证成功，移除所有事件
          doms.sliderBtn.onmousedown =
            doms.slider.onmousemove =
            document.onmouseup =
              null;
          doms.title.innerHTML = "验证成功";
          doms.title.style.color = "red";
          doms.imageBlock.style.transition = "";
          doms.sliderBtn.style.transition = "";
          doms.sliderBtnShadow.style.transition = "";
        }
      };
    };
  };
}
initEvent();
// 绑定事件，更换图片
doms.changeImg.onclick = initEvent;
