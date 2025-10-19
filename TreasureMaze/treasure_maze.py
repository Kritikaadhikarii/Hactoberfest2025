import random

print("🗺️  Welcome to Treasure Maze: The Smart Explorer 🧭")
print("Find the hidden treasure before your moves run out!")
print("Use W (up), S (down), A (left), D (right) to move.\n")

# Maze size
size = 3
moves_left = 7

# Random positions
player = [0, 0]
treasure = [random.randint(0, 2), random.randint(0, 2)]
trap = [random.randint(0, 2), random.randint(0, 2)]

# Make sure treasure and trap are not in the same place
while trap == treasure:
    trap = [random.randint(0, 2), random.randint(0, 2)]

def distance(a, b):
    return abs(a[0]-b[0]) + abs(a[1]-b[1])

while moves_left > 0:
    print(f"\n📍 Your position: {player}")
    print(f"🕒 Moves left: {moves_left}")

    # Give hint based on proximity
    if distance(player, treasure) == 1:
        print("💡 You sense a sparkle nearby...")
    elif distance(player, trap) == 1:
        print("🐍 You hear snakes hissing...")
    else:
        print("🌫️ The air feels quiet...")

    move = input("Move (W/A/S/D): ").lower()

    if move == "w" and player[0] > 0:
        player[0] -= 1
    elif move == "s" and player[0] < size - 1:
        player[0] += 1
    elif move == "a" and player[1] > 0:
        player[1] -= 1
    elif move == "d" and player[1] < size - 1:
        player[1] += 1
    else:
        print("🚫 Invalid move!")
        continue

    if player == treasure:
        print("\n💰 Congratulations, you found the TREASURE!")
        print("🎉 You win!")
        break
    elif player == trap:
        print("\n💀 Oh no! You stepped on a TRAP!")
        print("Game over.")
        break

    moves_left -= 1

if moves_left == 0:
    print("\n⏳ You ran out of moves!")
    print(f"The treasure was at {treasure} and the trap was at {trap}.")
