document.getElementById('calculate').addEventListener('click', () => {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);

    if(isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0){
        alert("Please enter valid positive numbers!");
        return;
    }

    const heightM = height / 100;
    const bmi = weight / (heightM * heightM);
    let category = '';

    if(bmi < 18.5){
        category = 'Underweight';
    } else if(bmi < 24.9){
        category = 'Normal weight';
    } else if(bmi < 29.9){
        category = 'Overweight';
    } else {
        category = 'Obesity';
    }

    document.getElementById('result').innerHTML = `Your BMI is <strong>${bmi.toFixed(2)}</strong> (${category})`;
});
