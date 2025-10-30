#include <iostream>
using namespace std;

int main() {
    double temp;
    char unit;

    cout << "🌡️  Temperature Converter 🌡️" << endl;
    cout << "Enter temperature (e.g., 36.6 C or 100 F): ";
    cin >> temp >> unit;

    if (unit == 'C' || unit == 'c')
        cout << "In Fahrenheit: " << (temp * 9 / 5) + 32 << "°F" << endl;
    else if (unit == 'F' || unit == 'f')
        cout << "In Celsius: " << (temp - 32) * 5 / 9 << "°C" << endl;
    else
        cout << "Invalid input. Use C or F as unit." << endl;

    return 0;
}
