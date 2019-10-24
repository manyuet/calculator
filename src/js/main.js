let operatorNum1;
let operatorNum2;
let operatorType;
let needReset = false;//是否需要将数字拼接在后面或者重新显示新的
let fontSize1 = 55;
let fontSize2 = 55;
let judgeCaculate = 0;//判断有没有计算过的标志
window.document.onkeydown = function (event) {//可以使用键盘输入，跟键盘数字运算符绑定
  let e = event || window.event || arguments.callee.caller.arguments[0];
  const operatorTypeList = ['+', '-', '*', '/'];
  if (e.key >= 0 && e.key <= 9) {//键盘输入数字
    clickNumber(String(e.key))
  } else if (operatorTypeList.includes(e.key)) {//输入运算符
    operator(e.key)
  } else if (e.key === '=' || e.keyCode === 13) {//enter运算符
    calculate()
  } else if (e.keyCode === 8) {//delete运算符
    if (getResultDiv().innerHTML.length > 1) {
      getResultDiv().innerHTML = getResultDiv().innerHTML.slice(0, -1);
    } else {
      getResultDiv().innerHTML = 0;
    }
  } else if (e.keyCode === 190) {//点运算符
    point();
  }
};

let changeCleanBtnText = () => {//AC与C的转换
  document.getElementsByClassName("operate-clean")[0].innerHTML = "C";
}

let changeFontSize = () => {
  const resultLength = getResultDiv().innerHTML.length;
  const resultDivStyle = document.getElementsByClassName("result-number")[0].style;
  if (resultLength <= 7) {
    resultDivStyle.fontSize = '55px';
  } else {
    if (operatorType) {//fontSize1 和fontSize2为了区分2个操作数的字体大小，取字体小的size显示
      resultDivStyle.fontSize = fontSize2 + 'px';
      if (fontSize2 > 30) {
        fontSize2 -= 5;
      } else if (fontSize2 >= 15 && fontSize2 <= 30) {
        fontSize2 -= 1;
      }
    } else {
      resultDivStyle.fontSize = fontSize1 + 'px';
      if (fontSize1 > 30) {
        fontSize1 -= 5;
      } else if (fontSize1 >= 15 && fontSize1 <= 30) {
        fontSize1 -= 1;
      }
    }
  }
}

function clickNumber(number) {
  const resultDiv = getResultDiv();
  changeCleanBtnText();
  if (judgeCaculate) {
    judgeCaculate = 0;
    needReset = false;
    resultDiv.innerHTML = number;
    changeFontSize();
  } else if (resultDiv.innerHTML === '0' || (operatorType && needReset)) {
    needReset = false;
    resultDiv.innerHTML = number;
    changeFontSize();
  } else {
    resultDiv.innerHTML += number;
    changeFontSize();
  }
  if (operatorType) {
    operatorNum2 = Number(getResultDiv().innerHTML);
  } else {
    operatorNum1 = Number(getResultDiv().innerHTML);
  }
  if (getResultDiv().innerHTML.length >= 32) {
    getResultDiv().innerHTML = getResultDiv().innerHTML.slice(1, -1) + '0';
  }
}

function cleanAll() {
  getResultDiv().innerHTML = 0;
  document.getElementsByClassName("operate-clean")[0].innerHTML = "AC";
  fontSize1 = 55;
  fontSize2 = 55;
  changeFontSize();
  changeOperatorBgColorToDefault();
  operatorNum1 = operatorNum2 = operatorType = '';

}

function getResultDiv() {
  return document.getElementsByClassName("result-number")[0];
}

function point() {
  changeCleanBtnText();
  const resultDiv = getResultDiv();
  if (!resultDiv.innerHTML.includes(".")) {
    resultDiv.innerHTML += ".";
  }
}

function changeOperatorBgColorToDefault() {
  const defaultBgColor = 'rgb(253,158,43)';
  document.getElementsByClassName('add')[0].style.backgroundColor = defaultBgColor;
  document.getElementsByClassName('cut')[0].style.backgroundColor = defaultBgColor;
  document.getElementsByClassName('multiple')[0].style.backgroundColor = defaultBgColor;
  document.getElementsByClassName('divide')[0].style.backgroundColor = defaultBgColor;
}

function operator(_operatorType) {
  operatorType = _operatorType;
  needReset = true;
  const selectBgColor = '#ff8300';
  changeOperatorBgColorToDefault();
  if (operatorType === '+') {
    document.getElementsByClassName('add')[0].style.backgroundColor = selectBgColor
  } else if (operatorType === '-') {
    document.getElementsByClassName('cut')[0].style.backgroundColor = selectBgColor
  } else if (operatorType === '*') {
    document.getElementsByClassName('multiple')[0].style.backgroundColor = selectBgColor
  } else if (operatorType === '/') {
    document.getElementsByClassName('divide')[0].style.backgroundColor = selectBgColor
  }

}

function calculate() {
  judgeCaculate = 1;
  if (!operatorNum2) {
    operatorNum2 = operatorNum1;//链式运算
  }
  if (operatorType === '+') {
    getResultDiv().innerHTML = (Number(operatorNum1) + Number(operatorNum2));
  } else if (operatorType === '-') {
    getResultDiv().innerHTML = (Number(operatorNum1) - Number(operatorNum2));
  } else if (operatorType === '*') {
    getResultDiv().innerHTML = (Number(operatorNum1) * Number(operatorNum2));
  } else if (operatorType === '/') {
    getResultDiv().innerHTML = (Number(operatorNum1) / Number(operatorNum2));
  }
  operatorNum1 = getResultDiv().innerHTML;
  if (getResultDiv().innerHTML.length <= 7) {
    getResultDiv().style.fontSize = '55px'
  } else {
    let resultFontSize = 55;
    let resultLength = getResultDiv().innerHTML.length;
    for(let i = resultLength; resultFontSize >= 25;i--){
      if(i>40){
        resultFontSize -=5;
      }else{
        resultFontSize -=2;
      }
    }
    getResultDiv().style.fontSize = resultFontSize + 'px';
  }
  changeOperatorBgColorToDefault();

}

function percent() {
  // getResultDiv().innerHTML=Number(getResultDiv().innerHTML)*0.01;
  if (!operatorType) {
    operatorNum1 = getResultDiv().innerHTML = Number(getResultDiv().innerHTML) * 0.01;
  } else {
    operatorNum2 = getResultDiv().innerHTML = Number(getResultDiv().innerHTML) * 0.01;
  }


}

function statusChange() {
  getResultDiv().innerHTML = Number(getResultDiv().innerHTML) * (-1);
}
