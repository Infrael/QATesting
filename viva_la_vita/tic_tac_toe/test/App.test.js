import React from "react";
import { test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../src/App.jsx"; // Adjust path if needed


test('renders Tic-Tac-Toe board', () => {
  render(<App />);
  expect(screen.getByText('Tic-Tac-Toe')).toBeInTheDocument();
  expect(screen.getByText('Next Player: X')).toBeInTheDocument();
});

test('allows players to take turns and updates board', () => {
  render(<App />);
  const squares = screen.getAllByRole('button');

  fireEvent.click(squares[0]); // X plays
  expect(squares[0]).toHaveTextContent('X');
  expect(screen.getByText('Next Player: O')).toBeInTheDocument();

  fireEvent.click(squares[1]); // O plays
  expect(squares[1]).toHaveTextContent('O');
  expect(screen.getByText('Next Player: X')).toBeInTheDocument();
});

test('prevents clicking on an already occupied square', () => {
  render(<App />);
  const squares = screen.getAllByRole('button');

  fireEvent.click(squares[0]); // X plays
  fireEvent.click(squares[0]); // Clicking again

  expect(squares[0]).toHaveTextContent('X'); // Should remain X
  expect(screen.getByText('Next Player: O')).toBeInTheDocument(); // Should still be O's turn
});

test('declares the winner correctly', () => {
  render(<App />);
  const squares = screen.getAllByRole('button');

  // X wins
  fireEvent.click(squares[0]); // X
  fireEvent.click(squares[3]); // O
  fireEvent.click(squares[1]); // X
  fireEvent.click(squares[4]); // O
  fireEvent.click(squares[2]); // X (winning move)

  expect(screen.getByText('Winner: X')).toBeInTheDocument();
});

test("reset button restores game to initial state with X starting", () => {
    render(<App />);
    const squares = screen.getAllByRole("button");
    const resetButton = screen.getByText("Reset");
  
    fireEvent.click(squares[0]); // X plays
    fireEvent.click(squares[1]); // O plays
    fireEvent.click(resetButton); // Reset game
  
    squares.forEach((square) => expect(square).toHaveTextContent(""));
    expect(screen.getByText("Next Player: X")).toBeInTheDocument(); // Ensures X always starts after reset
});
