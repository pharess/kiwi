# Setup
1. If you haven't already, install Node.js (https://nodejs.org/en/). Pick the option that is recommended for most users.
2. Clone the repo.
3. Next, navigate to the peter-test folder (kiwi/dev/peter-test/react) using your terminal.
4. Run `npm install` in the terminal.
5. Type `npm start` to run the application.

# PeterTest Component Specifications
1. Accepts a `color` property (defaults to Black if color is not defined). It can accept string colors (ex. "red"), hexcodes (ex. "#dddddd"), or rgb(a) (ex. rgb(50, 100, 200)). 
2. It accepts a `times` property (defaults to 1 if times is not defined). It only accepts string input (ex. "1", "20", etc.). 

# Testing
1. Tests for this react component should be located in the `__tests__` folder (kiwi/__tests__). Navigate to the kiwi folder (kiwi/)
2. Type `npm test`
