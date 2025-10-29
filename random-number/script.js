function generateRandom() {
  var min=parseInt(document.getElementById('min').value);
  var max=parseInt(document.getElementById('max').value);
  if(isNaN(min)||isNaN(max)) {
    document.getElementById('result').innerText='Please enter valid numbers!';
    return;
  }
  if(min>max) {
    document.getElementById('result').innerText='Min should be less than Max.';
    return;
  }

  
  var randomNumber=Math.floor(Math.random()*(max-min+1))+min;
  document.getElementById('result').innerText='Random Number: '+randomNumber;
}