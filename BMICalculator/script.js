// BMI Calculator JavaScript
class BMICalculator {
    constructor() {
        this.calculationHistory = JSON.parse(localStorage.getItem('bmiHistory') || '[]');
        this.maxHistoryItems = 20;
        
        this.initializeElements();
        this.bindEvents();
        this.updateHistoryDisplay();
    }

    initializeElements() {
        this.elements = {
            height: document.getElementById('height'),
            heightUnit: document.getElementById('heightUnit'),
            weight: document.getElementById('weight'),
            weightUnit: document.getElementById('weightUnit'),
            age: document.getElementById('age'),
            gender: document.getElementById('gender'),
            calculateBtn: document.getElementById('calculateBtn'),
            resetBtn: document.getElementById('resetBtn'),
            bmiValue: document.getElementById('bmiValue'),
            categoryText: document.getElementById('categoryText'),
            bmiCategory: document.getElementById('bmiCategory'),
            bmiIndicator: document.getElementById('bmiIndicator'),
            insightsContent: document.getElementById('insightsContent'),
            calculationHistory: document.getElementById('calculationHistory'),
            clearHistoryBtn: document.getElementById('clearHistoryBtn')
        };
    }

    bindEvents() {
        this.elements.calculateBtn.addEventListener('click', () => this.calculateBMI());
        this.elements.resetBtn.addEventListener('click', () => this.resetForm());
        this.elements.clearHistoryBtn.addEventListener('click', () => this.clearHistory());

        // Auto-calculate on input change
        [this.elements.height, this.elements.weight].forEach(input => {
            input.addEventListener('input', () => this.validateInputs());
        });

        // Unit conversion
        this.elements.heightUnit.addEventListener('change', () => this.convertHeight());
        this.elements.weightUnit.addEventListener('change', () => this.convertWeight());

        // Enter key support
        [this.elements.height, this.elements.weight, this.elements.age].forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.calculateBMI();
                }
            });
        });
    }

    validateInputs() {
        const height = parseFloat(this.elements.height.value);
        const weight = parseFloat(this.elements.weight.value);
        
        if (height > 0 && weight > 0) {
            this.elements.calculateBtn.disabled = false;
            this.elements.calculateBtn.classList.add('btn-primary');
            this.elements.calculateBtn.classList.remove('btn-secondary');
        } else {
            this.elements.calculateBtn.disabled = true;
            this.elements.calculateBtn.classList.remove('btn-primary');
            this.elements.calculateBtn.classList.add('btn-secondary');
        }
    }

    convertHeight() {
        const height = parseFloat(this.elements.height.value);
        if (!height) return;

        const unit = this.elements.heightUnit.value;
        if (unit === 'ft') {
            // Convert cm to ft
            this.elements.height.value = (height / 30.48).toFixed(2);
        } else {
            // Convert ft to cm
            this.elements.height.value = (height * 30.48).toFixed(1);
        }
    }

    convertWeight() {
        const weight = parseFloat(this.elements.weight.value);
        if (!weight) return;

        const unit = this.elements.weightUnit.value;
        if (unit === 'lbs') {
            // Convert kg to lbs
            this.elements.weight.value = (weight * 2.20462).toFixed(1);
        } else {
            // Convert lbs to kg
            this.elements.weight.value = (weight / 2.20462).toFixed(1);
        }
    }

    calculateBMI() {
        const height = parseFloat(this.elements.height.value);
        const weight = parseFloat(this.elements.weight.value);
        const heightUnit = this.elements.heightUnit.value;
        const weightUnit = this.elements.weightUnit.value;
        const age = parseInt(this.elements.age.value) || null;
        const gender = this.elements.gender.value || null;

        if (!height || !weight) {
            alert('Please enter both height and weight');
            return;
        }

        // Convert to metric units
        const heightInMeters = heightUnit === 'ft' ? height * 0.3048 : height / 100;
        const weightInKg = weightUnit === 'lbs' ? weight * 0.453592 : weight;

        // Calculate BMI
        const bmi = weightInKg / (heightInMeters * heightInMeters);
        const bmiRounded = Math.round(bmi * 10) / 10;

        // Get BMI category
        const category = this.getBMICategory(bmiRounded);
        
        // Display results
        this.displayResults(bmiRounded, category);
        
        // Update indicator position
        this.updateBMIIndicator(bmiRounded);
        
        // Generate health insights
        this.generateHealthInsights(bmiRounded, category, age, gender);
        
        // Add to history
        this.addToHistory(bmiRounded, category, height, weight, heightUnit, weightUnit, age, gender);
        
        // Add animation
        this.elements.bmiValue.classList.add('pulse');
        setTimeout(() => {
            this.elements.bmiValue.classList.remove('pulse');
        }, 500);
    }

    getBMICategory(bmi) {
        if (bmi < 18.5) return { name: 'Underweight', class: 'underweight' };
        if (bmi < 25) return { name: 'Normal weight', class: 'normal' };
        if (bmi < 30) return { name: 'Overweight', class: 'overweight' };
        return { name: 'Obese', class: 'obese' };
    }

    displayResults(bmi, category) {
        this.elements.bmiValue.textContent = bmi;
        this.elements.categoryText.textContent = category.name;
        
        // Update category styling
        this.elements.bmiCategory.className = 'bmi-category';
        this.elements.bmiCategory.classList.add(`category-${category.class}`);
    }

    updateBMIIndicator(bmi) {
        // Calculate position on the indicator track (0-100%)
        let position = 0;
        
        if (bmi < 18.5) {
            position = (bmi / 18.5) * 25; // 0-25%
        } else if (bmi < 25) {
            position = 25 + ((bmi - 18.5) / 6.5) * 25; // 25-50%
        } else if (bmi < 30) {
            position = 50 + ((bmi - 25) / 5) * 25; // 50-75%
        } else {
            position = Math.min(75 + ((bmi - 30) / 10) * 25, 100); // 75-100%
        }
        
        this.elements.bmiIndicator.style.left = `${position}%`;
    }

    generateHealthInsights(bmi, category, age, gender) {
        let insights = [];
        
        // BMI-specific insights
        switch (category.class) {
            case 'underweight':
                insights.push('Consider consulting a healthcare provider about healthy weight gain strategies.');
                insights.push('Focus on nutrient-dense foods and strength training to build healthy muscle mass.');
                insights.push('Ensure you\'re getting adequate calories and nutrients for your body\'s needs.');
                break;
                
            case 'normal':
                insights.push('Great! You\'re in a healthy weight range. Keep up the good work!');
                insights.push('Continue maintaining a balanced diet and regular physical activity.');
                insights.push('Regular health checkups can help you maintain this healthy status.');
                break;
                
            case 'overweight':
                insights.push('Consider gradual weight loss through diet and exercise modifications.');
                insights.push('Focus on sustainable lifestyle changes rather than quick fixes.');
                insights.push('Consult a healthcare provider for personalized weight management advice.');
                break;
                
            case 'obese':
                insights.push('Consider seeking professional help for weight management.');
                insights.push('Focus on gradual, sustainable lifestyle changes.');
                insights.push('Regular medical checkups are important for monitoring health risks.');
                break;
        }
        
        // Age-specific insights
        if (age) {
            if (age < 18) {
                insights.push('BMI interpretation for children and teens requires age and sex-specific growth charts.');
            } else if (age > 65) {
                insights.push('For older adults, BMI ranges may be slightly different. Consult your healthcare provider.');
            }
        }
        
        // General health tips
        insights.push('Remember: BMI is just one indicator of health. Other factors like muscle mass, bone density, and overall fitness are also important.');
        
        // Display insights
        this.elements.insightsContent.innerHTML = insights.map(insight => 
            `<p>• ${insight}</p>`
        ).join('');
    }

    addToHistory(bmi, category, height, weight, heightUnit, weightUnit, age, gender) {
        const record = {
            bmi: bmi,
            category: category.name,
            height: height,
            weight: weight,
            heightUnit: heightUnit,
            weightUnit: weightUnit,
            age: age,
            gender: gender,
            timestamp: new Date().toLocaleString()
        };
        
        this.calculationHistory.unshift(record);
        
        if (this.calculationHistory.length > this.maxHistoryItems) {
            this.calculationHistory = this.calculationHistory.slice(0, this.maxHistoryItems);
        }
        
        localStorage.setItem('bmiHistory', JSON.stringify(this.calculationHistory));
        this.updateHistoryDisplay();
    }

    updateHistoryDisplay() {
        const historyContainer = this.elements.calculationHistory;
        
        if (this.calculationHistory.length === 0) {
            historyContainer.innerHTML = '<p class="no-history">No calculations yet</p>';
            this.elements.clearHistoryBtn.disabled = true;
        } else {
            historyContainer.innerHTML = this.calculationHistory.map(record => `
                <div class="history-item">
                    <div class="bmi-info">
                        <div class="bmi-value">${record.bmi}</div>
                        <div class="bmi-details">
                            ${record.height}${record.heightUnit} • ${record.weight}${record.weightUnit}
                            ${record.age ? ` • Age: ${record.age}` : ''}
                            ${record.gender ? ` • ${record.gender.charAt(0).toUpperCase() + record.gender.slice(1)}` : ''}
                            <br>${record.timestamp}
                        </div>
                    </div>
                    <div class="bmi-category category-${this.getBMICategory(record.bmi).class}">
                        ${record.category}
                    </div>
                </div>
            `).join('');
            this.elements.clearHistoryBtn.disabled = false;
        }
    }

    clearHistory() {
        if (confirm('Are you sure you want to clear all calculation history?')) {
            this.calculationHistory = [];
            localStorage.removeItem('bmiHistory');
            this.updateHistoryDisplay();
        }
    }

    resetForm() {
        this.elements.height.value = '';
        this.elements.weight.value = '';
        this.elements.age.value = '';
        this.elements.gender.value = '';
        this.elements.heightUnit.value = 'cm';
        this.elements.weightUnit.value = 'kg';
        
        this.elements.bmiValue.textContent = '--';
        this.elements.categoryText.textContent = 'Enter your details';
        this.elements.bmiCategory.className = 'bmi-category';
        this.elements.bmiIndicator.style.left = '0%';
        
        this.elements.insightsContent.innerHTML = '<p>Enter your height and weight to get personalized health insights.</p>';
        
        this.validateInputs();
    }

    // Additional utility methods
    calculateIdealWeight(height, heightUnit) {
        const heightInMeters = heightUnit === 'ft' ? height * 0.3048 : height / 100;
        
        // Using Devine formula for ideal weight
        const idealWeightKg = 50 + 2.3 * ((heightInMeters * 100) - 152.4);
        
        return {
            kg: Math.round(idealWeightKg * 10) / 10,
            lbs: Math.round(idealWeightKg * 2.20462 * 10) / 10
        };
    }

    calculateWeightRange(height, heightUnit) {
        const heightInMeters = heightUnit === 'ft' ? height * 0.3048 : height / 100;
        
        const normalMin = 18.5 * heightInMeters * heightInMeters;
        const normalMax = 24.9 * heightInMeters * heightInMeters;
        
        return {
            minKg: Math.round(normalMin * 10) / 10,
            maxKg: Math.round(normalMax * 10) / 10,
            minLbs: Math.round(normalMin * 2.20462 * 10) / 10,
            maxLbs: Math.round(normalMax * 2.20462 * 10) / 10
        };
    }
}

// Initialize the BMI calculator when the page loads
let bmiCalculator;
document.addEventListener('DOMContentLoaded', () => {
    bmiCalculator = new BMICalculator();
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
            case 'Enter':
                e.preventDefault();
                bmiCalculator.calculateBMI();
                break;
            case 'r':
                e.preventDefault();
                bmiCalculator.resetForm();
                break;
        }
    }
});

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BMICalculator;
}
