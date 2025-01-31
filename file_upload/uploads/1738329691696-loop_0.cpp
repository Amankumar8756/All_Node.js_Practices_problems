#include <iostream>

using namespace std;

int main()
{
    int age;
    cout << "tell me your age " << endl;
    cin >> age;
    if (age < 18)
    {
        cout << "you can come my party" << endl;
    }
    else
    {
        cout << "you can not come the party" << endl;
    }
    return 0;
}
