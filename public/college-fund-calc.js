// public/college-fund-calc.js

const CollegeFundCalc = {
  calculateFutureValue: function (principal, years, rate, compoundingFrequency = 12) {
    // Convert rate to decimal
    const r = rate / 100;
    // A = P(1 + r/n)^(nt)
    return principal * Math.pow(1 + r / compoundingFrequency, compoundingFrequency * years);
  },

  formatCurrency: function (amount) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  }
};

// Make it available globally for the browser
window.CollegeFundCalc = CollegeFundCalc;