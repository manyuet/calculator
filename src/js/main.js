let operatorNum1;
let operatorNum2;
let operatorType;
let needReset = false;
let fontSize1 = 55;
let fontSize2 = 55;

window.document.onkeydown = function (event) {
  let e = event || window.event || arguments.callee.caller.arguments[0];
  const operatorTypeList = ['+','-','*','/'];
  if(e.key>=0 && e.key <=9){
    clickNumber(String(e.key))
  }else if(operatorTypeList.includes(e.key)){
    operator(e.key)
  }else if(e.key === '=' || e.keyCode === 13){
    calculate()
  }
  else if(e.keyCode===8){
    if(getResultDiv().innerHTML.length>1) {
        getResultDiv().innerHTML = getResultDiv().innerHTML.slice(0, -1);
    }
    else{
        getResultDiv().innerHTML=0;
    }
  }
  else if(e.keyCode===190){
    point();
  }
};

function changeCleanBtnText() {
  document.getElementsByClassName("operate-clean")[0].innerHTML="C";
}

function changeFontSize() {
  const resultLength = getResultDiv().innerHTML.length;
  const resultDivStyle = document.getElementsByClassName("result-number")[0].style;
  if(resultLength <= 7){
    resultDivStyle.fontSize = '55px';
  }else{
    if(operatorType) {
      resultDivStyle.fontSize = fontSize2 + 'px';
      if (fontSize2 > 30) {
        fontSize2 -= 5;
      } else if (fontSize2 >= 15 && fontSize2 <= 30) {
        fontSize2 -= 1;
      }
    }else{
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
  if (resultDiv.innerHTML === '0' || (operatorType && needReset)) {
    needReset = false;
    resultDiv.innerHTML = number
    changeFontSize();
  } else {
    resultDiv.innerHTML += number;
    changeFontSize();
  }
  if(operatorType){
    operatorNum2 = Number(getResultDiv().innerHTML);
  }else{
    operatorNum1 = Number(getResultDiv().innerHTML);
  }
  if(getResultDiv().innerHTML.length>=32){
    getResultDiv().innerHTML = getResultDiv().innerHTML.slice(1,-1) + '0';
  }
}
function cleanAll() {
  getResultDiv().innerHTML=0;
  document.getElementsByClassName("operate-clean")[0].innerHTML="AC";
  fontSize1 = 55;
  fontSize2 = 55;
  changeFontSize();
  changeOperatorBgColorToDefault()
}

function getResultDiv() {
  return document.getElementsByClassName("result-number")[0];
}

function point() {
  changeCleanBtnText();
  const resultDiv = getResultDiv();
  if(!resultDiv.innerHTML.includes(".")){
    resultDiv.innerHTML +=".";
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
  if(operatorType === '+'){
    document.getElementsByClassName('add')[0].style.backgroundColor= selectBgColor
  }else if(operatorType==='-'){
    document.getElementsByClassName('cut')[0].style.backgroundColor= selectBgColor
  }
  else if(operatorType==='*'){
    document.getElementsByClassName('multiple')[0].style.backgroundColor= selectBgColor
  }  else if(operatorType==='/'){
    document.getElementsByClassName('divide')[0].style.backgroundColor= selectBgColor
  }

}

function calculate() {
  if(operatorType === '+'){
    getResultDiv().innerHTML = (Number(operatorNum1) + Number(operatorNum2));
  }else if(operatorType === '-'){
    getResultDiv().innerHTML = (Number(operatorNum1) - Number(operatorNum2));
  }else if(operatorType === '*'){
    getResultDiv().innerHTML = (Number(operatorNum1) * Number(operatorNum2));
  }else if(operatorType === '/'){
    getResultDiv().innerHTML = (Number(operatorNum1) / Number(operatorNum2));
  }
  operatorType = null;
  if(getResultDiv().innerHTML.length<=7){
    getResultDiv().style.fontSize = '55px'
  }else {
    getResultDiv().style.fontSize = Math.min(fontSize1, fontSize2) + 'px';
  }
  changeOperatorBgColorToDefault();
}
function percent() {
  getResultDiv().innerHTML=Number(getResultDiv().innerHTML)*0.01;
}
function statusChange() {
  getResultDiv().innerHTML=Number(getResultDiv().innerHTML)*(-1);
}
