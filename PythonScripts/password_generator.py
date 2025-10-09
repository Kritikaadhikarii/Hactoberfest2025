# password_generator.py
import random
import string

length = int(input("Enter password length: "))
chars = string.ascii_letters + string.digits + string.punctuation
password = ''.join(random.choice(chars) for _ in range(length))

print(" Your generated password is:", password)
