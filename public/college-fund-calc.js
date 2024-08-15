// public/college-fund-calc.js

const CollegeFundCalc = {
  calculateFutureValue: function (principal, years, rate) {
    return principal * Math.pow(1 + rate, years);
  },

  formatCurrency: function (amount) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  }
};

// Make it available globally for the browser
window.CollegeFundCalc = CollegeFundCalc;