// tests/college-fund-calc.test.js

// Create a minimal browser-like environment
global.window = {};

// Load the college-fund-calc.js content
require('../public/college-fund-calc.js');

// Now CollegeFundCalc should be available on the global window object
const { calculateFutureValue, formatCurrency } = window.CollegeFundCalc;

describe('College Fund Calculator', () => {
  test('calculates future value correctly', () => {
    expect(calculateFutureValue(100, 18, 0.08)).toBeCloseTo(399.60, 2);
    expect(calculateFutureValue(1000, 18, 0.08)).toBeCloseTo(3996.02, 2);
    expect(calculateFutureValue(25, 18, 0.08)).toBeCloseTo(99.90, 2);
  });

  test('formats currency correctly', () => {
    expect(formatCurrency(1000)).toBe('$1,000.00');
    expect(formatCurrency(1234567.89)).toBe('$1,234,567.89');
    expect(formatCurrency(0.5)).toBe('$0.50');
  });
});