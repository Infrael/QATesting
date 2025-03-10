// cypress/e2e/tictactoe.cy.js

describe("Tic-Tac-Toe App", () => {
  beforeEach(() => {
    // Adjust the URL to match your local dev server (e.g., http://localhost:5173)
    cy.visit("http://localhost:5173");
  });

  it("renders the initial game elements", () => {
    cy.contains("h1", "Tic-Tac-Toe").should("be.visible");
    cy.contains("Next Player: X").should("be.visible");
    cy.get(".square").should("have.length", 9);
    cy.get(".reset").should("be.visible");
  });

  it("allows players to click squares and alternates between X and O", () => {
    // Click the first square
    cy.get(".square").eq(0).click().should("contain", "X");
    // Next move: O
    cy.get(".square").eq(1).click().should("contain", "O");
    // Third move: X
    cy.get(".square").eq(2).click().should("contain", "X");

    // Ensure the "Next Player" text updates properly
    cy.contains("Next Player: O").should("be.visible");
  });

  it("recognizes a winning condition (e.g., top row for X)", () => {
    // Fill the top row with X
    cy.get(".square").eq(0).click(); // X
    cy.get(".square").eq(1).click(); // O
    cy.get(".square").eq(3).click(); // X
    cy.get(".square").eq(4).click(); // O
    cy.get(".square").eq(6).click(); // X
    // By now, squares [0, 3, 6] each clicked by X (alternating moves).
    // That won't create an immediate row. Let's do a direct row for clarity:

    cy.reload(); // Clear board and do a straightforward sequence
    cy.get(".square").eq(0).click(); // X
    cy.get(".square").eq(3).click(); // O
    cy.get(".square").eq(1).click(); // X
    cy.get(".square").eq(4).click(); // O
    cy.get(".square").eq(2).click(); // X -> This completes top row (0,1,2)

    // Check for winner
    cy.contains("Winner: X").should("be.visible");
  });

  it("prevents overriding squares that are already taken or after a winner is declared", () => {
    // Create a quick win scenario
    cy.get(".square").eq(0).click(); // X
    cy.get(".square").eq(3).click(); // O
    cy.get(".square").eq(1).click(); // X
    cy.get(".square").eq(4).click(); // O
    cy.get(".square").eq(2).click(); // X -> X wins

    // Attempt to click another square after a win
    cy.get(".square").eq(5).click().should("be.empty");

    // Attempt to overwrite a taken square
    cy.get(".square").eq(0).click().should("contain", "X"); // Still X
  });

  it("resets the board when clicking the Reset button", () => {
    // Make some moves
    cy.get(".square").eq(0).click().should("contain", "X");
    cy.get(".square").eq(1).click().should("contain", "O");
    cy.get(".reset").click(); // Reset the game
    // All squares should be empty
    cy.get(".square").each(($square) => {
      expect($square).to.have.text("");
    });
    // "Next Player: X" should appear again
    cy.contains("Next Player: X").should("be.visible");
  });

  // Optional: Check layout or style, though typically we test functionality more than positioning
  // This is a naive approach to check if the container or .game is centered:
  it("verifies the game container is centered (rough check)", () => {
    cy.get(".game").then(($game) => {
      // One simplistic approach is to see if it's near the midpoint of viewport
      const rect = $game[0].getBoundingClientRect();
      const viewportWidth = Cypress.config("viewportWidth");
      const viewportHeight = Cypress.config("viewportHeight");

      // We'll allow a margin of error for "center"
      const horizontalCenter = Math.abs(rect.x + rect.width / 2 - viewportWidth / 2);
      const verticalCenter = Math.abs(rect.y + rect.height / 2 - viewportHeight / 2);

      // Expect it to be within 50px of the center, adjust as desired
      expect(horizontalCenter).to.be.lessThan(50);
      expect(verticalCenter).to.be.lessThan(50);
    });
  });
});
