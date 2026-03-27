# Problem: Coderbyte - Codeland Username Validation

# Solution Status: Solved and submitted successfully on Coderbyte. 

"""
Problem Description: 

Have the function CodelandUsernameValidation(str) take the str parameter being passed and determine if the string is a valid username according to the following rules:

1. The username is between 4 and 25 characters.
2. It must start with a letter.
3. It can only contain letters, numbers, and the underscore character.
4. It cannot end with an underscore character.

If the username is valid then your program should return the string true, otherwise return the string false.

Examples:
Input: "aa_"
Output: false
Input: "u__hello_world123"
Output: true

"""

# Solution:
import re

def CodelandUsernameValidation(strParam):
    """Validate a username against Codeland's rules.
    Rules:
    1. Length must be between 4 and 25 characters.
    2. The first character must be a letter.
    3. Allowed characters are letters, digits, and underscore (_).
    4. The last character cannot be an underscore.
    Args:
      strParam: Username string to validate.
    Returns:
      "true" if valid, otherwise "false".
    """

    # Pattern explanation:
    # ^[A-Za-z]               - starts with a letter
    # [A-Za-z0-9_]{2,23}      - middle chararacters are either letters, digits, or underscores, while ensuring a total length of 4-25
    # [A-Za-z0-9]$            - ends with a letter or digit
    pattern = r"^[A-Za-z][A-Za-z0-9_]{2,23}[A-Za-z0-9]$"

    return "true" if re.match(pattern, strParam) else "false"

# keep this function call here
print(CodelandUsernameValidation(input()))


