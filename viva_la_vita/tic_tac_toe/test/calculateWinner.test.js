import { test, expect } from "vitest";
import { calculateWinner } from "../src/App.jsx"; // Adjust path if needed


test('detects a winner correctly', () => {
    expect(calculateWinner(['X', 'X', 'X', null, null, null, null, null, null])).toBe('X');
    expect(calculateWinner([null, null, 'O', null, null, 'O', null, null, 'O'])).toBe('O');
});

test('returns null if no winner', () => {
    expect(calculateWinner([null, null, null, null, null, null, null, null, null])).toBe(null);
    expect(calculateWinner(['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'])).toBe(null);
});

test('detects diagonal win', () => {
    expect(calculateWinner(['X', null, null, null, 'X', null, null, null, 'X'])).toBe('X');
    expect(calculateWinner([null, null, 'O', null, 'O', null, 'O', null, null])).toBe('O');
});
