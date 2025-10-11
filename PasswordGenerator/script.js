// Advanced Password Generator JavaScript
class PasswordGenerator {
    constructor() {
        this.characters = {
            uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lowercase: 'abcdefghijklmnopqrstuvwxyz',
            numbers: '0123456789',
            symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
            similar: '0OIl1',
            ambiguous: '{}[]()\\/|`~'
        };
        
        this.passwordHistory = JSON.parse(localStorage.getItem('passwordHistory') || '[]');
        this.maxHistoryItems = 20;
        
        this.initializeElements();
        this.bindEvents();
        this.updateLengthDisplay();
        this.updatePasswordHistory();
    }

    initializeElements() {
        this.elements = {
            lengthSlider: document.getElementById('length'),
            lengthValue: document.getElementById('lengthValue'),
            uppercase: document.getElementById('uppercase'),
            lowercase: document.getElementById('lowercase'),
            numbers: document.getElementById('numbers'),
            symbols: document.getElementById('symbols'),
            excludeSimilar: document.getElementById('excludeSimilar'),
            excludeAmbiguous: document.getElementById('excludeAmbiguous'),
            generateBtn: document.getElementById('generateBtn'),
            copyBtn: document.getElementById('copyBtn'),
            regenerateBtn: document.getElementById('regenerateBtn'),
            passwordOutput: document.getElementById('passwordOutput'),
            strengthIndicator: document.getElementById('strengthIndicator'),
            strengthText: document.getElementById('strengthText'),
            passwordLength: document.getElementById('passwordLength'),
            passwordEntropy: document.getElementById('passwordEntropy'),
            crackTime: document.getElementById('crackTime'),
            passwordHistory: document.getElementById('passwordHistory'),
            clearHistoryBtn: document.getElementById('clearHistoryBtn')
        };
    }

    bindEvents() {
        // Length slider
        this.elements.lengthSlider.addEventListener('input', () => {
            this.updateLengthDisplay();
        });

        // Generate button
        this.elements.generateBtn.addEventListener('click', () => {
            this.generatePassword();
        });

        // Copy button
        this.elements.copyBtn.addEventListener('click', () => {
            this.copyToClipboard();
        });

        // Regenerate button
        this.elements.regenerateBtn.addEventListener('click', () => {
            this.generatePassword();
        });

        // Preset buttons
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.applyPreset(e.target.dataset.preset);
            });
        });

        // Clear history button
        this.elements.clearHistoryBtn.addEventListener('click', () => {
            this.clearHistory();
        });

        // Auto-generate on option change
        ['uppercase', 'lowercase', 'numbers', 'symbols', 'excludeSimilar', 'excludeAmbiguous'].forEach(id => {
            document.getElementById(id).addEventListener('change', () => {
                if (this.elements.passwordOutput.value) {
                    this.generatePassword();
                }
            });
        });
    }

    updateLengthDisplay() {
        this.elements.lengthValue.textContent = this.elements.lengthSlider.value;
    }

    generatePassword() {
        const length = parseInt(this.elements.lengthSlider.value);
        const options = this.getSelectedOptions();
        
        if (options.length === 0) {
            alert('Please select at least one character type!');
            return;
        }

        // Add generating animation
        this.elements.generateBtn.classList.add('generating');
        
        setTimeout(() => {
            const password = this.createPassword(length, options);
            this.elements.passwordOutput.value = password;
            this.elements.copyBtn.disabled = false;
            this.updatePasswordStrength(password);
            this.addToHistory(password);
            this.elements.generateBtn.classList.remove('generating');
        }, 100);
    }

    getSelectedOptions() {
        const options = [];
        
        if (this.elements.uppercase.checked) {
            let chars = this.characters.uppercase;
            if (this.elements.excludeSimilar.checked) {
                chars = chars.replace(/[OIl]/g, '');
            }
            if (this.elements.excludeAmbiguous.checked) {
                chars = chars.replace(/[{}[\]()\\/|`~]/g, '');
            }
            options.push(chars);
        }
        
        if (this.elements.lowercase.checked) {
            let chars = this.characters.lowercase;
            if (this.elements.excludeSimilar.checked) {
                chars = chars.replace(/[ol]/g, '');
            }
            options.push(chars);
        }
        
        if (this.elements.numbers.checked) {
            let chars = this.characters.numbers;
            if (this.elements.excludeSimilar.checked) {
                chars = chars.replace(/[01]/g, '');
            }
            options.push(chars);
        }
        
        if (this.elements.symbols.checked) {
            let chars = this.characters.symbols;
            if (this.elements.excludeAmbiguous.checked) {
                chars = chars.replace(/[{}[\]()\\/|`~]/g, '');
            }
            options.push(chars);
        }
        
        return options;
    }

    createPassword(length, options) {
        const allChars = options.join('');
        let password = '';
        
        // Ensure at least one character from each selected type
        options.forEach(option => {
            const randomChar = option[Math.floor(Math.random() * option.length)];
            password += randomChar;
        });
        
        // Fill the rest randomly
        for (let i = password.length; i < length; i++) {
            const randomChar = allChars[Math.floor(Math.random() * allChars.length)];
            password += randomChar;
        }
        
        // Shuffle the password
        return this.shuffleString(password);
    }

    shuffleString(str) {
        const arr = str.split('');
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr.join('');
    }

    updatePasswordStrength(password) {
        const strength = this.calculateStrength(password);
        
        // Update strength bar
        this.elements.strengthIndicator.className = 'strength-fill';
        this.elements.strengthIndicator.classList.add(`strength-${strength.level}`);
        
        // Update strength text
        this.elements.strengthText.textContent = strength.text;
        
        // Update password info
        this.elements.passwordLength.textContent = password.length;
        this.elements.passwordEntropy.textContent = strength.entropy.toFixed(1);
        this.elements.crackTime.textContent = strength.crackTime;
    }

    calculateStrength(password) {
        const length = password.length;
        let charsetSize = 0;
        
        if (/[a-z]/.test(password)) charsetSize += 26;
        if (/[A-Z]/.test(password)) charsetSize += 26;
        if (/[0-9]/.test(password)) charsetSize += 10;
        if (/[^a-zA-Z0-9]/.test(password)) charsetSize += 32;
        
        const entropy = Math.log2(Math.pow(charsetSize, length));
        
        let level, text, crackTime;
        
        if (entropy < 30) {
            level = 'weak';
            text = 'Weak';
            crackTime = 'Instant';
        } else if (entropy < 50) {
            level = 'fair';
            text = 'Fair';
            crackTime = 'Minutes';
        } else if (entropy < 70) {
            level = 'good';
            text = 'Good';
            crackTime = 'Hours to Days';
        } else {
            level = 'strong';
            text = 'Strong';
            crackTime = 'Years';
        }
        
        return { level, text, entropy, crackTime };
    }

    async copyToClipboard() {
        try {
            await navigator.clipboard.writeText(this.elements.passwordOutput.value);
            this.elements.copyBtn.textContent = 'Copied!';
            this.elements.copyBtn.classList.add('copy-success');
            
            setTimeout(() => {
                this.elements.copyBtn.textContent = 'Copy to Clipboard';
                this.elements.copyBtn.classList.remove('copy-success');
            }, 2000);
        } catch (err) {
            // Fallback for older browsers
            this.elements.passwordOutput.select();
            document.execCommand('copy');
            this.elements.copyBtn.textContent = 'Copied!';
            
            setTimeout(() => {
                this.elements.copyBtn.textContent = 'Copy to Clipboard';
            }, 2000);
        }
    }

    applyPreset(preset) {
        // Remove active class from all preset buttons
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        event.target.classList.add('active');
        
        switch (preset) {
            case 'basic':
                this.elements.lengthSlider.value = 8;
                this.elements.uppercase.checked = true;
                this.elements.lowercase.checked = true;
                this.elements.numbers.checked = true;
                this.elements.symbols.checked = false;
                break;
                
            case 'strong':
                this.elements.lengthSlider.value = 12;
                this.elements.uppercase.checked = true;
                this.elements.lowercase.checked = true;
                this.elements.numbers.checked = true;
                this.elements.symbols.checked = true;
                break;
                
            case 'very-strong':
                this.elements.lengthSlider.value = 16;
                this.elements.uppercase.checked = true;
                this.elements.lowercase.checked = true;
                this.elements.numbers.checked = true;
                this.elements.symbols.checked = true;
                this.elements.excludeSimilar.checked = true;
                break;
                
            case 'maximum':
                this.elements.lengthSlider.value = 24;
                this.elements.uppercase.checked = true;
                this.elements.lowercase.checked = true;
                this.elements.numbers.checked = true;
                this.elements.symbols.checked = true;
                this.elements.excludeSimilar.checked = true;
                this.elements.excludeAmbiguous.checked = true;
                break;
                
            case 'memorable':
                this.elements.lengthSlider.value = 12;
                this.elements.uppercase.checked = true;
                this.elements.lowercase.checked = true;
                this.elements.numbers.checked = true;
                this.elements.symbols.checked = false;
                this.elements.excludeSimilar.checked = true;
                break;
                
            case 'pin':
                this.elements.lengthSlider.value = 6;
                this.elements.uppercase.checked = false;
                this.elements.lowercase.checked = false;
                this.elements.numbers.checked = true;
                this.elements.symbols.checked = false;
                break;
        }
        
        this.updateLengthDisplay();
        this.generatePassword();
    }

    addToHistory(password) {
        const timestamp = new Date().toLocaleString();
        this.passwordHistory.unshift({ password, timestamp });
        
        if (this.passwordHistory.length > this.maxHistoryItems) {
            this.passwordHistory = this.passwordHistory.slice(0, this.maxHistoryItems);
        }
        
        localStorage.setItem('passwordHistory', JSON.stringify(this.passwordHistory));
        this.updatePasswordHistory();
    }

    updatePasswordHistory() {
        const historyContainer = this.elements.passwordHistory;
        
        if (this.passwordHistory.length === 0) {
            historyContainer.innerHTML = '<p class="no-history">No passwords generated yet</p>';
            this.elements.clearHistoryBtn.disabled = true;
        } else {
            historyContainer.innerHTML = this.passwordHistory.map((item, index) => `
                <div class="history-item">
                    <span class="password-text">${item.password}</span>
                    <span class="timestamp">${item.timestamp}</span>
                    <button class="copy-history-btn" onclick="passwordGenerator.copyHistoryPassword(${index})">Copy</button>
                </div>
            `).join('');
            this.elements.clearHistoryBtn.disabled = false;
        }
    }

    copyHistoryPassword(index) {
        const password = this.passwordHistory[index].password;
        navigator.clipboard.writeText(password).then(() => {
            event.target.textContent = 'Copied!';
            setTimeout(() => {
                event.target.textContent = 'Copy';
            }, 1000);
        });
    }

    clearHistory() {
        if (confirm('Are you sure you want to clear the password history?')) {
            this.passwordHistory = [];
            localStorage.removeItem('passwordHistory');
            this.updatePasswordHistory();
        }
    }
}

// Initialize the password generator when the page loads
let passwordGenerator;
document.addEventListener('DOMContentLoaded', () => {
    passwordGenerator = new PasswordGenerator();
});

// Add some utility functions for additional features
function generateMemorablePassword() {
    const adjectives = ['happy', 'bright', 'quick', 'smart', 'brave', 'calm', 'wise', 'kind'];
    const nouns = ['tiger', 'eagle', 'ocean', 'mountain', 'forest', 'river', 'star', 'moon'];
    const numbers = Math.floor(Math.random() * 9000) + 1000;
    
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    
    return `${adjective}${noun}${numbers}`;
}

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PasswordGenerator, generateMemorablePassword };
}
