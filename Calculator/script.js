// Simple calculator logic
const displayEl = document.getElementById('display');
const keys = document.querySelectorAll('[data-key], [data-op]');

let expr = '';

function updateDisplay(v){
  displayEl.value = v;
}

keys.forEach(k => {
  k.addEventListener('click', () => {
    if(k.dataset.key){
      expr += k.dataset.key;
      updateDisplay(expr);
    } else if(k.dataset.op){
      expr += k.dataset.op;
      updateDisplay(expr);
    }
  });
});

document.getElementById('clear').addEventListener('click', ()=>{
  expr = '';
  updateDisplay('');
});

document.getElementById('equals').addEventListener('click', ()=>{
  evaluateExpression();
});

document.getElementById('sqr').addEventListener('click', ()=>{
  try{
    let v = safeEval(displayEl.value || '0');
    let res = Math.pow(Number(v), 2);
    if(Number.isFinite(res)){
      expr = String(cleanNumber(res));
      updateDisplay(expr);
    } else throw new Error('Invalid result');
  }catch(e){
    alert('Invalid input for square');
    expr = '';
    updateDisplay('');
  }
});

document.getElementById('cube').addEventListener('click', ()=>{
  try{
    let v = safeEval(displayEl.value || '0');
    let res = Math.pow(Number(v), 3);
    if(Number.isFinite(res)){
      expr = String(cleanNumber(res));
      updateDisplay(expr);
    } else throw new Error('Invalid result');
  }catch(e){
    alert('Invalid input for cube');
    expr = '';
    updateDisplay('');
  }
});

function evaluateExpression(){
  try{
    let result = safeEval(expr || displayEl.value || '0');
    if(result === Infinity || result === -Infinity) throw new Error('Division by zero');
    expr = String(cleanNumber(result));
    updateDisplay(expr);
  }catch(e){
    alert(e.message || 'Invalid expression');
    expr = '';
    updateDisplay('');
  }
}

// Allow only digits, operators, decimal point, parentheses and spaces
function safeEval(input){
  const allowed = /^[0-9+\-*/%.() \t]+$/;
  if(typeof input !== 'string') throw new Error('Invalid input');
  const trimmed = input.trim();
  if(trimmed === '') return 0;
  if(!allowed.test(trimmed)) throw new Error('Invalid characters');
  // Use Function to evaluate in global-free scope
  // This is still eval-like but we restricted allowed chars above
  // and don't expose builtins.
  // eslint-disable-next-line no-new-func
  const fn = new Function('return (' + trimmed + ')');
  return fn();
}

function cleanNumber(n){
  if(typeof n === 'number' && Number.isInteger(n)) return n;
  if(typeof n === 'number') return parseFloat(n.toFixed(10));
  return n;
}
