# Snake Water Gun game
# Rules:
# - Snake (s) beats Water (w)
# - Water (w) beats Gun (g)
# - Gun (g) beats Snake (s)

import random

VALID = {'s': 'Snake', 'w': 'Water', 'g': 'Gun'}

def decide_winner(user, comp):
    if user == comp:
        return 'tie'
    # Snake beats Water
    if user == 's' and comp == 'w':
        return 'user'
    if user == 'w' and comp == 's':
        return 'comp'
    # Water beats Gun
    if user == 'w' and comp == 'g':
        return 'user'
    if user == 'g' and comp == 'w':
        return 'comp'
    # Gun beats Snake
    if user == 'g' and comp == 's':
        return 'user'
    if user == 's' and comp == 'g':
        return 'comp'
    # default (shouldn't reach)
    return 'tie'

def get_computer_choice():
    return random.choice(list(VALID.keys()))

def get_user_choice():
    while True:
        choice = input("Choose (s)nake, (w)ater or (g)un: ").strip().lower()
        if choice in VALID:
            return choice
        print("Invalid input — please enter 's', 'w', or 'g'.")

def play_round():
    user = get_user_choice()
    comp = get_computer_choice()
    print(f"You chose {VALID[user]}, computer chose {VALID[comp]}.")
    result = decide_winner(user, comp)
    if result == 'user':
        print("You win this round! 🎉")
        return 1, 0
    elif result == 'comp':
        print("Computer wins this round.")
        return 0, 1
    else:
        print("It's a tie.")
        return 0, 0

def main():
    print("Welcome to Snake-Water-Gun!")
    rounds = 0
    while True:
        try:
            rounds = int(input("How many rounds would you like to play? "))
            if rounds > 0:
                break
            print("Please enter a positive integer.")
        except ValueError:
            print("That's not a valid number. Try again.")
    user_score = 0
    comp_score = 0

    for r in range(1, rounds + 1):
        print(f"\n--- Round {r} ---")
        u, c = play_round()
        user_score += u
        comp_score += c
        print(f"Score after round {r}: You {user_score} - Computer {comp_score}")

    print("\n=== Final Result ===")
    if user_score > comp_score:
        print(f"You won the match! Final score: You {user_score} - Computer {comp_score} 🎉")
    elif comp_score > user_score:
        print(f"Computer won the match. Final score: You {user_score} - Computer {comp_score} 🤖")
    else:
        print(f"The match is a tie! Final score: You {user_score} - Computer {comp_score} 🤝")

    again = input("Play again? (y/n): ").strip().lower()
    if again == 'y':
        print("\nRestarting...\n")
        main()
    else:
        print("Thanks for playing! Goodbye.")

if __name__ == "__main__":
    main()
