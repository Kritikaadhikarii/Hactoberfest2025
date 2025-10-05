
rates = {
    "USD": 1.0,      
    "INR": 83.0,
    "EUR": 0.92,
    "JPY": 150.0
}

print("Welcome to the Currency Converter!")
amount = float(input("Enter amount: "))
from_currency = input("From currency (USD, INR, EUR, JPY): ").upper()
to_currency = input("To currency (USD, INR, EUR, JPY): ").upper()

if from_currency in rates and to_currency in rates:
    # convert to base currency first (USD)
    amount_in_usd = amount / rates[from_currency]
    converted_amount = amount_in_usd * rates[to_currency]
    print(f"{amount} {from_currency} = {converted_amount:.2f} {to_currency}")
else:
    print("Invalid currency code!")
