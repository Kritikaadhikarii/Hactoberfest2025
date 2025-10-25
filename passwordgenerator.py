import random
import string

print(" Welcome to the Password Generator!")

# Step 1: Ask the user how long they want the password
length = int(input("How long should the password be? "))

# Step 2: Ask what kind of characters they want
use_upper = input("Do you want capital letters (A-Z)? (y/n): ").lower() == "y"
use_lower = input("Do you want small letters (a-z)? (y/n): ").lower() == "y"
use_digits = input("Do you want numbers (0-9)? (y/n): ").lower() == "y"
use_symbols = input("Do you want symbols (!@#$ etc)? (y/n): ").lower() == "y"

# Step 3: Create a list of possible characters
characters = ""
if use_upper:
    characters += string.ascii_uppercase  # ABCDEFG...
if use_lower:
    characters += string.ascii_lowercase  # abcdefg...
if use_digits:
    characters += string.digits           # 0123456789
if use_symbols:
    characters += "!@#$%^&*()-_=+[]{};:,.<>?/"

# Step 4: If no options selected, show an error
if characters == "":
    print("Oops! You didn’t choose any characters ")
else:
    # Step 5: Randomly create the password
    password = ""
    for _ in range(length):
        password += random.choice(characters)
    
    # Step 6: Show the password
    print("\n✅ Your new password is:", password)
