var textarea = document.querySelectorAll('textarea');
var dob = document.querySelector('[data-dob="true"]');
var age = document.querySelector('[data-age="true"]');
var pulse = document.querySelector('[data-pulse="true"]');
var rr = document.querySelector('[data-rr="true"]');

//dob.addEventListener('input', dateOfBirth);
dob.addEventListener('click', ()=>{
  setCaretPosition(dob, dob.value.length);
});
dob.addEventListener('keydown', (e)=>{
  let key = e.key;
  if(key === "Tab") return;
  if (key === "Backspace" || key === "Delete") {
    e.preventDefault();
    let newString = dob.dataset.inputed.split('');
    newString[newString.length-1] = '';
    dob.dataset.inputed = newString.join('');
    setDOB(dob.dataset.inputed);
  }else {
    e.preventDefault();
    if(isNaN(key)) return;
    dateOfBirth(e);
  }
});
pulse.addEventListener('keydown', (e)=>{
  addBPM(e);
});
rr.addEventListener('keydown', (e)=>{
  addBPM(e);
});
document.getElementById('name').addEventListener('input', resetSub);

for(let i = 0; i<textarea.length;i++){
  textarea[i].addEventListener('keydown', autosize);
}

function autosize(){
  var el = this;  
    setTimeout(function(){
      el.style.cssText = 'height:auto; padding:0';
      el.style.cssText = 'height:' + el.scrollHeight + 'px';
    },0);
}

function resetSub(){
  let ageValue = age.value;
  let ageSubText = '';
  if(!isNaN(ageValue) && ageValue !== '') ageSubText = ' • ' + ageValue;

  let text = document.getElementById('name').value + ageSubText;

  document.querySelector('[data-sub="true"]').innerText = text;
  document.querySelector('header h4').innerText = text;
}


function dateOfBirth(e){
  e.preventDefault();
  let letters = dob.dataset.inputed + e.key;
  dob.dataset.inputed = letters;
  setDOB(letters);
}

function setDOB(inputedLeters){
  let format = ['M','M','-','D','D','-','Y','Y'];
  
  dob.value = goThroughAndReplace(inputedLeters.split(''), format).join('');
  
  let age_ = calculate_age(new Date(dob.value));
  age.value = age_;
  resetSub();
}


function calculate_age(dob) { 
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms); 
  
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}
  
  function doGetCaretPosition(ctrl)
{
 var CaretPos = 0;

 if (ctrl.selectionStart || ctrl.selectionStart == 0)
 {// Standard.
  CaretPos = ctrl.selectionStart;
 }
 else if (document.selection)
 {// Legacy IE
  ctrl.focus ();
  var Sel = document.selection.createRange ();
  Sel.moveStart ('character', -ctrl.value.length);
  CaretPos = Sel.text.length;
 }

 return (CaretPos);
}


function setCaretPosition(ctrl,pos)
{
 if (ctrl.setSelectionRange)
 {
  ctrl.focus();
  ctrl.setSelectionRange(pos,pos);
 }
 else if (ctrl.createTextRange)
 {
  var range = ctrl.createTextRange();
  range.collapse(true);
  range.moveEnd('character', pos);
  range.moveStart('character', pos);
  range.select();
 }
}


function goThroughAndReplace(a,b){ //a must be list and b should also be list
  let finalString = b;
  for(let i = 0, f=0; i<a.length ;i++){
    if(finalString[f] === '-'){
      f++;
    }
    finalString[f] = a[i];
    f++;
  }
  
  return finalString;
}

function addBPM(e){
  let key = e.key;
  let value = e.target.value;
  if(key === "Tab") return;
  if (key === "Backspace" || key === "Delete") {
    e.preventDefault();
    e.target.value = value.substring(0,value.length-5) + ' BPM';
  } else {
    e.preventDefault();
    if(isNaN(key)) return;
    e.target.value = value.substring(0,value.length-4) + e.key + ' BPM';
  }
}

const saveButton = document.getElementById('saveButton');

saveButton.addEventListener('click', ()=>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = output();

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:3000/api/create", requestOptions)
    .then(response => response.text())
    .then(result => console.log(JSON.parse(result)))
    .catch(error => console.log('error', error));
});

function output(){
    const allInputs = document.querySelectorAll('input');
    let listOfValues = {};
    for(let i = 0; i <allInputs.length; i++){
        const elm = allInputs[i];
        listOfValues[i] = elm.value;
    }
    return JSON.stringify(listOfValues);
}