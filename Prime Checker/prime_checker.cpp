#include <iostream>
#include <cmath>
using namespace std;

// Function to check if a number is prime
bool isPrime(int num) {
    if (num <= 1)
        return false;
    if (num == 2)
        return true;
    if (num % 2 == 0)
        return false;

    for (int i = 3; i <= sqrt(num); i += 2) {
        if (num % i == 0)
            return false;
    }
    return true;
}

int main() {
    cout << "\n==============================";
    cout << "\n 🔢 PRIME NUMBER CHECKER 🔢";
    cout << "\n==============================\n";

    char choice;
    do {
        int number;
        cout << "\nEnter a number to check: ";
        cin >> number;

        if (isPrime(number))
            cout << number << " is a Prime Number ✅\n";
        else
            cout << number << " is NOT a Prime Number ❌\n";

        cout << "\nDo you want to check another number? (y/n): ";
        cin >> choice;

    } while (choice == 'y' || choice == 'Y');

    cout << "\nThanks for playing with primes! ✨\n";
    return 0;
}
