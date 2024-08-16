// app.js

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('donationForm');
  const amountInput = document.getElementById('amountInput');
  const futureValueDiv = document.getElementById('futureValue');
  const messageInput = document.getElementById('messageInput');
  const messageSuggestionsDiv = document.getElementById('messageSuggestions');

  function updateFutureValue() {
    const amount = parseFloat(amountInput.value);
    if (!isNaN(amount) && amount > 0) {
      const futureValue = CollegeFundCalc.calculateFutureValue(amount, 18, 6.5);
      futureValueDiv.textContent = `In 18 years this will be ${CollegeFundCalc.formatCurrency(futureValue)}`;
    } else {
      futureValueDiv.textContent = 'Enter an amount to see its future value';
    }
  }

  function fetchMessageSuggestions() {
    fetch('/purposes')
      .then(response => response.json())
      .then(data => {
        data.purposes.forEach(purpose => {
          const button = document.createElement('button');
          button.textContent = purpose;
          button.className = 'p-2 bg-gray-200 rounded text-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500';
          button.type = 'button'; // Prevent form submission
          button.onclick = () => selectMessageSuggestion(purpose);
          messageSuggestionsDiv.appendChild(button);
        });
      });
  }

  function selectMessageSuggestion(suggestion) {
    messageInput.value = suggestion;
    messageSuggestionsDiv.querySelectorAll('button').forEach(btn => {
      btn.classList.remove('bg-blue-500', 'text-white');
      btn.classList.add('bg-gray-200');
    });
    event.target.classList.remove('bg-gray-200');
    event.target.classList.add('bg-blue-500', 'text-white');
    messageInput.focus();
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (form.checkValidity()) {
      const amount = amountInput.value;
      const message = messageInput.value;

      fetch('/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, purpose: message }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.paymentLink) {
            window.location.href = data.paymentLink;
          } else {
            console.error('Error:', data.error);
            showError('There was an error processing your donation. Please try again.');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          showError('There was an error processing your donation. Please try again.');
        });
    } else {
      form.reportValidity();
    }
  }

  function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.textContent = message;
    errorDiv.className = 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4';
    form.appendChild(errorDiv);
    setTimeout(() => errorDiv.remove(), 5000);
  }

  amountInput.addEventListener('input', updateFutureValue);
  form.addEventListener('submit', handleSubmit);

  updateFutureValue();
  fetchMessageSuggestions();
});