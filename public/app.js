// app.js

document.addEventListener('DOMContentLoaded', function () {
  const amountInput = document.getElementById('amountInput');
  const futureValueDiv = document.getElementById('futureValue');
  const messageInput = document.getElementById('messageInput');
  const messageSuggestionsDiv = document.getElementById('messageSuggestions');
  const donateButton = document.getElementById('donateButton');

  function updateFutureValue() {
    const amount = parseFloat(amountInput.value);
    const futureValue = CollegeFundCalc.calculateFutureValue(amount, 18, 6.5);
    futureValueDiv.textContent = `In 18 years this will be ${CollegeFundCalc.formatCurrency(futureValue)}`;
  }

  function fetchMessageSuggestions() {
    fetch('/purposes')
      .then(response => response.json())
      .then(data => {
        data.purposes.forEach(purpose => {
          const button = document.createElement('button');
          button.textContent = purpose;
          button.className = 'p-2 bg-gray-200 rounded text-sm hover:bg-gray-300';
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
  }

  function handleDonate() {
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
          alert('There was an error processing your donation. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('There was an error processing your donation. Please try again.');
      });
  }

  amountInput.addEventListener('input', updateFutureValue);
  donateButton.addEventListener('click', handleDonate);

  updateFutureValue();
  fetchMessageSuggestions();
});