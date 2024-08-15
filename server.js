require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

const purposes = [
  "Collegiate cash for success",
  "Helping you slay the semester, one expense at a time",
  "Covering your college costs so you can focus on your future",
  "Lifestyle on fleek, education on deck - you got this!",
  "Making this college experience a little more enjoyable",
  "Investing in your future, one bill at a time",
  "Helping you achieve academic awesomeness",
  "The college fund boost, just for you",
  "Sending some college cash your way",
  "Making college a little more affordable, one expense at a time"
];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/purposes', (req, res) => {
  res.json({ purposes });
});

app.post('/submit', (req, res) => {
  const { amount, purpose } = req.body;
  const venmoUsername = process.env.VENMO_USERNAME;

  if (!venmoUsername) {
    return res.status(500).json({ error: 'Venmo username not configured' });
  }

  const venmoLink = `https://venmo.com/${venmoUsername}?txn=pay&amount=${amount}&note=${encodeURIComponent(purpose)}`;

  res.json({ paymentLink: venmoLink });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});