// Problem: Coderbyte - Find Intersection

// Solution Status: Solved and submitted successfully on Coderbyte. 

/* 
Problem Description: 
Have the function FindIntersection(strArr) read the array of strings stored in strArr which will contain 2 elements: 
the first element will represent a list of comma-separated numbers sorted in ascending order, 
the second element will represent a second list of comma-separated numbers (also sorted). 
Your goal is to return a comma-separated string containing the numbers that occur in elements of strArr in sorted order. 
If there is no intersection, return the string false.

Examples:
Input: {"1, 3, 4, 7, 13", "1, 2, 4, 13, 15"}
Output: 1,4,13
Input: {"1, 3, 9, 10, 17, 18", "1, 4, 9, 10"}
Output: 1,9,10
*/

// Solution: 
#include <iostream>
#include <string>
#include <vector>
#include <sstream>
using namespace std;

/**
 * parse - Parses a comma-separated string of numbers into a vector of integers.
 * @s: A string containing comma-separated numbers.
 * Returns: A vector of integers parsed from the string.
 */
vector<int> parse(const string& s) {
    vector<int> result;
    int start = 0;

    while (start < s.length()) {
        int end = s.find(", ", start);

        // If no more delimiters, take the rest of the string
        if (end == string::npos) {
            result.push_back(stoi(s.substr(start)));
            break;
        }

        result.push_back(stoi(s.substr(start, end - start)));
        start = end + 2; // skip ", "
    }

    return result;
}

/**
 * FindIntersection - Finds the intersection of two lists of numbers.
 * @strArr: An array of two strings, each containing a list of comma-separated numbers sorted in ascending order.
 * @arrLength: The length of the strArr array (should be 2).
 * 
 * Returns: A comma-separated string containing the numbers that occur in both lists in sorted order, 
 *          or "false" if there is no intersection.
 */
string FindIntersection(string strArr[], int arrLength) {
    vector<int> arr1 = parse(strArr[0]);
    vector<int> arr2 = parse(strArr[1]);

    int i = 0, j = 0;
    string result = "";

    while (i < arr1.size() && j < arr2.size()) {
        if (arr1[i] == arr2[j]) {
            result += to_string(arr1[i]) + ",";
            i++;
            j++;
        } else if (arr1[i] < arr2[j]) {
            i++;
        } else {
            j++;
        }
    }

    if (result.empty()) return "false";

    // Remove trailing comma
    result.pop_back();
    return result;
}

int main(void) {
    string test1[] = {"1, 3, 4, 7, 13", "1, 2, 4, 13, 15"};
    string test2[] = {"1, 3, 9, 10, 17, 18", "1, 4, 9, 10"};

    cout << "Input: {\"1, 3, 4, 7, 13\", \"1, 2, 4, 13, 15\"}" << endl;
    cout << "Output: " << FindIntersection(test1, 2) << endl;
    cout << "Expected: 1,4,13" << endl << endl;

    cout << "Input: {\"1, 3, 9, 10, 17, 18\", \"1, 4, 9, 10\"}" << endl;
    cout << "Output: " << FindIntersection(test2, 2) << endl;
    cout << "Expected: 1,9,10" << endl;

    return 0;
}