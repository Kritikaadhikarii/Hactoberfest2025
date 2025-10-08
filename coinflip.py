import random
result = random.choice(['Heads', 'Tails'])
guess = input("Heads or Tails? ")
print("✅ You win!" if guess.lower() == result.lower() else f"❌ It was {result}")
