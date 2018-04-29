# Setup
1. If you haven't already, install Node.js (https://nodejs.org/en/). Pick the option that is recommended for most users.
2. Clone the repo.
3. Next, navigate to the peter-test folder (kiwi/Components/peter-test) using your terminal.
4. Run `npm install` in the terminal.
5. Then, run `npm install -g @angular/cli` to install Angular CLI
5. Type `npm serve --open` to run the application.

# PeterTest Component Specifications
1. Change the number of iterations of the text through the forms (defaults to 1 if times is not defined). 
2. Change the color of the text through the second form (defaults to Black if color is not defined). It accepts string colors (ex. "red").

# Testing
1. Navigate to the peter-app folder (kiwi/dev/peter-test/angular/peter-app)
2. Tests files can be found in the src/app directory with the extension `*.spec.ts`
3. Type `npm test` to run the tests