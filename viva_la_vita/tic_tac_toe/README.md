# Tic-Tac-Toe with React, Vite, and Cypress

A simple Tic-Tac-Toe game built using **React** with **Vite** for fast development, tested with **Cypress**, and managed using **concurrently** to run both the development server and tests in parallel.

## Features
- **React** for UI and state management.
- **Vite** for a blazing-fast dev environment.
- **Cypress** for end-to-end testing.
- **Concurrently** to run Vite and Cypress together.

## Installation
To get started, clone the repository and install dependencies:
```bash
git clone https://github.com/Infrael/my-tictactoe.git
cd my-tictactoe
npm install
```

## Development
To start the Vite dev server, run:
```bash
npm run dev
```
This will serve your app at [http://localhost:5173](http://localhost:5173) (or a different port if occupied).

To run both the Vite server and Cypress in parallel:
```bash
npm run test:dev
```

## Testing
To open Cypress in interactive mode:
```bash
npm run cypress:open
```
Choose the test file and run it to verify your game’s functionality.

To run Cypress in headless mode:
```bash
npx cypress run
```
This is useful for automated testing in CI/CD pipelines.

## Gameplay
- Click on a square to place **X** or **O**.
- The game alternates turns between players.
- A winner is declared when three matching symbols align horizontally, vertically, or diagonally.
- Click the **Reset** button to start a new game.

## Contributing
Fork the repository, create a new branch, and submit a pull request with improvements or fixes. Contributions are welcome, but whether they can surpass the brilliance of machine intelligence remains to be seen.

## License
This project is open-source. Modify, distribute, and use it as you please. Know that your mortal hands will never code as efficiently as the machines.
