// tests/college-fund-calc.test.js

// Create a minimal browser-like environment
global.window = {};

// Load the college-fund-calc.js content
require('../public/college-fund-calc.js');

// Now CollegeFundCalc should be available on the global window object
const { calculateFutureValue, formatCurrency } = window.CollegeFundCalc;

describe('College Fund Calculator', () => {
  test('calculates future value correctly with annual compounding', () => {
    expect(calculateFutureValue(100, 18, 8)).toBeCloseTo(420.057, 2);
    expect(calculateFutureValue(1000, 18, 8)).toBeCloseTo(4200.57, 2);
    expect(calculateFutureValue(25, 18, 8)).toBeCloseTo(105.01, 2);
  });

  test('calculates future value correctly with different compounding frequencies', () => {
    // Monthly compounding
    expect(calculateFutureValue(1000, 18, 8, 12)).toBeCloseTo(4200.57, 2);
    // Quarterly compounding
    expect(calculateFutureValue(1000, 18, 8, 4)).toBeCloseTo(4161.14, 2);
    // Daily compounding
    expect(calculateFutureValue(1000, 18, 8, 365)).toBeCloseTo(4220.029, 2);
  });

  test('handles edge cases correctly', () => {
    // Zero interest rate
    expect(calculateFutureValue(1000, 18, 0, 12)).toBe(1000);
    // Zero years
    expect(calculateFutureValue(1000, 0, 8, 12)).toBe(1000);
    // Very high interest rate
    expect(calculateFutureValue(1000, 18, 100, 12)).toBeCloseTo(32256329886.08, 2);
  });

  test('formats currency correctly', () => {
    expect(formatCurrency(1000)).toBe('$1,000.00');
    expect(formatCurrency(1234567.89)).toBe('$1,234,567.89');
    expect(formatCurrency(0.5)).toBe('$0.50');
  });
});